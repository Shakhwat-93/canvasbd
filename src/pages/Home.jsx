import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import Features from '../components/Features';
import Services from '../components/Services';
import VideoGallery from '../components/VideoGallery';
import Testimonials from '../components/Testimonials';
import ContactSection from '../components/ContactSection';

export default function Home() {
    return (
        <div id="top">
            <Hero />
            <AboutSection />
            <Features />
            <Services />
            <VideoGallery />
            <Testimonials />
            <ContactSection />
        </div>
    );
}
