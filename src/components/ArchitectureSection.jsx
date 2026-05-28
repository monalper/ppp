import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ArchitectureSection.css';

export default function ArchitectureSection() {
  const sectionRef = useRef(null);
  const badgeRef = useRef(null);
  const subtitleRef = useRef(null);
  const titleRef = useRef(null);
  const galleryContainerRef = useRef(null);
  const galleryWrapperRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const element = sectionRef.current;

    let ctx = gsap.context(() => {
      const element = sectionRef.current;
      // 1. Hero Arka Planını Siyaha Dönüştürme Animasyonu
      gsap.to('.home-page__hero-black-overlay', {
        opacity: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'top center',
          scrub: true,
        }
      });

      // 3. Badge, Alt Başlık ve Başlık Belirme Animasyonu
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: 'top bottom', // Start exactly when the top of the element hits the bottom of the viewport
          toggleActions: 'play none none reverse'
        }
      });

      tl.fromTo([badgeRef.current, subtitleRef.current, titleRef.current],
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out' }
      );

      // 4. Horizontal ScrollGallery Animasyonu
      const container = galleryContainerRef.current;
      const wrapper = galleryWrapperRef.current;

      if (container && wrapper) {
        const getScrollAmount = () => -(wrapper.scrollWidth - window.innerWidth);

        const horizontalTween = gsap.to(wrapper, {
          x: getScrollAmount,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'center center',
            end: () => `+=${wrapper.scrollWidth - window.innerWidth}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          }
        });

        // 5. Görsel Açıklamalarının Görünürlüğü (Sadece Ortadaki Görünecek)
        const items = gsap.utils.toArray('.architecture-gallery-item');
        items.forEach((item) => {
          ScrollTrigger.create({
            trigger: item,
            containerAnimation: horizontalTween,
            // Öğenin merkezi, ekranın sağından %70 ve %30'u arasındayken aktif sayılır
            start: "center 75%",
            end: "center 25%",
            toggleClass: "is-active",
          });
        });
      }
    });

    return () => {
      ctx.revert();
    };
  }, []);

  const galleryItems = [
    { id: 1, brand: 'Kitlab', desc: 'Entertainment platform design and development.' },
    { id: 2, brand: 'The Openwall', desc: 'Financial dashboard and user experience.' },
    { id: 3, brand: 'Loged', desc: 'Food & beverage brand identity.' },
    { id: 4, brand: 'Ibrahim A. Ercan | Port', desc: 'Creative workspace and interior solutions.' },
  ];

  return (
    <section className="architecture-section" ref={sectionRef}>
      <div className="architecture-section__inner">
        <img
          src="/assets/building-badge.svg"
          alt=""
          className="architecture-section__badge"
          ref={badgeRef}
        />
        <p className="architecture-section__subtitle" ref={subtitleRef}>
        </p>
        <h2 className="architecture-section__title" ref={titleRef}>
          Selected Work <sup className="architecture-section__superscript">(4)</sup>
        </h2>
      </div>

      <div className="architecture-gallery-container" ref={galleryContainerRef}>
        <div className="architecture-gallery-wrapper" ref={galleryWrapperRef}>
          {galleryItems.map((item) => (
            <div className="architecture-gallery-item" key={item.id}>
              <div className="architecture-gallery-image-box">
                <img
                  src={`/assets/gallery/${item.id}.svg`}
                  alt={`${item.brand} Selected Work`}
                  className="architecture-gallery-image"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
              <div className="architecture-gallery-caption">
                <span className="architecture-gallery-caption-brand">{item.brand} </span>
                <span className="architecture-gallery-caption-desc">{item.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}