import React, { useState, useEffect } from 'react';
import { LazyImage } from "./LazyImage";
import { Package, Newspaper, ArrowLeft, ChevronLeft, Sparkles, Zap, ArrowRight } from 'lucide-react';
import { Product, Article } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface CompactShowcaseProps {
  products: Product[];
  articles: Article[];
  onNavigate: (path: string) => void;
  onSelectProduct: (productId: string) => void;
  onSelectArticle: (articleId: string) => void;
}

export const CompactShowcase: React.FC<CompactShowcaseProps> = ({
  products,
  articles,
  onNavigate,
  onSelectProduct,
  onSelectArticle
}) => {
  const [randomProducts, setRandomProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (products && products.length > 0) {
      setRandomProducts([...products].sort(() => 0.5 - Math.random()).slice(0, 4));
    }
  }, [products]);

  const featuredArticles = articles.slice(0, 3);
  
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide functionality
  useEffect(() => {
    if (randomProducts.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % randomProducts.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [randomProducts.length]);

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-24 mt-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        
        {/* Dynamic Product Slider (takes 7 cols) */}
        <div className="lg:col-span-7 relative rounded-[2.5rem] p-1 overflow-hidden group shadow-2xl shadow-blue-900/20">
          {/* Animated Background Gradient (Aurora style) */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-[#003F86] to-indigo-900" />
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_rgba(56,189,248,0.4)_0%,_transparent_50%)] animate-pulse" />
          <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,_rgba(251,191,36,0.3)_0%,_transparent_50%)] animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
          
          <div className="relative z-10 bg-slate-900/30 backdrop-blur-2xl rounded-[2.2rem] h-full border border-white/10 flex flex-col p-6 sm:p-10 overflow-hidden">
            
            {/* Header */}
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md text-amber-400 flex items-center justify-center border border-white/20 shadow-inner shadow-white/10">
                  <Zap className="w-6 h-6" fill="currentColor" />
                </div>
                <div>
                  <h3 className="font-black text-xl sm:text-2xl text-white tracking-tight">محصولات منتخب</h3>
                  <span className="text-[10px] sm:text-[11px] font-bold text-amber-400/90 mt-1 block tracking-wider uppercase">پیشنهادهای ویژه و تصادفی</span>
                </div>
              </div>
              <button 
                onClick={() => onNavigate('products')}
                className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs font-bold text-white bg-white/10 hover:bg-white hover:text-[#003F86] flex items-center gap-2 transition-all duration-300 backdrop-blur-md border border-white/20 hover:border-transparent group/btn"
              >
                <span className="hidden sm:inline">کاتالوگ کامل</span>
                <span className="sm:hidden">همه</span>
                <ArrowLeft className="w-4 h-4 group-hover/btn:-translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Slider Content */}
            <div className="flex-1 relative flex items-center justify-center min-h-[250px] sm:min-h-[300px]">
              <AnimatePresence mode="wait">
                {randomProducts.length > 0 && (
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, scale: 0.95, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 1.05, y: -15 }}
                    transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                    className="w-full flex flex-col md:flex-row items-center gap-6 sm:gap-10 cursor-pointer group/slide"
                    onClick={() => onSelectProduct(randomProducts[currentSlide].id)}
                  >
                    <div className="w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64 shrink-0 relative rounded-full flex items-center justify-center p-2 sm:p-4">
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-white/20 rounded-full blur-2xl group-hover/slide:blur-3xl transition-all duration-700" />
                      <LazyImage 
                        src={randomProducts[currentSlide].image} 
                        alt={randomProducts[currentSlide].name} 
                        className="w-full h-full relative z-10" 
                        imgClassName="w-full h-full object-contain filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.4)] transition-transform duration-700 group-hover/slide:scale-110 group-hover/slide:-rotate-3 group-hover/slide:drop-shadow-[0_30px_40px_rgba(0,0,0,0.6)]" 
                      />
                    </div>
                    
                    <div className="flex-1 text-center md:text-right flex flex-col items-center md:items-start">
                      <motion.span 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-block px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full text-[10px] font-black tracking-wider mb-3 sm:mb-4"
                      >
                        {randomProducts[currentSlide].categoryTitle}
                      </motion.span>
                      <motion.h4 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-xl sm:text-3xl lg:text-4xl font-black text-white leading-tight mb-4 sm:mb-6"
                      >
                        {randomProducts[currentSlide].name}
                      </motion.h4>
                      <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex items-center gap-2 text-white/60 text-xs sm:text-sm font-medium group-hover/slide:text-amber-400 transition-colors"
                      >
                        مشاهده جزئیات و مشخصات فنی <ChevronLeft className="w-4 h-4 group-hover/slide:-translate-x-1 transition-transform" />
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Slider Dots */}
            <div className="flex items-center justify-center gap-2 mt-6 sm:mt-8 z-20">
              {randomProducts.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => { e.stopPropagation(); setCurrentSlide(idx); }}
                  className={`h-1.5 sm:h-2 rounded-full transition-all duration-500 ${currentSlide === idx ? 'w-8 sm:w-10 bg-amber-400' : 'w-2 bg-white/20 hover:bg-white/40'}`}
                />
              ))}
            </div>

          </div>
        </div>

        {/* Dynamic Articles Column (takes 5 cols) */}
        <div className="lg:col-span-5 relative bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-6 sm:p-8 flex flex-col shadow-[0_8px_30px_-12px_rgba(0,30,80,0.08)] border border-slate-100 overflow-hidden">
          {/* Subtle Decorative Background */}
          <div className="absolute -top-32 -left-32 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center justify-between mb-8 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100/80 text-amber-600 flex items-center justify-center border border-amber-200/50 shadow-inner">
                <Newspaper className="w-6 h-6" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-black text-xl sm:text-2xl text-slate-800 tracking-tight">آخرین مقالات</h3>
                <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 mt-1 block tracking-wider uppercase">مجله تخصصی طیوران</span>
              </div>
            </div>
            <button 
              onClick={() => onNavigate('magazine')}
              className="w-10 h-10 rounded-full bg-slate-50 hover:bg-amber-500 hover:text-white flex items-center justify-center transition-all duration-300 cursor-pointer shadow-sm border border-slate-200 hover:border-transparent text-slate-500 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="flex flex-col gap-4 sm:gap-5 flex-1 relative z-10 justify-center">
            {featuredArticles.map((article, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                key={article.id}
                onClick={() => onSelectArticle(article.id)}
                className="group flex items-stretch gap-4 bg-white rounded-[1.25rem] p-2.5 border border-slate-100/80 hover:border-amber-200 transition-all duration-300 cursor-pointer hover:shadow-[0_12px_24px_-10px_rgba(245,158,11,0.15)] hover:-translate-y-1"
              >
                <div className="w-24 sm:w-28 shrink-0 rounded-xl overflow-hidden relative shadow-sm">
                   <LazyImage src={article.image} alt={article.title} className="w-full h-full" imgClassName="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                   <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
                </div>
                
                <div className="flex-1 min-w-0 py-2 pr-1 pl-2 flex flex-col justify-center">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-[9px] sm:text-[10px] font-black px-2 py-0.5 rounded border border-amber-200/60 bg-amber-50/50 text-amber-700">
                      {article.categoryLabel}
                    </span>
                    <span className="text-[9px] sm:text-[10px] text-slate-400 font-medium">
                      {article.readTime}
                    </span>
                  </div>
                  <h4 className="text-[13px] sm:text-[15px] font-bold text-slate-800 group-hover:text-[#003F86] transition-colors line-clamp-2 leading-relaxed">
                    {article.title}
                  </h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
