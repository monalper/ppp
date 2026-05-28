import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './EssaysEmptySection.css';

export default function EssaysEmptySection() {
    const sectionRef = useRef(null);
    const badgeRef = useRef(null);
    const subtitleRef = useRef(null);
    const titleRef = useRef(null);
    const textRef = useRef(null);
    const itemRefs = useRef([]);

    const essayThemes = [
        {
            title: 'Society',
            text: 'Notes on culture, incentives, and the systems that make people more capable together.',
        },
        {
            title: 'Curiosity',
            text: 'Questions about learning, attention, and why people keep searching for better explanations.',
        },
        {
            title: 'Meaning',
            text: 'Small philosophical reflections on effort, absurdity, craft, and choosing a useful direction.',
        },
    ];

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 75%',
                    toggleActions: 'play none none reverse',
                },
            });

            tl.fromTo([badgeRef.current, subtitleRef.current, titleRef.current],
                { opacity: 0, y: 25 },
                { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out' }
            );

            tl.fromTo(textRef.current,
                { opacity: 0, y: 24 },
                { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out' },
                '-=0.2'
            );

            tl.fromTo(itemRefs.current,
                { opacity: 0, y: 28 },
                { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'power2.out' },
                '-=0.25'
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="essays-empty-section" ref={sectionRef}>
            <div className="essays-empty-section__inner">
                <div className="essays-empty-section__header">
                    <img
                        src="/assets/building-badge.svg"
                        alt=""
                        className="essays-empty-section__badge"
                        ref={badgeRef}
                    />
                    <p className="essays-empty-section__subtitle" ref={subtitleRef}>
                    </p>
                    <h2 className="essays-empty-section__title" ref={titleRef}>
                        Written to Think More Clearly
                    </h2>
                </div>

                <div className="essays-empty-section__body">
                    <p className="essays-empty-section__text" ref={textRef}>
                        My essays are where I slow down ideas that usually move too quickly: how people build,
                        why we keep asking, and what makes work worth repeating.
                    </p>

                    <div className="essays-empty-section__themes">
                        {essayThemes.map((theme, index) => (
                            <article
                                className="essays-empty-section__theme"
                                key={theme.title}
                                ref={(element) => {
                                    itemRefs.current[index] = element;
                                }}
                            >
                                <span className="essays-empty-section__theme-index">
                                    {String(index + 1).padStart(2, '0')}
                                </span>
                                <h3 className="essays-empty-section__theme-title">{theme.title}</h3>
                                <p className="essays-empty-section__theme-text">{theme.text}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
