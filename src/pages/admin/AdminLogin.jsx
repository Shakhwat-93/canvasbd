import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../lib/AuthContext';

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { signIn } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const { error } = await signIn({ email, password });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            navigate('/admin');
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex flex-col justify-center items-center p-4 font-sans tracking-normal">
            <div className="w-full max-w-[380px]">
                <div className="flex flex-col items-center text-center mb-8">
                    <img src="/images/br/logo.png" alt="Canvas Logo" className="h-6 object-contain mb-8" />
                    <h1 className="text-xl font-semibold text-white tracking-tight">Log in to Canvas</h1>
                    <p className="text-slate-400 text-sm mt-2">Enter your credentials to access the admin portal.</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-md mb-6 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1.5">Email</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-transparent border border-white/10 rounded-md px-3 py-2 text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all placeholder:text-slate-600 text-sm"
                            placeholder="name@canvasbangladesh.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-transparent border border-white/10 rounded-md px-3 py-2 text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all placeholder:text-slate-600 text-sm"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-white hover:bg-zinc-200 text-black font-medium rounded-md px-4 py-2 mt-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm flex justify-center items-center h-[36px]"
                    >
                        {loading ? (
                            <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                        ) : 'Sign in'}
                    </button>
                </form>
            </div>
        </div>
    );
}
