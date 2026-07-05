"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import ProjectEmblem from "@/components/ProjectEmblem";
import Footer from "@/components/Footer";

const allProjects = [
    {
        id: "p1",
        title: "THE GLASS PAVILION",
        category: "COMMERCIAL",
        client: "Mehta Holdings",
        location: "Pune, IN",
        year: "2026",
        description:
            "A stunning exploration of transparency and structure. The Glass Pavilion sits atop a rugged hillside, offering panoramic views while maintaining a minimal footprint. The structural steel frame entirely supports the cantilevered edges, leaving the corners to exist entirely of seamless glass.",
        images: [
            "/images/gallery-1.png",
            "/images/gallery-2.png",
            "/images/blueprint-1.png",
        ],
        cover: "/images/gallery-1.png",
        span: "md:col-span-2 md:row-span-2",
        aspect: "aspect-[4/3] md:aspect-[16/9]",
    },
    {
        id: "p2",
        title: "CONCRETE SANCTUARY",
        category: "RESIDENTIAL",
        client: "Private",
        location: "Mumbai, IN",
        year: "2025",
        description:
            "An inward-looking residence built almost entirely of exposed board-formed concrete. Designed to filter out the chaos of the city, brutalist form meets delicate courtyards that capture the changing light throughout the day.",
        images: [
            "/images/gallery-2.png",
            "/images/gallery-3.png",
            "/images/blueprint-2.png",
        ],
        cover: "/images/gallery-2.png",
        span: "md:col-span-1 md:row-span-1",
        aspect: "aspect-[3/4]",
    },
    {
        id: "p3",
        title: "RAW SURFACES",
        category: "MATERIAL STUDY",
        client: "Internal R&D",
        location: "Bangalore, IN",
        year: "2025",
        description:
            "An experimental pavilion focusing purely on the juxtaposition of raw materials: corten steel, untreated teak wood, and polished concrete. A study in how surfaces age and react to the harsh Indian monsoon.",
        images: [
            "/images/gallery-3.png",
            "/images/blueprint-3.png",
        ],
        cover: "/images/gallery-3.png",
        span: "md:col-span-1 md:row-span-1",
        aspect: "aspect-square",
    },
    {
        id: "p4",
        title: "URBAN GEOMETRY",
        category: "URBAN PLANNING",
        client: "City Council",
        location: "Delhi, IN",
        year: "2024",
        description:
            "A masterplan intervention for a dense urban block. By reorganizing pedestrian movement and introducing elevated sky-parks, we reclaimed space for human interaction amidst overwhelming concrete density.",
        images: [
            "/images/gallery-4.png",
            "/images/gallery-5.png",
            "/images/blueprint-4.png",
        ],
        cover: "/images/gallery-4.png",
        span: "md:col-span-2 md:row-span-1",
        aspect: "aspect-[16/9]",
    },
    {
        id: "p5",
        title: "CURVED VOLUMES",
        category: "CULTURAL",
        client: "Art Foundation",
        location: "Dubai, UAE",
        year: "2027",
        description:
            "An upcoming cultural center featuring sweeping concrete forms that defy traditional brutalist rigidity. The structure acts as a wind funnel, naturally cooling the vast interior exhibition spaces.",
        images: [
            "/images/gallery-5.png",
            "/images/hero-sketch.png",
        ],
        cover: "/images/gallery-5.png",
        span: "md:col-span-1 md:row-span-2",
        aspect: "aspect-[3/4]",
    },
    {
        id: "p6",
        title: "TWILIGHT RESIDENCE",
        category: "LUXURY RESIDENTIAL",
        client: "Private",
        location: "Alibaug, IN",
        year: "2025",
        description:
            "A weekend retreat designed to merge with the coastal landscape. Deep overhangs protect the fully glazed living spaces, while local laterite stone grounds the structure to its context.",
        images: [
            "/images/gallery-6.png",
            "/images/blueprint-1.png",
        ],
        cover: "/images/gallery-6.png",
        span: "md:col-span-1 md:row-span-1",
        aspect: "aspect-[4/3]",
    },
];

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
        <main className="min-h-screen pt-32">
            {/* Cinematic Header */}
            <div className="px-6 md:px-14 py-24 mb-16 relative">
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
                                className="font-mono text-[0.65rem] tracking-[0.3em] uppercase opacity-50"
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
                        <span className="font-mono text-[0.55rem] tracking-[0.2em] uppercase opacity-40 mb-2 block">Archive Context</span>
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
                            className={`relative group md:cursor-none flex flex-col ${project.span}`}
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
                                <span className="font-mono text-[0.65rem] tracking-[0.2em] uppercase opacity-50 mb-3 flex w-full justify-between items-center">
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

                                    <span className="font-mono text-[0.55rem] tracking-[0.2em] uppercase opacity-100 md:opacity-0 -translate-x-0 md:-translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-[0.8s] ease-[0.16,1,0.3,1] absolute right-0">
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

