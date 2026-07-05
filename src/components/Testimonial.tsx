"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Testimonial() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".testimonial-reveal", {
                y: 40,
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
        <section
            ref={sectionRef}
            className="relative w-full py-28 md:py-44 px-6 md:px-14"
            style={{ backgroundColor: "var(--charcoal-ink)" }}
        >
            {/* Grid overlay on dark bg */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                }}
            />

            <div className="relative max-w-4xl mx-auto text-center">
                {/* Label */}
                <div className="testimonial-reveal mb-10">
                    <span
                        style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.55rem",
                            letterSpacing: "0.3em",
                            color: "var(--white-pure)",
                            opacity: 0.25,
                        }}
                    >
                        WHAT THEY SAY ABOUT US
                    </span>
                </div>

                {/* Quote */}
                <div className="overflow-hidden">
                    <p
                        className="testimonial-reveal"
                        style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "clamp(1.3rem, 2.8vw, 2.2rem)",
                            fontWeight: 300,
                            fontStyle: "italic",
                            lineHeight: 1.7,
                            color: "var(--white-pure)",
                            opacity: 0.8,
                        }}
                    >
                        &ldquo;Pankaj doesn&apos;t just listen to what you want — he hears what the
                        space needs. Our home doesn&apos;t feel built. It feels like it was
                        always meant to be here.&rdquo;
                    </p>
                </div>

                {/* Attribution */}
                <div className="testimonial-reveal mt-10 flex flex-col items-center gap-3">
                    <div
                        style={{
                            width: "40px",
                            height: "1px",
                            backgroundColor: "var(--accent-red)",
                        }}
                    />
                    <span
                        style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.6rem",
                            letterSpacing: "0.2em",
                            color: "var(--white-pure)",
                            opacity: 0.4,
                        }}
                    >
                        ARJUN & PRIYA MEHTA
                    </span>
                    <span
                        style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "0.8rem",
                            fontStyle: "italic",
                            color: "var(--white-pure)",
                            opacity: 0.25,
                        }}
                    >
                        The Glass Pavilion, Pune
                    </span>
                </div>
            </div>
        </section>
    );
}
