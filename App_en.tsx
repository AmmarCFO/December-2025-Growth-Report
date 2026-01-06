
import React, { useState } from 'react';
import { REPORT_DATA } from './constants';
import Header from './components/Header';
import FormulaModal from './components/FormulaModal';
import { motion } from 'framer-motion';
import { 
    PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, 
    BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';
import { CalculatorIcon } from './components/Icons';

// --- Apple-Grade Helper Components ---

const formatCurrency = (value: number) => {
    return `SAR ${value.toLocaleString('en-US')}`;
};

const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.98 },
    visible: { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
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
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        className={`
            relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 flex flex-col group
            ${dark ? 'bg-[#1D1D1F] text-white shadow-2xl border border-white/10' : 'bg-white text-[#1D1D1F] shadow-2xl shadow-gray-200/50 border border-white/60'}
            ${className}
        `}
    >
        {/* Subtle Hover Highlight (Desktop Only) */}
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none
            ${dark ? 'bg-gradient-to-tr from-white/5 to-transparent' : 'bg-gradient-to-tr from-blue-50/50 to-transparent'}`} 
        />

        {(title || rightAction) && (
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 z-10 gap-4 sm:gap-0">
                <div>
                    {title && <h3 className={`text-2xl sm:text-3xl font-semibold tracking-tight ${dark ? 'text-white' : 'text-[#1D1D1F]'}`}>{title}</h3>}
                    {subtitle && <p className={`text-sm sm:text-base font-medium ${dark ? 'text-gray-400' : 'text-gray-500'} mt-1`}>{subtitle}</p>}
                </div>
                {rightAction}
            </div>
        )}
        <div className="relative z-10 flex-1">{children}</div>
    </motion.div>
);

const Pill: React.FC<{ text: string; color?: string }> = ({ text, color = "bg-gray-100 text-gray-800" }) => (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider ${color}`}>
        {text}
    </span>
);

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[#1D1D1F]/90 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
                <p className="font-semibold text-xs text-gray-400 mb-1 uppercase tracking-wide">{label}</p>
                <p className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {formatCurrency(payload[0].value)}
                </p>
            </div>
        );
    }
    return null;
};

// --- Main Application ---

const App_en: React.FC<{ onToggleLanguage: () => void }> = ({ onToggleLanguage }) => {
  const { financials, spendBreakdown, period, tenants, branchPerformance } = REPORT_DATA;
  const [showFormulas, setShowFormulas] = useState(false);

  // Chart Logic
  const performanceData = [
    { name: 'Media Spend', value: financials.adSpend },
    { name: 'Attributed Rev', value: financials.revenueAttributedToAds },
  ];
  
  const darkSpendBreakdown = spendBreakdown.map(item => ({
      ...item,
      color: item.name_en.includes('TikTok') ? '#FFFFFF' : item.color
  }));

  return (
    <div className="min-h-screen pb-20 sm:pb-32 selection:bg-[#4A2C5A] selection:text-white bg-[#F5F5F7]">
      <Header onToggleLanguage={onToggleLanguage} />
      
      <main className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Title Area */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 sm:mb-12 px-2 sm:px-4">
            <div className="mb-6 md:mb-0">
                <motion.h1 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-5xl sm:text-6xl md:text-8xl font-semibold tracking-tighter text-[#1D1D1F] mb-3 sm:mb-4"
                >
                    December <span className="text-gray-300 block sm:inline">Review</span>
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="text-lg sm:text-2xl text-gray-500 font-medium"
                >
                    {period.en}
                </motion.p>
            </div>
            <motion.button 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ delay: 0.4 }}
                onClick={() => setShowFormulas(true)}
                className="flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-white rounded-full shadow-sm text-sm font-semibold text-[#1D1D1F] hover:bg-gray-50 transition-all border border-gray-200"
            >
                <CalculatorIcon className="w-5 h-5 text-gray-400" />
                <span>Formulas</span>
            </motion.button>
        </div>

        {/* Vertical Stack Layout */}
        <div className="flex flex-col gap-4 sm:gap-6">
            
            {/* 1. Hero Revenue Card */}
            <BentoCard 
                dark 
                className="min-h-[400px] sm:min-h-[450px] justify-center"
            >
                 {/* Animated Abstract Mesh Background */}
                 <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                    className="absolute top-0 right-0 w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] bg-gradient-to-b from-[#4A2C5A] to-transparent opacity-40 blur-[100px] sm:blur-[120px] -mr-40 -mt-40 pointer-events-none rounded-full"
                 />
                 <motion.div 
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-0 left-0 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] bg-blue-900/30 blur-[80px] sm:blur-[100px] -ml-40 -mb-40 pointer-events-none rounded-full"
                 />

                 <div className="relative z-10">
                     <div className="flex items-center gap-3 mb-4 sm:mb-6">
                        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-400 animate-pulse"></div>
                        <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-white/50">Confirmed Revenue</span>
                     </div>
                     <h2 className="text-6xl sm:text-7xl md:text-9xl font-semibold tracking-tighter text-white mb-4 sm:mb-6 leading-none">
                        {financials.mathwaaRevenue.toLocaleString('en-US')}
                        <span className="text-3xl sm:text-4xl md:text-5xl text-white/30 font-light ml-3 sm:ml-4 align-baseline">SAR</span>
                     </h2>
                     <p className="text-lg sm:text-xl md:text-2xl text-white/60 max-w-2xl leading-relaxed">
                        Total revenue share recognized for Mathwaa in December. This represents confirmed lease income.
                     </p>
                 </div>
                 
                 {/* Mini Stats inside Hero */}
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10 mt-8 sm:mt-12 pt-8 sm:pt-10 border-t border-white/10">
                     <div>
                         <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-white/40 mb-2">Total LTV Generated</p>
                         <p className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white">{formatCurrency(financials.mathwaaLTV)}</p>
                     </div>
                     <div>
                         <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-white/40 mb-2">Net Cash Collected</p>
                         <p className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white">{formatCurrency(financials.netCashCollected)}</p>
                     </div>
                 </div>
            </BentoCard>

            {/* 2. ROI Card */}
            <BentoCard className="bg-white border border-gray-100 min-h-fit" title="Marketing ROI">
                <div className="flex flex-col lg:flex-row items-center justify-around h-full py-4 sm:py-6 gap-6 sm:gap-10">
                    <div className="relative w-48 h-48 sm:w-60 sm:h-60 flex items-center justify-center shrink-0">
                        {/* Radial Progress Simulation */}
                        <svg className="w-full h-full transform -rotate-90">
                            <circle cx="50%" cy="50%" r="46%" stroke="#F5F5F7" strokeWidth="12%" fill="none" />
                            <motion.circle 
                                cx="50%" cy="50%" r="46%" 
                                stroke="#34C759" strokeWidth="12%" fill="none" 
                                initial={{ pathLength: 0 }}
                                whileInView={{ pathLength: Math.min(financials.roi, 150) / 150 }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                strokeLinecap="round"
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-4xl sm:text-6xl font-bold tracking-tighter text-[#1D1D1F]">{financials.roi}%</span>
                            <span className="text-xs sm:text-sm font-bold uppercase text-gray-400 mt-2">Return</span>
                        </div>
                    </div>
                    <div className="text-center lg:text-left max-w-lg">
                        <p className="text-lg sm:text-xl md:text-2xl text-gray-500 font-medium leading-relaxed mb-6">
                            Efficiency at scale.<br/>
                            For every <span className="text-[#1D1D1F] font-bold">1 SAR</span> spent on media, 
                            <span className="text-[#1D1D1F] font-bold"> 1.40 SAR</span> was generated in December.
                        </p>
                        <div className="bg-gray-50 rounded-2xl p-4 sm:p-5 border border-gray-100 text-left">
                             <p className="text-xs text-gray-500 leading-relaxed font-medium">
                                <span className="font-bold text-[#1D1D1F] uppercase tracking-wide mr-2 block sm:inline mb-1 sm:mb-0">Analyst Note</span>
                                140% ROAS for Saudi real estate nears break-even at ~70% profit margins. The industry benchmark for "excellent-grade" marketing is 400%+ ROI.
                             </p>
                        </div>
                    </div>
                </div>
            </BentoCard>

            {/* 3. Spend Efficiency */}
            <BentoCard dark title="Spend Efficiency" className="min-h-fit">
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-500/10 blur-[90px] -ml-20 -mt-20 pointer-events-none rounded-full"></div>
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-500/10 blur-[90px] -mr-20 -mb-20 pointer-events-none rounded-full"></div>

                <div className="relative z-10 w-full h-[220px] sm:h-[300px] mt-4 sm:mt-8">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart layout="vertical" data={performanceData} margin={{ left: 0, right: 20 }} barSize={40}>
                            <defs>
                                <linearGradient id="spendGradientDark" x1="0" y1="0" x2="1" y2="0">
                                    <stop offset="0%" stopColor="#4B5563" />
                                    <stop offset="100%" stopColor="#9CA3AF" />
                                </linearGradient>
                                <linearGradient id="revGradientDark" x1="0" y1="0" x2="1" y2="0">
                                    <stop offset="0%" stopColor="#7C3AED" />
                                    <stop offset="100%" stopColor="#C084FC" />
                                </linearGradient>
                            </defs>
                            <XAxis type="number" hide />
                            <YAxis 
                                dataKey="name" 
                                type="category" 
                                axisLine={false} 
                                tickLine={false} 
                                width={120} 
                                tick={{ fontSize: 13, fontWeight: 600, fill: '#9CA3AF' }} 
                            />
                            <RechartsTooltip content={<CustomTooltip />} cursor={{fill: 'transparent'}} />
                            <Bar dataKey="value" radius={[0, 12, 12, 0]} animationDuration={1500}>
                                {performanceData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={index === 0 ? "url(#spendGradientDark)" : "url(#revGradientDark)"} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="relative z-10 flex flex-col sm:flex-row justify-around items-center px-4 border-t border-white/10 pt-6 gap-4 sm:gap-0 mt-2">
                    <div className="text-center">
                         <div className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1 sm:mb-2">Ad Spend</div>
                         <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">{formatCurrency(financials.adSpend)}</div>
                    </div>
                    <div className="hidden sm:block w-[1px] h-12 bg-white/10"></div>
                    <div className="text-center">
                         <div className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1 sm:mb-2">Revenue (Ads)</div>
                         <div className="text-2xl sm:text-3xl font-bold text-[#C084FC] tracking-tight">{formatCurrency(financials.revenueAttributedToAds)}</div>
                    </div>
                </div>
            </BentoCard>

            {/* 4. Branch Performance */}
            <BentoCard dark title="Branch Revenue" className="min-h-fit">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-sky-500/10 blur-[100px] pointer-events-none rounded-full"></div>

                <div className="relative z-10 w-full h-[300px] mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                         <BarChart data={branchPerformance} margin={{ top: 20, right: 30, left: 10, bottom: 0 }}>
                            <defs>
                                <linearGradient id="branchBarGradientDark" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#38bdf8" />
                                    <stop offset="100%" stopColor="#0ea5e9" />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                            <XAxis 
                                dataKey="name_en" 
                                tick={{ fontSize: 10, fill: '#9CA3AF', fontWeight: 600, dy: 10 }} 
                                axisLine={false} 
                                tickLine={false} 
                                interval={0}
                                angle={-15}
                                textAnchor="end"
                                height={60}
                            />
                            <RechartsTooltip 
                                cursor={{ fill: 'rgba(255,255,255,0.05)', radius: 12 }}
                                content={<CustomTooltip />}
                            />
                            <Bar dataKey="value" fill="url(#branchBarGradientDark)" radius={[6, 6, 6, 6]} barSize={32} animationDuration={1500} />
                         </BarChart>
                    </ResponsiveContainer>
                </div>
            </BentoCard>

            {/* 5. Allocation */}
            <BentoCard dark title="Cost Allocation" className="min-h-fit">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-pink-500/10 blur-[100px] pointer-events-none rounded-full"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/10 blur-[100px] pointer-events-none rounded-full"></div>

                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12 h-full pb-4">
                    <div className="relative w-full md:w-1/2 h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={darkSpendBreakdown}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={80}
                                    outerRadius={110}
                                    paddingAngle={4}
                                    dataKey="value"
                                    stroke="#1D1D1F"
                                    strokeWidth={4}
                                >
                                    {darkSpendBreakdown.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <RechartsTooltip content={<CustomTooltip />} />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-2xl sm:text-3xl font-bold text-white tracking-tight">{formatCurrency(financials.marketingSpend)}</span>
                            <span className="text-[10px] sm:text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Total Spend</span>
                        </div>
                    </div>
                    
                    <div className="w-full md:w-1/2">
                        <div className="space-y-3 sm:space-y-4 mb-6">
                            {darkSpendBreakdown.map((item, idx) => (
                                <div key={idx} className="flex justify-between items-center p-3 rounded-xl hover:bg-white/5 transition-colors cursor-default group border border-transparent hover:border-white/5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2.5 h-2.5 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.2)]" style={{ backgroundColor: item.color }}></div>
                                        <span className="text-gray-300 font-semibold text-sm sm:text-base group-hover:text-white transition-colors">{item.name_en}</span>
                                    </div>
                                    <span className="font-bold text-white text-base sm:text-lg">{formatCurrency(item.value)}</span>
                                </div>
                            ))}
                        </div>
                        <div className="bg-white/5 rounded-2xl p-5 border border-white/10 backdrop-blur-sm">
                            <p className="text-xs text-gray-400 leading-relaxed font-medium">
                                <span className="font-bold text-white uppercase tracking-wide mr-2 block sm:inline mb-1 sm:mb-0">Reconciliation Note</span> 
                                Total Marketing Spend per Finance records is SAR 28,000. The displayed figure (SAR 21,347) reflects direct allocation; the difference aligns with ~31% VAT and fees (Meta & TikTok) applied at source.
                            </p>
                        </div>
                    </div>
                </div>
            </BentoCard>

            {/* 6. Tenant Table */}
            <BentoCard title="Tenant Activity" subtitle={`${tenants.length} transactions recorded`} className="min-h-fit overflow-hidden">
                 <div className="relative mt-4 w-full">
                    {/* Scroll Hint */}
                    <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none md:hidden z-10"></div>
                    
                    <div className="overflow-x-auto pb-4 -mx-6 px-6 sm:mx-0 sm:px-0">
                        <table className="w-full text-left border-collapse min-w-[700px] sm:min-w-[800px]">
                            <thead>
                                <tr className="border-b border-gray-100">
                                    <th className="py-4 px-2 sm:px-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Tenant</th>
                                    <th className="py-4 px-2 sm:px-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Source</th>
                                    <th className="py-4 px-2 sm:px-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Rent</th>
                                    <th className="py-4 px-2 sm:px-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Mathwaa Rev</th>
                                    <th className="py-4 px-2 sm:px-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {tenants.map((t, idx) => (
                                    <tr key={idx} className="group hover:bg-gray-50/80 transition-colors border-b border-gray-50 last:border-0">
                                        <td className="py-4 px-2 sm:px-4">
                                            <div className="font-bold text-[#1D1D1F] text-base group-hover:text-black">{t.name}</div>
                                            <div className="text-xs text-gray-400 mt-0.5">{t.branch}</div>
                                        </td>
                                        <td className="py-4 px-2 sm:px-4">
                                            <span className="text-[10px] sm:text-xs font-bold text-gray-600 bg-gray-100/80 px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg border border-gray-200/50 whitespace-nowrap">{t.source}</span>
                                        </td>
                                        <td className="py-4 px-2 sm:px-4 text-right font-semibold text-gray-600 tabular-nums text-base">
                                            {formatCurrency(t.rent)}
                                        </td>
                                        <td className="py-4 px-2 sm:px-4 text-right font-bold text-[#4A2C5A] tabular-nums text-base">
                                            {formatCurrency(t.mathwaaRevenue)}
                                        </td>
                                        <td className="py-4 px-2 sm:px-4 text-right">
                                            <Pill 
                                                text={t.status} 
                                                color={t.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'} 
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                 </div>
            </BentoCard>

        </div>

        <FormulaModal isOpen={showFormulas} onClose={() => setShowFormulas(false)} lang="en" />
      </main>
    </div>
  );
};

export default App_en;
