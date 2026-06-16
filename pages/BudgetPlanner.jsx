import React, { useState, useEffect } from 'react';
import { Target, Plus, AlertCircle, TrendingUp, Filter, Pencil } from 'lucide-react';
import { formatCurrency } from '../utils/currency';

const BudgetPlanner = () => {
    const defaultCategories = ['Housing', 'Food', 'Transport', 'Utilities', 'Entertainment', 'Shopping', 'Other'];

    // States
    const [budgets, setBudgets] = useState({});
    const [expenses, setExpenses] = useState({});
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editCategory, setEditCategory] = useState('');
    const [editAmount, setEditAmount] = useState('');

    // Load data on mount
    useEffect(() => {
        // Load defined budgets
        const storedBudgets = localStorage.getItem('budgetpro_budgets');
        if (storedBudgets) {
            setBudgets(JSON.parse(storedBudgets));
        } else {
            // Seed with dummy budgets
            const initial = {
                'Housing': 30000,
                'Food': 10000,
                'Entertainment': 3000,
                'Transport': 5000,
            };
            setBudgets(initial);
            localStorage.setItem('budgetpro_budgets', JSON.stringify(initial));
        }

        // Calculate current month's expenses per category from transactions
        const storedTransactions = localStorage.getItem('budgetpro_transactions');
        if (storedTransactions) {
            const allTx = JSON.parse(storedTransactions);
            const currentMonthExpenses = allTx.filter(tx => {
                const txDate = new Date(tx.date);
                const now = new Date();
                return tx.type === 'expense' &&
                    txDate.getMonth() === now.getMonth() &&
                    txDate.getFullYear() === now.getFullYear();
            });

            const expenseMap = {};
            currentMonthExpenses.forEach(tx => {
                if (expenseMap[tx.category]) {
                    expenseMap[tx.category] += tx.amount;
                } else {
                    expenseMap[tx.category] = tx.amount;
                }
            });
            setExpenses(expenseMap);
        }
    }, []);

    const handleSaveBudget = (e) => {
        e.preventDefault();
        const updatedBudgets = { ...budgets, [editCategory]: parseFloat(editAmount) };
        setBudgets(updatedBudgets);
        localStorage.setItem('budgetpro_budgets', JSON.stringify(updatedBudgets));
        setIsEditModalOpen(false);
    };

    const openEditModal = (category) => {
        setEditCategory(category);
        setEditAmount(budgets[category] || '');
        setIsEditModalOpen(true);
    };

    // Calculate total layout metrics
    const totalBudget = Object.values(budgets).reduce((acc, curr) => acc + curr, 0);
    const totalSpent = Object.values(expenses).reduce((acc, curr) => acc + curr, 0);
    const overallPercentage = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;

    return (
        <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* Header Area */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Budget Planner</h1>
                    <p className="text-light-muted mt-1 font-medium">Set limits and track your monthly spending pacing.</p>
                </div>
                <button
                    onClick={() => openEditModal(defaultCategories[0])}
                    className="bg-brand-600 hover:bg-brand-700 text-white px-6 py-2.5 rounded-full font-bold shadow-md shadow-brand-500/20 flex items-center gap-2 transition-transform active:scale-95"
                >
                    <Plus size={20} />
                    Set New Budget
                </button>
            </div>

            {/* Overall Monthly Overview */}
            <div className="bg-slate-900 rounded-2xl p-6 relative overflow-hidden flex flex-col md:flex-row items-center gap-6 justify-between shadow-lg shadow-slate-900/10">
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-brand-500 rounded-full blur-[80px] opacity-30 pointer-events-none"></div>
                <div className="relative z-10 flex-1 w-full">
                    <h2 className="text-slate-400 font-semibold text-sm mb-1">Overall Monthly Budget</h2>
                    <div className="flex items-end gap-3 mb-4">
                        <span className="text-3xl md:text-4xl font-extrabold text-white">{formatCurrency(totalSpent)}</span>
                        <span className="text-lg text-slate-500 font-medium mb-1">/ {formatCurrency(totalBudget)}</span>
                    </div>
                    {/* Overall Progress Bar */}
                    <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                        <div
                            className={`h-full rounded-full transition-all duration-1000 ${overallPercentage > 100 ? 'bg-rose-500' : overallPercentage > 85 ? 'bg-amber-400' : 'bg-brand-500'}`}
                            style={{ width: `${Math.min(overallPercentage, 100)}%` }}
                        ></div>
                    </div>
                    <div className="flex justify-between mt-3 text-sm font-medium">
                        <span className="text-slate-400">{Math.round(overallPercentage)}% Spent</span>
                        <span className={totalSpent > totalBudget ? 'text-rose-400' : 'text-emerald-400'}>
                            {totalSpent > totalBudget ? 'Over Budget' : 'On Track'}
                        </span>
                    </div>
                </div>
                <div className="relative z-10 w-full md:w-auto bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6 min-w-[200px] flex flex-col items-center justify-center text-center">
                    <Target size={28} className="text-brand-400 mb-2" />
                    <div className="text-slate-300 text-xs font-semibold uppercase tracking-wider">Remaining Total</div>
                    <div className="text-xl font-bold text-white mt-1">
                        {totalBudget >= totalSpent ? formatCurrency(totalBudget - totalSpent) : '- ' + formatCurrency(totalSpent - totalBudget)}
                    </div>
                </div>
            </div>

            {/* Category Budgets Grid */}
            <div>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-slate-900">Category Budgets</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {defaultCategories.map(category => {
                        const budget = budgets[category] || 0;
                        const spent = expenses[category] || 0;
                        const percentage = budget > 0 ? (spent / budget) * 100 : 0;
                        const isOver = spent > budget && budget > 0;
                        const isWarning = percentage > 85 && !isOver;

                        return (
                            <div key={category} className="bg-white border border-light-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group flex flex-col">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="font-bold text-slate-900 text-lg">{category}</div>
                                    <button
                                        onClick={() => openEditModal(category)}
                                        className="text-slate-400 hover:text-brand-600 p-1.5 rounded-lg hover:bg-brand-50 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                                        title="Edit Budget"
                                    >
                                        <Pencil size={16} />
                                    </button>
                                </div>

                                {budget === 0 ? (
                                    <div className="flex-1 flex flex-col items-center justify-center text-center py-4">
                                        <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-3 text-slate-400">
                                            <Target size={20} />
                                        </div>
                                        <p className="text-sm font-medium text-slate-500 mb-3">No budget set</p>
                                        <button
                                            onClick={() => openEditModal(category)}
                                            className="text-xs font-bold text-brand-600 bg-brand-50 px-3 py-1.5 rounded-lg hover:bg-brand-100 transition-colors"
                                        >
                                            Set Limit
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <div className="flex justify-between items-end mb-3">
                                            <div>
                                                <div className="text-2xl font-bold text-slate-900">{formatCurrency(spent)}</div>
                                                <div className="text-xs font-semibold text-slate-500 mt-1">spent of {formatCurrency(budget)}</div>
                                            </div>
                                            {isOver ? (
                                                <div className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded-md flex items-center gap-1">
                                                    <AlertCircle size={12} /> Over Limit
                                                </div>
                                            ) : isWarning ? (
                                                <div className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-md flex items-center gap-1">
                                                    <AlertCircle size={12} /> Near Limit
                                                </div>
                                            ) : (
                                                <div className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                                                    {formatCurrency(budget - spent)} left
                                                </div>
                                            )}
                                        </div>

                                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mt-auto">
                                            <div
                                                className={`h-full rounded-full transition-all duration-1000 ${isOver ? 'bg-rose-500' : isWarning ? 'bg-amber-400' : 'bg-brand-500'}`}
                                                style={{ width: `${Math.min(percentage, 100)}%` }}
                                            ></div>
                                        </div>
                                    </>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Add/Edit Budget Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="p-6 border-b border-light-border flex justify-between items-center bg-slate-50">
                            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Set Budget Limit</h2>
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="text-slate-400 hover:text-slate-600 p-1"
                            >
                                <Plus size={24} className="rotate-45" />
                            </button>
                        </div>

                        <form onSubmit={handleSaveBudget} className="p-6 space-y-5">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Category</label>
                                <select
                                    value={editCategory}
                                    onChange={(e) => setEditCategory(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 font-semibold text-slate-900 bg-white"
                                >
                                    {defaultCategories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Monthly Limit</label>
                                <input
                                    type="number"
                                    required
                                    min="0"
                                    step="1"
                                    value={editAmount}
                                    onChange={(e) => setEditAmount(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-lg font-bold text-slate-900 placeholder-slate-300"
                                    placeholder="0"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-brand-500/20 transition-transform active:scale-95 mt-2"
                            >
                                Save Budget
                            </button>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
};

export default BudgetPlanner;
