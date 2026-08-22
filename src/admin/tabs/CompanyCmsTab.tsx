import React, { useState } from 'react';
import { 
  Building, 
  Save, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2,
  Layers,
  Image as ImageIcon
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { CompanyInfo, HeroCms } from '../../types';

export const CompanyCmsTab: React.FC = () => {
  const { companyInfo, updateCompanyInfo, heroCms, updateHeroCms } = useData();

  const [companyForm, setCompanyForm] = useState<CompanyInfo>({ ...companyInfo });
  const [heroForm, setHeroForm] = useState<HeroCms>({ ...heroCms });
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveAll = (e: React.FormEvent) => {
    e.preventDefault();
    updateCompanyInfo(companyForm);
    updateHeroCms(heroForm);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <form onSubmit={handleSaveAll} className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-2xl">
        <div>
          <h2 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
            <Building className="w-5 h-5 text-amber-400" />
            <span>تنظیمات عمومی شرکت، اطلاعات تماس و هیرو اصلی سایت</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            ویرایش متن هدر اصلی، شماره‌های تماس، آدرس کارخانجات و دفتر مرکزی
          </p>
        </div>

        <button
          type="submit"
          className="bg-gradient-to-r from-amber-400 to-[#FF9F14] hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black px-6 py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-all shrink-0"
        >
          <Save className="w-4 h-4" />
          <span>ذخیره کلیه تنظیمات</span>
        </button>
      </div>

      {saveSuccess && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 p-3.5 rounded-2xl text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>تنظیمات شرکت و صفحه اصلی با موفقیت ذخیره و در سایت اعمال شدند.</span>
        </div>
      )}

      {/* Section 1: Hero Banner CMS */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <h3 className="text-sm font-bold text-white">متن و تصویر بنر اصلی (Hero Banner)</h3>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">عنوان بزرگ بنر اصلی</label>
            <input
              type="text"
              value={heroForm.title}
              onChange={(e) => setHeroForm({ ...heroForm, title: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-amber-400 font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">زیرعنوان و توضیحات بنر اصلی</label>
            <textarea
              value={heroForm.subtitle}
              onChange={(e) => setHeroForm({ ...heroForm, subtitle: e.target.value })}
              rows={2}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white focus:border-amber-400 leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">متن دکمه اصلی (Primary CTA)</label>
              <input
                type="text"
                value={heroForm.ctaPrimaryText}
                onChange={(e) => setHeroForm({ ...heroForm, ctaPrimaryText: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-amber-400"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">متن دکمه دوم (Secondary CTA)</label>
              <input
                type="text"
                value={heroForm.ctaSecondaryText}
                onChange={(e) => setHeroForm({ ...heroForm, ctaSecondaryText: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-amber-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">آدرس تصویر پس‌زمینه هیرو</label>
            <input
              type="text"
              value={heroForm.backgroundImage}
              onChange={(e) => setHeroForm({ ...heroForm, backgroundImage: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-amber-400 font-mono"
            />
          </div>
        </div>
      </div>

      {/* Section 2: Company Contact & Addresses */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
          <Phone className="w-4 h-4 text-amber-400" />
          <h3 className="text-sm font-bold text-white">اطلاعات تماس و تلفن‌های شرکت</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">تلفن دفتر مرکزی</label>
            <input
              type="text"
              value={companyForm.phone}
              onChange={(e) => setCompanyForm({ ...companyForm, phone: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">خط مستقیم فروش و سفارشات</label>
            <input
              type="text"
              value={companyForm.salesPhone}
              onChange={(e) => setCompanyForm({ ...companyForm, salesPhone: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">پشتیبانی و مهندسی فنی</label>
            <input
              type="text"
              value={companyForm.supportPhone}
              onChange={(e) => setCompanyForm({ ...companyForm, supportPhone: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">ایمیل رسمی شرکت</label>
            <input
              type="text"
              value={companyForm.email}
              onChange={(e) => setCompanyForm({ ...companyForm, email: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">ساعات کاری</label>
            <input
              type="text"
              value={companyForm.workingHours}
              onChange={(e) => setCompanyForm({ ...companyForm, workingHours: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">متن لیسانس FDA و استانداردهای انحصاری</label>
            <input
              type="text"
              value={companyForm.fdaLicenseText}
              onChange={(e) => setCompanyForm({ ...companyForm, fdaLicenseText: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-amber-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">آدرس دفتر مرکزی و تحقیق و توسعه (دانشگاه گرگان)</label>
            <textarea
              value={companyForm.address}
              onChange={(e) => setCompanyForm({ ...companyForm, address: e.target.value })}
              rows={2}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">آدرس کارخانه و خط تولید صنعتی (مشهد)</label>
            <textarea
              value={companyForm.factoryAddress}
              onChange={(e) => setCompanyForm({ ...companyForm, factoryAddress: e.target.value })}
              rows={2}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:border-amber-400"
            />
          </div>
        </div>
      </div>

    </form>
  );
};
