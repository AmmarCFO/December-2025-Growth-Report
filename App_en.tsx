
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

// --- Main Application ---

const App_en: React.FC<{ onToggleLanguage: () => void }> = ({ onToggleLanguage }) => {
  const { financials, spendBreakdown, period, tenants, branchPerformance } = REPORT_DATA;
  const [showFormulas, setShowFormulas] = useState(false);

  // Chart Logic
  const performanceData = [
    { name: 'Media Spend', value: financials.adSpend, fill: '#E5E5EA' },
    { name: 'Attributed Rev', value: financials.revenueAttributedToAds, fill: '#4A2C5A' },
  ];

  return (
    <div className="min-h-screen pb-32 selection:bg-[#4A2C5A] selection:text-white bg-[#F5F5F7]">
      <Header onToggleLanguage={onToggleLanguage} />
      
      <main className="max-w-5xl mx-auto px-6">
        
        {/* Title Area */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 px-4">
            <div>
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-6xl md:text-8xl font-semibold tracking-tighter text-[#1D1D1F] mb-4"
                >
                    December <span className="text-gray-300">Review</span>
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-2xl text-gray-500 font-medium"
                >
                    {period.en}
                </motion.p>
            </div>
            <motion.button 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => setShowFormulas(true)}
                className="mt-8 md:mt-0 flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-sm text-sm font-semibold text-[#1D1D1F] hover:bg-gray-50 transition-all border border-gray-200"
            >
                <CalculatorIcon className="w-5 h-5 text-gray-400" />
                <span>Formulas</span>
            </motion.button>
        </div>

        {/* Vertical Stack Layout (One Section at a Time) */}
        <div className="flex flex-col gap-10">
            
            {/* 1. Hero Revenue Card */}
            <BentoCard 
                dark 
                className="min-h-[500px] justify-center"
            >
                 {/* Abstract Mesh Background */}
                 <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-b from-[#4A2C5A] to-transparent opacity-40 blur-[120px] -mr-40 -mt-40 pointer-events-none rounded-full"></div>
                 <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-900/30 blur-[100px] -ml-40 -mb-40 pointer-events-none rounded-full"></div>

                 <div className="relative z-10">
                     <div className="flex items-center gap-3 mb-6">
                        <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
                        <span className="text-sm font-bold uppercase tracking-widest text-white/50">Confirmed Revenue</span>
                     </div>
                     <h2 className="text-7xl md:text-9xl font-semibold tracking-tighter text-white mb-6">
                        {financials.mathwaaRevenue.toLocaleString('en-US')}
                        <span className="text-4xl md:text-5xl text-white/30 font-light ml-4">SAR</span>
                     </h2>
                     <p className="text-xl md:text-2xl text-white/60 max-w-2xl leading-relaxed">
                        Total revenue share recognized for Mathwaa in December. This represents confirmed lease income.
                     </p>
                 </div>
                 
                 {/* Mini Stats inside Hero */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-16 pt-10 border-t border-white/10">
                     <div>
                         <p className="text-sm font-bold uppercase tracking-widest text-white/40 mb-2">Total LTV Generated</p>
                         <p className="text-3xl md:text-4xl font-semibold text-white">{formatCurrency(financials.mathwaaLTV)}</p>
                     </div>
                     <div>
                         <p className="text-sm font-bold uppercase tracking-widest text-white/40 mb-2">Net Cash Collected</p>
                         <p className="text-3xl md:text-4xl font-semibold text-white">{formatCurrency(financials.netCashCollected)}</p>
                     </div>
                 </div>
            </BentoCard>

            {/* 2. ROI Card */}
            <BentoCard className="bg-white border border-gray-100" title="Marketing ROI">
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
                            <span className="text-6xl font-bold tracking-tighter text-[#1D1D1F]">{financials.roi}%</span>
                            <span className="text-sm font-bold uppercase text-gray-400 mt-2">Return</span>
                        </div>
                    </div>
                    <div className="text-center md:text-left max-w-lg">
                        <p className="text-xl md:text-2xl text-gray-500 font-medium leading-relaxed mb-6">
                            Efficiency at scale.<br/>
                            For every <span className="text-[#1D1D1F] font-bold">1 SAR</span> spent on media, 
                            <span className="text-[#1D1D1F] font-bold"> 1.40 SAR</span> was generated in December.
                        </p>
                        <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                             <p className="text-xs text-gray-500 leading-relaxed font-medium">
                                <span className="font-bold text-[#1D1D1F] uppercase tracking-wide mr-2">Analyst Note</span>
                                140% ROAS for Saudi real estate nears break-even at ~70% profit margins. The industry benchmark for "excellent-grade" marketing is 400%+ ROI.
                             </p>
                        </div>
                    </div>
                </div>
            </BentoCard>

            {/* 3. Spend Efficiency */}
            <BentoCard title="Spend Efficiency" className="min-h-[450px]">
                <div className="w-full h-[300px] mt-8">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart layout="vertical" data={performanceData} margin={{ left: 0, right: 20 }} barSize={48}>
                            <XAxis type="number" hide />
                            <YAxis 
                                dataKey="name" 
                                type="category" 
                                axisLine={false} 
                                tickLine={false} 
                                width={140} 
                                tick={{ fontSize: 15, fontWeight: 600, fill: '#86868b' }} 
                            />
                            <RechartsTooltip 
                                cursor={{ fill: 'transparent' }}
                                contentStyle={{ borderRadius: '16px', border: 'none', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(20px)', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', padding: '12px 20px' }}
                            />
                            <Bar dataKey="value" radius={[0, 12, 12, 0]} animationDuration={1500}>
                                {performanceData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="mt-8 flex justify-around items-center px-4 border-t border-gray-100 pt-8">
                    <div className="text-center">
                         <div className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2">Ad Spend</div>
                         <div className="text-3xl font-bold text-[#1D1D1F]">{formatCurrency(financials.adSpend)}</div>
                    </div>
                    <div className="w-[1px] h-12 bg-gray-100"></div>
                    <div className="text-center">
                         <div className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2">Revenue (Ads)</div>
                         <div className="text-3xl font-bold text-[#4A2C5A]">{formatCurrency(financials.revenueAttributedToAds)}</div>
                    </div>
                </div>
            </BentoCard>

            {/* 4. Branch Performance */}
            <BentoCard title="Branch Revenue" className="min-h-[450px]">
                <div className="w-full h-[350px] mt-6">
                    <ResponsiveContainer width="100%" height="100%">
                         <BarChart data={branchPerformance} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F5F5F7" />
                            <XAxis 
                                dataKey="name_en" 
                                tick={{ fontSize: 12, fill: '#86868b', fontWeight: 600, dy: 10 }} 
                                axisLine={false} 
                                tickLine={false} 
                                interval={0}
                            />
                            <RechartsTooltip 
                                cursor={{ fill: 'rgba(0,0,0,0.02)', radius: 12 }}
                                contentStyle={{ borderRadius: '16px', border: 'none', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(20px)', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                                formatter={(val: number) => formatCurrency(val)}
                            />
                            <Bar dataKey="value" fill="#1D1D1F" radius={[8, 8, 8, 8]} barSize={50} />
                         </BarChart>
                    </ResponsiveContainer>
                </div>
            </BentoCard>

            {/* 5. Allocation */}
            <BentoCard title="Cost Allocation" className="min-h-[400px]">
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
                                    contentStyle={{ borderRadius: '16px', border: 'none', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(20px)', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-3xl font-bold text-[#1D1D1F]">{formatCurrency(financials.marketingSpend)}</span>
                            <span className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Total Spend</span>
                        </div>
                    </div>
                    
                    <div className="w-full md:w-1/2">
                        <div className="space-y-4 mb-8">
                            {spendBreakdown.map((item, idx) => (
                                <div key={idx} className="flex justify-between items-center p-3 rounded-xl hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: item.color }}></div>
                                        <span className="text-gray-600 font-semibold text-base">{item.name_en}</span>
                                    </div>
                                    <span className="font-bold text-[#1D1D1F] text-lg">{formatCurrency(item.value)}</span>
                                </div>
                            ))}
                        </div>
                        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                            <p className="text-xs text-gray-500 leading-relaxed font-medium">
                                <span className="font-bold text-[#1D1D1F] uppercase tracking-wide mr-2">Reconciliation Note</span> 
                                Total Marketing Spend per Finance records is SAR 28,000. The displayed figure (SAR 21,347) reflects direct allocation; the difference aligns with ~31% VAT and fees (Meta & TikTok) applied at source.
                            </p>
                        </div>
                    </div>
                </div>
            </BentoCard>

            {/* 6. Tenant Table */}
            <BentoCard title="Tenant Activity" subtitle={`${tenants.length} transactions recorded`} className="min-h-[500px] overflow-hidden">
                 <div className="mt-6 w-full overflow-x-auto pb-4">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="border-b border-gray-100">
                                <th className="py-4 px-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Tenant</th>
                                <th className="py-4 px-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Source</th>
                                <th className="py-4 px-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Rent</th>
                                <th className="py-4 px-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Mathwaa Rev</th>
                                <th className="py-4 px-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Status</th>
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
                                    <td className="py-4 px-4 text-right font-semibold text-gray-600 tabular-nums text-base">
                                        {formatCurrency(t.rent)}
                                    </td>
                                    <td className="py-4 px-4 text-right font-bold text-[#4A2C5A] tabular-nums text-base">
                                        {formatCurrency(t.mathwaaRevenue)}
                                    </td>
                                    <td className="py-4 px-4 text-right">
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
            </BentoCard>

        </div>

        <FormulaModal isOpen={showFormulas} onClose={() => setShowFormulas(false)} lang="en" />
      </main>
    </div>
  );
};

export default App_en;
