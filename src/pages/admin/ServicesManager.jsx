import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';

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
        <div className="flex-1 overflow-y-auto bg-[#0a0a0a] text-gray-100 p-8">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-1">Services Management</h1>
                        <p className="text-sm text-gray-500">Add, edit, or remove services offered on your website.</p>
                    </div>
                    {!isAdding && !editingId && (
                        <button
                            onClick={handleAddNew}
                            className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white px-4 py-2.5 rounded-xl font-medium shadow-lg shadow-orange-500/20 transition-all active:scale-95"
                        >
                            <Plus size={18} strokeWidth={2.5} />
                            Add New Service
                        </button>
                    )}
                </div>

                {/* Edit / Add Form */}
                {(isAdding || editingId) && (
                    <div className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-6 mb-8 shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-orange-500"></div>
                        <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                            {isAdding ? "Create New Service" : "Edit Service"}
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1.5">Service Title</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full bg-[#151515] border border-[#2a2a2a] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-orange-500 transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1.5">Description (Short summary visible on cards)</label>
                                <textarea
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    rows="3"
                                    className="w-full bg-[#151515] border border-[#2a2a2a] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-orange-500 transition-colors resize-y"
                                ></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1.5">Icon SVG Code</label>
                                <textarea
                                    value={formData.icon_svg}
                                    onChange={e => setFormData({ ...formData, icon_svg: e.target.value })}
                                    rows="3"
                                    className="w-full font-mono text-xs bg-[#151515] border border-[#2a2a2a] rounded-lg px-4 py-3 text-gray-400 focus:text-white focus:outline-none focus:border-orange-500 transition-colors resize-y"
                                ></textarea>
                            </div>

                            <div className="flex items-center gap-3 pt-4 border-t border-[#1f1f1f] mt-4">
                                <button
                                    onClick={handleSave}
                                    className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg font-medium transition-colors"
                                >
                                    <Save size={16} /> Save Changes
                                </button>
                                <button
                                    onClick={cancelEdit}
                                    className="flex items-center gap-2 bg-[#222] hover:bg-[#2a2a2a] text-gray-300 px-5 py-2 rounded-lg font-medium transition-colors"
                                >
                                    <X size={16} /> Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Existing Services Grid */}
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {services.map((service) => (
                            <div key={service.id} className="group bg-[#111111] hover:bg-[#151515] border border-[#2a2a2a] hover:border-[#333] rounded-2xl p-6 transition-all duration-300 relative">
                                <div className="flex justify-between items-start mb-4">
                                    <div
                                        className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400/20 to-orange-600/20 text-orange-500 flex items-center justify-center border border-orange-500/30"
                                        dangerouslySetInnerHTML={{ __html: service.icon_svg }}
                                    />
                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => handleEdit(service)} className="p-2 bg-[#222] hover:bg-[#2a2a2a] text-white rounded-lg transition-colors">
                                            <Edit2 size={14} />
                                        </button>
                                        <button onClick={() => handleDelete(service.id)} className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors">
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{service.description}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
