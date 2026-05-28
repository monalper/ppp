import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Footer.css';

export default function Footer() {
    const footerContainerRef = useRef(null);
    const footerInnerRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        let ctx = gsap.context(() => {
            gsap.fromTo(footerInnerRef.current,
                { yPercent: -35 },
                {
                    yPercent: 0,
                    ease: "none",
                    scrollTrigger: {
                        trigger: footerContainerRef.current,
                        start: "top bottom",
                        end: "bottom bottom",
                        scrub: true,
                    }
                }
            );
        });

        return () => ctx.revert();
    }, []);

    return (
        <div className="site-footer-container" ref={footerContainerRef}>
            <footer className="site-footer" ref={footerInnerRef}>

                {/* Üst Kısım: Temiz Logo, İletişim ve Link Grupları */}
                <div className="site-footer__main">
                    <div className="site-footer__col-brand">
                        <div className="site-footer__logo-wrapper">
                            <img src="/assets/header-logo.svg" alt="Studio Logo" className="site-footer__logo" />
                        </div>
                        <a href="mailto:iaercan@hotmail.com" className="site-footer__email">iaercan@hotmail.com</a>
                    </div>

                    <div className="site-footer__col-links">
                        <div className="site-footer__group">
                            <nav className="site-footer__links">
                                <a href="#work" className="site-footer__link">Projects</a>
                                <a href="#about" className="site-footer__link">Studio</a>
                                <a href="#contact" className="site-footer__link">Contact</a>
                            </nav>
                        </div>

                        <div className="site-footer__group">
                            <nav className="site-footer__links">
                                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="site-footer__link">LinkedIn</a>
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="site-footer__link">Instagram</a>
                                <a href="https://behance.net" target="_blank" rel="noopener noreferrer" className="site-footer__link">Behance</a>
                            </nav>
                        </div>
                    </div>
                </div>

                {/* Orta Kısım: Apple Tarzı Metinleştirilmiş Kaynakça (Fine Print) */}
                <div className="site-footer__credits">
                    <p className="site-footer__credits-text">
                        <strong>The images I used:</strong> George Stubbs (<em>Horse Frightened by a Lion</em>), Jacob Maris (<em>Daughter of Jacob Maris with Flowers in the Grass</em>), Antonio Zanchi (<em>Sisyphus</em>), Frederic Remington (<em>Smoke Signal</em>), Vincent van Gogh (<em>The Siesta, Almond Blossom, Wheat Field with Cypresses, The Harvest</em>), Walter Rane (<em>The First Relief Society</em>), Orazio Gentileschi (<em>Lute Player</em>), Caspar David Friedrich (<em>Wanderer Above the Sea of Fog</em>).
                    </p>
                    <p className="site-footer__credits-text">
                        <strong>My Sources of Inspiration:</strong> Getty Museum (Tracing Art), Rise at Seven, Edwin Le, Shopify Design.
                    </p>
                </div>

                {/* Alt Kısım: Telif Hakları ve Detaylar */}
                <div className="site-footer__bottom">
                    <p className="site-footer__copyright">
                        &copy; {new Date().getFullYear()} A. Ercan. All rights reserved.
                    </p>
                    <div className="site-footer__sub-links">
                        <span className="site-footer__location">Ankara, Türkiye</span>
                    </div>
                </div>

            </footer>
        </div>
    );
}