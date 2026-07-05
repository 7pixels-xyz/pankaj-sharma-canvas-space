"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
    { label: "HOME", href: "/" },
    { label: "OUR WORK", href: "/work" },
];

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    return (
        <>
            <header className="fixed top-0 left-0 w-full z-50 px-6 md:px-14 py-8 mix-blend-difference pointer-events-none">
                <nav className="flex items-center justify-between w-full pointer-events-auto">
                    {/* Left: Logo */}
                    <div className="flex-1 flex justify-start">
                        <Link href="/" className="flex items-baseline gap-[0.35rem] group" data-cursor-hover>
                            <span
                                style={{
                                    fontFamily: "var(--font-display)",
                                    fontSize: "0.85rem",
                                    fontWeight: 900,
                                    letterSpacing: "0.2em",
                                    color: "var(--white-pure)",
                                }}
                            >
                                CANVAS
                            </span>
                            <span
                                style={{
                                    fontFamily: "var(--font-serif)",
                                    fontSize: "1rem",
                                    fontWeight: 300,
                                    fontStyle: "italic",
                                    letterSpacing: "0.02em",
                                    color: "var(--white-pure)",
                                    opacity: 0.8,
                                }}
                            >
                                Space
                            </span>
                        </Link>
                    </div>

                    {/* Center: Desktop Nav */}
                    <div className="hidden md:flex flex-1 justify-center items-center gap-14">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href || (link.href === "/work" && pathname.startsWith("/work"));
                            return (
                                <Link key={link.label} href={link.href}>
                                    <motion.div
                                        className="relative group overflow-hidden block h-[1.2em] px-2"
                                        style={{
                                            fontFamily: "var(--font-mono)",
                                            fontSize: "0.75rem",
                                            letterSpacing: "0.3em",
                                            color: "var(--white-pure)",
                                            opacity: isActive ? 1 : 0.6,
                                        }}
                                        whileHover={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                        data-cursor-hover
                                    >
                                        <span className="block transition-transform duration-[0.6s] ease-[0.16,1,0.3,1] group-hover:-translate-y-full">
                                            {link.label}
                                        </span>
                                        <span className="absolute top-full left-0 w-full text-center block transition-transform duration-[0.6s] ease-[0.16,1,0.3,1] group-hover:-translate-y-full text-[var(--accent-red)]">
                                            {link.label}
                                        </span>

                                        {/* Active Dot indicator */}
                                        <AnimatePresence>
                                            {isActive && (
                                                <motion.span
                                                    initial={{ opacity: 0, scale: 0 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    className="absolute -left-1 top-1/2 -translate-y-1/2 w-[3px] h-[3px] bg-[var(--accent-red)] rounded-full"
                                                />
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                </Link>
                            );
                        })}
                    </div>

                    {/* Right: Connect / Menu */}
                    <div className="flex-1 flex justify-end items-center">
                        <Link href="/contact">
                            <motion.div
                                className="hidden md:block relative group overflow-hidden h-[1.2em] px-2"
                                style={{
                                    fontFamily: "var(--font-mono)",
                                    fontSize: "0.75rem",
                                    letterSpacing: "0.3em",
                                    color: "var(--white-pure)",
                                    opacity: pathname === "/contact" ? 1 : 0.6,
                                }}
                                whileHover={{ opacity: 1 }}
                                data-cursor-hover
                            >
                                <span className="block transition-transform duration-[0.6s] ease-[0.16,1,0.3,1] group-hover:-translate-y-full">
                                    CONTACT US
                                </span>
                                <span className="absolute top-full left-0 w-full text-center block transition-transform duration-[0.6s] ease-[0.16,1,0.3,1] group-hover:-translate-y-full text-[var(--accent-red)]">
                                    CONTACT US
                                </span>
                            </motion.div>
                        </Link>

                        {/* Mobile Hamburger */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden flex flex-col gap-[5px] py-1 pointer-events-auto"
                            aria-label="Menu"
                        >
                            <motion.span
                                animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                                className="block w-6 h-[1px]"
                                style={{ backgroundColor: "var(--white-pure)" }}
                            />
                            <motion.span
                                animate={isOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                                className="block w-4 h-[1px]"
                                style={{ backgroundColor: "var(--white-pure)" }}
                            />
                            <motion.span
                                animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                                className="block w-6 h-[1px]"
                                style={{ backgroundColor: "var(--white-pure)" }}
                            />
                        </button>
                    </div>
                </nav>
            </header>

            {/* Full-screen mobile menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ clipPath: "inset(0 0 100% 0)" }}
                        animate={{ clipPath: "inset(0 0 0% 0)" }}
                        exit={{ clipPath: "inset(0 0 100% 0)" }}
                        transition={{ duration: 0.6, ease: [0.77, 0, 0.175, 1] }}
                        className="fixed inset-0 flex flex-col justify-center px-8 gap-8"
                        style={{
                            zIndex: 45,
                            backgroundColor: "var(--bg-paper)",
                        }}
                    >
                        {[...navLinks, { label: "CONTACT US", href: "/contact" }].map((link, i) => (
                            <Link key={link.label} href={link.href}>
                                <motion.div
                                    initial={{ y: 40, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
                                    className="flex items-start gap-4"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <span
                                        className="font-mono pt-3 opacity-40"
                                        style={{ fontSize: "0.6rem", letterSpacing: "0.15em", color: "var(--charcoal-ink)" }}
                                    >
                                        [ 0{i + 1} ]
                                    </span>
                                    <span
                                        style={{
                                            fontFamily: "var(--font-display)",
                                            fontSize: "clamp(3.5rem, 13vw, 5rem)",
                                            fontWeight: 900,
                                            lineHeight: 0.9,
                                            letterSpacing: "-0.04em",
                                            color: (pathname === link.href || (link.href === "/work" && pathname.startsWith("/work"))) ? "var(--accent-red)" : "var(--charcoal-ink)",
                                        }}
                                    >
                                        {link.label}
                                    </span>
                                </motion.div>
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
