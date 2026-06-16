import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, LayoutDashboard, WalletCards, Calculator, LogOut, Target, PieChart, Settings } from 'lucide-react';

const Sidebar = () => {
    const [isHovered, setIsHovered] = useState(false);

    const navItems = [
        { name: 'Home', path: '/', icon: Home, isHome: true },
        { name: 'Dashboard', path: '/app', icon: LayoutDashboard },
        { name: 'Tracker', path: '/app/tracker', icon: WalletCards },
        { name: 'Budget Planner', path: '/app/budget-planner', icon: Target },
        { name: 'EMI Planner', path: '/app/emi-planner', icon: Calculator },
        { name: 'Reports', path: '/app/reports', icon: PieChart },
        { name: 'Settings', path: '/app/settings', icon: Settings },
    ];

    return (
        <aside
            className={`fixed left-0 top-0 h-screen bg-white border-r border-light-border flex flex-col z-20 transition-all duration-300 ease-in-out ${isHovered ? 'w-64' : 'w-20'}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Brand Logo */}
            <div className={`flex items-center gap-2 py-8 border-b border-light-border transition-all duration-300 ${isHovered ? 'px-6 justify-start' : 'px-0 justify-center'}`}>
                <div className="w-10 h-10 min-w-10 rounded-xl bg-brand-600 flex items-center justify-center text-white font-bold text-xl shadow-md">
                    ß
                </div>
                {isHovered && (
                    <span className="text-xl font-bold tracking-tight text-slate-900 animate-in fade-in duration-300 whitespace-nowrap">
                        Budget<span className="text-brand-600">Pro</span>
                    </span>
                )}
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 py-8 px-3 flex flex-col gap-2 overflow-x-hidden">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            end={item.path === '/app'}
                            className={({ isActive }) =>
                                `flex items-center gap-3 py-3 rounded-xl transition-all duration-200 font-bold ${isHovered ? 'px-4' : 'px-0 justify-center'} ${item.isHome
                                    ? 'bg-slate-900 text-white hover:bg-slate-800 my-4 shadow-lg shadow-slate-900/10'
                                    : isActive && !item.isExternal
                                        ? 'bg-brand-50 text-brand-700'
                                        : 'text-light-muted hover:bg-light-bg-alt hover:text-slate-900'
                                } group`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <div className="min-w-[20px] flex justify-center">
                                        <Icon size={20} className={item.isHome ? 'text-white' : isActive && !item.isExternal ? 'text-brand-600' : 'text-slate-400 group-hover:text-slate-600 transition-colors'} />
                                    </div>
                                    {isHovered && (
                                        <span className="whitespace-nowrap animate-in fade-in duration-300">{item.name}</span>
                                    )}
                                </>
                            )}
                        </NavLink>
                    );
                })}
            </nav>

            {/* Bottom Section */}
            <div className="p-3 border-t border-light-border">
                <button
                    onClick={() => {
                        localStorage.removeItem('budgetpro_user');
                        window.location.href = '/login';
                    }}
                    className={`flex items-center gap-3 py-3 w-full text-light-muted hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors font-medium ${isHovered ? 'px-4 justify-start' : 'px-0 justify-center'}`}
                >
                    <div className="min-w-[20px] flex justify-center">
                        <LogOut size={20} />
                    </div>
                    {isHovered && (
                        <span className="whitespace-nowrap animate-in fade-in duration-300">Exit App</span>
                    )}
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
