import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';

export default function Footer() {
    const footerRef = useRef(null);

    useEffect(() => {
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
                            <div data-animate data-animate-delay="100" className="footer-single-item">
                                <div className="footer-link-title-wrap">
                                    <div className="foote-link-title">Navigation</div>
                                </div>
                                <div className="foote-links-wrap">
                                    <a href="#top" className="footer-link">Home</a>
                                    <a href="#about" className="footer-link">About</a>
                                    <a href="#services" className="footer-link">Services</a>
                                    <a href="#pricing" className="footer-link">Pricing</a>
                                    <a href="#contact" className="footer-link">Contact</a>
                                </div>
                            </div>
                            <div data-animate data-animate-delay="200" className="footer-single-item">
                                <div className="footer-link-title-wrap">
                                    <div className="foote-link-title">Services</div>
                                </div>
                                <div className="foote-links-wrap">
                                    <a href="#services" className="footer-link">Video Production</a>
                                    <a href="#services" className="footer-link">Photography</a>
                                    <a href="#services" className="footer-link">Digital Marketing</a>
                                    <a href="#services" className="footer-link">Personal Branding</a>
                                </div>
                            </div>
                            <div data-animate data-animate-delay="300" className="footer-single-item">
                                <div className="footer-link-title-wrap">
                                    <div className="foote-link-title">Social Media</div>
                                </div>
                                <div className="social-icon-wrapper">
                                    <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="social-icon-wrap w-inline-block">
                                        <div className="social-icon"></div>
                                        <div>Facebook</div>
                                    </a>
                                    <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="social-icon-wrap w-inline-block">
                                        <div className="social-icon"></div>
                                        <div>Instagram</div>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div data-animate data-animate-delay="400" className="foote-logo-wrapper">
                            <div className="footer-logo-link">
                                <div className="brand-logo-text">Canvas Bd</div>
                            </div>
                        </div>
                        <div data-animate data-animate-delay="500" className="copyright-wrapper">
                            <div className="copyright-left-wrap">
                                <div className="copyright-text">Copyright©Canvas Bd. All rights reserved.<br /></div>
                            </div>
                            <div className="copyright-right-wrap">
                                <div className="copyright-text">© Copyright {new Date().getFullYear()} | Canvas Bd | Premium Video Production & Digital Marketing</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
