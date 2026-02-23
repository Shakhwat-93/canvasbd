import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Search, Filter, Trash2, Mail, Phone, Clock, CheckCircle2, CircleDashed, ChevronDown, Eye, X } from 'lucide-react';

const STATUS_CONFIG = {
    'unread': { label: 'Unread', color: 'bg-white/[0.03] text-red-400 border-white/5', icon: CircleDashed },
    'in-progress': { label: 'In Progress', color: 'bg-white/[0.03] text-amber-400 border-white/5', icon: Clock },
    'completed': { label: 'Resolved', color: 'bg-white/[0.03] text-emerald-400 border-white/5', icon: CheckCircle2 }
};

export default function Messages() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [updatingId, setUpdatingId] = useState(null);
    const [modalConfig, setModalConfig] = useState(null); // { isOpen: false, title: '', message: '', onConfirm: null, type: 'confirm'|'error' }
    const [viewingMsg, setViewingMsg] = useState(null);

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
            // Default any missing status to 'unread'
            const formattedData = data.map(msg => ({
                ...msg,
                status: msg.status || 'unread'
            }));
            setMessages(formattedData || []);
        }
        setLoading(false);
    }

    const triggerDeleteModal = (id) => {
        setModalConfig({
            isOpen: true,
            type: 'confirm',
            title: 'Delete Message',
            message: 'Are you sure you want to permanently delete this message? This action cannot be undone.',
            onConfirm: () => confirmDelete(id)
        });
    };

    async function confirmDelete(id) {
        setModalConfig(null);

        const { error } = await supabase
            .from('contacts')
            .delete()
            .eq('id', id);

        if (!error) {
            setMessages(messages.filter(msg => msg.id !== id));
        } else {
            setModalConfig({
                isOpen: true,
                type: 'error',
                title: 'Deletion Failed',
                message: `Could not delete message: ${error.message}`
            });
        }
    }

    async function handleStatusChange(id, newStatus) {
        setUpdatingId(id);

        // Optimistic UI Update
        const previousMessages = [...messages];
        setMessages(messages.map(msg => msg.id === id ? { ...msg, status: newStatus } : msg));

        const { error } = await supabase
            .from('contacts')
            .update({ status: newStatus })
            .eq('id', id);

        if (error) {
            console.error("Status Update Error:", error);
            // Revert changes if it fails
            setMessages(previousMessages);
            if (error.code === 'PGRST204') {
                setModalConfig({
                    isOpen: true,
                    type: 'error',
                    title: 'Database Setup Required',
                    message: "You need to add a 'status' column to your Supabase 'contacts' table to use this feature.\n\nType: text\nDefault Value: 'unread'"
                });
            } else {
                setModalConfig({
                    isOpen: true,
                    type: 'error',
                    title: 'Update Failed',
                    message: `Could not update status: ${error.message}`
                });
            }
        }
        setUpdatingId(null);
    }

    const filteredMessages = messages.filter(msg =>
        msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.service.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex-1 flex flex-col bg-[#0c0c0e] text-slate-100 p-8 md:p-12 h-full overflow-hidden font-sans tracking-normal pb-24">

            <div className="max-w-7xl mx-auto w-full flex flex-col h-full gap-10">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/5">
                    <div>
                        <h1 className="text-4xl font-serif text-white tracking-tight leading-none mb-3">Client Inquiries</h1>
                        <p className="text-slate-400 text-sm font-light tracking-wide">Manage and respond to website contact requests.</p>
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="relative group w-full">
                            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-white transition-colors" />
                            <input
                                type="text"
                                placeholder="Search by name or email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="bg-transparent border border-white/10 pl-11 pr-4 py-2.5 rounded-full text-sm text-slate-200 focus:outline-none focus:border-white w-full md:w-80 transition-all placeholder:text-slate-600"
                            />
                        </div>
                    </div>
                </div>

                {/* Table Layout */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    <div className="overflow-x-auto flex-1 custom-scrollbar pr-4">
                        <table className="w-full text-left text-sm min-w-[1000px] border-collapse relative">
                            <thead className="text-slate-500 text-[11px] font-semibold uppercase tracking-widest sticky top-0 bg-[#0c0c0e] z-10">
                                <tr>
                                    <th className="px-2 py-4 border-b border-white/5 font-medium">Client Info & Message</th>
                                    <th className="px-6 py-4 border-b border-white/5 font-medium w-64">Contact Details</th>
                                    <th className="px-6 py-4 border-b border-white/5 font-medium w-48">Service Type</th>
                                    <th className="px-6 py-4 border-b border-white/5 font-medium w-40">Status</th>
                                    <th className="px-2 py-4 border-b border-white/5 font-medium text-right w-16"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/[0.03] relative">
                                {loading && (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-32 text-center">
                                            <div className="flex justify-center">
                                                <div className="w-8 h-8 border-2 border-white/10 border-t-white rounded-full animate-spin"></div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                                {!loading && filteredMessages.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-32 text-center">
                                            <p className="text-slate-500 font-light text-lg">No inquiries found.</p>
                                        </td>
                                    </tr>
                                )}
                                {!loading && filteredMessages.length > 0 && (
                                    filteredMessages.map((msg) => (
                                        <tr key={msg.id} className="hover:bg-white/[0.01] transition-colors duration-200 group">

                                            {/* Name & Actions */}
                                            <td className="px-2 py-10 align-top">
                                                <div className="flex flex-col gap-2 max-w-lg">
                                                    <div className="flex items-baseline justify-start gap-4">
                                                        <button onClick={() => setViewingMsg(msg)} className="font-medium text-slate-200 text-base hover:text-[#b052ff] transition-colors text-left group-hover:text-white">
                                                            {msg.name}
                                                        </button>
                                                        <span className="text-xs text-slate-500 tracking-wide font-light hidden sm:inline-block">
                                                            {new Date(msg.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                                        </span>
                                                    </div>
                                                    <button onClick={() => setViewingMsg(msg)} className="text-xs text-[#b052ff] hover:text-[#d89fff] font-medium mt-1 w-fit transition-colors flex items-center gap-1.5 opacity-80 hover:opacity-100">
                                                        <Eye size={14} /> View Inquiry Details
                                                    </button>
                                                </div>
                                            </td>

                                            {/* Contact Details */}
                                            <td className="px-6 py-10 align-top">
                                                <div className="flex flex-col gap-3 mt-1">
                                                    <a href={`mailto:${msg.email}`} className="flex items-center gap-3 text-slate-400 hover:text-white text-sm transition-colors group/link">
                                                        <Mail size={14} className="text-slate-600 group-hover/link:text-white transition-colors" />
                                                        <span className="font-light">{msg.email}</span>
                                                    </a>
                                                    <a href={`tel:${msg.phone}`} className="flex items-center gap-3 text-slate-400 hover:text-white text-sm transition-colors group/link">
                                                        <Phone size={14} className="text-slate-600 group-hover/link:text-white transition-colors" />
                                                        <span className="font-light">{msg.phone}</span>
                                                    </a>
                                                </div>
                                            </td>

                                            {/* Service Type */}
                                            <td className="px-6 py-10 align-top">
                                                <span className="inline-flex items-center text-sm font-light text-slate-300 mt-1">
                                                    {msg.service.replace('-', ' ')}
                                                </span>
                                            </td>

                                            {/* Live Status */}
                                            <td className="px-6 py-10 align-top">
                                                <div className="relative inline-block w-36 mt-1">
                                                    <select
                                                        value={msg.status}
                                                        onChange={(e) => handleStatusChange(msg.id, e.target.value)}
                                                        disabled={updatingId === msg.id}
                                                        className={`appearance-none w-full border text-xs font-medium leading-tight pl-9 pr-6 py-2 rounded-full cursor-pointer transition-all outline-none disabled:opacity-50 ${STATUS_CONFIG[msg.status]?.color || STATUS_CONFIG['unread'].color}`}
                                                    >
                                                        {Object.entries(STATUS_CONFIG).map(([val, config]) => (
                                                            <option key={val} value={val} className="text-black bg-white">{config.label}</option>
                                                        ))}
                                                    </select>
                                                    <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                                                        {React.createElement(STATUS_CONFIG[msg.status]?.icon || CircleDashed, { size: 14, className: 'opacity-70' })}
                                                    </div>
                                                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-current opacity-50">
                                                        <ChevronDown size={14} />
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Actions */}
                                            <td className="px-2 py-10 align-top text-right">
                                                <button
                                                    onClick={() => triggerDeleteModal(msg.id)}
                                                    className="p-2 text-slate-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 mt-1"
                                                    title="Delete inquiry"
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

            {/* Premium Glassmorphism Modal */}
            {modalConfig?.isOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-[#0c0c0e]/80 backdrop-blur-md"
                        onClick={() => modalConfig.type !== 'error' ? setModalConfig(null) : undefined}
                    ></div>

                    <div
                        className="relative w-full max-w-sm sm:max-w-md bg-[#16161a] border border-white/5 p-8 flex flex-col items-center text-center shadow-[0_0_50px_rgba(0,0,0,0.5)] rounded-3xl transform transition-all"
                        style={{ animation: 'modalSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
                    >
                        {/* Icon */}
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-inner border border-white/5 ${modalConfig.type === 'error' ? 'bg-red-500/10 text-red-500' : 'bg-red-500/10 text-red-500'}`}>
                            {modalConfig.type === 'error' ? <CircleDashed size={32} /> : <Trash2 size={32} />}
                        </div>

                        <h3 className="text-xl font-serif text-white mb-3 tracking-wide">
                            {modalConfig.title}
                        </h3>

                        <p className="text-sm text-slate-400 font-light mb-8 leading-relaxed whitespace-pre-line px-2">
                            {modalConfig.message}
                        </p>

                        <div className="flex w-full gap-3">
                            {modalConfig.type === 'confirm' ? (
                                <>
                                    <button
                                        onClick={() => setModalConfig(null)}
                                        className="flex-1 px-4 py-3 rounded-full border border-white/10 hover:bg-white/5 text-slate-300 font-medium text-sm transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={modalConfig.onConfirm}
                                        className="flex-1 px-4 py-3 rounded-full bg-red-500/90 hover:bg-red-500 text-white font-medium text-sm transition-colors shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:shadow-[0_0_30px_rgba(239,68,68,0.5)] border border-red-500/50"
                                    >
                                        Delete
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={() => setModalConfig(null)}
                                    className="w-full px-4 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-sm transition-colors border border-white/5"
                                >
                                    Dismiss
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Inquiry Details Modal */}
            {viewingMsg && (
                <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-[#0c0c0e]/80 backdrop-blur-md"
                        onClick={() => setViewingMsg(null)}
                    ></div>

                    <div
                        className="relative w-full max-w-2xl bg-[#16161a] border border-white/5 p-8 flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.5)] rounded-3xl transform transition-all"
                        style={{ animation: 'modalSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
                    >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-6 border-b border-white/5 gap-4 sm:gap-0">
                            <div>
                                <h3 className="text-2xl font-serif text-white tracking-wide mb-1">Inquiry Details</h3>
                                <p className="text-sm font-light text-slate-400">Sent on {new Date(viewingMsg.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                            </div>
                            <button onClick={() => setViewingMsg(null)} className="p-2 text-slate-500 hover:text-white transition-colors bg-white/5 hover:bg-white/10 rounded-full self-start sm:self-auto">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
                            <div>
                                <p className="text-xs uppercase tracking-wider font-semibold text-slate-500 mb-2">Client Name</p>
                                <p className="text-base text-slate-200">{viewingMsg.name}</p>
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-wider font-semibold text-slate-500 mb-2">Service Interest</p>
                                <p className="text-base text-slate-200 capitalize">{viewingMsg.service.replace('-', ' ')}</p>
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-wider font-semibold text-slate-500 mb-2">Email Address</p>
                                <a href={`mailto:${viewingMsg.email}`} className="text-base text-[#b052ff] hover:text-[#d89fff] transition-colors">{viewingMsg.email}</a>
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-wider font-semibold text-slate-500 mb-2">Phone Number</p>
                                <a href={`tel:${viewingMsg.phone}`} className="text-base text-[#b052ff] hover:text-[#d89fff] transition-colors">{viewingMsg.phone}</a>
                            </div>
                        </div>

                        <div className="bg-[#0c0c0e] rounded-2xl p-6 border border-white/5 flex-1 max-h-[40vh] overflow-y-auto custom-scrollbar">
                            <p className="text-xs uppercase tracking-wider font-semibold text-slate-500 mb-3">Message Content</p>
                            <p className="text-slate-300 leading-relaxed font-light whitespace-pre-line text-sm md:text-base">
                                {viewingMsg.message}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes modalSlideUp {
                    from { opacity: 0; transform: translateY(20px) scale(0.95); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
            `}} />
        </div>
    );
}
