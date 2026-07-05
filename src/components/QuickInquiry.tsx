"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function QuickInquiry() {
    const [isOpen, setIsOpen] = useState(false);
    const [status, setStatus] = useState<"idle" | "error" | "loading" | "success">("idle");
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Simple validation
        if (!formData.name || !formData.email || !formData.message) {
            setStatus("error");
            setTimeout(() => setStatus("idle"), 800);
            return;
        }

        setStatus("loading");
        // Simulate network request
        setTimeout(() => {
            setStatus("success");
            setTimeout(() => {
                setIsOpen(false);
                setTimeout(() => {
                    setStatus("idle");
                    setFormData({ name: "", email: "", message: "" });
                }, 500);
            }, 2500);
        }, 1500);
    };

    return (
        <>
            {/* The Floating Action Button (FAB) */}
            <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 1, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 md:bottom-12 md:right-12 w-14 h-14 md:w-16 md:h-16 bg-[var(--charcoal-ink)] text-[var(--white-pure)] rounded-full z-40 flex items-center justify-center hover:bg-[var(--accent-red)] transition-colors duration-500 shadow-2xl group border border-[rgba(255,255,255,0.1)]"
                data-cursor-hover
            >
                <div className="relative w-5 h-5 md:w-6 md:h-6">
                    <span className="absolute top-1/2 left-0 w-full h-[1px] bg-current transform -translate-y-1/2 transition-transform duration-500 group-hover:rotate-90" />
                    <span className="absolute top-0 left-1/2 w-[1px] h-full bg-current transform -translate-x-1/2 transition-transform duration-500 group-hover:rotate-90" />
                </div>
            </motion.button>

            {/* The Slide-out Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Blur Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.6 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 z-[55] bg-black/20 backdrop-blur-sm"
                            data-lenis-prevent="true"
                            onWheel={(e) => e.stopPropagation()}
                            onTouchMove={(e) => e.stopPropagation()}
                        />

                        {/* Drawer Panel */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%", transition: { ease: [0.77, 0, 0.175, 1], duration: 0.6 } }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="fixed top-0 right-0 w-full md:w-[450px] h-[100dvh] bg-[var(--color-paper)] z-[60] shadow-2xl flex flex-col border-l border-black/5"
                            data-lenis-prevent="true"
                            onWheel={(e) => e.stopPropagation()}
                            onTouchMove={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-6 right-6 md:top-8 md:right-8 w-12 h-12 flex items-center justify-center group"
                                data-cursor-hover
                            >
                                <span className="absolute w-6 h-[1px] bg-[var(--charcoal-ink)] rotate-45 transition-transform duration-300 group-hover:rotate-0" />
                                <span className="absolute w-6 h-[1px] bg-[var(--charcoal-ink)] -rotate-45 transition-transform duration-300 group-hover:rotate-0" />
                            </button>

                            {/* Content */}
                            <div className="px-8 md:px-12 py-24 flex-1 flex flex-col overflow-y-auto">
                                <span className="font-mono text-[0.6rem] tracking-[0.2em] text-[var(--accent-red)] mb-4 block">
                                    [ FAST TRACK ]
                                </span>
                                <h3 className="font-serif text-4xl lg:text-5xl italic tracking-wide text-[var(--charcoal-ink)] mb-12">
                                    Quick Inquiry
                                </h3>

                                <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="NAME *"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-transparent border-b border-black/20 pb-4 outline-none focus:border-[var(--charcoal-ink)] transition-colors duration-300 font-mono text-[0.7rem] tracking-[0.1em]"
                                        />
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            placeholder="EMAIL *"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full bg-transparent border-b border-black/20 pb-4 outline-none focus:border-[var(--charcoal-ink)] transition-colors duration-300 font-mono text-[0.7rem] tracking-[0.1em]"
                                        />
                                    </div>
                                    <div className="relative">
                                        <textarea
                                            placeholder="PROJECT BRIFING *"
                                            rows={5}
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            className="w-full bg-transparent border-b border-black/20 pb-4 outline-none focus:border-[var(--charcoal-ink)] transition-colors duration-300 font-mono text-[0.7rem] tracking-[0.1em] resize-none"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-4 mt-4">
                                        <motion.button
                                            type="submit"
                                            animate={status === "error" ? { x: [-10, 10, -10, 10, 0] } : {}}
                                            transition={{ duration: 0.4 }}
                                            className={`w-full flex items-center justify-center p-5 font-mono text-[0.65rem] tracking-[0.2em] transition-all duration-500 overflow-hidden relative ${status === "success" ? "bg-green-600 text-white" :
                                                "bg-[var(--charcoal-ink)] text-white hover:bg-[var(--accent-red)]"
                                                }`}
                                            data-cursor-hover
                                            disabled={status === "loading" || status === "success"}
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
                                                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" />
                                                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                                                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                                                    </motion.span>
                                                )}
                                                {status === "success" && (
                                                    <motion.span key="success" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}>
                                                        ✓ TRANSMITTED
                                                    </motion.span>
                                                )}
                                            </AnimatePresence>
                                        </motion.button>

                                        <a
                                            href="https://wa.me/919988423998?text=Hello%20Canvas%20Space%2C%20I%20would%20like%20to%20discuss%20an%20architectural%20project."
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            data-cursor-hover
                                            className="w-full flex items-center justify-center p-5 font-mono text-[0.65rem] tracking-[0.2em] transition-all duration-300 border border-[var(--charcoal-ink)] text-[var(--charcoal-ink)] hover:bg-[#25D366] hover:border-[#25D366] hover:text-white"
                                        >
                                            [ WHATSAPP DIRECT ↗ ]
                                        </a>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
