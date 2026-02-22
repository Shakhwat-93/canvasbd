import { useEffect, useRef, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Testimonials() {
    const sectionRef = useRef(null);
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchTestimonials() {
            const { data } = await supabase
                .from('testimonials')
                .select('*')
                .order('display_order', { ascending: true });
            setTestimonials(data || []);
            setLoading(false);
        }
        fetchTestimonials();
    }, []);

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
                        setTimeout(() => {
                            el.classList.add('is-revealed');
                        }, delay);
                        observer.unobserve(el);
                    }
                });
            },
            { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
        );

        elements.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [testimonials]);

    // Split testimonials into featured (with screenshots/logos) and regular
    const featured = testimonials.filter(t => t.is_featured);
    const regular = testimonials.filter(t => !t.is_featured);

    // Layout: top row = featured cards interspersed with regular, bottom row = remaining
    const topRow = [];
    const bottomRow = [];

    // Build a balanced layout
    let fIdx = 0, rIdx = 0;
    const allItems = [...testimonials];

    // Top row: first 4 items, bottom row: rest
    allItems.forEach((item, i) => {
        if (i < 4) topRow.push(item);
        else bottomRow.push(item);
    });

    if (loading) {
        return (
            <section className="testimonials" ref={sectionRef}>
                <div className="container">
                    <div className="flex justify-center py-20">
                        <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    </div>
                </div>
            </section>
        );
    }

    if (testimonials.length === 0) return null;

    return (
        <section className="testimonials" ref={sectionRef}>
            <img src="/images/68522b8afb7001f33ec58e39_c711a787cc42eb29e73062dc3ca82256_Bg%2002.svg" loading="lazy" alt="" className="testimonial-bg-two" />
            <img src="/images/68522b8a6a593cf00ba12c45_a78e81681a043478dc8025be08a9bdd2_Bg%2001.svg" loading="lazy" alt="" className="testimonial-bg-one" />
            <div className="container">
                <div className="testimonials-wrapper">
                    <div data-animate className="testimonials-top-wrapper">
                        <div className="testimonials-title-wrap">
                            <h2 className="testimonials-title">Trusted by Businesses and Creators Across Bangladesh</h2>
                        </div>
                        <div className="testimonials-text-wrap">
                            <p className="testimonials-text">Join the growing number of businesses who trust Canvas Bd for their video production and marketing needs.</p>
                        </div>
                    </div>
                    <div className="testimonials-items-wrapper">
                        {/* Top Row */}
                        <div data-animate data-animate-delay="200" className="testimonials-items-top-grid-wrap">
                            {topRow.map((t, i) => {
                                // Alternate between "featured" (logo-style) and "regular" (quote-style) cards
                                const isFeaturedCard = t.is_featured || t.screenshot_url;

                                if (isFeaturedCard) {
                                    return (
                                        <div key={t.id} className="testimonial-card-one">
                                            <div className="testimonial-card-one-logo-wrap">
                                                {t.screenshot_url ? (
                                                    <img src={t.screenshot_url} loading="lazy" alt="" className="user-logo" style={{ maxHeight: '40px', objectFit: 'contain' }} />
                                                ) : (
                                                    <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', fontStyle: 'italic' }}>Featured</div>
                                                )}
                                            </div>
                                            <div className="testimonial-card-one-content-wrap">
                                                <div className="testimonial-card-two-text-wrap">
                                                    <p className="testimonial-card-one-text">"{t.review_text}"</p>
                                                </div>
                                                <div className="testimonial-card-user-wrap">
                                                    <div className="testimonial-card-user-two-image-wrap">
                                                        {t.profile_image_url ? (
                                                            <img src={t.profile_image_url} loading="lazy" alt={t.name} className="testimonial-user-image" />
                                                        ) : (
                                                            <div className="testimonial-user-image" style={{ background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', color: 'rgba(255,255,255,0.3)' }}>
                                                                {t.name?.charAt(0) || '?'}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="testimonial-card-two-user-info-wrap">
                                                        <div className="testimonial-two-user-name">{t.name}</div>
                                                        <div className="user-designation-two">{t.designation}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }

                                return (
                                    <div key={t.id} className={i === 1 || i === 2 ? "testimonials-items-grid-wrap" : ""}>
                                        <div className="testimonial-card-two">
                                            <div className="testimonial-card-two-text-wrap">
                                                <p className="testimonial-card-two-text">"{t.review_text}"</p>
                                            </div>
                                            <div className="testimonial-card-user-wrap">
                                                <div className="testimonial-card-user-one-image-wrap">
                                                    {t.profile_image_url ? (
                                                        <img src={t.profile_image_url} loading="lazy" alt={t.name} className="testimonial-user-image" />
                                                    ) : (
                                                        <div className="testimonial-user-image" style={{ background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', color: 'rgba(255,255,255,0.3)' }}>
                                                            {t.name?.charAt(0) || '?'}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="testimonial-card-two-user-info-wrap">
                                                    <div className="testimonial-two-user-name">{t.name}</div>
                                                    <div className="user-designation-two">{t.designation}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Bottom Row */}
                        {bottomRow.length > 0 && (
                            <div data-animate data-animate-delay="400" className="testimonials-items-bottom-grid-wrap">
                                {bottomRow.map((t) => (
                                    <div key={t.id} className="testimonial-card-two">
                                        <div className="testimonial-card-two-text-wrap">
                                            <p className="testimonial-card-two-text">"{t.review_text}"</p>
                                        </div>
                                        <div className="testimonial-card-user-wrap">
                                            <div className="testimonial-card-user-one-image-wrap">
                                                {t.profile_image_url ? (
                                                    <img src={t.profile_image_url} loading="lazy" alt={t.name} className="testimonial-user-image" />
                                                ) : (
                                                    <div className="testimonial-user-image" style={{ background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', color: 'rgba(255,255,255,0.3)' }}>
                                                        {t.name?.charAt(0) || '?'}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="testimonial-card-two-user-info-wrap">
                                                <div className="testimonial-two-user-name">{t.name}</div>
                                                <div className="user-designation-two">{t.designation}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
