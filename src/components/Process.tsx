"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
    {
        number: "01",
        title: "LISTEN",
        serif: "Understanding the dream",
        body: "Every project begins with a conversation. We sit with you, absorb your vision, study the land, and feel the space before a single line is drawn. Architecture starts with understanding — not just what you want to build, but why.",
    },
    {
        number: "02",
        title: "SKETCH",
        serif: "Charcoal meets grid paper",
        body: "Our finest ideas are born on paper. Raw charcoal sketches on grid paper capture the emotional essence of a space before precision takes over. These aren't drawings — they're explorations of possibility.",
    },
    {
        number: "03",
        title: "REFINE",
        serif: "Blueprints and precision",
        body: "The sketch evolves into architectural precision. Every measurement, every material, every angle is engineered to perfection. We obsess over the details so the final space feels effortless.",
    },
    {
        number: "04",
        title: "REALIZE",
        serif: "From paper to reality",
        body: "The blueprint becomes real. We guide every phase of construction with the same intensity as the design itself — because architecture isn't finished until it's lived in, breathed in, felt.",
    },
];

export default function Process() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Each step reveals
            steps.forEach((_, i) => {
                gsap.from(`.process-step-${i}`, {
                    y: 60,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: `.process-step-${i}`,
                        start: "top 75%",
                    },
                });
            });

            // Heading
            gsap.from(".process-heading", {
                y: 80,
                opacity: 0,
                duration: 1.2,
                stagger: 0.1,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: ".process-heading",
                    start: "top 80%",
                },
            });

            // Vertical line grows
            gsap.from(".process-line", {
                scaleY: 0,
                transformOrigin: "top",
                duration: 1.5,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".process-timeline",
                    start: "top 70%",
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative w-full py-16 md:py-44 px-6 md:px-14"
        >
            {/* Label */}
            <div className="mb-4">
                <span
                    style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.6rem",
                        fontWeight: 700,
                        letterSpacing: "0.25em",
                        color: "var(--charcoal-ink)",
                        opacity: 0.8,
                    }}
                >
                    [ HOW WE WORK ]
                </span>
            </div>

            {/* Heading */}
            <div className="mb-20 md:mb-28">
                <div className="overflow-hidden">
                    <h2
                        className="process-heading"
                        style={{
                            fontSize: "clamp(2rem, 5vw, 4.5rem)",
                            fontWeight: 900,
                            lineHeight: 0.95,
                            letterSpacing: "-0.04em",
                        }}
                    >
                        EVERY GREAT SPACE
                    </h2>
                </div>
                <div className="overflow-hidden">
                    <h2
                        className="process-heading"
                        style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "clamp(2rem, 5vw, 4.5rem)",
                            fontWeight: 300,
                            fontStyle: "italic",
                            lineHeight: 0.95,
                            letterSpacing: "0.01em",
                        }}
                    >
                        begins with a story
                    </h2>
                </div>
            </div>

            {/* Process Timeline */}
            <div className="process-timeline relative">
                {/* Vertical connecting line */}
                <div
                    className="process-line hidden md:block absolute left-[32px] top-0 bottom-0"
                    style={{
                        width: "1px",
                        backgroundColor: "rgba(10,10,10,0.08)",
                    }}
                />

                {/* Steps */}
                <div className="flex flex-col gap-16 md:gap-20">
                    {steps.map((step, i) => (
                        <div
                            key={i}
                            className={`process-step-${i} grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start`}
                        >
                            {/* Number */}
                            <div className="md:col-span-1 relative">
                                <div
                                    className="relative z-10 flex items-center justify-center"
                                    style={{
                                        width: "64px",
                                        height: "64px",
                                        border: "1px solid rgba(10,10,10,0.1)",
                                        backgroundColor: "var(--bg-paper)",
                                    }}
                                >
                                    <span
                                        style={{
                                            fontFamily: "var(--font-mono)",
                                            fontSize: "0.7rem",
                                            fontWeight: 700,
                                            letterSpacing: "0.1em",
                                            color: "var(--charcoal-ink)",
                                            opacity: 0.6,
                                        }}
                                    >
                                        {step.number}
                                    </span>
                                </div>
                            </div>

                            {/* Title */}
                            <div className="md:col-span-3 flex flex-col gap-1 md:pt-4">
                                <h3
                                    style={{
                                        fontSize: "clamp(1.3rem, 2vw, 1.8rem)",
                                        fontWeight: 800,
                                        letterSpacing: "-0.03em",
                                        lineHeight: 1,
                                    }}
                                >
                                    {step.title}
                                </h3>
                                <span
                                    style={{
                                        fontFamily: "var(--font-serif)",
                                        fontSize: "0.95rem",
                                        fontStyle: "italic",
                                        fontWeight: 300,
                                        color: "var(--text-secondary)",
                                        opacity: 0.6,
                                    }}
                                >
                                    {step.serif}
                                </span>
                            </div>

                            {/* Description */}
                            <div className="md:col-span-6 md:col-start-6 md:pt-4">
                                <p
                                    style={{
                                        fontSize: "0.88rem",
                                        lineHeight: 1.9,
                                        color: "var(--text-secondary)",
                                        maxWidth: "500px",
                                    }}
                                >
                                    {step.body}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="section-divider mt-28 md:mt-44" />
        </section>
    );
}
