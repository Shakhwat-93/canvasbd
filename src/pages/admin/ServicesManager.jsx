import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Edit2, Trash2, Save, X, Package, ArrowUpRight } from 'lucide-react';

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
        <div className="flex-1 w-full min-h-full bg-[#0c0c0e] text-slate-100 p-8 md:p-12 font-sans tracking-normal pb-24">

            <div className="max-w-6xl mx-auto w-full">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl font-semibold text-white tracking-tight">Services Manager</h1>
                        <p className="text-sm text-slate-400 mt-1">Manage, modify, and add offerings to your service catalog.</p>
                    </div>
                    {!isAdding && !editingId && (
                        <button
                            onClick={handleAddNew}
                            className="flex items-center gap-2 bg-white hover:bg-zinc-200 text-black px-4 py-2 rounded-md text-sm font-medium transition-colors"
                        >
                            <Plus size={16} />
                            Add new service
                        </button>
                    )}
                </div>

                <div className="h-px w-full bg-white/10 mb-8"></div>

                {/* Edit / Add Form */}
                {(isAdding || editingId) && (
                    <div className="bg-[#16161a] border border-white/5 rounded-3xl p-8 mb-10">
                        <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                            {isAdding ? <Plus size={18} className="text-slate-400" /> : <Edit2 size={18} className="text-slate-400" />}
                            {isAdding ? "Create new service" : "Edit existing service"}
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-2">Service Title</label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full bg-transparent border border-white/10 rounded-md px-3 py-2 text-white text-sm focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all placeholder:text-slate-500"
                                        placeholder="E.g. Commercial Photography"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-2">Description Summary</label>
                                    <textarea
                                        value={formData.description}
                                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                                        rows="4"
                                        className="w-full bg-transparent border border-white/10 rounded-md px-3 py-2 text-white text-sm focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all resize-y placeholder:text-slate-500"
                                        placeholder="Brief overview visible on the frontend cards..."
                                    ></textarea>
                                </div>
                            </div>

                            <div className="space-y-6 h-full flex flex-col">
                                <div className="flex-1 flex flex-col">
                                    <label className="flex items-center justify-between text-sm font-medium text-slate-400 mb-2">
                                        <span>Vector Icon (SVG)</span>
                                        <a href="https://lucide.dev/icons" target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs hover:text-white transition-colors">
                                            Find icons <ArrowUpRight size={12} />
                                        </a>
                                    </label>
                                    <textarea
                                        value={formData.icon_svg}
                                        onChange={e => setFormData({ ...formData, icon_svg: e.target.value })}
                                        className="w-full flex-1 font-mono text-[12px] leading-relaxed bg-[#0c0c0e] border border-white/5 rounded-2xl px-4 py-3 text-slate-300 focus:text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all resize-y placeholder:text-slate-600"
                                        placeholder="<svg>...</svg>"
                                        style={{ minHeight: '130px' }}
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 pt-6 mt-8 border-t border-white/10">
                            <button
                                onClick={handleSave}
                                className="flex items-center gap-2 bg-white hover:bg-zinc-200 text-black px-4 py-2 rounded-md text-sm font-medium transition-colors"
                            >
                                <Save size={16} /> Save settings
                            </button>
                            <button
                                onClick={cancelEdit}
                                className="flex items-center gap-2 bg-transparent hover:bg-white/5 text-slate-300 px-4 py-2 rounded-md text-sm font-medium border border-transparent hover:border-white/10 transition-all"
                            >
                                <X size={16} /> Cancel
                            </button>
                        </div>
                    </div>
                )}

                {/* Existing Services Grid */}
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map((service) => (
                            <div key={service.id} className="group bg-[#16161a] border border-white/5 rounded-3xl p-8 transition-colors hover:bg-white/[0.03] hover:border-white/10">

                                <div className="flex justify-between items-start mb-6 w-full">
                                    <div
                                        className="w-10 h-10 rounded-md bg-white/5 border border-white/10 text-slate-200 flex items-center justify-center"
                                        dangerouslySetInnerHTML={{ __html: service.icon_svg }}
                                    />
                                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => handleEdit(service)} className="p-1.5 hover:bg-white/10 text-slate-400 hover:text-white rounded-md transition-colors">
                                            <Edit2 size={16} />
                                        </button>
                                        <button onClick={() => handleDelete(service.id)} className="p-1.5 hover:bg-red-500/20 text-slate-400 hover:text-red-400 rounded-md transition-colors">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                                <h3 className="text-base font-semibold text-white mb-2">{service.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">{service.description}</p>
                            </div>
                        ))}

                        {!isAdding && !editingId && (
                            <button
                                onClick={handleAddNew}
                                className="group bg-transparent border border-dashed border-white/10 hover:border-[#b052ff]/40 hover:bg-[#b052ff]/5 rounded-3xl p-8 transition-all flex flex-col items-center justify-center min-h-[220px]"
                            >
                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                                    <Plus size={24} className="text-slate-400 group-hover:text-white transition-colors" />
                                </div>
                                <h3 className="text-sm font-semibold text-slate-300 group-hover:text-white transition-colors mb-1">Add New Service</h3>
                                <p className="text-slate-500 text-xs">Register offering to the catalog</p>
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
