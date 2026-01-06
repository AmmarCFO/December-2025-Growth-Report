
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CloseIcon } from './Icons';

interface FormulaModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'en' | 'ar';
}

const definitions = {
  en: [
    {
      label: "Net Cash Collected",
      formula: "Σ (Cash received from all tenants)",
      description: "The actual total cash amount collected from tenants during the report period (Dec 1 - Dec 31), regardless of the revenue recognition period."
    },
    {
      label: "Mathwaa Revenue (Dec)",
      formula: "Σ (Tenant Monthly Rent × Mathwaa % Share)",
      description: "The specific portion of revenue recognized for Mathwaa for the month of December 2025. Share percentages vary by unit type (e.g., 20%, 25%, 30%)."
    },
    {
      label: "Mathwaa LTV (Lifetime Value)",
      formula: "Σ (Contract Value × Mathwaa % Share)",
      description: "The projected total revenue Mathwaa will earn over the full duration of the signed leases (e.g., 12 months)."
    },
    {
      label: "Marketing ROI",
      formula: "(Mathwaa Revenue from Ads / Media Spend) × 100",
      description: "Return on Investment calculated based on the immediate Mathwaa Revenue attributed to paid digital channels (Media Spend) against total media cost, excluding content production."
    },
    {
       label: "Attributed Revenue",
       formula: "Σ (Mathwaa Revenue for Tenants where Source ∈ {Paid Ads})",
       description: "Revenue specifically generated from tenants acquired through TikTok, Facebook, and Instagram paid campaigns."
    }
  ],
  ar: [
    {
      label: "صافي النقد المحصل",
      formula: "مجموع (النقد المستلم من جميع المستأجرين)",
      description: "إجمالي المبلغ النقدي الفعلي الذي تم تحصيله من المستأجرين خلال فترة التقرير (١ ديسمبر - ٣١ ديسمبر)."
    },
    {
      label: "إيرادات مثوى (ديسمبر)",
      formula: "مجموع (إيجار المستأجر × نسبة حصة مثوى)",
      description: "الجزء المحدد من الإيرادات المستحق لشركة مثوى لشهر ديسمبر ٢٠٢٥. تختلف النسب حسب الوحدة (مثلاً ٢٠٪، ٢٥٪، ٣٠٪)."
    },
    {
      label: "القيمة الدائمة لمثوى (LTV)",
      formula: "مجموع (قيمة العقد × نسبة حصة مثوى)",
      description: "إجمالي الإيرادات المتوقعة التي ستكسبها مثوى على مدار مدة العقود الموقعة بالكامل (مثلاً ١٢ شهراً)."
    },
    {
      label: "عائد الاستثمار التسويقي (ROI)",
      formula: "(إيرادات مثوى من الإعلانات / الإنفاق الإعلامي) × ١٠٠",
      description: "العائد على الاستثمار المحسوب بناءً على إيرادات مثوى المباشرة المنسوبة للقنوات الرقمية المدفوعة مقابل تكلفة الوسائط الإعلامية (مع استبعاد تكاليف الإنتاج)."
    },
    {
       label: "الإيرادات المنسوبة",
       formula: "مجموع (إيرادات مثوى للمستأجرين حيث المصدر ∈ {إعلانات مدفوعة})",
       description: "الإيرادات الناتجة تحديداً عن المستأجرين الذين تم استقطابهم عبر حملات تيك توك وفيسبوك وانستغرام المدفوعة."
    }
  ]
};

const FormulaModal: React.FC<FormulaModalProps> = ({ isOpen, onClose, lang }) => {
  const content = definitions[lang];
  const isRTL = lang === 'ar';

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
        />
        <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className={`relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[90vh] ${isRTL ? 'text-right' : 'text-left'}`}
            dir={isRTL ? 'rtl' : 'ltr'}
        >
             <div className="bg-gray-50/50 border-b border-gray-100 p-6 flex justify-between items-center">
                 <div>
                    <h3 className="text-2xl font-bold text-[#4A2C5A]">
                        {lang === 'en' ? 'Calculations & Formulas' : 'طرق الاحتساب والمعادلات'}
                    </h3>
                 </div>
                 <button 
                    onClick={onClose}
                    className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
                 >
                    <CloseIcon className="w-5 h-5" />
                 </button>
             </div>

             <div className="p-6 overflow-y-auto space-y-6">
                {content.map((item, idx) => (
                    <div key={idx} className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                        <h4 className="text-[#1D1D1F] font-bold text-lg mb-2">{item.label}</h4>
                        <div className="bg-white rounded-lg p-3 border border-gray-200 mb-3 font-mono text-xs sm:text-sm text-[#4A2C5A] overflow-x-auto">
                            {item.formula}
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            {item.description}
                        </p>
                    </div>
                ))}
             </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default FormulaModal;
