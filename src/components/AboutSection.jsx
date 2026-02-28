import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const stats = [
    { label: 'Projects Delivered', value: '50+' },
    { label: 'Years Experience', value: '5+' },
    { label: 'Client Satisfaction', value: '100%' },
    { label: 'Expert Creators', value: '15+' },
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
                    <motion.div variants={itemVariants} className="w-full text-center md:text-left">
                        <div className="mb-6 flex justify-center md:justify-start">
                            <div className="inline-flex items-center justify-center px-5 py-2 rounded-full border border-white/10 bg-[#16161a] backdrop-blur-md">
                                <span className="text-xs md:text-sm font-medium text-slate-300">About Us</span>
                            </div>
                        </div>

                        <h2 className="feature-title text-center md:text-left text-4xl sm:text-5xl md:text-[56px] font-bold leading-tight mb-6 md:mb-8 text-white">
                            Crafting Cinematic <span className="text-[#735ff4]">Digital Excellence</span>
                        </h2>

                        <div className="feature-text-wrap text-center md:text-left w-full mb-8 md:mb-10">
                            <p className="feature-text text-center md:text-left text-base md:text-lg leading-[1.8] text-[#d1d3df] mb-6 font-light">
                                Canvas Bd isn't just a production house; we are architectural storytellers. Founded in Dhaka, we've spent over a decade redefining how brands connect with their audiences through the power of cinematic video and data-driven marketing.
                            </p>
                            <p className="feature-text text-center md:text-left text-base md:text-lg leading-[1.8] text-[#d1d3df] font-light">
                                Our mission is to bridge the gap between imagination and reality, providing premium visual solutions that don't just look beautiful but drive measurable business results.
                            </p>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-4 md:gap-6 mt-10 md:mt-12">
                            {stats.map((stat, idx) => (
                                <motion.div
                                    key={idx}
                                    variants={itemVariants}
                                    className="bg-[#15141b] border border-[#2b2746] rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center text-center hover:bg-[#1a1922] transition-colors"
                                    style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}
                                >
                                    <h4 className="text-[28px] md:text-[34px] text-white font-bold mb-2 tracking-tight">{stat.value}</h4>
                                    <p className="text-[11px] md:text-[13px] text-[#a5a7be] uppercase tracking-wider font-semibold m-0">{stat.label}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Column: Visual */}
                    <motion.div
                        variants={itemVariants}
                        className="relative w-full mt-8 lg:mt-0 flex items-center justify-center"
                    >
                        {/* Decorative Background Glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] -z-10 bg-[radial-gradient(circle,rgba(115,95,244,0.15)_0%,transparent_60%)] pointer-events-none" />

                        {/* Structured Image Grid Layout WITHOUT Overlap */}
                        <div className="grid grid-cols-2 gap-3 md:gap-5 w-full relative z-10 items-center">

                            {/* Top Row Images */}
                            <motion.div variants={itemVariants} className="rounded-2xl md:rounded-[32px] overflow-hidden border border-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.5)] group relative bg-[#15141b]">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" />
                                <img
                                    src="/images/476316846_122117083454647030_8129846891993556987_n.jpg"
                                    alt="Canvas Bd Studio Work 1"
                                    className="w-full h-full object-cover transform transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105 aspect-[4/3]"
                                />
                            </motion.div>

                            <motion.div variants={itemVariants} className="rounded-2xl md:rounded-[32px] overflow-hidden border border-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.5)] group relative bg-[#15141b]">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" />
                                <img
                                    src="/images/476334767_122117083400647030_5966088526768903702_n.jpg"
                                    alt="Canvas Bd Studio Work 2"
                                    className="w-full h-full object-cover transform transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105 aspect-[4/3]"
                                />
                            </motion.div>

                            {/* Center Native Text Divider (No Overlap!) */}
                            <motion.div
                                variants={itemVariants}
                                className="col-span-2 w-full py-2 md:py-6 flex justify-center items-center"
                            >
                                <div className="w-[95%] sm:w-[85%] bg-[#151416]/40 backdrop-blur-md border border-white/5 rounded-xl md:rounded-2xl p-4 md:p-6 text-center select-none shadow-[0_10px_30px_rgba(0,0,0,0.4)] relative mt-2 mb-2 md:mt-0 md:mb-0">
                                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#735ff4]/20 via-transparent to-[#735ff4]/20 rounded-xl md:rounded-2xl blur opacity-30 -z-10"></div>
                                    <p className="text-xs sm:text-sm md:text-lg italic m-0 font-light text-white/95 leading-relaxed tracking-wide">
                                        "We don't just make videos; we <span className="text-[#735ff4] font-medium">build visual legacies</span><br className="hidden md:block" /> for the digital era."
                                    </p>
                                </div>
                            </motion.div>

                            {/* Bottom Row Images */}
                            <motion.div variants={itemVariants} className="rounded-2xl md:rounded-[32px] overflow-hidden border border-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.5)] group relative bg-[#15141b]">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" />
                                <img
                                    src="/images/476116982_122117083562647030_6355798035642348734_n.jpg"
                                    alt="Canvas Bd Studio Work 3"
                                    className="w-full h-full object-cover transform transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105 aspect-[4/3]"
                                />
                            </motion.div>

                            <motion.div variants={itemVariants} className="rounded-2xl md:rounded-[32px] overflow-hidden border border-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.5)] group relative bg-[#15141b]">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" />
                                <img
                                    src="/images/476116982_122117083562647030_6355798035642348734_n (1).jpg"
                                    alt="Canvas Bd Studio Work 4"
                                    className="w-full h-full object-cover transform transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105 aspect-[4/3]"
                                />
                            </motion.div>

                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
