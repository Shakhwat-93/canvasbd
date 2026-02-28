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
        else alert("Settings saved successfully.");
        setSaving(false);
    }

    if (loading) {
        return (
            <div className="flex-1 flex justify-center items-center h-full">
                <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!info) return <div className="p-12 text-red-400 font-medium">Error loading company data. Please initialize database.</div>;

    return (
        <div className="flex-1 w-full min-h-full bg-[#0c0c0e] text-slate-100 p-8 md:p-12 font-sans tracking-normal pb-24">
            <div className="max-w-4xl mx-auto w-full">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl font-semibold text-white tracking-tight">System Configuration</h1>
                        <p className="text-sm text-slate-400 mt-1">Manage global details synchronized across the Canvas Digital platform.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="flex items-center gap-2 bg-white hover:bg-zinc-200 text-black px-4 py-2 rounded-md text-sm font-medium transition-colors disabled:opacity-50"
                        >
                            <Save size={16} />
                            {saving ? 'Saving...' : 'Save changes'}
                        </button>
                    </div>
                </div>

                <div className="h-px w-full bg-white/10 mb-8"></div>

                <form onSubmit={handleSave} className="space-y-12">

                    {/* General Info */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="p-1.5 rounded-md bg-white/5 border border-white/10">
                                <Building2 size={16} className="text-slate-400" />
                            </div>
                            <h2 className="text-sm font-semibold text-white uppercase tracking-wider">Core Information</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#16161a] border border-white/5 rounded-3xl p-8">
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">Legal Entity Name</label>
                                <input type="text" value={info.name} onChange={e => setInfo({ ...info, name: e.target.value })} className="w-full bg-transparent border border-white/10 rounded-md px-3 py-2 text-white text-sm focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all placeholder-slate-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">Primary Domain</label>
                                <input type="url" value={info.website} onChange={e => setInfo({ ...info, website: e.target.value })} className="w-full bg-transparent border border-white/10 rounded-md px-3 py-2 text-white text-sm focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all placeholder-slate-500" />
                            </div>
                            <div className="md:col-span-2">
                                <div className="h-px w-full bg-white/5 my-2"></div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">Global Support Email</label>
                                <input type="email" value={info.email} onChange={e => setInfo({ ...info, email: e.target.value })} className="w-full bg-transparent border border-white/10 rounded-md px-3 py-2 text-white text-sm focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all placeholder-slate-500" />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-2">Support Line 1</label>
                                    <input type="tel" value={info.phone[0]} onChange={e => setInfo({ ...info, phone: [e.target.value, info.phone[1]] })} className="w-full bg-transparent border border-white/10 rounded-md px-3 py-2 text-white text-sm focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all placeholder-slate-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-2">Support Line 2</label>
                                    <input type="tel" value={info.phone[1]} onChange={e => setInfo({ ...info, phone: [info.phone[0], e.target.value] })} className="w-full bg-transparent border border-white/10 rounded-md px-3 py-2 text-white text-sm focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all placeholder-slate-500" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Locations */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="p-1.5 rounded-md bg-white/5 border border-white/10">
                                <MapPin size={16} className="text-slate-400" />
                            </div>
                            <h2 className="text-sm font-semibold text-white uppercase tracking-wider">Registered Facilities</h2>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            {['pallabi', 'uttara', 'factory'].map((locKey) => (
                                <div key={locKey} className="bg-[#16161a] border border-white/5 rounded-3xl p-8">
                                    <div className="mb-4">
                                        <h3 className="text-sm border-b border-white/5 pb-3 font-semibold text-slate-200 uppercase tracking-widest">{locKey}</h3>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="md:col-span-1">
                                            <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wide">Designation</label>
                                            <input
                                                type="text"
                                                value={info.locations[locKey].name}
                                                onChange={e => setInfo({
                                                    ...info,
                                                    locations: { ...info.locations, [locKey]: { ...info.locations[locKey], name: e.target.value } }
                                                })}
                                                className="w-full bg-transparent border border-white/10 rounded-md px-3 py-2 text-white text-sm focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all placeholder-slate-500"
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wide">Geographic Address</label>
                                            <input
                                                type="text"
                                                value={info.locations[locKey].address}
                                                onChange={e => setInfo({
                                                    ...info,
                                                    locations: { ...info.locations, [locKey]: { ...info.locations[locKey], address: e.target.value } }
                                                })}
                                                className="w-full bg-transparent border border-white/10 rounded-md px-3 py-2 text-white text-sm focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all placeholder-slate-500"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </form>
            </div>
        </div>
    );
}
