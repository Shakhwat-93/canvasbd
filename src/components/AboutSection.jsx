import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const stats = [
    { label: 'Projects Delivered', value: '500+' },
    { label: 'Years Experience', value: '10+' },
    { label: 'Client Satisfaction', value: '100%' },
    { label: 'Expert Creators', value: '25+' },
];

export default function AboutSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        },
    };

    return (
        <section id="about" className="feature py-20 md:py-[120px] bg-[#151416] overflow-hidden">
            <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
                <motion.div
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-center"
                >
                    {/* Left Column: Content */}
                    <motion.div variants={itemVariants} className="w-full">
                        <div className="section-caption-wrap mb-6">
                            <div className="section-caption inline-flex items-center justify-center px-4 py-1.5 md:py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
                                <div className="section-caption-text text-xs md:text-sm font-medium text-slate-300"><strong>Our</strong> Story</div>
                            </div>
                        </div>

                        <h2 className="feature-title text-4xl sm:text-5xl md:text-[56px] font-bold leading-tight mb-6 md:mb-8 text-white">
                            Crafting Cinematic <br className="hidden sm:block" />
                            <span className="text-[#735ff4]">Digital Excellence</span>
                        </h2>

                        <div className="feature-text-wrap w-full mb-8 md:mb-10">
                            <p className="feature-text text-base md:text-lg leading-[1.8] text-[#d1d3df] mb-6 font-light">
                                Canvas Bd isn't just a production house; we are architectural storytellers. Founded in Dhaka, we've spent over a decade redefining how brands connect with their audiences through the power of cinematic video and data-driven marketing.
                            </p>
                            <p className="feature-text text-base md:text-lg leading-[1.8] text-[#d1d3df] font-light">
                                Our mission is to bridge the gap between imagination and reality, providing premium visual solutions that don't just look beautiful but drive measurable business results.
                            </p>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-4 md:gap-6 mt-10 md:mt-12">
                            {stats.map((stat, idx) => (
                                <motion.div
                                    key={idx}
                                    variants={itemVariants}
                                    className="bg-[#1b1b25] border border-[#302c4f] rounded-2xl p-5 md:p-6 text-center hover:bg-[#20202c] transition-colors"
                                >
                                    <h4 className="text-3xl md:text-[32px] text-white/90 mb-1 lg:mb-2 font-extrabold">{stat.value}</h4>
                                    <p className="text-[10px] md:text-xs text-[#a5a7be] uppercase tracking-wider md:tracking-[0.1em] font-semibold">{stat.label}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Column: Visual */}
                    <motion.div
                        variants={itemVariants}
                        className="relative w-full mt-8 lg:mt-0"
                    >
                        <div className="relative rounded-3xl overflow-hidden border border-[#302c4f] shadow-[0_20px_40px_rgba(0,0,0,0.5)] lg:shadow-[0_32px_64px_rgba(0,0,0,0.4)]">
                            <img
                                src="/premium_agency_about_visual.png"
                                alt="Canvas Bd Studio"
                                className="w-full h-auto block object-cover"
                            />
                            {/* Glassmorphism Overlay Card */}
                            <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 bg-[#151416]/40 backdrop-blur-xl border border-white/10 rounded-2xl p-4 md:p-5 text-white">
                                <p className="text-xs md:text-sm italic m-0 font-light leading-relaxed">
                                    "We don't just make videos; we build visual legacies for the digital era."
                                </p>
                            </div>
                        </div>

                        {/* Decorative Background Glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] -z-10 bg-[radial-gradient(circle,rgba(115,95,244,0.1)_0%,transparent_70%)] pointer-events-none" />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
