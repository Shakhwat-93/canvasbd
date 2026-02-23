import React, { useEffect, useState, useRef } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Trash2, Save, X, Star, Upload, Image as ImageIcon, User } from 'lucide-react';

export default function TestimonialsManager() {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        name: '', designation: '', review_text: '', is_featured: false
    });
    const [profileFile, setProfileFile] = useState(null);
    const [screenshotFile, setScreenshotFile] = useState(null);
    const [profilePreview, setProfilePreview] = useState(null);
    const [screenshotPreview, setScreenshotPreview] = useState(null);
    const [modalConfig, setModalConfig] = useState(null);
    const profileInputRef = useRef(null);
    const screenshotInputRef = useRef(null);

    useEffect(() => {
        fetchTestimonials();
    }, []);

    async function fetchTestimonials() {
        setLoading(true);
        const { data } = await supabase
            .from('testimonials')
            .select('*')
            .order('display_order', { ascending: true });
        setTestimonials(data || []);
        setLoading(false);
    }

    function handleAddNew() {
        setIsAdding(true);
        setFormData({ name: '', designation: '', review_text: '', is_featured: false });
        setProfileFile(null);
        setScreenshotFile(null);
        setProfilePreview(null);
        setScreenshotPreview(null);
    }

    function cancelAdd() {
        setIsAdding(false);
        setFormData({ name: '', designation: '', review_text: '', is_featured: false });
        setProfileFile(null);
        setScreenshotFile(null);
        setProfilePreview(null);
        setScreenshotPreview(null);
    }

    function handleFileSelect(file, type) {
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            if (type === 'profile') {
                setProfileFile(file);
                setProfilePreview(reader.result);
            } else {
                setScreenshotFile(file);
                setScreenshotPreview(reader.result);
            }
        };
        reader.readAsDataURL(file);
    }

    async function uploadFile(file, folder) {
        const ext = file.name.split('.').pop();
        const fileName = `${folder}/${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;
        const { error } = await supabase.storage
            .from('testimonials')
            .upload(fileName, file);
        if (error) throw error;
        const { data } = supabase.storage.from('testimonials').getPublicUrl(fileName);
        return data.publicUrl;
    }

    async function handleSave() {
        if (!formData.name || !formData.designation || !formData.review_text) {
            setModalConfig({
                isOpen: true,
                type: 'error',
                title: 'Missing Files',
                message: 'Name, designation, and review text are required.'
            });
            return;
        }
        setSaving(true);
        try {
            let profileUrl = null;
            let screenshotUrl = null;

            if (profileFile) {
                profileUrl = await uploadFile(profileFile, 'profiles');
            }
            if (screenshotFile) {
                screenshotUrl = await uploadFile(screenshotFile, 'screenshots');
            }

            const insertData = {
                name: formData.name,
                designation: formData.designation,
                review_text: formData.review_text,
                is_featured: formData.is_featured,
                display_order: testimonials.length,
                ...(profileUrl && { profile_image_url: profileUrl }),
                ...(screenshotUrl && { screenshot_url: screenshotUrl })
            };

            const { error } = await supabase.from('testimonials').insert([insertData]);
            if (error) throw error;

            await fetchTestimonials();
            cancelAdd();
        } catch (err) {
            setModalConfig({
                isOpen: true,
                type: 'error',
                title: 'Error Saving',
                message: `Error saving review: ${err.message}`
            });
        }
        setSaving(false);
    }

    const triggerDeleteModal = (testimonial) => {
        setModalConfig({
            isOpen: true,
            type: 'confirm',
            title: 'Delete Review',
            message: `Are you sure you want to permanently delete the review from "${testimonial.name}"?`,
            onConfirm: () => confirmDelete(testimonial)
        });
    };

    async function confirmDelete(testimonial) {
        setModalConfig(null);

        // Delete storage files
        try {
            if (testimonial.profile_image_url) {
                const path = testimonial.profile_image_url.split('/testimonials/')[1];
                if (path) await supabase.storage.from('testimonials').remove([path]);
            }
            if (testimonial.screenshot_url) {
                const path = testimonial.screenshot_url.split('/testimonials/')[1];
                if (path) await supabase.storage.from('testimonials').remove([path]);
            }
        } catch (e) { /* storage cleanup is best-effort */ }

        const { error } = await supabase.from('testimonials').delete().eq('id', testimonial.id);
        if (error) {
            setModalConfig({
                isOpen: true,
                type: 'error',
                title: 'Deletion Failed',
                message: error.message
            });
        } else setTestimonials(testimonials.filter(t => t.id !== testimonial.id));
    }

    async function toggleFeatured(testimonial) {
        const { error } = await supabase
            .from('testimonials')
            .update({ is_featured: !testimonial.is_featured })
            .eq('id', testimonial.id);
        if (!error) {
            setTestimonials(testimonials.map(t =>
                t.id === testimonial.id ? { ...t, is_featured: !t.is_featured } : t
            ));
        }
    }

    return (
        <div className="flex-1 w-full min-h-full bg-[#0c0c0e] text-slate-100 p-8 md:p-12 font-sans tracking-normal pb-24">
            <div className="max-w-6xl mx-auto w-full">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl font-semibold text-white tracking-tight">Reviews Manager</h1>
                        <p className="text-sm text-slate-400 mt-1">
                            Add, manage, and remove client testimonials displayed on the website.
                        </p>
                    </div>
                    {!isAdding && (
                        <button
                            onClick={handleAddNew}
                            className="flex items-center gap-2 bg-white hover:bg-zinc-200 text-black px-4 py-2 rounded-md text-sm font-medium transition-colors"
                        >
                            <Plus size={16} />
                            Add Review
                        </button>
                    )}
                </div>

                <div className="h-px w-full bg-white/10 mb-8" />

                {/* Add Form */}
                {isAdding && (
                    <div className="bg-[#16161a] border border-white/5 rounded-3xl p-8 mb-10">
                        <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                            <Plus size={18} className="text-slate-400" />
                            Add Client Review
                        </h2>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Left: Text fields */}
                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-2">Client Name</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-transparent border border-white/10 rounded-md px-3 py-2 text-white text-sm focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all placeholder:text-slate-500"
                                        placeholder="e.g. Rafiq Ahmed"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-2">Designation / Company</label>
                                    <input
                                        type="text"
                                        value={formData.designation}
                                        onChange={e => setFormData({ ...formData, designation: e.target.value })}
                                        className="w-full bg-transparent border border-white/10 rounded-md px-3 py-2 text-white text-sm focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all placeholder:text-slate-500"
                                        placeholder="e.g. CEO, TechStar BD"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-2">Review Text</label>
                                    <textarea
                                        value={formData.review_text}
                                        onChange={e => setFormData({ ...formData, review_text: e.target.value })}
                                        rows="4"
                                        className="w-full bg-transparent border border-white/10 rounded-md px-3 py-2 text-white text-sm focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all resize-y placeholder:text-slate-500"
                                        placeholder="What did the client say about your work..."
                                    />
                                </div>
                                <label className="flex items-center gap-3 cursor-pointer select-none">
                                    <input
                                        type="checkbox"
                                        checked={formData.is_featured}
                                        onChange={e => setFormData({ ...formData, is_featured: e.target.checked })}
                                        className="accent-white w-4 h-4"
                                    />
                                    <span className="text-sm text-slate-300">Mark as featured review</span>
                                </label>
                            </div>

                            {/* Right: Image uploads */}
                            <div className="space-y-5">
                                {/* Profile Image */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-2">Profile Photo</label>
                                    <input
                                        ref={profileInputRef}
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={e => handleFileSelect(e.target.files[0], 'profile')}
                                    />
                                    <button
                                        onClick={() => profileInputRef.current?.click()}
                                        className="w-full border border-dashed border-white/10 hover:border-white/30 rounded-xl p-4 flex items-center gap-4 transition-colors group"
                                    >
                                        {profilePreview ? (
                                            <img src={profilePreview} alt="Profile" className="w-14 h-14 rounded-full object-cover" />
                                        ) : (
                                            <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center">
                                                <User size={20} className="text-slate-500" />
                                            </div>
                                        )}
                                        <div className="text-left">
                                            <p className="text-sm text-slate-300 group-hover:text-white transition-colors">
                                                {profilePreview ? 'Change photo' : 'Upload profile photo'}
                                            </p>
                                            <p className="text-xs text-slate-500">JPG, PNG — max 2MB</p>
                                        </div>
                                        <Upload size={16} className="text-slate-500 ml-auto" />
                                    </button>
                                </div>

                                {/* Screenshot */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-2">Review Screenshot (optional)</label>
                                    <input
                                        ref={screenshotInputRef}
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={e => handleFileSelect(e.target.files[0], 'screenshot')}
                                    />
                                    <button
                                        onClick={() => screenshotInputRef.current?.click()}
                                        className="w-full border border-dashed border-white/10 hover:border-white/30 rounded-xl transition-colors group overflow-hidden"
                                    >
                                        {screenshotPreview ? (
                                            <img src={screenshotPreview} alt="Screenshot" className="w-full h-40 object-cover" />
                                        ) : (
                                            <div className="p-6 flex flex-col items-center gap-2">
                                                <ImageIcon size={24} className="text-slate-500" />
                                                <p className="text-sm text-slate-300 group-hover:text-white transition-colors">Upload screenshot</p>
                                                <p className="text-xs text-slate-500">Facebook review, Google review, chat screenshot, etc.</p>
                                            </div>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3 pt-6 mt-8 border-t border-white/10">
                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="flex items-center gap-2 bg-white hover:bg-zinc-200 text-black px-4 py-2 rounded-md text-sm font-medium transition-colors disabled:opacity-50"
                            >
                                <Save size={16} />
                                {saving ? 'Saving...' : 'Publish Review'}
                            </button>
                            <button
                                onClick={cancelAdd}
                                className="flex items-center gap-2 bg-transparent hover:bg-white/5 text-slate-300 px-4 py-2 rounded-md text-sm font-medium border border-transparent hover:border-white/10 transition-all"
                            >
                                <X size={16} /> Cancel
                            </button>
                        </div>
                    </div>
                )}

                {/* Existing Testimonials */}
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    </div>
                ) : testimonials.length === 0 && !isAdding ? (
                    <div className="text-center py-20">
                        <Star size={40} className="text-slate-600 mx-auto mb-4" />
                        <p className="text-slate-400 text-sm">No reviews yet. Add your first client testimonial.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {testimonials.map((t) => (
                            <div key={t.id} className="group bg-[#16161a] border border-white/5 rounded-3xl overflow-hidden transition-colors hover:bg-white/[0.03] hover:border-white/10">

                                {/* Screenshot preview */}
                                {t.screenshot_url && (
                                    <div className="w-full h-36 overflow-hidden border-b border-white/5">
                                        <img src={t.screenshot_url} alt="Review screenshot" className="w-full h-full object-cover" />
                                    </div>
                                )}

                                <div className="p-6">
                                    {/* User info */}
                                    <div className="flex items-center gap-3 mb-4">
                                        {t.profile_image_url ? (
                                            <img src={t.profile_image_url} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                                        ) : (
                                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                                                <User size={16} className="text-slate-500" />
                                            </div>
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-white truncate">{t.name}</p>
                                            <p className="text-xs text-slate-400 truncate">{t.designation}</p>
                                        </div>
                                        {t.is_featured && (
                                            <Star size={14} className="text-yellow-500 fill-yellow-500 shrink-0" />
                                        )}
                                    </div>

                                    {/* Review text */}
                                    <p className="text-slate-400 text-sm leading-relaxed line-clamp-4 mb-4">"{t.review_text}"</p>

                                    {/* Actions */}
                                    <div className="flex items-center gap-2 pt-3 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => toggleFeatured(t)}
                                            className={`p-1.5 rounded-md text-xs flex items-center gap-1 transition-colors ${t.is_featured
                                                ? 'text-yellow-400 hover:bg-yellow-500/10'
                                                : 'text-slate-400 hover:bg-white/10 hover:text-white'
                                                }`}
                                        >
                                            <Star size={14} /> {t.is_featured ? 'Unfeatured' : 'Feature'}
                                        </button>
                                        <button
                                            onClick={() => triggerDeleteModal(t)}
                                            className="p-1.5 hover:bg-red-500/20 text-slate-400 hover:text-red-400 rounded-md transition-colors ml-auto text-xs flex items-center gap-1"
                                        >
                                            <Trash2 size={14} /> Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Add new card */}
                        {!isAdding && (
                            <button
                                onClick={handleAddNew}
                                className="group bg-transparent border border-dashed border-white/10 hover:border-white/25 hover:bg-white/[0.02] rounded-3xl p-8 transition-all flex flex-col items-center justify-center min-h-[220px]"
                            >
                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                                    <Plus size={24} className="text-slate-400 group-hover:text-white transition-colors" />
                                </div>
                                <h3 className="text-sm font-semibold text-slate-300 group-hover:text-white transition-colors mb-1">Add Review</h3>
                                <p className="text-slate-500 text-xs">Upload client testimonial</p>
                            </button>
                        )}
                    </div>
                )}
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
                                {modalConfig.type === 'error' ? <Star size={32} className="opacity-50" /> : <Trash2 size={32} />}
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
            </div>

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
