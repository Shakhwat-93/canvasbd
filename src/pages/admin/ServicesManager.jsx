import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Edit2, Trash2, Save, X, Package } from 'lucide-react';

export default function ServicesManager() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({ title: '', description: '', icon_svg: '' });
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        fetchServices();
    }, []);

    async function fetchServices() {
        setLoading(true);
        const { data } = await supabase.from('services').select('*').order('created_at', { ascending: true });
        setServices(data || []);
        setLoading(false);
    }

    function handleEdit(service) {
        setEditingId(service.id);
        setFormData({ title: service.title, description: service.description, icon_svg: service.icon_svg });
        setIsAdding(false);
    }

    function handleAddNew() {
        setIsAdding(true);
        setEditingId(null);
        setFormData({ title: '', description: '', icon_svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/></svg>' });
    }

    function cancelEdit() {
        setEditingId(null);
        setIsAdding(false);
        setFormData({ title: '', description: '', icon_svg: '' });
    }

    async function handleSave() {
        if (!formData.title || !formData.description || !formData.icon_svg) {
            alert("All fields are required.");
            return;
        }

        if (isAdding) {
            const { error } = await supabase.from('services').insert([formData]);
            if (error) alert(error.message);
            else {
                fetchServices();
                cancelEdit();
            }
        } else {
            const { error } = await supabase.from('services').update(formData).eq('id', editingId);
            if (error) alert(error.message);
            else {
                setServices(services.map(s => s.id === editingId ? { ...s, ...formData } : s));
                cancelEdit();
            }
        }
    }

    async function handleDelete(id) {
        if (!window.confirm("Delete this service permanently?")) return;
        const { error } = await supabase.from('services').delete().eq('id', id);
        if (error) alert(error.message);
        else setServices(services.filter(s => s.id !== id));
    }

    return (
        <div className="flex-1 w-full min-h-full bg-transparent text-slate-100 p-8 md:p-12 relative overflow-y-auto custom-scrollbar">

            <div className="max-w-6xl mx-auto relative z-10 w-full">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold mb-4 tracking-wider uppercase">
                            <Package size={12} />
                            <span>Service Catalog</span>
                        </div>
                        <h1 className="text-4xl font-bold text-white mb-2 tracking-tight drop-shadow-md">Services Manager</h1>
                        <p className="text-sm text-slate-400">Add, edit, or remove services offered on your website.</p>
                    </div>
                    {!isAdding && !editingId && (
                        <button
                            onClick={handleAddNew}
                            className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-5 py-2.5 rounded-xl text-sm font-medium shadow-[0_0_20px_rgba(147,51,234,0.3)] transition-all duration-300 transform hover:-translate-y-0.5 border border-white/10"
                        >
                            <Plus size={18} strokeWidth={2.5} />
                            Register Service
                        </button>
                    )}
                </div>

                {/* Edit / Add Form */}
                {(isAdding || editingId) && (
                    <div className="bg-[#131825]/80 backdrop-blur-3xl border border-cyan-500/30 rounded-3xl p-8 mb-10 shadow-[0_0_40px_rgba(34,211,238,0.1)] relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-cyan-400 to-blue-600 shadow-[0_0_15px_rgba(34,211,238,0.5)]"></div>
                        <div className="absolute top-[-50%] right-[-10%] w-[50%] h-[150%] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none transform group-hover:scale-110 transition-transform duration-700"></div>

                        <div className="relative z-10">
                            <h2 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                                    {isAdding ? <Plus size={18} /> : <Edit2 size={18} />}
                                </div>
                                {isAdding ? "Create New Service Configuration" : "Modify Service Configuration"}
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-300 mb-2 tracking-wide uppercase text-xs">Service Title</label>
                                        <input
                                            type="text"
                                            value={formData.title}
                                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                                            className="w-full bg-[#0b0e14]/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all shadow-inner"
                                            placeholder="E.g. Commercial Photography"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-300 mb-2 tracking-wide uppercase text-xs">Description Summary</label>
                                        <textarea
                                            value={formData.description}
                                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                                            rows="4"
                                            className="w-full bg-[#0b0e14]/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all shadow-inner resize-y custom-scrollbar"
                                            placeholder="Brief overview visible on the frontend cards..."
                                        ></textarea>
                                    </div>
                                </div>

                                <div className="space-y-6 h-full flex flex-col">
                                    <div className="flex-1 flex flex-col">
                                        <label className="block text-sm font-semibold text-slate-300 mb-2 tracking-wide uppercase text-xs flex justify-between">
                                            <span>Vector Icon (SVG Code)</span>
                                            <a href="https://lucide.dev/icons" target="_blank" rel="noreferrer" className="text-cyan-400 hover:text-cyan-300 underline font-normal lowercase tracking-normal flex items-center gap-1">Find icons <ArrowUpRight size={10} /></a>
                                        </label>
                                        <textarea
                                            value={formData.icon_svg}
                                            onChange={e => setFormData({ ...formData, icon_svg: e.target.value })}
                                            className="w-full flex-1 font-mono text-[11px] leading-relaxed bg-[#0b0e14]/80 border border-white/10 rounded-xl px-4 py-4 text-cyan-300/80 focus:text-cyan-400 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all shadow-inner resize-y custom-scrollbar"
                                            placeholder="<svg>...</svg>"
                                            style={{ minHeight: '130px' }}
                                        ></textarea>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 pt-8 mt-8 border-t border-white/10">
                                <button
                                    onClick={handleSave}
                                    className="flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-6 py-2.5 rounded-xl text-sm font-semibold shadow-[0_0_20px_rgba(8,145,178,0.4)] transition-all transform hover:-translate-y-0.5 border border-white/10"
                                >
                                    <Save size={16} /> Save Configuration
                                </button>
                                <button
                                    onClick={cancelEdit}
                                    className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-slate-300 px-6 py-2.5 rounded-xl text-sm font-semibold border border-white/5 hover:border-white/10 transition-all"
                                >
                                    <X size={16} /> Discard Changes
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Existing Services Grid */}
                {loading ? (
                    <div className="flex justify-center py-32">
                        <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map((service) => (
                            <div key={service.id} className="group relative overflow-hidden bg-[#131825]/60 backdrop-blur-xl border border-white/5 rounded-3xl p-8 shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-500 hover:-translate-y-1 hover:border-purple-500/30">
                                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none"></div>
                                <div className={`absolute top-0 right-0 w-48 h-48 bg-purple-500/10 blur-3xl rounded-full opacity-60 pointer-events-none transform group-hover:scale-110 transition-transform duration-700`}></div>

                                <div className="relative z-10">
                                    <div className="flex justify-between items-start mb-6">
                                        <div
                                            className="w-14 h-14 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/20 shadow-inner group-hover:scale-110 transition-transform duration-500"
                                            dangerouslySetInnerHTML={{ __html: service.icon_svg }}
                                        />
                                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                                            <button onClick={() => handleEdit(service)} className="p-2.5 bg-white/5 hover:bg-blue-500/20 text-slate-400 hover:text-blue-400 border border-transparent hover:border-blue-500/30 rounded-xl transition-all shadow-sm">
                                                <Edit2 size={16} />
                                            </button>
                                            <button onClick={() => handleDelete(service.id)} className="p-2.5 bg-white/5 hover:bg-red-500/20 text-slate-400 hover:text-red-400 border border-transparent hover:border-red-500/30 rounded-xl transition-all shadow-sm">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-purple-300 transition-colors">{service.title}</h3>
                                    <p className="text-slate-400 text-sm leading-relaxed mb-2 line-clamp-3">{service.description}</p>
                                </div>
                            </div>
                        ))}

                        {!isAdding && !editingId && (
                            <button
                                onClick={handleAddNew}
                                className="group relative overflow-hidden bg-[#131825]/30 backdrop-blur-xl border border-dashed border-white/10 hover:border-purple-500/40 rounded-3xl p-8 shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-500 hover:-translate-y-1 flex flex-col items-center justify-center min-h-[250px]"
                            >
                                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 border border-white/10 group-hover:border-purple-500/30 group-hover:bg-purple-500/10 transition-all duration-300 group-hover:scale-110">
                                    <Plus size={28} className="text-slate-400 group-hover:text-purple-400 transition-colors" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-300 group-hover:text-white mb-1 transition-colors">Register New Service</h3>
                                <p className="text-slate-500 text-sm">Add a new offering to the catalog</p>
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

// Dummy component just to satisfy the compiler since it was used in the JSX up above
function ArrowUpRight(props) {
    return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>;
}
