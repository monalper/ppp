import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './MarqueeSection.css';

export default function MarqueeSection() {
    const sectionRef = useRef(null);
    const wrapperRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        let ctx = gsap.context(() => {
            // Sadece ideal ve akıcı hızda yatay kayma animasyonu
            gsap.to(wrapperRef.current, {
                xPercent: -30,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 2, // Scroll durduğunda akıcı bir şekilde yavaşlayarak durur
                }
            });
        });

        return () => ctx.revert();
    }, []);

    // Tekrarlanan metin dizisi
    const textItems = [
        "CREATIVE DEVELOPER",
        "DIGITAL DESIGNER",
        "UI/UX EXPERT",
        "FRONTEND ENGINEER"
    ];

    // Kusursuz sonsuz döngü görüntüsü için diziyi çoğaltıyoruz
    const fullList = [...textItems, ...textItems, ...textItems, ...textItems];

    return (
        <section className="marquee-section" ref={sectionRef}>
            <div className="marquee-section__inner">
                <div className="marquee-text-container">
                    <div className="marquee-wrapper" ref={wrapperRef}>
                        {fullList.map((text, index) => (
                            <React.Fragment key={index}>
                                <h1 className="marquee-text">{text}</h1>
                                {/* public klasöründeki marq-dot.svg kullanımı */}
                                <img
                                    src="/marq-dot.svg"
                                    className="marquee-dot"
                                    alt="separator"
                                />
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}