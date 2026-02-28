import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Trash2, Video, X, Loader2, FolderPlus } from 'lucide-react';

function extractVideoId(url) {
    if (!url) return null;

    // Check for YouTube
    const ytRegExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
    const ytMatch = url.match(ytRegExp);
    if (ytMatch && ytMatch[2].length === 11) {
        return ytMatch[2];
    }

    // Check for Google Drive URL variations
    const driveRegExp = /\/file\/d\/([a-zA-Z0-9_-]+)/;
    const driveMatch = url.match(driveRegExp);
    if (driveMatch && driveMatch[1]) {
        return driveMatch[1];
    }

    // Also check for Drive folder/open URLs with id=
    const driveIdMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (driveIdMatch && driveIdMatch[1]) {
        return driveIdMatch[1];
    }

    return null;
}

function getThumbnailUrl(id) {
    if (!id) return null;
    if (id.length === 11) {
        return `https://img.youtube.com/vi/${id}/mqdefault.jpg`;
    }
    // Return null for Drive to render a placeholder instead of breaking
    return null;
}

export default function VideosManager() {
    const [videos, setVideos] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('');
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState({ title: '', youtube_url: '' });
    const [showForm, setShowForm] = useState(false);
    const [previewId, setPreviewId] = useState(null);
    const [modalConfig, setModalConfig] = useState(null);

    // New Category Form State
    const [newCatName, setNewCatName] = useState('');
    const [isAddingCat, setIsAddingCat] = useState(false);
    const [savingCat, setSavingCat] = useState(false);

    // Edit Category State
    const [editingCatId, setEditingCatId] = useState(null);
    const [editingCatName, setEditingCatName] = useState('');
    const [savingEditCat, setSavingEditCat] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        setLoading(true);
        // Fetch Categories
        const { data: catData } = await supabase
            .from('video_categories')
            .select('*')
            .order('sort_order', { ascending: true });

        const formattedCats = catData || [];
        setCategories(formattedCats);
        if (formattedCats.length > 0 && !activeTab) {
            setActiveTab(formattedCats[0].name);
        }

        // Fetch Videos
        const { data: videoData } = await supabase
            .from('demo_videos')
            .select('*')
            .order('sort_order', { ascending: true });

        setVideos(videoData || []);
        setLoading(false);
    }

    async function handleAdd(e) {
        e.preventDefault();
        if (!form.title.trim() || !form.youtube_url.trim()) {
            setModalConfig({
                isOpen: true,
                type: 'error',
                title: 'Missing Fields',
                message: 'Please fill in all fields.'
            });
            return;
        }
        const youtube_id = extractVideoId(form.youtube_url);
        if (!youtube_id) {
            setModalConfig({
                isOpen: true,
                type: 'error',
                title: 'Invalid URL',
                message: 'Invalid URL. Please paste a valid YouTube or Google Drive link.'
            });
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
        if (error) {
            setModalConfig({
                isOpen: true,
                type: 'error',
                title: 'Error Adding Video',
                message: error.message
            });
        }
        else {
            setForm({ title: '', youtube_url: '' });
            setShowForm(false);
            fetchData();
        }
        setSaving(false);
    }

    // --- Category Management ---
    async function handleAddCat(e) {
        e.preventDefault();
        const trimmed = newCatName.trim();
        if (!trimmed) return;
        setSavingCat(true);

        const { error } = await supabase.from('video_categories').insert([{
            name: trimmed,
            sort_order: categories.length
        }]);

        if (error) {
            setModalConfig({
                isOpen: true,
                type: 'error',
                title: 'Error Adding Category',
                message: error.message
            });
        } else {
            setNewCatName('');
            setIsAddingCat(false);
            setActiveTab(trimmed);
            fetchData();
        }
        setSavingCat(false);
    }

    async function handleEditCat(e, id, oldName) {
        e.preventDefault();
        const trimmed = editingCatName.trim();
        if (!trimmed || trimmed === oldName) {
            setEditingCatId(null);
            return;
        }
        setSavingEditCat(true);

        try {
            // 1. Update the category table
            const { error: catError } = await supabase
                .from('video_categories')
                .update({ name: trimmed })
                .eq('id', id);

            if (catError) throw catError;

            // 2. Update all associated videos with the new category name
            const { error: videoError } = await supabase
                .from('demo_videos')
                .update({ category: trimmed })
                .eq('category', oldName);

            if (videoError) throw videoError;

            // Update UI perfectly
            setEditingCatId(null);
            if (activeTab === oldName) {
                setActiveTab(trimmed);
            }
            fetchData();
        } catch (error) {
            setModalConfig({
                isOpen: true,
                type: 'error',
                title: 'Error Renaming Category',
                message: error.message
            });
        } finally {
            setSavingEditCat(false);
        }
    }

    const triggerDeleteCatModal = (id, name) => {
        const catVideos = videos.filter(v => v.category === name);
        if (catVideos.length > 0) {
            setModalConfig({
                isOpen: true,
                type: 'error',
                title: 'Cannot Delete Category',
                message: `This category contains ${catVideos.length} video(s). Please delete all videos inside it before deleting the category.`
            });
            return;
        }

        setModalConfig({
            isOpen: true,
            type: 'confirm',
            title: `Delete Category "${name}"?`,
            message: 'Are you sure you want to delete this category?',
            onConfirm: () => confirmDeleteCat(id)
        });
    };

    async function confirmDeleteCat(id) {
        setModalConfig(null);
        const { error } = await supabase.from('video_categories').delete().eq('id', id);
        if (!error) {
            const newCats = categories.filter(c => c.id !== id);
            setCategories(newCats);
            if (activeTab === categories.find(c => c.id === id)?.name) {
                setActiveTab(newCats.length > 0 ? newCats[0].name : '');
            }
        } else {
            setModalConfig({
                isOpen: true,
                type: 'error',
                title: 'Deletion Failed',
                message: error.message
            });
        }
    }

    const triggerDeleteModal = (id) => {
        setModalConfig({
            isOpen: true,
            type: 'confirm',
            title: 'Delete Video',
            message: 'Are you sure you want to remove this video from the website?',
            onConfirm: () => confirmDelete(id)
        });
    };

    async function confirmDelete(id) {
        setModalConfig(null);
        const { error } = await supabase.from('demo_videos').delete().eq('id', id);
        if (!error) setVideos(prev => prev.filter(v => v.id !== id));
        else {
            setModalConfig({
                isOpen: true,
                type: 'error',
                title: 'Deletion Failed',
                message: error.message
            });
        }
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
                                <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">Video URL (Drive / YT)</label>
                                <div className="flex gap-3">
                                    <input
                                        type="url"
                                        value={form.youtube_url}
                                        onChange={e => {
                                            setForm({ ...form, youtube_url: e.target.value });
                                            setPreviewId(extractVideoId(e.target.value));
                                        }}
                                        className="flex-1 bg-[#0c0c0e] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#b052ff]/60 focus:ring-1 focus:ring-[#b052ff]/40 transition-all placeholder:text-slate-600"
                                        placeholder="https://drive.google.com/file/... or YouTube link"
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
                                    <p className="text-xs text-emerald-400 mb-2 font-medium">✓ Valid video URL detected — Preview:</p>
                                    {getThumbnailUrl(previewId) ? (
                                        <img
                                            src={getThumbnailUrl(previewId)}
                                            alt="Thumbnail preview"
                                            className="h-32 rounded-xl border border-white/10 object-cover"
                                        />
                                    ) : (
                                        <div className="h-32 w-56 rounded-xl border border-white/10 overflow-hidden relative bg-[#1b1b25]">
                                            <iframe
                                                src={`https://drive.google.com/file/d/${previewId}/preview`}
                                                className="w-full h-full border-0 pointer-events-none"
                                                title="Drive Preview"
                                            />
                                        </div>
                                    )}
                                </div>
                            )}
                        </form>
                    </div>
                )}

                {/* Category Tabs */}
                <div className="flex gap-2 mb-8 flex-wrap items-center">
                    {categories.map(cat => {
                        const isEditing = editingCatId === cat.id;

                        if (isEditing) {
                            return (
                                <form key={`edit-${cat.id}`} onSubmit={(e) => handleEditCat(e, cat.id, cat.name)} className="flex items-center gap-2 bg-[#2c1d38] border border-[#b052ff]/60 rounded-xl p-1 shadow-[0_0_15px_rgba(176,82,255,0.2)]">
                                    <input
                                        type="text"
                                        autoFocus
                                        value={editingCatName}
                                        onChange={(e) => setEditingCatName(e.target.value)}
                                        className="bg-transparent border-none outline-none text-white text-sm px-3 py-1 w-32 focus:ring-0"
                                    />
                                    <button type="submit" disabled={!editingCatName.trim() || savingEditCat} className="bg-[#b052ff] hover:bg-[#c073ff] text-white p-1.5 rounded-lg disabled:opacity-50 transition-colors">
                                        {savingEditCat ? <Loader2 size={14} className="animate-spin" /> : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                                    </button>
                                    <button type="button" onClick={() => setEditingCatId(null)} className="text-slate-400 hover:text-white p-1 transition-colors">
                                        <X size={16} />
                                    </button>
                                </form>
                            );
                        }

                        return (
                            <div key={cat.id} className="relative group/cat flex items-center">
                                <button
                                    onClick={() => setActiveTab(cat.name)}
                                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeTab === cat.name
                                        ? 'bg-gradient-to-r from-[#2c1d38] to-[#1d1026] text-white border border-[#b052ff]/40 shadow-[0_0_12px_rgba(176,82,255,0.15)] pr-14'
                                        : 'bg-[#16161a] text-slate-400 hover:text-white border border-white/5 hover:border-white/10 pr-4'
                                        }`}
                                >
                                    {cat.name}
                                    <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-md ${activeTab === cat.name ? 'bg-[#b052ff]/20 text-[#d89fff]' : 'bg-white/5 text-slate-500'}`}>
                                        {videos.filter(v => v.category === cat.name).length}
                                    </span>
                                </button>

                                {/* Action Buttons (Show on active tab) */}
                                {activeTab === cat.name && (
                                    <div className="absolute right-1 flex items-center gap-0.5">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setEditingCatId(cat.id);
                                                setEditingCatName(cat.name);
                                            }}
                                            className="text-slate-400 hover:text-[#b052ff] transition-colors p-1"
                                            title="Rename Category"
                                        >
                                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path><path d="m15 5 4 4"></path></svg>
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                triggerDeleteCatModal(cat.id, cat.name);
                                            }}
                                            className="text-red-400/60 hover:text-red-400 transition-colors p-1"
                                            title="Delete Category"
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                )}
                            </div>
                        );
                    })}

                    {/* Add Category Trigger */}
                    {!isAddingCat ? (
                        <button
                            onClick={() => setIsAddingCat(true)}
                            className="px-4 py-2 rounded-xl text-sm font-medium transition-all bg-[#0c0c0e]/50 border border-dashed border-white/20 text-slate-400 hover:text-white hover:border-[#b052ff]/50 flex items-center gap-2"
                        >
                            <FolderPlus size={16} /> Add Category
                        </button>
                    ) : (
                        <form onSubmit={handleAddCat} className="flex items-center gap-2 bg-[#16161a] border border-[#b052ff]/40 rounded-xl p-1 shadow-[0_0_10px_rgba(176,82,255,0.1)]">
                            <input
                                type="text"
                                autoFocus
                                value={newCatName}
                                onChange={(e) => setNewCatName(e.target.value)}
                                placeholder="New Category..."
                                className="bg-transparent border-none outline-none text-white text-sm px-3 py-1 w-32 focus:ring-0 placeholder:text-slate-600"
                            />
                            <button type="submit" disabled={!newCatName.trim() || savingCat} className="bg-[#b052ff] hover:bg-[#c073ff] text-white p-1.5 rounded-lg disabled:opacity-50 transition-colors">
                                {savingCat ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
                            </button>
                            <button type="button" onClick={() => setIsAddingCat(false)} className="text-slate-400 hover:text-white p-1 transition-colors">
                                <X size={16} />
                            </button>
                        </form>
                    )}
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
                                <div className="relative overflow-hidden aspect-video bg-[#0c0c0e] flex items-center justify-center">
                                    {getThumbnailUrl(video.youtube_id) ? (
                                        <img
                                            src={getThumbnailUrl(video.youtube_id)}
                                            alt={video.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <iframe
                                            src={`https://drive.google.com/file/d/${video.youtube_id}/preview`}
                                            className="w-full h-full border-0 pointer-events-none group-hover:scale-105 transition-transform duration-500"
                                            title={video.title}
                                        />
                                    )}
                                    {/* Play Overlay */}
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                            <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5 ml-1"><path d="M8 5v14l11-7z" /></svg>
                                        </div>
                                    </div>
                                    {/* Delete Button */}
                                    <button
                                        onClick={() => triggerDeleteModal(video.id)}
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
                            {modalConfig.type === 'error' ? <Video size={32} className="opacity-50" /> : <Trash2 size={32} />}
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
