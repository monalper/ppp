import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './AboutSection.css';

const storyFrames = [
    {
        year: 2006,
        image: '/assets/photo-1.jpg',
        alt: 'Early personal archive',
        texts: [
            'In 2006, my curiosity started with simple things: drawing, collecting visual references, and trying to understand why certain objects felt memorable.',
            'Those early years were mostly instinct. I was paying attention to color, shape, and small visual details before I had words for design.',
            'By repeating small experiments, I started to notice that making things was also a way of thinking clearly.',
        ],
    },
    {
        year: 2018,
        image: '/assets/photo-2.jpg',
        alt: 'Creative work archive',
        texts: [
            'By 2018, design and software had started to meet in the same place. I was learning to turn visual instincts into usable products, systems, and interfaces.',
            'I became more interested in how an idea behaves after it leaves the mockup: how it loads, responds, scales, and feels in real use.',
            'That period shaped the way I work now, keeping craft, structure, and usefulness close to each other.',
        ],
    },
    {
        year: 2026,
        image: '/assets/photo-3.jpg',
        alt: 'Current personal archive',
        texts: [
            'Today, I work between engineering and design: building clean software, shaping visual systems, and keeping the smallest details close to the bigger idea.',
        ],
    },
];

const START_YEAR = 2006;
const MID_YEAR = 2018;
const END_YEAR = 2026;

const backgroundBoxes = [
    { image: '/assets/bio/1.jpg', width: '210px', left: '4%', top: '65%', opacity: 0.35, speed: 0.7 },
    { image: '/assets/bio/2.webp', width: '240px', left: '12%', top: '15%', opacity: 0.4, speed: 1.1 },
    { image: '/assets/bio/3.webp', width: '180px', left: '24%', top: '75%', opacity: 0.35, speed: 0.8 },
    { image: '/assets/bio/4.webp', width: '210px', left: '30%', top: '22%', opacity: 0.4, speed: 1.0 },
    { image: '/assets/bio/5.jpg', width: '210px', left: '68%', top: '78%', opacity: 0.4, speed: 0.9 },
    { image: '/assets/bio/6.jpg', width: '260px', left: '74%', top: '12%', opacity: 0.45, speed: 1.15 },
    { image: '/assets/bio/7.jfif', width: '230px', left: '86%', top: '68%', opacity: 0.4, speed: 1.0 },
    { image: '/assets/bio/8.jfif', width: '170px', left: '94%', top: '32%', opacity: 0.35, speed: 0.75 },
];

const decorativeBars = [
    { left: '8%', top: '42%', width: '140px', speed: 0.6 },
    { left: '22%', top: '55%', width: '120px', speed: 0.8 },
    { left: '34%', top: '82%', width: '130px', speed: 0.5 },
    { left: '66%', top: '22%', width: '110px', speed: 0.9 }, 
    { left: '72%', top: '50%', width: '150px', speed: 0.7 },
    { left: '84%', top: '85%', width: '120px', speed: 0.8 },
    { left: '92%', top: '15%', width: '140px', speed: 1.0 },
];

export default function AboutSection() {
    const containerRef = useRef(null);
    const canvasContainerRef = useRef(null);
    const canvasRef = useRef(null);
    const badgeRef = useRef(null);
    const titleRef = useRef(null);
    const yearRef = useRef(null);
    const storyRef = useRef(null);
    const photoStackRef = useRef(null);
    const bottomControlsRef = useRef(null);
    const imageRefs = useRef([]);
    const backgroundBoxRefs = useRef([]);
    const decorativeBarRefs = useRef([]);
    const activeFrameRef = useRef(0);
    const activeTextRef = useRef(0);
    const isCanvasExpandedRef = useRef(false);

    const mouseRef = useRef({ x: 0, y: 0 });
    const scrollProgressRef = useRef(0);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            const images = imageRefs.current.filter(Boolean);
            const backgroundPortraits = backgroundBoxRefs.current.filter(Boolean);
            const backgroundBars = decorativeBarRefs.current.filter(Boolean);

            const renderBackgroundPositions = (scrollProgress, mouseX, mouseY) => {
                const viewportTravel = window.innerHeight * 0.95;
                const mouseMaxMove = 40; 

                backgroundPortraits.forEach((portrait, index) => {
                    const box = backgroundBoxes[index];
                    const scrollY = (0.5 - scrollProgress) * viewportTravel * box.speed;
                    const mouseXOffset = mouseX * mouseMaxMove * box.speed;
                    const mouseYOffset = mouseY * mouseMaxMove * box.speed;

                    gsap.to(portrait, {
                        x: mouseXOffset,
                        y: scrollY + mouseYOffset,
                        duration: 0.6,
                        ease: 'power2.out',
                        overwrite: 'auto'
                    });
                });

                backgroundBars.forEach((bar, index) => {
                    const config = decorativeBars[index];
                    const scrollY = (0.5 - scrollProgress) * viewportTravel * config.speed;
                    const mouseXOffset = mouseX * mouseMaxMove * config.speed;
                    const mouseYOffset = mouseY * mouseMaxMove * config.speed;

                    gsap.to(bar, {
                        x: mouseXOffset,
                        y: scrollY + mouseYOffset,
                        duration: 0.6,
                        ease: 'power2.out',
                        overwrite: 'auto'
                    });
                });
            };

            const setActiveFrame = (frameIndex) => {
                if (frameIndex === activeFrameRef.current) return;
                activeFrameRef.current = frameIndex;

                if (isCanvasExpandedRef.current) {
                    gsap.to(images, {
                        opacity: (index) => (index === frameIndex ? 1 : 0),
                        scale: (index) => (index === frameIndex ? 1 : 0.97),
                        duration: 0.45,
                        ease: 'power2.out',
                        overwrite: true,
                    });
                }
            };

            const setActiveText = (textIndex, text) => {
                if (textIndex === activeTextRef.current) return;
                activeTextRef.current = textIndex;

                if (!isCanvasExpandedRef.current) {
                    storyRef.current.textContent = text;
                    return;
                }

                gsap.to(storyRef.current, {
                    opacity: 0,
                    y: 6,
                    duration: 0.18,
                    ease: 'power1.out',
                    overwrite: true,
                    onComplete: () => {
                        storyRef.current.textContent = text;
                        gsap.to(storyRef.current, {
                            opacity: 1,
                            y: 0,
                            duration: 0.3,
                            ease: 'power2.out',
                            overwrite: true,
                        });
                    },
                });
            };

            const updateTimeline = (progress) => {
                // ÖNEMLİ: Progress hesabı artık timeline'ın gerçek akış kısmına (0.4 ile 1.0 arasına) scale edildi.
                // Böylece elemanlar ekrana gelene kadar (0.0 - 0.4 arası) timeline ve yazılar sabit kalır.
                let timelineProgress = 0;
                if (progress >= 0.4) {
                    timelineProgress = (progress - 0.4) / 0.6;
                }

                scrollProgressRef.current = progress;
                const exactYear = START_YEAR + timelineProgress * (END_YEAR - START_YEAR);
                const currentYear = Math.round(exactYear);

                yearRef.current.textContent = currentYear;

                if (timelineProgress > 0.02 && isCanvasExpandedRef.current) {
                    yearRef.current.style.color = '#EFEEEC';
                } else {
                    yearRef.current.style.color = 'rgba(239, 238, 236, 0.4)';
                }

                const leftProgress = Math.min(1, Math.max(0, (exactYear - START_YEAR) / (MID_YEAR - START_YEAR)));
                const rightProgress = Math.min(1, Math.max(0, (END_YEAR - exactYear) / (END_YEAR - MID_YEAR)));

                canvasRef.current.style.setProperty('--left-progress', leftProgress);
                canvasRef.current.style.setProperty('--right-progress', rightProgress);
                
                renderBackgroundPositions(progress, mouseRef.current.x, mouseRef.current.y);

                let textIndex;
                let text;

                if (exactYear < MID_YEAR) {
                    const segmentProgress = (exactYear - START_YEAR) / (MID_YEAR - START_YEAR);
                    const segmentIndex = Math.min(2, Math.floor(segmentProgress * 3));
                    textIndex = segmentIndex;
                    text = storyFrames[0].texts[segmentIndex];
                } else {
                    const segmentProgress = (exactYear - MID_YEAR) / (END_YEAR - MID_YEAR);
                    const segmentIndex = Math.min(2, Math.floor(segmentProgress * 3));
                    textIndex = 3 + segmentIndex;
                    text = storyFrames[1].texts[segmentIndex];
                }

                if (currentYear >= END_YEAR) {
                    textIndex = 6;
                    text = storyFrames[2].texts[0];
                }

                setActiveText(textIndex, text);

                if (currentYear >= END_YEAR) {
                    setActiveFrame(2);
                } else if (currentYear >= MID_YEAR) {
                    setActiveFrame(1);
                } else {
                    setActiveFrame(0);
                }
            };

            const handleMouseMove = (e) => {
                const x = (e.clientX / window.innerWidth) * 2 - 1;
                const y = (e.clientY / window.innerHeight) * 2 - 1;
                mouseRef.current = { x, y };
                renderBackgroundPositions(scrollProgressRef.current, x, y);
            };

            window.addEventListener('mousemove', handleMouseMove);

            // İlk Kurulumlar
            gsap.set(images, { opacity: 0, scale: 0.97 });
            gsap.set(images[0], { opacity: 1, scale: 1 });
            gsap.set(backgroundPortraits, { xPercent: -50, yPercent: -50 });
            gsap.set(backgroundBars, { xPercent: -50, yPercent: -50 });
            
            // Elemanlar en başta görünmez ve aşağıda bekler
            gsap.set([photoStackRef.current, bottomControlsRef.current], { 
                opacity: 0, 
                y: 40, 
                pointerEvents: 'none' 
            });

            storyRef.current.textContent = storyFrames[0].texts[0];
            updateTimeline(0);

            // Üst Başlık Giriş Animasyonu
            gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 75%',
                    toggleActions: 'play none none reverse',
                },
            }).fromTo([badgeRef.current, titleRef.current],
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
            );

            // Ana Scroll Animasyon Kurgusu
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: canvasContainerRef.current,
                    start: 'top top',
                    end: '+=4500', // Scroll mesafesi biraz daha rahatlatıldı
                    scrub: 1,
                    pin: true,
                    onUpdate: (self) => updateTimeline(self.progress),
                },
            });

            // Adım 1: Önce sadece siyah canvas büyür (Yıllar/Yazılar henüz oynamaz)
            tl.to(canvasRef.current, {
                width: '100%',
                height: '100vh',
                borderRadius: '0px',
                ease: 'power2.inOut',
                duration: 0.25,
            });

            // Adım 2: Canvas büyümesi bittikten sonra elemanlar tertemiz sahneye gelir
            tl.to([photoStackRef.current, bottomControlsRef.current], {
                opacity: 1,
                y: 0,
                pointerEvents: 'auto',
                duration: 0.15,
                stagger: 0.05,
                ease: 'power2.out',
                onStart: () => {
                    isCanvasExpandedRef.current = true;
                },
                onReverseComplete: () => {
                    isCanvasExpandedRef.current = false;
                    gsap.set([photoStackRef.current, bottomControlsRef.current], { 
                        opacity: 0, 
                        y: 40, 
                        pointerEvents: 'none' 
                    });
                }
            });

            // Adım 3: Kullanıcı elemanları net görsün diye küçük bir duraklama payı (Mola)
            tl.to({}, { duration: 0.05 });

            // Adım 4: Buradan itibaren scroll devam ettikçe yıllar ve yazılar akmaya başlar (0.6'lık asıl pay)
            tl.to({}, { duration: 0.60 });

            return () => {
                window.removeEventListener('mousemove', handleMouseMove);
            };
        }, containerRef);

        return () => {
            ctx.revert();
        };
    }, []);

    return (
        <section className="about-section" ref={containerRef}>
            <div className="about-section__header">
                <img
                    src="/assets/building-badge.svg"
                    alt=""
                    className="about-section__badge"
                    ref={badgeRef}
                />
                <h2 className="about-section__title" ref={titleRef}>
                    A Brief History of Me
                </h2>
            </div>

            <div className="about-section__canvas-container" ref={canvasContainerRef}>
                <div className="about-section__canvas" ref={canvasRef}>
                    
                    <div className="about-section__background-boxes" aria-hidden="true">
                        {decorativeBars.map((bar, index) => (
                            <span
                                className="about-section__background-bar"
                                key={`bar-${index}`}
                                ref={(element) => {
                                    decorativeBarRefs.current[index] = element;
                                }}
                                style={{
                                    '--bar-left': bar.left,
                                    '--bar-top': bar.top,
                                    '--bar-width': bar.width,
                                }}
                            />
                        ))}

                        {backgroundBoxes.map((box, index) => (
                            <span
                                className="about-section__background-box"
                                key={box.image}
                                ref={(element) => {
                                    backgroundBoxRefs.current[index] = element;
                                }}
                                style={{
                                    '--box-width': box.width,
                                    '--box-left': box.left,
                                    '--box-top': box.top,
                                    '--box-opacity': box.opacity,
                                }}
                            >
                                <img src={box.image} alt="" className="about-section__background-image" loading="lazy" />
                            </span>
                        ))}
                    </div>

                    <div className="about-section__center-mask" aria-hidden="true"></div>

                    <div className="about-section__story-stage">
                        <div className="about-section__photo-stack" ref={photoStackRef} aria-live="polite">
                            {storyFrames.map((frame, index) => (
                                <img
                                    key={frame.year}
                                    src={frame.image}
                                    alt={frame.alt}
                                    className="about-section__photo"
                                    ref={(element) => {
                                        imageRefs.current[index] = element;
                                    }}
                                    onError={(event) => {
                                        event.currentTarget.onerror = null;
                                        event.currentTarget.src = '/assets/photo-2.jpg';
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="about-section__bottom-controls" ref={bottomControlsRef}>
                        <p className="about-section__story-text" ref={storyRef}></p>
                        <div className="about-section__timeline" aria-label="About timeline from 2006 to 2026">
                            <span className="about-section__timeline-bar about-section__timeline-bar--left"></span>
                            <span className="about-section__year" ref={yearRef}>{START_YEAR}</span>
                            <span className="about-section__timeline-bar about-section__timeline-bar--right"></span>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}