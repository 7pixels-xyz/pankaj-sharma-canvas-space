"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const blueprints = [
    {
        src: "/images/blueprint-1.png",
        title: "LUXURY VILLA — FLOOR PLAN",
        code: "DWG-A001",
        description: "Ground floor layout with infinity pool integration",
    },
    {
        src: "/images/blueprint-2.png",
        title: "MULTI-STORY — SECTION A-A",
        code: "DWG-A002",
        description: "Structural cross-section revealing spatial hierarchy",
    },
    {
        src: "/images/blueprint-3.png",
        title: "COMMERCIAL COMPLEX — SITE",
        code: "DWG-A003",
        description: "Master site plan with landscape architecture",
    },
    {
        src: "/images/blueprint-4.png",
        title: "MODERN RESIDENCE — INTERIOR",
        code: "DWG-A004",
        description: "Open-plan living with structural column grid",
    },
    {
        src: "/images/hero-sketch.png",
        title: "GLASS PAVILION — CONCEPT",
        code: "DWG-A005",
        description: "Initial concept sketch exploring verticality",
    },
];

export default function BlueprintSlider() {
    const sectionRef = useRef<HTMLElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [progress, setProgress] = useState(0);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springX = useSpring(mouseX, { stiffness: 80, damping: 20 });
    const springY = useSpring(mouseY, { stiffness: 80, damping: 20 });

    useEffect(() => {
        const handleMouse = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener("mousemove", handleMouse);
        return () => window.removeEventListener("mousemove", handleMouse);
    }, [mouseX, mouseY]);

    useEffect(() => {
        if (!sectionRef.current || !trackRef.current) return;

        const ctx = gsap.context(() => {
            const totalWidth = trackRef.current!.scrollWidth - window.innerWidth;
            // Map the horizontal width to a shorter vertical distance for much faster scrolling
            const scrollDistance = totalWidth * 0.35;

            gsap.to(trackRef.current, {
                x: -totalWidth,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: () => `+=${scrollDistance}`,
                    pin: true,
                    scrub: 0.5,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                    onUpdate: (self) => setProgress(self.progress),
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative w-full overflow-hidden"
            style={{ minHeight: "100vh" }}
            id="work"
        >
            {/* Top bar with label and progress */}
            <div
                className="absolute top-0 left-0 w-full flex items-center justify-between px-6 md:px-14 py-6"
                style={{ zIndex: 10 }}
            >
                <span
                    style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.6rem",
                        fontWeight: 700,
                        letterSpacing: "0.2em",
                        color: "var(--charcoal-ink)",
                        opacity: 0.8,
                    }}
                >
                    [ 02 — BLUEPRINT VIEWER ]
                </span>

                {/* Progress indicator */}
                <div className="flex items-center gap-4">
                    <span
                        className="stat-number"
                        style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.6rem",
                            fontWeight: 700,
                            letterSpacing: "0.1em",
                            color: "var(--charcoal-ink)",
                            opacity: 0.8,
                        }}
                    >
                        {String(Math.floor(progress * blueprints.length) + 1).padStart(2, "0")} / {String(blueprints.length).padStart(2, "0")}
                    </span>
                    <div
                        style={{
                            width: "80px",
                            height: "1px",
                            backgroundColor: "rgba(10,10,10,0.1)",
                        }}
                    >
                        <div
                            style={{
                                height: "100%",
                                width: `${progress * 100}%`,
                                backgroundColor: "var(--charcoal-ink)",
                                transition: "width 0.1s",
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Bottom instruction */}
            <div
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
                style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6rem",
                    fontWeight: 700,
                    letterSpacing: "0.25em",
                    color: "var(--charcoal-ink)",
                    opacity: 0.8,
                    zIndex: 10,
                }}
            >
                SCROLL TO EXPLORE BLUEPRINTS
            </div>

            {/* Horizontal track */}
            <div
                ref={trackRef}
                className="blueprint-track items-center gap-0 px-[5vw] md:px-[8vw]"
                style={{ height: "100vh" }}
            >
                {blueprints.map((bp, i) => (
                    <div
                        key={i}
                        className="relative flex-shrink-0 flex items-center justify-center w-[85vw] md:w-[70vw]"
                        style={{
                            height: "78vh",
                            marginRight: i < blueprints.length - 1 ? "5vw" : 0,
                        }}
                        onMouseEnter={() => setHoveredIndex(i)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        data-cursor-hover
                    >
                        <div className="relative w-full h-full overflow-hidden premium-card">
                            <Image
                                src={bp.src}
                                alt={bp.title}
                                fill
                                className="object-contain gpu-layer"
                                style={{ filter: "contrast(1.08) brightness(0.98)" }}
                            />

                            {/* Technical info — bottom left */}
                            <div
                                className="absolute bottom-5 left-5 flex flex-col gap-1"
                                style={{
                                    fontFamily: "var(--font-mono)",
                                    fontSize: "0.55rem",
                                    letterSpacing: "0.12em",
                                    color: "var(--charcoal-ink)",
                                }}
                            >
                                <span style={{ opacity: 0.9, fontWeight: 700, fontSize: "0.6rem" }}>{bp.code}</span>
                                <span style={{ opacity: 0.8, fontWeight: 500, fontSize: "0.6rem" }}>{bp.title}</span>
                                <span
                                    style={{
                                        fontFamily: "var(--font-serif)",
                                        fontSize: "0.8rem",
                                        fontStyle: "italic",
                                        fontWeight: 400,
                                        letterSpacing: "0.02em",
                                        opacity: 0.7,
                                        marginTop: "4px",
                                    }}
                                >
                                    {bp.description}
                                </span>
                            </div>

                            {/* Subtle border */}
                            <div
                                className="absolute inset-0 pointer-events-none"
                                style={{ border: "1px solid rgba(10,10,10,0.06)" }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Cursor-following EXPLORE tag */}
            {hoveredIndex !== null && (
                <motion.div
                    className="fixed pointer-events-none hidden md:block"
                    style={{
                        x: springX,
                        y: springY,
                        zIndex: 100,
                        translateX: "20px",
                        translateY: "-50%",
                    }}
                >
                    <div
                        style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.6rem",
                            letterSpacing: "0.15em",
                            color: "var(--white-pure)",
                            backgroundColor: "var(--accent-red)",
                            padding: "8px 16px",
                            whiteSpace: "nowrap",
                        }}
                    >
                        [ EXPLORE 3D ]
                    </div>
                </motion.div>
            )}
        </section>
    );
}
