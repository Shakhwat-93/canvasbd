import { useEffect, useRef, useCallback } from 'react';

/**
 * Scroll-triggered fade-in animation using Intersection Observer
 * Scroll-triggered fade-in-on-scroll animations
 */
export function useScrollReveal(options = {}) {
    const {
        threshold = 0.05,
        rootMargin = '0px 0px 100px 0px',
        staggerDelay = 50,
    } = options;

    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const elements = container.querySelectorAll('[data-animate]');
        if (elements.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const el = entry.target;
                        const delay = parseInt(el.dataset.animateDelay || '0', 10);
                        const stagger = parseInt(el.dataset.animateStagger || '0', 10);

                        setTimeout(() => {
                            el.classList.add('is-revealed');
                        }, delay + stagger);

                        observer.unobserve(el);
                    }
                });
            },
            { threshold, rootMargin }
        );

        elements.forEach((el, index) => {
            // Set initial state
            el.style.opacity = '0';
            el.style.transform = 'translate3d(0, 20px, 0)';
            el.style.transition = `opacity 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s, transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s`;

            // Auto-stagger if parent has data-stagger
            if (el.closest('[data-stagger]') && !el.dataset.animateDelay) {
                el.dataset.animateStagger = String(index * staggerDelay);
            }

            observer.observe(el);
        });

        return () => observer.disconnect();
    }, [threshold, rootMargin, staggerDelay]);

    return containerRef;
}

/**
 * Individual element reveal ref
 */
export function useRevealRef(delay = 0) {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        el.style.opacity = '0';
        el.style.transform = 'translate3d(0, 20px, 0)';
        el.style.transition = `opacity 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms, transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms`;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.style.opacity = '1';
                    el.style.transform = 'translate3d(0, 0, 0)';
                    observer.unobserve(el);
                }
            },
            { threshold: 0.05, rootMargin: '0px 0px 100px 0px' }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [delay]);

    return ref;
}
