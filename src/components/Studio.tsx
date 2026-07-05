"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const stats = [
    { number: "48", label: "PROJECTS\nCOMPLETED" },
    { number: "12", label: "YEARS OF\nEXPERIENCE" },
    { number: "5", label: "CITIES\nACROSS INDIA" },
    { number: "16", label: "DESIGN\nAWARDS" },
];

export default function Studio() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Text reveal
            gsap.from(".studio-reveal", {
                y: 60,
                opacity: 0,
                duration: 1,
                stagger: 0.12,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 65%",
                },
            });

            // Image clip reveal
            gsap.from(".studio-image", {
                clipPath: "inset(0 0 100% 0)",
                duration: 1.4,
                ease: "power4.inOut",
                scrollTrigger: {
                    trigger: ".studio-image",
                    start: "top 70%",
                },
            });

            // Stats counter
            gsap.from(".stat-item", {
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".stats-grid",
                    start: "top 80%",
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative w-full py-28 md:py-44 px-6 md:px-14"
        >
            {/* Label */}
            <div className="studio-reveal mb-16">
                <span
                    style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.6rem",
                        letterSpacing: "0.25em",
                        color: "var(--charcoal-ink)",
                        opacity: 0.35,
                    }}
                >
                    [ 01 — THE STUDIO ]
                </span>
            </div>

            {/* Main content grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
                {/* Left — Image */}
                <div className="md:col-span-5 studio-reveal">
                    <div
                        className="studio-image relative overflow-hidden"
                        style={{
                            aspectRatio: "3/4",
                            clipPath: "inset(0)",
                        }}
                    >
                        <Image
                            src="/images/gallery-2.png"
                            alt="Canvas Space Studio"
                            fill
                            className="object-cover"
                            style={{ filter: "contrast(1.05) brightness(0.95)" }}
                        />
                        {/* Overlay tag */}
                        <div
                            className="absolute bottom-6 left-6"
                            style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: "0.55rem",
                                letterSpacing: "0.15em",
                                color: "var(--white-pure)",
                                opacity: 0.7,
                                mixBlendMode: "difference",
                            }}
                        >
                            PUNE, MAHARASHTRA
                        </div>
                    </div>
                </div>

                {/* Right — Text */}
                <div className="md:col-span-6 md:col-start-7 flex flex-col justify-center">
                    <div className="overflow-hidden">
                        <h2
                            className="studio-reveal"
                            style={{
                                fontSize: "clamp(2rem, 4vw, 3.2rem)",
                                fontWeight: 800,
                                lineHeight: 1,
                                letterSpacing: "-0.04em",
                                marginBottom: "0.3em",
                            }}
                        >
                            DESIGNED WITH
                        </h2>
                    </div>
                    <div className="overflow-hidden">
                        <h2
                            className="studio-reveal"
                            style={{
                                fontFamily: "var(--font-serif)",
                                fontSize: "clamp(2rem, 4vw, 3.2rem)",
                                fontWeight: 300,
                                fontStyle: "italic",
                                lineHeight: 1,
                                letterSpacing: "0.01em",
                                marginBottom: "2rem",
                            }}
                        >
                            intention & soul
                        </h2>
                    </div>

                    <p
                        className="studio-reveal"
                        style={{
                            fontSize: "0.9rem",
                            lineHeight: 1.9,
                            color: "var(--text-secondary)",
                            maxWidth: "480px",
                            marginBottom: "1.5rem",
                        }}
                    >
                        Canvas Space is led by Pankaj Sharma, an architect who believes that
                        every structure tells a story. Our studio merges raw, hand-drawn
                        conceptualization with precision engineering — creating spaces that
                        feel both timeless and profoundly human.
                    </p>

                    <p
                        className="studio-reveal"
                        style={{
                            fontSize: "0.9rem",
                            lineHeight: 1.9,
                            color: "var(--text-secondary)",
                            maxWidth: "480px",
                            marginBottom: "2.5rem",
                        }}
                    >
                        From charcoal sketches on grid paper to fully realized architectural
                        masterpieces, we guide every project with an obsessive attention to
                        materiality, light, and the emotional weight of space.
                    </p>

                    {/* Signature-style element */}
                    <div className="studio-reveal flex items-center gap-4">
                        <div
                            style={{
                                width: "40px",
                                height: "1px",
                                backgroundColor: "var(--charcoal-ink)",
                                opacity: 0.2,
                            }}
                        />
                        <span
                            style={{
                                fontFamily: "var(--font-serif)",
                                fontSize: "1rem",
                                fontStyle: "italic",
                                color: "var(--text-secondary)",
                                opacity: 0.7,
                            }}
                        >
                            Pankaj Sharma, Lead Architect
                        </span>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div
                className="stats-grid grid grid-cols-2 md:grid-cols-4 gap-px mt-24 md:mt-36"
                style={{
                    borderTop: "1px solid rgba(10,10,10,0.08)",
                    borderBottom: "1px solid rgba(10,10,10,0.08)",
                }}
            >
                {stats.map((stat, i) => (
                    <div
                        key={i}
                        className={`stat-item py-10 md:py-14 px-4 md:px-8 border-[rgba(10,10,10,0.08)] ${i % 2 === 0 ? "border-r" : ""
                            } md:border-r ${i < 2 ? "border-b md:border-b-0" : ""} ${i === stats.length - 1 ? "md:!border-r-0" : ""
                            }`}
                    >
                        <span
                            className="stat-number block"
                            style={{
                                fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                                fontWeight: 800,
                                lineHeight: 1,
                                letterSpacing: "-0.04em",
                                color: "var(--charcoal-ink)",
                                marginBottom: "0.8rem",
                            }}
                        >
                            {stat.number}
                        </span>
                        <span
                            style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: "0.55rem",
                                letterSpacing: "0.15em",
                                color: "var(--charcoal-ink)",
                                opacity: 0.35,
                                whiteSpace: "pre-line",
                                lineHeight: 1.6,
                            }}
                        >
                            {stat.label}
                        </span>
                    </div>
                ))}
            </div>

            <div className="section-divider mt-24 md:mt-36" />
        </section>
    );
}
