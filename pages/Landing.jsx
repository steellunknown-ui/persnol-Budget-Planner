import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowRight, BarChart3, ShieldCheck, Zap, Coins, Building2,
    Smartphone, Calculator, BellRing, FileText, CheckCircle2,
    LayoutDashboard, LogOut
} from 'lucide-react';

const Landing = () => {
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('budgetpro_user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error("Failed to parse user", e);
            }
        }

        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const getInitials = (name) => {
        if (!name) return 'U';
        return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    };

    return (
        <div className="min-h-screen bg-light-bg text-light-text font-sans selection:bg-brand-100 selection:text-brand-900 overflow-x-hidden">
            {/* Navigation */}
            <nav className={`fixed w-full z-50 top-0 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md border-b border-light-border shadow-sm' : 'bg-transparent'}`}>
                <div className="w-full max-w-[1920px] xl:px-4 2xl:px-12 mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
                    {/* Logo Area */}
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
                        <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center text-white font-bold text-xl shadow-md shadow-brand-500/20">
                            ß
                        </div>
                        <span className="text-2xl font-bold tracking-tight text-slate-900">
                            Budget<span className="text-brand-600">Pro</span>
                        </span>
                    </div>

                    {/* Center Desktop Links */}
                    <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
                        <a href="#features" className="hover:text-brand-600 transition-colors">Features</a>
                        <a href="#preview" className="hover:text-brand-600 transition-colors">Dashboard</a>
                        <a href="#benefits" className="hover:text-brand-600 transition-colors">EMI Planner</a>
                        <a href="#reports" className="hover:text-brand-600 transition-colors">Reports</a>
                    </div>

                    {/* Right CTA */}
                    <div className="flex items-center gap-3 sm:gap-6">
                        {user ? (
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => navigate('/app')}
                                    className="bg-brand-600 hover:bg-brand-700 text-white px-5 sm:px-7 py-2.5 rounded-full font-semibold transition-all shadow-lg shadow-brand-500/20 flex items-center gap-2 active:scale-95"
                                >
                                    <LayoutDashboard size={18} />
                                    Go to Dashboard
                                </button>
                                <div className="hidden sm:flex h-10 w-10 rounded-full bg-brand-50 border border-brand-200 items-center justify-center text-brand-700 font-bold shadow-sm">
                                    {getInitials(user.name)}
                                </div>
                            </div>
                        ) : (
                            <>
                                <button
                                    onClick={() => navigate('/login')}
                                    className="hidden sm:block text-slate-600 hover:text-brand-700 transition-colors font-medium px-4"
                                >
                                    Log in
                                </button>
                                <button
                                    onClick={() => navigate('/login')}
                                    className="bg-brand-600 hover:bg-brand-700 text-white px-5 sm:px-7 py-2.5 rounded-full font-semibold transition-all shadow-lg shadow-brand-500/20 flex items-center gap-2 active:scale-95"
                                >
                                    Get Started
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            <main className="pt-20">
                {/* Hero Section */}
                <section className="relative pt-24 pb-32 lg:pt-32 lg:pb-40 px-6 lg:px-12 overflow-hidden flex items-center bg-slate-50">
                    <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542273917363-3b1a8f6f5ff4?q=80&w=2670&auto=format&fit=crop')", backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                    {/* Subtle Background Glows */}
                    <div className="absolute top-0 right-0 -z-10 w-[800px] h-[800px] bg-brand-100/80 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/4 pointer-events-none" />
                    <div className="absolute top-1/2 left-0 -z-10 w-[600px] h-[600px] bg-blue-50/80 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

                    <div className="w-full max-w-[1920px] xl:px-4 2xl:px-12 mx-auto w-full grid lg:grid-cols-2 gap-16 lg:gap-24 xl:gap-32 items-center">
                        {/* Left: Copy & CTA */}
                        <div className="max-w-2xl text-center lg:text-left mx-auto lg:mx-0 relative z-10 lg:pr-10">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 border border-brand-100 mb-8 mx-auto lg:mx-0 shadow-sm">
                                <span className="text-sm font-bold text-brand-700 tracking-wide">
                                    Introducing BudgetPro 2.0 ✨
                                </span>
                            </div>

                            <h1 className="text-5xl lg:text-[4.5rem] font-extrabold leading-[1.1] mb-8 tracking-tight text-slate-900">
                                Master your money with <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-indigo-500">precision.</span>
                            </h1>

                            <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0">
                                The professional-grade suite to track spending, visualize your wealth, and calculate complex loan scenarios—all securely stored on your device.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                                <button
                                    onClick={() => navigate(user ? '/app' : '/login')}
                                    className="w-full sm:w-auto px-8 py-4 bg-brand-600 hover:bg-brand-700 text-white rounded-full font-bold text-lg transition-transform shadow-xl shadow-brand-500/20 flex items-center justify-center gap-2 hover:-translate-y-1"
                                >
                                    {user ? 'Go to Dashboard' : 'Get Started'}
                                    <ArrowRight size={20} />
                                </button>
                                <button
                                    onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="w-full sm:w-auto px-8 py-4 bg-white border border-light-border hover:bg-slate-50 text-slate-700 rounded-full font-semibold text-lg transition-all shadow-sm flex justify-center items-center"
                                >
                                    See how it works
                                </button>
                            </div>

                            {/* Trust Indicators */}
                            <div className="mt-12 flex items-center justify-center lg:justify-start gap-6 text-sm font-semibold text-slate-600">
                                <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm"><ShieldCheck size={18} className="text-emerald-500" /> Secure Data</div>
                                <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm"><Zap size={18} className="text-amber-500" /> Lightning Fast</div>
                                <div className="hidden sm:flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm"><CheckCircle2 size={18} className="text-brand-500" /> 100% Private</div>
                            </div>
                        </div>

                        {/* Right: Premium Mockup Graphic */}
                        <div className="relative w-full max-w-lg mx-auto lg:max-w-none perspective-[2000px] lg:-mr-10 xl:-mr-20 z-10 pt-8 lg:pt-0">
                            {/* Colorful background shape to make the dashboard pop */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-brand-100 to-indigo-100 rounded-[3rem] transform rotate-3 scale-105 blur-md opacity-60"></div>

                            {/* Device App Glass Pane */}
                            <div className="relative bg-white/60 backdrop-blur-2xl rounded-[2.5rem] p-3 shadow-[0_20px_50px_rgba(8,_112,_184,_0.1)] border border-white transform lg:-rotate-2 hover:rotate-0 transition-transform duration-700 ease-out z-10 scale-[0.98] sm:scale-100 origin-center">
                                {/* The Dashboard UI Container */}
                                <div className="bg-[#f8fafc] rounded-[1.5rem] border border-slate-200 overflow-hidden flex flex-col relative h-[550px] sm:h-[600px] shadow-sm">

                                    {/* App Header */}
                                    <div className="bg-white p-6 md:p-8 border-b border-light-border flex justify-between items-center z-10 shadow-sm">
                                        <div>
                                            <p className="text-sm font-semibold text-slate-500 mb-1 tracking-wide uppercase">Total Balance</p>
                                            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">₹24,562.00</h2>
                                        </div>
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-brand-500/40 border-2 border-white">
                                            JD
                                        </div>
                                    </div>

                                    {/* App Content */}
                                    <div className="p-6 md:p-8 flex-1 flex flex-col gap-6 overflow-hidden relative">
                                        {/* Subtle background grid pattern */}
                                        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '16px 16px', opacity: 0.3 }} />

                                        {/* Chart Widget */}
                                        <div className="bg-white p-5 md:p-6 rounded-2xl border border-light-border shadow-sm flex-shrink-0 relative z-10 hover:shadow-md transition-shadow">
                                            <div className="flex justify-between items-center mb-6">
                                                <h3 className="font-bold text-slate-800 tracking-tight">Monthly Overview</h3>
                                                <span className="text-brand-700 bg-brand-50 px-3 py-1 rounded-md text-xs font-bold ring-1 ring-brand-100 pointer-events-none">This Month</span>
                                            </div>
                                            {/* Dummy Bar Chart */}
                                            <div className="h-28 flex items-end justify-between gap-3 px-1">
                                                {[40, 70, 45, 90, 60, 100, 30].map((h, i) => (
                                                    <div key={i} className="w-full bg-slate-100 rounded-t-lg relative overflow-hidden group">
                                                        <div className="absolute bottom-0 w-full bg-gradient-to-t from-brand-600 to-brand-400 rounded-t-lg transition-all duration-1000 ease-out" style={{ height: `${h}%` }}></div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Transactions Widget */}
                                        <div className="space-y-4 relative z-10 flex-1">
                                            <h3 className="font-bold text-slate-800 mb-2 px-1 tracking-tight">Recent Transactions</h3>
                                            {[
                                                { icon: Building2, name: 'Rent Payment', amount: '-₹1,200', date: 'Today, 9:00 AM', type: 'expense', color: 'text-rose-600', bg: 'bg-rose-100' },
                                                { icon: Coins, name: 'Salary Deposit', amount: '+₹4,500', date: 'Yesterday, 4:30 PM', type: 'income', color: 'text-emerald-600', bg: 'bg-emerald-100' },
                                                { icon: Smartphone, name: 'Phone Bill', amount: '-₹85', date: 'Aug 14, 2:15 PM', type: 'expense', color: 'text-slate-700', bg: 'bg-slate-100' },
                                            ].map((tx, i) => (
                                                <div key={i} className="bg-white p-4 rounded-[1.25rem] border border-light-border flex items-center justify-between shadow-sm hover:shadow-md transition-shadow group">
                                                    <div className="flex items-center gap-4">
                                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${tx.bg} ${tx.color} group-hover:scale-105 transition-transform`}>
                                                            <tx.icon size={20} />
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-slate-900 leading-tight">{tx.name}</p>
                                                            <p className="text-xs text-slate-500 font-medium mt-0.5">{tx.date}</p>
                                                        </div>
                                                    </div>
                                                    <span className={`font-extrabold text-lg ${tx.color}`}>{tx.amount}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Bottom Fade Gradient overlay */}
                                        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#f8fafc] via-[#f8fafc]/80 to-transparent z-20 pointer-events-none" />
                                    </div>
                                </div>
                            </div>

                            {/* Decorative Floating shapes outside standard device boundaries */}
                            <div className="absolute -top-6 -right-6 lg:-right-12 w-24 h-24 bg-yellow-300 rounded-full blur-3xl opacity-30 animate-pulse mix-blend-multiply"></div>
                            <div className="absolute -bottom-10 -left-6 lg:-left-12 w-48 h-48 bg-brand-400 rounded-full blur-[80px] opacity-30 mix-blend-multiply"></div>
                        </div>
                    </div>
                </section>

                {/* Features Section (3 Cards Grid) */}
                <section id="features" className="py-24 lg:py-32 px-6 lg:px-12 bg-slate-50/70 border-y border-slate-200">
                    <div className="w-full max-w-[1920px] xl:px-4 2xl:px-12 mx-auto w-full">
                        <div className="text-center max-w-3xl mx-auto mb-20 lg:mb-24">
                            <h2 className="text-4xl lg:text-5xl font-extrabold mb-6 tracking-tight text-slate-900">
                                Everything you need, <br className="hidden sm:block" />nothing you don't.
                            </h2>
                            <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                                Built for absolute control. Experience personal finance tracking, complex loan modeling, and complete privacy without the unnecessary clutter.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8 p-1">
                            {[
                                {
                                    icon: BarChart3,
                                    title: 'Insightful Analytics',
                                    desc: 'Auto-generated charts based on your spending habits. See precisely where your money goes every month with zero setup required.'
                                },
                                {
                                    icon: Calculator,
                                    title: 'Smart EMI Planning',
                                    desc: 'Model future loans before you sign the paperwork. Compare structures side-by-side, and calculate exact principal and interest payouts.'
                                },
                                {
                                    icon: ShieldCheck,
                                    title: 'Absolute Privacy',
                                    desc: 'We do not connect to your bank, nor do we store your data on our servers. Your financial data lives entirely and securely on your device.'
                                }
                            ].map((feature, idx) => (
                                <div key={idx} className="bg-white p-10 lg:p-12 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-2xl hover:shadow-brand-500/10 hover:-translate-y-2 hover:border-brand-200 transition-all duration-300 group">
                                    <div className="w-16 h-16 rounded-2xl bg-brand-50 border border-brand-100 mb-8 flex items-center justify-center shadow-inner group-hover:bg-brand-600 transition-colors duration-300">
                                        <feature.icon className="text-brand-600 group-hover:text-white transition-colors duration-300" size={32} />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4 text-slate-900 tracking-tight">{feature.title}</h3>
                                    <p className="text-slate-600 leading-relaxed text-lg">{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Product Preview Section */}
                <section id="preview" className="py-24 lg:py-32 px-6 lg:px-12 overflow-hidden relative bg-white">
                    <div className="absolute inset-0 z-0 opacity-[0.02] mix-blend-multiply" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2670&auto=format&fit=crop')", backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                    <div className="w-full max-w-[1920px] xl:px-4 2xl:px-12 mx-auto w-full relative z-10">
                        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                            {/* Left Image Mock */}
                            <div className="lg:w-1/2 order-2 lg:order-1 relative w-full">
                                <div className="absolute inset-0 bg-brand-200 rounded-full blur-[120px] opacity-40"></div>

                                <div className="relative bg-white border border-slate-200 shadow-[0_20px_50px_rgba(8,_112,_184,_0.1)] rounded-2xl p-2 z-10 overflow-hidden group hover:scale-[1.02] transition-transform duration-700">
                                    <div className="bg-slate-50 border border-slate-200 rounded-xl aspect-[4/3] sm:aspect-video flex items-stretch overflow-hidden relative shadow-inner">
                                        {/* Sidebar Mock */}
                                        <div className="w-1/4 h-full bg-white border-r border-slate-200 hidden sm:flex flex-col p-4 md:p-6 gap-6 relative z-10">
                                            <div className="h-6 w-28 bg-slate-200 rounded animate-pulse"></div>
                                            <div className="space-y-3">
                                                <div className="h-10 w-full bg-brand-50 rounded-lg"></div>
                                                <div className="h-10 w-full bg-slate-100 rounded-lg"></div>
                                                <div className="h-10 w-full bg-slate-100 rounded-lg"></div>
                                                <div className="h-10 w-full bg-slate-100 rounded-lg"></div>
                                            </div>
                                            <div className="mt-auto h-12 w-full bg-slate-100 rounded-lg"></div>
                                        </div>
                                        {/* Main Content Mock */}
                                        <div className="flex-1 p-5 md:p-8 flex flex-col gap-6 relative z-10">
                                            <div className="flex justify-between items-center w-full">
                                                <div className="h-10 w-48 bg-slate-200 rounded animate-pulse"></div>
                                                <div className="flex gap-4">
                                                    <div className="h-10 w-10 rounded-full bg-slate-200 animate-pulse"></div>
                                                    <div className="h-10 w-10 rounded-full bg-brand-100"></div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col sm:flex-row gap-6">
                                                <div className="h-32 flex-1 bg-white border border-slate-200 rounded-2xl shadow-sm p-4 flex flex-col justify-end gap-2">
                                                    <div className="w-10 h-10 rounded-full bg-brand-50 mb-auto"></div>
                                                    <div className="h-4 w-20 bg-slate-200 rounded"></div>
                                                    <div className="h-6 w-32 bg-slate-300 rounded"></div>
                                                </div>
                                                <div className="h-32 flex-1 bg-white border border-slate-200 rounded-2xl shadow-sm p-4 flex flex-col justify-end gap-2 hidden lg:flex">
                                                    <div className="w-10 h-10 rounded-full bg-emerald-50 mb-auto"></div>
                                                    <div className="h-4 w-20 bg-slate-200 rounded"></div>
                                                    <div className="h-6 w-32 bg-slate-300 rounded"></div>
                                                </div>
                                            </div>
                                            <div className="flex-1 bg-white border border-slate-200 rounded-2xl shadow-sm w-full p-6 flex flex-col gap-4">
                                                <div className="h-6 w-40 bg-slate-200 rounded"></div>
                                                <div className="space-y-4 flex-1">
                                                    <div className="h-12 w-full bg-slate-50 rounded-lg border border-slate-100"></div>
                                                    <div className="h-12 w-full bg-slate-50 rounded-lg border border-slate-100"></div>
                                                    <div className="h-12 w-full bg-slate-50 rounded-lg border border-slate-100"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Text */}
                            <div className="lg:w-1/2 order-1 lg:order-2">
                                <h2 className="text-4xl lg:text-5xl font-extrabold mb-8 tracking-tight text-slate-900">
                                    A dashboard that <br />makes sense.
                                </h2>
                                <p className="text-xl text-slate-600 mb-10 leading-relaxed">
                                    Ditch the spreadsheets and complicated ledger apps. BudgetPro offers a clean, visual representation of your money out of the box. Understand your cash flow at a glance and make proactive decisions about your future.
                                </p>
                                <ul className="space-y-5">
                                    {[
                                        'Real-time cashflow visualization',
                                        'Customizable tracking intervals',
                                        'One-click data export',
                                        'No server latency'
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-4 text-lg font-medium text-slate-700 bg-slate-50 px-4 py-3 rounded-xl">
                                            <CheckCircle2 className="text-brand-500" size={24} />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Benefits Section (Grid of 4) */}
                <section id="benefits" className="py-24 lg:py-32 px-6 lg:px-12 bg-slate-900 text-white relative overflow-hidden" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundBlendMode: 'overlay' }}>
                    <div className="w-full max-w-[1920px] xl:px-4 2xl:px-12 mx-auto w-full relative z-10">
                        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 mb-20 lg:mb-24 items-end">
                            <div>
                                <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-6">Designed for <span className="text-brand-400">control.</span></h2>
                                <p className="text-xl text-slate-400 leading-relaxed max-w-lg">Everything we build is focused on giving you an absolute understanding of your financial picture without sacrificing ease of use.</p>
                            </div>
                            <div className="lg:text-right hidden lg:block">
                                <button
                                    onClick={() => navigate('/login')}
                                    className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-full font-bold text-lg transition-all backdrop-blur-sm"
                                >
                                    Start Tracking
                                </button>
                            </div>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                            {[
                                { title: 'Expense Tracking', icon: Zap, desc: 'Log expenses in seconds. Categorize them instantly to keep an honest record.' },
                                { title: 'Budget Alerts', icon: BellRing, desc: 'Set monthly limits across categories and visually see when you are approaching them.' },
                                { title: 'EMI Calculator', icon: Calculator, desc: 'Model future loans. Make informed choices before you ever sign the paperwork.' },
                                { title: 'Monthly Reports', icon: FileText, desc: 'Generate beautiful PDFs to review your performance and track month-to-month growth.' }
                            ].map((bene, i) => (
                                <div key={i} className="bg-slate-800/50 backdrop-blur-md border border-slate-700/50 rounded-3xl p-8 hover:bg-slate-800 transition-colors shadow-lg shadow-black/10 group">
                                    <div className="w-14 h-14 bg-slate-700 rounded-2xl flex items-center justify-center mb-8 shadow-inner border border-slate-600 group-hover:scale-110 group-hover:bg-brand-500 transition-all duration-300">
                                        <bene.icon className="text-brand-400 group-hover:text-white transition-colors" size={28} />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4 tracking-tight">{bene.title}</h3>
                                    <p className="text-slate-400 leading-relaxed">{bene.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* large CTA Section */}
                <section className="py-32 px-6 lg:px-12 relative overflow-hidden bg-brand-600" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1557682250-33bd709cbe85?q=80&w=2629&auto=format&fit=crop')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundBlendMode: 'soft-light' }}>
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
                    <div className="absolute -left-32 -top-32 w-96 h-96 bg-brand-500 rounded-full blur-[100px] opacity-80 pointer-events-none"></div>
                    <div className="absolute -right-32 -bottom-32 w-96 h-96 bg-brand-700 rounded-full blur-[100px] opacity-80 pointer-events-none"></div>

                    <div className="w-full max-w-[1280px] mx-auto w-full text-center relative z-10">
                        <h2 className="text-4xl lg:text-6xl font-extrabold text-white mb-8 tracking-tight leading-tight">
                            Start managing your money <br className="hidden md:block" />smarter today.
                        </h2>
                        <p className="text-xl text-brand-100 mb-12 max-w-2xl mx-auto font-medium">
                            Join thousands of professionals taking control of their financial destiny. No credit card required.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={() => navigate('/login')}
                                className="bg-white text-brand-700 hover:bg-slate-50 px-10 py-5 rounded-full font-bold text-xl transition-all shadow-2xl hover:-translate-y-1"
                            >
                                Create Free Account
                            </button>
                            <button
                                onClick={() => navigate('/login')}
                                className="bg-transparent text-white border-2 border-brand-400 hover:border-white px-10 py-5 rounded-full font-bold text-xl transition-all"
                            >
                                Log in
                            </button>
                        </div>
                    </div>
                </section>

            </main>

            {/* Footer */}
            <footer className="bg-slate-50 py-16 px-6 lg:px-12 border-t border-slate-200">
                <div className="w-full max-w-[1920px] xl:px-4 2xl:px-12 mx-auto w-full flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
                        <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center text-white font-bold text-xl shadow-sm">
                            ß
                        </div>
                        <span className="text-2xl font-bold tracking-tight text-slate-900">
                            Budget<span className="text-brand-600">Pro</span>
                        </span>
                    </div>

                    <div className="flex flex-wrap justify-center gap-8 text-sm font-semibold text-slate-500">
                        <a href="#" className="hover:text-brand-600 transition-colors">Features</a>
                        <a href="#" className="hover:text-brand-600 transition-colors">Pricing</a>
                        <a href="#" className="hover:text-brand-600 transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-brand-600 transition-colors">Terms of Service</a>
                    </div>

                    <p className="text-slate-400 text-sm font-medium">© 2026 BudgetPro Inc. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
