import { motion } from 'framer-motion';

const Subscriptions = () => {
    const plans = [
        {
            name: "STARTER",
            subtitle: "(BASIC)",
            price: "15,000 BDT",
            period: "per month*",
            badge: "Best for solo creators",
            features: [
                "3 Video Contents",
                "5 Social Media Posts",
                "3 Professional Photoshoot",
                "Local SEO (GBP)",
                "Concept Development, Scripting, and Planning",
                "Monthly update"
            ],
            featured: false
        },
        {
            name: "PROFESSIONAL",
            subtitle: "(ELITE)",
            price: "50,000 BDT",
            period: "per month*",
            badge: "Most popular plan",
            features: [
                "10 Premium Cinematic Videos",
                "12 High-End Branded Posts",
                "10 Professional Photoshoot",
                "Website",
                "Full SEO",
                "Full 360 Branding",
                "Priority (24/7 Support)",
                "FB Management support"
            ],
            featured: true
        },
        {
            name: "STANDARD",
            subtitle: "(GROWTH)",
            price: "30,000 BDT",
            period: "per month*",
            badge: "Best for solo creators",
            features: [
                "6 Video Contents",
                "10 Social Media Posts",
                "5 Professional Photoshoot",
                "Website",
                "On-Page + Technical SEO",
                "FB Management support",
                "Concept Development, Scripting, and Planning"
            ],
            featured: false
        }
    ];

    return (
        <section className="relative py-24 overflow-hidden bg-[#050505]">
            {/* Background Ornaments */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600 rounded-full blur-[120px]" />
            </div>

            <div className="container relative z-10 mx-auto px-6">
                <div className="text-center mb-16 px-4">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight"
                    >
                        PERSONAL BRANDING <span className="text-blue-500">SUBSCRIPTIONS</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg md:text-xl text-white/60 font-medium uppercase tracking-widest"
                    >
                        (DOCTORS, LAWYERS, BUSINESS MAN AND OTHER PROFESSIONS)
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className={`relative flex flex-col p-8 rounded-[2.5rem] border transition-all duration-500 ${plan.featured
                                    ? 'bg-[#0a122a] border-blue-500/50 shadow-[0_0_40px_rgba(59,130,246,0.2)]'
                                    : 'bg-[#121218] border-white/5 hover:border-white/20'
                                }`}
                        >
                            {plan.featured && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-widest whitespace-nowrap">
                                    Most Popular
                                </div>
                            )}

                            <div className="text-center mb-10">
                                <h3 className="text-xl font-bold text-white mb-1 uppercase tracking-wider">{plan.name}</h3>
                                <p className="text-sm text-blue-400 font-semibold mb-4 tracking-widest">{plan.subtitle}</p>

                                <div className="text-4xl font-black text-white mb-1">
                                    {plan.price}
                                </div>
                                <p className="text-xs text-white/40 mb-4">{plan.period}</p>

                                <div className="inline-block px-4 py-2 bg-white/5 rounded-xl text-xs font-medium text-white/70 border border-white/5">
                                    {plan.badge}
                                </div>
                            </div>

                            <div className="flex-grow space-y-4 mb-10">
                                {plan.features.map((feature, fIndex) => (
                                    <div key={fIndex} className="flex items-start gap-4">
                                        <div className="p-1 rounded-full bg-blue-500/10 border border-blue-500/20 mt-1">
                                            <svg className="w-3 h-3 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="text-sm text-white/80 leading-snug">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <button className={`w-full py-4 rounded-2xl font-bold transition-all duration-300 ${plan.featured
                                    ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/25'
                                    : 'bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20'
                                }`}>
                                Get Started
                            </button>
                        </motion.div>
                    ))}
                </div>

                {/* Note Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-20 p-8 md:p-12 rounded-[2rem] bg-gradient-to-br from-[#121218] to-transparent border border-white/5"
                >
                    <h4 className="text-xl font-bold text-blue-500 mb-6 uppercase tracking-wider">NOTE :</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            "Domain and hosting costs are not included.",
                            "Facebook ad budget (dollars) is not included in the package.",
                            "The shoot will be completed in one day (maximum two days).",
                            "For outdoor shoots, an additional 2,000 BDT will be charged each time."
                        ].map((note, nIndex) => (
                            <li key={nIndex} className="flex gap-4 items-start text-white/60">
                                <span className="text-blue-500 font-bold">{nIndex + 1}.</span>
                                <span className="text-sm leading-relaxed">{note}</span>
                            </li>
                        ))}
                    </ul>
                </motion.div>
            </div>
        </section>
    );
};

export default Subscriptions;
