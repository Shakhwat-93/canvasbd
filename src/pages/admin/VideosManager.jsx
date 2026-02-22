import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Trash2, Video, X, Loader2 } from 'lucide-react';

const CATEGORIES = ['Agency Ads', 'Commercial ADS', 'Fashion', 'Recent Work', 'Social Media Ads'];

function extractYouTubeId(url) {
    if (!url) return null;
    const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

export default function VideosManager() {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState(CATEGORIES[0]);
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState({ title: '', youtube_url: '' });
    const [showForm, setShowForm] = useState(false);
    const [previewId, setPreviewId] = useState(null);

    useEffect(() => {
        fetchVideos();
    }, []);

    async function fetchVideos() {
        setLoading(true);
        const { data } = await supabase
            .from('demo_videos')
            .select('*')
            .order('sort_order', { ascending: true });
        setVideos(data || []);
        setLoading(false);
    }

    async function handleAdd(e) {
        e.preventDefault();
        if (!form.title.trim() || !form.youtube_url.trim()) {
            alert('Please fill in all fields.');
            return;
        }
        const youtube_id = extractYouTubeId(form.youtube_url);
        if (!youtube_id) {
            alert('Invalid YouTube URL. Please paste a valid YouTube link.');
            return;
        }
        setSaving(true);
        const { error } = await supabase.from('demo_videos').insert([{
            title: form.title.trim(),
            category: activeTab,
            youtube_url: form.youtube_url.trim(),
            youtube_id,
            sort_order: videos.filter(v => v.category === activeTab).length
        }]);
        if (error) alert('Error adding video: ' + error.message);
        else {
            setForm({ title: '', youtube_url: '' });
            setShowForm(false);
            fetchVideos();
        }
        setSaving(false);
    }

    async function handleDelete(id) {
        if (!window.confirm('Remove this video from the website?')) return;
        const { error } = await supabase.from('demo_videos').delete().eq('id', id);
        if (!error) setVideos(prev => prev.filter(v => v.id !== id));
        else alert('Error: ' + error.message);
    }

    const categoryVideos = videos.filter(v => v.category === activeTab);

    return (
        <div className="flex-1 w-full min-h-full bg-[#0c0c0e] text-slate-100 p-8 md:p-10 font-sans pb-24">
            <div className="max-w-6xl mx-auto w-full">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-white tracking-tight">Demo Videos</h1>
                        <p className="text-sm text-slate-400 mt-1">Manage demo video showcases displayed on the website.</p>
                    </div>
                    <button
                        onClick={() => { setShowForm(true); setPreviewId(null); }}
                        className="flex items-center gap-2 bg-gradient-to-r from-[#ff5df5] to-[#b052ff] hover:opacity-90 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-[0_0_20px_rgba(176,82,255,0.4)] hover:-translate-y-0.5 transform"
                    >
                        <Plus size={16} strokeWidth={2.5} />
                        Add Video
                    </button>
                </div>

                {/* Add Form */}
                {showForm && (
                    <div className="bg-[#16161a] border border-[#b052ff]/30 rounded-3xl p-8 mb-8">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="font-serif font-bold text-white text-lg flex items-center gap-2">
                                <Video size={18} className="text-[#b052ff]" />
                                Add to "{activeTab}"
                            </h2>
                            <button onClick={() => setShowForm(false)} className="text-slate-500 hover:text-white transition-colors">
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="md:col-span-1">
                                <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">Video Title</label>
                                <input
                                    type="text"
                                    value={form.title}
                                    onChange={e => setForm({ ...form, title: e.target.value })}
                                    className="w-full bg-[#0c0c0e] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#b052ff]/60 focus:ring-1 focus:ring-[#b052ff]/40 transition-all placeholder:text-slate-600"
                                    placeholder="e.g. Brand Promo 2025"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">YouTube URL</label>
                                <div className="flex gap-3">
                                    <input
                                        type="url"
                                        value={form.youtube_url}
                                        onChange={e => {
                                            setForm({ ...form, youtube_url: e.target.value });
                                            setPreviewId(extractYouTubeId(e.target.value));
                                        }}
                                        className="flex-1 bg-[#0c0c0e] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#b052ff]/60 focus:ring-1 focus:ring-[#b052ff]/40 transition-all placeholder:text-slate-600"
                                        placeholder="https://www.youtube.com/watch?v=..."
                                    />
                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="flex items-center gap-2 bg-white hover:bg-zinc-200 text-black px-5 py-3 rounded-xl text-sm font-semibold transition-colors disabled:opacity-50 shrink-0"
                                    >
                                        {saving ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
                                        Add
                                    </button>
                                </div>
                            </div>
                            {previewId && (
                                <div className="md:col-span-3">
                                    <p className="text-xs text-emerald-400 mb-2 font-medium">✓ Valid YouTube URL detected — Preview:</p>
                                    <img
                                        src={`https://img.youtube.com/vi/${previewId}/mqdefault.jpg`}
                                        alt="Thumbnail preview"
                                        className="h-28 rounded-xl border border-white/10 object-cover"
                                    />
                                </div>
                            )}
                        </form>
                    </div>
                )}

                {/* Category Tabs */}
                <div className="flex gap-2 mb-8 flex-wrap">
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveTab(cat)}
                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeTab === cat
                                    ? 'bg-gradient-to-r from-[#2c1d38] to-[#1d1026] text-white border border-[#b052ff]/40 shadow-[0_0_12px_rgba(176,82,255,0.15)]'
                                    : 'bg-[#16161a] text-slate-400 hover:text-white border border-white/5 hover:border-white/10'
                                }`}
                        >
                            {cat}
                            <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-md ${activeTab === cat ? 'bg-[#b052ff]/20 text-[#d89fff]' : 'bg-white/5 text-slate-500'}`}>
                                {videos.filter(v => v.category === cat).length}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Video Grid */}
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="w-8 h-8 border-2 border-[#b052ff]/20 border-t-[#b052ff] rounded-full animate-spin"></div>
                    </div>
                ) : categoryVideos.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 border border-dashed border-white/10 rounded-3xl">
                        <Video size={36} className="text-slate-600 mb-4" />
                        <h3 className="text-slate-300 font-semibold mb-2">No videos in this category</h3>
                        <p className="text-slate-500 text-sm">Click "Add Video" to add the first one.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {categoryVideos.map(video => (
                            <div key={video.id} className="group bg-[#16161a] border border-white/5 rounded-3xl overflow-hidden hover:border-white/10 transition-all hover:-translate-y-1 duration-300">
                                <div className="relative overflow-hidden aspect-video">
                                    <img
                                        src={`https://img.youtube.com/vi/${video.youtube_id}/mqdefault.jpg`}
                                        alt={video.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        loading="lazy"
                                    />
                                    {/* Play Overlay */}
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                            <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5 ml-1"><path d="M8 5v14l11-7z" /></svg>
                                        </div>
                                    </div>
                                    {/* Delete Button */}
                                    <button
                                        onClick={() => handleDelete(video.id)}
                                        className="absolute top-2 right-2 p-2 bg-black/60 backdrop-blur-sm rounded-xl text-slate-300 hover:text-red-400 hover:bg-red-500/20 transition-all opacity-0 group-hover:opacity-100"
                                        title="Remove video"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                                <div className="p-4">
                                    <h3 className="font-semibold text-white text-sm truncate">{video.title}</h3>
                                    <p className="text-xs text-slate-500 mt-1 truncate">{video.youtube_url}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
