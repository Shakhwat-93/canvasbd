import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { services as staticServices } from '../data/services'; // fallback for tiers
import { supabase } from '../lib/supabase';

export default function Services() {
    const sectionRef = useRef(null);
    const [dbServices, setDbServices] = useState([]);
    const generalTiers = staticServices.general.tiers;

    useEffect(() => {
        async function fetchServices() {
            const { data } = await supabase.from('services').select('*').order('created_at', { ascending: true });
            if (data) setDbServices(data);
        }
        fetchServices();

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
            { threshold: 0.08, rootMargin: '0px 0px -60px 0px' }
        );

        elements.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <section className="pricing" id="pricing" ref={sectionRef}>
            <img src="/images/68522b8a6a593cf00ba12c45_a78e81681a043478dc8025be08a9bdd2_Bg%2001.svg" loading="lazy" alt="" className="pricing-left-top-bg" />
            <img src="/images/68522b8a6a593cf00ba12c45_a78e81681a043478dc8025be08a9bdd2_Bg%2001.svg" loading="lazy" alt="" className="pricing-left-bottom-bg" />
            <div className="container">
                <div className="pricing-wrapper">
                    <div data-animate className="pricing-top-wrapper">
                        <div className="pricing-title-wrap">
                            <h2 className="pricing-title">Flexible Subscription Plans<br />For Every Business</h2>
                        </div>
                        <div className="pricing-text-wrap">
                            <p className="pricing-text">Choose a plan that fits your needs — from solo creators to established businesses. All plans include professional video, photography, and marketing services.</p>
                        </div>
                    </div>
                    <div className="pricing-cards-grid-wrap">
                        {/* Starter Plan */}
                        <div data-animate data-animate-delay="100" className="pricing-card">
                            <div className="pricing-card-content-grid-wrap">
                                <div className="pricing-card-left-wrapper">
                                    <div className="pricing-card-left-top-wrap">
                                        <div className="pricing-card-title">{generalTiers[0].name}</div>
                                        <p className="pricing-card-text">{generalTiers[0].idealFor}</p>
                                    </div>
                                    <div className="pricing-card-left-bottom-wrap">
                                        <div className="pricing-card-price-wrap">
                                            <div className="pricing-card-price">{generalTiers[0].price}</div>
                                            <div className="pricing-card-price-info-text">{generalTiers[0].frequency}</div>
                                        </div>
                                        <div className="price-card-button-wrap">
                                            <a href="#contact" className="secondary-button w-inline-block">
                                                <div>Get Started</div>
                                                <div className="secondary-button-icon"></div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="pricing-card-right-wrapper">
                                    <div className="price-card-subtitle-wrap">
                                        <div className="price-card-subtitle">What's Included</div>
                                    </div>
                                    <div className="pricing-card-items-wrapper">
                                        {generalTiers[0].features.map((feature, i) => (
                                            <div key={i} className="price-card-item-wrap">
                                                <div className="price-card-icon-wrap">
                                                    <img src="/images/68564e0eee1d2c58645b2923_check.svg" loading="lazy" alt="" className="chack-icon" />
                                                </div>
                                                <div className="price-item-text">{feature}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Standard Plan (Pro) */}
                        <div data-animate data-animate-delay="250" className="pricing-card">
                            <div className="pricing-card-content-grid-wrap">
                                <div className="pricing-card-left-wrapper">
                                    <div className="pricing-card-left-top-wrap">
                                        <div className="pricing-card-title">{generalTiers[1].name}</div>
                                        <p className="pricing-card-text">{generalTiers[1].idealFor}</p>
                                    </div>
                                    <div className="pricing-card-left-bottom-wrap">
                                        <div className="pricing-card-price-wrap">
                                            <div className="pricing-card-price">{generalTiers[1].price}</div>
                                            <div className="pricing-card-price-info-text">{generalTiers[1].frequency}</div>
                                        </div>
                                        <div className="price-card-button-wrap">
                                            <a href="#contact" className="primary-button w-inline-block">
                                                <div className="primary-button-text">Choose Standard</div>
                                                <div className="primary-button-icon-wrap">
                                                    <img loading="lazy" alt="" src="/images/685249b05d9202c4d1d30580_chevron-right.svg" className="primary-button-icon" />
                                                    <img loading="lazy" src="/images/685249b05d9202c4d1d30580_chevron-right.svg" alt="" className="primary-button-icon-hover" />
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="pricing-card-right-wrapper">
                                    <div className="price-card-subtitle-wrap">
                                        <div className="price-card-subtitle">What's Included</div>
                                    </div>
                                    <div className="pricing-card-items-wrapper">
                                        {generalTiers[1].features.map((feature, i) => (
                                            <div key={i} className="price-card-item-wrap">
                                                <div className="price-card-icon-wrap">
                                                    <img src="/images/68564e0eee1d2c58645b2923_check.svg" loading="lazy" alt="" className="chack-icon" />
                                                </div>
                                                <div className="price-item-text">{feature}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Professional Plan (Enterprise) */}
                        <div data-animate data-animate-delay="400" className="pricing-card">
                            <div className="pricing-card-content-grid-wrap">
                                <div className="pricing-card-left-wrapper">
                                    <div className="pricing-card-left-top-wrap">
                                        <div className="pricing-card-caption">{generalTiers[2].name}</div>
                                        <p className="pricing-card-info-title">{generalTiers[2].idealFor} — Our most comprehensive package with premium cinematic videos, branded posts, and full marketing support.</p>
                                    </div>
                                    <div className="pricing-card-left-bottom-wrap">
                                        <div className="pricing-card-price-wrap">
                                            <div className="pricing-card-price">{generalTiers[2].price}</div>
                                            <div className="pricing-card-price-info-text">{generalTiers[2].frequency}</div>
                                        </div>
                                        <div className="price-card-button-wrap">
                                            <a href="#contact" className="secondary-button w-inline-block">
                                                <div>Contact Us</div>
                                                <div className="secondary-button-icon"></div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="pricing-card-right-wrapper">
                                    <div className="pricing-card-items-wrapper">
                                        {generalTiers[2].features.map((feature, i) => (
                                            <div key={i} className="price-card-item-wrap">
                                                <div className="price-card-icon-wrap">
                                                    <img src="/images/68564e0eee1d2c58645b2923_check.svg" loading="lazy" alt="" className="chack-icon" />
                                                </div>
                                                <div className="price-item-text">{feature}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* One-Time Services */}
                        <div data-animate data-animate-delay="550" className="pricing-card">
                            <div className="pricing-card-content-grid-wrap">
                                <div className="pricing-card-left-wrapper">
                                    <div className="pricing-card-left-top-wrap">
                                        <div className="pricing-card-caption">One-Time Services</div>
                                        <p className="pricing-card-info-title">Need a single project? We offer standalone video, photography, and web development services at competitive rates.</p>
                                    </div>
                                    <div className="pricing-card-left-bottom-wrap">
                                        <div className="price-card-button-wrap">
                                            <a href="#contact" className="secondary-button w-inline-block">
                                                <div>Get a Quote</div>
                                                <div className="secondary-button-icon"></div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="pricing-card-right-wrapper">
                                    <div className="pricing-card-items-wrapper">
                                        {dbServices.length > 0 ? dbServices.map((item, i) => (
                                            <div key={item.id || i} className="price-card-item-wrap">
                                                <div className="price-card-icon-wrap">
                                                    <img src="/images/68564e0eee1d2c58645b2923_check.svg" loading="lazy" alt="" className="chack-icon" />
                                                </div>
                                                <div className="price-item-text">{item.title} — {item.description}</div>
                                            </div>
                                        )) : (
                                            <div className="text-gray-500 text-sm">Loading services...</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
