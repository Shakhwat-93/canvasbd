import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Search, Filter, Trash2, Mail, Phone, Calendar, User } from 'lucide-react';

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
        <div className="flex-1 flex flex-col bg-[#0a0a0a] text-gray-100 p-8 h-full overflow-hidden">
            <div className="max-w-7xl mx-auto w-full flex flex-col h-full">
                {/* Header */}
                <div className="flex sm:flex-row flex-col items-start sm:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-1">Messages</h1>
                        <p className="text-sm text-gray-500">Manage client inquiries from the website form.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search messages..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="bg-[#111111] border border-[#2a2a2a] pl-9 pr-4 py-2 rounded-lg text-sm text-white focus:outline-none focus:border-orange-500 w-64 transition-colors"
                            />
                        </div>
                        <button className="flex items-center gap-2 bg-[#1a1a1a] border border-[#2a2a2a] hover:bg-[#222] px-4 py-2 rounded-lg text-sm text-gray-300 transition-colors">
                            <Filter size={16} />
                            Filter
                        </button>
                    </div>
                </div>

                {/* Table Container */}
                <div className="bg-[#111111] border border-[#2a2a2a] rounded-2xl flex-1 flex flex-col overflow-hidden">
                    <div className="overflow-x-auto flex-1">
                        <table className="w-full text-left text-sm whitespace-nowrap">
                            <thead className="bg-[#151515] text-gray-400 text-xs font-medium uppercase tracking-wider border-b border-[#2a2a2a] sticky top-0 z-10">
                                <tr>
                                    <th className="px-6 py-4">Client Name</th>
                                    <th className="px-6 py-4">Contact Detail</th>
                                    <th className="px-6 py-4">Service Required</th>
                                    <th className="px-6 py-4">Date Received</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#2a2a2a] overflow-y-auto">
                                {loading ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center text-gray-500 bg-[#0f0f0f]">
                                            <div className="animate-spin w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full mx-auto mb-3"></div>
                                            Loading messages...
                                        </td>
                                    </tr>
                                ) : filteredMessages.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center text-gray-500 bg-[#0f0f0f]">
                                            No messages found matching your search.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredMessages.map((msg) => (
                                        <tr key={msg.id} className="hover:bg-[#151515] transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 rounded-full bg-orange-500/10 text-orange-500 flex items-center justify-center font-bold">
                                                        {msg.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-gray-200">{msg.name}</div>
                                                        <div className="text-xs text-gray-500 mt-0.5 truncate max-w-[200px]">{msg.message}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col gap-1.5 justify-center">
                                                    <a href={`mailto:${msg.email}`} className="flex items-center gap-2 text-gray-400 hover:text-white text-xs transition-colors">
                                                        <Mail size={12} /> {msg.email}
                                                    </a>
                                                    <a href={`tel:${msg.phone}`} className="flex items-center gap-2 text-gray-400 hover:text-white text-xs transition-colors">
                                                        <Phone size={12} /> {msg.phone}
                                                    </a>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[#1a1a1a] border border-[#333] text-gray-300">
                                                    {msg.service.replace('-', ' ')}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2 text-gray-400">
                                                    <Calendar size={14} />
                                                    {new Date(msg.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    onClick={() => handleDelete(msg.id)}
                                                    className="p-2 rounded-lg text-gray-500 hover:text-red-500 hover:bg-red-500/10 transition-colors opacity-0 group-hover:opacity-100"
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
