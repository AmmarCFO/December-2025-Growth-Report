
import React, { useState } from 'react';
import { REPORT_DATA } from './constants';
import Header_ar from './components/Header_ar';
import FormulaModal from './components/FormulaModal';
import { motion } from 'framer-motion';
import { 
    PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, 
    BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';
import { CalculatorIcon } from './components/Icons';

// --- Apple-Grade Helper Components ---

const formatCurrency = (value: number) => {
    return `${value.toLocaleString('ar-SA')} ريال`;
};

const BentoCard: React.FC<{ 
    children: React.ReactNode; 
    className?: string; 
    title?: string;
    subtitle?: string;
    rightAction?: React.ReactNode;
    dark?: boolean;
}> = ({ children, className = "", title, subtitle, rightAction, dark = false }) => (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true, margin: "-50px" }}
        className={`
            relative overflow-hidden rounded-[2.5rem] p-8 sm:p-10 flex flex-col
            ${dark ? 'bg-[#1D1D1F] text-white shadow-2xl' : 'bg-white text-[#1D1D1F] shadow-xl shadow-gray-100/50 border border-gray-100'}
            ${className}
        `}
    >
        {(title || rightAction) && (
            <div className="flex justify-between items-start mb-8 z-10">
                <div>
                    {title && <h3 className={`text-2xl font-bold tracking-tight ${dark ? 'text-white' : 'text-[#1D1D1F]'}`}>{title}</h3>}
                    {subtitle && <p className={`text-base font-medium ${dark ? 'text-gray-400' : 'text-gray-500'} mt-1`}>{subtitle}</p>}
                </div>
                {rightAction}
            </div>
        )}
        <div className="relative z-10 flex-1">{children}</div>
    </motion.div>
);

const Pill: React.FC<{ text: string; color?: string }> = ({ text, color = "bg-gray-100 text-gray-800" }) => (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${color}`}>
        {text}
    </span>
);

const translateStatus = (status: string) => {
    if (status === 'Confirmed') return 'مؤكد';
    if (status === 'Pending') return 'قيد الانتظار';
    if (status === 'Canceled') return 'ملغي';
    return status;
};

// --- Main Application ---

const App_ar: React.FC<{ onToggleLanguage: () => void }> = ({ onToggleLanguage }) => {
  const { financials, spendBreakdown, period, tenants, branchPerformance } = REPORT_DATA;
  const [showFormulas, setShowFormulas] = useState(false);

  // Chart Logic
  const performanceData = [
    { name: 'الإنفاق', value: financials.adSpend, fill: '#E5E5EA' },
    { name: 'الإيرادات', value: financials.revenueAttributedToAds, fill: '#4A2C5A' },
  ];

  return (
    <div className="min-h-screen pb-32 selection:bg-[#4A2C5A] selection:text-white font-cairo bg-[#F5F5F7]" dir="rtl">
      <Header_ar onToggleLanguage={onToggleLanguage} />
      
      <main className="max-w-5xl mx-auto px-6">
        
        {/* Title Area */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 px-4">
            <div>
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-6xl md:text-8xl font-bold tracking-tight text-[#1D1D1F] mb-4 leading-tight"
                >
                    تقرير <span className="text-gray-300">ديسمبر</span>
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-2xl text-gray-500 font-medium"
                >
                    {period.ar}
                </motion.p>
            </div>
            <motion.button 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => setShowFormulas(true)}
                className="mt-8 md:mt-0 flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-sm text-sm font-semibold text-[#1D1D1F] hover:bg-gray-50 transition-all border border-gray-200"
            >
                <CalculatorIcon className="w-5 h-5 text-gray-400" />
                <span>المعادلات</span>
            </motion.button>
        </div>

        {/* Vertical Stack Layout */}
        <div className="flex flex-col gap-10">
            
            {/* 1. Hero Revenue Card */}
            <BentoCard 
                dark 
                className="min-h-[500px] justify-center"
            >
                 {/* Abstract Mesh Background */}
                 <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-gradient-to-b from-[#4A2C5A] to-transparent opacity-40 blur-[120px] -ml-40 -mt-40 pointer-events-none rounded-full"></div>
                 <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-900/30 blur-[100px] -mr-40 -mb-40 pointer-events-none rounded-full"></div>

                 <div className="relative z-10 text-right">
                     <div className="flex items-center gap-3 mb-6 justify-end">
                        <span className="text-sm font-bold uppercase tracking-widest text-white/50">الإيرادات المؤكدة</span>
                        <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
                     </div>
                     <h2 className="text-7xl md:text-9xl font-bold tracking-tighter text-white mb-6">
                        {financials.mathwaaRevenue.toLocaleString('ar-SA')}
                        <span className="text-4xl md:text-5xl text-white/30 font-light mr-4">ريال</span>
                     </h2>
                     <p className="text-xl md:text-2xl text-white/60 max-w-2xl leading-relaxed mr-auto">
                        إجمالي حصة الإيرادات المعترف بها لمثوى في ديسمبر. وهذا يمثل دخل الإيجار المؤكد.
                     </p>
                 </div>
                 
                 {/* Mini Stats inside Hero */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-16 pt-10 border-t border-white/10 text-right">
                     <div>
                         <p className="text-sm font-bold uppercase tracking-widest text-white/40 mb-2">صافي النقد المحصل</p>
                         <p className="text-3xl md:text-4xl font-semibold text-white">{formatCurrency(financials.netCashCollected)}</p>
                     </div>
                     <div>
                         <p className="text-sm font-bold uppercase tracking-widest text-white/40 mb-2">القيمة الدائمة المولدة</p>
                         <p className="text-3xl md:text-4xl font-semibold text-white">{formatCurrency(financials.mathwaaLTV)}</p>
                     </div>
                 </div>
            </BentoCard>

            {/* 2. ROI Card */}
            <BentoCard className="bg-white border border-gray-100" title="العائد على الاستثمار">
                <div className="flex flex-col md:flex-row items-center justify-around h-full py-8 gap-12">
                    <div className="relative w-64 h-64 flex items-center justify-center shrink-0">
                        {/* Radial Progress Simulation */}
                        <svg className="w-full h-full transform -rotate-90">
                            <circle cx="128" cy="128" r="110" stroke="#F5F5F7" strokeWidth="16" fill="none" />
                            <circle 
                                cx="128" cy="128" r="110" 
                                stroke="#34C759" strokeWidth="16" fill="none" 
                                strokeDasharray={691} 
                                strokeDashoffset={691 - (691 * (Math.min(financials.roi, 150) / 150))} 
                                strokeLinecap="round"
                                className="transition-all duration-1000 ease-out"
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-6xl font-bold tracking-tighter text-[#1D1D1F]" dir="ltr">{financials.roi}%</span>
                            <span className="text-sm font-bold uppercase text-gray-400 mt-2">العائد</span>
                        </div>
                    </div>
                    <div className="text-center md:text-right max-w-lg">
                        <p className="text-xl md:text-2xl text-gray-500 font-medium leading-relaxed mb-6">
                            كفاءة عالية في الأداء.<br/>
                            مقابل كل <span className="text-[#1D1D1F] font-bold">١ ريال</span> يُنفق على الإعلام،
                            تم توليد <span className="text-[#1D1D1F] font-bold">١.٤٠ ريال</span> في ديسمبر.
                        </p>
                        <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                             <p className="text-xs text-gray-500 leading-relaxed font-medium text-right">
                                <span className="font-bold text-[#1D1D1F] uppercase tracking-wide ml-2">ملاحظة المحلل</span>
                                عائد 140٪ في العقارات السعودية يقترب من نقطة التعادل عند هوامش ربح 70٪. المعيار الصناعي للتسويق "الممتاز" هو عائد استثمار يتجاوز 400٪.
                             </p>
                        </div>
                    </div>
                </div>
            </BentoCard>

            {/* 3. Spend Efficiency */}
            <BentoCard title="كفاءة الإنفاق" className="min-h-[450px]">
                <div className="w-full h-[300px] mt-8">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart layout="vertical" data={performanceData} margin={{ left: 0, right: 0 }} barSize={48}>
                            <XAxis type="number" hide />
                            <YAxis 
                                dataKey="name" 
                                type="category" 
                                axisLine={false} 
                                tickLine={false} 
                                width={140} 
                                orientation="right"
                                tick={{ fontSize: 15, fontWeight: 600, fill: '#86868b', fontFamily: 'Cairo' }} 
                            />
                            <RechartsTooltip 
                                cursor={{ fill: 'transparent' }}
                                contentStyle={{ borderRadius: '16px', border: 'none', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(20px)', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', direction: 'rtl', padding: '12px 20px' }}
                            />
                            <Bar dataKey="value" radius={[6, 0, 0, 6]} animationDuration={1500}>
                                {performanceData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="mt-8 flex justify-around items-center px-4 border-t border-gray-100 pt-8" dir="ltr">
                     <div className="text-center">
                         <div className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2 text-right">إيرادات الإعلانات</div>
                         <div className="text-3xl font-bold text-[#4A2C5A] text-right">{formatCurrency(financials.revenueAttributedToAds)}</div>
                    </div>
                    <div className="w-[1px] h-12 bg-gray-100"></div>
                    <div className="text-center">
                         <div className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2 text-right">الإنفاق الإعلاني</div>
                         <div className="text-3xl font-bold text-[#1D1D1F] text-right">{formatCurrency(financials.adSpend)}</div>
                    </div>
                </div>
            </BentoCard>

            {/* 4. Branch Performance */}
            <BentoCard title="إيرادات الفروع" className="min-h-[450px]">
                <div className="w-full h-[350px] mt-6">
                    <ResponsiveContainer width="100%" height="100%">
                         <BarChart data={branchPerformance} margin={{ top: 20, right: 20, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F5F5F7" />
                            <XAxis 
                                dataKey="name_ar" 
                                tick={{ fontSize: 12, fill: '#86868b', fontWeight: 600, fontFamily: 'Cairo', dy: 10 }} 
                                axisLine={false} 
                                tickLine={false} 
                                interval={0}
                            />
                            <RechartsTooltip 
                                cursor={{ fill: 'rgba(0,0,0,0.02)', radius: 12 }}
                                contentStyle={{ borderRadius: '16px', border: 'none', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(20px)', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', direction: 'rtl' }}
                                formatter={(val: number) => formatCurrency(val)}
                            />
                            <Bar dataKey="value" fill="#1D1D1F" radius={[8, 8, 8, 8]} barSize={50} />
                         </BarChart>
                    </ResponsiveContainer>
                </div>
            </BentoCard>

            {/* 5. Allocation */}
            <BentoCard title="توزيع التكاليف" className="min-h-[400px]">
                <div className="flex flex-col md:flex-row items-center gap-12 h-full">
                    <div className="relative w-full md:w-1/2 h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={spendBreakdown}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={80}
                                    outerRadius={110}
                                    paddingAngle={5}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {spendBreakdown.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <RechartsTooltip 
                                    formatter={(val: number) => formatCurrency(val)}
                                    contentStyle={{ borderRadius: '16px', border: 'none', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(20px)', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', direction: 'rtl' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-3xl font-bold text-[#1D1D1F]">{formatCurrency(financials.marketingSpend)}</span>
                            <span className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">الإجمالي</span>
                        </div>
                    </div>

                    <div className="w-full md:w-1/2">
                        <div className="space-y-4 mb-8">
                            {spendBreakdown.map((item, idx) => (
                                <div key={idx} className="flex justify-between items-center p-3 rounded-xl hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: item.color }}></div>
                                        <span className="text-gray-600 font-semibold text-base">{item.name_ar}</span>
                                    </div>
                                    <span className="font-bold text-[#1D1D1F] text-lg">{formatCurrency(item.value)}</span>
                                </div>
                            ))}
                        </div>
                        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                            <p className="text-xs text-gray-500 leading-relaxed font-medium text-right">
                                <span className="font-bold text-[#1D1D1F] uppercase tracking-wide ml-2">ملاحظة المطابقة</span>
                                يبلغ إجمالي الإنفاق التسويقي وفقاً لسجلات القسم المالي ٢٨,٠٠٠ ريال. الرقم المعروض (٢١,٣٤٧ ريال) يمثل التخصيص المباشر؛ ويعود الفارق إلى ما يقارب ٣١٪ ضريبة قيمة مضافة ورسوم منصات (ميتا وتيك توك) مطبقة عند المصدر.
                            </p>
                        </div>
                    </div>
                </div>
            </BentoCard>

            {/* 6. Tenant Table */}
            <BentoCard title="نشاط المستأجرين" subtitle={`${tenants.length} معاملة مسجلة`} className="min-h-[500px] overflow-hidden">
                 <div className="mt-6 w-full overflow-x-auto pb-4">
                    <table className="w-full text-right border-collapse min-w-[800px]">
                        <thead>
                            <tr className="border-b border-gray-100">
                                <th className="py-4 px-4 text-xs font-bold text-gray-400 uppercase tracking-widest">المستأجر</th>
                                <th className="py-4 px-4 text-xs font-bold text-gray-400 uppercase tracking-widest">المصدر</th>
                                <th className="py-4 px-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-left">الإيجار</th>
                                <th className="py-4 px-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-left">إيرادات مثوى</th>
                                <th className="py-4 px-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-left">الحالة</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {tenants.map((t, idx) => (
                                <tr key={idx} className="group hover:bg-gray-50/80 transition-colors border-b border-gray-50 last:border-0">
                                    <td className="py-4 px-4">
                                        <div className="font-bold text-[#1D1D1F] text-base group-hover:text-black">{t.name}</div>
                                        <div className="text-xs text-gray-400 mt-0.5">{t.branch}</div>
                                    </td>
                                    <td className="py-4 px-4">
                                        <span className="text-xs font-bold text-gray-600 bg-gray-100/80 px-3 py-1.5 rounded-lg border border-gray-200/50">{t.source}</span>
                                    </td>
                                    <td className="py-4 px-4 text-left font-semibold text-gray-600 tabular-nums text-base">
                                        {formatCurrency(t.rent)}
                                    </td>
                                    <td className="py-4 px-4 text-left font-bold text-[#4A2C5A] tabular-nums text-base">
                                        {formatCurrency(t.mathwaaRevenue)}
                                    </td>
                                    <td className="py-4 px-4 text-left">
                                        <Pill 
                                            text={translateStatus(t.status)} 
                                            color={t.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'} 
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                 </div>
            </BentoCard>

        </div>

        <FormulaModal isOpen={showFormulas} onClose={() => setShowFormulas(false)} lang="ar" />
      </main>
    </div>
  );
};

export default App_ar;
