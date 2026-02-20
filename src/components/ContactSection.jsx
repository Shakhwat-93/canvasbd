import { useEffect, useRef, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function ContactSection() {
    const sectionRef = useRef(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'
    const [companyData, setCompanyData] = useState(null);
    const [servicesData, setServicesData] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        const formData = new FormData(e.target);
        const data = {
            name: formData.get('name'),
            phone: formData.get('phone'),
            email: formData.get('email'),
            service: formData.get('service'),
            message: formData.get('message')
        };

        try {
            const { error } = await supabase
                .from('contacts')
                .insert([data]);

            if (error) throw error;

            setSubmitStatus('success');
            e.target.reset();
        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitStatus('error');
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
                            {submitStatus === 'success' && (
                                <div className="form-success-message" style={{ padding: '16px', background: 'rgba(52, 211, 153, 0.1)', color: '#34d399', borderRadius: '8px', marginBottom: '24px', textAlign: 'center' }}>
                                    Thank you! Your message has been sent successfully. We will get back to you shortly.
                                </div>
                            )}
                            {submitStatus === 'error' && (
                                <div className="form-error-message" style={{ padding: '16px', background: 'rgba(248, 113, 113, 0.1)', color: '#f87171', borderRadius: '8px', marginBottom: '24px', textAlign: 'center' }}>
                                    Oops! Something went wrong. Please try again or contact us directly.
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
