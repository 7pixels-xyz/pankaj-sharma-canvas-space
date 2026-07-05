"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Staggered entrance
            const tl = gsap.timeline({ delay: 1.8 });

            tl.from(".hero-line", {
                y: 120,
                opacity: 0,
                duration: 1.2,
                stagger: 0.15,
                ease: "power4.out",
            })
                .from(
                    ".hero-tag",
                    {
                        y: 20,
                        opacity: 0,
                        duration: 0.8,
                        stagger: 0.1,
                        ease: "power3.out",
                    },
                    "-=0.6"
                )
                .from(
                    ".hero-image-reveal",
                    {
                        clipPath: "inset(100% 0 0 0)",
                        duration: 1.4,
                        ease: "power4.inOut",
                    },
                    "-=1"
                );

            // Parallax on scroll
            gsap.to(titleRef.current, {
                yPercent: -40,
                opacity: 0.3,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1.5,
                },
            });

            gsap.to(imageRef.current, {
                yPercent: 15,
                scale: 1.05,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1,
                },
            });

            gsap.to(overlayRef.current, {
                opacity: 0.6,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1,
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative w-full overflow-hidden"
            style={{ height: "100vh" }}
        >
            {/* Background image with reveal */}
            <div
                ref={imageRef}
                className="absolute inset-0 gpu-layer hero-image-reveal"
                style={{ zIndex: 0, clipPath: "inset(0)" }}
            >
                <Image
                    src="/images/hero-new.png"
                    alt="Architectural space by Canvas Space"
                    fill
                    className="object-cover"
                    style={{ opacity: 0.85 }}
                    priority
                />
            </div>

            {/* Dark gradient overlay */}
            <div
                ref={overlayRef}
                className="absolute inset-0 pointer-events-none"
                style={{
                    zIndex: 1,
                    background:
                        "linear-gradient(180deg, rgba(230,228,219,0.3) 0%, rgba(242,240,235,0.7) 40%, rgba(242,240,235,1) 100%)",
                    opacity: 0.8,
                }}
            />

            {/* Geometric construction lines */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{ zIndex: 1 }}
            >
                <svg
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 1920 1080"
                    preserveAspectRatio="none"
                    style={{ opacity: 0.06 }}
                >
                    <line x1="960" y1="0" x2="960" y2="1080" stroke="#0A0A0A" strokeWidth="0.5" />
                    <line x1="0" y1="540" x2="1920" y2="540" stroke="#0A0A0A" strokeWidth="0.5" />
                    <circle cx="960" cy="540" r="350" fill="none" stroke="#0A0A0A" strokeWidth="0.3" />
                    <circle cx="960" cy="540" r="250" fill="none" stroke="#0A0A0A" strokeWidth="0.3" />
                    <circle cx="960" cy="540" r="150" fill="none" stroke="#0A0A0A" strokeWidth="0.3" />
                </svg>
            </div>

            {/* Main title group */}
            <div
                ref={titleRef}
                className="absolute inset-0 flex items-center justify-center gpu-layer"
                style={{ zIndex: 2 }}
            >
                <div className="text-center px-4">
                    {/* Eyebrow */}
                    <div className="overflow-hidden mb-6">
                        <p
                            className="hero-line"
                            style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: "0.6rem",
                                letterSpacing: "0.35em",
                                color: "var(--charcoal-ink)",
                                opacity: 0.4,
                            }}
                        >
                            PANKAJ SHARMA PRESENTS
                        </p>
                    </div>

                    {/* Title */}
                    <div className="overflow-hidden">
                        <h1
                            className="hero-line"
                            style={{
                                fontSize: "clamp(3.5rem, 14vw, 16rem)",
                                fontWeight: 900,
                                lineHeight: 0.82,
                                letterSpacing: "-0.06em",
                                color: "var(--charcoal-ink)",
                            }}
                        >
                            CANVAS
                        </h1>
                    </div>
                    <div className="overflow-hidden">
                        <h1
                            className="hero-line"
                            style={{
                                fontFamily: "var(--font-serif)",
                                fontSize: "clamp(3rem, 12vw, 14rem)",
                                fontWeight: 300,
                                fontStyle: "italic",
                                lineHeight: 0.85,
                                letterSpacing: "0.02em",
                                color: "var(--charcoal-ink)",
                                marginTop: "0.05em",
                            }}
                        >
                            Space
                        </h1>
                    </div>

                    {/* Tagline */}
                    <div className="overflow-hidden mt-8">
                        <p
                            className="hero-line"
                            style={{
                                fontFamily: "var(--font-serif)",
                                fontSize: "clamp(0.9rem, 1.5vw, 1.3rem)",
                                fontWeight: 300,
                                fontStyle: "italic",
                                color: "var(--text-secondary)",
                                letterSpacing: "0.02em",
                            }}
                        >
                            Where vision meets the raw beauty of space
                        </p>
                    </div>
                </div>
            </div>

            {/* Corner data tags */}
            <div
                className="absolute bottom-10 left-6 md:left-14 hero-tag"
                style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.55rem",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    color: "var(--charcoal-ink)",
                    opacity: 0.7,
                    zIndex: 3,
                    lineHeight: 1.8,
                }}
            >
                ARCHITECTURE
                <br />
                SPACE PLANNING
                <br />
                CONCEPT DESIGN
            </div>

            <div
                className="absolute bottom-10 right-6 md:right-14 text-right hero-tag hidden md:block"
                style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.55rem",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    color: "var(--charcoal-ink)",
                    opacity: 0.7,
                    zIndex: 3,
                    lineHeight: 1.8,
                }}
            >
                EST. 2026
                <br />
                PUNE, IN
            </div>

            {/* Scroll indicator */}
            <div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 hero-tag flex flex-col items-center gap-2"
                style={{ zIndex: 3 }}
            >
                <span
                    style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.5rem",
                        fontWeight: 700,
                        letterSpacing: "0.2em",
                        color: "var(--charcoal-ink)",
                        opacity: 0.6,
                    }}
                >
                    SCROLL
                </span>
                <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 30 }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    style={{
                        width: "1px",
                        backgroundColor: "var(--charcoal-ink)",
                        opacity: 0.3,
                    }}
                />
            </div>

            {/* Bottom divider */}
            <div className="absolute bottom-0 left-0 w-full section-divider" />
        </section>
    );
}

// Import motion for the scroll indicator
import { motion } from "framer-motion";
