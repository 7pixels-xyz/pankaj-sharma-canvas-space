"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import ProjectEmblem from "@/components/ProjectEmblem";
import Footer from "@/components/Footer";

import { allProjects } from "@/data/projects";

export default function WorkPage() {
    const [selectedProject, setSelectedProject] = useState<typeof allProjects[0] | null>(null);

    const currentIndex = selectedProject ? allProjects.findIndex(p => p.id === selectedProject.id) : -1;
    const hasNext = currentIndex !== -1 && currentIndex < allProjects.length - 1;
    const hasPrev = currentIndex > 0;

    const handleNext = () => {
        if (hasNext) setSelectedProject(allProjects[currentIndex + 1]);
    };

    const handlePrev = () => {
        if (hasPrev) setSelectedProject(allProjects[currentIndex - 1]);
    };

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="min-h-screen pt-24 md:pt-32">
            {/* Cinematic Header */}
            <div className="px-6 md:px-14 py-10 md:py-24 mb-10 md:mb-16 relative">
                {/* Decorative architectural line */}
                <div className="absolute top-0 left-6 md:left-14 right-6 md:right-14 h-[1px] bg-black/10 mix-blend-multiply" />

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-0 mt-8">
                    <div className="max-w-3xl">
                        <div className="mb-6 flex items-center gap-4">
                            <span className="w-8 h-[1px] bg-black/30 block" />
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1, delay: 0.2 }}
                                className="font-mono text-[0.65rem] tracking-[0.3em] font-bold uppercase opacity-80"
                            >
                                Architecture & Interior / 01
                            </motion.span>
                        </div>
                        <div className="overflow-hidden">
                            <motion.h1
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                                style={{
                                    fontSize: "clamp(3.5rem, 11vw, 10rem)",
                                    fontWeight: 900,
                                    lineHeight: 0.85,
                                    letterSpacing: "-0.04em",
                                    color: "var(--charcoal-ink)",
                                    textTransform: "uppercase"
                                }}
                            >
                                Curated
                            </motion.h1>
                        </div>
                        <div className="overflow-hidden mt-1 md:mt-2">
                            <motion.h1
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                                style={{
                                    fontFamily: "var(--font-serif)",
                                    fontSize: "clamp(3rem, 10vw, 9.5rem)",
                                    fontWeight: 300,
                                    fontStyle: "italic",
                                    lineHeight: 0.85,
                                    letterSpacing: "0.01em",
                                    color: "var(--charcoal-ink)"
                                }}
                                className="pl-1 md:pl-4"
                            >
                                Spaces.
                            </motion.h1>
                        </div>
                    </div>

                    {/* Abstract stat / context */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="hidden md:flex flex-col items-end text-right"
                    >
                        <span className="font-mono text-[0.55rem] tracking-[0.2em] font-bold uppercase opacity-70 mb-2 block">Archive Context</span>
                        <p className="font-serif text-lg leading-tight w-48 italic opacity-80">
                            A curated selection of our finest architectural and spatial explorations.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Advanced Premium Grid - Editorial Style */}
            <div className="px-6 md:px-14">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 md:gap-x-12 gap-y-20 md:gap-y-32 auto-rows-[minmax(0,1fr)]">
                    {allProjects.map((project, i) => (
                        <motion.div
                            key={project.id}
                            layoutId={`emblem-container-${project.id}`}
                            initial={{ opacity: 0, y: 100 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{
                                duration: 1.2,
                                delay: (i % 3) * 0.1,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            className={`relative group cursor-none flex flex-col ${project.span}`}
                            onClick={() => setSelectedProject(project)}
                        >
                            {/* Inner image container */}
                            <motion.div
                                layoutId={`emblem-image-${project.id}`}
                                className={`relative w-full overflow-hidden ${project.aspect} bg-[#E5E3DB]`}
                            >
                                <motion.div
                                    className="w-full h-full"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <Image
                                        src={project.cover}
                                        alt={project.title}
                                        fill
                                        className="object-cover saturate-50 group-hover:saturate-100 transition-all duration-[1s]"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                </motion.div>
                                {/* Subtle grain overlay */}
                                <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none" style={{ backgroundImage: "url('/noise.png')", backgroundSize: "100px 100px" }} />
                                {/* Overlay gradient that fades out on hover */}
                                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-1000" />
                            </motion.div>

                            {/* Editorial Content Below Image */}
                            <div className="mt-8 flex flex-col items-start border-t border-black/10 pt-5 relative">
                                <span className="font-mono text-[0.65rem] tracking-[0.2em] font-bold uppercase opacity-80 mb-3 flex w-full justify-between items-center">
                                    <span>{project.category}</span>
                                    <span>{project.year}</span>
                                </span>

                                <div className="w-full flex items-center justify-between overflow-hidden">
                                    <h3
                                        className="font-serif text-[clamp(2rem,3vw,3rem)] font-light italic text-left w-full transition-transform duration-[0.8s] ease-[0.16,1,0.3,1] group-hover:translate-x-3"
                                        style={{ color: "var(--charcoal-ink)", lineHeight: 1.1 }}
                                    >
                                        {project.title}
                                    </h3>

                                    <span className="font-mono text-[0.55rem] tracking-[0.2em] uppercase opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-[0.8s] ease-[0.16,1,0.3,1] absolute right-0">
                                        [ View ]
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

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

            <Footer />
        </main>
    );
}

