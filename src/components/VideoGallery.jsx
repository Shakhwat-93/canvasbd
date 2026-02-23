import React, { useEffect, useState, useCallback, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { X } from 'lucide-react';

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

const CATEGORIES = ['All', 'Agency Ads', 'Commercial ADS', 'Fashion', 'Recent Work', 'Social Media Ads'];

function getThumb(id) {
    return `https://img.youtube.com/vi/${id}/mqdefault.jpg`;
}

export default function VideoGallery() {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('All');
    const [selectedVideo, setSelectedVideo] = useState(null);
    const sectionRef = useRef(null);

    useEffect(() => {
        async function fetchVideos() {
            const { data, error } = await supabase
                .from('demo_videos')
                .select('*')
                .order('sort_order', { ascending: true });
            if (!error) setVideos(data || []);
            setLoading(false);
        }
        fetchVideos();
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
    }, [videos]);

    const handleClose = useCallback(() => setSelectedVideo(null), []);

    useEffect(() => {
        const fn = (e) => { if (e.key === 'Escape') handleClose(); };
        window.addEventListener('keydown', fn);
        return () => window.removeEventListener('keydown', fn);
    }, [handleClose]);

    const filtered = activeTab === 'All' ? videos : videos.filter(v => v.category === activeTab);

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
                .vg-tabs {
                    display: flex;
                    gap: 8px;
                    flex-wrap: wrap;
                    justify-content: center;
                    margin-bottom: 48px;
                }
                .vg-tab {
                    border: 1px solid ${THEME.border};
                    background-color: ${THEME.cardBg};
                    color: ${THEME.textMuted};
                    border-radius: 8px;
                    padding: 9px 18px;
                    font-size: 14px;
                    font-family: Inter, sans-serif;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.25s ease;
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    line-height: 1;
                }
                .vg-tab:hover {
                    border-color: ${THEME.brandColor};
                    color: ${THEME.text};
                }
                .vg-tab.active {
                    background-image: ${THEME.brand};
                    border-color: transparent;
                    color: #e3e3ec;
                }
                .vg-tab-count {
                    font-size: 11px;
                    font-weight: 700;
                    padding: 2px 6px;
                    border-radius: 4px;
                    background: rgba(255,255,255,0.15);
                }
                .vg-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 20px;
                }
                @media (max-width: 991px) { .vg-grid { grid-template-columns: repeat(2, 1fr); } }
                @media (max-width: 479px)  { .vg-grid { grid-template-columns: 1fr; } }
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
                .vg-cat-badge {
                    position: absolute;
                    top: 12px;
                    left: 12px;
                    background: rgba(0,0,0,0.65);
                    backdrop-filter: blur(6px);
                    border-radius: 6px;
                    padding: 4px 10px;
                    color: ${THEME.textMuted};
                    font-size: 10px;
                    font-weight: 700;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                    font-family: Inter, sans-serif;
                }
                .vg-card-footer {
                    padding: 16px 20px;
                }
                .vg-card-title {
                    color: ${THEME.text};
                    font-family: Inter, sans-serif;
                    font-size: 17px;
                    font-weight: 700;
                    line-height: 22px;
                    margin: 0 0 4px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .vg-card-sub {
                    color: ${THEME.textMuted};
                    font-size: 13px;
                    font-family: Inter, sans-serif;
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
                            See Why Brands Choose Canvas BD
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
                            {/* Tabs */}
                            <div data-animate data-animate-delay="100" className="vg-tabs">
                                {CATEGORIES.map(cat => {
                                    const count = cat === 'All' ? videos.length : videos.filter(v => v.category === cat).length;
                                    return (
                                        <button key={cat} onClick={() => setActiveTab(cat)}
                                            className={`vg-tab ${activeTab === cat ? 'active' : ''}`}>
                                            {cat}
                                            <span className="vg-tab-count">{count}</span>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Grid */}
                            <div data-animate data-animate-delay="200" className="vg-grid">
                                {filtered.map((video) => (
                                    <div key={video.id} className="vg-card" onClick={() => setSelectedVideo(video)}>
                                        <div className="vg-thumb">
                                            <img src={getThumb(video.youtube_id)} alt={video.title} loading="lazy" />
                                            <div className="vg-thumb-overlay" />
                                            <div className="vg-play-btn">
                                                <div className="vg-play-circle">
                                                    <svg viewBox="0 0 24 24" fill="white" width="22" height="22">
                                                        <path d="M8 5v14l11-7z" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className="vg-cat-badge">{video.category}</div>
                                        </div>
                                        <div className="vg-card-footer">
                                            <h3 className="vg-card-title">{video.title}</h3>
                                            <p className="vg-card-sub">Click to watch</p>
                                        </div>
                                    </div>
                                ))}
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
                            <iframe
                                src={`https://www.youtube.com/embed/${selectedVideo.youtube_id}?autoplay=1&rel=0&modestbranding=1`}
                                title={selectedVideo.title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
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
