import React, { useState, useEffect } from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell
} from 'recharts';
import {
    TrendingUp, TrendingDown, IndianRupee, CreditCard,
    ArrowUpRight, ArrowDownRight, Wallet, Activity
} from 'lucide-react';
import { formatCurrency } from '../utils/currency';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    const [realTransactions, setRealTransactions] = useState([]);

    useEffect(() => {
        const stored = localStorage.getItem('budgetpro_transactions');
        if (stored) {
            // Sort by latest date first
            const parsed = JSON.parse(stored).sort((a, b) => new Date(b.date) - new Date(a.date));
            setRealTransactions(parsed);
        }
    }, []);

    // Calculate real metrics based on the current month
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    let totalIncome = 0;
    let totalExpenses = 0;
    let monthlyIncome = 0;
    let monthlyExpenses = 0;

    realTransactions.forEach(tx => {
        const txDate = new Date(tx.date);
        const isCurrentMonth = txDate.getMonth() === currentMonth && txDate.getFullYear() === currentYear;

        if (tx.type === 'income') {
            totalIncome += tx.amount;
            if (isCurrentMonth) monthlyIncome += tx.amount;
        } else {
            totalExpenses += tx.amount;
            if (isCurrentMonth) monthlyExpenses += tx.amount;
        }
    });

    const totalBalance = totalIncome - totalExpenses;

    // Transform real data for charts
    const cashflowDataMap = new Map();
    // Initialize last 6 months
    for (let i = 5; i >= 0; i--) {
        const d = new Date(currentYear, currentMonth - i, 1);
        const monthName = d.toLocaleString('en-IN', { month: 'short' });
        cashflowDataMap.set(monthName, { name: monthName, income: 0, expenses: 0 });
    }

    const categoryDataMap = new Map();
    const COLORS = ['#4f46e5', '#0ea5e9', '#8b5cf6', '#f43f5e', '#f59e0b', '#10b981', '#64748b'];

    realTransactions.forEach(tx => {
        const txDate = new Date(tx.date);
        const isWithinLast6Months = txDate >= new Date(currentYear, currentMonth - 5, 1) && txDate <= new Date(currentYear, currentMonth + 1, 0);

        // Populate Cashflow
        if (isWithinLast6Months) {
            const shortMonth = txDate.toLocaleString('en-IN', { month: 'short' });
            if (cashflowDataMap.has(shortMonth)) {
                if (tx.type === 'income') {
                    cashflowDataMap.get(shortMonth).income += tx.amount;
                } else {
                    cashflowDataMap.get(shortMonth).expenses += tx.amount;
                }
            }
        }

        // Populate Categories (Expenses Only for this chart type)
        if (tx.type === 'expense') {
            if (categoryDataMap.has(tx.category)) {
                categoryDataMap.set(tx.category, categoryDataMap.get(tx.category) + tx.amount);
            } else {
                categoryDataMap.set(tx.category, tx.amount);
            }
        }
    });

    const cashflowData = Array.from(cashflowDataMap.values());
    const categoryData = Array.from(categoryDataMap.entries())
        .map(([name, value], index) => ({ name, value, color: COLORS[index % COLORS.length] }))
        .sort((a, b) => b.value - a.value).slice(0, 5); // Keep top 5 to avoid chart clutter

    const totalCategoryExpense = categoryData.reduce((acc, curr) => acc + curr.value, 0);


    const recentTransactions = [
        { id: 1, name: 'Whole Foods Market', category: 'Food', date: 'Today, 2:45 PM', amount: -124.50, type: 'expense' },
        { id: 2, name: 'TechCorp Salary', category: 'Income', date: 'Yesterday', amount: 4500.00, type: 'income' },
        { id: 3, name: 'Netflix Subscription', category: 'Entertainment', date: 'Oct 24', amount: -15.99, type: 'expense' },
        { id: 4, name: 'Uber Rides', category: 'Transport', date: 'Oct 22', amount: -32.40, type: 'expense' },
        { id: 5, name: 'Electric Bill', category: 'Utilities', date: 'Oct 20', amount: -95.00, type: 'expense' },
    ];

    const upcomingEmis = [
        { id: 1, name: 'Car Loan', dueDate: 'Nov 5', amount: 450, total: 15000, paid: 8500 },
        { id: 2, name: 'Home Mortgage', dueDate: 'Nov 12', amount: 1200, total: 300000, paid: 45000 },
    ];

    return (
        <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* Header */}
            <div>
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Overview</h1>
                <p className="text-light-muted mt-1 font-medium">Here's what's happening with your money today.</p>
            </div>

            {/* Top Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Total Balance */}
                <div
                    onClick={() => navigate('/app/tracker')}
                    className="bg-white rounded-2xl p-6 border border-light-border shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer"
                >
                    <div className="absolute top-0 right-0 p-4 opacity-10 transform group-hover:scale-110 transition-transform">
                        <Wallet size={80} />
                    </div>
                    <div className="flex justify-between items-start relative z-10">
                        <div className="text-light-muted font-semibold text-sm">Total Balance</div>
                        <div className="p-2 bg-brand-50 rounded-lg text-brand-600">
                            <IndianRupee size={20} />
                        </div>
                    </div>
                    <div className="mt-4 relative z-10">
                        <div className="text-3xl font-bold text-slate-900">{formatCurrency(totalBalance)}</div>
                    </div>
                </div>

                {/* Monthly Income */}
                <div
                    onClick={() => navigate('/app/tracker')}
                    className="bg-white rounded-2xl p-6 border border-light-border shadow-sm flex flex-col justify-between hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer"
                >
                    <div className="flex justify-between items-start">
                        <div className="text-light-muted font-semibold text-sm">Monthly Income (This Month)</div>
                        <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                            <ArrowDownRight size={20} />
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="text-3xl font-bold text-emerald-600">{formatCurrency(monthlyIncome)}</div>
                    </div>
                </div>

                {/* Monthly Expenses */}
                <div
                    onClick={() => navigate('/app/tracker')}
                    className="bg-white rounded-2xl p-6 border border-light-border shadow-sm flex flex-col justify-between hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer"
                >
                    <div className="flex justify-between items-start">
                        <div className="text-light-muted font-semibold text-sm">Monthly Expenses (This Month)</div>
                        <div className="p-2 bg-rose-50 rounded-lg text-rose-600">
                            <ArrowUpRight size={20} />
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="text-3xl font-bold text-rose-500">{formatCurrency(monthlyExpenses)}</div>
                    </div>
                </div>

                {/* Savings Goal */}
                <div
                    onClick={() => navigate('/app/budget-planner')}
                    className="bg-white rounded-2xl p-6 border border-light-border shadow-sm flex flex-col justify-between hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer"
                >
                    <div className="flex justify-between items-start">
                        <div className="text-light-muted font-semibold text-sm">Monthly Savings (This Month)</div>
                        <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                            <Activity size={20} />
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="text-3xl font-bold text-brand-600">{formatCurrency(monthlyIncome - monthlyExpenses)}</div>
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                {/* Cashflow Area Chart */}
                <div className="xl:col-span-2 bg-white rounded-2xl p-6 border border-light-border shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-bold text-slate-900">Cashflow Analytics</h2>
                        <select className="bg-light-bg-alt border-none text-sm font-semibold text-slate-700 rounded-lg py-1.5 px-3 outline-none focus:ring-2 focus:ring-brand-500/20">
                            <option>Last 6 Months</option>
                            <option>This Year</option>
                        </select>
                    </div>
                    <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={cashflowData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    itemStyle={{ fontWeight: 600 }}
                                />
                                <Area type="monotone" dataKey="income" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorIncome)" />
                                <Area type="monotone" dataKey="expenses" stroke="#f43f5e" strokeWidth={3} fillOpacity={1} fill="url(#colorExpense)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Expenses by Category Donut */}
                <div className="bg-white rounded-2xl p-6 border border-light-border shadow-sm flex flex-col">
                    <h2 className="text-lg font-bold text-slate-900 mb-6">Spending by Category</h2>
                    <div className="flex-1 min-h-[200px] relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={categoryData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={90}
                                    paddingAngle={5}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {categoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    formatter={(value) => formatCurrency(value)}
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                        {/* Center Text */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-light-muted text-xs font-semibold uppercase tracking-wider">Top 5 Tot</span>
                            <span className="text-xl font-bold text-slate-900">{formatCurrency(totalCategoryExpense)}</span>
                        </div>
                    </div>
                    {/* Legend underneath */}
                    <div className="mt-4 grid grid-cols-2 gap-x-2 gap-y-3">
                        {categoryData.map(cat => (
                            <div key={cat.name} className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }}></div>
                                <span className="text-xs font-medium text-slate-700 truncate">{cat.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* Bottom Row: Transactions & EMIs */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-12">

                {/* Recent Transactions List */}
                <div className="bg-white rounded-2xl border border-light-border shadow-sm overflow-hidden flex flex-col">
                    <div className="p-6 border-b border-light-border flex justify-between items-center">
                        <h2 className="text-lg font-bold text-slate-900">Recent Transactions</h2>
                        <button className="text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors">View All</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <tbody>
                                {realTransactions.slice(0, 5).map((tx) => (
                                    <tr key={tx.id} className="border-b border-light-border last:border-0 hover:bg-slate-50 transition-colors">
                                        <td className="p-4 pl-6">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === 'income' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                                                    {tx.type === 'income' ? <ArrowDownRight size={18} /> : <ArrowUpRight size={18} />}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-slate-900 text-sm truncate max-w-[150px]">{tx.description}</div>
                                                    <div className="text-xs font-medium text-light-muted">{tx.category} • {new Date(tx.date).toLocaleDateString()}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 pr-6 text-right">
                                            <div className={`font-bold ${tx.type === 'income' ? 'text-emerald-600' : 'text-slate-900'}`}>
                                                {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {realTransactions.length === 0 && (
                                    <tr><td colSpan="2" className="p-8 text-center text-slate-500 font-medium">No transactions yet. Add some in the Tracker!</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Upcoming EMIs */}
                <div className="bg-white rounded-2xl border border-light-border shadow-sm overflow-hidden flex flex-col">
                    <div className="p-6 border-b border-light-border flex justify-between items-center">
                        <h2 className="text-lg font-bold text-slate-900">Upcoming EMIs</h2>
                        <button className="text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors">Manage</button>
                    </div>
                    <div className="p-6 space-y-6">
                        {upcomingEmis.map(emi => {
                            const percentPaid = Math.round((emi.paid / emi.total) * 100);
                            return (
                                <div key={emi.id} className="group">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <div className="font-bold text-slate-900">{emi.name}</div>
                                            <div className="text-xs font-medium text-rose-500 bg-rose-50 px-2 py-0.5 rounded flex items-center w-max mt-1 gap-1">
                                                Due {emi.dueDate}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-bold text-slate-900">₹{emi.amount}</div>
                                            <div className="text-xs font-medium text-light-muted">/ month</div>
                                        </div>
                                    </div>
                                    <div className="w-full bg-light-bg-alt h-2 rounded-full mt-3 overflow-hidden">
                                        <div className="bg-brand-500 h-full rounded-full transition-all duration-1000" style={{ width: `${percentPaid}%` }}></div>
                                    </div>
                                    <div className="flex justify-between text-xs font-medium text-light-muted mt-2">
                                        <span>₹{emi.paid.toLocaleString()} paid</span>
                                        <span>₹{emi.total.toLocaleString()} total</span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

            </div>

        </div>
    );
};

export default Dashboard;
