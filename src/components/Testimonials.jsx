import { useEffect, useRef } from 'react';

export default function Testimonials() {
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
            { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
        );

        elements.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <section className="testimonials" ref={sectionRef}>
            <img src="/images/68522b8afb7001f33ec58e39_c711a787cc42eb29e73062dc3ca82256_Bg%2002.svg" loading="lazy" alt="" className="testimonial-bg-two" />
            <img src="/images/68522b8a6a593cf00ba12c45_a78e81681a043478dc8025be08a9bdd2_Bg%2001.svg" loading="lazy" alt="" className="testimonial-bg-one" />
            <div className="container">
                <div className="testimonials-wrapper">
                    <div data-animate className="testimonials-top-wrapper">
                        <div className="testimonials-title-wrap">
                            <h2 className="testimonials-title">Trusted by Businesses<br />and Creators Across Bangladesh</h2>
                        </div>
                        <div className="testimonials-text-wrap">
                            <p className="testimonials-text">Join the growing number of businesses who trust Canvas Bd for their video production and digital marketing needs.</p>
                        </div>
                    </div>
                    <div className="testimonials-items-wrapper">
                        <div data-animate data-animate-delay="200" className="testimonials-items-top-grid-wrap">
                            <div className="testimonial-card-one">
                                <div className="testimonial-card-one-logo-wrap">
                                    <img src="/images/68579c6e467b66c1a5064477_User%20Logo-1.png" loading="lazy" alt="" className="user-logo" />
                                </div>
                                <div className="testimonial-card-one-content-wrap">
                                    <div className="testimonial-card-two-text-wrap">
                                        <p className="testimonial-card-one-text">"Canvas Bd transformed our social media presence completely. Their cinematic videos and strategic content planning helped us triple our engagement in just 3 months."</p>
                                    </div>
                                    <div className="testimonial-card-user-wrap">
                                        <div className="testimonial-card-user-two-image-wrap">
                                            <img src="/images/68579984a77e8d025ca57993_User%20Image-4.png" loading="lazy" alt="" className="testimonial-user-image" />
                                        </div>
                                        <div className="testimonial-card-two-user-info-wrap">
                                            <div className="testimonial-two-user-name">Rafiq Ahmed</div>
                                            <div className="user-designation-two">CEO, TechStar BD</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="testimonials-items-grid-wrap">
                                <div className="testimonial-card-two">
                                    <div className="testimonial-card-two-text-wrap">
                                        <p className="testimonial-card-two-text">"The product photography quality is outstanding. Every shot is professionally retouched and ready for our e-commerce store. Highly recommend their one-time service package."</p>
                                    </div>
                                    <div className="testimonial-card-user-wrap">
                                        <div className="testimonial-card-user-one-image-wrap">
                                            <img src="/images/68579984460193a971fb31b5_User%20Image-3.png" loading="lazy" alt="" className="testimonial-user-image" />
                                        </div>
                                        <div className="testimonial-card-two-user-info-wrap">
                                            <div className="testimonial-two-user-name">Sabrina Akter</div>
                                            <div className="user-designation-two">Founder, StyleHouse</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="testimonial-card-two">
                                    <div className="testimonial-card-two-text-wrap">
                                        <p className="testimonial-card-two-text">"As a doctor, personal branding felt overwhelming. Canvas Bd's team handled everything — from video scripting to SEO — and now my online visibility has grown significantly."</p>
                                    </div>
                                    <div className="testimonial-card-user-wrap">
                                        <div className="testimonial-card-user-one-image-wrap">
                                            <img src="/images/6857998424d1ed8c62836188_User%20Image-2.png" loading="lazy" alt="" className="testimonial-user-image" />
                                        </div>
                                        <div className="testimonial-card-two-user-info-wrap">
                                            <div className="testimonial-two-user-name">Dr. Karim Hasan</div>
                                            <div className="user-designation-two">Cardiologist, Dhaka</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="testimonial-card-one">
                                <div className="testimonial-card-one-logo-wrap">
                                    <img src="/images/68579c6e59df521ab05ee745_User%20Logo.png" loading="lazy" alt="" className="user-logo" />
                                </div>
                                <div className="testimonial-card-one-content-wrap">
                                    <div className="testimonial-card-two-text-wrap">
                                        <p className="testimonial-card-one-text">"Their Standard subscription plan gives us incredible value — 8 videos, social media posts, and even a WordPress website. Canvas Bd is our go-to creative partner."</p>
                                    </div>
                                    <div className="testimonial-card-user-wrap">
                                        <div className="testimonial-card-user-two-image-wrap">
                                            <img src="/images/68579984a77e8d025ca57993_User%20Image-4.png" loading="lazy" alt="" className="testimonial-user-image" />
                                        </div>
                                        <div className="testimonial-card-two-user-info-wrap">
                                            <div className="testimonial-two-user-name">Nasir Uddin</div>
                                            <div className="user-designation-two">Director, GreenMart</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div data-animate data-animate-delay="400" className="testimonials-items-bottom-grid-wrap">
                            <div className="testimonial-card-two">
                                <div className="testimonial-card-two-text-wrap">
                                    <p className="testimonial-card-two-text">"The bulk video package saved us a fortune. We ordered 10 videos at a discounted per-unit rate and the quality was consistently professional across all of them."</p>
                                </div>
                                <div className="testimonial-card-user-wrap">
                                    <div className="testimonial-card-user-one-image-wrap">
                                        <img src="/images/68579984d9a93b3fd086b825_User%20Image-6.png" loading="lazy" alt="" className="testimonial-user-image" />
                                    </div>
                                    <div className="testimonial-card-two-user-info-wrap">
                                        <div className="testimonial-two-user-name">Tanvir Islam</div>
                                        <div className="user-designation-two">Marketing Head, FastMove</div>
                                    </div>
                                </div>
                            </div>
                            <div className="testimonial-card-two">
                                <div className="testimonial-card-two-text-wrap">
                                    <p className="testimonial-card-two-text">"Canvas Bd's Facebook marketing and content strategy helped our restaurant get noticed. The combination of great videos and targeted marketing brought in real customers."</p>
                                </div>
                                <div className="testimonial-card-user-wrap">
                                    <div className="testimonial-card-user-one-image-wrap">
                                        <img src="/images/6857998466dec006c822526c_User%20Image-5.png" loading="lazy" alt="" className="testimonial-user-image" />
                                    </div>
                                    <div className="testimonial-card-two-user-info-wrap">
                                        <div className="testimonial-two-user-name">Maheen Chowdhury</div>
                                        <div className="user-designation-two">Owner, Spice Kitchen</div>
                                    </div>
                                </div>
                            </div>
                            <div className="testimonial-card-two">
                                <div className="testimonial-card-two-text-wrap">
                                    <p className="testimonial-card-two-text">"From motion graphics to corporate videos, Canvas Bd delivers premium quality every time. Their professionalism and creativity set them apart from other agencies."</p>
                                </div>
                                <div className="testimonial-card-user-wrap">
                                    <div className="testimonial-card-user-one-image-wrap">
                                        <img src="/images/68579984460193a971fb31b5_User%20Image-3.png" loading="lazy" alt="" className="testimonial-user-image" />
                                    </div>
                                    <div className="testimonial-card-two-user-info-wrap">
                                        <div className="testimonial-two-user-name">Farzana Rahman</div>
                                        <div className="user-designation-two">COO, BuildRight Group</div>
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
