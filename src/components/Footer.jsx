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
        <footer className="footer bg-[#0a0a0c] pt-16 md:pt-24 pb-12 border-t border-white/5 relative overflow-hidden" ref={footerRef}>
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

                    <div className="flex flex-col gap-12 w-full">
                        {/* Links Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 w-full">
                            <div data-animate className="flex flex-col items-start w-full bg-[#16161a] border border-white/5 rounded-3xl p-8 shadow-[0_15px_20px_rgba(0,0,0,0.2)]">
                                <div className="mb-6">
                                    <div className="text-sm font-bold text-[#b052ff] uppercase tracking-widest">Contact Info</div>
                                </div>
                                <div className="flex flex-col items-start gap-5">
                                    {companyData && (
                                        <>
                                            <a href={`tel:${companyData.phone[0]}`} className="footer-link flex items-center gap-4 text-slate-300 hover:text-white transition-colors group">
                                                <div className="p-2.5 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                                                    <Phone size={15} className="text-[#b052ff]" />
                                                </div>
                                                <span className="font-light">{companyData.phone[0]}</span>
                                            </a>
                                            {companyData.phone[1] && <a href={`tel:${companyData.phone[1]}`} className="footer-link flex items-center gap-4 text-slate-300 hover:text-white transition-colors group">
                                                <div className="p-2.5 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                                                    <Phone size={15} className="text-[#b052ff]" />
                                                </div>
                                                <span className="font-light">{companyData.phone[1]}</span>
                                            </a>}
                                            <a href={`mailto:${companyData.email}`} className="footer-link flex items-center gap-4 text-slate-300 hover:text-white transition-colors break-all group">
                                                <div className="p-2.5 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                                                    <Mail size={15} className="text-[#b052ff]" />
                                                </div>
                                                <span className="font-light">{companyData.email}</span>
                                            </a>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div data-animate data-animate-delay="100" className="flex flex-col items-start w-full bg-[#16161a] border border-white/5 rounded-3xl p-8 shadow-[0_15px_20px_rgba(0,0,0,0.2)]">
                                <div className="mb-6">
                                    <div className="text-sm font-bold text-[#b052ff] uppercase tracking-widest">Offices</div>
                                </div>
                                <div className="flex flex-col items-start gap-6">
                                    {companyData?.locations?.pallabi && (
                                        <div className="footer-link flex items-start gap-4 group">
                                            <div className="p-2.5 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors shrink-0 mt-0.5">
                                                <MapPin size={16} className="text-[#b052ff]" />
                                            </div>
                                            <div className="flex flex-col text-left">
                                                <span className="text-white font-semibold mb-1 text-base">{companyData.locations.pallabi.name}</span>
                                                <span className="text-sm text-slate-400 font-light leading-relaxed max-w-[280px]">{companyData.locations.pallabi.address}</span>
                                            </div>
                                        </div>
                                    )}
                                    {companyData?.locations?.uttara && (
                                        <div className="footer-link flex items-start gap-4 group mt-2">
                                            <div className="p-2.5 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors shrink-0 mt-0.5">
                                                <MapPin size={16} className="text-[#b052ff]" />
                                            </div>
                                            <div className="flex flex-col text-left">
                                                <span className="text-white font-semibold mb-1 text-base">{companyData.locations.uttara.name}</span>
                                                <span className="text-sm text-slate-400 font-light leading-relaxed max-w-[280px]">{companyData.locations.uttara.address}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div data-animate data-animate-delay="200" className="flex flex-col items-start w-full bg-[#16161a] border border-white/5 rounded-3xl p-8 shadow-[0_15px_20px_rgba(0,0,0,0.2)]">
                                <div className="mb-6">
                                    <div className="text-sm font-bold text-[#b052ff] uppercase tracking-widest">Factory</div>
                                </div>
                                <div className="flex flex-col items-start gap-6">
                                    {companyData?.locations?.factory && (
                                        <div className="footer-link flex items-start gap-4 group">
                                            <div className="p-2.5 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors shrink-0 mt-0.5">
                                                <Building2 size={16} className="text-[#b052ff]" />
                                            </div>
                                            <div className="flex flex-col text-left">
                                                <span className="text-white font-semibold mb-1 text-base">{companyData.locations.factory.name}</span>
                                                <span className="text-sm text-slate-400 font-light leading-relaxed max-w-[280px]">{companyData.locations.factory.address}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div data-animate data-animate-delay="300" className="w-full h-px bg-white/5 my-2"></div>

                        {/* Bottom Footer block */}
                        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0 w-full mb-4 md:mb-8 pb-4">
                            <div data-animate data-animate-delay="400" className="mb-2 md:mb-0 ml-4 md:ml-8">
                                <Link to="/" className="flex items-center justify-center md:justify-start">
                                    <img src="/images/br/logo.png" alt="Canvas Bd Logo" className="object-contain h-10 md:h-12 w-auto scale-[1.5] md:scale-[2.6] origin-left" />
                                </Link>
                            </div>
                            <div data-animate data-animate-delay="500" className="flex flex-col md:flex-row items-center justify-center md:justify-end gap-3 md:gap-4 text-center md:text-right w-full md:w-auto mt-4 md:mt-0">
                                <div className="text-sm text-slate-300 font-medium">© {new Date().getFullYear()} {companyData?.name || 'Canvas Bd'}. All rights reserved.</div>
                                <div className="hidden md:block text-slate-600">|</div>
                                <div className="text-xs sm:text-sm text-slate-400 font-medium tracking-wide">Premium Video Production & Digital Marketing</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
