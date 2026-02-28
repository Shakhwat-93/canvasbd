import Header from '../components/Header';
import CTA from '../components/CTA';
import { companyDetails } from '../data/company';

export default function About() {
    return (
        <>
            {/* About Hero */}
            <section className="hero">
                <Header />
                <div className="hero-bg-wrap">
                    <img src="/images/6852646611e36b1678be4ae5_Line%20Top%20.png" loading="lazy" alt="" className="hero-top-line" />
                    <img src="/images/685920364c1582a50dfd1c22_Hero%20Line.png" loading="lazy" alt="" className="inner-hero-line-two blog-hero-line-two" />
                    <img src="/images/685920354395baf031c46519_Hero%20Line-1.png" loading="lazy" alt="" className="inner-hero-line-one blog-hero-line-one" />
                </div>
                <div className="container">
                    <div className="hero-wrapper">
                        <div className="hero-content-wrapper">
                            <div className="hero-content-wrap">
                                <div className="section-caption-wrap">
                                    <div className="section-caption">
                                        <div className="section-caption-text"><strong>About</strong> Canvas Bd</div>
                                    </div>
                                </div>
                                <div className="hero-title-wrap" style={{ opacity: 1 }}>
                                    <h1 className="hero-title">Our Story &<br />Mission</h1>
                                </div>
                                <div className="hero-text-wrap" style={{ opacity: 1 }}>
                                    <p className="hero-text">Canvas Bd is a premium video production and digital marketing agency based in Dhaka, Bangladesh. We help businesses and professionals build their brand through cinematic storytelling and strategic marketing.</p>
                                </div>
                            </div>
                        </div>
                        <div className="hero-bg-wrap">
                            <img src="/images/68522b8a6a593cf00ba12c45_a78e81681a043478dc8025be08a9bdd2_Bg%2001.svg" loading="lazy" alt="" className="inner-hero-bg-one" />
                            <img src="/images/68522b8afb7001f33ec58e39_c711a787cc42eb29e73062dc3ca82256_Bg%2002.svg" loading="lazy" alt="" className="inner-hero-bg-two" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Locations Section */}
            <section className="feature">
                <div className="container">
                    <div className="feature-wrapper">
                        <div className="feature-top-wrapper" style={{ opacity: 1 }}>
                            <div className="feature-title-wrap">
                                <h2 className="feature-title">Our Locations</h2>
                            </div>
                            <div className="feature-text-wrap">
                                <p className="feature-text">Visit us at any of our offices or factory across Dhaka</p>
                            </div>
                        </div>
                        <div className="feature-card-grid-wrap feature-card-grid-one-wrap">

                            {/* Uttara Office */}
                            <div className="feature-card-three" style={{ opacity: 1 }}>
                                <div className="feature-card-content-wrap">
                                    <div className="feature-card-title-wrap">
                                        <h3 className="feature-card-title">{companyDetails.locations.uttara.name}</h3>
                                    </div>
                                    <div className="feature-card-text-wrap">
                                        <p className="feature-card-text">{companyDetails.locations.uttara.address}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Factory */}
                            <div className="feature-card-three" style={{ opacity: 1 }}>
                                <div className="feature-card-content-wrap">
                                    <div className="feature-card-title-wrap">
                                        <h3 className="feature-card-title">{companyDetails.locations.factory.name}</h3>
                                    </div>
                                    <div className="feature-card-text-wrap">
                                        <p className="feature-card-text">{companyDetails.locations.factory.address}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="feature-card-six" style={{ opacity: 1 }}>
                            <div className="feature-card-six-content-wrap">
                                <div className="feature-card-title-wrap">
                                    <h3 className="feature-card-title">Contact Information</h3>
                                </div>
                                <div className="feature-card-text-wrap">
                                    <p className="feature-card-text">
                                        Phone: {companyDetails.phone.join(' | ')}<br />
                                        Email: {companyDetails.email}<br />
                                        Website: {companyDetails.website}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <CTA />
        </>
    );
}
