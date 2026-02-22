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
        <div className="flex-1 flex flex-col bg-[#0c0c0e] text-slate-100 p-8 md:p-12 h-full overflow-hidden font-sans tracking-normal pb-24">

            <div className="max-w-7xl mx-auto w-full flex flex-col h-full">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold text-white tracking-tight">Messages</h1>
                        <p className="text-sm text-slate-400 mt-1">Manage client inquiries from the website contact forms.</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search queries..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="bg-transparent border border-white/10 pl-9 pr-3 py-1.5 rounded-md text-sm text-slate-200 focus:outline-none focus:border-white focus:ring-1 focus:ring-white w-64 transition-all placeholder:text-slate-500"
                            />
                        </div>
                        <button className="flex items-center gap-2 bg-[#0f0f0f] border border-white/10 hover:bg-white/5 px-3 py-1.5 rounded-md text-sm font-medium text-slate-300 transition-colors">
                            <Filter size={14} />
                            Filter
                        </button>
                    </div>
                </div>

                <div className="h-px w-full bg-white/10 mb-8"></div>

                {/* Table Container */}
                <div className="bg-[#16161a] border border-white/5 rounded-3xl flex-1 flex flex-col overflow-hidden p-2">

                    <div className="overflow-x-auto flex-1">
                        <table className="w-full text-left text-sm whitespace-nowrap">
                            <thead className="bg-[#16161a] text-slate-400 text-xs font-semibold uppercase tracking-wider border-b border-white/5 sticky top-0 md:static z-10">
                                <tr>
                                    <th className="px-6 py-4">Client Identity</th>
                                    <th className="px-6 py-4">Contact Details</th>
                                    <th className="px-6 py-4">Service Requisition</th>
                                    <th className="px-6 py-4">Transmission Date</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {loading && (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-20 text-center">
                                            <div className="flex flex-col items-center justify-center">
                                                <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin mb-4"></div>
                                                <p className="text-slate-500 text-sm">Loading messages...</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                                {!loading && filteredMessages.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-20 text-center text-slate-500">
                                            <div className="flex flex-col items-center justify-center">
                                                <Search size={24} className="text-slate-600 mb-3" />
                                                <p className="text-sm">No communications found.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                                {!loading && filteredMessages.length > 0 && (
                                    filteredMessages.map((msg) => (
                                        <tr key={msg.id} className="hover:bg-white/5 transition-colors duration-300 rounded-2xl overflow-hidden group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-white/10 border border-white/10 text-white flex items-center justify-center font-medium text-xs">
                                                        {msg.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-slate-200 text-sm">{msg.name}</div>
                                                        <div className="text-xs text-slate-500 mt-1 truncate max-w-[240px]">{msg.message}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col gap-1.5 justify-center">
                                                    <a href={`mailto:${msg.email}`} className="flex items-center gap-2 text-slate-400 hover:text-white text-xs transition-colors">
                                                        <Mail size={12} className="opacity-70" /> {msg.email}
                                                    </a>
                                                    <a href={`tel:${msg.phone}`} className="flex items-center gap-2 text-slate-400 hover:text-white text-xs transition-colors">
                                                        <Phone size={12} className="opacity-70" /> {msg.phone}
                                                    </a>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-white/10 border border-white/5 text-slate-300">
                                                    {msg.service.replace('-', ' ')}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2 text-slate-400 text-xs">
                                                    {new Date(msg.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    onClick={() => handleDelete(msg.id)}
                                                    className="p-1.5 rounded-md text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors opacity-0 group-hover:opacity-100"
                                                    title="Delete message"
                                                >
                                                    <Trash2 size={16} />
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
