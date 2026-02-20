import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { supabase } from '../lib/supabase';

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
        <footer className="footer" ref={footerRef}>
            <div className="container">
                <div className="footer-wrapper">
                    <div data-animate className="footer-top-wrapper">
                        <div className="footer-top-left-wrapper">
                            <div className="footer-title-wrap">
                                <h2 className="footer-title">How can we help?</h2>
                            </div>
                            <div className="footer-button-wrap">
                                <a href="#contact" className="secondary-button w-inline-block">
                                    <div>Contact us</div>
                                    <div className="secondary-button-icon"></div>
                                </a>
                                <a href="#contact" className="secondary-button w-inline-block">
                                    <div>Help Center</div>
                                    <div className="secondary-button-icon"></div>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="footer-bottom-wrapper">
                        <div className="footer-items-wrapper">
                            <div data-animate className="footer-single-item">
                                <div className="footer-link-title-wrap">
                                    <div className="foote-link-title">Contact Info</div>
                                </div>
                                <div className="foote-links-wrap">
                                    {companyData && (
                                        <>
                                            <a href={`tel:${companyData.phone[0]}`} className="footer-link" style={{ display: 'block', marginBottom: '8px', whiteSpace: 'nowrap' }}>{companyData.phone[0]}</a>
                                            {companyData.phone[1] && <a href={`tel:${companyData.phone[1]}`} className="footer-link" style={{ display: 'block', marginBottom: '8px', whiteSpace: 'nowrap' }}>{companyData.phone[1]}</a>}
                                            <a href={`mailto:${companyData.email}`} className="footer-link" style={{ display: 'block', marginBottom: '8px', whiteSpace: 'nowrap' }}>{companyData.email}</a>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div data-animate data-animate-delay="100" className="footer-single-item">
                                <div className="footer-link-title-wrap">
                                    <div className="foote-link-title">Offices</div>
                                </div>
                                <div className="foote-links-wrap">
                                    {companyData?.locations?.pallabi && (
                                        <div className="footer-link" style={{ textAlign: 'right' }}>
                                            <span style={{ color: '#fff', display: 'block', marginBottom: '4px' }}>{companyData.locations.pallabi.name}</span>
                                            <span style={{ fontSize: '0.85em', opacity: 0.7, maxWidth: '250px', display: 'inline-block', lineHeight: 1.4 }}>{companyData.locations.pallabi.address}</span>
                                        </div>
                                    )}
                                    {companyData?.locations?.uttara && (
                                        <div className="footer-link" style={{ textAlign: 'right' }}>
                                            <span style={{ color: '#fff', display: 'block', marginBottom: '4px' }}>{companyData.locations.uttara.name}</span>
                                            <span style={{ fontSize: '0.85em', opacity: 0.7, maxWidth: '250px', display: 'inline-block', lineHeight: 1.4 }}>{companyData.locations.uttara.address}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div data-animate data-animate-delay="200" className="footer-single-item">
                                <div className="footer-link-title-wrap">
                                    <div className="foote-link-title">Factory</div>
                                </div>
                                <div className="foote-links-wrap">
                                    {companyData?.locations?.factory && (
                                        <div className="footer-link" style={{ textAlign: 'right' }}>
                                            <span style={{ color: '#fff', display: 'block', marginBottom: '4px' }}>{companyData.locations.factory.name}</span>
                                            <span style={{ fontSize: '0.85em', opacity: 0.7, maxWidth: '250px', display: 'inline-block', lineHeight: 1.4 }}>{companyData.locations.factory.address}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div data-animate data-animate-delay="500" className="foote-logo-wrapper">
                            <div className="footer-logo-link">
                                <img src="/images/br/logo.png" alt="Canvas Bd Logo" className="brand-logo-img" style={{ height: '100px', transform: 'scale(2.8)', objectFit: 'contain' }} />
                            </div>
                        </div>
                        <div data-animate data-animate-delay="600" className="copyright-wrapper">
                            <div className="copyright-left-wrap">
                                <div className="copyright-text">Copyright©{companyData?.name || 'Canvas Bd'}. All rights reserved.<br /></div>
                            </div>
                            <div className="copyright-right-wrap">
                                <div className="copyright-text">© Copyright {new Date().getFullYear()} | {companyData?.name || 'Canvas Bd'} | Premium Video Production & Digital Marketing</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer >
    );
}
