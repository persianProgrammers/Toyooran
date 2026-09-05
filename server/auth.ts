import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import bcrypt from 'bcryptjs';
import { DatabaseSync } from 'node:sqlite';
import { generateSecret, generateURI, verify } from 'otplib';
import type { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();
const dataDir = path.resolve(process.env.DATA_DIR || './data');
fs.mkdirSync(dataDir, { recursive: true });
const db = new DatabaseSync(path.join(dataDir, 'toyooran.sqlite'));
db.exec('PRAGMA journal_mode = WAL');
db.exec(`CREATE TABLE IF NOT EXISTS admins (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL UNIQUE, password_hash TEXT NOT NULL, mfa_secret TEXT, mfa_enabled INTEGER NOT NULL DEFAULT 0, created_at TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS sessions (id_hash TEXT PRIMARY KEY, admin_id INTEGER NOT NULL REFERENCES admins(id) ON DELETE CASCADE, mfa_verified INTEGER NOT NULL DEFAULT 1, expires_at INTEGER NOT NULL, created_at TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS admin_state (state_key TEXT PRIMARY KEY, state_json TEXT NOT NULL, updated_at TEXT NOT NULL);`);
try { db.exec('ALTER TABLE sessions ADD COLUMN mfa_verified INTEGER NOT NULL DEFAULT 1'); } catch { /* migration already applied */ }
const bootstrapPassword = process.env.ADMIN_BOOTSTRAP_PASSWORD;
const bootstrapUser = process.env.ADMIN_USERNAME || 'admin';
if (!db.prepare('SELECT id FROM admins LIMIT 1').get() && bootstrapPassword) {
  if (bootstrapPassword.length < 16) throw new Error('ADMIN_BOOTSTRAP_PASSWORD must be at least 16 characters');
  db.prepare('INSERT INTO admins (username, password_hash, created_at) VALUES (?, ?, ?)').run(bootstrapUser, bcrypt.hashSync(bootstrapPassword, 12), new Date().toISOString());
}
const SESSION_TTL_SECONDS = 8 * 60 * 60;
const hashToken = (token: string) => crypto.createHash('sha256').update(token).digest('hex');
const issueSession = (adminId: number, res: Response, mfaVerified: boolean) => {
  const token = crypto.randomBytes(32).toString('base64url');
  db.prepare('INSERT INTO sessions (id_hash, admin_id, mfa_verified, expires_at, created_at) VALUES (?, ?, ?, ?, ?)').run(hashToken(token), adminId, mfaVerified ? 1 : 0, Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS, new Date().toISOString());
  res.cookie('toyooran_admin_session', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', maxAge: SESSION_TTL_SECONDS * 1000, path: '/' });
};
export type AdminRequest = Request & { admin?: { id: number; username: string; mfaEnabled: boolean } };
function sessionRow(req: AdminRequest) {
  const token = req.cookies?.toyooran_admin_session;
  return token ? db.prepare('SELECT a.id, a.username, a.mfa_enabled, s.mfa_verified FROM sessions s JOIN admins a ON a.id=s.admin_id WHERE s.id_hash=? AND s.expires_at>?').get(hashToken(token), Math.floor(Date.now() / 1000)) as any : null;
}
export function requireAdmin(req: AdminRequest, res: Response, next: NextFunction) {
  const row = sessionRow(req);
  if (!row) return res.status(401).json({ error: 'نشست منقضی یا نامعتبر است.' });
  if (row.mfa_enabled && !row.mfa_verified) return res.status(401).json({ error: 'تأیید MFA لازم است.', mfaRequired: true });
  req.admin = { id: row.id, username: row.username, mfaEnabled: Boolean(row.mfa_enabled) }; next();
}
export function requireMfaPending(req: AdminRequest, res: Response, next: NextFunction) {
  const row = sessionRow(req);
  if (!row || !row.mfa_enabled || row.mfa_verified) return res.status(401).json({ error: 'MFA challenge نامعتبر است.' });
  req.admin = { id: row.id, username: row.username, mfaEnabled: true }; next();
}
async function verifyTurnstile(token: string | undefined, ip: string | undefined) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return process.env.NODE_ENV !== 'production';
  if (!token) return false;
  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ secret, response: token, remoteip: ip }) });
  return (await response.json() as { success?: boolean }).success === true;
}
export async function loginAdmin(username: string, password: string, turnstileToken: string | undefined, ip: string | undefined, res: Response) {
  if (!(await verifyTurnstile(turnstileToken, ip))) return { success: false, error: 'اعتبارسنجی CAPTCHA ناموفق بود.' };
  const admin = db.prepare('SELECT * FROM admins WHERE username=?').get(username.trim()) as any;
  if (!admin || !bcrypt.compareSync(password, admin.password_hash)) return { success: false, error: 'نام کاربری یا رمز عبور نادرست است.' };
  issueSession(admin.id, res, !admin.mfa_enabled);
  return { success: true, mfaRequired: Boolean(admin.mfa_enabled) };
}
export async function verifyMfaSession(req: AdminRequest, token: string) {
  const row = sessionRow(req); if (!row?.mfa_secret && !row?.mfa_enabled) return false;
  const admin = db.prepare('SELECT mfa_secret FROM admins WHERE id=?').get(req.admin?.id) as any;
  if (!admin?.mfa_secret || !(await verify({ secret: admin.mfa_secret, token }))) return false;
  db.prepare('UPDATE sessions SET mfa_verified=1 WHERE id_hash=?').run(hashToken(req.cookies.toyooran_admin_session)); return true;
}
export function logoutAdmin(req: AdminRequest, res: Response) { const token = req.cookies?.toyooran_admin_session; if (token) db.prepare('DELETE FROM sessions WHERE id_hash=?').run(hashToken(token)); res.clearCookie('toyooran_admin_session', { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', path: '/' }); }
export function getAdminState(key: string) { const row = db.prepare('SELECT state_json FROM admin_state WHERE state_key=?').get(key) as any; return row ? JSON.parse(row.state_json) : null; }
export function setAdminState(key: string, value: unknown) { db.prepare('INSERT INTO admin_state(state_key,state_json,updated_at) VALUES(?,?,?) ON CONFLICT(state_key) DO UPDATE SET state_json=excluded.state_json, updated_at=excluded.updated_at').run(key, JSON.stringify(value), new Date().toISOString()); }
export function startMfaSetup(adminId: number) { const secret = generateSecret(); db.prepare('UPDATE admins SET mfa_secret=?, mfa_enabled=0 WHERE id=?').run(secret, adminId); return { secret, uri: generateURI({ issuer: 'Toyooran', label: 'admin', secret }) }; }
export async function confirmMfa(adminId: number, token: string) { const row = db.prepare('SELECT mfa_secret FROM admins WHERE id=?').get(adminId) as any; if (!row?.mfa_secret || !(await verify({ secret: row.mfa_secret, token }))) return false; db.prepare('UPDATE admins SET mfa_enabled=1 WHERE id=?').run(adminId); return true; }
