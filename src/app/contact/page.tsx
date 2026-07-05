"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/components/Footer";

export default function ContactPage() {
    const [status, setStatus] = useState<"idle" | "error" | "loading" | "success">("idle");
    const [formData, setFormData] = useState({ name: "", email: "", details: "" });

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.details) {
            setStatus("error");
            setTimeout(() => setStatus("idle"), 800);
            return;
        }

        setStatus("loading");
        setTimeout(() => {
            setStatus("success");
            setTimeout(() => {
                setStatus("idle");
                setFormData({ name: "", email: "", details: "" });
            }, 3000);
        }, 1500);
    };

    return (
        <>
            <main className="min-h-screen pt-32 pb-20 flex flex-col justify-between">
                <div className="px-6 md:px-14 flex-1 flex flex-col justify-center">
                    {/* Massive Title Block */}
                    <div className="mb-16 md:mb-24">
                        <div className="overflow-hidden mb-6">
                            <motion.span
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
                                style={{
                                    fontFamily: "var(--font-mono)",
                                    fontSize: "0.65rem",
                                    letterSpacing: "0.25em",
                                    color: "var(--accent-red)",
                                }}
                            >
                                [ INITIATE DIALOGUE ]
                            </motion.span>
                        </div>

                        <div className="overflow-hidden">
                            <motion.h1
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1], delay: 0.1 }}
                                style={{
                                    fontSize: "clamp(3rem, 9vw, 8rem)",
                                    fontWeight: 900,
                                    lineHeight: 0.9,
                                    letterSpacing: "-0.04em",
                                    color: "var(--charcoal-ink)",
                                }}
                            >
                                LET&apos;S BUILD
                            </motion.h1>
                        </div>
                        <div className="overflow-hidden">
                            <motion.h1
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1], delay: 0.2 }}
                                style={{
                                    fontFamily: "var(--font-serif)",
                                    fontSize: "clamp(3rem, 9vw, 8rem)",
                                    fontWeight: 300,
                                    fontStyle: "italic",
                                    lineHeight: 0.9,
                                    letterSpacing: "0.01em",
                                    color: "var(--charcoal-ink)",
                                }}
                            >
                                something real.
                            </motion.h1>
                        </div>
                    </div>

                    {/* Content Split */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8 items-start">

                        {/* Left: Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="flex flex-col gap-12"
                        >
                            <div>
                                <span
                                    style={{
                                        fontFamily: "var(--font-mono)",
                                        fontSize: "0.55rem",
                                        letterSpacing: "0.2em",
                                        color: "var(--charcoal-ink)",
                                        opacity: 0.4,
                                        display: "block",
                                        marginBottom: "0.8rem",
                                    }}
                                >
                                    DIRECT LINE
                                </span>
                                <a
                                    href="mailto:hello@canvasspace.in"
                                    className="text-2xl md:text-3xl font-bold hover:text-[var(--accent-red)] transition-colors duration-300"
                                    style={{ letterSpacing: "-0.02em" }}
                                >
                                    hello@canvasspace.in
                                </a>
                                <p className="mt-4 text-xl md:text-2xl font-light text-[var(--text-secondary)]">
                                    +91 98XX XXXXXX
                                </p>
                            </div>

                            <div>
                                <span
                                    style={{
                                        fontFamily: "var(--font-mono)",
                                        fontSize: "0.55rem",
                                        letterSpacing: "0.2em",
                                        color: "var(--charcoal-ink)",
                                        opacity: 0.4,
                                        display: "block",
                                        marginBottom: "0.8rem",
                                    }}
                                >
                                    STUDIO LOCATION
                                </span>
                                <p
                                    style={{
                                        fontSize: "1.2rem",
                                        lineHeight: 1.6,
                                        color: "var(--charcoal-ink)",
                                        fontWeight: 500,
                                    }}
                                >
                                    Suite 404, The Brutalist Block, <br />
                                    Pune, Maharashtra, India — 411001
                                </p>
                            </div>
                        </motion.div>

                        {/* Right: Minimal Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, delay: 0.7 }}
                            className="w-full"
                        >
                            <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="NAME"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-transparent border-b border-[rgba(10,10,10,0.2)] pb-4 focus:outline-none focus:border-[var(--charcoal-ink)] transition-colors duration-300"
                                        style={{
                                            fontFamily: "var(--font-mono)",
                                            fontSize: "0.75rem",
                                            letterSpacing: "0.15em",
                                            color: "var(--charcoal-ink)",
                                        }}
                                    />
                                </div>
                                <div className="relative">
                                    <input
                                        type="email"
                                        placeholder="EMAIL"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full bg-transparent border-b border-[rgba(10,10,10,0.2)] pb-4 focus:outline-none focus:border-[var(--charcoal-ink)] transition-colors duration-300"
                                        style={{
                                            fontFamily: "var(--font-mono)",
                                            fontSize: "0.75rem",
                                            letterSpacing: "0.15em",
                                            color: "var(--charcoal-ink)",
                                        }}
                                    />
                                </div>
                                <div className="relative">
                                    <textarea
                                        placeholder="PROJECT DETAILS"
                                        rows={4}
                                        value={formData.details}
                                        onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                                        className="w-full bg-transparent border-b border-[rgba(10,10,10,0.2)] pb-4 focus:outline-none focus:border-[var(--charcoal-ink)] transition-colors duration-300 resize-none"
                                        style={{
                                            fontFamily: "var(--font-mono)",
                                            fontSize: "0.75rem",
                                            letterSpacing: "0.15em",
                                            color: "var(--charcoal-ink)",
                                        }}
                                    />
                                </div>
                                <motion.button
                                    type="submit"
                                    data-cursor-hover
                                    animate={status === "error" ? { x: [-10, 10, -10, 10, 0] } : {}}
                                    transition={{ duration: 0.4 }}
                                    className={`self-start mt-4 px-10 py-5 transition-all duration-500 overflow-hidden relative flex items-center justify-center min-w-[200px] ${status === "success" ? "bg-green-600 text-white" :
                                            "bg-[var(--charcoal-ink)] text-[var(--white-pure)] hover:bg-[var(--accent-red)]"
                                        }`}
                                    disabled={status === "loading" || status === "success"}
                                    style={{
                                        fontFamily: "var(--font-mono)",
                                        fontSize: "0.65rem",
                                        letterSpacing: "0.2em",
                                    }}
                                >
                                    <AnimatePresence mode="wait">
                                        {status === "idle" && (
                                            <motion.span key="idle" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }}>
                                                SUBMIT INQUIRY
                                            </motion.span>
                                        )}
                                        {status === "error" && (
                                            <motion.span key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                                REQUIRED FIELDS MISSING
                                            </motion.span>
                                        )}
                                        {status === "loading" && (
                                            <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex gap-2">
                                                <span className="w-1.5 h-1.5 bg-[var(--color-paper)] rounded-full animate-bounce" />
                                                <span className="w-1.5 h-1.5 bg-[var(--color-paper)] rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                                                <span className="w-1.5 h-1.5 bg-[var(--color-paper)] rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                                            </motion.span>
                                        )}
                                        {status === "success" && (
                                            <motion.span key="success" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}>
                                                ✓ SECURELY TRANSMITTED
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </motion.button>
                            </form>
                        </motion.div>

                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
