import { useEffect, useRef } from 'react';

export default function AboutSection() {
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
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );

        elements.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <section id="about" className="feature" ref={sectionRef}>
            <div className="container">
                {/* Story & Mission Part */}
                <div className="feature-wrapper">
                    <div className="feature-top-wrapper" data-animate>
                        <div className="section-caption-wrap" style={{ marginBottom: '16px' }}>
                            <div className="section-caption">
                                <div className="section-caption-text"><strong>About</strong> Canvas Bd</div>
                            </div>
                        </div>
                        <div className="feature-title-wrap">
                            <h2 className="feature-title">Our Story &<br />Mission</h2>
                        </div>
                        <div className="feature-text-wrap">
                            <p className="feature-text">Canvas Bd is a premium video production and digital marketing agency based in Dhaka, Bangladesh. We help businesses and professionals build their brand through cinematic storytelling and strategic marketing.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
