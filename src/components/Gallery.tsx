"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        src: "/images/gallery-1.png",
        title: "THE GLASS PAVILION",
        category: "COMMERCIAL",
        number: "01",
        span: "md:row-span-2",
        aspect: "aspect-[3/4]",
    },
    {
        src: "/images/gallery-2.png",
        title: "CONCRETE SANCTUARY",
        category: "RESIDENTIAL",
        number: "02",
        span: "",
        aspect: "aspect-[4/3]",
    },
    {
        src: "/images/gallery-3.png",
        title: "RAW SURFACES",
        category: "MATERIAL STUDY",
        number: "03",
        span: "",
        aspect: "aspect-square",
    },
    {
        src: "/images/gallery-4.png",
        title: "URBAN GEOMETRY",
        category: "URBAN PLANNING",
        number: "04",
        span: "md:col-span-2",
        aspect: "aspect-[16/9]",
    },
    {
        src: "/images/gallery-5.png",
        title: "CURVED VOLUMES",
        category: "CULTURAL",
        number: "05",
        span: "",
        aspect: "aspect-[3/4]",
    },
    {
        src: "/images/gallery-6.png",
        title: "TWILIGHT RESIDENCE",
        category: "LUXURY RESIDENTIAL",
        number: "06",
        span: "",
        aspect: "aspect-[4/3]",
    },
];

export default function Gallery() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Heading entrance
            gsap.from(".gallery-heading-line", {
                y: 100,
                duration: 1.2,
                stagger: 0.12,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: ".gallery-heading",
                    start: "top 80%",
                },
            });

            // Gallery items — stagger with clip-path
            gsap.from(".gallery-item", {
                y: 60,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".gallery-grid",
                    start: "top 70%",
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative w-full py-28 md:py-44 px-6 md:px-14"
            id="studio"
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
                    [ 03 — SELECTED WORKS ]
                </span>
            </div>

            {/* Section heading */}
            <div className="gallery-heading mb-20 md:mb-28">
                <div className="overflow-hidden">
                    <h2
                        className="gallery-heading-line"
                        style={{
                            fontSize: "clamp(2.5rem, 8vw, 7rem)",
                            fontWeight: 900,
                            lineHeight: 0.92,
                            letterSpacing: "-0.05em",
                        }}
                    >
                        FROM PAPER
                    </h2>
                </div>
                <div className="overflow-hidden flex items-baseline gap-4">
                    <h2
                        className="gallery-heading-line"
                        style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "clamp(2.5rem, 8vw, 7rem)",
                            fontWeight: 300,
                            fontStyle: "italic",
                            lineHeight: 0.92,
                            letterSpacing: "0.01em",
                        }}
                    >
                        to reality
                    </h2>
                    <span
                        className="gallery-heading-line hidden md:inline-block"
                        style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.6rem",
                            fontWeight: 700,
                            letterSpacing: "0.15em",
                            opacity: 0.7,
                            alignSelf: "flex-end",
                            marginBottom: "0.5em",
                        }}
                    >
                        06 PROJECTS
                    </span>
                </div>
            </div>

            {/* Masonry Grid */}
            <div className="gallery-grid grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                {projects.map((project, i) => (
                    <div
                        key={i}
                        className={`gallery-item relative overflow-hidden group ${project.span}`}
                        data-cursor-hover
                    >
                        <div className={`relative ${project.aspect} w-full overflow-hidden`}>
                            <Image
                                src={project.src}
                                alt={project.title}
                                fill
                                className="object-cover gallery-image gpu-layer"
                            />

                            {/* Premium hover overlay (always visible on mobile) */}
                            <div
                                className="absolute inset-0 flex flex-col items-start justify-end p-6 opacity-100 md:opacity-0 group-hover:opacity-100 transition-all duration-700"
                                style={{
                                    zIndex: 2,
                                    background:
                                        "linear-gradient(180deg, transparent 40%, rgba(10,10,10,0.7) 100%)",
                                }}
                            >
                                <span
                                    style={{
                                        fontFamily: "var(--font-mono)",
                                        fontSize: "0.5rem",
                                        letterSpacing: "0.2em",
                                        color: "var(--white-pure)",
                                        opacity: 0.6,
                                        marginBottom: "0.5rem",
                                    }}
                                >
                                    {project.category}
                                </span>
                                <span
                                    style={{
                                        fontFamily: "var(--font-display)",
                                        fontSize: "1rem",
                                        fontWeight: 700,
                                        letterSpacing: "-0.02em",
                                        color: "var(--white-pure)",
                                    }}
                                >
                                    {project.title}
                                </span>
                                <div className="flex items-center gap-3 mt-3">
                                    <div
                                        style={{
                                            width: "20px",
                                            height: "1px",
                                            backgroundColor: "var(--accent-red)",
                                        }}
                                    />
                                    <span
                                        style={{
                                            fontFamily: "var(--font-mono)",
                                            fontSize: "0.55rem",
                                            letterSpacing: "0.15em",
                                            color: "var(--accent-red)",
                                        }}
                                    >
                                        VIEW PROJECT
                                    </span>
                                </div>
                            </div>

                            {/* Number tag */}
                            <div
                                className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                style={{
                                    fontFamily: "var(--font-mono)",
                                    fontSize: "0.55rem",
                                    letterSpacing: "0.1em",
                                    color: "var(--white-pure)",
                                    opacity: 0.5,
                                    zIndex: 3,
                                }}
                            >
                                {project.number}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="section-divider mt-24 md:mt-36" />
        </section>
    );
}
