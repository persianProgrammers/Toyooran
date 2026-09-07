import React from 'react';
import { LazyImage } from "./LazyImage";
import { Package, Newspaper, ArrowLeft, ChevronLeft, Sparkles, TrendingUp } from 'lucide-react';
import { Product, Article } from '../types';

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
  // Take top 3 of each to keep it compact
  const featuredProducts = products.slice(0, 3);
  const featuredArticles = articles.slice(0, 3);

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-20 mt-8">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
        
        {/* Products Column (takes 3/5 width on desktop) */}
        <div className="lg:col-span-3 bg-white rounded-[2.5rem] border border-slate-100 p-6 sm:p-8 flex flex-col shadow-[0_8px_30px_-12px_rgba(0,30,80,0.08)] relative overflow-hidden group/wrapper transition-all duration-500 hover:shadow-[0_12px_40px_-12px_rgba(0,30,80,0.12)]">
          {/* Subtle Decorative Background */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(ellipse_at_top_right,_rgba(0,63,134,0.03)_0%,_transparent_70%)] pointer-events-none" />
          
          <div className="flex items-center justify-between mb-8 relative z-10 border-b border-slate-100/50 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100/50 text-[#003F86] flex items-center justify-center shadow-inner border border-blue-100/50">
                <Package className="w-6 h-6" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-black text-xl text-slate-800 tracking-tight">منتخب محصولات</h3>
                <span className="text-[11px] font-bold text-slate-400 mt-0.5 block">پرفروش‌ترین تجهیزات</span>
              </div>
            </div>
            <button 
              onClick={() => onNavigate('products')}
              className="px-4 py-2 rounded-full text-xs font-bold text-slate-600 bg-slate-50 hover:bg-[#003F86] hover:text-white flex items-center gap-2 transition-all duration-300 cursor-pointer shadow-sm border border-slate-100 hover:border-transparent group"
            >
              مشاهده همه <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-5 flex-1 relative z-10">
            {featuredProducts.map(product => (
              <div 
                key={product.id}
                onClick={() => onSelectProduct(product.id)}
                className="group relative bg-white rounded-[1.5rem] p-3 sm:p-4 border border-slate-100 hover:border-blue-200 transition-all duration-300 cursor-pointer flex flex-col h-full overflow-hidden hover:shadow-[0_12px_24px_-10px_rgba(0,63,134,0.12)] hover:-translate-y-1"
              >
                <div className="w-full aspect-[4/3] rounded-xl bg-slate-50/80 mb-4 overflow-hidden flex items-center justify-center relative">
                  {/* Soft inner glow on image container */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-100/40 to-transparent mix-blend-multiply z-10" />
                  <LazyImage src={product.image} alt={product.name} className="w-full h-full absolute inset-0 flex items-center justify-center bg-transparent" imgClassName="w-[80%] h-[80%] object-contain group-hover:scale-110 transition-transform duration-500 relative z-0" />
                  
                  {/* Trending badge */}
                  <div className="absolute top-2 right-2 z-20 w-7 h-7 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity transform scale-90 group-hover:scale-100">
                     <TrendingUp className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="flex-1 flex flex-col px-1">
                  <span className="text-[10px] font-extrabold tracking-wider text-blue-600 mb-1.5 uppercase">{product.categoryTitle}</span>
                  <h4 className="text-[13px] sm:text-sm font-bold text-slate-800 group-hover:text-[#003F86] transition-colors leading-relaxed mb-3 line-clamp-2">
                    {product.name}
                  </h4>
                </div>

                <div className="mt-auto px-1 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 font-medium">مشاهده جزئیات</span>
                  <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 text-slate-400 group-hover:bg-[#003F86] group-hover:text-white group-hover:border-[#003F86] transition-colors">
                     <ChevronLeft className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Articles Column (takes 2/5 width on desktop) */}
        <div className="lg:col-span-2 bg-gradient-to-b from-white to-slate-50/50 rounded-[2.5rem] border border-slate-100 p-6 sm:p-8 flex flex-col shadow-[0_8px_30px_-12px_rgba(0,0,0,0.06)] relative overflow-hidden group/wrapper transition-all duration-500 hover:shadow-[0_12px_40px_-12px_rgba(245,158,11,0.08)]">
          {/* Subtle Decorative Background */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-[radial-gradient(ellipse_at_top_left,_rgba(245,158,11,0.03)_0%,_transparent_70%)] pointer-events-none" />

          <div className="flex items-center justify-between mb-8 relative z-10 border-b border-slate-100/50 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100/50 text-amber-600 flex items-center justify-center shadow-inner border border-amber-100/50">
                <Newspaper className="w-6 h-6" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-black text-xl text-slate-800 tracking-tight">آخرین مقالات</h3>
                <span className="text-[11px] font-bold text-slate-400 mt-0.5 block">تازه‌های صنعت طیور</span>
              </div>
            </div>
            <button 
              onClick={() => onNavigate('magazine')}
              className="px-4 py-2 rounded-full text-xs font-bold text-slate-600 bg-white hover:bg-amber-500 hover:text-white flex items-center gap-2 transition-all duration-300 cursor-pointer shadow-sm border border-slate-100 hover:border-transparent group"
            >
              مجله تخصصی <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="flex flex-col gap-4 flex-1 justify-between relative z-10">
            {featuredArticles.map(article => (
              <div 
                key={article.id}
                onClick={() => onSelectArticle(article.id)}
                className="group flex items-center gap-4 bg-white rounded-2xl p-3 border border-slate-100 hover:border-amber-200 transition-all duration-300 cursor-pointer hover:shadow-[0_8px_20px_-8px_rgba(245,158,11,0.12)] hover:-translate-y-0.5"
              >
                <div className="w-24 h-24 shrink-0 rounded-[1rem] overflow-hidden relative shadow-sm">
                   <LazyImage src={article.image} alt={article.title} className="w-full h-full" imgClassName="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                   {/* Elegant image overlay */}
                   <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                   <div className="absolute bottom-1.5 right-1.5 flex items-center justify-center w-6 h-6 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white">
                      <Sparkles className="w-3 h-3" />
                   </div>
                </div>
                
                <div className="flex-1 min-w-0 py-1 flex flex-col justify-center">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-[9px] font-black px-2 py-0.5 rounded-md bg-slate-50 text-slate-600 border border-slate-100">
                      {article.categoryLabel}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                      {article.readTime}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-800 group-hover:text-amber-700 transition-colors line-clamp-2 leading-relaxed">
                    {article.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
