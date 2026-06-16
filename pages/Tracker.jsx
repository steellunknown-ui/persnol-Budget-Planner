import React, { useState, useEffect } from 'react';
import {
    Plus, Search, ArrowUpRight, ArrowDownRight,
    Filter, MoreVertical, Trash2, Calendar
} from 'lucide-react';
import { formatCurrency } from '../utils/currency';

const Tracker = () => {
    // Transaction State
    const [transactions, setTransactions] = useState([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        type: 'expense', // 'income' or 'expense'
        title: '',
        amount: '',
        category: 'Food',
        date: new Date().toISOString().split('T')[0],
    });

    const incomeCategories = ['Salary', 'Business', 'Freelance', 'Investments', 'Other'];
    const expenseCategories = ['Housing', 'Food', 'Transport', 'Utilities', 'Entertainment', 'Shopping', 'Other'];

    // Load transactions on mount
    useEffect(() => {
        const stored = localStorage.getItem('budgetpro_transactions');
        if (stored) {
            setTransactions(JSON.parse(stored));
        } else {
            // Seed with some dummy data if empty
            const dummyData = [
                { id: '1', type: 'income', title: 'TechCorp Salary', amount: 85000, category: 'Salary', date: '2023-10-01' },
                { id: '2', type: 'expense', title: 'Apartment Rent', amount: 25000, category: 'Housing', date: '2023-10-05' },
                { id: '3', type: 'expense', title: 'Grocery Shopping', amount: 4500, category: 'Food', date: '2023-10-12' },
                { id: '4', type: 'expense', title: 'Netflix & Spotify', amount: 800, category: 'Entertainment', date: '2023-10-15' },
                { id: '5', type: 'income', title: 'Freelance Project', amount: 15000, category: 'Freelance', date: '2023-10-20' },
            ];
            setTransactions(dummyData);
            localStorage.setItem('budgetpro_transactions', JSON.stringify(dummyData));
        }
    }, []);

    // Save transactions when updated
    useEffect(() => {
        if (transactions.length > 0) {
            localStorage.setItem('budgetpro_transactions', JSON.stringify(transactions));
        }
    }, [transactions]);

    // Derived Metrics
    const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, curr) => acc + curr.amount, 0);
    const totalExpense = transactions.filter(t => t.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0);
    const netBalance = totalIncome - totalExpense;

    // Handlers
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleTypeChange = (type) => {
        setFormData(prev => ({
            ...prev,
            type,
            category: type === 'income' ? incomeCategories[0] : expenseCategories[0]
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTransaction = {
            id: Date.now().toString(),
            ...formData,
            amount: parseFloat(formData.amount)
        };

        // Add to beginning of array
        setTransactions(prev => [newTransaction, ...prev]);

        // Reset and close
        setFormData({
            type: 'expense',
            title: '',
            amount: '',
            category: 'Food',
            date: new Date().toISOString().split('T')[0],
        });
        setIsAddModalOpen(false);
    };

    const handleDelete = (id) => {
        setTransactions(prev => prev.filter(t => t.id !== id));
    };

    return (
        <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* Header Area */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Transactions</h1>
                    <p className="text-light-muted mt-1 font-medium">Manage and track your daily expenses & income.</p>
                </div>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-brand-600 hover:bg-brand-700 text-white px-6 py-2.5 rounded-full font-bold shadow-md shadow-brand-500/20 flex items-center gap-2 transition-transform active:scale-95"
                >
                    <Plus size={20} />
                    Add Transaction
                </button>
            </div>

            {/* Metrics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Net Balance */}
                <div className="bg-white rounded-2xl p-6 border border-light-border shadow-sm flex flex-col justify-between">
                    <div className="text-light-muted font-semibold text-sm mb-2">Net Balance</div>
                    <div className={`text-4xl font-extrabold tracking-tight ${netBalance >= 0 ? 'text-slate-900' : 'text-rose-600'}`}>
                        {formatCurrency(netBalance)}
                    </div>
                </div>
                {/* Total Income */}
                <div className="bg-white rounded-2xl p-6 border border-light-border shadow-sm flex flex-col justify-between">
                    <div className="flex items-center gap-2 text-emerald-600 font-semibold text-sm mb-2">
                        <ArrowDownRight size={18} />
                        Total Income
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                        {formatCurrency(totalIncome)}
                    </div>
                </div>
                {/* Total Expenses */}
                <div className="bg-white rounded-2xl p-6 border border-light-border shadow-sm flex flex-col justify-between">
                    <div className="flex items-center gap-2 text-rose-600 font-semibold text-sm mb-2">
                        <ArrowUpRight size={18} />
                        Total Expenses
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                        {formatCurrency(totalExpense)}
                    </div>
                </div>
            </div>

            {/* Master Table Area */}
            <div className="bg-white rounded-2xl border border-light-border shadow-sm flex flex-col overflow-hidden">
                {/* Toolbar */}
                <div className="p-4 border-b border-light-border flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50">
                    <div className="relative w-full sm:max-w-xs">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search transactions..."
                            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-sm"
                        />
                    </div>
                    <button className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-4 py-2 rounded-xl shadow-sm">
                        <Filter size={16} />
                        Filter
                    </button>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white border-b border-light-border text-xs uppercase tracking-wider text-slate-500 font-semibold">
                                <th className="p-4 pl-6">Transaction Details</th>
                                <th className="p-4 hidden sm:table-cell">Category</th>
                                <th className="p-4 hidden md:table-cell">Date</th>
                                <th className="p-4 text-right">Amount</th>
                                <th className="p-4 pr-6 text-center w-16">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-slate-500">
                                        No transactions found. Add a new one to get started!
                                    </td>
                                </tr>
                            ) : null}

                            {/* Sort by newest first */}
                            {[...transactions].sort((a, b) => new Date(b.date) - new Date(a.date)).map((tx) => (
                                <tr key={tx.id} className="border-b border-light-border last:border-0 hover:bg-slate-50 transition-colors group">
                                    <td className="p-4 pl-6">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${tx.type === 'income' ? 'bg-emerald-100 text-emerald-600' : 'text-slate-600 bg-slate-100'}`}>
                                                {tx.type === 'income' ? <ArrowDownRight size={18} /> : <ArrowUpRight size={18} />}
                                            </div>
                                            <div>
                                                <div className="font-bold text-slate-900 text-sm whitespace-nowrap">{tx.title}</div>
                                                <div className="text-xs font-medium text-light-muted sm:hidden">{tx.category} • {tx.date}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 hidden sm:table-cell">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-700">
                                            {tx.category}
                                        </span>
                                    </td>
                                    <td className="p-4 hidden md:table-cell">
                                        <div className="flex items-center gap-1.5 text-sm text-slate-600 font-medium whitespace-nowrap">
                                            <Calendar size={14} className="text-slate-400" />
                                            {new Date(tx.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </div>
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className={`font-bold whitespace-nowrap ${tx.type === 'income' ? 'text-emerald-600' : 'text-slate-900'}`}>
                                            {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
                                        </div>
                                    </td>
                                    <td className="p-4 pr-6 text-center">
                                        <button
                                            onClick={() => handleDelete(tx.id)}
                                            className="text-slate-400 hover:text-rose-500 p-2 rounded-lg hover:bg-rose-50 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                                            title="Delete Transaction"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Transaction Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="p-6 border-b border-light-border flex justify-between items-center bg-slate-50">
                            <h2 className="text-xl font-bold text-slate-900 tracking-tight">New Transaction</h2>
                            <button
                                onClick={() => setIsAddModalOpen(false)}
                                className="text-slate-400 hover:text-slate-600 p-1"
                            >
                                <Plus size={24} className="rotate-45" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-5">
                            {/* Type Toggle */}
                            <div className="flex p-1 bg-slate-100 rounded-xl">
                                <button
                                    type="button"
                                    onClick={() => handleTypeChange('expense')}
                                    className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${formData.type === 'expense' ? 'bg-white text-rose-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                >
                                    Expense
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleTypeChange('income')}
                                    className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${formData.type === 'income' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                >
                                    Income
                                </button>
                            </div>

                            {/* Amount */}
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Amount (₹)</label>
                                <input
                                    type="number"
                                    name="amount"
                                    required
                                    min="0"
                                    step="0.01"
                                    value={formData.amount}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-lg font-bold text-slate-900 placeholder-slate-300"
                                    placeholder="0.00"
                                />
                            </div>

                            {/* Title */}
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Description</label>
                                <input
                                    type="text"
                                    name="title"
                                    required
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 font-medium text-slate-900"
                                    placeholder="e.g. Grocery Shopping"
                                />
                            </div>

                            {/* Category & Date Row */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Category</label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 font-medium text-slate-900 bg-white"
                                    >
                                        {(formData.type === 'income' ? incomeCategories : expenseCategories).map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Date</label>
                                    <input
                                        type="date"
                                        name="date"
                                        required
                                        value={formData.date}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 font-medium text-slate-900 bg-white"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-brand-500/20 transition-transform active:scale-95 mt-2"
                            >
                                Save Transaction
                            </button>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Tracker;
