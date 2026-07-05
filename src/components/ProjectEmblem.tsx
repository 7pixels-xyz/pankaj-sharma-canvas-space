"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface ProjectDetails {
    id: string;
    title: string;
    category: string;
    client: string;
    location: string;
    year: string;
    description: string;
    images: string[];
}

interface ProjectEmblemProps {
    project: ProjectDetails;
    onClose: () => void;
    onNext?: () => void;
    onPrev?: () => void;
    hasNext?: boolean;
    hasPrev?: boolean;
}

export default function ProjectEmblem({
    project,
    onClose,
    onNext,
    onPrev,
    hasNext,
    hasPrev,
}: ProjectEmblemProps) {
    const overlayRef = useRef<HTMLDivElement>(null);

    // Prevent background scrolling down when Emblem is open
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-14"
            style={{
                backgroundColor: "rgba(10, 10, 10, 0.4)",
                backdropFilter: "blur(12px)",
            }}
            onClick={onClose}
        >
            <motion.div
                layoutId={`emblem-container-${project.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20, transition: { duration: 0.4 } }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-7xl h-full flex flex-col md:flex-row bg-[var(--bg-paper)] md:rounded-sm overflow-hidden"
                style={{
                    boxShadow: "0 40px 100px rgba(0,0,0,0.2)",
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Decorative Grid Overlay inside Modal */}
                <div
                    className="absolute inset-0 pointer-events-none opacity-20"
                    style={{
                        backgroundImage:
                            "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
                        backgroundSize: "40px 40px",
                    }}
                />

                {/* Close Button Top Right */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-[var(--charcoal-ink)] text-[var(--white-pure)] group"
                    data-cursor-hover
                    aria-label="Close Project"
                >
                    <div className="relative w-4 h-4">
                        <span
                            className="absolute top-1/2 left-0 w-full h-[1px] bg-current transition-transform duration-300 group-hover:rotate-180"
                            style={{ transform: "translateY(-50%) rotate(45deg)" }}
                        />
                        <span
                            className="absolute top-1/2 left-0 w-full h-[1px] bg-current transition-transform duration-300 group-hover:-rotate-180"
                            style={{ transform: "translateY(-50%) rotate(-45deg)" }}
                        />
                    </div>
                </button>

                {/* Left Side: Images Section (Scrollable) */}
                <div
                    className="emblem-scrollbar relative w-full md:w-[55%] h-[50%] md:h-full overflow-y-auto overflow-x-hidden p-6 md:p-12 border-b md:border-b-0 md:border-r border-[rgba(10,10,10,0.1)]"
                    data-lenis-prevent="true"
                    onWheel={(e) => e.stopPropagation()}
                    onTouchMove={(e) => e.stopPropagation()}
                >
                    <div className="flex z-10 relative flex-col gap-8 md:gap-16">
                        {project.images.map((imgSrc, idx) => (
                            <motion.div
                                key={idx}
                                layoutId={idx === 0 ? `emblem-image-${project.id}` : undefined}
                                initial={idx !== 0 ? { opacity: 0, y: 50 } : false}
                                animate={idx !== 0 ? { opacity: 1, y: 0 } : false}
                                transition={{
                                    duration: 0.8,
                                    delay: 0.3 + idx * 0.2,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                                className="relative w-full aspect-[4/3] md:rounded-sm overflow-hidden"
                            >
                                <Image
                                    src={imgSrc}
                                    alt={`${project.title} Image ${idx + 1}`}
                                    fill
                                    className="object-cover"
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Right Side: Details Section (Sticky mostly) */}
                <div
                    className="relative w-full md:w-[45%] h-[50%] md:h-full p-6 md:p-16 flex flex-col justify-center overflow-y-auto emblem-scrollbar"
                    data-lenis-prevent="true"
                    onWheel={(e) => e.stopPropagation()}
                    onTouchMove={(e) => e.stopPropagation()}
                >
                    <div className="mb-6">
                        <motion.span
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: "0.65rem",
                                letterSpacing: "0.25em",
                                color: "var(--accent-red)",
                            }}
                        >
                            [ {project.category} ]
                        </motion.span>
                    </div>

                    <div className="overflow-hidden mb-12">
                        <motion.h2
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4, ease: [0.77, 0, 0.175, 1] }}
                            style={{
                                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                                fontWeight: 900,
                                lineHeight: 1,
                                letterSpacing: "-0.04em",
                                color: "var(--charcoal-ink)",
                            }}
                        >
                            {project.title}
                        </motion.h2>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-col gap-6"
                    >
                        <p
                            style={{
                                fontSize: "1rem",
                                lineHeight: 1.8,
                                color: "var(--text-secondary)",
                                fontFamily: "var(--font-serif)",
                                fontStyle: "italic",
                                fontWeight: 400,
                                marginBottom: "1rem",
                            }}
                        >
                            {project.description}
                        </p>

                        <div className="grid grid-cols-2 gap-y-8 mt-4 pt-8 border-t border-[rgba(10,10,10,0.1)]">
                            <div>
                                <span
                                    style={{
                                        fontFamily: "var(--font-mono)",
                                        fontSize: "0.55rem",
                                        letterSpacing: "0.15em",
                                        color: "var(--charcoal-ink)",
                                        opacity: 0.4,
                                        display: "block",
                                        marginBottom: "0.3rem",
                                    }}
                                >
                                    LOCATION
                                </span>
                                <span
                                    style={{
                                        fontFamily: "var(--font-display)",
                                        fontSize: "0.9rem",
                                        fontWeight: 600,
                                        color: "var(--charcoal-ink)",
                                    }}
                                >
                                    {project.location}
                                </span>
                            </div>
                            <div>
                                <span
                                    style={{
                                        fontFamily: "var(--font-mono)",
                                        fontSize: "0.55rem",
                                        letterSpacing: "0.15em",
                                        color: "var(--charcoal-ink)",
                                        opacity: 0.4,
                                        display: "block",
                                        marginBottom: "0.3rem",
                                    }}
                                >
                                    YEAR
                                </span>
                                <span
                                    style={{
                                        fontFamily: "var(--font-display)",
                                        fontSize: "0.9rem",
                                        fontWeight: 600,
                                        color: "var(--charcoal-ink)",
                                    }}
                                >
                                    {project.year}
                                </span>
                            </div>
                            <div>
                                <span
                                    style={{
                                        fontFamily: "var(--font-mono)",
                                        fontSize: "0.55rem",
                                        letterSpacing: "0.15em",
                                        color: "var(--charcoal-ink)",
                                        opacity: 0.4,
                                        display: "block",
                                        marginBottom: "0.3rem",
                                    }}
                                >
                                    CLIENT
                                </span>
                                <span
                                    style={{
                                        fontFamily: "var(--font-display)",
                                        fontSize: "0.9rem",
                                        fontWeight: 600,
                                        color: "var(--charcoal-ink)",
                                    }}
                                >
                                    {project.client}
                                </span>
                            </div>
                        </div>

                        {/* Next / Prev Navigation */}
                        <div className="flex items-center justify-between mt-12 pt-8 border-t border-[rgba(10,10,10,0.1)] gap-4">
                            <button
                                onClick={onPrev}
                                disabled={!hasPrev}
                                className="group flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed transition-opacity duration-300"
                                data-cursor-hover={hasPrev ? "true" : undefined}
                            >
                                <span className="w-8 h-[1px] bg-[var(--charcoal-ink)] transition-transform duration-300 group-hover:-translate-x-2" />
                                <span className="font-mono text-[0.6rem] tracking-[0.2em] transform transition-transform duration-300 group-hover:-translate-x-1">PREV</span>
                            </button>

                            <button
                                onClick={onNext}
                                disabled={!hasNext}
                                className="group flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed transition-opacity duration-300"
                                data-cursor-hover={hasNext ? "true" : undefined}
                            >
                                <span className="font-mono text-[0.6rem] tracking-[0.2em] transform transition-transform duration-300 group-hover:translate-x-1">NEXT</span>
                                <span className="w-8 h-[1px] bg-[var(--charcoal-ink)] transition-transform duration-300 group-hover:translate-x-2" />
                            </button>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
}
