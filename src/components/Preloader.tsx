"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true);
    const [count, setCount] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setIsLoading(false), 600);
                    return 100;
                }
                return prev + Math.floor(Math.random() * 8) + 2;
            });
        }, 50);

        return () => clearInterval(interval);
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
                    className="fixed inset-0 flex flex-col items-center justify-center"
                    style={{
                        zIndex: 99999,
                        backgroundColor: "var(--bg-paper)",
                        backgroundImage:
                            "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
                        backgroundSize: "40px 40px",
                    }}
                >
                    {/* Brand reveal */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-center"
                    >
                        <p
                            style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: "0.6rem",
                                letterSpacing: "0.3em",
                                color: "var(--charcoal-ink)",
                                opacity: 0.4,
                                marginBottom: "1.5rem",
                            }}
                        >
                            ARCHITECTURE & DESIGN
                        </p>
                        <h1
                            style={{
                                fontFamily: "var(--font-display)",
                                fontSize: "clamp(2rem, 5vw, 4rem)",
                                fontWeight: 800,
                                letterSpacing: "-0.05em",
                                lineHeight: 0.9,
                                color: "var(--charcoal-ink)",
                            }}
                        >
                            CANVAS
                        </h1>
                        <h1
                            style={{
                                fontFamily: "var(--font-serif)",
                                fontSize: "clamp(2rem, 5vw, 4rem)",
                                fontWeight: 300,
                                fontStyle: "italic",
                                letterSpacing: "0.02em",
                                lineHeight: 0.9,
                                color: "var(--charcoal-ink)",
                                marginTop: "0.1em",
                            }}
                        >
                            Space
                        </h1>
                    </motion.div>

                    {/* Loading bar */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="absolute bottom-16 left-1/2 -translate-x-1/2"
                        style={{ width: "200px" }}
                    >
                        <div className="flex justify-between mb-2">
                            <span
                                style={{
                                    fontFamily: "var(--font-mono)",
                                    fontSize: "0.55rem",
                                    letterSpacing: "0.15em",
                                    color: "var(--charcoal-ink)",
                                    opacity: 0.3,
                                }}
                            >
                                LOADING
                            </span>
                            <span
                                className="stat-number"
                                style={{
                                    fontFamily: "var(--font-mono)",
                                    fontSize: "0.55rem",
                                    letterSpacing: "0.05em",
                                    color: "var(--charcoal-ink)",
                                    opacity: 0.5,
                                }}
                            >
                                {Math.min(count, 100)}%
                            </span>
                        </div>
                        <div
                            style={{
                                width: "100%",
                                height: "1px",
                                backgroundColor: "rgba(10,10,10,0.1)",
                            }}
                        >
                            <motion.div
                                style={{
                                    height: "100%",
                                    backgroundColor: "var(--charcoal-ink)",
                                    width: `${Math.min(count, 100)}%`,
                                }}
                                transition={{ duration: 0.1 }}
                            />
                        </div>
                    </motion.div>

                    {/* Corner marks */}
                    <div
                        className="absolute top-8 left-8"
                        style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.5rem",
                            letterSpacing: "0.15em",
                            color: "var(--charcoal-ink)",
                            opacity: 0.2,
                        }}
                    >
                        PANKAJ SHARMA
                    </div>
                    <div
                        className="absolute top-8 right-8 text-right"
                        style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.5rem",
                            letterSpacing: "0.15em",
                            color: "var(--charcoal-ink)",
                            opacity: 0.2,
                        }}
                    >
                        EST. 2026
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
