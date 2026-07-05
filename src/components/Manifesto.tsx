"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Manifesto() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Each line reveals as user scrolls
            gsap.from(".manifesto-line", {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 60%",
                },
            });

            // Parallax on the large quote mark
            gsap.to(".quote-mark", {
                yPercent: -30,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.5,
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative w-full py-32 md:py-52 px-6 md:px-14 overflow-hidden"
        >
            {/* Giant decorative quote mark */}
            <div
                className="quote-mark absolute -top-10 -left-4 md:left-8 pointer-events-none select-none gpu-layer"
                style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(15rem, 30vw, 35rem)",
                    fontWeight: 300,
                    lineHeight: 0.8,
                    color: "var(--charcoal-ink)",
                    opacity: 0.03,
                }}
            >
                &ldquo;
            </div>

            {/* Content */}
            <div className="relative max-w-4xl mx-auto">
                <div className="overflow-hidden mb-8">
                    <p
                        className="manifesto-line"
                        style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.6rem",
                            letterSpacing: "0.3em",
                            color: "var(--charcoal-ink)",
                            opacity: 0.3,
                        }}
                    >
                        OUR PHILOSOPHY
                    </p>
                </div>

                <div className="overflow-hidden">
                    <h2
                        className="manifesto-line"
                        style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "clamp(1.6rem, 3.5vw, 3rem)",
                            fontWeight: 300,
                            fontStyle: "italic",
                            lineHeight: 1.5,
                            color: "var(--charcoal-ink)",
                            opacity: 0.85,
                        }}
                    >
                        We don&apos;t just design buildings.
                    </h2>
                </div>
                <div className="overflow-hidden">
                    <h2
                        className="manifesto-line"
                        style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "clamp(1.6rem, 3.5vw, 3rem)",
                            fontWeight: 300,
                            fontStyle: "italic",
                            lineHeight: 1.5,
                            color: "var(--charcoal-ink)",
                            opacity: 0.85,
                        }}
                    >
                        We design the silence between walls,
                    </h2>
                </div>
                <div className="overflow-hidden">
                    <h2
                        className="manifesto-line"
                        style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "clamp(1.6rem, 3.5vw, 3rem)",
                            fontWeight: 300,
                            fontStyle: "italic",
                            lineHeight: 1.5,
                            color: "var(--charcoal-ink)",
                            opacity: 0.85,
                        }}
                    >
                        the light that enters a room at 4 PM,
                    </h2>
                </div>
                <div className="overflow-hidden">
                    <h2
                        className="manifesto-line"
                        style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "clamp(1.6rem, 3.5vw, 3rem)",
                            fontWeight: 300,
                            fontStyle: "italic",
                            lineHeight: 1.5,
                            color: "var(--charcoal-ink)",
                            opacity: 0.85,
                        }}
                    >
                        the way concrete meets sky.
                    </h2>
                </div>

                <div className="overflow-hidden mt-12">
                    <div className="manifesto-line flex items-center gap-4">
                        <div
                            style={{
                                width: "50px",
                                height: "1px",
                                backgroundColor: "var(--accent-red)",
                            }}
                        />
                        <span
                            style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: "0.6rem",
                                letterSpacing: "0.15em",
                                color: "var(--accent-red)",
                                opacity: 0.7,
                            }}
                        >
                            PANKAJ SHARMA — FOUNDER
                        </span>
                    </div>
                </div>
            </div>

            <div className="section-divider mt-28 md:mt-44" />
        </section>
    );
}
