import Header from '../components/Header';
import { useEffect, useRef, useState } from 'react';
import { supabase, supabaseAnon } from '../lib/supabase';

export default function Contact() {
    const pageRef = useRef(null);
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

        const page = pageRef.current;
        if (!page) return;

        const elements = page.querySelectorAll('[data-animate]');
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

    // Provide default fallbacks if companyData is not yet loaded
    const locationPallabi = companyData?.locations?.pallabi || { name: 'Pallabi Office', address: 'Loading...' };
    const locationUttara = companyData?.locations?.uttara || { name: 'Uttara Office', address: 'Loading...' };
    const locationFactory = companyData?.locations?.factory || { name: 'Factory', address: 'Loading...' };
    const contactEmail = companyData?.email || 'CANVASBAGBD@GMAIL.COM';

    return (
        <div ref={pageRef}>
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

            {/* Contact Hero */}
            <section className="hero">
                <Header />
                <div className="hero-bg-wrap">
                    <img src="/images/6852646611e36b1678be4ae5_Line%20Top%20.png" loading="lazy" alt="" className="hero-top-line" />
                    <img src="/images/685920364c1582a50dfd1c22_Hero%20Line.png" loading="lazy" alt="" className="inner-hero-line-two blog-hero-line-two" />
                    <img src="/images/685920354395baf031c46519_Hero%20Line-1.png" loading="lazy" alt="" className="inner-hero-line-one blog-hero-line-one" />
                </div>
                <div className="container">
                    <div className="hero-wrapper">
                        <div className="hero-content-wrapper">
                            <div className="hero-content-wrap">
                                <div className="section-caption-wrap">
                                    <div className="section-caption">
                                        <div className="section-caption-text"><strong>Contact</strong> Us</div>
                                    </div>
                                </div>
                                <div data-animate data-animate-delay="200" className="hero-title-wrap">
                                    <h1 className="hero-title">Get In Touch<br />With Canvas Bd</h1>
                                </div>
                                <div data-animate data-animate-delay="400" className="hero-text-wrap">
                                    <p className="hero-text">Have a project in mind? Reach out to us via phone, email, or visit one of our offices. We'd love to hear about your brand and help you grow.</p>
                                </div>
                            </div>
                        </div>
                        <div className="hero-bg-wrap">
                            <img src="/images/68522b8a6a593cf00ba12c45_a78e81681a043478dc8025be08a9bdd2_Bg%2001.svg" loading="lazy" alt="" className="inner-hero-bg-one" />
                            <img src="/images/68522b8afb7001f33ec58e39_c711a787cc42eb29e73062dc3ca82256_Bg%2002.svg" loading="lazy" alt="" className="inner-hero-bg-two" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Details Section */}
            <section className="contact-section">
                <div className="container">
                    <div className="contact-section-inner">
                        <div data-animate className="contact-section-header">
                            <h2 className="contact-section-title">Contact Information</h2>
                            <p className="contact-section-text">Call us, email us, or visit our offices — we're here to help you every step of the way.</p>
                        </div>

                        <div className="contact-info-grid">
                            {/* Phone Card */}
                            <div data-animate data-animate-delay="100" className="contact-card">
                                <div className="contact-card-icon-wrap">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                    </svg>
                                </div>
                                <div className="contact-card-content">
                                    <h3 className="contact-card-title">Phone Numbers</h3>
                                    <a href="tel:01626777744" className="contact-card-link">01626777744</a>
                                    <a href="tel:01990081308" className="contact-card-link">01990-081308</a>
                                </div>
                            </div>

                            {/* Email Card */}
                            <div data-animate data-animate-delay="200" className="contact-card">
                                <div className="contact-card-icon-wrap">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect width="20" height="16" x="2" y="4" rx="2" />
                                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                    </svg>
                                </div>
                                <div className="contact-card-content">
                                    <h3 className="contact-card-title">Email</h3>
                                    <a href={`mailto:${contactEmail}`} className="contact-card-link uppercase">{contactEmail}</a>
                                </div>
                            </div>

                            {/* Website Card */}
                            <div data-animate data-animate-delay="300" className="contact-card">
                                <div className="contact-card-icon-wrap">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10" />
                                        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                                        <path d="M2 12h20" />
                                    </svg>
                                </div>
                                <div className="contact-card-content">
                                    <h3 className="contact-card-title">Website</h3>
                                    <a href="https://canvasbangladesh.com" target="_blank" rel="noopener noreferrer" className="contact-card-link uppercase">CANVASBANGLADESH.COM</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Locations Section */}
            <section className="contact-section contact-locations-section">
                <img src="/images/68522b8a6a593cf00ba12c45_a78e81681a043478dc8025be08a9bdd2_Bg%2001.svg" loading="lazy" alt="" className="pricing-left-top-bg" />
                <div className="container">
                    <div className="contact-section-inner">
                        <div data-animate className="contact-section-header">
                            <h2 className="contact-section-title">Our Locations</h2>
                            <p className="contact-section-text">Visit us at any of our offices or factory across Dhaka</p>
                        </div>

                        <div className="contact-locations-grid">
                            {/* Pallabi Office */}
                            <div data-animate data-animate-delay="100" className="contact-location-card">
                                <div className="contact-location-badge">Office</div>
                                <div className="contact-location-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                                        <circle cx="12" cy="10" r="3" />
                                    </svg>
                                </div>
                                <h3 className="contact-location-name">{locationPallabi.name}</h3>
                                <p className="contact-location-address">{locationPallabi.address}</p>
                            </div>

                            {/* Uttara Office */}
                            <div data-animate data-animate-delay="250" className="contact-location-card">
                                <div className="contact-location-badge">Office</div>
                                <div className="contact-location-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                                        <circle cx="12" cy="10" r="3" />
                                    </svg>
                                </div>
                                <h3 className="contact-location-name">{locationUttara.name}</h3>
                                <p className="contact-location-address">{locationUttara.address}</p>
                            </div>

                            {/* Keraniganj Factory */}
                            <div data-animate data-animate-delay="400" className="contact-location-card">
                                <div className="contact-location-badge factory-badge">Factory</div>
                                <div className="contact-location-icon factory-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
                                        <path d="M17 18h1" /><path d="M12 18h1" /><path d="M7 18h1" />
                                    </svg>
                                </div>
                                <h3 className="contact-location-name">{locationFactory.name}</h3>
                                <p className="contact-location-address">{locationFactory.address}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="contact-form-section">
                <img src="/images/68522b8afb7001f33ec58e39_c711a787cc42eb29e73062dc3ca82256_Bg%2002.svg" loading="lazy" alt="" className="contact-form-bg-decor" />
                <div className="container">
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
