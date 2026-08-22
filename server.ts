import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route: Send form submission / consultation to Bale Bot
  app.post("/api/consultation", async (req, res) => {
    try {
      const {
        fullName,
        phoneNumber,
        companyName,
        subject,
        productName,
        capacity,
        location,
        message,
        source,
        timestamp
      } = req.body;

      const baleToken = process.env.BALE_BOT_TOKEN;
      const baleChatId = process.env.BALE_CHAT_ID;

      // Construct formatted Persian message for Bale Messenger
      const formattedLines = [
        `🔔 *درخواست جدید از وب‌سایت طیوران صنعت پویا*`,
        `━━━━━━━━━━━━━━━━━━`,
        `👤 *نام متقاضی:* ${fullName || 'ثبت نشده'}`,
        `📞 *شماره تماس:* ${phoneNumber || 'ثبت نشده'}`,
        companyName ? `🏢 *نام واحد / مرغداری:* ${companyName}` : null,
        subject ? `📋 *موضوع:* ${subject}` : null,
        productName ? `📦 *محصول انتخابی:* ${productName}` : null,
        location ? `📍 *شهر / استان:* ${location}` : null,
        capacity ? `📐 *ظرفیت سالن:* ${capacity}` : null,
        message ? `📝 *توضیحات:* ${message}` : null,
        source ? `🏷 *بخش ارسال‌کننده:* ${source}` : null,
        `━━━━━━━━━━━━━━━━━━`,
        `⏰ *زمان ثبت:* ${timestamp || new Date().toLocaleString('fa-IR')}`,
        `🌐 *سامانه آنلاین طیوران صنعت پویا*`
      ].filter(Boolean);

      const formattedMessage = formattedLines.join('\n');

      let baleResult: any = null;
      let sent = false;

      if (baleToken && baleChatId) {
        try {
          const response = await fetch(`https://tapi.bale.ai/bot${baleToken}/sendMessage`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              chat_id: baleChatId,
              text: formattedMessage,
            })
          });
          baleResult = await response.json();
          sent = response.ok;
          if (!response.ok) {
            console.error("Bale API responded with error:", baleResult);
          }
        } catch (fetchError) {
          console.error("Error connecting to Bale API:", fetchError);
        }
      } else {
        console.log("ℹ️ Bale Bot Token or Chat ID not configured in .env. Message formatted:\n", formattedMessage);
      }

      res.status(200).json({
        success: true,
        sentToBale: sent,
        baleResult,
        message: sent 
          ? 'درخواست با موفقیت ثبت و پیام به ربات بله ارسال گردید.' 
          : 'درخواست در سیستم ثبت شد.'
      });
    } catch (error: any) {
      console.error("Consultation API error:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // Bale bot configuration status
  app.get("/api/bale/status", (_req, res) => {
    const hasToken = !!process.env.BALE_BOT_TOKEN;
    const hasChatId = !!process.env.BALE_CHAT_ID;
    res.json({
      configured: hasToken && hasChatId,
      hasToken,
      hasChatId
    });
  });

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
