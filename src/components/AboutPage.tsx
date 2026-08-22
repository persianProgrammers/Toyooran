import React from 'react';
import { 
  Award, 
  ShieldCheck, 
  Factory, 
  Layers, 
  CheckCircle2, 
  PhoneCall, 
  MapPin, 
  Clock, 
  Sparkles,
  Users,
  Target,
  Warehouse,
  Flame,
  Wheat,
  Droplets,
  Pill
} from 'lucide-react';
import { COMPANY_INFO, TESTIMONIALS_AND_PROOF } from '../data/mockData';

interface AboutPageProps {
  onOpenConsultation?: () => void;
  onOpenQuote?: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onOpenConsultation = () => {},
  onOpenQuote = () => {},
}) => {
  const coreCompetencies = [
    {
      icon: Warehouse,
      title: 'راهکار جامع توسعه، تجهیز و سوله',
      desc: 'طراحی، ساخت و تجهیز کامل و صفر تا صد سوله، کارخانجات و سالن‌های مرغداری با سازه‌های مدرن، سبک، بهداشتی و صنعتی.'
    },
    {
      icon: Award,
      title: 'تولید انحصاری تحت لیسانس FDA آمریکا',
      desc: 'تنها تولیدکننده بشقاب‌های پروانه‌ای تحت لیسانس Butterfly Concepts آمریکا با تاییدیه رسمی FDA در کشور.'
    },
    {
      icon: Flame,
      title: 'تولید تخصصی جت هیتر و تجهیزات گرمایشی',
      desc: 'تولید انواع جت هیترهای موشکی ۱۰۰ و ۵۰ (گازی، گازوئیلی و دوگانه‌سوز)، هیتر کابینی، پنجره‌های اینلت و تهویه تخصصی.'
    },
    {
      icon: Factory,
      title: 'تولید ماشین‌آلات پیشرفته خطوط خوراک',
      desc: 'طراحی و ساخت ماشین‌آلات سنگین شامل پرس پلت، اکسترودر آبزیان، فلیکر اسب، میکرودایزینگ، آسیاب، میکسر و خشک‌کن تونلی.'
    },
    {
      icon: Droplets,
      title: 'تأمین تجهیزات آبخوری و دانخوری مرغداری',
      desc: 'سیستم آبخوری نیپل TSPK تمام استیل کارنو، فشارشکن، دانخوری بشقابی پروانه‌ای، پویا، پارس، کناوی و خطوط انتقال دان.'
    },
    {
      icon: Pill,
      title: 'تولید خوراک، مکمل، روغن و دارو',
      desc: 'تولید کنسانتره Mac و تخم‌گذار، جایگزین‌های فرآوری‌شده ذرت و جو، پریمیکس دامی و اسب، روغن خام سویا/آفتابگردان و اسید چرب.'
    }
  ];

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page Hero */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#003F86] bg-blue-50 px-3 py-1 rounded-full mb-3 border border-blue-100">
            <Award className="w-3.5 h-3.5 text-amber-500" />
            <span>بیش از ۵۰ سال سابقه درخشان در صنعت دام، طیور و آبزیان</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            درباره شرکت طیوران صنعت پویا
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-3 font-normal leading-relaxed">
            مشاور، طراح و مجری توسعه و بهره‌برداری پروژه‌های صنعتی با سابقه اجرای بیش از ۲۰۰ پروژه بزرگ ملی و بین‌المللی
          </p>
        </div>

        {/* Story & Core Capabilities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              راهکار جامع توسعه، تجهیز و بهره‌برداری صنعتی
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
              شرکت <strong>طیوران صنعت پویا</strong> به عنوان مشاور، طراح و مجری توسعه و بهره‌برداری پروژه‌های صنعتی، با تکیه بر بیش از ۵۰ سال تجربه در صنعت دام، طیور و آبزیان و اجرای بیش از ۲۰۰ پروژه ملی و بین‌المللی، زنجیره کاملی از خدمات فنی، تولید ماشین‌آلات و تأمین تجهیزات را ارائه می‌نماید.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
              این مجموعه افتخار دارد که به عنوان تنها تولیدکننده بشقاب‌های پروانه‌ای تحت لیسانس <strong>Butterfly Concepts آمریکا با تاییدیه رسمی FDA</strong> و همچنین تولیدکننده تخصصی جت هیتر و ماشین‌آلات مدرن خطوط فرآوری خوراک، استانداردهای نوینی از بهره‌وری و سودآوری را در مزارع پرورشی و کارخانجات خوراک پیاده‌سازی نماید.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-3">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <span className="text-2xl font-black text-[#003F86] font-mono">۵۰+ سال</span>
                <span className="text-xs text-slate-600 block mt-1">تجربه تخصصی در صنعت</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <span className="text-2xl font-black text-[#003F86] font-mono">۲۰۰+</span>
                <span className="text-xs text-slate-600 block mt-1">پروژه ملی و بین‌المللی</span>
              </div>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200 h-80 sm:h-96">
            <img
              src="https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1000&q=80"
              alt="Toyooran Factory"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 right-6 left-6 text-white text-xs">
              <strong className="block text-sm font-bold text-amber-400 mb-1">
                کارخانجات و دفاتر مهندسی طیوران صنعت پویا
              </strong>
              <span>مشهد (دفتر مرکزی و کارخانه بلوار میثاق) و گرگان (ساختمان دفتر تحقیق و توسعه دانشگاه منابع طبیعی)</span>
            </div>
          </div>
        </div>

        {/* 6 Core Pillars */}
        <div className="bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200">
          <h3 className="text-lg sm:text-xl font-black text-slate-900 text-center mb-8">
            محورهای اصلی فعالیت و توانمندی‌های شرکت
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreCompetencies.map((comp, idx) => {
              const Icon = comp.icon;
              return (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#003F86] mb-3">
                    <Icon className="w-5 h-5 text-[#003F86]" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1.5">
                    {comp.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {comp.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Customer Proof & Testimonials */}
        <div>
          <h3 className="text-lg sm:text-xl font-black text-slate-900 text-center mb-6">
            دیدگاه مشتریان و مدیران پروژه‌ها
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS_AND_PROOF.map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-4 font-normal">
                  «{item.text}»
                </p>
                <div className="pt-3 border-t border-slate-100">
                  <strong className="text-xs font-bold text-slate-900 block">
                    {item.author}
                  </strong>
                  <span className="text-[11px] text-slate-500">
                    {item.role} ({item.location})
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
