"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface NarrativeBreakProps {
    topLabel: string;
    mainText: string;
    serifText: string;
    bottomNote?: string;
}

export default function NarrativeBreak({
    topLabel,
    mainText,
    serifText,
    bottomNote,
}: NarrativeBreakProps) {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".narrative-line", {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 65%",
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={sectionRef}
            className="w-full py-10 md:py-16 px-6 md:px-14 flex flex-col items-center text-center"
        >
            <span
                className="narrative-line"
                style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6rem",
                    fontWeight: 700,
                    letterSpacing: "0.3em",
                    color: "var(--charcoal-ink)",
                    opacity: 0.8,
                    marginBottom: "1rem",
                }}
            >
                {topLabel}
            </span>
            <div className="overflow-hidden">
                <h2
                    className="narrative-line"
                    style={{
                        fontSize: "clamp(1.8rem, 4vw, 3.5rem)",
                        fontWeight: 900,
                        lineHeight: 1,
                        letterSpacing: "-0.04em",
                    }}
                >
                    {mainText}
                </h2>
            </div>
            <div className="overflow-hidden">
                <h2
                    className="narrative-line"
                    style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "clamp(1.8rem, 4vw, 3.5rem)",
                        fontWeight: 300,
                        fontStyle: "italic",
                        lineHeight: 1,
                        letterSpacing: "0.01em",
                        marginTop: "0.15em",
                    }}
                >
                    {serifText}
                </h2>
            </div>
            {bottomNote && (
                <span
                    className="narrative-line"
                    style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.6rem",
                        fontWeight: 700,
                        letterSpacing: "0.2em",
                        color: "var(--text-secondary)",
                        opacity: 0.8,
                        marginTop: "1rem",
                    }}
                >
                    {bottomNote}
                </span>
            )}
        </div>
    );
}
