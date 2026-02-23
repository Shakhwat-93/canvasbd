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
            <section className="testimonials relative py-20" ref={sectionRef}>
                <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
                    <div className="flex justify-center py-20">
                        <div className="w-6 h-6 border-2 border-[#b052ff]/20 border-t-[#b052ff] rounded-full animate-spin" />
                    </div>
                </div>
            </section>
        );
    }

    if (testimonials.length === 0) return null;

    return (
        <section className="testimonials relative py-16 md:py-24 overflow-hidden" ref={sectionRef}>
            <img src="/images/68522b8afb7001f33ec58e39_c711a787cc42eb29e73062dc3ca82256_Bg%2002.svg" loading="lazy" alt="" className="testimonial-bg-two pointer-events-none absolute right-0 top-0 opacity-40 blur-3xl w-1/2 md:w-auto" />
            <img src="/images/68522b8a6a593cf00ba12c45_a78e81681a043478dc8025be08a9bdd2_Bg%2001.svg" loading="lazy" alt="" className="testimonial-bg-one pointer-events-none absolute left-0 bottom-0 opacity-40 blur-3xl w-1/2 md:w-auto" />
            <div className="container px-4 sm:px-6 lg:px-8 mx-auto relative z-10 w-full">
                <div className="testimonials-wrapper flex flex-col items-center w-full">
                    <div data-animate className="testimonials-top-wrapper text-center max-w-[800px] mx-auto mb-12 md:mb-16">
                        <div className="mb-4 md:mb-6">
                            <h2 className="testimonials-title text-3xl md:text-5xl lg:text-[56px] font-bold leading-tight text-white mb-4">Trusted by Businesses and Creators Across Bangladesh</h2>
                        </div>
                        <div className="px-4 sm:px-0">
                            <p className="testimonials-text text-base md:text-lg lg:text-xl text-slate-400 font-light leading-relaxed">Join the growing number of businesses who trust Canvas Bd for their video production and marketing needs.</p>
                        </div>
                    </div>
                    <div className="w-full max-w-[1200px] mx-auto">
                        {/* Top Row */}
                        <div data-animate data-animate-delay="200" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full">
                            {topRow.map((t, i) => {
                                // Alternate between "featured" (logo-style) and "regular" (quote-style) cards
                                const isFeaturedCard = t.is_featured || t.screenshot_url;

                                if (isFeaturedCard) {
                                    return (
                                        <div key={t.id} className="bg-[#1b1b25] border border-[#ff5df5]/30 rounded-[2rem] p-6 md:p-8 flex flex-col justify-between hover:border-[#ff5df5]/60 transition-colors shadow-lg relative overflow-hidden group w-full">
                                            {/* Background glowing effect for featured */}
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff5df5]/5 rounded-full blur-3xl group-hover:bg-[#ff5df5]/10 transition-colors pointer-events-none"></div>

                                            <div className="mb-6 h-12 flex items-center relative z-10">
                                                {t.screenshot_url ? (
                                                    <img src={t.screenshot_url} loading="lazy" alt="" className="user-logo max-h-10 object-contain" />
                                                ) : (
                                                    <div className="text-sm text-white/50 italic font-medium">Featured</div>
                                                )}
                                            </div>
                                            <div className="relative z-10 mt-auto">
                                                <p className="text-lg md:text-xl text-white font-medium leading-relaxed mb-8">"{t.review_text}"</p>
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-full overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                                        {t.profile_image_url ? (
                                                            <img src={t.profile_image_url} loading="lazy" alt={t.name} className="w-full h-full object-cover" />
                                                        ) : (
                                                            <div className="text-lg text-white/30 font-bold">{t.name?.charAt(0) || '?'}</div>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <div className="text-base font-bold text-white leading-tight mb-1">{t.name}</div>
                                                        <div className="text-sm font-medium text-[#b052ff]">{t.designation}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }

                                return (
                                    <div key={t.id} className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-6 md:p-8 flex flex-col justify-between hover:border-white/10 transition-colors w-full">
                                        <div className="mb-8">
                                            <p className="text-base md:text-lg text-slate-300 font-light leading-relaxed">"{t.review_text}"</p>
                                        </div>
                                        <div className="flex items-center gap-4 mt-auto">
                                            <div className="w-12 h-12 rounded-full overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                                {t.profile_image_url ? (
                                                    <img src={t.profile_image_url} loading="lazy" alt={t.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="text-base text-white/30 font-bold">{t.name?.charAt(0) || '?'}</div>
                                                )}
                                            </div>
                                            <div>
                                                <div className="text-base font-bold text-white leading-tight mb-1">{t.name}</div>
                                                <div className="text-sm font-medium text-slate-400">{t.designation}</div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Bottom Row */}
                        {bottomRow.length > 0 && (
                            <div data-animate data-animate-delay="400" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full mt-6 md:mt-8">
                                {bottomRow.map((t) => (
                                    <div key={t.id} className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-6 md:p-8 flex flex-col justify-between hover:border-white/10 transition-colors w-full">
                                        <div className="mb-8">
                                            <p className="text-base md:text-lg text-slate-300 font-light leading-relaxed">"{t.review_text}"</p>
                                        </div>
                                        <div className="flex items-center gap-4 mt-auto">
                                            <div className="w-12 h-12 rounded-full overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                                {t.profile_image_url ? (
                                                    <img src={t.profile_image_url} loading="lazy" alt={t.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="text-base text-white/30 font-bold">{t.name?.charAt(0) || '?'}</div>
                                                )}
                                            </div>
                                            <div>
                                                <div className="text-base font-bold text-white leading-tight mb-1">{t.name}</div>
                                                <div className="text-sm font-medium text-slate-400">{t.designation}</div>
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
