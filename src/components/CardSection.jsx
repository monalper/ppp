import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './CardSection.css';

export default function CardSection() {
    const sectionRef = useRef(null);

    // I. Tasarım Grubu Verileri
    const designPrinciples = [
        { roman: "I", text: "Clean, Aesthetic" },
        { roman: "II", text: "Efficient, Practical, Innovative" },
        { roman: "III", text: "Honest, Durable" }
    ];

    // II. Yazılım/Mühendislik Grubu Verileri (Felsefi ve Kapsayıcı)
    const engineeringPrinciples = [
        { roman: "I", text: "Intentional, Elegant Systems" },
        { roman: "II", text: "Performant, Meticulous Craft" },
        { roman: "III", text: "Resilient, Timeless Code" }
    ];

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        let ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".card-section-wrapper",
                    start: "top top",
                    end: "+=500vh", // 3 scroll boyunca sabit kalmayı sağlayan uzun mesafe
                    scrub: true,
                    invalidateOnRefresh: true,
                }
            });

            // ----------------------------------------------------
            // AŞAMA 1: CANVAS BÜYÜME (0.0 -> 1.0)
            // ----------------------------------------------------
            tl.fromTo(".canvas-wrapper", {
                clipPath: "inset(75px 24px 24px 24px round 24px)"
            }, {
                clipPath: "inset(0px 0px 0px 0px round 0px)",
                ease: "none",
                duration: 1.0,
            }, 0);

            // ----------------------------------------------------
            // AŞAMA 2: 1. GRUP SIRA SIRA GİRİŞ (1.2 -> 2.2)
            // ----------------------------------------------------
            tl.to(".design-group .canvas-title", {
                opacity: 1,
                y: 0,
                duration: 0.4,
                ease: "power2.out"
            }, 1.2);

            tl.to(".design-group .canvas-index-row", {
                opacity: 1,
                y: 0,
                duration: 0.4,
                stagger: 0.15, // Satırların sıra sıra gelmesini sağlayan can damarı
                ease: "power2.out"
            }, 1.4);

            // ----------------------------------------------------
            // AŞAMA 3: BEKLEME ALANI (2.2 -> 4.5)
            // Bu aralıkta hiçbir animasyon yok. En az 3 scroll sabit okunur.
            // ----------------------------------------------------

            // ----------------------------------------------------
            // AŞAMA 4: 1. GRUP SIRA SIRA ÇIŞIK (4.5 -> 5.2)
            // ----------------------------------------------------
            tl.to(".design-group .canvas-title", {
                opacity: 0,
                y: -30,
                duration: 0.4,
                ease: "power2.in"
            }, 4.5);

            tl.to(".design-group .canvas-index-row", {
                opacity: 0,
                y: -20,
                duration: 0.4,
                stagger: 0.08, // Çıkarken de sıra sıra kaybolurlar
                ease: "power2.in"
            }, 4.6);

            // ----------------------------------------------------
            // AŞAMA 5: 2. GRUP SIRA SIRA GİRİŞ (5.2 -> 6.2)
            // ----------------------------------------------------
            tl.to(".eng-group .canvas-title", {
                opacity: 1,
                y: 0,
                duration: 0.4,
                ease: "power2.out"
            }, 5.2);

            tl.to(".eng-group .canvas-index-row", {
                opacity: 1,
                y: 0,
                duration: 0.4,
                stagger: 0.15, // Yeni grubun satırları da sıra sıra gelir
                ease: "power2.out"
            }, 5.4);
        });

        return () => ctx.revert();
    }, []);

    return (
        <section className="card-section" ref={sectionRef}>
            <div className="canvas-wrapper">
                <div className="canvas-header-group">

                    {/* 1. GRUP: DESIGN */}
                    <div className="content-group design-group">
                        <h2 className="canvas-title">
                            Design <span className="canvas-title-italic">for</span> Everyone
                        </h2>
                        <div className="canvas-principles-list">
                            {designPrinciples.map((p, index) => (
                                <div key={index} className="canvas-index-row">
                                    <span className="index-roman">{p.roman}</span>
                                    <span className="index-dots"></span>
                                    <span className="index-text">{p.text.toUpperCase()}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 2. GRUP: ENGINEERING (Yazılım dünyasının felsefi yüzü) */}
                    <div className="content-group eng-group">
                        <h2 className="canvas-title">
                            Code <span className="canvas-title-italic">of</span>  Precision
                        </h2>
                        <div className="canvas-principles-list">
                            {engineeringPrinciples.map((p, index) => (
                                <div key={index} className="canvas-index-row">
                                    <span className="index-roman">{p.roman}</span>
                                    <span className="index-dots"></span>
                                    <span className="index-text">{p.text.toUpperCase()}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
                <img src="/assets/gallery/signal.svg" alt="Signal Graphic" className="canvas-image" />
                <div className="card-section-black-overlay"></div>
            </div>
        </section>
    );
}