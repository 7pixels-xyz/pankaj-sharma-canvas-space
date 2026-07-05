"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { allProjects } from "@/data/projects";
import ProjectEmblem from "@/components/ProjectEmblem";

gsap.registerPlugin(ScrollTrigger);

export default function BlueprintSlider() {
    const sectionRef = useRef<HTMLElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [progress, setProgress] = useState(0);

    const featuredProjects = allProjects.slice(0, 4);

    // Modal state
    const [selectedProject, setSelectedProject] = useState<typeof allProjects[0] | null>(null);

    const currentIndex = selectedProject ? featuredProjects.findIndex(p => p.id === selectedProject.id) : -1;
    const hasNext = currentIndex !== -1 && currentIndex < featuredProjects.length - 1;
    const hasPrev = currentIndex > 0;

    const handleNext = () => {
        if (hasNext) setSelectedProject(featuredProjects[currentIndex + 1]);
    };

    const handlePrev = () => {
        if (hasPrev) setSelectedProject(featuredProjects[currentIndex - 1]);
    };

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

        let mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
            const totalWidth = trackRef.current!.scrollWidth - window.innerWidth;
            const scrollDistance = totalWidth * 0.45;

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
        });

        return () => mm.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative w-full overflow-hidden"
            style={{ minHeight: "100vh" }}
            id="featured-slider"
        >
            {/* Top bar with label and progress */}
            {/* Changed top-0 to py-12 md:top-24 to prevent overlap with Canvas Space fixed header */}
            <div
                className="absolute w-full flex items-center justify-between px-6 md:px-14 top-24 md:top-32"
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
                    [ 02 — ARCHITECTURAL CASE STUDIES ]
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
                        {String(Math.floor(progress * featuredProjects.length) + 1).padStart(2, "0")} / {String(featuredProjects.length).padStart(2, "0")}
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
                SCROLL TO EXPLORE ARCHIVE
            </div>

            {/* Horizontal track */}
            <div
                ref={trackRef}
                className="blueprint-track items-center gap-0 px-[5vw] md:px-[8vw] flex w-full md:w-max overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none hide-scrollbar"
                style={{ height: "100vh" }}
            >
                {featuredProjects.map((project, i) => (
                    <motion.div
                        layoutId={`emblem-container-${project.id}`}
                        key={i}
                        className="relative flex-shrink-0 flex items-center justify-center w-[85vw] md:w-[70vw] cursor-none snap-center mr-[5vw] md:mr-[5vw]"
                        style={{
                            height: "65vh",
                            marginTop: "8vh",
                        }}
                        onMouseEnter={() => setHoveredIndex(i)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        onClick={() => setSelectedProject(project)}
                    >
                        <motion.div layoutId={`emblem-image-${project.id}`} className="relative w-full h-full overflow-hidden premium-card">
                            <Image
                                src={project.cover}
                                alt={project.title}
                                fill
                                className="object-cover transition-transform duration-1000"
                                style={{
                                    filter: hoveredIndex === i ? "grayscale(0%)" : "grayscale(100%)",
                                    transform: hoveredIndex === i ? "scale(1.03)" : "scale(1)"
                                }}
                            />

                            {/* Heavy Vignette gradient to ensure text readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />

                            {/* Technical info — bottom left */}
                            <div
                                className="absolute bottom-6 left-6 flex flex-col gap-1"
                                style={{
                                    fontFamily: "var(--font-mono)",
                                    fontSize: "0.55rem",
                                    letterSpacing: "0.12em",
                                    color: "var(--white-pure)",
                                }}
                            >
                                <span style={{ opacity: 1, fontWeight: 700, fontSize: "0.6rem" }}>{project.year}</span>
                                <span style={{ opacity: 0.9, fontWeight: 500, fontSize: "0.8rem", marginTop: "4px" }}>{project.title}</span>
                                <span
                                    style={{
                                        fontFamily: "var(--font-serif)",
                                        fontSize: "0.9rem",
                                        fontStyle: "italic",
                                        fontWeight: 400,
                                        letterSpacing: "0.02em",
                                        opacity: 0.8,
                                        marginTop: "4px",
                                    }}
                                >
                                    {project.category}
                                </span>
                            </div>

                            {/* Subtle border */}
                            <div
                                className="absolute inset-0 pointer-events-none"
                                style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                            />
                        </motion.div>
                    </motion.div>
                ))}
            </div>

            {/* Cursor-following EXPLORE tag */}
            {hoveredIndex !== null && !selectedProject && (
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
                        [ VIEW ARCHIVE ]
                    </div>
                </motion.div>
            )}

            {/* Emblem Modal Rendering */}
            <AnimatePresence>
                {selectedProject && (
                    <ProjectEmblem
                        key="emblem"
                        project={selectedProject}
                        onClose={() => setSelectedProject(null)}
                        onNext={handleNext}
                        onPrev={handlePrev}
                        hasNext={hasNext}
                        hasPrev={hasPrev}
                    />
                )}
            </AnimatePresence>
        </section>
    );
}
