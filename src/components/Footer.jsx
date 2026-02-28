import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Phone, Mail, MapPin, Building2 } from 'lucide-react';

export default function Footer() {
    const footerRef = useRef(null);
    const [companyData, setCompanyData] = useState(null);

    useEffect(() => {
        async function fetchCompanyData() {
            const { data } = await supabase.from('company_info').select('*').single();
            if (data) setCompanyData(data);
        }
        fetchCompanyData();

        const footer = footerRef.current;
        if (!footer) return;

        const elements = footer.querySelectorAll('[data-animate]');
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
            { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
        );

        elements.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <footer className="footer bg-[#0a0a0c] pt-16 md:pt-24 pb-24 md:pb-12 border-t border-white/5 relative overflow-hidden" ref={footerRef}>
            <div className="container px-4 sm:px-6 lg:px-8 mx-auto relative z-10 w-full">
                <div className="footer-wrapper flex flex-col gap-12 md:gap-16 w-full">
                    {/* Top Call to Action */}
                    <div data-animate className="footer-top-wrapper bg-[#16161a] border border-white/5 rounded-3xl p-6 md:p-8 w-full flex flex-col md:flex-row items-center justify-start gap-6 md:gap-8">
                        <div className="footer-title-wrap">
                            <h2 className="footer-title text-2xl md:text-3xl font-bold text-white m-0 tracking-tight">How can we help?</h2>
                        </div>
                        <div className="footer-button-wrap flex flex-row items-center justify-start gap-3 sm:gap-4">
                            <a href="#contact" className="secondary-button flex items-center justify-center py-2.5 px-5 sm:px-6 rounded-xl bg-[#0c0c0e] border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all text-slate-200 font-medium text-sm shadow-sm tracking-wide">
                                Contact us
                            </a>
                            <a href="#contact" className="secondary-button flex items-center justify-center py-2.5 px-5 sm:px-6 rounded-xl bg-[#0c0c0e] border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all text-slate-200 font-medium text-sm shadow-sm tracking-wide">
                                Help Center
                            </a>
                        </div>
                    </div>

                    <div className="pt-8 w-full">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-start">
                            {/* Brand Column */}
                            <div data-animate data-animate-delay="100" className="md:col-span-3 flex flex-col gap-6">
                                <Link to="/" className="inline-block -ml-4 md:-ml-6 lg:-ml-8">
                                    <img src="/images/br/logo.png" alt="Canvas Bd Logo" className="object-contain h-20 md:h-28 lg:h-32 w-auto" />
                                </Link>
                                <div className="text-xs sm:text-sm text-slate-400 font-medium tracking-wide max-w-[200px] leading-relaxed">
                                    Premium Video Production & Digital Marketing Agency
                                </div>
                            </div>

                            {/* Contact Column */}
                            <div data-animate data-animate-delay="200" className="md:col-span-3">
                                <div className="text-[11px] font-bold text-[#b052ff] uppercase tracking-[0.2em] mb-6 opacity-60">Contact</div>
                                <div className="flex flex-col gap-4">
                                    {companyData && (
                                        <>
                                            <a href={`tel:${companyData.phone[0]}`} className="text-slate-400 hover:text-white transition-colors text-sm font-light flex items-center gap-3 group">
                                                <Phone size={13} className="text-[#b052ff] opacity-50 group-hover:opacity-100" />
                                                {companyData.phone[0]}
                                            </a>
                                            <a href={`mailto:${companyData.email}`} className="text-slate-400 hover:text-white transition-colors text-sm font-light flex items-center gap-3 break-all group">
                                                <Mail size={13} className="text-[#b052ff] opacity-50 group-hover:opacity-100" />
                                                <span className="uppercase">{companyData.email}</span>
                                            </a>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Offices Column */}
                            <div data-animate data-animate-delay="300" className="md:col-span-3">
                                <div className="text-[11px] font-bold text-[#b052ff] uppercase tracking-[0.2em] mb-6 opacity-60">Offices</div>
                                <div className="flex flex-col gap-6">
                                    {companyData?.locations?.uttara && (
                                        <div className="flex flex-col gap-1.5">
                                            <span className="text-slate-200 text-xs font-semibold">{companyData.locations.uttara.name}</span>
                                            <span className="text-[12px] text-slate-400 font-light leading-relaxed">{companyData.locations.uttara.address}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Factory Column */}
                            <div data-animate data-animate-delay="400" className="md:col-span-3">
                                <div className="text-[11px] font-bold text-[#b052ff] uppercase tracking-[0.2em] mb-6 opacity-60">Factory</div>
                                {companyData?.locations?.factory && (
                                    <div className="flex flex-col gap-1.5">
                                        <span className="text-slate-200 text-xs font-semibold">{companyData.locations.factory.name}</span>
                                        <span className="text-[12px] text-slate-400 font-light leading-relaxed">{companyData.locations.factory.address}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div data-animate data-animate-delay="500" className="w-full h-px bg-white/5 mt-16 mb-8"></div>

                        <div data-animate data-animate-delay="600" className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
                            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-[12px] text-slate-500 font-medium">
                                <div>© {new Date().getFullYear()} {companyData?.name || 'Canvas Bd'}. All rights reserved.</div>
                                <div className="hidden md:block opacity-20 text-slate-400">|</div>
                                <div>
                                    Built by <a href="https://shakhwatrasel.vercel.app" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#b052ff] transition-colors font-semibold">Shakhwat Hossain Rasel</a>
                                </div>
                            </div>
                            <div className="flex gap-6 text-[11px] text-slate-500 font-bold uppercase tracking-widest">
                                <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                                <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
