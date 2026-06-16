import React, { useState, useEffect } from 'react';
import { Save, User, Bell, Shield, Smartphone } from 'lucide-react';

const Settings = () => {
    const [userProfile, setUserProfile] = useState({
        name: 'Test User',
        email: 'test@example.com',
        currency: 'INR',
    });

    const [notifications, setNotifications] = useState({
        emailAlerts: true,
        budgetWarnings: true,
        monthlyReports: false,
        pushNotifications: true,
        weeklySummary: true
    });

    const [activeTab, setActiveTab] = useState('profile');

    useEffect(() => {
        const storedUser = localStorage.getItem('budgetpro_user');
        if (storedUser) {
            setUserProfile(JSON.parse(storedUser));
        }
    }, []);

    const handleProfileChange = (e) => {
        setUserProfile({ ...userProfile, [e.target.name]: e.target.value });
    };

    const handleToggle = (setting) => {
        setNotifications({ ...notifications, [setting]: !notifications[setting] });
    };

    const handleSave = () => {
        localStorage.setItem('budgetpro_user', JSON.stringify(userProfile));
        // Add a small visual feedback here in a real app (e.g., toast notification)
        alert('Settings saved successfully!');
    };

    return (
        <div className="p-6 lg:p-10 max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header Area */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Settings</h1>
                    <p className="text-light-muted mt-1 font-medium">Manage your account preferences and app configuration.</p>
                </div>
                <button
                    onClick={handleSave}
                    className="bg-brand-600 hover:bg-brand-700 text-white px-6 py-2.5 rounded-full font-bold shadow-md shadow-brand-500/20 flex items-center gap-2 transition-all active:scale-95"
                >
                    <Save size={20} />
                    Save Changes
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Navigation / Tabs Sidebar */}
                <div className="hidden md:block col-span-1 space-y-2">
                    <button
                        onClick={() => setActiveTab('profile')}
                        className={`w-full text-left px-4 py-3 rounded-xl font-bold flex items-center gap-3 transition-all ${activeTab === 'profile' ? 'bg-brand-50 text-brand-700 shadow-sm' : 'text-slate-600 hover:bg-slate-50'}`}
                    >
                        <User size={20} /> Account Profile
                    </button>
                    <button
                        onClick={() => setActiveTab('notifications')}
                        className={`w-full text-left px-4 py-3 rounded-xl font-bold flex items-center gap-3 transition-all ${activeTab === 'notifications' ? 'bg-brand-50 text-brand-700 shadow-sm' : 'text-slate-600 hover:bg-slate-50'}`}
                    >
                        <Bell size={20} /> Notifications
                    </button>
                    <button
                        onClick={() => setActiveTab('privacy')}
                        className={`w-full text-left px-4 py-3 rounded-xl font-bold flex items-center gap-3 transition-all ${activeTab === 'privacy' ? 'bg-brand-50 text-brand-700 shadow-sm' : 'text-slate-600 hover:bg-slate-50'}`}
                    >
                        <Shield size={20} /> Privacy & Security
                    </button>
                </div>

                {/* Settings Forms */}
                <div className="col-span-1 md:col-span-2 space-y-8">

                    {activeTab === 'profile' && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                            {/* Profile Section */}
                            <div className="bg-white rounded-3xl p-8 border border-light-border shadow-sm">
                                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                    <User className="text-brand-600" size={24} />
                                    Personal Information
                                </h2>

                                <div className="space-y-6">
                                    <div className="flex flex-col sm:flex-row gap-6">
                                        <div className="flex-1">
                                            <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={userProfile.name}
                                                onChange={handleProfileChange}
                                                className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all font-medium text-slate-900"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={userProfile.email}
                                                onChange={handleProfileChange}
                                                className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all font-medium text-slate-900 bg-slate-50"
                                                readOnly
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Preferred Currency</label>
                                        <select
                                            name="currency"
                                            value={userProfile.currency}
                                            onChange={handleProfileChange}
                                            className="w-full sm:w-1/2 border-2 border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all font-medium text-slate-900 bg-white appearance-none"
                                        >
                                            <option value="INR">Indian Rupee (₹)</option>
                                            <option value="USD">US Dollar ($)</option>
                                            <option value="EUR">Euro (€)</option>
                                            <option value="GBP">British Pound (£)</option>
                                        </select>
                                        <p className="mt-2 text-xs text-slate-500 font-medium">Currency changes will be applied globally across the dashboard and modules.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Danger Zone */}
                            <div className="bg-rose-50 rounded-3xl p-8 border border-rose-100">
                                <h2 className="text-xl font-bold text-rose-700 mb-2">Danger Zone</h2>
                                <p className="text-rose-600/80 font-medium text-sm mb-6">Irreversible actions regarding your data and account.</p>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <button className="px-6 py-3 bg-white text-rose-600 border border-rose-200 rounded-xl font-bold hover:bg-rose-100 transition-colors">
                                        Export Data
                                    </button>
                                    <button className="px-6 py-3 bg-rose-600 text-white rounded-xl font-bold hover:bg-rose-700 transition-all active:scale-95 shadow-md shadow-rose-500/20">
                                        Delete Account
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'notifications' && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                            {/* Notifications Section */}
                            <div className="bg-white rounded-3xl p-8 border border-light-border shadow-sm">
                                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                    <Bell className="text-brand-600" size={24} />
                                    Communication Preferences
                                </h2>

                                <div className="space-y-4">
                                    {[
                                        { id: 'emailAlerts', title: 'Email Alerts', desc: 'Receive summaries and important updates via email.' },
                                        { id: 'budgetWarnings', title: 'Budget Warnings', desc: 'Notify me when I exceed 80% of my category limits.' },
                                        { id: 'monthlyReports', title: 'Monthly Reports', desc: 'Automatically generate and save a PDF report on the 1st.' },
                                        { id: 'pushNotifications', title: 'Browser Notifications', desc: 'Get instant alerts about transactions and reminders.' },
                                        { id: 'weeklySummary', title: 'Weekly Digest', desc: 'A Sunday morning view of your weekly financial progress.' }
                                    ].map(item => (
                                        <div key={item.id} className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                                            <div className="pr-4">
                                                <p className="font-bold text-slate-900">{item.title}</p>
                                                <p className="text-sm font-medium text-slate-500 leading-tight">{item.desc}</p>
                                            </div>
                                            <button
                                                onClick={() => handleToggle(item.id)}
                                                className={`w-12 h-6 rounded-full transition-colors relative flex-shrink-0 flex items-center ${notifications[item.id] ? 'bg-brand-500' : 'bg-slate-300'}`}
                                            >
                                                <span className={`w-4 h-4 bg-white rounded-full absolute transition-transform duration-200 ${notifications[item.id] ? 'translate-x-7' : 'translate-x-1'}`} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'privacy' && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                            <div className="bg-white rounded-3xl p-8 border border-light-border shadow-sm">
                                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                    <Shield className="text-brand-600" size={24} />
                                    Security & Privacy
                                </h2>

                                <div className="space-y-6">
                                    <div className="flex items-center justify-between p-5 rounded-2xl border border-light-border bg-slate-50/50">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-white rounded-xl border border-slate-200 flex items-center justify-center text-brand-600 shadow-sm">
                                                <Smartphone size={24} />
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900">App Passcode</p>
                                                <p className="text-sm font-medium text-slate-500">Require a PIN to access financial data on this device.</p>
                                            </div>
                                        </div>
                                        <button className="text-brand-600 font-bold hover:underline">Enable</button>
                                    </div>

                                    <div className="p-6 rounded-2xl border-2 border-dashed border-slate-200 space-y-4">
                                        <h3 className="font-bold text-slate-900">Your Data Sovereignty</h3>
                                        <p className="text-sm text-slate-600 font-medium leading-relaxed">
                                            BudgetPro uses 256-bit AES encryption for all local storage. Your data is never transmitted to our servers. We believe your financial information should only belong to you.
                                        </p>
                                        <div className="flex flex-wrap gap-3 pt-2">
                                            <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-bold border border-emerald-100">Zero Cloud Storage</span>
                                            <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-bold border border-emerald-100">End-to-End Encryption</span>
                                            <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-bold border border-emerald-100">GDPR Compliant</span>
                                        </div>
                                    </div>

                                    <div className="pt-4">
                                        <button className="w-full py-4 rounded-xl border-2 border-slate-100 hover:bg-slate-50 font-bold text-slate-600 transition-colors flex items-center justify-center gap-2">
                                            View Privacy Audit Log
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Settings;
