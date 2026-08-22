import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  Building2, 
  Wrench, 
  BookOpen, 
  Layers, 
  FileText, 
  MessageSquareText, 
  Building, 
  Bot, 
  Image as ImageIcon, 
  Database, 
  KeyRound,
  Sparkles
} from 'lucide-react';
import { useData } from '../context/DataContext';

export type AdminTab = 
  | 'overview'
  | 'products'
  | 'projects'
  | 'services'
  | 'articles'
  | 'categories'
  | 'quotes'
  | 'consultations'
  | 'company'
  | 'ai'
  | 'media'
  | 'backup'
  | 'security';

interface AdminSidebarProps {
  currentTab: AdminTab;
  onSelectTab: (tab: AdminTab) => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ currentTab, onSelectTab }) => {
  const { quoteRequests, consultationRequests, products, projects, articles } = useData();

  const newQuotes = quoteRequests.filter(q => q.status === 'new').length;
  const newConsultations = consultationRequests.filter(c => c.status === 'new').length;

  const menuGroups = [
    {
      groupTitle: 'مدیریت و آمار',
      items: [
        { id: 'overview' as AdminTab, label: 'داشبورد اصلی', icon: LayoutDashboard, badge: null },
      ]
    },
    {
      groupTitle: 'محتوا و تجهیزات',
      items: [
        { id: 'products' as AdminTab, label: 'محصولات و ماشین‌آلات', icon: Package, badge: products.length },
        { id: 'projects' as AdminTab, label: 'پروژه‌ها و نمونه کارها', icon: Building2, badge: projects.length },
        { id: 'services' as AdminTab, label: 'خدمات و مهندسی سوله', icon: Wrench, badge: null },
        { id: 'articles' as AdminTab, label: 'مجله فنی و مقالات', icon: BookOpen, badge: articles.length },
        { id: 'categories' as AdminTab, label: 'دسته‌بندی تجهیزات', icon: Layers, badge: null },
        { id: 'media' as AdminTab, label: 'کتابخانه تصاویر', icon: ImageIcon, badge: null },
      ]
    },
    {
      groupTitle: 'سفارشات و سرنخ‌ها',
      items: [
        { 
          id: 'quotes' as AdminTab, 
          label: 'درخواست‌های پیش‌فاکتور', 
          icon: FileText, 
          badge: newQuotes > 0 ? `${newQuotes} جدید` : quoteRequests.length,
          badgeHighlight: newQuotes > 0
        },
        { 
          id: 'consultations' as AdminTab, 
          label: 'درخواست‌های مشاوره', 
          icon: MessageSquareText, 
          badge: newConsultations > 0 ? `${newConsultations} جدید` : consultationRequests.length,
          badgeHighlight: newConsultations > 0
        },
      ]
    },
    {
      groupTitle: 'تنظیمات و زیرساخت',
      items: [
        { id: 'company' as AdminTab, label: 'اطلاعات شرکت و هیرو', icon: Building, badge: null },
        { id: 'ai' as AdminTab, label: 'دستیار هوش مصنوعی', icon: Bot, badge: 'فعال' },
        { id: 'backup' as AdminTab, label: 'بکاپ و بازنشانی دیتا', icon: Database, badge: null },
        { id: 'security' as AdminTab, label: 'امنیت و تغییر رمز', icon: KeyRound, badge: null },
      ]
    }
  ];

  return (
    <aside className="w-64 sm:w-72 bg-slate-900 border-l border-slate-800 flex flex-col shrink-0 min-h-[calc(100vh-61px)]">
      <div className="p-4 space-y-6 flex-1 overflow-y-auto">
        {menuGroups.map((group, gIdx) => (
          <div key={gIdx} className="space-y-1.5">
            <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider px-3 mb-1">
              {group.groupTitle}
            </h4>
            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onSelectTab(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-right ${
                      isActive
                        ? 'bg-gradient-to-r from-amber-400 to-[#FF9F14] text-slate-950 shadow-md font-black'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge !== null && item.badge !== undefined && (
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                        isActive
                          ? 'bg-slate-950/20 text-slate-950'
                          : item.badgeHighlight
                            ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40 animate-pulse'
                            : 'bg-slate-800 text-slate-400'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer info strip */}
      <div className="p-3 border-t border-slate-800 text-center text-[10px] text-slate-500 font-medium">
        نسخه سامانه: 3.2.0 • طیوران صنعت پویا
      </div>
    </aside>
  );
};
