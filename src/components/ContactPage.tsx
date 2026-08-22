import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageSquare, 
  FileText, 
  Wrench, 
  ShieldCheck, 
  Headphones,
  Sparkles
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { FreeConsultationForm } from './FreeConsultationForm';

interface ContactPageProps {
  initialSubject?: string;
  initialProduct?: string;
  initialMessage?: string;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  initialSubject,
  initialProduct,
  initialMessage
}) => {
  const { companyInfo } = useData();

  const handleScrollToForm = (subject?: string) => {
    const el = document.getElementById('free-consultation-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="py-10 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#003F86] bg-blue-50 px-3 py-1 rounded-full mb-3 border border-blue-100">
            <Headphones className="w-3.5 h-3.5 text-amber-500" />
            <span>مرکز ارتباط و مشاوره تخصصی مهندسی</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            ارتباط با شرکت طیوران صنعت پویا
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-2 font-normal">
            مشاوره رایگان مهندسی، استعلام قیمت تجهیزات و پشتیبانی خطوط تولید دام، طیور و خوراک
          </p>
        </div>

        {/* 4 Direct Quick Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div 
            onClick={() => handleScrollToForm('سوله و سالن صنعتی')}
            className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-[#003F86] hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#003F86] group-hover:bg-[#003F86] group-hover:text-amber-400 flex items-center justify-center mb-3 transition-colors">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-sm mb-1">
                ۱. مشاوره پروژه و سوله
              </h3>
              <p className="text-[11px] text-slate-500 leading-relaxed font-normal">
                بررسی امکان‌سنجی، محاسبات تهویه و جانمایی سالن برای پروژه‌های جدید.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] font-bold text-[#003F86]">
              <span>تکمیل فرم مشاوره رایگان ↓</span>
            </div>
          </div>

          <div 
            onClick={() => handleScrollToForm('استعلام قیمت و پیش‌فاکتور')}
            className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-amber-400 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 group-hover:bg-amber-400 group-hover:text-slate-950 flex items-center justify-center mb-3 transition-colors">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-sm mb-1">
                ۲. درخواست پیش‌فاکتور
              </h3>
              <p className="text-[11px] text-slate-500 leading-relaxed font-normal">
                استعلام قیمت رسمی تجهیزات دانخوری، آبخوری، فن‌ها و ماشین‌آلات خوراک.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] font-bold text-amber-600">
              <span>تکمیل فرم استعلام ↓</span>
            </div>
          </div>

          <div 
            onClick={() => handleScrollToForm('تجهیزات گرمایشی و جت هیتر')}
            className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-[#003F86] hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 group-hover:bg-[#003F86] group-hover:text-white flex items-center justify-center mb-3 transition-colors">
                <Wrench className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-sm mb-1">
                ۳. ارتباط با واحد فنی
              </h3>
              <p className="text-[11px] text-slate-500 leading-relaxed font-normal">
                پاسخ به سوالات کالیبراسیون، دیاگرام سیم‌کشی و نقشه‌های جانمایی.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] font-bold text-slate-700">
              <span>مشاوره فنی مهندسی ↓</span>
            </div>
          </div>

          <div 
            onClick={() => handleScrollToForm('خدمات پس از فروش و قطعات')}
            className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white flex items-center justify-center mb-3 transition-colors">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-sm mb-1">
                ۴. خدمات پس از فروش
              </h3>
              <p className="text-[11px] text-slate-500 leading-relaxed font-normal">
                سفارش قطعات یدکی فوری، اعزام تکنسین، سرویس دای و رولر و اورهال.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] font-bold text-emerald-600">
              <span>درخواست پشتیبانی و قطعات ↓</span>
            </div>
          </div>

        </div>

        {/* Central Layout: Unified Free Consultation Form + Contact Direct Info Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Free Consultation Form (7 Cols) */}
          <div className="lg:col-span-7">
            <FreeConsultationForm 
              initialSubject={initialSubject}
              initialProduct={initialProduct}
              initialMessage={initialMessage}
            />
          </div>

          {/* Contact Direct Info Box (5 Cols) */}
          <div className="lg:col-span-5 space-y-5">
            
            <div className="bg-gradient-to-br from-[#002b5e] to-slate-950 text-white rounded-3xl p-6 sm:p-7 border border-blue-900 shadow-lg space-y-4">
              <h3 className="font-black text-amber-400 text-base flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>راه‌های ارتباط مستقیم و تلفنی</span>
              </h3>

              <div className="space-y-3.5 text-xs">
                <div className="flex items-start gap-3 bg-white/5 p-3 rounded-xl border border-white/10">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400 block text-[11px]">تلفن دفتر مرکزی:</span>
                    <a href={`tel:${companyInfo.phone}`} className="font-mono font-bold text-white text-sm hover:text-amber-400 transition-colors">
                      {companyInfo.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/5 p-3 rounded-xl border border-white/10">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400 block text-[11px]">واحد فروش مستقیم و استعلام:</span>
                    <a href={`tel:${companyInfo.salesPhone || companyInfo.phone}`} className="font-mono font-bold text-white text-sm hover:text-emerald-400 transition-colors">
                      {companyInfo.salesPhone || companyInfo.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/5 p-3 rounded-xl border border-white/10">
                  <Mail className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400 block text-[11px]">پست الکترونیک رسمی:</span>
                    <a href={`mailto:${companyInfo.email}`} className="font-mono text-slate-200 hover:text-amber-400 transition-colors">
                      {companyInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/5 p-3 rounded-xl border border-white/10">
                  <Clock className="w-4 h-4 text-blue-300 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400 block text-[11px]">ساعات پاسخگویی مهندسین:</span>
                    <span className="text-slate-200">{companyInfo.workingHours}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm space-y-4 text-xs">
              <h4 className="font-black text-slate-900 text-sm flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#003F86]" />
                <span>نشانی کارخانجات و دفاتر رسمی</span>
              </h4>
              <div className="space-y-3 text-slate-600 divide-y divide-slate-100">
                <div className="pt-2">
                  <strong className="text-slate-900 block mb-0.5">دفتر مرکزی و کارخانه:</strong>
                  <span className="leading-relaxed text-slate-600">{companyInfo.address}</span>
                </div>
                <div className="pt-3">
                  <strong className="text-slate-900 block mb-0.5">پوشش خدمات و نمایندگی:</strong>
                  <span className="leading-relaxed text-slate-600">ارسال تجهیزات و اعزام تیم نصب و راه‌اندازی به تمامی استان‌ها و شهرهای کشور.</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
