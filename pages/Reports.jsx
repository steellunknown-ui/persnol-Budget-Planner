import React, { useState, useEffect, useRef } from 'react';
import { FileText, Download, Calendar, BarChart3, ArrowUpRight, ArrowDownRight, IndianRupee, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { formatCurrency } from '../utils/currency';

const Reports = () => {
    const defaultData = [
        { month: 'Jan', income: 0, expense: 0 },
        { month: 'Feb', income: 0, expense: 0 },
        { month: 'Mar', income: 0, expense: 0 },
        { month: 'Apr', income: 0, expense: 0 },
        { month: 'May', income: 0, expense: 0 },
        { month: 'Jun', income: 0, expense: 0 },
        { month: 'Jul', income: 0, expense: 0 },
        { month: 'Aug', income: 0, expense: 0 },
        { month: 'Sep', income: 0, expense: 0 },
        { month: 'Oct', income: 0, expense: 0 },
        { month: 'Nov', income: 0, expense: 0 },
        { month: 'Dec', income: 0, expense: 0 },
    ];

    const [transactions, setTransactions] = useState([]);
    const [monthlyData, setMonthlyData] = useState(defaultData);
    const [summary, setSummary] = useState({ totalIncome: 0, totalExpense: 0, netSavings: 0 });
    const [isExporting, setIsExporting] = useState(false);

    const reportRef = useRef(null);

    useEffect(() => {
        const stored = localStorage.getItem('budgetpro_transactions');
        if (stored) {
            const parsed = JSON.parse(stored);
            setTransactions(parsed);

            // Process currently selected year (assuming current year for simplicity)
            const currentYear = new Date().getFullYear();
            let yearIncome = 0;
            let yearExpense = 0;

            const processedData = [...defaultData].map(item => ({ ...item })); // deep copy

            parsed.forEach(tx => {
                const date = new Date(tx.date);
                if (date.getFullYear() === currentYear) {
                    const monthIndex = date.getMonth(); // 0 to 11
                    if (tx.type === 'income') {
                        processedData[monthIndex].income += tx.amount;
                        yearIncome += tx.amount;
                    } else {
                        processedData[monthIndex].expense += tx.amount;
                        yearExpense += tx.amount;
                    }
                }
            });

            setMonthlyData(processedData);
            setSummary({
                totalIncome: yearIncome,
                totalExpense: yearExpense,
                netSavings: yearIncome - yearExpense
            });
        }
    }, []);

    const handleExportPDF = () => {
        window.print();
    };

    return (
        <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 print:p-0">
            {/* Header Area */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 print:hidden">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Financial Reports</h1>
                    <p className="text-light-muted mt-1 font-medium">Analyze your yearly performance and export data.</p>
                </div>
                <button
                    onClick={handleExportPDF}
                    disabled={isExporting}
                    className="bg-brand-600 hover:bg-brand-700 disabled:bg-brand-400 text-white px-6 py-2.5 rounded-full font-bold shadow-md shadow-brand-500/20 flex items-center gap-2 transition-all active:scale-95"
                >
                    {isExporting ? (
                        <div className="flex items-center gap-2">
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            Generating...
                        </div>
                    ) : (
                        <>
                            <Download size={20} />
                            Export as PDF
                        </>
                    )}
                </button>
            </div>

            {/* Printable Report Container */}
            <div ref={reportRef} className="bg-white rounded-3xl p-8 border border-light-border shadow-sm">

                {/* Report Header for PDF */}
                <div className="flex justify-between items-center mb-10 pb-6 border-b border-slate-100">
                    <div>
                        <div className="flex items-center gap-2 text-brand-600 font-bold text-2xl tracking-tight mb-1">
                            <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white text-base">ß</div>
                            BudgetPro
                        </div>
                        <div className="text-slate-500 font-medium">Annual Financial Report</div>
                    </div>
                    <div className="text-right">
                        <div className="text-xl font-bold text-slate-900">{new Date().getFullYear()}</div>
                        <div className="text-slate-500 text-sm font-medium flex items-center justify-end gap-1">
                            <Calendar size={14} /> Generated on {new Date().toLocaleDateString('en-IN')}
                        </div>
                    </div>
                </div>

                {/* KPI Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 flex flex-col justify-between">
                        <div className="text-slate-500 font-semibold text-sm mb-2 flex flex-col">Total Income</div>
                        <div className="text-3xl font-extrabold text-emerald-600 flex items-center gap-2">
                            {formatCurrency(summary.totalIncome)}
                        </div>
                        <div className="text-emerald-600 bg-emerald-50 self-start px-2 py-0.5 mt-2 rounded-md text-xs font-bold flex items-center gap-1">
                            <ArrowUpRight size={14} /> Inflow
                        </div>
                    </div>

                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 flex flex-col justify-between">
                        <div className="text-slate-500 font-semibold text-sm mb-2 flex flex-col">Total Expenses</div>
                        <div className="text-3xl font-extrabold text-rose-500 flex items-center gap-2">
                            {formatCurrency(summary.totalExpense)}
                        </div>
                        <div className="text-rose-600 bg-rose-50 self-start px-2 py-0.5 mt-2 rounded-md text-xs font-bold flex items-center gap-1">
                            <ArrowDownRight size={14} /> Outflow
                        </div>
                    </div>

                    <div className="bg-brand-600 rounded-2xl p-6 border border-brand-500 shadow-lg shadow-brand-500/20 flex flex-col justify-between relative overflow-hidden">
                        <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                        <div className="text-brand-100 font-semibold text-sm mb-2 relative z-10 flex border-brand-400">Net Savings</div>
                        <div className="text-3xl font-extrabold text-white flex items-center gap-2 relative z-10">
                            {formatCurrency(summary.netSavings)}
                        </div>
                        <div className="text-white bg-brand-500 self-start px-2 py-0.5 mt-2 rounded-md text-xs font-bold flex items-center gap-1 relative z-10">
                            {summary.netSavings >= 0 ? 'Surplus' : 'Deficit'}
                        </div>
                    </div>
                </div>

                {/* Primary Chart: Monthly Income vs Expense */}
                <div className="mb-10">
                    <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <BarChart3 size={20} className="text-brand-600" />
                        Monthly Income vs Expense
                    </h3>
                    <div className="w-full overflow-x-auto custom-scrollbar">
                        <div style={{ width: 1000, height: 400 }}>
                            <BarChart
                                width={1000}
                                height={400}
                                data={monthlyData}
                                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                barGap={8}
                            >
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis
                                    dataKey="month"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#64748b', fontSize: 14, fontWeight: 500 }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#64748b', fontSize: 14, fontWeight: 500 }}
                                    tickFormatter={(value) => value >= 1000 ? `₹${value / 1000}k` : `₹${value}`}
                                    dx={-10}
                                />
                                <RechartsTooltip
                                    cursor={{ fill: '#f1f5f9' }}
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                    formatter={(value) => formatCurrency(value)}
                                />
                                <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="circle" />
                                <Bar dataKey="income" name="Income" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={40} />
                                <Bar dataKey="expense" name="Expense" fill="#f43f5e" radius={[4, 4, 0, 0]} maxBarSize={40} />
                            </BarChart>
                        </div>
                    </div>
                </div>

                {/* Secondary Chart: Cumulative Savings (Net Worth tracking) */}
                <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <TrendingUp size={20} className="text-brand-600" /> {/* TrendingUp is already imported in typical setups, we should import it or use BarChart icon */}
                        Cumulative Savings Trend
                    </h3>
                    <div className="w-full overflow-x-auto custom-scrollbar">
                        <div style={{ width: 1000, height: 300 }}>
                            <AreaChart
                                width={1000}
                                height={300}
                                data={monthlyData.map((d, i, arr) => {
                                    const prevSaving = arr.slice(0, i + 1).reduce((acc, curr) => acc + (curr.income - curr.expense), 0);
                                    return { ...d, savings: prevSaving };
                                })}
                                margin={{ top: 10, right: 30, left: 20, bottom: 0 }}
                            >
                                <defs>
                                    <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `₹${value / 1000}k`} dx={-10} tick={{ fill: '#64748b', fontSize: 12 }} />
                                <RechartsTooltip formatter={(value) => formatCurrency(value)} />
                                <Area type="monotone" dataKey="savings" name="Cumulative Savings" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorSavings)" />
                            </AreaChart>
                        </div>
                    </div>
                </div>

            </div>
            {/* End of printable container */}

        </div>
    );
};

export default Reports;
