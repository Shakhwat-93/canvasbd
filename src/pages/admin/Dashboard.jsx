import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { RefreshCw, Download, MoreHorizontal, DollarSign, Package, ShoppingBag, TrendingUp } from 'lucide-react';

export default function Dashboard() {
    const [stats, setStats] = useState({
        messages: 0,
        services: 0,
        newMessagesThisWeek: 0,
        revenue: 0,
        conversion: 2.4
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            // Get total messages (Inquiries)
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
                newMessagesThisWeek: newMessagesCount || 0,
                revenue: 12450.00,
                conversion: 2.4
            });
            setLoading(false);
        }

        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="flex-1 flex justify-center items-center h-full">
                <div className="w-8 h-8 border-2 border-[#b052ff]/20 border-t-[#b052ff] rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="flex-1 w-full min-h-full bg-[#0c0c0e] text-slate-100 p-8 md:p-10 font-sans">
            <div className="max-w-7xl mx-auto w-full">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-white tracking-tight mb-1 flex items-center gap-3">
                            Hi, Boss! <span className="text-3xl">👋</span>
                        </h1>
                        <p className="text-[14px] text-slate-400 mt-1">Here is the latest intelligence for Canvas BD.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="flex items-center justify-center bg-[#16161a] border border-white/5 hover:border-white/10 w-11 h-11 rounded-xl text-slate-400 hover:text-white transition-all">
                            <RefreshCw size={18} strokeWidth={2} className="opacity-80" />
                        </button>
                        <button className="flex items-center gap-2 bg-gradient-to-r from-[#ff5df5] to-[#b052ff] hover:from-[#ff6df5] hover:to-[#be68ff] text-white px-5 py-3 rounded-xl text-sm font-semibold transition-all shadow-[0_0_20px_rgba(176,82,255,0.4)] shadow-[inset_0_2px_4px_rgba(255,255,255,0.2)] hover:-translate-y-0.5 transform">
                            <Download size={16} strokeWidth={2.5} />
                            Share Report
                        </button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 w-full">
                    {/* Active Gradient Card (Revenue) */}
                    <div className="bg-gradient-to-br from-[#c068ff] to-[#ff5efb] rounded-3xl p-6 relative overflow-hidden shadow-[0_8px_30px_rgba(176,82,255,0.3)] transform transition-transform hover:-translate-y-1 duration-300">
                        {/* Deco glow */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 blur-2xl rounded-full"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-900/30 blur-2xl rounded-full"></div>

                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-6">
                                <div className="p-2 rounded-xl bg-white/[0.15] backdrop-blur-md">
                                    <DollarSign size={20} className="text-white" strokeWidth={2.5} />
                                </div>
                                <button className="text-white/60 hover:text-white">
                                    <MoreHorizontal size={20} />
                                </button>
                            </div>
                            <h3 className="text-white/90 font-medium text-[13px] mb-2">Revenue Overview</h3>
                            <div className="flex items-end gap-3 mb-2">
                                <span className="text-3xl font-bold text-white tracking-tight">${stats.revenue.toLocaleString()}</span>
                                <span className="text-[11px] font-bold bg-[#8add8f]/20 text-[#8add8f] px-2 py-1 rounded-md mb-1">+12.95%</span>
                            </div>
                            <p className="text-white/70 text-[11px]">Compared to last month</p>
                        </div>
                    </div>

                    {/* Dark Card (Inquiries) */}
                    <div className="bg-[#16161a] border border-white/5 rounded-3xl p-6 transform transition-transform hover:-translate-y-1 duration-300">
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-2 rounded-xl bg-orange-500/10 border border-orange-500/20">
                                <ShoppingBag size={20} className="text-orange-400" strokeWidth={2.5} />
                            </div>
                            <button className="text-slate-500 hover:text-white">
                                <MoreHorizontal size={20} />
                            </button>
                        </div>
                        <h3 className="text-slate-400 font-medium text-[13px] mb-2">New Inquiries</h3>
                        <div className="flex items-end gap-3 mb-2">
                            <span className="text-3xl font-bold text-white tracking-tight">{stats.messages}</span>
                            <span className="text-[11px] font-bold bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-md mb-1">+{stats.newMessagesThisWeek}.12%</span>
                        </div>
                        <p className="text-slate-500 text-[11px]">Compared to last month</p>
                    </div>

                    {/* Dark Card (Services) */}
                    <div className="bg-[#16161a] border border-white/5 rounded-3xl p-6 transform transition-transform hover:-translate-y-1 duration-300">
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20">
                                <Package size={20} className="text-blue-400" strokeWidth={2.5} />
                            </div>
                            <button className="text-slate-500 hover:text-white">
                                <MoreHorizontal size={20} />
                            </button>
                        </div>
                        <h3 className="text-slate-400 font-medium text-[13px] mb-2">Active Services</h3>
                        <div className="flex items-end gap-3 mb-2">
                            <span className="text-3xl font-bold text-white tracking-tight">{stats.services}</span>
                            <span className="text-[11px] font-bold bg-rose-500/10 text-rose-400 px-2 py-1 rounded-md mb-1">-5.18%</span>
                        </div>
                        <p className="text-slate-500 text-[11px]">Compared to last month</p>
                    </div>

                    {/* Dark Card (Conversion) */}
                    <div className="bg-[#16161a] border border-white/5 rounded-3xl p-6 transform transition-transform hover:-translate-y-1 duration-300">
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                                <TrendingUp size={20} className="text-emerald-400" strokeWidth={2.5} />
                            </div>
                            <button className="text-slate-500 hover:text-white">
                                <MoreHorizontal size={20} />
                            </button>
                        </div>
                        <h3 className="text-slate-400 font-medium text-[13px] mb-2">Conversion</h3>
                        <div className="flex items-end gap-3 mb-2">
                            <span className="text-3xl font-bold text-white tracking-tight">{stats.conversion}%</span>
                            <span className="text-[11px] font-bold bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-md mb-1">+1.2%</span>
                        </div>
                        <p className="text-slate-500 text-[11px]">Compared to last month</p>
                    </div>
                </div>

                {/* Secondary Grid Area (Charts & Lists) */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 w-full">
                    {/* Main Chart Area */}
                    <div className="xl:col-span-2 bg-[#16161a] border border-white/5 rounded-3xl p-8 relative overflow-hidden">
                        <div className="flex justify-between items-center mb-8 relative z-10">
                            <h2 className="text-lg font-bold font-serif text-white tracking-tight">Revenue Analytics</h2>
                            <div className="flex gap-4 items-center">
                                <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#b052ff]"></div> Revenue
                                </div>
                                <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                                    <div className="w-2.5 h-2.5 rounded-full bg-orange-400"></div> Target
                                </div>
                            </div>
                        </div>

                        <div className="relative h-[300px] w-full flex items-end ml-4 mb-4 z-10">
                            {/* Y Axis */}
                            <div className="absolute left-[-2rem] top-0 h-full flex flex-col justify-between text-[11px] text-slate-500 font-medium">
                                <span>$10000</span>
                                <span>$7500</span>
                                <span>$5000</span>
                                <span>$2500</span>
                                <span>$0</span>
                            </div>

                            {/* X Axis */}
                            <div className="absolute left-0 bottom-[-2rem] w-full flex justify-between text-[11px] text-slate-500 font-medium pl-2 pr-6">
                                <span>Jan</span>
                                <span>Feb</span>
                                <span>Mar</span>
                                <span>Apr</span>
                                <span>May</span>
                                <span>Jun</span>
                                <span>Jul</span>
                            </div>

                            {/* Grid Lines */}
                            <div className="absolute inset-0 flex flex-col justify-between z-0 pointer-events-none">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div key={i} className="w-full h-px bg-white/[0.03] border-dashed border-t border-white/[0.05]"></div>
                                ))}
                            </div>

                            {/* Chart Area */}
                            <div className="relative w-full h-[90%] z-20">
                                {/* Revenue Line (Purple) */}
                                <svg width="100%" height="100%" viewBox="0 0 600 250" preserveAspectRatio="none" className="absolute inset-0 overflow-visible pointer-events-none">
                                    <defs>
                                        <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#b052ff" stopOpacity="0.3" />
                                            <stop offset="100%" stopColor="#b052ff" stopOpacity="0" />
                                        </linearGradient>
                                    </defs>
                                    <path
                                        d="M0,80 C100,100 150,150 200,160 C300,180 350,140 400,160 C500,200 550,120 600,80 L600,250 L0,250 Z"
                                        fill="url(#purpleGradient)"
                                    />
                                    <path
                                        d="M0,80 C100,100 150,150 200,160 C300,180 350,140 400,160 C500,200 550,120 600,80"
                                        fill="none"
                                        stroke="#b052ff"
                                        strokeWidth="4"
                                        strokeLinecap="round"
                                    />
                                </svg>

                                {/* Target Line (Orange) */}
                                <svg width="100%" height="100%" viewBox="0 0 600 250" preserveAspectRatio="none" className="absolute inset-0 overflow-visible pointer-events-none">
                                    <defs>
                                        <linearGradient id="orangeGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#ffb020" stopOpacity="0.2" />
                                            <stop offset="100%" stopColor="#ffb020" stopOpacity="0" />
                                        </linearGradient>
                                    </defs>
                                    <path
                                        d="M0,150 C100,180 150,220 200,20 C300,-150 350,180 400,140 C500,80 550,220 600,160 L600,250 L0,250 Z"
                                        fill="url(#orangeGradient)"
                                    />
                                    <path
                                        d="M0,150 C100,180 150,220 200,20 C300,-150 350,180 400,140 C500,80 550,220 600,160"
                                        fill="none"
                                        stroke="#ffb020"
                                        strokeWidth="3.5"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Regions Side Panel */}
                    <div className="bg-[#16161a] border border-white/5 rounded-3xl p-8 relative overflow-hidden flex flex-col">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-lg font-bold font-serif text-white tracking-tight">Orders by Region</h2>
                            <button className="text-slate-500 hover:text-white">
                                <MoreHorizontal size={20} />
                            </button>
                        </div>

                        <div className="space-y-8 flex-1 w-full relative z-10 pr-2">
                            {/* Region 1 */}
                            <div className="w-full">
                                <div className="flex justify-between text-sm font-medium mb-3">
                                    <span className="text-white">United States</span>
                                    <span className="text-white">85%</span>
                                </div>
                                <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-[#b052ff] to-[#ff5df5] w-[85%] rounded-full shadow-[0_0_10px_rgba(176,82,255,0.4)]"></div>
                                </div>
                            </div>
                            {/* Region 2 */}
                            <div className="w-full">
                                <div className="flex justify-between text-sm font-medium mb-3">
                                    <span className="text-white">United Kingdom</span>
                                    <span className="text-white">70%</span>
                                </div>
                                <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-[#f43f5e] w-[70%] rounded-full shadow-[0_0_10px_rgba(244,63,94,0.4)]"></div>
                                </div>
                            </div>
                            {/* Region 3 */}
                            <div className="w-full">
                                <div className="flex justify-between text-sm font-medium mb-3">
                                    <span className="text-white">Indonesia</span>
                                    <span className="text-white">45%</span>
                                </div>
                                <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-[#ffb020] w-[45%] rounded-full shadow-[0_0_10px_rgba(255,176,32,0.4)]"></div>
                                </div>
                            </div>
                            {/* Region 4 */}
                            <div className="w-full">
                                <div className="flex justify-between text-sm font-medium mb-3">
                                    <span className="text-white">South Korea</span>
                                    <span className="text-white">38%</span>
                                </div>
                                <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-[#10b981] w-[38%] rounded-full shadow-[0_0_10px_rgba(16,185,129,0.4)]"></div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-8 mt-auto border-t border-white/5">
                            <button className="w-full text-center text-sm font-medium text-white hover:text-[#b052ff] transition-colors py-2">
                                View Full Report
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
