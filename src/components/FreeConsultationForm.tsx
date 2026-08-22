import React, { useState, useEffect } from 'react';
import { 
  Send, 
  CheckCircle2, 
  Sparkles, 
  Building2, 
  Phone, 
  User, 
  MapPin, 
  FileText, 
  HelpCircle,
  Clock,
  Layers
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { sendNotificationToBale } from '../utils/sendToBale';

export interface FreeConsultationFormProps {
  initialSubject?: string;
  initialProduct?: string;
  initialMessage?: string;
  compact?: boolean;
  className?: string;
  onSuccess?: () => void;
}

export const FreeConsultationForm: React.FC<FreeConsultationFormProps> = ({
  initialSubject,
  initialProduct,
  initialMessage,
  compact = false,
  className = '',
  onSuccess
}) => {
  const { addConsultation, companyInfo } = useData();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    companyName: '',
    subject: initialSubject || 'مرغداری گوشتی',
    productName: initialProduct || '',
    capacity: '',
    location: '',
    message: initialMessage || ''
  });

  useEffect(() => {
    if (initialSubject) {
      setFormData(prev => ({ ...prev, subject: initialSubject }));
    }
    if (initialProduct) {
      setFormData(prev => ({ ...prev, productName: initialProduct }));
    }
    if (initialMessage) {
      setFormData(prev => ({ ...prev, message: initialMessage }));
    }
  }, [initialSubject, initialProduct, initialMessage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phoneNumber.trim()) return;

    setLoading(true);

    // 1. Record in local data context (for immediate reactive admin dashboard access)
    addConsultation({
      id: 'cons-' + Date.now(),
      createdAt: new Date().toISOString().split('T')[0],
      status: 'new',
      formData: {
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
        companyName: formData.companyName,
        requestType: 'free-consultation',
        projectType: formData.subject,
        productInterest: formData.productName,
        projectCapacity: formData.capacity,
        location: formData.location,
        message: formData.message || `درخواست مشاوره رایگان برای ${formData.subject} ${formData.productName ? `(محصول: ${formData.productName})` : ''}`
      }
    });

    // 2. Dispatch notification to Bale Messenger Bot via server endpoint
    try {
      await sendNotificationToBale({
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
        companyName: formData.companyName,
        subject: formData.subject,
        productName: formData.productName,
        capacity: formData.capacity,
        location: formData.location,
        message: formData.message,
        source: 'فرم مشاوره رایگان'
      });
    } catch (err) {
      console.warn('Bale notification caught:', err);
    }

    setLoading(false);
    setSubmitted(true);
    if (onSuccess) onSuccess();
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      fullName: '',
      phoneNumber: '',
      companyName: '',
      subject: 'مرغداری گوشتی',
      productName: '',
      capacity: '',
      location: '',
      message: ''
    });
  };

  return (
    <div 
      id="free-consultation-form" 
      className={`bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden transition-all ${className}`}
    >
      {/* Form Header */}
      <div className="bg-gradient-to-r from-[#002b5e] via-[#003F86] to-[#002b5e] px-5 sm:px-6 py-4 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-blue-900/50">
        <div>
          <h2 className="text-lg sm:text-xl font-black tracking-tight text-white flex items-center gap-2">
            دریافت مشاوره رایگان
          </h2>
          <p className="text-[11px] text-blue-200 mt-0.5 font-normal">
            مشاوره فنی، استعلام قیمت تجهیزات و محاسبات ظرفیت سالن
          </p>
        </div>
        <div className="text-[11px] text-amber-300 font-bold hidden sm:flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-full border border-white/10">
          <Clock className="w-3.5 h-3.5" />
          <span>پاسخگویی سریع</span>
        </div>
      </div>

      {/* Form Body */}
      <div className="p-5 sm:p-6">
        {submitted ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center my-2 animate-in fade-in duration-300">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-base font-black text-emerald-950 mb-1">
              درخواست شما با موفقیت ثبت شد
            </h3>
            <p className="text-xs text-emerald-800 font-normal max-w-sm mx-auto leading-relaxed">
              مهندسین فنی شرکت <strong>طیوران صنعت پویا</strong> در اسرع وقت جهت بررسی با شما تماس می‌گیرند.
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={handleReset}
                className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow"
              >
                ثبت فرم جدید
              </button>
              <a
                href={`tel:${companyInfo.phone}`}
                className="bg-white text-slate-800 border border-slate-200 hover:bg-slate-50 text-xs font-bold px-4 py-2 rounded-xl transition-all flex items-center gap-1"
              >
                <Phone className="w-3.5 h-3.5 text-amber-500" />
                <span>تماس فوری: {companyInfo.phone}</span>
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5">
            
            {/* Row 1: Full Name & Phone Number */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  نام و نام‌خانوادگی <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="نام کامل"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pr-8 pl-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#003F86] focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  شماره همراه <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    placeholder="۰۹۱۲..."
                    dir="ltr"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pr-8 pl-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#003F86] focus:bg-white transition-all text-right"
                  />
                </div>
              </div>
            </div>

            {/* Row 2: Subject & City */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  موضوع درخواست
                </label>
                <div className="relative">
                  <Layers className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pr-8 pl-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#003F86] focus:bg-white transition-all"
                  >
                    <option value="مرغداری گوشتی">مرغداری گوشتی (تجهیزات و اتوماسیون)</option>
                    <option value="مرغداری تخم‌گذار">مرغداری تخم‌گذار و پولت</option>
                    <option value="کارخانه خوراک و مکمل">ماشین‌آلات و خطوط تولید خوراک</option>
                    <option value="سوله و سالن صنعتی">طراحی و ساخت سوله و سالن</option>
                    <option value="تجهیزات گرمایشی و جت هیتر">جت هیتر موشکی و سیستم گرمایش</option>
                    <option value="خطوط دانخوری و آبخوری">دانخوری بشقابی و نیپل آبخوری</option>
                    <option value="استعلام قیمت و پیش‌فاکتور">استعلام قیمت و پیش‌فاکتور رسمی</option>
                    <option value="سایر موارد">سایر زمینه‌ها</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  شهرستان / استان
                </label>
                <div className="relative">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="مثلاً مشهد، ساری..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pr-8 pl-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#003F86] focus:bg-white transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Row 3: Product Name or Project details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  نام تجهیز یا محصول مورد نظر
                </label>
                <div className="relative">
                  <FileText className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={formData.productName}
                    onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                    placeholder="اختیاری (مثلاً جت هیتر ۱۰۰، بشقاب پروانه‌ای)"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pr-8 pl-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#003F86] focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  نام واحد / مرغداری
                </label>
                <div className="relative">
                  <Building2 className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="اختیاری"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pr-8 pl-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#003F86] focus:bg-white transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Row 4: Message / Details */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                توضیحات و ابعاد سالن
              </label>
              <textarea
                rows={2}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="متراژ سالن، ظرفیت، یا سوال فنی خود را بنویسید..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#003F86] focus:bg-white transition-all resize-none"
              ></textarea>
            </div>

            {/* Submit CTA */}
            <div className="pt-1">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#003F86] to-[#002b5e] hover:from-[#002b5e] hover:to-[#001c3d] text-amber-400 hover:text-amber-300 font-black py-3 px-5 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-blue-900/20 active:scale-[0.99] transition-all disabled:opacity-50 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{loading ? 'در حال ارسال...' : 'ثبت درخواست مشاوره رایگان'}</span>
              </button>
            </div>

          </form>
        )}
      </div>

      {/* Footer Strip */}
      <div className="bg-slate-50 px-5 sm:px-6 py-2.5 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-slate-600">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          <span>مشاوره کاملاً رایگان و بدون تعهد خرید است.</span>
        </div>
        <a
          href={`tel:${companyInfo.salesPhone || companyInfo.phone}`}
          className="text-[#003F86] hover:underline font-bold flex items-center gap-1"
        >
          <Phone className="w-3 h-3 text-amber-500" />
          <span>تلفن تماس: {companyInfo.phone}</span>
        </a>
      </div>

    </div>
  );
};
