import React, { useEffect, useState } from 'react';
import { Bell, Search, LogOut, Calculator, FileText, Settings, Target, TrendingDown, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Topbar = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({ name: 'Guest User', email: '' });
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('budgetpro_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const searchResults = [
        { name: 'Dashboard', path: '/app', icon: Target },
        { name: 'Tracker', path: '/app/tracker', icon: TrendingDown },
        { name: 'Budget Planner', path: '/app/budget-planner', icon: Target },
        { name: 'EMI Planner', path: '/app/emi-planner', icon: Calculator },
        { name: 'Reports', path: '/app/reports', icon: FileText },
        { name: 'Settings', path: '/app/settings', icon: Settings },
    ].filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const mockNotifications = [
        { id: 1, text: "Housing budget near 80% limit!", type: 'warning', time: '2m ago' },
        { id: 2, text: "New report generated for March.", type: 'success', time: '1h ago' },
        { id: 3, text: "Car Loan EMI payment due tomorrow.", type: 'danger', time: '5h ago' },
    ];

    const handleLogout = () => {
        localStorage.removeItem('budgetpro_user');
        navigate('/');
    };

    const getInitials = (name) => {
        if (!name) return 'GU';
        return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    };

    return (
        <header className="h-20 border-b border-light-border bg-white/80 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-10 w-full">
            {/* Search Bar - Aesthetic Touch */}
            <div className="flex-1 max-w-md relative">
                <div className="relative flex items-center w-full h-11 rounded-xl focus-within:shadow-md bg-light-bg-alt overflow-hidden border border-light-border focus-within:border-brand-300 transition-all">
                    <div className="grid place-items-center h-full w-12 text-light-muted">
                        <Search size={18} />
                    </div>
                    <input
                        className="peer h-full w-full outline-none text-sm text-slate-800 pr-2 bg-transparent placeholder-light-muted"
                        type="text"
                        id="search"
                        placeholder="Search records, EMI plans..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => setIsSearchFocused(true)}
                        onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                    />
                </div>

                {/* Search Results Dropdown */}
                {isSearchFocused && searchQuery.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                        {searchResults.length > 0 ? (
                            searchResults.map(res => (
                                <button
                                    key={res.name}
                                    onMouseDown={(e) => {
                                        e.preventDefault();
                                        navigate(res.path);
                                        setIsSearchFocused(false);
                                        setSearchQuery('');
                                    }}
                                    className="w-full text-left px-4 py-3 rounded-xl hover:bg-slate-50 flex items-center gap-3 transition-colors group"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-brand-100 group-hover:text-brand-600 transition-colors">
                                        <res.icon size={16} />
                                    </div>
                                    <span className="font-bold text-slate-700">{res.name}</span>
                                </button>
                            ))
                        ) : (
                            <div className="p-4 text-center text-slate-400 font-medium italic">No results found</div>
                        )}
                    </div>
                )}
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-6">
                <div className="relative">
                    <button
                        onClick={() => setNotificationsOpen(!notificationsOpen)}
                        className={`relative p-2 rounded-xl transition-all ${notificationsOpen ? 'bg-brand-50 text-brand-600' : 'text-light-muted hover:text-brand-600 hover:bg-slate-50'}`}
                    >
                        <Bell size={22} />
                        <span className="absolute top-1 right-1 flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500 border border-white"></span>
                        </span>
                    </button>

                    {/* Notification Dropdown */}
                    {notificationsOpen && (
                        <>
                            <div className="fixed inset-0 z-40" onClick={() => setNotificationsOpen(false)}></div>
                            <div className="absolute top-full right-0 mt-3 w-80 bg-white border border-slate-200 rounded-3xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                                <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                                    <h3 className="font-bold text-slate-900">Notifications</h3>
                                    <button className="text-xs font-bold text-brand-600 hover:underline">Mark all read</button>
                                </div>
                                <div className="max-h-80 overflow-y-auto">
                                    {mockNotifications.map(n => (
                                        <div key={n.id} className="p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors flex gap-4 cursor-pointer">
                                            <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center ${n.type === 'danger' ? 'bg-rose-100 text-rose-600' : n.type === 'success' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                                                <AlertCircle size={18} />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-bold text-slate-800 leading-snug">{n.text}</p>
                                                <p className="text-xs text-slate-400 font-medium mt-1">{n.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-3 text-center bg-slate-50/50 border-t border-slate-100">
                                    <button className="text-sm font-bold text-slate-500 hover:text-brand-600 transition-colors">See all alerts</button>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* Profile */}
                <div className="flex items-center gap-3 pl-6 border-l border-light-border">
                    <div className="flex flex-col text-right">
                        <span className="text-sm font-bold text-slate-900">{user.name}</span>
                        <span className="text-xs font-medium text-light-muted">Local Session</span>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-bold border border-brand-200 shadow-inner">
                        {getInitials(user.name)}
                    </div>
                </div>

                {/* Logout */}
                <button
                    onClick={handleLogout}
                    className="ml-2 p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Log Out"
                >
                    <LogOut size={20} />
                </button>
            </div>
        </header>
    );
};

export default Topbar;
