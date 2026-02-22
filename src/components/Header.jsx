import { useState, useEffect } from 'react';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (e, id) => {
        e.preventDefault();
        setIsOpen(false);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        } else if (id === 'top') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <div data-animation="default" data-collapse="medium" data-duration="400" role="banner" className={`nav-bar w-nav${scrolled ? ' scrolled' : ''}`}>
            <div className="nav-container">
                <div className="nav-wrapper !px-5 !py-3 md:!px-[60px] md:!py-[16px]">
                    <a href="#top" className="brand-logo-wrap w-nav-brand" onClick={(e) => scrollToSection(e, 'top')}>
                        <img src="/images/br/logo.png" alt="Canvas Bd Logo" className="brand-logo-img object-contain h-[36px] md:h-[86px] scale-[2.5] md:scale-[2.8] origin-left md:origin-center" />
                    </a>
                    <nav role="navigation" className="nav-menu w-nav-menu" style={isOpen ? { display: 'block' } : {}}>
                        <a href="#top" className="nav-link w-nav-link" onClick={(e) => scrollToSection(e, 'top')}>Home</a>
                        <a href="#about" className="nav-link w-nav-link" onClick={(e) => scrollToSection(e, 'about')}>About</a>
                        <a href="#services" className="nav-link w-nav-link" onClick={(e) => scrollToSection(e, 'services')}>Services</a>
                        <a href="#pricing" className="nav-link w-nav-link" onClick={(e) => scrollToSection(e, 'pricing')}>Pricing</a>
                        <a href="#contact" className="nav-link margin-0 w-nav-link" onClick={(e) => scrollToSection(e, 'contact')}>Contact</a>
                        <div className="nav-bar-right-wrapper hide-on-desktop-tab">
                            <a href="#contact" className="primary-button nav-button w-inline-block" onClick={(e) => scrollToSection(e, 'contact')}>
                                <div className="primary-button-text">Get Started</div>
                                <div className="primary-button-icon-wrap">
                                    <img loading="lazy" src="/images/685249b05d9202c4d1d30580_chevron-right.svg" alt="" className="primary-button-icon" />
                                    <img loading="lazy" src="/images/685249b05d9202c4d1d30580_chevron-right.svg" alt="" className="primary-button-icon-hover" />
                                </div>
                            </a>
                        </div>
                    </nav>
                    <div className="nav-button-wrap">
                        <a href="#contact" className="primary-button nav-button hideo-on-mobile w-inline-block" onClick={(e) => scrollToSection(e, 'contact')}>
                            <div className="primary-button-text">Get Started</div>
                            <div className="primary-button-icon-wrap">
                                <img loading="lazy" src="/images/685249b05d9202c4d1d30580_chevron-right.svg" alt="" className="primary-button-icon" />
                                <img loading="lazy" src="/images/685249b05d9202c4d1d30580_chevron-right.svg" alt="" className="primary-button-icon-hover" />
                            </div>
                        </a>
                        <div className="menu-button w-nav-button" onClick={() => setIsOpen(!isOpen)}>
                            <div className="w-icon-nav-menu"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
