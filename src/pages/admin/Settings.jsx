import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Save, Building2, MapPin, Phone, Mail, Globe } from 'lucide-react';

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

    if (loading) return <div className="p-8 text-gray-400">Loading settings...</div>;
    if (!info) return <div className="p-8 text-red-400">Error loading company data. Please initialize database.</div>;

    return (
        <div className="flex-1 overflow-y-auto bg-[#0a0a0a] text-gray-100 p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-white mb-1">Company Settings</h1>
                    <p className="text-sm text-gray-500">Update the contact information and office locations shown on the website.</p>
                </div>

                <form onSubmit={handleSave} className="space-y-8">

                    {/* General Info */}
                    <div className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-6 shadow-xl">
                        <h2 className="text-lg font-bold text-white border-b border-[#2a2a2a] pb-4 mb-6 flex items-center gap-2">
                            <Building2 size={20} className="text-orange-500" />
                            General Information
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2"><Building2 size={14} /> Company Name</label>
                                <input type="text" value={info.name} onChange={e => setInfo({ ...info, name: e.target.value })} className="w-full bg-[#151515] border border-[#2a2a2a] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-orange-500 transition-colors" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2"><Globe size={14} /> Website URL</label>
                                <input type="url" value={info.website} onChange={e => setInfo({ ...info, website: e.target.value })} className="w-full bg-[#151515] border border-[#2a2a2a] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-orange-500 transition-colors" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2"><Mail size={14} /> Primary Email</label>
                                <input type="email" value={info.email} onChange={e => setInfo({ ...info, email: e.target.value })} className="w-full bg-[#151515] border border-[#2a2a2a] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-orange-500 transition-colors" />
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2"><Phone size={14} /> Phone 1</label>
                                    <input type="tel" value={info.phone[0]} onChange={e => setInfo({ ...info, phone: [e.target.value, info.phone[1]] })} className="w-full bg-[#151515] border border-[#2a2a2a] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-orange-500 transition-colors" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2"><Phone size={14} /> Phone 2</label>
                                    <input type="tel" value={info.phone[1]} onChange={e => setInfo({ ...info, phone: [info.phone[0], e.target.value] })} className="w-full bg-[#151515] border border-[#2a2a2a] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-orange-500 transition-colors" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Locations */}
                    <div className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-6 shadow-xl space-y-6">
                        <h2 className="text-lg font-bold text-white border-b border-[#2a2a2a] pb-4 flex items-center gap-2">
                            <MapPin size={20} className="text-orange-500" />
                            Office Locations
                        </h2>

                        {['pallabi', 'uttara', 'factory'].map((locKey) => (
                            <div key={locKey} className="bg-[#151515] border border-[#2a2a2a] rounded-xl p-5 relative overflow-hidden group">
                                <div className="absolute left-0 top-0 w-1 h-full bg-[#333] group-hover:bg-orange-500 transition-colors"></div>
                                <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider mb-4">{locKey}</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="md:col-span-1">
                                        <label className="block text-xs font-medium text-gray-500 mb-1.5">Location Name</label>
                                        <input
                                            type="text"
                                            value={info.locations[locKey].name}
                                            onChange={e => setInfo({
                                                ...info,
                                                locations: { ...info.locations, [locKey]: { ...info.locations[locKey], name: e.target.value } }
                                            })}
                                            className="w-full bg-[#111111] border border-[#2a2a2a] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-orange-500"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-xs font-medium text-gray-500 mb-1.5">Full Address</label>
                                        <textarea
                                            rows="2"
                                            value={info.locations[locKey].address}
                                            onChange={e => setInfo({
                                                ...info,
                                                locations: { ...info.locations, [locKey]: { ...info.locations[locKey], address: e.target.value } }
                                            })}
                                            className="w-full bg-[#111111] border border-[#2a2a2a] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-orange-500 resize-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Save Action */}
                    <div className="flex justify-end pt-4 border-t border-[#1f1f1f]">
                        <button
                            type="submit"
                            disabled={saving}
                            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-medium shadow-lg shadow-orange-500/20 transition-all disabled:opacity-50"
                        >
                            <Save size={18} />
                            {saving ? 'Saving...' : 'Save All Settings'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
