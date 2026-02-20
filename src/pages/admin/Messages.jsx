import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Search, Filter, Trash2, Mail, Phone, Calendar, User, MessageSquare } from 'lucide-react';

export default function Messages() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchMessages();
    }, []);

    async function fetchMessages() {
        setLoading(true);
        const { data, error } = await supabase
            .from('contacts')
            .select('*')
            .order('created_at', { ascending: false });

        if (!error) {
            setMessages(data || []);
        }
        setLoading(false);
    }

    async function handleDelete(id) {
        if (!window.confirm('Are you sure you want to delete this message?')) return;

        const { error } = await supabase
            .from('contacts')
            .delete()
            .eq('id', id);

        if (!error) {
            setMessages(messages.filter(msg => msg.id !== id));
        } else {
            alert("Error deleting message: " + error.message);
        }
    }

    const filteredMessages = messages.filter(msg =>
        msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.service.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex-1 flex flex-col bg-transparent text-slate-100 p-8 md:p-12 h-full overflow-hidden relative">

            <div className="max-w-7xl mx-auto w-full flex flex-col h-full relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-4 tracking-wider uppercase">
                            <MessageSquare size={12} />
                            <span>Inbound Communications</span>
                        </div>
                        <h1 className="text-4xl font-bold text-white mb-2 tracking-tight drop-shadow-md">Messages</h1>
                        <p className="text-sm text-slate-400">Manage client inquiries from the website contact forms.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative group">
                            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-cyan-400 transition-colors" />
                            <input
                                type="text"
                                placeholder="Search messages..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="bg-[#0b0e14]/50 backdrop-blur-md border border-white/10 pl-11 pr-4 py-2.5 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 w-72 transition-all shadow-inner placeholder:text-slate-500"
                            />
                        </div>
                        <button className="flex items-center gap-2 bg-[#131825]/80 backdrop-blur-md border border-white/5 hover:border-white/10 hover:bg-white/5 px-5 py-2.5 rounded-xl text-sm font-medium text-slate-300 transition-all shadow-sm">
                            <Filter size={16} />
                            Filter All
                        </button>
                    </div>
                </div>

                {/* Table Container */}
                <div className="bg-[#131825]/60 backdrop-blur-xl border border-white/5 rounded-3xl flex-1 flex flex-col overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.12)] relative">
                    {/* Subtle Top Gradient Line */}
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>

                    <div className="overflow-x-auto flex-1 custom-scrollbar">
                        <table className="w-full text-left text-sm whitespace-nowrap">
                            <thead className="bg-white/[0.02] text-slate-400 text-xs font-semibold uppercase tracking-widest border-b border-white/5 sticky top-0 z-10 backdrop-blur-md">
                                <tr>
                                    <th className="px-8 py-5">Client Identity</th>
                                    <th className="px-8 py-5">Contact Details</th>
                                    <th className="px-8 py-5">Service Requisition</th>
                                    <th className="px-8 py-5">Transmission Date</th>
                                    <th className="px-8 py-5 text-right w-24">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 overflow-y-auto w-full relative">
                                {loading && (
                                    <tr>
                                        <td colSpan="5" className="px-8 py-20 text-center relative">
                                            <div className="absolute inset-0 bg-[#131825]/50 backdrop-blur-sm flex flex-col items-center justify-center z-20">
                                                <div className="w-10 h-10 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin mb-4 shadow-[0_0_15px_rgba(34,211,238,0.4)]"></div>
                                                <p className="text-slate-400 font-medium">Decrypting messages...</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                                {!loading && filteredMessages.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="px-8 py-20 text-center text-slate-500">
                                            <div className="flex flex-col items-center justify-center">
                                                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 border border-white/10">
                                                    <Search size={28} className="text-slate-400" />
                                                </div>
                                                <p>No communications found in the active matrix.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                                {!loading && filteredMessages.length > 0 && (
                                    filteredMessages.map((msg) => (
                                        <tr key={msg.id} className="hover:bg-white/[0.03] transition-colors group relative">
                                            <td className="px-8 py-5">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-lg shadow-[0_0_15px_rgba(34,211,238,0.15)] group-hover:scale-110 transition-transform">
                                                        {msg.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-slate-200 text-[15px]">{msg.name}</div>
                                                        <div className="text-xs text-slate-500 mt-1 truncate max-w-[240px] tracking-wide">{msg.message}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5">
                                                <div className="flex flex-col gap-2 justify-center">
                                                    <a href={`mailto:${msg.email}`} className="flex items-center gap-2.5 text-slate-400 hover:text-cyan-400 text-[13px] font-medium transition-colors">
                                                        <Mail size={14} className="opacity-70" /> {msg.email}
                                                    </a>
                                                    <a href={`tel:${msg.phone}`} className="flex items-center gap-2.5 text-slate-400 hover:text-cyan-400 text-[13px] font-medium transition-colors">
                                                        <Phone size={14} className="opacity-70" /> {msg.phone}
                                                    </a>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5">
                                                <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-500/10 border border-blue-500/20 text-blue-400 tracking-wide shadow-sm">
                                                    {msg.service.replace('-', ' ')}
                                                </span>
                                            </td>
                                            <td className="px-8 py-5">
                                                <div className="flex items-center gap-2.5 text-slate-400 font-medium text-[13px]">
                                                    <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                                                        <Calendar size={13} className="text-slate-300" />
                                                    </div>
                                                    {new Date(msg.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                </div>
                                            </td>
                                            <td className="px-8 py-5 text-right w-24">
                                                <button
                                                    onClick={() => handleDelete(msg.id)}
                                                    className="p-2.5 rounded-xl text-slate-500 hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/20 border border-transparent transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0"
                                                    title="Purge record"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
