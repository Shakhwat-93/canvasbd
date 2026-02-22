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
            <div className="container">
                <img src="/images/68591edebc6b6874a4c10327_Hero%20Bg.png" loading="lazy" alt="" className="hero-bg" />
                <div className="hero-wrapper">
                    <div className="hero-content-wrapper">
                        <div className="hero-content-wrap">
                            <div className="section-caption-wrap">
                                <div className="section-caption">
                                    <div className="section-caption-text"><strong>Canvas Bd</strong> — Video Production Agency</div>
                                </div>
                            </div>
                            <div data-animate data-animate-delay="200" className="hero-title-wrap">
                                <h1 className="hero-title">Premium Video Production<br />& Digital Marketing</h1>
                            </div>
                            <div data-animate data-animate-delay="400" className="hero-text-wrap">
                                <p className="hero-text">Elevate your brand with cinematic video production, product photography, and data-driven digital marketing strategies. Canvas Bd delivers agency-level quality for businesses and creators.</p>
                            </div>
                            <div data-animate data-animate-delay="600" className="hero-button-wrap">
                                <a href="#services" className="primary-button w-inline-block">
                                    <div className="primary-button-text">Explore Services</div>
                                    <div className="primary-button-icon-wrap">
                                        <img loading="lazy" alt="" src="/images/685249b05d9202c4d1d30580_chevron-right.svg" className="primary-button-icon" />
                                        <img loading="lazy" src="/images/685249b05d9202c4d1d30580_chevron-right.svg" alt="" className="primary-button-icon-hover" />
                                    </div>
                                </a>
                                <a href="#contact" className="video-button w-inline-block">
                                    <div>Contact Us</div>
                                    <div className="video-icon-wrap">
                                        <div className="play-icon-wrap">
                                            <img src="/images/685ac19d86d4af5caa098875_chevron-right.svg" loading="lazy" alt="" className="play-icon" />
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
                    <div className="hero-badge-wrapper">
                        <div className="badge-one-wrapper home-badge-one hover:scale-105 transition-transform duration-500 cursor-pointer" style={{ width: '240px', height: '240px' }}>
                            <ServiceBadge Icon={Aperture} size={240} primaryColor="#b052ff" spinDuration="40s" />
                        </div>
                        <div className="badge-two-wrapper home-badge-two hover:scale-105 transition-transform duration-500 cursor-pointer" style={{ width: '220px', height: '220px' }}>
                            <ServiceBadge Icon={Video} size={220} primaryColor="#34d399" spinDuration="35s" />
                        </div>
                    </div>
                </div>
            </div>
            <div data-animate data-animate-delay="800" className="ticker-wrap">
                <div className="hero-ticker-title">Trusted by growing businesses across Bangladesh</div>
                <div className="ticker-wrapper">
                    <div className="ticker-inner-wrapper">
                        <div className="ticker-single-wrap">
                            <img src="/images/6854d4407a1b8e3961305a9e_Ticker%20Logo-4.png" loading="lazy" alt="" className="ticker-logo" />
                            <img src="/images/6854d440bba96bb53cd9ff54_Ticker%20Logo-1.png" loading="lazy" alt="" className="ticker-logo" />
                            <img src="/images/6854d4400b48ee3832656b74_Ticker%20Logo-2.png" loading="lazy" alt="" className="ticker-logo" />
                            <img src="/images/6854d44042e64e70e0d1a62f_Ticker%20Logo-3.png" loading="lazy" alt="" className="ticker-logo" />
                            <img src="/images/6854d4407a1b8e3961305a9e_Ticker%20Logo-4.png" loading="lazy" alt="" className="ticker-logo" />
                            <img src="/images/6854d4400b48ee3832656b74_Ticker%20Logo-2.png" loading="lazy" alt="" className="ticker-logo" />
                        </div>
                        <div className="ticker-single-wrap">
                            <img src="/images/6854d4407a1b8e3961305a9e_Ticker%20Logo-4.png" loading="lazy" alt="" className="ticker-logo" />
                            <img src="/images/6854d440bba96bb53cd9ff54_Ticker%20Logo-1.png" loading="lazy" alt="" className="ticker-logo" />
                            <img src="/images/6854d4400b48ee3832656b74_Ticker%20Logo-2.png" loading="lazy" alt="" className="ticker-logo" />
                            <img src="/images/6854d44042e64e70e0d1a62f_Ticker%20Logo-3.png" loading="lazy" alt="" className="ticker-logo" />
                            <img src="/images/6854d4407a1b8e3961305a9e_Ticker%20Logo-4.png" loading="lazy" alt="" className="ticker-logo" />
                            <img src="/images/6854d4400b48ee3832656b74_Ticker%20Logo-2.png" loading="lazy" alt="" className="ticker-logo" />
                        </div>
                    </div>
                    <img src="/images/685920f55e4103826e13d6f2_Ticker%20Bg.png" loading="lazy" alt="" className="ticker-bg-image" />
                </div>
            </div>
        </section>
    );
}
