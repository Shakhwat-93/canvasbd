import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { ArrowUpRight, MessageSquare, Package, Users, Activity, Sparkles, TrendingUp } from 'lucide-react';

export default function Dashboard() {
    const [stats, setStats] = useState({
        messages: 0,
        services: 0,
        newMessagesThisWeek: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            // Get total messages
            const { count: messagesCount } = await supabase
                .from('contacts')
                .select('*', { count: 'exact', head: true });

            // Get new messages this week
            const oneWeekAgo = new Date();
            oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
            const { count: newMessagesCount } = await supabase
                .from('contacts')
                .select('*', { count: 'exact', head: true })
                .gte('created_at', oneWeekAgo.toISOString());

            // Get total services
            const { count: servicesCount } = await supabase
                .from('services')
                .select('*', { count: 'exact', head: true });

            setStats({
                messages: messagesCount || 0,
                services: servicesCount || 0,
                newMessagesThisWeek: newMessagesCount || 0
            });
            setLoading(false);
        }

        fetchStats();
    }, []);

    const statsCards = [
        {
            title: "Total Inquiries",
            value: stats.messages,
            trend: `+${stats.newMessagesThisWeek} this week`,
            icon: MessageSquare,
            gradient: "from-cyan-500/20 via-blue-500/10 to-transparent",
            iconBg: "bg-cyan-500/20",
            iconColor: "text-cyan-400",
            trendColor: "text-cyan-400 bg-cyan-500/10",
            borderGlow: "group-hover:border-cyan-500/30"
        },
        {
            title: "Active Services",
            value: stats.services,
            trend: "Available on site",
            icon: Package,
            gradient: "from-purple-500/20 via-pink-500/10 to-transparent",
            iconBg: "bg-purple-500/20",
            iconColor: "text-purple-400",
            trendColor: "text-purple-400 bg-purple-500/10",
            borderGlow: "group-hover:border-purple-500/30"
        },
        {
            title: "Site Visitors",
            value: "12.4k",
            trend: "+14.5% this month",
            icon: Users,
            gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
            iconBg: "bg-emerald-500/20",
            iconColor: "text-emerald-400",
            trendColor: "text-emerald-400 bg-emerald-500/10",
            borderGlow: "group-hover:border-emerald-500/30"
        }
    ];

    if (loading) {
        return <div className="p-10 text-slate-500">Loading overview intelligence...</div>;
    }

    return (
        <div className="flex-1 w-full min-h-full bg-transparent text-slate-100 p-8 md:p-12 relative">

            <div className="max-w-7xl mx-auto relative z-10 w-full">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-4 tracking-wider uppercase">
                            <Sparkles size={12} />
                            <span>System Active</span>
                        </div>
                        <h1 className="text-4xl font-bold text-white mb-2 tracking-tight drop-shadow-md">Dashboard Overview</h1>
                        <p className="text-slate-400 text-sm">Real-time metrics and system intelligence for Canvas BD.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 bg-[#131825]/80 backdrop-blur-md border border-white/5 hover:border-white/10 hover:bg-white/5 px-5 py-2.5 rounded-xl text-sm font-medium text-slate-300 transition-all duration-300 shadow-sm">
                            This Month
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                        </button>
                        <button className="flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 px-5 py-2.5 rounded-xl text-sm font-medium text-white shadow-[0_0_20px_rgba(8,145,178,0.4)] transition-all duration-300 transform hover:-translate-y-0.5 border border-white/10">
                            <Activity size={16} />
                            Refresh Live
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 w-full">
                    {statsCards.map((stat, i) => (
                        <div key={i} className={`group relative overflow-hidden rounded-3xl border border-white/5 bg-[#131825]/60 backdrop-blur-xl p-8 shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-500 hover:-translate-y-1 ${stat.borderGlow}`}>
                            {/* Card Background Gradient Glows */}
                            <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl ${stat.gradient} blur-3xl rounded-full opacity-60 pointer-events-none transform group-hover:scale-110 transition-transform duration-700`}></div>
                            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none"></div>

                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-6">
                                    <div className={`w-14 h-14 rounded-2xl ${stat.iconBg} flex items-center justify-center border border-white/5 shadow-inner`}>
                                        <stat.icon size={24} className={stat.iconColor} />
                                    </div>
                                    <button className="opacity-40 hover:opacity-100 transition-opacity text-slate-400 hover:text-white p-2 bg-white/5 rounded-full backdrop-blur-sm">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /></svg>
                                    </button>
                                </div>
                                <div className="mb-2">
                                    <h3 className="text-slate-400 font-medium text-sm tracking-wide mb-2">{stat.title}</h3>
                                    <div className="flex items-baseline gap-4 mb-5">
                                        <span className="text-5xl font-bold text-white tracking-tight drop-shadow-sm">{stat.value}</span>
                                    </div>
                                    <div className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg ${stat.trendColor} border border-white/5`}>
                                        <TrendingUp size={14} />
                                        {stat.trend}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Secondary Grid Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
                    {/* Activity Feed Placeholder */}
                    <div className="lg:col-span-2 relative overflow-hidden bg-[#131825]/60 backdrop-blur-xl border border-white/5 rounded-3xl p-8 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.01] to-transparent pointer-events-none"></div>
                        <div className="relative z-10 flex justify-between items-center mb-8">
                            <div>
                                <h2 className="text-xl font-bold text-white mb-1">Recent Activities</h2>
                                <p className="text-xs text-slate-400">Latest form submissions and inquiries</p>
                            </div>
                            <button className="text-sm font-medium text-slate-300 hover:text-white transition-colors bg-white/5 border border-white/10 hover:bg-white/10 px-4 py-2 rounded-xl flex items-center gap-2 backdrop-blur-sm">
                                Filter View
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg>
                            </button>
                        </div>

                        <div className="flex flex-col items-center justify-center py-16 px-4 border border-dashed border-white/10 rounded-2xl bg-[#0b0e14]/50">
                            <div className="w-16 h-16 rounded-full bg-cyan-500/10 flex items-center justify-center mb-4 border border-cyan-500/20">
                                <MessageSquare size={28} className="text-cyan-400" />
                            </div>
                            <h3 className="text-slate-200 font-semibold mb-2">No new activities today</h3>
                            <p className="text-slate-500 text-sm text-center max-w-sm">Navigate to the Messages tab on the sidebar to view all historical inquiries.</p>
                        </div>
                    </div>

                    {/* Server Status Placeholder */}
                    <div className="relative overflow-hidden bg-[#131825]/60 backdrop-blur-xl border border-white/5 rounded-3xl p-8 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none"></div>
                        <div className="relative z-10">
                            <h2 className="text-xl font-bold text-white mb-1">System Status</h2>
                            <p className="text-xs text-slate-400 mb-8">Infrastructure Health</p>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-300">Database Connection</span>
                                        <span className="text-emerald-400 font-medium">99.9% Uptime</span>
                                    </div>
                                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-emerald-500 w-full shadow-[0_0_10px_rgba(16,185,129,0.8)]"></div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-300">API Latency</span>
                                        <span className="text-cyan-400 font-medium">42ms</span>
                                    </div>
                                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-cyan-500 w-[15%] shadow-[0_0_10px_rgba(6,182,212,0.8)]"></div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-300">Storage Capacity</span>
                                        <span className="text-blue-400 font-medium">12% Used</span>
                                    </div>
                                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-500 w-[12%] shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
