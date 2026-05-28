import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ArchitectureSection from './ArchitectureSection';
import AboutSection from './AboutSection';
import CardSection from './CardSection';
import NewSection from './NewSection';
import MarqueeSection from './MarqueeSection';
import Footer from './Footer';
import CookieNotice from './CookieNotice';
import EssaysEmptySection from './EssaysEmptySection';

export default function HomePage({ ariaHidden = false, className = '' }) {
  const heroStyle = {
    backgroundImage: "url('/assets/home-bg.svg')",
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const heroPin = ScrollTrigger.create({
      trigger: ".home-page__hero",
      start: "top top",
      end: "top top",
      endTrigger: ".home-page__content",
      pin: true,
      pinSpacing: false,
    });

    const cardPin = ScrollTrigger.create({
      trigger: ".card-section-wrapper",
      start: "top top",
      end: "top top",
      endTrigger: ".new-section-wrapper",
      pin: true,
      pinSpacing: false,
    });

    return () => {
      heroPin.kill();
      cardPin.kill();
    };
  }, []);

  return (
    // Intersection Observer'ın varsayılan koyu temayı algılaması için data-theme="dark" ekledik
    <div className={`home-page ${className}`.trim()} aria-hidden={ariaHidden}>
      <section className="home-page__hero" style={heroStyle} data-theme="dark">
        {/* Scroll ile opaklığı artarak bg'yi yavaşça siyaha bürüyecek katman */}
        <div className="home-page__hero-black-overlay"></div>

        {/* Scroll down indicator */}
        <div className="scroll-indicator">
          <div className="scroll-indicator__circle"></div>
        </div>

        {/* Header buradan kaldırıldı, artık App.jsx üzerinden tüm sitenin tepesinde render ediliyor */}
      </section>

      <main className="home-page__content">
        {/* Bu bölüme gelindiğinde header otomatik olarak light moda (siyah yazılara) geçecek */}
        <section data-theme="light">
          <ArchitectureSection />
        </section>

        <section data-theme="dark">
          <AboutSection />
        </section>

        <section data-theme="dark" className="card-section-wrapper">
          <CardSection />
        </section>

        <section data-theme="light" className="new-section-wrapper">
          <NewSection />
        </section>

        <section data-theme="light">
          <EssaysEmptySection />
        </section>

        <section data-theme="light">
          <MarqueeSection />
        </section>

        <section data-theme="dark">
          <Footer />
        </section>
      </main>
      <CookieNotice />
    </div>
  );
}
