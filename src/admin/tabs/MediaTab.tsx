import React, { useState } from 'react';
import { 
  Image as ImageIcon, 
  Copy, 
  Check, 
  Plus, 
  ExternalLink,
  Sparkles,
  Layers
} from 'lucide-react';

export const MediaTab: React.FC = () => {
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [customUrl, setCustomUrl] = useState('');

  const curatedAssets = [
    {
      title: 'سالن مرغداری صنعتی مدرن',
      category: 'فارم و سالن',
      url: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'ماشین‌آلات صنعتی و خطوط تولید',
      category: 'ماشین‌آلات',
      url: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'سوله صنعتی و استراکچر سبک',
      category: 'سوله و سازه',
      url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'خط خوراک و غلات کشاورزی',
      category: 'خوراک و مکمل',
      url: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'تجهیزات تهویه و فن صنعتی',
      category: 'تهویه',
      url: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'کارخانه پیشرفته خوراک دام و طیور',
      category: 'کارخانه',
      url: 'https://images.unsplash.com/photo-1590725140246-20acdb636e05?auto=format&fit=crop&w=800&q=80',
    }
  ];

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-2xl">
        <div>
          <h2 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-amber-400" />
            <span>کتابخانه تصاویر و مدیا (Media Library)</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            مجموعه تصاویر بهینه‌شده صنعتی جهت استفاده در کارت‌های محصولات، پروژه‌ها و مقالات
          </p>
        </div>
      </div>

      {/* Grid of Images */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {curatedAssets.map((asset, idx) => (
          <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:border-slate-700 transition-all flex flex-col justify-between">
            <div className="relative h-44 group">
              <img src={asset.url} alt={asset.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-3">
                <button
                  onClick={() => handleCopy(asset.url)}
                  className="bg-amber-400 text-slate-950 px-3.5 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-lg transform scale-95 group-hover:scale-100 transition-transform"
                >
                  {copiedUrl === asset.url ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedUrl === asset.url ? 'کپی شد!' : 'کپی آدرس تصویر'}</span>
                </button>
              </div>
              <span className="absolute top-2.5 right-2.5 bg-slate-950/80 backdrop-blur-md text-[10px] text-amber-300 font-bold px-2.5 py-0.5 rounded-full border border-slate-700">
                {asset.category}
              </span>
            </div>

            <div className="p-4 space-y-2">
              <h3 className="text-xs font-bold text-white">{asset.title}</h3>
              <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[11px]">
                <button
                  onClick={() => handleCopy(asset.url)}
                  className="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-bold"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copiedUrl === asset.url ? 'کپی شد' : 'کپی لینک'}</span>
                </button>
                <a
                  href={asset.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-400 hover:text-slate-200 flex items-center gap-1"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>مشاهده اصلی</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
