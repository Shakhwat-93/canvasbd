import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Save, Building2, MapPin, Phone, Mail, Globe, Settings as SettingsIcon } from 'lucide-react';

export default function Settings() {
    const [info, setInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchCompanyInfo();
    }, []);

    async function fetchCompanyInfo() {
        setLoading(true);
        const { data } = await supabase.from('company_info').select('*').single();
        if (data) setInfo(data);
        setLoading(false);
    }

    async function handleSave(e) {
        e.preventDefault();
        setSaving(true);
        const { error } = await supabase
            .from('company_info')
            .update({
                name: info.name,
                email: info.email,
                website: info.website,
                phone: info.phone,
                locations: info.locations
            })
            .eq('id', info.id);

        if (error) alert("Error saving settings: " + error.message);
        else alert("Settings saved successfully! Changes will reflect on the website immediately.");
        setSaving(false);
    }

    if (loading) {
        return (
            <div className="flex-1 flex justify-center items-center py-32 h-full">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin shadow-[0_0_15px_rgba(34,211,238,0.4)]"></div>
                    <p className="text-slate-400 font-medium">Retrieving system configurations...</p>
                </div>
            </div>
        );
    }

    if (!info) return <div className="p-12 text-red-400 font-medium">Error loading company data. Please initialize database with seed data.</div>;

    return (
        <div className="flex-1 w-full min-h-full bg-transparent text-slate-100 p-8 md:p-12 relative overflow-y-auto custom-scrollbar">

            <div className="max-w-5xl mx-auto relative z-10 w-full">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-4 tracking-wider uppercase">
                            <SettingsIcon size={12} />
                            <span>System Configuration</span>
                        </div>
                        <h1 className="text-4xl font-bold text-white mb-2 tracking-tight drop-shadow-md">Company Settings</h1>
                        <p className="text-sm text-slate-400 max-w-xl">Updates made here instantly synchronize globally across the Canvas BD frontend application.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-6 py-3 rounded-xl text-sm font-semibold shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all transform hover:-translate-y-0.5 border border-white/10 disabled:opacity-50 disabled:hover:translate-y-0"
                        >
                            <Save size={16} />
                            {saving ? 'Syncing...' : 'Save Configuration'}
                        </button>
                    </div>
                </div>

                <form onSubmit={handleSave} className="space-y-8">

                    {/* General Info */}
                    <div className="bg-[#131825]/60 backdrop-blur-xl border border-white/5 rounded-3xl p-8 shadow-[0_8px_30px_rgba(0,0,0,0.12)] relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-cyan-400 to-blue-600 shadow-[0_0_15px_rgba(34,211,238,0.5)]"></div>
                        <div className="absolute top-[-20%] right-[-10%] w-[40%] h-[120%] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none transform group-hover:scale-110 transition-transform duration-700"></div>

                        <div className="relative z-10">
                            <h2 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
                                <div className="p-2.5 rounded-xl bg-blue-500/10 text-cyan-400 border border-blue-500/20 shadow-inner">
                                    <Building2 size={20} />
                                </div>
                                Core Information
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-2 tracking-wide uppercase flex items-center gap-2"><Building2 size={12} className="text-cyan-500/70" /> Legal Entity Name</label>
                                    <input type="text" value={info.name} onChange={e => setInfo({ ...info, name: e.target.value })} className="w-full bg-[#0b0e14]/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all shadow-inner" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-2 tracking-wide uppercase flex items-center gap-2"><Globe size={12} className="text-cyan-500/70" /> Primary Domain</label>
                                    <input type="url" value={info.website} onChange={e => setInfo({ ...info, website: e.target.value })} className="w-full bg-[#0b0e14]/50 border border-white/10 rounded-xl px-4 py-3 text-cyan-300 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all shadow-inner" />
                                </div>
                                <div className="md:col-span-2">
                                    <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent my-2"></div>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-2 tracking-wide uppercase flex items-center gap-2"><Mail size={12} className="text-cyan-500/70" /> Global Support Email</label>
                                    <input type="email" value={info.email} onChange={e => setInfo({ ...info, email: e.target.value })} className="w-full bg-[#0b0e14]/50 border border-white/10 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all shadow-inner" />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-300 mb-2 tracking-wide uppercase flex items-center gap-2"><Phone size={12} className="text-cyan-500/70" /> Support Line 1</label>
                                        <input type="tel" value={info.phone[0]} onChange={e => setInfo({ ...info, phone: [e.target.value, info.phone[1]] })} className="w-full bg-[#0b0e14]/50 border border-white/10 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all shadow-inner" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-300 mb-2 tracking-wide uppercase flex items-center gap-2"><Phone size={12} className="text-cyan-500/70" /> Support Line 2</label>
                                        <input type="tel" value={info.phone[1]} onChange={e => setInfo({ ...info, phone: [info.phone[0], e.target.value] })} className="w-full bg-[#0b0e14]/50 border border-white/10 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all shadow-inner" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Locations */}
                    <div className="bg-[#131825]/60 backdrop-blur-xl border border-white/5 rounded-3xl p-8 shadow-[0_8px_30px_rgba(0,0,0,0.12)] space-y-8 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-1.5 h-full bg-gradient-to-b from-emerald-400 to-teal-600 shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
                        <div className="absolute top-[-20%] left-[-10%] w-[40%] h-[120%] bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none transform group-hover:scale-110 transition-transform duration-700"></div>

                        <div className="relative z-10">
                            <h2 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
                                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-inner">
                                    <MapPin size={20} />
                                </div>
                                Registered Facilities
                            </h2>

                            <div className="grid grid-cols-1 gap-6">
                                {['pallabi', 'uttara', 'factory'].map((locKey) => (
                                    <div key={locKey} className="bg-[#0b0e14]/40 border border-white/5 hover:border-emerald-500/30 rounded-2xl p-6 relative overflow-hidden transition-all duration-300 group/item">
                                        <div className="absolute left-0 top-0 w-1 h-full bg-white/10 group-hover/item:bg-emerald-500 transition-colors duration-300"></div>

                                        <div className="flex items-center gap-3 mb-5">
                                            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 text-emerald-400">
                                                <MapPin size={14} />
                                            </div>
                                            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-widest">{locKey}</h3>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pl-4 md:pl-0">
                                            <div className="md:col-span-1">
                                                <label className="block text-[11px] font-semibold text-slate-400 mb-2 uppercase tracking-wide">Facility Designation</label>
                                                <input
                                                    type="text"
                                                    value={info.locations[locKey].name}
                                                    onChange={e => setInfo({
                                                        ...info,
                                                        locations: { ...info.locations, [locKey]: { ...info.locations[locKey], name: e.target.value } }
                                                    })}
                                                    className="w-full bg-[#131825]/80 border border-white/5 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 shadow-inner transition-all"
                                                />
                                            </div>
                                            <div className="md:col-span-3">
                                                <label className="block text-[11px] font-semibold text-slate-400 mb-2 uppercase tracking-wide">Geographic Address</label>
                                                <input
                                                    type="text"
                                                    value={info.locations[locKey].address}
                                                    onChange={e => setInfo({
                                                        ...info,
                                                        locations: { ...info.locations, [locKey]: { ...info.locations[locKey], address: e.target.value } }
                                                    })}
                                                    className="w-full bg-[#131825]/80 border border-white/5 rounded-xl px-4 py-3 text-slate-300 text-sm focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 shadow-inner transition-all"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                        <button
                            type="submit"
                            disabled={saving}
                            className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-8 py-3.5 rounded-xl text-sm font-semibold shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all transform hover:-translate-y-0.5 border border-white/10 disabled:opacity-50 disabled:hover:translate-y-0"
                        >
                            <Save size={18} />
                            {saving ? 'Synchronizing Network...' : 'Commit Configuration Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
