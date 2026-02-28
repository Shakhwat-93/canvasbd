import React, { useEffect, useState, useCallback, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { X, ArrowLeft, Folder, PlayCircle, Video } from 'lucide-react';

// Match site theme from CSS variables
const THEME = {
    bg: '#151416',
    cardBg: '#1b1b25',
    cardBgAlt: '#212028',
    text: '#eae7f2',
    textMuted: '#a5a7be',
    brand: 'linear-gradient(315deg, #2c00dc, #735ff4)',
    brandColor: '#735ff4',
    border: '#302c4f',
    borderAlt: '#454559',
};

function getThumb(id) {
    if (!id || typeof id !== 'string') return null;
    if (id.length === 11) {
        return `https://img.youtube.com/vi/${id}/mqdefault.jpg`;
    }
    // Return null for Drive to render a placeholder instead of breaking
    return null;
}

export default function VideoGallery() {
    const [videos, setVideos] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(null); // replaces activeTab
    const [selectedVideo, setSelectedVideo] = useState(null);
    const sectionRef = useRef(null);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);

            // Fetch categories
            const { data: catData, error: catError } = await supabase
                .from('video_categories')
                .select('*')
                .order('sort_order', { ascending: true });

            if (!catError) setCategories(catData || []);

            // Fetch videos
            const { data: videoData, error: vidError } = await supabase
                .from('demo_videos')
                .select('*')
                .order('sort_order', { ascending: true });

            if (!vidError) setVideos(videoData || []);
            setLoading(false);
        }
        fetchData();
    }, []);

    // Match site's IntersectionObserver animation pattern
    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;
        const elements = section.querySelectorAll('[data-animate]');
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const el = entry.target;
                        const delay = parseInt(el.dataset.animateDelay || '0', 10);
                        setTimeout(() => el.classList.add('is-revealed'), delay);
                        observer.unobserve(el);
                    }
                });
            },
            { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
        );
        elements.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [videos, selectedCategory]);

    const handleClose = useCallback(() => setSelectedVideo(null), []);

    useEffect(() => {
        const fn = (e) => { if (e.key === 'Escape') handleClose(); };
        window.addEventListener('keydown', fn);
        return () => window.removeEventListener('keydown', fn);
    }, [handleClose]);

    // Get videos for selected category
    const categoryVideos = selectedCategory ? videos.filter(v => v.category === selectedCategory) : [];

    if (!loading && videos.length === 0) return null;

    return (
        <>
            {/* Inject scoped styles matching site's design language */}
            <style>{`
                .vg-section {
                    background-color: ${THEME.bg};
                    padding: 100px 0;
                    position: relative;
                }
                .vg-caption {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    border: 1px solid ${THEME.border};
                    background-color: ${THEME.cardBgAlt};
                    border-radius: 100px;
                    padding: 6px 14px;
                    margin-bottom: 24px;
                }
                .vg-caption-text {
                    color: ${THEME.textMuted};
                    font-size: 12px;
                    font-weight: 600;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    font-family: Inter, sans-serif;
                    margin: 0;
                }
                .vg-caption-dot {
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background: ${THEME.brandColor};
                    flex-shrink: 0;
                }
                .vg-heading {
                    color: ${THEME.text};
                    font-family: Inter, sans-serif;
                    font-size: 52px;
                    font-weight: 800;
                    line-height: 60px;
                    letter-spacing: -0.03em;
                    margin: 0 auto 20px;
                    max-width: 620px;
                }
                @media (max-width: 767px) {
                    .vg-heading { font-size: 36px; line-height: 42px; }
                    .vg-section { padding: 60px 0; }
                }
                .vg-subtext {
                    color: ${THEME.textMuted};
                    font-family: Inter, sans-serif;
                    font-size: 16px;
                    line-height: 26px;
                    max-width: 560px;
                    margin: 0 auto 40px;
                }
                .vg-header {
                    text-align: center;
                    margin-bottom: 56px;
                }
                .vg-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 20px;
                }
                @media (max-width: 991px) { .vg-grid { grid-template-columns: repeat(2, 1fr); } }
                @media (max-width: 479px)  { .vg-grid { grid-template-columns: 1fr; } }
                
                /* Folder Card Styling */
                .vg-folder {
                    background-color: ${THEME.cardBg};
                    border: 1px solid ${THEME.border};
                    border-radius: 16px;
                    overflow: hidden;
                    cursor: pointer;
                    transition: border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
                    display: flex;
                    flex-direction: column;
                }
                .vg-folder:hover {
                    border-color: ${THEME.brandColor};
                    transform: translateY(-4px);
                    box-shadow: 0 16px 40px rgba(115,95,244,0.15);
                }
                .vg-folder-cover {
                    position: relative;
                    width: 100%;
                    padding-top: 56.25%;
                    background: ${THEME.cardBgAlt};
                    border-bottom: 1px solid ${THEME.border};
                }
                .vg-folder-cover img {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    opacity: 0.6;
                    transition: opacity 0.3s ease;
                }
                .vg-folder:hover .vg-folder-cover img {
                    opacity: 0.8;
                }
                .vg-folder-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(0deg, ${THEME.cardBg} 0%, transparent 100%);
                }
                .vg-folder-icon {
                    position: absolute;
                    bottom: -20px;
                    left: 20px;
                    width: 48px;
                    height: 48px;
                    background: ${THEME.bg};
                    border: 1px solid ${THEME.borderAlt};
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: ${THEME.brandColor};
                    z-index: 10;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.5);
                    transition: color 0.3s ease, border-color 0.3s ease;
                }
                .vg-folder:hover .vg-folder-icon {
                    color: #fff;
                    border-color: ${THEME.brandColor};
                    background: ${THEME.brand};
                }
                .vg-folder-info {
                    padding: 32px 20px 20px;
                }
                .vg-folder-title {
                    color: ${THEME.text};
                    font-family: Inter, sans-serif;
                    font-size: 18px;
                    font-weight: 700;
                    margin: 0 0 4px;
                }
                .vg-folder-count {
                    color: ${THEME.textMuted};
                    font-size: 13px;
                    font-family: Inter, sans-serif;
                    margin: 0;
                }
                
                /* Video Card Styling */
                .vg-card {
                    background-color: ${THEME.cardBg};
                    border: 1px solid ${THEME.border};
                    border-radius: 16px;
                    overflow: hidden;
                    cursor: pointer;
                    transition: border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
                }
                .vg-card:hover {
                    border-color: ${THEME.borderAlt};
                    transform: translateY(-4px);
                    box-shadow: 0 16px 40px rgba(0,0,0,0.5);
                }
                .vg-thumb {
                    position: relative;
                    width: 100%;
                    padding-top: 56.25%;
                    overflow: hidden;
                }
                .vg-thumb img {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.5s ease;
                }
                .vg-card:hover .vg-thumb img {
                    transform: scale(1.06);
                }
                .vg-thumb-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 40%, transparent 100%);
                }
                .vg-play-btn {
                    position: absolute;
                    inset: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .vg-play-circle {
                    width: 52px;
                    height: 52px;
                    border-radius: 50%;
                    background: rgba(255,255,255,0.12);
                    backdrop-filter: blur(8px);
                    border: 1px solid rgba(255,255,255,0.25);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background 0.25s ease, transform 0.25s ease;
                }
                .vg-card:hover .vg-play-circle {
                    background: ${THEME.brandColor};
                    transform: scale(1.1);
                    border-color: ${THEME.brandColor};
                }
                .vg-card-footer {
                    padding: 16px 20px;
                }
                .vg-card-title {
                    color: ${THEME.text};
                    font-family: Inter, sans-serif;
                    font-size: 15px;
                    font-weight: 600;
                    line-height: 20px;
                    margin: 0;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                
                /* Back Navigation */
                .vg-back-nav {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-bottom: 32px;
                }
                .vg-back-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    background: transparent;
                    border: 1px solid ${THEME.border};
                    color: ${THEME.textMuted};
                    padding: 8px 16px;
                    border-radius: 8px;
                    font-family: Inter, sans-serif;
                    font-size: 14px;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }
                .vg-back-btn:hover {
                    color: ${THEME.text};
                    border-color: ${THEME.brandColor};
                    background: rgba(115,95,244,0.1);
                }
                .vg-current-cat {
                    color: ${THEME.text};
                    font-family: Inter, sans-serif;
                    font-size: 20px;
                    font-weight: 700;
                    margin: 0;
                }

                /* CTA Banner */
                .vg-cta {
                    margin-top: 72px;
                    background-color: ${THEME.cardBgAlt};
                    border: 1px solid ${THEME.border};
                    border-radius: 20px;
                    padding: 40px 48px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 24px;
                    flex-wrap: wrap;
                }
                @media (max-width: 767px) {
                    .vg-cta { flex-direction: column; text-align: center; align-items: center; padding: 32px 24px; }
                }
                .vg-cta-title {
                    color: ${THEME.text};
                    font-family: Inter, sans-serif;
                    font-size: 28px;
                    font-weight: 700;
                    line-height: 34px;
                    margin: 0 0 8px;
                }
                .vg-cta-sub {
                    color: ${THEME.textMuted};
                    font-size: 15px;
                    font-family: Inter, sans-serif;
                    margin: 0;
                }
                /* Modal */
                .vg-modal-overlay {
                    position: fixed;
                    inset: 0;
                    z-index: 9999;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 24px;
                    background: rgba(10, 9, 14, 0.92);
                    backdrop-filter: blur(16px);
                }
                .vg-modal {
                    width: 100%;
                    max-width: 920px;
                }
                .vg-modal-header {
                    display: flex;
                    align-items: flex-start;
                    justify-content: space-between;
                    gap: 16px;
                    margin-bottom: 16px;
                }
                .vg-modal-title {
                    color: ${THEME.text};
                    font-family: Inter, sans-serif;
                    font-size: 22px;
                    font-weight: 700;
                    margin: 0 0 4px;
                }
                .vg-modal-cat {
                    color: ${THEME.textMuted};
                    font-size: 12px;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    font-family: Inter, sans-serif;
                    margin: 0;
                }
                .vg-close-btn {
                    flex-shrink: 0;
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    background-color: ${THEME.cardBgAlt};
                    border: 1px solid ${THEME.border};
                    color: ${THEME.textMuted};
                    border-radius: 8px;
                    padding: 8px 14px;
                    font-size: 13px;
                    font-family: Inter, sans-serif;
                    cursor: pointer;
                    transition: color 0.2s, border-color 0.2s;
                }
                .vg-close-btn:hover {
                    color: ${THEME.text};
                    border-color: ${THEME.borderAlt};
                }
                .vg-iframe-wrap {
                    position: relative;
                    width: 100%;
                    padding-top: 56.25%;
                    border-radius: 16px;
                    overflow: hidden;
                    box-shadow: 0 0 60px rgba(0,0,0,0.7);
                }
                .vg-iframe-wrap iframe {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    border: 0;
                }
                .vg-modal-cta {
                    margin-top: 16px;
                    background-color: ${THEME.cardBgAlt};
                    border: 1px solid ${THEME.border};
                    border-radius: 12px;
                    padding: 16px 24px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 16px;
                    flex-wrap: wrap;
                }
                .vg-modal-cta-text {
                    color: ${THEME.text};
                    font-size: 14px;
                    font-family: Inter, sans-serif;
                    font-weight: 500;
                    margin: 0;
                }
                .vg-modal-cta-text span {
                    color: ${THEME.textMuted};
                }
            `}</style>

            <section className="vg-section" id="portfolio" ref={sectionRef}>
                <div className="container px-4 sm:px-6 lg:px-8 mx-auto">

                    {/* Header */}
                    <div data-animate className="vg-header">
                        <div className="vg-caption">
                            <div className="vg-caption-dot"></div>
                            <p className="vg-caption-text">Our Work</p>
                        </div>
                        <h2 className="vg-heading">
                            See Why Brands Choose Canvas Digital
                        </h2>
                        <p className="vg-subtext">
                            Real client videos that drive views, build brands, and close sales.
                        </p>
                        <a href="#contact" className="primary-button w-inline-block" style={{ display: 'inline-flex' }}>
                            <div className="primary-button-text">Get Your Video Made</div>
                            <div className="primary-button-icon-wrap">
                                <img loading="lazy" alt="" src="/images/685249b05d9202c4d1d30580_chevron-right.svg" className="primary-button-icon" />
                                <img loading="lazy" src="/images/685249b05d9202c4d1d30580_chevron-right.svg" alt="" className="primary-button-icon-hover" />
                            </div>
                        </a>
                    </div>

                    {/* Loading */}
                    {loading && (
                        <div style={{ display: 'flex', justifyContent: 'center', padding: '64px 0' }}>
                            <div style={{
                                width: 32, height: 32, borderRadius: '50%',
                                border: `2px solid ${THEME.border}`,
                                borderTopColor: THEME.brandColor,
                                animation: 'spin 0.7s linear infinite'
                            }} />
                        </div>
                    )}

                    {!loading && (
                        <>
                            {/* Main Content Area */}
                            <div className="w-full">
                                {!selectedCategory ? (
                                    /* Category Folders View */
                                    <div data-animate data-animate-delay="100" className="vg-grid">
                                        {categories.map(cat => {
                                            const catVideos = videos.filter(v => v.category === cat.name);
                                            const count = catVideos.length;
                                            // Get the first video's thumbnail to use as folder cover, or a fallback
                                            const coverThumb = count > 0 ? getThumb(catVideos[0].youtube_id) : 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&q=80&w=800';

                                            return (
                                                <div key={cat.id} className="vg-folder" onClick={() => setSelectedCategory(cat.name)}>
                                                    <div className="vg-folder-cover">
                                                        {coverThumb ? (
                                                            <img src={coverThumb} alt={cat.name} loading="lazy" />
                                                        ) : (
                                                            count > 0 && catVideos[0].youtube_url && catVideos[0].youtube_id ? (
                                                                <iframe
                                                                    src={`https://drive.google.com/file/d/${catVideos[0].youtube_id}/preview`}
                                                                    className="w-full h-full border-0 pointer-events-none"
                                                                    title={`${cat.name} Folder Preview`}
                                                                />
                                                            ) : (
                                                                <div className="w-full h-full flex flex-col items-center justify-center bg-[#1b1b25] text-slate-500">
                                                                    <Video size={48} className="mb-2 opacity-50" />
                                                                    <span className="text-xs font-medium uppercase tracking-wider">Drive Video</span>
                                                                </div>
                                                            )
                                                        )}
                                                        <div className="vg-folder-overlay" />
                                                        <div className="vg-folder-icon">
                                                            <Folder fill="currentColor" size={24} />
                                                        </div>
                                                    </div>
                                                    <div className="vg-folder-info">
                                                        <h3 className="vg-folder-title">{cat.name}</h3>
                                                        <p className="vg-folder-count">{count} {count === 1 ? 'Video' : 'Videos'}</p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    /* Individual Category Video Grid View */
                                    <div data-animate className="w-full animation-fade-in">
                                        <div className="vg-back-nav">
                                            <button className="vg-back-btn" onClick={() => setSelectedCategory(null)}>
                                                <ArrowLeft size={16} /> Back to Folders
                                            </button>
                                            <h3 className="vg-current-cat">{selectedCategory}</h3>
                                        </div>

                                        {categoryVideos.length > 0 ? (
                                            <div className="vg-grid">
                                                {categoryVideos.map((video) => (
                                                    <div key={video.id} className="vg-card" onClick={() => setSelectedVideo(video)}>
                                                        <div className="vg-thumb bg-[#0c0c0e] flex items-center justify-center">
                                                            {getThumb(video.youtube_id) ? (
                                                                <img src={getThumb(video.youtube_id)} alt={video.title} loading="lazy" />
                                                            ) : (
                                                                <iframe
                                                                    src={`https://drive.google.com/file/d/${video.youtube_id}/preview`}
                                                                    className="absolute inset-0 w-full h-full border-0 pointer-events-none transition-transform duration-500 group-hover:scale-105"
                                                                    title={video.title}
                                                                />
                                                            )}
                                                            <div className="vg-thumb-overlay" />
                                                            <div className="vg-play-btn">
                                                                <div className="vg-play-circle">
                                                                    <PlayCircle fill="currentColor" color="white" size={24} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="vg-card-footer">
                                                            <h3 className="vg-card-title">{video.title}</h3>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="text-center py-20 border border-dashed border-[#302c4f] rounded-2xl bg-[#1b1b25]">
                                                <Folder size={48} className="mx-auto mb-4 text-[#a5a7be] opacity-50" />
                                                <h3 className="text-xl font-bold text-white mb-2">Folder is Empty</h3>
                                                <p className="text-[#a5a7be]">There are no videos in this category yet.</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* CTA Banner */}
                            <div data-animate data-animate-delay="300" className="vg-cta">
                                <div>
                                    <h3 className="vg-cta-title">Ready to grow your brand?</h3>
                                    <p className="vg-cta-sub">Let's create your next viral video — from concept to delivery.</p>
                                </div>
                                <a href="#contact" className="primary-button w-inline-block">
                                    <div className="primary-button-text">Start a Project</div>
                                    <div className="primary-button-icon-wrap">
                                        <img loading="lazy" alt="" src="/images/685249b05d9202c4d1d30580_chevron-right.svg" className="primary-button-icon" />
                                        <img loading="lazy" src="/images/685249b05d9202c4d1d30580_chevron-right.svg" alt="" className="primary-button-icon-hover" />
                                    </div>
                                </a>
                            </div>
                        </>
                    )}
                </div>
            </section>

            {/* Modal */}
            {selectedVideo && (
                <div className="vg-modal-overlay" onClick={handleClose}>
                    <div className="vg-modal" onClick={e => e.stopPropagation()}>
                        <div className="vg-modal-header">
                            <div>
                                <h3 className="vg-modal-title">{selectedVideo.title}</h3>
                                <p className="vg-modal-cat">{selectedVideo.category}</p>
                            </div>
                            <button className="vg-close-btn" onClick={handleClose}>
                                <X size={15} /> Close
                            </button>
                        </div>
                        <div className="vg-iframe-wrap">
                            {selectedVideo?.youtube_id && selectedVideo.youtube_id.length === 11 ? (
                                <iframe
                                    src={`https://www.youtube.com/embed/${selectedVideo.youtube_id}?autoplay=1&rel=0&modestbranding=1`}
                                    title={selectedVideo.title}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            ) : (
                                <iframe
                                    src={`https://drive.google.com/file/d/${selectedVideo?.youtube_id}/preview`}
                                    title={selectedVideo?.title}
                                    allow="autoplay"
                                    allowFullScreen
                                />
                            )}
                        </div>
                        <div className="vg-modal-cta">
                            <p className="vg-modal-cta-text">
                                🎯 Like what you see? <span>We can make this for your business.</span>
                            </p>
                            <a href="#contact" onClick={handleClose} className="primary-button w-inline-block">
                                <div className="primary-button-text">Get a Free Quote</div>
                                <div className="primary-button-icon-wrap">
                                    <img loading="lazy" alt="" src="/images/685249b05d9202c4d1d30580_chevron-right.svg" className="primary-button-icon" />
                                    <img loading="lazy" src="/images/685249b05d9202c4d1d30580_chevron-right.svg" alt="" className="primary-button-icon-hover" />
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
