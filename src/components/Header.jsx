import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

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
                <div className="nav-wrapper flex items-center justify-between !px-4 !py-3 md:!px-[60px] md:!py-[16px]">

                    {/* Brand Logo */}
                    <a href="#top" className="brand-logo-wrap shrink-0 flex items-center" onClick={(e) => scrollToSection(e, 'top')}>
                        <img
                            src="/images/br/logo.png"
                            alt="Canvas Bd Logo"
                            className="object-contain h-10 md:h-12 w-auto scale-[1.3] md:scale-[2.6] origin-left"
                        />
                    </a>

                    {/* Desktop Navigation */}
                    <nav role="navigation" className="nav-menu hidden lg:flex items-center">
                        <a href="#top" className="nav-link w-nav-link" onClick={(e) => scrollToSection(e, 'top')}>Home</a>
                        <a href="#about" className="nav-link w-nav-link" onClick={(e) => scrollToSection(e, 'about')}>About</a>
                        <a href="#services" className="nav-link w-nav-link" onClick={(e) => scrollToSection(e, 'services')}>Services</a>
                        <a href="#pricing" className="nav-link w-nav-link" onClick={(e) => scrollToSection(e, 'pricing')}>Pricing</a>
                        <a href="#contact" className="nav-link margin-0 w-nav-link" onClick={(e) => scrollToSection(e, 'contact')}>Contact</a>
                    </nav>

                    {/* Desktop CTA & Mobile Toggle */}
                    <div className="flex items-center gap-4">
                        <div className="hidden md:block">
                            <a href="#contact" className="primary-button nav-button w-inline-block" onClick={(e) => scrollToSection(e, 'contact')}>
                                <div className="primary-button-text">Get Started</div>
                                <div className="primary-button-icon-wrap">
                                    <img loading="lazy" src="/images/685249b05d9202c4d1d30580_chevron-right.svg" alt="" className="primary-button-icon" />
                                    <img loading="lazy" src="/images/685249b05d9202c4d1d30580_chevron-right.svg" alt="" className="primary-button-icon-hover" />
                                </div>
                            </a>
                        </div>

                        {/* Mobile Hamburger Button */}
                        <button
                            className="lg:hidden p-2 text-white/90 hover:text-white transition-colors"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation Dropdown */}
                {isOpen && (
                    <div className="lg:hidden absolute top-full left-0 w-full bg-[#0c0c0e] border-b border-white/10 flex flex-col px-6 py-6 gap-2 z-50 shadow-2xl origin-top animate-in slide-in-from-top-2 duration-200">
                        <a href="#top" className="text-white text-lg py-3 border-b border-white/5 font-medium" onClick={(e) => scrollToSection(e, 'top')}>Home</a>
                        <a href="#about" className="text-white text-lg py-3 border-b border-white/5 font-medium" onClick={(e) => scrollToSection(e, 'about')}>About</a>
                        <a href="#services" className="text-white text-lg py-3 border-b border-white/5 font-medium" onClick={(e) => scrollToSection(e, 'services')}>Services</a>
                        <a href="#pricing" className="text-white text-lg py-3 border-b border-white/5 font-medium" onClick={(e) => scrollToSection(e, 'pricing')}>Pricing</a>
                        <a href="#contact" className="text-white text-lg py-3 border-b border-white/5 font-medium" onClick={(e) => scrollToSection(e, 'contact')}>Contact</a>
                        <div className="mt-4">
                            <a href="#contact" className="primary-button w-full flex justify-center !py-4" onClick={(e) => scrollToSection(e, 'contact')}>
                                <div className="primary-button-text font-bold text-center w-full">Get Started</div>
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
