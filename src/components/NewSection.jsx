import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './NewSection.css';

export default function NewSection() {
    const sectionRef = useRef(null);
    const badgeRef = useRef(null);
    const subtitleRef = useRef(null);
    const titleRef = useRef(null);
    const cardsContainerRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        let ctx = gsap.context(() => {
            const element = sectionRef.current;

            gsap.to('.card-section-black-overlay', {
                opacity: 1,
                ease: 'none',
                scrollTrigger: {
                    trigger: element,
                    start: 'top bottom',
                    end: 'top center',
                    scrub: true,
                }
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: element,
                    start: 'top bottom',
                    toggleActions: 'play none none reverse'
                }
            });

            tl.fromTo([badgeRef.current, subtitleRef.current, titleRef.current],
                { opacity: 0, y: 25 },
                { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out' }
            );

            // Cards animation
            tl.fromTo(cardsRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out' },
                "-=0.3"
            );
        });

        return () => ctx.revert();
    }, []);

    // Makaleler ve güncellenmiş görsel yolları (es-1, es-2, es-3)
    const articles = [
        { id: 1, title: 'How do you build a high-quality society?', image: '/assets/gallery/es-1.webp' },
        { id: 2, title: 'It is human nature to want to know', image: '/assets/gallery/es-2.jpg' },
        { id: 3, title: 'Why should we imagine Sisyphus as happy?', image: '/assets/gallery/es-3.jpg' },
    ];

    return (
        <section className="new-section" ref={sectionRef}>
            <div className="new-section__inner">
                <img
                    src="/assets/building-badge.svg"
                    alt=""
                    className="new-section__badge"
                    ref={badgeRef}
                />
                <p className="new-section__subtitle" ref={subtitleRef}>

                </p>
                <h2 className="new-section__title" ref={titleRef}>
                    Also, My Essays <sup className="new-section__superscript">(3)</sup>
                </h2>

                <div className="new-section__cards-container" ref={cardsContainerRef}>
                    {articles.map((article, index) => (
                        <div
                            className="new-section__card"
                            key={article.id}
                            ref={el => cardsRef.current[index] = el}
                        >
                            <div className="new-section__card-image-box">
                                {/* Güncellenmiş gerçek kapak görseli */}
                                <img 
                                    src={article.image} 
                                    alt={article.title} 
                                    className="new-section__card-image" 
                                    loading="lazy"
                                />
                            </div>
                            <h3 className="new-section__card-title">{article.title}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}