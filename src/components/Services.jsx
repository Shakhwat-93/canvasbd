import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { services as staticServices } from '../data/services'; // fallback for tiers
import { supabase } from '../lib/supabase';
import PricingExtraTables from './PricingExtraTables';

export default function Services() {
    const sectionRef = useRef(null);
    const [dbServices, setDbServices] = useState([]);

    // We statically define these from our data layer to guarantee they load
    const businessTiers = staticServices.general.tiers;
    const personalTiers = staticServices.personal.tiers;

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

    const renderTiers = (tiers, type) => (
        <>
            {/* Mobile View: Single Unified Card (Compact) */}
            <div className="w-full block md:hidden bg-[#0f172a] rounded-[2rem] border border-[#1e293b] overflow-hidden mb-16 shadow-[0_0_30px_rgba(59,130,246,0.1)]">
                {tiers.map((tier, index) => {
                    const isFeatured = index === 1; // Middle one is always featured

                    return (
                        <div
                            key={`mobile-${type}-${index}`}
                            className={`relative flex flex-col ${index !== tiers.length - 1 ? 'border-b border-[#1e293b]' : ''} ${isFeatured ? 'bg-gradient-to-b from-[#1b2b4d]/80 to-transparent' : 'bg-white/[0.01]'}`}
                        >
                            {isFeatured && (
                                <div className="absolute top-0 left-0 w-full bg-[#1b2b4d] text-white text-[10px] font-bold uppercase tracking-widest py-1.5 text-center shadow-sm z-10 border-b border-black/10">
                                    Most popular plan
                                </div>
                            )}

                            {/* Card Header */}
                            <div className={`p-5 flex flex-col items-center text-center ${isFeatured ? 'pt-10' : ''}`}>
                                <div className="mb-2">
                                    <div className="text-lg font-bold tracking-widest text-[#a5a7be] mb-1 uppercase leading-tight">{tier.name.split(' ')[0]}</div>
                                    <div className="text-xs font-semibold text-white tracking-widest opacity-90 uppercase">
                                        {tier.name.includes('(') ? `(${tier.name.split('(')[1]}` : ''}
                                    </div>
                                </div>

                                <div className="mb-2 flex flex-col items-center">
                                    <div className={`text-2xl font-extrabold tracking-tight text-[#f97316]`}>{tier.price}</div>
                                    <div className="text-[11px] text-[#a5a7be] font-medium tracking-wide leading-none">{tier.frequency}*</div>
                                </div>

                                <p className="text-xs text-[#a5a7be] mb-4">{tier.idealFor}</p>

                                {/* Features List */}
                                <div className="flex flex-col gap-3 w-full text-left bg-white/[0.02] rounded-xl p-4">
                                    {tier.features.map((feature, i) => (
                                        <div key={i} className="flex items-start gap-3">
                                            <div className="flex-shrink-0 mt-0.5 w-4 h-4 rounded-full bg-blue-500/80 flex items-center justify-center">
                                                <img src="/images/68564e0eee1d2c58645b2923_check.svg" loading="lazy" alt="check" className="w-2 h-2 invert" />
                                            </div>
                                            <div className="text-[14px] text-white/90 leading-tight font-medium">{feature}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    );
                })}

                {/* Unified Single Action Button for Mobile */}
                <div className="p-6 bg-[#0f172a] flex justify-center w-full border-t border-[#1e293b]">
                    <a
                        href="#contact"
                        className="w-full max-w-[320px] flex items-center justify-center py-4 rounded-xl font-bold text-[15px] transition-all duration-300 bg-[#f97316] hover:bg-[#ea580c] text-white shadow-[0_0_20px_rgba(249,115,22,0.3)] tracking-wide uppercase"
                    >
                        Get Started Now
                    </a>
                </div>
            </div>

            {/* Desktop View: 3-Column Separated Grid */}
            <div className="w-full hidden md:grid grid-cols-3 gap-6 lg:gap-8 max-w-[1200px] mx-auto items-center mb-24 mt-12">
                {tiers.map((tier, index) => {
                    const isFeatured = index === 1; // Middle one is always featured
                    const delay = (index + 1) * 150;

                    return (
                        <div
                            key={`desktop-${type}-${index}`}
                            data-animate
                            data-animate-delay={delay}
                            className={`w-full rounded-[2rem] overflow-hidden transition-all duration-500 relative group flex flex-col h-full ${isFeatured
                                ? 'bg-gradient-to-b from-[#1b2b4d] to-[#0f172a] border border-[#3b82f6]/40 hover:border-[#3b82f6]/80 shadow-[0_0_40px_rgba(59,130,246,0.15)] md:-mt-8 md:mb-8 md:scale-105 z-10'
                                : 'bg-[#0f172a] border border-[#1e293b] hover:border-[#3b82f6]/30'
                                }`}
                        >
                            {isFeatured && (
                                <div className="absolute top-0 left-0 w-full bg-[#1b2b4d] text-white text-[11px] font-bold uppercase tracking-widest py-2 text-center shadow-lg z-10">
                                    Most popular plan
                                </div>
                            )}

                            {/* Card Header */}
                            <div className={`p-8 lg:p-10 flex flex-col items-center text-center border-b border-white/5 ${isFeatured ? 'pt-14' : ''}`}>
                                <div className="mb-4">
                                    <div className="text-xl font-bold tracking-widest text-[#a5a7be] mb-2 uppercase">{tier.name.split(' ')[0]}</div>
                                    <div className="text-sm font-semibold text-white tracking-widest opacity-90 uppercase">
                                        {tier.name.includes('(') ? `(${tier.name.split('(')[1]}` : ''}
                                    </div>
                                </div>

                                <div className="mb-4 flex flex-col items-center">
                                    <div className={`text-3xl lg:text-4xl font-extrabold tracking-tight text-[#f97316]`}>{tier.price}</div>
                                    <div className="text-xs text-[#a5a7be] font-medium tracking-wide mt-1">{tier.frequency}*</div>
                                </div>

                                <p className="text-sm text-[#a5a7be] mb-6">{tier.idealFor}</p>
                            </div>

                            {/* Card Body (Features) */}
                            <div className="p-8 lg:p-10 flex flex-col flex-grow bg-white/[0.01]">
                                <div className="flex flex-col gap-5 flex-grow mb-8">
                                    {tier.features.map((feature, i) => (
                                        <div key={i} className="flex items-start gap-4">
                                            <div className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                                                <img src="/images/68564e0eee1d2c58645b2923_check.svg" loading="lazy" alt="check" className="w-2.5 h-2.5 invert" />
                                            </div>
                                            <div className="text-[15px] text-white leading-tight font-medium">{feature}</div>
                                        </div>
                                    ))}
                                </div>

                                {/* Card Footer (Button) */}
                                <div className="mt-auto flex justify-center w-full">
                                    <a
                                        href="#contact"
                                        className={`w-[80%] flex items-center justify-center py-3.5 rounded-full font-bold text-sm transition-all duration-300 ${isFeatured
                                            ? 'bg-[#1e3a8a] hover:bg-[#2563eb] text-white shadow-[0_0_20px_rgba(59,130,246,0.3)]'
                                            : 'bg-[#1e3a8a] text-white hover:bg-[#2563eb]'
                                            }`}
                                    >
                                        Get Started
                                    </a>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );

    return (
        <section className="pricing relative py-16 md:py-24" id="pricing" ref={sectionRef}>
            <img src="/images/68522b8a6a593cf00ba12c45_a78e81681a043478dc8025be08a9bdd2_Bg%2001.svg" loading="lazy" alt="" className="pricing-left-top-bg pointer-events-none absolute top-0 left-0 opacity-50" />
            <img src="/images/68522b8a6a593cf00ba12c45_a78e81681a043478dc8025be08a9bdd2_Bg%2001.svg" loading="lazy" alt="" className="pricing-left-bottom-bg pointer-events-none absolute bottom-0 left-0 opacity-50" />
            <div className="container px-4 sm:px-6 lg:px-8 mx-auto relative z-10">
                <div className="pricing-wrapper flex flex-col items-center">

                    {/* Business Plans Section */}
                    <div data-animate className="feature-top-wrapper text-center max-w-[800px] mx-auto mb-16 md:mb-20">
                        <div className="feature-title-wrap mb-4 md:mb-6">
                            <h2 className="pricing-title text-3xl md:text-5xl lg:text-[56px] font-bold leading-tight text-white tracking-tight">Flexible Subscription Plans <br className="hidden md:block" /> For Every Growth</h2>
                        </div>
                        <div className="feature-text-wrap px-2 sm:px-0">
                            <p className="pricing-text text-base md:text-lg lg:text-xl text-slate-400 font-light leading-relaxed">Choose a plan that fits your vision for established business enterprises.</p>
                        </div>
                    </div>

                    {renderTiers(businessTiers, 'business')}

                    {/* Personal Branding Section */}
                    <div data-animate className="feature-top-wrapper text-center max-w-[800px] mx-auto mb-16 md:mb-20 mt-12">
                        <div className="feature-title-wrap mb-4 md:mb-6">
                            <h2 className="pricing-title text-3xl md:text-5xl lg:text-[56px] font-bold leading-tight text-white tracking-tight">Personal Branding <br className="hidden md:block" /> Subscriptions</h2>
                        </div>
                        <div className="feature-text-wrap px-2 sm:px-0">
                            <p className="pricing-text text-base md:text-lg lg:text-xl text-slate-400 font-light leading-relaxed">(Doctors, Lawyers, Business Man and other professions)</p>
                        </div>
                    </div>

                    {renderTiers(personalTiers, 'personal')}

                    <PricingExtraTables />
                </div>
            </div>
        </section>
    );
}
