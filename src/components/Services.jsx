import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { services as staticServices } from '../data/services'; // fallback for tiers
import { supabase } from '../lib/supabase';
import PricingExtraTables from './PricingExtraTables';

export default function Services() {
    const sectionRef = useRef(null);
    const [dbServices, setDbServices] = useState([]);
    const generalTiers = staticServices.general.tiers;

    useEffect(() => {
        async function fetchServices() {
            const { data } = await supabase.from('services').select('*').order('created_at', { ascending: true });
            if (data) setDbServices(data);
        }
        fetchServices();

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
            { threshold: 0.08, rootMargin: '0px 0px -60px 0px' }
        );

        elements.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <section className="pricing relative py-16 md:py-24" id="pricing" ref={sectionRef}>
            <img src="/images/68522b8a6a593cf00ba12c45_a78e81681a043478dc8025be08a9bdd2_Bg%2001.svg" loading="lazy" alt="" className="pricing-left-top-bg pointer-events-none absolute top-0 left-0 opacity-50" />
            <img src="/images/68522b8a6a593cf00ba12c45_a78e81681a043478dc8025be08a9bdd2_Bg%2001.svg" loading="lazy" alt="" className="pricing-left-bottom-bg pointer-events-none absolute bottom-0 left-0 opacity-50" />
            <div className="container px-4 sm:px-6 lg:px-8 mx-auto relative z-10">
                <div className="pricing-wrapper flex flex-col items-center">
                    <div data-animate className="feature-top-wrapper text-center max-w-[800px] mx-auto mb-12 md:mb-16">
                        <div className="feature-title-wrap mb-4 md:mb-6">
                            <h2 className="pricing-title text-3xl md:text-5xl lg:text-[56px] font-bold leading-tight text-white">Flexible Subscription Plans<br className="hidden md:block" />For Every Business</h2>
                        </div>
                        <div className="feature-text-wrap px-2 sm:px-0">
                            <p className="pricing-text text-base md:text-lg lg:text-xl text-slate-400 font-light leading-relaxed">Choose a plan that fits your needs — from solo creators to established businesses. All plans include professional video, photography, and marketing services.</p>
                        </div>
                    </div>
                    <div className="w-full flex flex-col gap-6 md:gap-8 max-w-[1000px] mx-auto">
                        {/* Starter Plan */}
                        <div data-animate data-animate-delay="100" className="w-full bg-[#1b1b25] border border-[#302c4f] rounded-[2rem] overflow-hidden hover:border-[#b052ff]/30 transition-colors shadow-xl">
                            <div className="flex flex-col md:flex-row h-full">
                                <div className="p-6 md:p-8 lg:p-10 md:w-[45%] flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/5 bg-white/[0.02]">
                                    <div className="mb-8">
                                        <div className="text-xl md:text-2xl font-bold text-white mb-2">{generalTiers[0].name}</div>
                                        <p className="text-sm md:text-base text-[#a5a7be] font-medium tracking-wide">— {generalTiers[0].idealFor}</p>
                                    </div>
                                    <div className="mt-auto">
                                        <div className="mb-6 flex flex-col md:flex-row md:items-baseline gap-2">
                                            <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">{generalTiers[0].price}</div>
                                            <div className="text-xs sm:text-sm text-slate-400 font-medium uppercase tracking-widest">{generalTiers[0].frequency}</div>
                                        </div>
                                        <a href="#contact" className="secondary-button w-full flex justify-center py-4 rounded-full border border-white/20 hover:bg-white/5 hover:border-white/40 transition-all font-semibold text-white">
                                            <div>Get Started</div>
                                        </a>
                                    </div>
                                </div>
                                <div className="p-6 md:p-8 lg:p-10 md:w-[55%] flex flex-col justify-center">
                                    <div className="text-sm font-bold text-[#b052ff] uppercase tracking-widest mb-6">What's Included</div>
                                    <div className="flex flex-col gap-4">
                                        {generalTiers[0].features.map((feature, i) => (
                                            <div key={i} className="flex items-start gap-4">
                                                <div className="flex-shrink-0 mt-1">
                                                    <img src="/images/68564e0eee1d2c58645b2923_check.svg" loading="lazy" alt="check" className="w-5 h-5 opacity-80" />
                                                </div>
                                                <div className="text-base text-slate-300 leading-relaxed">{feature}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Standard Plan (Pro) */}
                        <div data-animate data-animate-delay="250" className="w-full bg-gradient-to-b from-[#b052ff]/10 to-[#1b1b25] border border-[#b052ff]/40 rounded-[2rem] overflow-hidden hover:border-[#ff5df5]/60 transition-colors shadow-[0_0_40px_rgba(176,82,255,0.15)] relative">
                            {/* Popular Badge */}
                            <div className="absolute top-0 right-8 bg-gradient-to-r from-[#ff5df5] to-[#b052ff] text-white text-xs font-bold uppercase tracking-widest py-1.5 px-4 rounded-b-lg shadow-lg">Most Popular</div>

                            <div className="flex flex-col md:flex-row h-full">
                                <div className="p-6 md:p-8 lg:p-10 md:w-[45%] flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/5 bg-white/[0.02] pt-10">
                                    <div className="mb-8">
                                        <div className="text-xl md:text-2xl font-bold text-white mb-2">{generalTiers[1].name}</div>
                                        <p className="text-sm md:text-base text-[#a5a7be] font-medium tracking-wide">— {generalTiers[1].idealFor}</p>
                                    </div>
                                    <div className="mt-auto">
                                        <div className="mb-6 flex flex-col md:flex-row md:items-baseline gap-2">
                                            <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">{generalTiers[1].price}</div>
                                            <div className="text-xs sm:text-sm text-slate-400 font-medium uppercase tracking-widest">{generalTiers[1].frequency}</div>
                                        </div>
                                        <a href="#contact" className="primary-button w-full flex items-center justify-center gap-2 py-4 rounded-full bg-gradient-to-r from-[#ff5df5] to-[#b052ff] hover:scale-105 transition-transform font-semibold text-white shadow-[0_0_20px_rgba(176,82,255,0.4)]">
                                            <div className="primary-button-text">Choose Standard</div>
                                            <div className="primary-button-icon-wrap w-4 h-4">
                                                <img loading="lazy" alt="" src="/images/685249b05d9202c4d1d30580_chevron-right.svg" className="primary-button-icon w-3 h-3 invert" />
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div className="p-6 md:p-8 lg:p-10 md:w-[55%] flex flex-col justify-center">
                                    <div className="text-sm font-bold text-[#b052ff] uppercase tracking-widest mb-6">What's Included</div>
                                    <div className="flex flex-col gap-4">
                                        {generalTiers[1].features.map((feature, i) => (
                                            <div key={i} className="flex items-start gap-4">
                                                <div className="flex-shrink-0 mt-1">
                                                    <img src="/images/68564e0eee1d2c58645b2923_check.svg" loading="lazy" alt="check" className="w-5 h-5 opacity-80" />
                                                </div>
                                                <div className="text-base text-slate-300 leading-relaxed">{feature}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Professional Plan (Enterprise) */}
                        <div data-animate data-animate-delay="400" className="w-full bg-[#1b1b25] border border-[#302c4f] rounded-[2rem] overflow-hidden hover:border-[#34d399]/40 transition-colors shadow-xl">
                            <div className="flex flex-col md:flex-row h-full">
                                <div className="p-6 md:p-8 lg:p-10 md:w-[45%] flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/5 bg-white/[0.02]">
                                    <div className="mb-8">
                                        <div className="text-xl md:text-2xl font-bold text-white mb-2">{generalTiers[2].name}</div>
                                        <p className="text-sm md:text-base text-[#a5a7be] font-medium tracking-wide leading-relaxed">— {generalTiers[2].idealFor} – Our most comprehensive package with premium cinematic videos, branded posts, and full marketing support.</p>
                                    </div>
                                    <div className="mt-auto">
                                        <div className="mb-6 flex flex-col md:flex-row md:items-baseline gap-2">
                                            <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">{generalTiers[2].price}</div>
                                            <div className="text-xs sm:text-sm text-slate-400 font-medium uppercase tracking-widest">{generalTiers[2].frequency}</div>
                                        </div>
                                        <a href="#contact" className="secondary-button w-full flex justify-center py-4 rounded-full border border-white/20 hover:bg-white/5 hover:border-white/40 transition-all font-semibold text-white">
                                            <div>Contact Us</div>
                                        </a>
                                    </div>
                                </div>
                                <div className="p-6 md:p-8 lg:p-10 md:w-[55%] flex flex-col justify-center">
                                    <div className="text-sm font-bold text-[#b052ff] uppercase tracking-widest mb-6">What's Included</div>
                                    <div className="flex flex-col gap-4">
                                        {generalTiers[2].features.map((feature, i) => (
                                            <div key={i} className="flex items-start gap-4">
                                                <div className="flex-shrink-0 mt-1">
                                                    <img src="/images/68564e0eee1d2c58645b2923_check.svg" loading="lazy" alt="check" className="w-5 h-5 opacity-80" />
                                                </div>
                                                <div className="text-base text-slate-300 leading-relaxed">{feature}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <PricingExtraTables />
                </div>
            </div>
        </section>
    );
}
