"use client";

import { motion } from "framer-motion";

const pressMentions = [
    "ARCHITECTURAL DIGEST", "DEZEEN", "VOGUE LIVING", "ELLE DECOR", "WALLPAPER*", "DESIGNBOOM", "ARCH DAILY"
];

export default function PressMarquee() {
    return (
        <div className="w-full py-6 md:py-8 border-b border-black/10 overflow-hidden flex bg-[#E5E3DB] mix-blend-multiply opacity-60">
            <motion.div
                animate={{ x: [0, -1000] }}
                transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
                className="flex whitespace-nowrap"
            >
                {[...pressMentions, ...pressMentions, ...pressMentions, ...pressMentions].map((press, i) => (
                    <span key={i} className="mx-12 font-serif italic text-sm md:text-lg tracking-widest text-[var(--charcoal-ink)]">
                        {press}
                    </span>
                ))}
            </motion.div>
        </div>
    );
}
