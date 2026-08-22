import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
const heroPoultryImg = 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=1600&q=85';
import { 
  ChevronLeft, 
  ChevronDown,
  Building2, 
  Factory,
  Fan,
  Pill,
  ShieldCheck,
  ArrowDown,
  PhoneCall,
  Package,
  Award,
  CheckCircle2,
  Cpu
} from 'lucide-react';
import { PageSection, ProductCategory } from '../types';

interface HeroProps {
  cmsHero?: { title?: string; body?: string; image?: string };
  onNavigate: (section: PageSection) => void;
  onSelectCategory: (cat: ProductCategory) => void;
  onOpenConsultation: () => void;
  onOpenQuote: () => void;
  onOpenAiAssistant?: () => void;
  children?: React.ReactNode;
}

interface CircleCategoryCard {
  id: ProductCategory;
  title: string;
  categoryEn: string;
  icon: React.ElementType;
  desc: string;
  badge: string;
  accentColor: string;
  badgeBg: string;
  badgeText: string;
  specs: string[];
}

export const Hero: React.FC<HeroProps> = ({
  cmsHero,
  onNavigate,
  onSelectCategory,
  onOpenConsultation,
  onOpenQuote,
  onOpenAiAssistant,
  children,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const cardsSectionRef = useRef<HTMLDivElement>(null);

  // Pure Fixed Backdrop & Rising Drawer/Cover Overlay Scroll
  // The hero is 100% fixed in place with all its elements strictly stationary.
  // The category section acts as a sliding drawer / cover sheet rising up over the hero.
  const scrollToCards = () => {
    if (cardsSectionRef.current) {
      cardsSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Exact 4 Categories in required order:
  // 1. ماشین آلات (Machinery)
  // 2. تجهیزات (Equipment)
  // 3. ساخت سوله و سالن (Shed & Hall Construction)
  // 4. خوراک و دارو (Feed & Pharma)
  const categoryCards: CircleCategoryCard[] = [
    {
      id: 'machinery',
      title: 'ماشین‌آلات خوراک',
      categoryEn: 'Feed Machinery',
      icon: Factory,
      desc: 'پرس پلت، اکسترودر، میکرودایزینگ و آسیاب میکسر',
      badge: 'کارخانجات خوراک',
      accentColor: '#003F86',
      badgeBg: 'bg-blue-50',
      badgeText: 'text-[#003F86]',
      specs: ['پرس پلت ۲ الی ۲۰ تن/ساعت', 'میکرودایزینگ دقیق افزودنی‌ها']
    },
    {
      id: 'ventilation',
      title: 'تجهیزات مرغداری',
      categoryEn: 'Farm Equipment',
      icon: Fan,
      desc: 'بشقاب پروانه‌ای FDA، آبخوری نیپل و جت هیتر',
      badge: 'تاییدیه FDA آمریکا',
      accentColor: '#FF9F14',
      badgeBg: 'bg-amber-50',
      badgeText: 'text-amber-700',
      specs: ['بشقاب پروانه‌ای لیسانس آمریکا', 'جت هیتر و سیستم‌های گرمایشی']
    },
    {
      id: 'structure',
      title: 'سوله و سالن صنعتی',
      categoryEn: 'Turnkey Shed',
      icon: Building2,
      desc: 'طراحی، ساخت سازه و تجهیز کامل سالن',
      badge: 'اجرای صفر تا صد',
      accentColor: '#003F86',
      badgeBg: 'bg-emerald-50',
      badgeText: 'text-emerald-700',
      specs: ['سازه‌های سبک و بهداشتی', 'عایق‌بندی و هوابندی کامل']
    },
    {
      id: 'feed_pharma',
      title: 'خوراک و مکمل',
      categoryEn: 'Feed & Supplements',
      icon: Pill,
      desc: 'کنسانتره تخصصی، پریمیکس و روغن خام سویا',
      badge: 'فرمولاسیون علمی',
      accentColor: '#FF9F14',
      badgeBg: 'bg-purple-50',
      badgeText: 'text-purple-700',
      specs: ['کنسانتره گوشتی و تخم‌گذار', 'پریمیکس دامی و روغن‌های گیاهی']
    },
  ];

  return (
    <div className="w-full relative min-h-screen">
      
      {/* ========================================================================= */}
      {/* 1. 100% FIXED HERO (Completely Stationary Underneath the Sliding Drawer) */}
      {/* ========================================================================= */}
      <section 
        id="hero-fixed-pinned-section"
        className="fixed top-16 left-0 right-0 w-full h-[calc(100vh-64px)] min-h-[620px] flex flex-col justify-between overflow-hidden bg-slate-950 selection:bg-amber-400 z-0 pointer-events-auto"
      >
        
        {/* Full-bleed Stationary Background Hero Photo with High Clarity & Mood */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="relative w-full h-full">
            <img 
              src={cmsHero?.image || heroPoultryImg}
              alt="شرکت طیوران صنعت پویا - تجهیزات و ماشین‌آلات مدرن مرغداری و دامپروری"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />

            {/* Industrial Vignette Gradient & Contrast Overlays for Text Legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/60" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-slate-950/70" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_40%,rgba(0,63,134,0.35),transparent_60%)]" />
          </div>

          {/* Precision Blueprint Grid Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_60%,transparent_100%)] pointer-events-none" />
        </div>

        {/* Ambient Subtle Flares */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-1">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#003F86]/30 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-amber-500/20 rounded-full blur-3xl" />
        </div>

        {/* Stationary Hero Content: Elements Entrance Once, Then Stay Strictly Fixed in Place */}
        <div className="relative z-10 flex-1 flex items-center justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center w-full">
            
            {/* Right Column: Slogan, Header, Subheader, Exactly 2 Buttons */}
            <div className="lg:col-span-7 flex flex-col items-start text-right space-y-6">
              
              {/* Short Slogan / Tagline Badge */}
              <motion.div 
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="inline-flex items-center gap-2.5 bg-slate-900/85 backdrop-blur-md border border-white/15 px-4 py-1.5 rounded-full shadow-lg"
              >
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-80"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF9F14]"></span>
                </span>
                <span className="text-xs sm:text-sm font-semibold text-slate-100">
                  پیشگام در طراحی سالن و تجهیزات مدرن مرغداری و کارخانجات خوراک
                </span>
              </motion.div>

              {/* Main Company Header */}
              <motion.h1 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.2] tracking-tight drop-shadow-md"
              >
                {cmsHero?.title || 'شرکت طیوران صنعت پویا'}
              </motion.h1>

              {/* Subheader Description */}
              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.35 }}
                className="text-sm sm:text-base lg:text-lg text-slate-200 leading-relaxed max-w-xl font-normal drop-shadow-sm"
              >
                {cmsHero?.body || 'مشاور، طراح و مجری توسعه و بهره‌برداری پروژه‌های صنعتی | تولیدکننده بشقاب‌های پروانه‌ای با لیسانس آمریکا و تاییدیه FDA، جت هیتر و ماشین‌آلات خوراک'}
              </motion.p>

              {/* EXACTLY 2 BUTTONS: محصولات & تماس با ما */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.45 }}
                className="flex items-center gap-4 pt-1 w-full sm:w-auto"
              >
                {/* 1. محصولات (Products Button) */}
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={scrollToCards}
                  id="hero-products-btn"
                  className="group relative bg-gradient-to-r from-amber-400 to-[#FF9F14] hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold px-7 py-3.5 rounded-2xl text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg hover:shadow-amber-500/25 transition-all cursor-pointer overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full duration-700 transition-transform" />
                  <Package className="w-5 h-5 text-slate-950" />
                  <span>محصولات</span>
                  <ChevronDown className="w-4 h-4 text-slate-900 group-hover:translate-y-0.5 transition-transform" />
                </motion.button>

                {/* 2. تماس با ما (Contact Us Button) */}
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onNavigate('contact')}
                  id="hero-contact-btn"
                  className="bg-white/10 hover:bg-white/20 text-white font-bold px-7 py-3.5 rounded-2xl text-sm sm:text-base flex items-center justify-center gap-2 border border-white/25 backdrop-blur-md shadow-sm hover:shadow-md transition-all cursor-pointer"
                >
                  <PhoneCall className="w-5 h-5 text-amber-400" />
                  <span>تماس با ما</span>
                  <ChevronLeft className="w-4 h-4 text-slate-300 group-hover:-translate-x-0.5 transition-transform" />
                </motion.button>
              </motion.div>

              {/* Minimal Trust Metric Indicators */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex items-center gap-6 pt-2 text-xs text-slate-300 font-medium"
              >
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>استاندارد CE بین‌المللی</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>گارانتی ۲۴ ماهه قطعات</span>
                </div>
              </motion.div>

            </div>

            {/* Left Column: Glassmorphic Telemetry Frame Stationary in Place */}
            <div className="lg:col-span-5 flex justify-center w-full relative">
              <div className="relative w-full max-w-md">
                
                {/* Visual Glass Frame Card */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="relative rounded-3xl overflow-hidden p-1.5 bg-gradient-to-br from-white/20 via-white/5 to-white/10 backdrop-blur-xl border border-white/20 shadow-2xl"
                >
                  <div className="relative rounded-[22px] overflow-hidden bg-slate-900 aspect-[4/3]">
                    <img 
                      src={cmsHero?.image || heroPoultryImg}
                      alt="فناوری و تجهیزات مدرن مرغداری و خوراک"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                    
                    {/* Caption Overlay */}
                    <div className="absolute bottom-3.5 right-3.5 left-3.5 flex items-center justify-between text-white z-10">
                      <div>
                        <span className="text-[10px] font-bold text-amber-400 block tracking-wider">
                          AUTOMATED POULTRY & FEED MILL
                        </span>
                        <h3 className="text-xs sm:text-sm font-bold text-white">
                          خطوط خوراک، اتوماسیون و سوله‌سازی
                        </h3>
                      </div>
                      <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-amber-300">
                        <Cpu className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Floating Telemetry Badge 1 (Top-Left) */}
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="absolute -top-4 -left-3 sm:-left-4 bg-slate-900/90 backdrop-blur-xl border border-white/20 px-3.5 py-2 rounded-2xl shadow-xl flex items-center gap-2.5 z-20"
                >
                  <div className="w-8 h-8 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center font-bold">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">اعتبار صنعتی</span>
                    <span className="text-xs font-bold text-white">۵۰+ سال تجربه مهندسی</span>
                  </div>
                </motion.div>

                {/* Floating Telemetry Badge 2 (Bottom-Right) */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="absolute -bottom-4 -right-3 sm:-right-4 bg-slate-900/90 backdrop-blur-xl border border-white/20 px-3.5 py-2.5 rounded-2xl shadow-xl flex items-center gap-3 z-20"
                >
                  <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">احداث و تجهیز</span>
                    <span className="text-xs font-bold text-white">۲۰۰+ پروژه ملی و بین‌المللی</span>
                  </div>
                </motion.div>

              </div>
            </div>

          </div>
        </div>

        {/* Minimal Bottom Bar with Smooth Category Navigation Trigger */}
        <div className="relative z-10 border-t border-white/10 bg-slate-950/75 backdrop-blur-md py-3 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <span className="text-xs text-slate-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>طراحی و اجرای خطوط تولید خوراک و اتوماسیون سالن در سراسر ایران</span>
            </span>

            <button
              onClick={scrollToCards}
              className="flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
            >
              <span>مشاهده محصولات و دسته‌بندی‌ها</span>
              <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
            </button>
          </div>
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 2. INVISIBLE SCROLL SPACER (Initial 100vh Viewport Slot for Fixed Hero) */}
      {/* ========================================================================= */}
      <div className="w-full h-[calc(100vh-64px)] pointer-events-none" />

      {/* ========================================================================= */}
      {/* 3. SLIDING DRAWER / COVER SHEET (Glides Up & Covers the Fixed Hero) */}
      {/* ========================================================================= */}
      <div 
        ref={cardsSectionRef}
        id="categories-drawer-sheet"
        className="relative z-20 w-full bg-[#F8FAFC] shadow-[0_-30px_70px_rgba(0,0,0,0.65)] rounded-t-[36px] sm:rounded-t-[48px] border-t border-slate-200/90 py-6 sm:py-8"
      >
        
        {/* Subtle Top Pull Handle Bar */}
        <div className="w-14 h-1.5 bg-slate-300 hover:bg-amber-400 rounded-full mx-auto mb-4 transition-colors" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          
          {/* Section Title Header */}
          <div className="w-full mb-6 text-center sm:text-right flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-4">
            <div>
              <span className="text-[11px] font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200/60 inline-block mb-1.5">
                دسته‌بندی تخصصی طیوران صنعت پویا
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#003F86]">
                خطوط تولید، تجهیزات و خدمات صفر تا صد مرغداری
              </h2>
            </div>

            <button
              onClick={() => onNavigate('contact')}
              className="self-center sm:self-auto text-xs bg-white hover:bg-slate-100 text-[#003F86] font-bold px-4 py-2.5 rounded-xl border border-slate-200 shadow-2xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <PhoneCall className="w-4 h-4 text-amber-500" />
              <span>ارتباط با واحد فروش و مهندسی</span>
            </button>
          </div>

          {/* Main Center Area: 5 Columns on Desktop (4 Category Circles + 1 Brand Card) */}
          <div className="relative z-10 flex-1 flex items-center justify-center py-2 w-full">
            
            {/* Desktop & Laptop Layout: 5 Columns side by side */}
            <div className="hidden lg:grid lg:grid-cols-5 gap-3 xl:gap-4 w-full items-center justify-center">
              
              {/* 4 Circular Category Cards */}
              {categoryCards.map((card, idx) => {
                const Icon = card.icon;
                const isHovered = hoveredIndex === idx;
                return (
                  <div
                    key={idx}
                    id={`hero-category-card-${card.id}`}
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={() => onSelectCategory(card.id)}
                    className="group relative cursor-pointer flex flex-col items-center justify-between p-3.5 xl:p-4 rounded-3xl transition-all duration-300 bg-white hover:bg-white border border-slate-200/80 hover:border-amber-400 shadow-sm hover:shadow-lg h-[370px] xl:h-[390px]"
                  >
                    {/* Top Badge & Number */}
                    <div className="w-full flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-400 font-mono">
                        0{idx + 1}
                      </span>
                      <span className={`text-[10px] font-bold ${card.badgeBg} ${card.badgeText} px-2 py-0.5 rounded-full border border-slate-200/60`}>
                        {card.badge}
                      </span>
                    </div>

                    {/* Circular Icon Container */}
                    <div className="relative w-28 h-28 xl:w-32 xl:h-32 my-auto flex items-center justify-center">
                      
                      {/* Outer Concentric Animated Ring */}
                      <div 
                        className={`absolute inset-0 rounded-full border border-dashed transition-all duration-500 ${
                          isHovered 
                            ? 'border-amber-400 scale-105 rotate-45' 
                            : 'border-slate-200 scale-100 rotate-0'
                        }`} 
                      />

                      {/* Solid Precision Technical Circle */}
                      <div 
                        className={`w-24 h-24 xl:w-28 xl:h-28 rounded-full flex flex-col items-center justify-center relative z-10 transition-all duration-300 border ${
                          isHovered
                            ? 'bg-[#003F86] text-white border-blue-900 shadow-md shadow-blue-900/30'
                            : 'bg-slate-50 text-slate-700 border-slate-200'
                        }`}
                      >
                        <Icon className={`w-8 h-8 xl:w-9 xl:h-9 transition-transform duration-300 ${isHovered ? 'scale-110 text-amber-400' : 'text-[#003F86]'}`} />
                        <span className={`text-[9px] font-bold mt-1 ${isHovered ? 'text-blue-100' : 'text-slate-500'}`}>
                          {card.categoryEn}
                        </span>
                      </div>
                    </div>

                    {/* Bottom Title & Specs */}
                    <div className="w-full text-center space-y-1">
                      <h3 className="text-sm xl:text-base font-black text-slate-800 group-hover:text-[#003F86] transition-colors">
                        {card.title}
                      </h3>
                      <p className="text-[11px] text-slate-500 line-clamp-1">
                        {card.desc}
                      </p>

                      {/* Click to Explore Hint */}
                      <div className="pt-2 flex items-center justify-center gap-1 text-[11px] font-bold text-[#003F86] group-hover:text-amber-600 transition-colors">
                        <span>مشاهده و سفارش</span>
                        <ChevronLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                      </div>
                    </div>

                  </div>
                );
              })}

              {/* 5th Column: Brand & Engineering Consultation Box */}
              <div className="p-4 rounded-3xl bg-gradient-to-br from-[#003F86] via-[#002d61] to-[#001c3d] text-white flex flex-col justify-between h-[370px] xl:h-[390px] shadow-lg border border-blue-800/80 relative overflow-hidden group">
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-amber-300 bg-white/10 px-2 py-0.5 rounded-full border border-white/10">
                      مشاوره فنی
                    </span>
                    <Award className="w-4 h-4 text-amber-400" />
                  </div>

                  <h3 className="text-sm xl:text-base font-black text-white">
                    طیوران صنعت پویا
                  </h3>
                  
                  <p className="text-[11px] text-blue-100 leading-relaxed font-normal">
                    محاسبه دقیق ظرفیت تهویه، گرمایش سالن، خطوط انتقال دان و خوراک متناسب با نیاز پروژه.
                  </p>
                </div>

                {/* 2 Focused Highlights */}
                <div className="space-y-1.5 my-2">
                  <div className="bg-white/10 rounded-xl p-2 flex items-center gap-2 border border-white/10 text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="font-medium text-slate-100">گارانتی ۲۴ ماهه قطعات</span>
                  </div>
                  <div className="bg-white/10 rounded-xl p-2 flex items-center gap-2 border border-white/10 text-[11px]">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="font-medium text-slate-100">خدمات نصب سراسر کشور</span>
                  </div>
                </div>

                {/* CTA Buttons inside Card */}
                <div className="space-y-1.5">
                  <button
                    onClick={onOpenConsultation}
                    className="w-full bg-gradient-to-r from-amber-400 to-[#FF9F14] hover:from-amber-300 hover:to-amber-400 text-slate-950 text-xs font-black py-2.5 px-3 rounded-xl flex items-center justify-center gap-1 shadow transition-all cursor-pointer"
                  >
                    <span>درخواست مشاوره رایگان</span>
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onNavigate('contact')}
                    className="w-full bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold py-1.5 px-3 rounded-xl flex items-center justify-center gap-1 border border-white/15 transition-colors cursor-pointer"
                  >
                    <span>اطلاعات تماس</span>
                  </button>
                </div>

              </div>

            </div>

            {/* Mobile / Tablet Horizontal Scrollable / Stack Layout for 4 Categories */}
            <div className="lg:hidden w-full space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {categoryCards.map((card, idx) => {
                  const Icon = card.icon;
                  return (
                    <div
                      key={idx}
                      onClick={() => onSelectCategory(card.id)}
                      className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center text-center cursor-pointer active:scale-95 transition-transform"
                    >
                      <div className="w-14 h-14 rounded-full bg-blue-50 text-[#003F86] flex items-center justify-center mb-2 border border-blue-100">
                        <Icon className="w-6 h-6 text-[#003F86]" />
                      </div>
                      <span className="text-xs font-black text-slate-800">{card.title}</span>
                      <span className="text-[10px] text-slate-400 mt-0.5">{card.badge}</span>
                    </div>
                  );
                })}
              </div>

              {/* Mobile Brand Card */}
              <div className="p-4 rounded-2xl bg-[#003F86] text-white shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-black text-white">طیوران صنعت پویا</h4>
                    <p className="text-[11px] text-blue-100 mt-0.5">مشاوره فنی، طراحی و تجهیز سالن و کارخانجات خوراک</p>
                  </div>
                  <span className="text-xs font-black text-amber-400 bg-white/10 px-2.5 py-1 rounded-xl">
                    مشاوره تخصصی
                  </span>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <button
                    onClick={onOpenConsultation}
                    className="flex-1 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>درخواست مشاوره مهندسی</span>
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Quick Feature Strip */}
          <div className="relative z-10 w-full mt-6">
            <div className="bg-white/90 backdrop-blur-xs border border-slate-200/90 rounded-2xl p-3 sm:px-5 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600 shadow-2xs">
              
              <div className="flex items-center gap-4">
                <span className="font-bold text-slate-800 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  استاندارد ماشین‌آلات سنگین CE
                </span>
                <span className="hidden sm:inline text-slate-300">|</span>
                <span className="hidden sm:inline text-slate-500">
                  پشتیبانی فنی ۲۴/۷ و تامین فوری قطعات کارخانه
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => onNavigate('contact')}
                  className="text-[#003F86] hover:text-amber-500 font-bold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>مشاوره و تماس با ما</span>
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>

          {/* Seamless Content Continuation (About & Contact Unified Section) */}
          {children && (
            <div className="relative z-10 w-full mt-8 sm:mt-10">
              {children}
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
