import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { ArrowUpRight, MessageSquare, Package, Users, Activity } from 'lucide-react';

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
            color: "from-orange-500 to-orange-600",
            accent: "text-orange-100",
            bg: "bg-orange-500/10"
        },
        {
            title: "Active Services",
            value: stats.services,
            trend: "Available on site",
            icon: Package,
            color: "from-[#222] to-[#1a1a1a]",
            accent: "text-gray-400",
            bg: "bg-[#222]"
        },
        {
            title: "Site Visitors",
            value: "12.4k",
            trend: "+14.5% this month",
            icon: Users,
            color: "from-[#222] to-[#1a1a1a]",
            accent: "text-gray-400",
            bg: "bg-[#222]"
        }
    ];

    if (loading) {
        return <div className="p-8 text-gray-400">Loading overview...</div>;
    }

    return (
        <div className="flex-1 overflow-y-auto bg-[#0a0a0a] text-gray-100 p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-1">Overview</h1>
                        <p className="text-sm text-gray-500">Here is the summary of overall data</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 bg-[#1a1a1a] border border-[#2a2a2a] hover:bg-[#222] px-4 py-2 rounded-lg text-sm text-gray-300 transition-colors">
                            This Month
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                        </button>
                        <button className="flex items-center gap-2 bg-[#1a1a1a] border border-[#2a2a2a] hover:bg-[#222] px-4 py-2 rounded-lg text-sm text-gray-300 transition-colors">
                            <Activity size={16} />
                            Refresh Data
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {statsCards.map((stat, i) => (
                        <div key={i} className={`relative overflow-hidden rounded-2xl border border-[#2a2a2a] bg-gradient-to-br ${stat.color} p-6 shadow-xl`}>
                            <div className="flex justify-between items-start mb-4">
                                <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                                    <stat.icon size={20} className={i === 0 ? "text-white" : "text-gray-300"} />
                                </div>
                                <button className={`opacity-60 hover:opacity-100 transition-opacity ${i === 0 ? "text-white" : "text-gray-400"}`}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /></svg>
                                </button>
                            </div>
                            <div>
                                <h3 className={`text-sm font-medium mb-1 ${i === 0 ? "text-orange-100" : "text-gray-400"}`}>{stat.title}</h3>
                                <div className="flex items-baseline gap-3 mb-4">
                                    <span className="text-3xl font-bold text-white">{stat.value}</span>
                                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${i === 0 ? "bg-white/20 text-white" : "bg-green-500/10 text-green-500"} flex items-center gap-1`}>
                                        <ArrowUpRight size={12} />
                                        {stat.trend.split(' ')[0]}
                                    </span>
                                </div>
                            </div>
                            <div className={`mt-4 pt-4 border-t ${i === 0 ? "border-white/10" : "border-[#333]"} flex justify-between items-center cursor-pointer group`}>
                                <span className={`text-sm font-medium ${stat.accent}`}>See details</span>
                                <ArrowUpRight size={16} className={`${stat.accent} opacity-50 group-hover:opacity-100 transition-opacity translate-x-0 group-hover:translate-x-1`} />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Recent Activity Placeholder for Dashboard Home */}
                <div className="bg-[#111] border border-[#2a2a2a] rounded-2xl p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-semibold text-white">Recent Activities</h2>
                        <button className="text-sm text-gray-400 hover:text-white transition-colors bg-[#1a1a1a] border border-[#2a2a2a] px-3 py-1.5 rounded-lg flex items-center gap-2">
                            Filter
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg>
                        </button>
                    </div>
                    <div className="text-center py-12 border border-dashed border-[#2a2a2a] rounded-xl bg-[#151515]">
                        <MessageSquare size={32} className="mx-auto text-[#444] mb-3" />
                        <p className="text-gray-500 text-sm">Navigate to the Messages tab to view all inquiries.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
