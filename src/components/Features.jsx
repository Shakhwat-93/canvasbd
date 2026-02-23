import { useEffect, useRef } from 'react';
import { Aperture, Camera, Share2, Star, TrendingUp, Monitor } from 'lucide-react';

const AnimatedBadge = ({ Icon = Aperture, size = 160, primaryColor = '#b052ff', spinDuration = '30s', className = '' }) => (
    <div
        className={`relative flex items-center justify-center animate-spin ${className}`}
        style={{ width: `${size}px`, height: `${size}px`, animationDuration: spinDuration, animationTimingFunction: 'linear' }}
    >
        <div className="absolute inset-0 border-[1.5px] border-dashed border-white/10 rounded-full" />
        <div className="absolute inset-[10%] border-[1.5px] border-dotted border-white/[0.07] rounded-full animate-[spin_20s_linear_infinite_reverse]" />
        <div className="absolute inset-[20%] rounded-full backdrop-blur-sm" />
        <div className="absolute inset-[30%] rounded-full flex items-center justify-center animate-[spin_25s_linear_infinite_reverse]" style={{ boxShadow: `0 0 20px ${primaryColor}33` }}>
            <Icon size={size * 0.22} style={{ color: primaryColor, opacity: 0.9 }} />
        </div>
        <div className="absolute inset-0 animate-[spin_15s_linear_infinite_reverse]">
            <div className="w-1.5 h-1.5 rounded-full absolute top-[14%] left-[14%]" style={{ backgroundColor: primaryColor, opacity: 0.6, boxShadow: `0 0 8px ${primaryColor}66` }} />
        </div>
        <div className="absolute inset-[10%] animate-[spin_10s_linear_infinite]">
            <div className="w-1 h-1 bg-white/40 rounded-full absolute -top-[2px] left-1/2 -translate-x-1/2 shadow-[0_0_6px_rgba(255,255,255,0.3)]" />
        </div>
    </div>
);

const ServiceCard = ({ title, description, icon: Icon, color, delay, span = "col-span-1" }) => (
    <div
        data-animate
        data-animate-delay={delay}
        className={`${span} group relative bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 transition-all duration-500 hover:bg-white/[0.03] hover:border-white/10 hover:-translate-y-2 overflow-hidden flex flex-col`}
    >
        {/* Subtle glow effect on hover */}
        <div
            className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[100px] opacity-0 group-hover:opacity-[0.05] transition-opacity duration-700"
            style={{ backgroundColor: color }}
        />

        <div className="relative z-10 flex flex-col h-full flex-grow">
            <div className="flex items-center justify-between mb-6 md:mb-8">
                <div className="relative w-[80px] h-[80px] md:w-[100px] md:h-[100px] flex items-center justify-center">
                    <AnimatedBadge Icon={Icon} size={100} primaryColor={color} spinDuration="35s" className="scale-[0.8] md:scale-100 origin-center" />
                </div>
            </div>

            <div className="mt-auto flex-grow flex flex-col">
                <h3 className="text-xl lg:text-2xl font-extrabold text-white mb-3 tracking-tight transition-colors duration-300" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                    {title}
                </h3>
                <p className="text-slate-300 leading-relaxed text-sm lg:text-base mb-6 group-hover:text-slate-200 transition-colors">
                    {description}
                </p>
                <div
                    className="h-1 w-12 rounded-full bg-white/10 transition-all duration-500 group-hover:w-full group-hover:bg-white/20"
                />
            </div>
        </div>
    </div>
);

export default function Features() {
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
            { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
        );

        elements.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const services = [
        {
            title: "Cinematic Video Production",
            description: "High-end cinematic videos, corporate films, product showcases, and motion graphics crafted to captivate your audience.",
            icon: Aperture,
            color: "#a78bfa",
            delay: "100"
        },
        {
            title: "Product Photography",
            description: "Professional product photography with retouching — perfect for e-commerce, catalogs, and social media content.",
            icon: Camera,
            color: "#a78bfa",
            delay: "150"
        },
        {
            title: "Digital Marketing & SEO",
            description: "Strategic marketing, Google Business Profile optimization, on-page SEO, and full 360° branding solutions.",
            icon: TrendingUp,
            color: "#a78bfa",
            delay: "200"
        },
        {
            title: "Social Media Management",
            description: "Complete social media post design, scheduling, and page management to keep your brand active and engaging.",
            icon: Share2,
            color: "#a78bfa",
            delay: "250"
        },
        {
            title: "Website Development",
            description: "Standard WordPress sites and Pro sites with appointment systems — professionally built for your business.",
            icon: Monitor,
            color: "#a78bfa",
            delay: "300"
        },
        {
            title: "Personal Branding",
            description: "Tailored branding for Doctors, Lawyers, and Business professionals — video content, photoshoots, and strategy.",
            icon: Star,
            color: "#a78bfa",
            delay: "350"
        }
    ];

    return (
        <section className="feature py-16 md:py-24" id="services" ref={sectionRef}>
            <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
                <div className="feature-wrapper flex flex-col items-center">
                    <div data-animate className="feature-top-wrapper text-center max-w-[800px] mx-auto mb-12 md:mb-16">
                        <div className="feature-title-wrap mb-4 md:mb-6">
                            <h2 className="feature-title text-3xl md:text-5xl lg:text-[56px] font-bold leading-tight">Our Services</h2>
                        </div>
                        <div className="feature-text-wrap px-2 sm:px-0">
                            <p className="feature-text text-base md:text-lg lg:text-xl text-slate-400 font-light leading-relaxed">From cinematic storytelling to data-driven marketing, we provide end-to-end services designed to elevate your brand.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {services.map((service, index) => (
                            <ServiceCard key={index} {...service} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
