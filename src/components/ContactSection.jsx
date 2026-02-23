import { useEffect, useRef, useState } from 'react';
import { supabase, supabaseAnon } from '../lib/supabase';

export default function ContactSection() {
    const sectionRef = useRef(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'
    const [errorMessage, setErrorMessage] = useState('');
    const [companyData, setCompanyData] = useState(null);
    const [servicesData, setServicesData] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);
        setErrorMessage('');

        const formData = new FormData(e.target);
        const data = {
            name: formData.get('name'),
            phone: formData.get('phone'),
            email: formData.get('email'),
            service: formData.get('service'),
            message: formData.get('message')
        };

        try {
            const { error } = await supabaseAnon
                .from('contacts')
                .insert([data]);

            if (error) throw error;

            setSubmitStatus('success');
            e.target.reset();
        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitStatus('error');
            setErrorMessage(error.message || 'Unknown database error occurred.');
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        async function loadData() {
            const { data: cData } = await supabase.from('company_info').select('*').single();
            if (cData) setCompanyData(cData);

            const { data: sData } = await supabase.from('services').select('*').order('created_at', { ascending: true });
            if (sData) setServicesData(sData);
        }
        loadData();

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
            { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
        );

        elements.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <div id="contact" ref={sectionRef}>
            {/* Premium Success Modal */}
            {submitStatus === 'success' && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-[#0c0c0e]/80 backdrop-blur-md"
                        onClick={() => setSubmitStatus(null)}
                    ></div>

                    {/* Modal Content */}
                    <div
                        className="relative w-full max-w-sm sm:max-w-md bg-[#16161a] border border-white/5 p-8 flex flex-col items-center text-center shadow-[0_0_50px_rgba(52,211,153,0.1)] rounded-3xl transform transition-all"
                        style={{ animation: 'modalSlideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
                    >
                        {/* Glowing orb behind icon */}
                        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-emerald-500/20 blur-[40px] rounded-full pointer-events-none"></div>

                        {/* Custom SVG Checkmark */}
                        <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6 relative">
                            <svg className="w-10 h-10 text-emerald-400 z-10 drop-shadow-[0_0_12px_rgba(52,211,153,0.8)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 6L9 17l-5-5" strokeDasharray="30" strokeDashoffset="30" style={{ animation: 'dashCheck 0.6s 0.2s ease-out forwards' }} />
                            </svg>
                        </div>

                        <h3 className="text-2xl font-bold font-serif text-white tracking-tight mb-3 relative z-10">Message Sent!</h3>
                        <p className="text-slate-400 text-sm mb-8 leading-relaxed max-w-[280px] relative z-10">
                            We've received your request and will get back to you within 24 hours.
                        </p>

                        <button
                            onClick={() => setSubmitStatus(null)}
                            className="w-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 font-medium py-3.5 px-6 rounded-xl transition-all border border-emerald-500/20 relative z-10 hover:shadow-[0_0_20px_rgba(52,211,153,0.2)]"
                        >
                            Done
                        </button>
                    </div>

                    <style dangerouslySetInnerHTML={{
                        __html: `
                        @keyframes modalSlideUp {
                            from { opacity: 0; transform: translateY(20px) scale(0.95); }
                            to { opacity: 1; transform: translateY(0) scale(1); }
                        }
                        @keyframes dashCheck {
                            to { stroke-dashoffset: 0; }
                        }
                    `}} />
                </div>
            )}

            {/* Contact Form Section */}
            <section className="contact-form-section">
                <img src="/images/68522b8afb7001f33ec58e39_c711a787cc42eb29e73062dc3ca82256_Bg%2002.svg" loading="lazy" alt="" className="contact-form-bg-decor" />
                <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
                    <div data-animate className="contact-form-card">
                        <div className="contact-form-header">
                            <h2 className="contact-section-title">Send Us a Message</h2>
                            <p className="contact-section-text">Tell us about your project and we'll get back to you within 24 hours.</p>
                        </div>
                        <form className="contact-form" onSubmit={handleSubmit}>
                            {submitStatus === 'error' && (
                                <div className="form-error-message" style={{ padding: '16px', background: 'rgba(248, 113, 113, 0.1)', color: '#f87171', borderRadius: '8px', marginBottom: '24px', textAlign: 'center', wordBreak: 'break-word' }}>
                                    Oops! Something went wrong: {errorMessage}
                                </div>
                            )}
                            <div className="contact-form-row">
                                <div className="contact-form-field">
                                    <label htmlFor="contact-name" className="contact-label">Full Name</label>
                                    <input type="text" id="contact-name" name="name" className="contact-input" placeholder="Your full name" required disabled={isSubmitting} />
                                </div>
                                <div className="contact-form-field">
                                    <label htmlFor="contact-phone" className="contact-label">Phone Number</label>
                                    <input type="tel" id="contact-phone" name="phone" className="contact-input" placeholder="01XXXXXXXXX" required disabled={isSubmitting} />
                                </div>
                            </div>
                            <div className="contact-form-field">
                                <label htmlFor="contact-email" className="contact-label">Email Address</label>
                                <input type="email" id="contact-email" name="email" className="contact-input" placeholder="you@example.com" required disabled={isSubmitting} />
                            </div>
                            <div className="contact-form-field">
                                <label htmlFor="contact-service" className="contact-label">Service Interested In</label>
                                <select id="contact-service" name="service" className="contact-input contact-select" disabled={isSubmitting}>
                                    <option value="">Select a service</option>
                                    {servicesData.map(service => (
                                        <option key={service.id} value={service.title}>{service.title}</option>
                                    ))}
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div className="contact-form-field">
                                <label htmlFor="contact-message" className="contact-label">Your Message</label>
                                <textarea id="contact-message" name="message" className="contact-input contact-textarea" placeholder="Tell us about your project..." rows="5" required disabled={isSubmitting}></textarea>
                            </div>
                            <button type="submit" className="primary-button contact-submit-btn w-inline-block" disabled={isSubmitting} style={{ opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}>
                                <div className="primary-button-text">{isSubmitting ? 'Sending...' : 'Send Message'}</div>
                                {!isSubmitting && (
                                    <div className="primary-button-icon-wrap">
                                        <img loading="lazy" src="/images/685249b05d9202c4d1d30580_chevron-right.svg" alt="" className="primary-button-icon" />
                                        <img loading="lazy" src="/images/685249b05d9202c4d1d30580_chevron-right.svg" alt="" className="primary-button-icon-hover" />
                                    </div>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}
