import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, UserPlus, User } from 'lucide-react';

const Login = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [isAnimating, setIsAnimating] = useState(false);
    const [error, setError] = useState('');

    // Form States
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        try {
            const users = JSON.parse(localStorage.getItem('budgetpro_users') || '[]');

            if (isLogin) {
                // Check credentials
                const user = users.find(u => u.email === email && u.password === password);
                if (user) {
                    localStorage.setItem('budgetpro_user', JSON.stringify(user));
                    navigate('/app');
                } else {
                    setError('Invalid email or password');
                }
            } else {
                // Create account
                if (users.find(u => u.email === email)) {
                    setError('An account with this email already exists');
                    return;
                }
                const newUser = { name, email, password };
                users.push(newUser);
                localStorage.setItem('budgetpro_users', JSON.stringify(users));
                localStorage.setItem('budgetpro_user', JSON.stringify(newUser));
                navigate('/app');
            }
        } catch (err) {
            setError('An error occurred during authentication.');
        }
    };

    const toggleMode = (e) => {
        e.preventDefault();
        if (isAnimating) return;
        setIsAnimating(true);
        setTimeout(() => {
            setIsLogin(!isLogin);
            setIsAnimating(false);
        }, 300); // Wait 300ms for fade out, swap state, then fade in
    };

    return (
        <div className="min-h-screen bg-light-bg flex font-sans text-light-text">
            {/* Left: Login Form */}
            <div className="w-full lg:w-1/2 flex flex-col p-8 sm:p-12 lg:p-24 relative z-10">
                <div className="flex-1 flex items-center justify-center max-w-md mx-auto w-full">
                    <div className="w-full">
                        {/* Logo */}
                        <div
                            className="flex items-center gap-2 mb-12 cursor-pointer transition-transform hover:scale-105 w-max"
                            onClick={() => navigate('/')}
                        >
                            <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center text-white font-bold text-xl shadow-md">
                                ß
                            </div>
                            <span className="text-2xl font-bold tracking-tight text-slate-900">
                                Budget<span className="text-brand-600">Pro</span>
                            </span>
                        </div>

                        {/* Animated Container */}
                        <div className={`transition-all duration-300 transform ${isAnimating ? 'opacity-0 scale-95 translate-y-4' : 'opacity-100 scale-100 translate-y-0'}`}>

                            {/* Dynamic Header */}
                            <div className="mb-10">
                                <h2 className="text-3xl font-extrabold text-slate-900 mb-2">
                                    {isLogin ? 'Welcome back' : 'Create an account'}
                                </h2>
                                <p className="text-light-muted">
                                    {isLogin ? 'Sign in to your account to continue.' : 'Join BudgetPro and take control of your financial destiny.'}
                                </p>
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium animate-pulse">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Name Input - ONLY FOR SIGNUP */}
                                {!isLogin && (
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700 block" htmlFor="name">
                                            Full Name
                                        </label>
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-light-muted group-focus-within:text-brand-500 transition-colors">
                                                <User size={18} />
                                            </div>
                                            <input
                                                id="name"
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                required={!isLogin}
                                                className="w-full bg-light-bg-alt border border-light-border focus:bg-white focus:border-brand-500 rounded-xl py-3.5 pl-11 pr-4 text-slate-900 placeholder-light-muted focus:outline-none focus:ring-4 focus:ring-brand-500/10 transition-all shadow-sm"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Email Input */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700 block" htmlFor="email">
                                        Email
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-light-muted group-focus-within:text-brand-500 transition-colors">
                                            <Mail size={18} />
                                        </div>
                                        <input
                                            id="email"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            className="w-full bg-light-bg-alt border border-light-border focus:bg-white focus:border-brand-500 rounded-xl py-3.5 pl-11 pr-4 text-slate-900 placeholder-light-muted focus:outline-none focus:ring-4 focus:ring-brand-500/10 transition-all shadow-sm"
                                            placeholder="name@company.com"
                                        />
                                    </div>
                                </div>

                                {/* Password Input */}
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <label className="text-sm font-semibold text-slate-700" htmlFor="password">
                                            Password
                                        </label>
                                        {isLogin && (
                                            <a href="#" className="text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors">
                                                Forgot Password?
                                            </a>
                                        )}
                                    </div>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-light-muted group-focus-within:text-brand-500 transition-colors">
                                            <Lock size={18} />
                                        </div>
                                        <input
                                            id="password"
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            className="w-full bg-light-bg-alt border border-light-border focus:bg-white focus:border-brand-500 rounded-xl py-3.5 pl-11 pr-4 text-slate-900 placeholder-light-muted focus:outline-none focus:ring-4 focus:ring-brand-500/10 transition-all shadow-sm"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold text-lg rounded-xl py-4 mt-8 transition-all shadow-lg shadow-brand-500/20 flex items-center justify-center gap-2 active:scale-[0.98]"
                                >
                                    {isLogin ? 'Sign In' : 'Create Account'}
                                    {isLogin ? <LogIn size={20} /> : <UserPlus size={20} />}
                                </button>
                            </form>

                            {/* Dynamic Toggle Footer */}
                            <p className="text-center text-light-muted font-medium text-sm mt-10">
                                {isLogin ? "Don't have an account? " : "Already have an account? "}
                                <button
                                    onClick={toggleMode}
                                    className="font-semibold text-brand-600 hover:text-brand-700 transition-colors underline-offset-4 hover:underline focus:outline-none"
                                >
                                    {isLogin ? 'Sign up for free' : 'Sign in instead'}
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right: Graphic Panel */}
            <div className="hidden lg:flex w-1/2 bg-brand-50 relative overflow-hidden items-center justify-center p-12">
                {/* Soft background mesh gradient */}
                <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-300 via-brand-200 to-transparent"></div>
                <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-brand-300 via-purple-200 to-transparent"></div>

                <div className="relative z-10 max-w-lg bg-white/60 backdrop-blur-xl p-10 rounded-3xl border border-white shadow-xl shadow-brand-500/10 hover:scale-[1.02] transition-transform duration-500">
                    <div className="mb-8">
                        <div className="flex gap-1 mb-4">
                            {[1, 2, 3, 4, 5].map(star => (
                                <svg key={star} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                        <p className="text-2xl font-bold leading-relaxed text-slate-800 tracking-tight">
                            "BudgetPro fundamentally changed how I view my savings. The EMI planner alone saved me thousands on my new car loan. Truly a game changer!"
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-brand-200 flex items-center justify-center text-brand-700 font-bold text-lg shadow-inner border border-brand-300">
                            SJ
                        </div>
                        <div>
                            <p className="font-bold text-slate-900">Sarah Jenkins</p>
                            <p className="text-sm font-medium text-brand-600">Product Designer</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
