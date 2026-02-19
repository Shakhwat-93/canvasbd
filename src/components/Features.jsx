import { useEffect, useRef } from 'react';

export default function Features() {
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
            { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
        );

        elements.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <section className="feature" id="services" ref={sectionRef}>
            <div className="container">
                <div className="feature-wrapper">
                    <div data-animate className="feature-top-wrapper">
                        <div className="feature-title-wrap">
                            <h2 className="feature-title">Premium Video & Marketing<br />Services for Your Brand</h2>
                        </div>
                        <div className="feature-text-wrap">
                            <p className="feature-text">From cinematic video production to strategic digital marketing, Canvas Bd provides end-to-end creative solutions that elevate your brand and drive results.</p>
                        </div>
                    </div>
                    <div className="feature-card-grid-wrap feature-card-grid-one-wrap">
                        {/* Card 1 - Video Production */}
                        <div data-animate data-animate-delay="100" className="feature-card-one" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', gap: '30px' }}>
                            <div className="feature-card-one-bg">
                                <div className="feature-card-info-icon-wrap one">
                                    <img src="/images/685992b62a1f1cedb479ee27_Framework%20Item%20Icon%2003.svg" loading="lazy" alt="" className="feature-card-info-icon" />
                                </div>
                                <div className="feature-card-info-icon-wrap two">
                                    <img src="/images/685992b851fadab082e751bd_Framework%20Item%20Icon%2006.svg" loading="lazy" alt="" className="feature-card-info-icon" />
                                </div>
                                <div className="feature-card-info-icon-wrap three">
                                    <img src="/images/685992b612820c543c123a68_Framework%20Item%20Icon%2002.svg" loading="lazy" alt="" className="feature-card-info-icon" />
                                </div>
                                <div className="feature-card-info-icon-wrap four">
                                    <img src="/images/685992b8d7938fc8765343f6_Framework%20Item%20Icon%2005.svg" loading="lazy" alt="" className="feature-card-info-icon" />
                                </div>
                            </div>
                            <div className="feature-card-content-wrap">
                                <div className="feature-card-title-wrap">
                                    <h3 className="feature-card-title">Cinematic Video Production</h3>
                                </div>
                                <div className="feature-card-text-wrap">
                                    <p className="feature-card-text">High-end cinematic videos, corporate films, product showcases, and motion graphics crafted to captivate your audience.</p>
                                </div>
                            </div>
                        </div>

                        {/* Card 2 - Product Photography */}
                        <div data-animate data-animate-delay="200" className="feature-card-two" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', gap: '30px' }}>
                            <div className="feature-two-card-content-grid-wrap">
                                <div className="feature-two-card-right-wrap">
                                    <div className="feature-card-title-wrap">
                                        <h3 className="feature-card-title">Product Photography</h3>
                                    </div>
                                    <div className="feature-card-text-wrap">
                                        <p className="feature-card-text">Professional product photography with retouching — perfect for e-commerce, catalogs, and social media content.</p>
                                    </div>
                                </div>
                            </div>
                            <img src="/images/6854ead02876b66d7e7892d8_b1239eda2ddd58d4f2f3f1bb6eb4e0de_Card%20Bg.png" loading="lazy" alt="" className="feature-card-two-bg" />
                        </div>

                        {/* Card 3 - Digital Marketing */}
                        <div data-animate data-animate-delay="300" className="feature-card-three" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', gap: '30px' }}>
                            <img src="/images/6853c7880d3515c51fd15907_Card%20Line%2001.png" loading="lazy" alt="" className="feature-card-three-line-one" />
                            <img src="/images/6853c7880d3515c51fd15907_Card%20Line%2001.png" loading="lazy" alt="" className="feature-card-three-line-two" />
                            <div className="feature-card-three-image-wrapper">
                                <div className="feature-card-three-image-wrap">
                                    <img src="/images/6854f3373ffea919f9bc5a06_Card%20Three%20Image.png" loading="lazy" alt="" />
                                </div>
                            </div>
                            <div className="feature-card-content-wrap">
                                <div className="feature-card-title-wrap">
                                    <h3 className="feature-card-title">Digital Marketing & SEO</h3>
                                </div>
                                <div className="feature-card-text-wrap">
                                    <p className="feature-card-text">Strategic Facebook marketing, Google Business Profile optimization, on-page SEO, and full 360° branding to grow your online presence.</p>
                                </div>
                            </div>
                        </div>

                        {/* Cards 4 & 5 */}
                        <div data-animate data-animate-delay="400" className="feature-item-grid-wap">
                            <div className="feature-card-four" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', gap: '20px', height: '100%' }}>
                                <img src="/images/6854f5f5774dd90859edb1a6_c3df40abdf51507a49eccea6ac2b9cff_Card%20Four%20Image.png" loading="lazy" alt="" className="card-four-image" />
                                <div className="feature-card-content-wrap">
                                    <div className="feature-card-title-wrap">
                                        <h3 className="feature-card-title">Social Media Management</h3>
                                    </div>
                                    <div className="feature-card-text-wrap">
                                        <p className="feature-card-text">Complete social media post design, scheduling, and Facebook page management to keep your brand active and engaging.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="feature-card-five" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', gap: '20px', height: '100%' }}>
                                <img src="/images/6854f80038029b62703782d3_694e577b6b0ededddbe2880e0c89e34a_Card%20Five%20Image.png" loading="lazy" alt="" className="card-five-image" />
                                <div className="feature-card-five-content-wrap">
                                    <div className="feature-card-title-wrap">
                                        <h3 className="feature-card-title">Website Development</h3>
                                    </div>
                                    <div className="feature-card-text-wrap">
                                        <p className="feature-card-text">Standard WordPress sites and Pro sites with appointment systems — professionally built for your business needs.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Card 6 - Personal Branding */}
                        <div data-animate data-animate-delay="500" className="feature-card-six" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', gap: '30px', paddingBottom: '40px' }}>
                            <div className="feature-card-six-content-wrap">
                                <div className="feature-card-title-wrap">
                                    <h3 className="feature-card-title">Personal Branding & Content Strategy</h3>
                                </div>
                                <div className="feature-card-text-wrap">
                                    <p className="feature-card-text">Tailored branding packages for Doctors, Lawyers, and Business professionals — including video content, professional photoshoots, scripting, and full 360° branding solutions.</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
