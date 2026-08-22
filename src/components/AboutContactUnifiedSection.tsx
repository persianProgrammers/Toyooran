import React from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Clock, 
  Award, 
  ShieldCheck, 
  Factory, 
  Flame,
  FileText
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { FreeConsultationForm } from './FreeConsultationForm';

interface AboutContactUnifiedSectionProps {
  onOpenQuote?: () => void;
  initialSubject?: string;
  initialProduct?: string;
}

export const AboutContactUnifiedSection: React.FC<AboutContactUnifiedSectionProps> = ({
  initialSubject,
  initialProduct
}) => {
  const { companyInfo } = useData();

  const keyHighlights = [
    {
      icon: Award,
      title: 'طراحی مهندسی و اجرای کامل',
      desc: 'مشاوره تخصصی، محاسبات سازه و نقشه جانمایی تجهیزات متناسب با متراژ سالن و نوع پرورش.'
    },
    {
      icon: Factory,
      title: 'تولید انحصاری با استاندارد FDA',
      desc: 'تولید بشقاب‌های پروانه‌ای تحت لیسانس Butterfly Concepts آمریکا با توزیع یکنواخت دان.'
    },
    {
      icon: Flame,
      title: 'جت هیتر و تجهیزات خطوط خوراک',
      desc: 'سازنده جت هیترهای موشکی راندمان بالا، خطوط پرس پلت، اکسترودر و میکرودایزینگ.'
    },
    {
      icon: ShieldCheck,
      title: 'گارانتی و تأمین قطعات یدکی',
      desc: 'پوشش ضمانت ۲۴ ماهه قطعات، خدمات پس از فروش و پشتیبانی فنی در سراسر کشور.'
    }
  ];

  const handleScrollToForm = () => {
    const el = document.getElementById('free-consultation-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="pt-4 pb-2 w-full" id="about-contact-unified">
      {/* Unified Frame / Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden">
        
        {/* Top Header Strip inside the Card */}
        <div className="bg-gradient-to-r from-[#002b5e] via-[#003F86] to-[#002b5e] px-6 sm:px-10 py-6 text-white flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-blue-900/50">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-400 text-xs font-bold mb-1.5 border border-white/15">
              <Building2 className="w-3.5 h-3.5" />
              <span>درباره ما و راه‌های ارتباطی مستقیم</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              شرکت طیوران صنعت پویا
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleScrollToForm}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black px-4 py-2.5 rounded-xl transition-all shadow flex items-center gap-1.5 active:scale-95"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>دریافت مشاوره رایگان</span>
            </button>
            <a
              href={`tel:${companyInfo.salesPhone || companyInfo.phone}`}
              className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-4 py-2.5 rounded-xl border border-white/20 transition-all flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>{companyInfo.salesPhone || companyInfo.phone}</span>
            </a>
          </div>
        </div>

        {/* 2-Column Split: Right = About Us & Highlights, Left = Free Consultation Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x lg:divide-x-reverse divide-slate-150">
          
          {/* Right Column: About Us & Capabilities (6 cols) */}
          <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 space-y-6 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-black text-slate-900 mb-2">
                مرکز تخصصی طراحی و تجهیز مزارع پرورشی و کارخانجات خوراک
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal text-justify">
                شرکت <strong>طیوران صنعت پویا</strong> ارائه دهنده راهکارهای جامع مهندسی در زمینه طراحی سازه و سوله، اتوماسیون تهویه و گرمایش سالن، خطوط مکانیزه انتقال دان و آبخوری نیپل، و خطوط کامل تولید خوراک دام، طیور و آبزیان در سراسر کشور می‌باشد.
              </p>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {keyHighlights.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div 
                    key={idx} 
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-blue-50/40 hover:border-blue-200 transition-colors flex flex-col justify-between"
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="w-7 h-7 rounded-lg bg-blue-100/70 text-[#003F86] flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 leading-tight">
                        {item.title}
                      </h4>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-normal font-normal">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Address & Office Locations Strip */}
            <div className="pt-4 border-t border-slate-150 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-600">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 text-xs font-bold mb-0.5">دفتر مرکزی و کارخانه:</strong>
                  <span className="text-[11px] leading-relaxed text-slate-600 block">{companyInfo.address}</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#003F86] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 text-xs font-bold mb-0.5">ساعات پاسخگویی:</strong>
                  <span className="text-[11px] leading-relaxed text-slate-600 block">{companyInfo.workingHours}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Left Column: Unified Free Consultation Form (6 cols) */}
          <div className="lg:col-span-6 p-4 sm:p-6 lg:p-8 bg-slate-50/50">
            <FreeConsultationForm 
              compact={true} 
              initialSubject={initialSubject}
              initialProduct={initialProduct}
            />
          </div>

        </div>

      </div>
    </section>
  );
};
