"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
    const footerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".footer-reveal", {
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.08,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: footerRef.current,
                    start: "top 85%",
                },
            });
        }, footerRef);

        return () => ctx.revert();
    }, []);

    return (
        <footer ref={footerRef} className="relative w-full" id="contact">
            {/* Marquee */}
            <div
                className="w-full overflow-hidden py-12 md:py-20"
                style={{
                    borderTop: "1px solid rgba(10,10,10,0.08)",
                    borderBottom: "1px solid rgba(10,10,10,0.08)",
                }}
            >
                <div className="marquee-track">
                    {[...Array(4)].map((_, i) => (
                        <span
                            key={i}
                            className="flex items-center gap-8"
                            style={{ paddingRight: "3rem" }}
                        >
                            <span
                                style={{
                                    fontSize: "clamp(3rem, 8vw, 7rem)",
                                    fontWeight: 900,
                                    letterSpacing: "-0.04em",
                                    lineHeight: 1,
                                    color: "transparent",
                                    WebkitTextStroke: "1px var(--charcoal-ink)",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                BUILDING TOMORROW
                            </span>
                            <span
                                style={{
                                    fontFamily: "var(--font-serif)",
                                    fontSize: "clamp(3rem, 8vw, 7rem)",
                                    fontWeight: 300,
                                    fontStyle: "italic",
                                    lineHeight: 1,
                                    color: "transparent",
                                    WebkitTextStroke: "1px var(--charcoal-ink)",
                                    whiteSpace: "nowrap",
                                    opacity: 0.5,
                                }}
                            >
                                Canvas Space
                            </span>
                            <span
                                style={{
                                    fontSize: "clamp(3rem, 8vw, 7rem)",
                                    fontWeight: 900,
                                    letterSpacing: "-0.04em",
                                    lineHeight: 1,
                                    color: "transparent",
                                    WebkitTextStroke: "1px var(--charcoal-ink)",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                ARCHITECTURAL DESIGN
                            </span>
                        </span>
                    ))}
                </div>
            </div>

            {/* CTA Section */}
            <div className="px-6 md:px-14 py-16 md:py-32">
                <div className="text-center max-w-3xl mx-auto footer-reveal">
                    <p
                        style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.6rem",
                            fontWeight: 700,
                            letterSpacing: "0.25em",
                            color: "var(--charcoal-ink)",
                            opacity: 0.8,
                            marginBottom: "2rem",
                        }}
                    >
                        [ LET&apos;S BUILD TOGETHER ]
                    </p>
                    <h2
                        className="footer-reveal"
                        style={{
                            fontSize: "clamp(2rem, 5vw, 4rem)",
                            fontWeight: 800,
                            lineHeight: 1,
                            letterSpacing: "-0.04em",
                            marginBottom: "0.3em",
                        }}
                    >
                        HAVE A VISION?
                    </h2>
                    <h2
                        className="footer-reveal"
                        style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "clamp(2rem, 5vw, 4rem)",
                            fontWeight: 300,
                            fontStyle: "italic",
                            lineHeight: 1,
                            marginBottom: "2.5rem",
                        }}
                    >
                        Let&apos;s make it real.
                    </h2>
                    <a
                        href="mailto:hello@canvasspace.in"
                        className="footer-reveal inline-block"
                        data-cursor-hover
                        style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.7rem",
                            letterSpacing: "0.15em",
                            color: "var(--white-pure)",
                            backgroundColor: "var(--charcoal-ink)",
                            padding: "14px 36px",
                            transition: "background-color 0.4s, transform 0.4s",
                        }}
                        onMouseEnter={(e) => {
                            (e.target as HTMLElement).style.backgroundColor = "var(--accent-red)";
                        }}
                        onMouseLeave={(e) => {
                            (e.target as HTMLElement).style.backgroundColor = "var(--charcoal-ink)";
                        }}
                    >
                        START A PROJECT
                    </a>
                </div>
            </div>

            {/* Footer Grid */}
            <div
                className="px-6 md:px-14 py-14 md:py-20"
                style={{ borderTop: "1px solid rgba(10,10,10,0.06)" }}
            >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
                    {/* Brand */}
                    <div className="footer-reveal md:col-span-2">
                        <div className="flex items-baseline gap-1 mb-4">
                            <span
                                style={{
                                    fontFamily: "var(--font-display)",
                                    fontSize: "0.8rem",
                                    fontWeight: 800,
                                    letterSpacing: "0.1em",
                                }}
                            >
                                CANVAS
                            </span>
                            <span
                                style={{
                                    fontFamily: "var(--font-serif)",
                                    fontSize: "0.9rem",
                                    fontWeight: 300,
                                    fontStyle: "italic",
                                }}
                            >
                                Space
                            </span>
                        </div>
                        <p
                            style={{
                                fontSize: "0.8rem",
                                lineHeight: 1.8,
                                color: "var(--text-secondary)",
                                maxWidth: "360px",
                            }}
                        >
                            A brutalist architectural studio led by Pankaj Sharma. We merge raw
                            creativity with precise engineering to create spaces that resonate.
                        </p>
                    </div>

                    {/* Links */}
                    <div className="footer-reveal">
                        <h4
                            style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: "0.6rem",
                                fontWeight: 700,
                                letterSpacing: "0.2em",
                                marginBottom: "1.2rem",
                                opacity: 0.7,
                            }}
                        >
                            NAVIGATION
                        </h4>
                        <div className="flex flex-col gap-3">
                            {["WORK", "STUDIO", "CONTACT", "PROCESS"].map((link) => (
                                <a
                                    key={link}
                                    href={`#${link.toLowerCase()}`}
                                    style={{
                                        fontFamily: "var(--font-mono)",
                                        fontSize: "0.65rem",
                                        letterSpacing: "0.1em",
                                        color: "var(--charcoal-ink)",
                                        opacity: 0.5,
                                        transition: "opacity 0.3s, color 0.3s",
                                    }}
                                    onMouseEnter={(e) => {
                                        (e.target as HTMLElement).style.opacity = "1";
                                        (e.target as HTMLElement).style.color = "var(--accent-red)";
                                    }}
                                    onMouseLeave={(e) => {
                                        (e.target as HTMLElement).style.opacity = "0.5";
                                        (e.target as HTMLElement).style.color = "var(--charcoal-ink)";
                                    }}
                                >
                                    {link}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="footer-reveal">
                        <h4
                            style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: "0.6rem",
                                fontWeight: 700,
                                letterSpacing: "0.2em",
                                marginBottom: "1.2rem",
                                opacity: 0.7,
                            }}
                        >
                            CONTACT
                        </h4>
                        <div
                            className="flex flex-col gap-3"
                            style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: "0.85rem",
                                letterSpacing: "0.05em",
                                color: "var(--charcoal-ink)",
                                fontWeight: 500,
                                lineHeight: 2.2,
                            }}
                        >
                            <span>hello@canvasspace.in</span>
                            <span>+91 99884 23998</span>
                            <span>
                                Chandigarh
                                <br />
                                India
                            </span>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div
                    className="mt-14 pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                    style={{
                        borderTop: "1px solid rgba(10,10,10,0.06)",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.55rem",
                        letterSpacing: "0.12em",
                        opacity: 0.7,
                        fontWeight: 600,
                    }}
                >
                    <span>© 2026 CANVAS SPACE — ALL RIGHTS RESERVED</span>
                    <a href="https://www.7pixels.xyz/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:opacity-70 transition-opacity cursor-pointer">
                        <span>DESIGNED BY</span>
                        <Image
                            src="/images/7pixels-logo.png"
                            alt="7pixels"
                            width={54}
                            height={18}
                            className="object-contain"
                            style={{ filter: "brightness(0)" }}
                        />
                    </a>
                </div>
            </div>
        </footer>
    );
}
