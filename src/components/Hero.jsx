import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { Aperture, Video } from 'lucide-react';
import Header from './Header';

const ServiceBadge = ({ Icon = Aperture, size = 290, primaryColor = '#b052ff', spinDuration = '30s' }) => (
    <div
        className="relative flex items-center justify-center animate-spin"
        style={{ width: `${size}px`, height: `${size}px`, animationDuration: spinDuration, animationTimingFunction: 'linear' }}
    >
        {/* Outer Orbit */}
        <div className={`absolute inset-0 border-[1.5px] border-dashed border-white/20 rounded-full`} />

        {/* Mid Orbit */}
        <div className="absolute inset-[10%] border-[1.5px] border-dotted border-white/15 rounded-full animate-[spin_20s_linear_infinite_reverse]" />

        {/* Inner Orbit background */}
        <div className="absolute inset-[20%] rounded-full backdrop-blur-sm" />

        {/* Center glowing element */}
        <div className="absolute inset-[30%] rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(176,82,255,0.3)] animate-[spin_25s_linear_infinite_reverse]">
            <Icon size={size * 0.16} className="animate-pulse" style={{ color: primaryColor }} />
        </div>

        {/* Orbit Dots */}
        {/* Outer Dot */}
        <div className="absolute inset-0 animate-[spin_15s_linear_infinite_reverse]">
            <div className="w-3 h-3 rounded-full absolute top-[14%] left-[14%] shadow-[0_0_15px_currentColor]" style={{ backgroundColor: primaryColor, color: primaryColor }} />
        </div>

        {/* Mid Dot */}
        <div className="absolute inset-[10%] animate-[spin_10s_linear_infinite]">
            <div className="w-2.5 h-2.5 bg-white rounded-full absolute -top-[5px] left-1/2 -translate-x-1/2 shadow-[0_0_10px_white]" />
        </div>

        {/* Inner Decorator Dot */}
        <div className="absolute inset-[20%] animate-[spin_8s_linear_infinite]">
            <div className="w-1.5 h-1.5 bg-[#ff5df5] rounded-full absolute top-[50%] -right-[3px] shadow-[0_0_8px_#ff5df5]" />
        </div>
    </div>
);

export default function Hero() {
    const sectionRef = useRef(null);

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
            { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
        );

        elements.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <section className="hero" ref={sectionRef}>
            <Header />
            <div className="hero-bg-wrap">
                <img src="/images/6852646611e36b1678be4ae5_Line%20Top%20.png" loading="lazy" alt="" className="hero-top-line" />
                <img src="/images/685920364c1582a50dfd1c22_Hero%20Line.png" loading="lazy" alt="" className="inner-hero-line-two blog-hero-line-two" />
                <img src="/images/685920354395baf031c46519_Hero%20Line-1.png" loading="lazy" alt="" className="inner-hero-line-one blog-hero-line-one" />
            </div>
            <div className="container relative z-10 px-4 sm:px-6 lg:px-8 mx-auto">
                <img src="/images/68591edebc6b6874a4c10327_Hero%20Bg.png" loading="lazy" alt="" className="hero-bg absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none" />
                <div className="hero-wrapper relative pt-20 pb-16 md:pt-32 md:pb-24 flex flex-col items-center">
                    <div className="hero-content-wrapper w-full relative z-20">
                        <div className="hero-content-wrap flex flex-col items-center text-center">
                            <div className="section-caption-wrap mb-6 md:mb-8">
                                <div className="section-caption inline-flex items-center justify-center px-4 py-1.5 md:py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
                                    <div className="section-caption-text text-xs md:text-sm font-medium text-slate-300"><strong>Canvas Bd</strong> — Video Production Agency</div>
                                </div>
                            </div>
                            <div data-animate data-animate-delay="200" className="hero-title-wrap max-w-[1000px] mx-auto px-2 sm:px-0">
                                <h1 className="hero-title text-[38px] leading-[1.15] sm:text-[48px] md:text-[64px] lg:text-[80px] font-bold text-white tracking-tight">
                                    Premium Video Production<br className="hidden md:block" /> & Digital Marketing
                                </h1>
                            </div>
                            <div data-animate data-animate-delay="400" className="hero-text-wrap max-w-[800px] mx-auto mt-5 md:mt-8 px-4 sm:px-0">
                                <p className="hero-text text-base sm:text-lg lg:text-xl text-slate-400 leading-relaxed font-light">
                                    Elevate your brand with cinematic video production, product photography, and data-driven digital marketing strategies. Canvas Bd delivers agency-level quality for businesses and creators.
                                </p>
                            </div>
                            <div data-animate data-animate-delay="600" className="hero-button-wrap flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-8 md:mt-12 w-full sm:w-auto px-4 sm:px-0">
                                <a href="#services" className="primary-button w-full sm:w-auto flex items-center justify-center w-inline-block px-8 py-4 rounded-full bg-gradient-to-r from-[#ff5df5] to-[#b052ff] text-white font-semibold transition-transform hover:scale-105">
                                    <div className="primary-button-text">Explore Services</div>
                                    <div className="primary-button-icon-wrap ml-2">
                                        <img loading="lazy" alt="" src="/images/685249b05d9202c4d1d30580_chevron-right.svg" className="primary-button-icon w-4 h-4" />
                                    </div>
                                </a>
                                <a href="#contact" className="video-button w-full sm:w-auto flex items-center justify-center gap-3 w-inline-block px-8 py-4 rounded-full border border-white/20 bg-white/5 text-white font-semibold backdrop-blur-sm transition-transform hover:scale-105 hover:bg-white/10">
                                    <div>Contact Us</div>
                                    <div className="video-icon-wrap flex items-center justify-center bg-white/10 rounded-full w-6 h-6">
                                        <div className="play-icon-wrap flex">
                                            <img src="/images/685ac19d86d4af5caa098875_chevron-right.svg" loading="lazy" alt="" className="play-icon w-3 h-3" />
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="hero-bg-wrap">
                        <img src="/images/68522b8a6a593cf00ba12c45_a78e81681a043478dc8025be08a9bdd2_Bg%2001.svg" loading="lazy" alt="" className="inner-hero-bg-one" />
                        <img src="/images/68522b8afb7001f33ec58e39_c711a787cc42eb29e73062dc3ca82256_Bg%2002.svg" loading="lazy" alt="" className="inner-hero-bg-two" />
                    </div>
                    <div className="hero-badge-wrapper pointer-events-none absolute inset-0 hidden lg:block z-50">
                        <div className="badge-one-wrapper absolute hover:scale-105 transition-all duration-500 cursor-pointer pointer-events-auto shadow-2xl" style={{ width: '180px', height: '180px', left: '4%', top: 'auto', bottom: '15%' }}>
                            <ServiceBadge Icon={Aperture} size={180} primaryColor="#b052ff" spinDuration="40s" />
                        </div>
                        <div className="badge-two-wrapper absolute hover:scale-105 transition-all duration-500 cursor-pointer pointer-events-auto shadow-2xl" style={{ width: '160px', height: '160px', right: '4%', bottom: '20%' }}>
                            <ServiceBadge Icon={Video} size={160} primaryColor="#34d399" spinDuration="35s" />
                        </div>
                    </div>
                </div>
            </div>
            <div data-animate data-animate-delay="800" className="ticker-wrap w-full mt-12 md:mt-16 overflow-hidden">
                <div className="hero-ticker-title text-center text-xs md:text-sm text-slate-500 uppercase tracking-widest mb-6 px-4">Trusted by growing businesses across Bangladesh</div>
                <div className="ticker-wrapper relative w-full overflow-hidden flex items-center py-6 border-y border-white/5 bg-[#0c0c0e]/40 backdrop-blur-sm">
                    {/* Gradient faders for smooth edges */}
                    <div className="absolute left-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-r from-[#0c0c0e] to-transparent z-10"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-l from-[#0c0c0e] to-transparent z-10"></div>

                    <div className="ticker-inner-wrapper flex animate-[scroll_40s_linear_infinite] whitespace-nowrap min-w-full">
                        <div className="ticker-single-wrap flex flex-shrink-0 items-center justify-around gap-12 sm:gap-16 lg:gap-24 px-6 md:px-12 w-full lg:w-auto">
                            <div className="ticker-logo text-xl md:text-2xl font-bold tracking-widest text-[#b052ff] opacity-40 hover:opacity-100 hover:text-white transition-all duration-300 flex-shrink-0 cursor-default">BENGAL</div>
                            <div className="ticker-logo text-xl md:text-2xl font-bold tracking-widest text-[#34d399] opacity-40 hover:opacity-100 hover:text-white transition-all duration-300 flex-shrink-0 cursor-default">NEXUS</div>
                            <div className="ticker-logo text-xl md:text-2xl font-bold tracking-widest text-[#ff5df5] opacity-40 hover:opacity-100 hover:text-white transition-all duration-300 flex-shrink-0 cursor-default">DYNAMICS</div>
                            <div className="ticker-logo text-xl md:text-2xl font-bold tracking-widest text-white opacity-40 hover:opacity-100 transition-all duration-300 flex-shrink-0 cursor-default">ASIATIC</div>
                            <div className="ticker-logo text-xl md:text-2xl font-bold tracking-widest text-[#b052ff] opacity-40 hover:opacity-100 hover:text-white transition-all duration-300 flex-shrink-0 cursor-default">PADMA</div>
                            <div className="ticker-logo text-xl md:text-2xl font-bold tracking-widest text-[#34d399] opacity-40 hover:opacity-100 hover:text-white transition-all duration-300 flex-shrink-0 cursor-default">CHARKA</div>
                        </div>
                        <div className="ticker-single-wrap flex flex-shrink-0 items-center justify-around gap-12 sm:gap-16 lg:gap-24 px-6 md:px-12 w-full lg:w-auto">
                            <div className="ticker-logo text-xl md:text-2xl font-bold tracking-widest text-[#b052ff] opacity-40 hover:opacity-100 hover:text-white transition-all duration-300 flex-shrink-0 cursor-default">BENGAL</div>
                            <div className="ticker-logo text-xl md:text-2xl font-bold tracking-widest text-[#34d399] opacity-40 hover:opacity-100 hover:text-white transition-all duration-300 flex-shrink-0 cursor-default">NEXUS</div>
                            <div className="ticker-logo text-xl md:text-2xl font-bold tracking-widest text-[#ff5df5] opacity-40 hover:opacity-100 hover:text-white transition-all duration-300 flex-shrink-0 cursor-default">DYNAMICS</div>
                            <div className="ticker-logo text-xl md:text-2xl font-bold tracking-widest text-white opacity-40 hover:opacity-100 transition-all duration-300 flex-shrink-0 cursor-default">ASIATIC</div>
                            <div className="ticker-logo text-xl md:text-2xl font-bold tracking-widest text-[#b052ff] opacity-40 hover:opacity-100 hover:text-white transition-all duration-300 flex-shrink-0 cursor-default">PADMA</div>
                            <div className="ticker-logo text-xl md:text-2xl font-bold tracking-widest text-[#34d399] opacity-40 hover:opacity-100 hover:text-white transition-all duration-300 flex-shrink-0 cursor-default">CHARKA</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
