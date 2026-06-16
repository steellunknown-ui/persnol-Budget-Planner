import React, { useState, useMemo } from 'react';
import { Calculator, PieChart as PieChartIcon, Calendar, ArrowRight, IndianRupee } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import { formatCurrency } from '../utils/currency';

const EmiPlanner = () => {
    // Calculator States
    const [principal, setPrincipal] = useState(500000);
    const [rate, setRate] = useState(8.5);
    const [tenureYears, setTenureYears] = useState(5);

    // Dynamic Calculations
    const results = useMemo(() => {
        const p = parseFloat(principal);
        const r = parseFloat(rate) / 12 / 100; // Monthly interest rate
        const n = parseFloat(tenureYears) * 12; // Tenure in months

        if (!p || !r || !n || p <= 0 || r <= 0 || n <= 0) {
            return {
                emi: 0,
                totalInterest: 0,
                totalAmount: 0,
                schedule: []
            };
        }

        // EMI Formula: P x R x (1+R)^N / ((1+R)^N - 1)
        const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        const totalAmount = emi * n;
        const totalInterest = totalAmount - p;

        // Amortization Schedule
        let balance = p;
        const schedule = [];

        for (let month = 1; month <= n; month++) {
            const interestPayment = balance * r;
            const principalPayment = emi - interestPayment;
            balance -= principalPayment;

            schedule.push({
                month,
                principalPayment,
                interestPayment,
                totalPayment: emi,
                balance: Math.max(0, balance) // Avoid floating point negatives
            });
        }

        return {
            emi,
            totalInterest,
            totalAmount,
            schedule
        };
    }, [principal, rate, tenureYears]);

    // Chart Data
    const chartData = [
        { name: 'Principal Amount', value: principal || 0, color: '#4f46e5' }, // brand-600
        { name: 'Total Interest', value: results.totalInterest || 0, color: '#f59e0b' } // amber-500
    ];

    return (
        <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header Area */}
            <div>
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">EMI Planner</h1>
                <p className="text-light-muted mt-1 font-medium">Calculate your Equated Monthly Installment and view the payoff schedule.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Inputs Section (Left / Top) */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="bg-white rounded-3xl p-6 md:p-8 border border-light-border shadow-lg shadow-slate-200/50">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
                                <Calculator size={20} />
                            </div>
                            <h2 className="text-xl font-bold text-slate-900">Loan Details</h2>
                        </div>

                        <div className="space-y-6">
                            {/* Principal Input */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Loan Amount</label>
                                    <span className="text-brand-600 font-bold bg-brand-50 px-3 py-1 rounded-lg text-sm">{formatCurrency(principal)}</span>
                                </div>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">₹</span>
                                    <input
                                        type="number"
                                        min="10000"
                                        step="10000"
                                        value={principal}
                                        onChange={(e) => setPrincipal(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-lg font-bold text-slate-900"
                                    />
                                </div>
                                <input
                                    type="range"
                                    min="10000" max="50000000" step="10000"
                                    value={principal}
                                    onChange={(e) => setPrincipal(e.target.value)}
                                    className="w-full mt-4 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
                                />
                            </div>

                            {/* Interest Rate Input */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Interest Rate (p.a)</label>
                                    <span className="text-amber-600 font-bold bg-amber-50 px-3 py-1 rounded-lg text-sm">{rate}%</span>
                                </div>
                                <div className="relative">
                                    <input
                                        type="number"
                                        min="1" max="30" step="0.1"
                                        value={rate}
                                        onChange={(e) => setRate(e.target.value)}
                                        className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-lg font-bold text-slate-900"
                                    />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">%</span>
                                </div>
                                <input
                                    type="range"
                                    min="1" max="30" step="0.1"
                                    value={rate}
                                    onChange={(e) => setRate(e.target.value)}
                                    className="w-full mt-4 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                                />
                            </div>

                            {/* Tenure Input */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Loan Tenure</label>
                                    <span className="text-emerald-600 font-bold bg-emerald-50 px-3 py-1 rounded-lg text-sm">{tenureYears} Years</span>
                                </div>
                                <div className="relative">
                                    <input
                                        type="number"
                                        min="1" max="30" step="1"
                                        value={tenureYears}
                                        onChange={(e) => setTenureYears(e.target.value)}
                                        className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-lg font-bold text-slate-900"
                                    />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">Years</span>
                                </div>
                                <input
                                    type="range"
                                    min="1" max="30" step="1"
                                    value={tenureYears}
                                    onChange={(e) => setTenureYears(e.target.value)}
                                    className="w-full mt-4 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Results Section (Right / Bottom) */}
                <div className="lg:col-span-7 space-y-6">

                    {/* Top Result Card */}
                    <div className="bg-slate-900 rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-xl shadow-slate-900/10">
                        <div className="absolute -right-20 -top-20 w-64 h-64 bg-brand-500 rounded-full blur-[80px] opacity-20 pointer-events-none"></div>

                        <div className="flex flex-col md:flex-row gap-8 items-center justify-between relative z-10">
                            <div className="flex-1 text-center md:text-left border-b md:border-b-0 md:border-r border-slate-700/50 pb-6 md:pb-0 md:pr-6">
                                <h3 className="text-slate-400 font-semibold text-sm mb-2">Your Monthly EMI</h3>
                                <div className="text-4xl md:text-5xl font-extrabold text-white">
                                    {formatCurrency(results.emi)}
                                </div>
                            </div>

                            <div className="flex-1 grid grid-cols-2 gap-6 w-full">
                                <div>
                                    <div className="flex items-center gap-1.5 text-slate-400 font-semibold text-xs uppercase tracking-wider mb-1.5">
                                        <div className="w-2 h-2 rounded-full bg-brand-500"></div> Principal
                                    </div>
                                    <div className="text-xl font-bold text-slate-200">{formatCurrency(principal)}</div>
                                </div>
                                <div>
                                    <div className="flex items-center gap-1.5 text-slate-400 font-semibold text-xs uppercase tracking-wider mb-1.5">
                                        <div className="w-2 h-2 rounded-full bg-amber-500"></div> Total Interest
                                    </div>
                                    <div className="text-xl font-bold text-slate-200">{formatCurrency(results.totalInterest)}</div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 pt-6 border-t border-slate-700/50 flex justify-between items-center">
                            <span className="text-slate-400 font-medium">Total Amount Payable</span>
                            <span className="text-2xl font-bold text-white tracking-tight">{formatCurrency(results.totalAmount)}</span>
                        </div>
                    </div>

                    {/* Chart & Summary */}
                    <div className="bg-white rounded-3xl p-6 md:p-8 border border-light-border shadow-sm flex flex-col md:flex-row gap-8 items-center">
                        <div className="w-48 h-48 shrink-0 relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={chartData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {chartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <RechartsTooltip
                                        formatter={(value) => formatCurrency(value)}
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                                <PieChartIcon size={24} className="text-slate-300" />
                            </div>
                        </div>

                        <div className="flex-1 w-full space-y-4">
                            <h3 className="text-lg font-bold text-slate-900 mb-4">Breakdown Summary</h3>
                            <div className="bg-slate-50 rounded-2xl p-4 flex justify-between items-center border border-slate-100">
                                <span className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-brand-600"></div>
                                    Principal Proportion
                                </span>
                                <span className="font-bold text-slate-900">
                                    {results.totalAmount > 0 ? ((principal / results.totalAmount) * 100).toFixed(1) : 0}%
                                </span>
                            </div>
                            <div className="bg-slate-50 rounded-2xl p-4 flex justify-between items-center border border-slate-100">
                                <span className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                                    Interest Proportion
                                </span>
                                <span className="font-bold text-slate-900">
                                    {results.totalAmount > 0 ? ((results.totalInterest / results.totalAmount) * 100).toFixed(1) : 0}%
                                </span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Amortization Schedule Table */}
            <div className="bg-white rounded-3xl border border-light-border shadow-sm overflow-hidden flex flex-col">
                <div className="p-6 md:p-8 border-b border-light-border flex justify-between items-center bg-slate-50">
                    <div>
                        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                            <Calendar size={20} className="text-brand-600" />
                            Payoff Schedule
                        </h2>
                        <p className="text-sm font-medium text-slate-500 mt-1">Month-by-month breakdown of your loan.</p>
                    </div>
                </div>

                <div className="overflow-x-auto max-h-[500px] overflow-y-auto relative custom-scrollbar">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
                            <tr className="text-xs uppercase tracking-wider text-slate-500 font-bold">
                                <th className="p-5 pl-6 sm:pl-8 py-4 whitespace-nowrap">Month</th>
                                <th className="p-5 py-4 whitespace-nowrap text-right">Principal</th>
                                <th className="p-5 py-4 whitespace-nowrap text-right">Interest</th>
                                <th className="p-5 py-4 whitespace-nowrap text-right">Total Payment</th>
                                <th className="p-5 pr-6 sm:pr-8 py-4 whitespace-nowrap text-right">Balance</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.schedule.length > 0 ? results.schedule.map((row) => (
                                <tr key={row.month} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                                    <td className="p-4 pl-6 sm:pl-8">
                                        <div className="font-bold text-slate-900">Mo. {row.month}</div>
                                        <div className="text-xs text-slate-500 font-medium">Yr. {Math.ceil(row.month / 12)}</div>
                                    </td>
                                    <td className="p-4 text-right font-semibold text-brand-600">{formatCurrency(row.principalPayment)}</td>
                                    <td className="p-4 text-right font-semibold text-amber-500">{formatCurrency(row.interestPayment)}</td>
                                    <td className="p-4 text-right font-bold text-slate-900">{formatCurrency(row.totalPayment)}</td>
                                    <td className="p-4 pr-6 sm:pr-8 text-right font-bold text-slate-600">
                                        {formatCurrency(row.balance)}
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-slate-500 font-medium">
                                        Enter valid loan details to see the schedule.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Custom Scrollbar Styles for the table container */}
            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                    height: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: #cbd5e1;
                    border-radius: 20px;
                }
            `}</style>
        </div>
    );
};

export default EmiPlanner;
