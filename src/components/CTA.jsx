import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';

export default function CTA() {
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
            { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
        );

        elements.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <section className="cta" ref={sectionRef}>
            <div className="container">
                <div className="cta-wrapper">
                    <img src="/images/685c1fddb0264017076ee51a_Tab%20Bg.png" loading="lazy" alt="" className="cta-tab-mobile-bg" />
                    <img src="/images/6854009798ec7fdca431ea31_64e0a240c7d384c0038a48af39dffc78_CTA%20Bg.png" loading="lazy" alt="" className="cta-bg-image" />
                    <div className="cta-content-wrapper">
                        <div className="cta-content-grid-wrap hide-on-desktop">
                            <div data-animate className="cta-image-wrap">
                                <img src="/images/685403aa9427cffcef998063_cfdd46dd0e52074338cf995fd12cc90c_CTA%20Bg%20Image.png" loading="lazy" alt="" className="cta-image" />
                            </div>
                            <div data-animate data-animate-delay="200" className="cta-left-wrapper">
                                <div className="cta-title-wrap">
                                    <h2 className="cta-title">Ready to Elevate Your Brand?</h2>
                                </div>
                                <div className="cta-text-wrap">
                                    <p className="cta-text">Start with a free consultation. Tell us about your business and let Canvas Bd craft the perfect video and marketing solution for your brand.</p>
                                </div>
                                <div className="cta-button-wrap">
                                    <Link to="/contact" className="primary-button w-inline-block">
                                        <div className="primary-button-text">Get Started Today</div>
                                        <div className="primary-button-icon-wrap">
                                            <img loading="lazy" src="/images/685249b05d9202c4d1d30580_chevron-right.svg" alt="" className="primary-button-icon" />
                                            <img loading="lazy" src="/images/685249b05d9202c4d1d30580_chevron-right.svg" alt="" className="primary-button-icon-hover" />
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="cta-content-grid-wrap hide-tab-mobile">
                            <div data-animate className="cta-image-wrap">
                                <img src="/images/685403aa9427cffcef998063_cfdd46dd0e52074338cf995fd12cc90c_CTA%20Bg%20Image.png" loading="lazy" alt="" className="cta-image" />
                            </div>
                            <div data-animate data-animate-delay="200" className="cta-left-wrapper">
                                <div className="cta-title-wrap">
                                    <h2 className="cta-title">Ready to Elevate Your Brand?</h2>
                                </div>
                                <div className="cta-text-wrap">
                                    <p className="cta-text">Start with a free consultation. Tell us about your business and let Canvas Bd craft the perfect video and marketing solution for your brand.</p>
                                </div>
                                <div className="cta-button-wrap">
                                    <Link to="/contact" className="primary-button w-inline-block">
                                        <div className="primary-button-text">Get Started Today</div>
                                        <div className="primary-button-icon-wrap">
                                            <img loading="lazy" src="/images/685249b05d9202c4d1d30580_chevron-right.svg" alt="" className="primary-button-icon" />
                                            <img loading="lazy" src="/images/685249b05d9202c4d1d30580_chevron-right.svg" alt="" className="primary-button-icon-hover" />
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
