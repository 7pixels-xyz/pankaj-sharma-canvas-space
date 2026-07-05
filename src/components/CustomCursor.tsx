"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
    const [isHovering, setIsHovering] = useState(false);
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { stiffness: 400, damping: 28, mass: 0.2 };
    const springX = useSpring(cursorX, springConfig);
    const springY = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.closest("a") ||
                target.closest("button") ||
                target.closest("[data-cursor-hover]") ||
                target.closest(".gallery-image")
            ) {
                setIsHovering(true);
            }
        };

        const handleMouseOut = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.closest("a") ||
                target.closest("button") ||
                target.closest("[data-cursor-hover]") ||
                target.closest(".gallery-image")
            ) {
                setIsHovering(false);
            }
        };

        window.addEventListener("mousemove", moveCursor);
        document.addEventListener("mouseover", handleMouseOver);
        document.addEventListener("mouseout", handleMouseOut);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            document.removeEventListener("mouseover", handleMouseOver);
            document.removeEventListener("mouseout", handleMouseOut);
        };
    }, [cursorX, cursorY]);

    return (
        <>
            {/* Crosshair */}
            <motion.div
                className="hidden md:block fixed top-0 left-0 pointer-events-none z-[9999]"
                style={{
                    x: springX,
                    y: springY,
                    translateX: "-50%",
                    translateY: "-50%",
                    mixBlendMode: "difference",
                }}
            >
                <motion.div
                    animate={{
                        scale: isHovering ? 0 : 1,
                        opacity: isHovering ? 0 : 1,
                    }}
                    transition={{ duration: 0.2 }}
                >
                    {/* Vertical line */}
                    <div
                        className="absolute left-1/2 -translate-x-1/2"
                        style={{
                            width: "1px",
                            height: "24px",
                            top: "-12px",
                            backgroundColor: "#fff",
                        }}
                    />
                    {/* Horizontal line */}
                    <div
                        className="absolute top-1/2 -translate-y-1/2"
                        style={{
                            width: "24px",
                            height: "1px",
                            left: "-12px",
                            backgroundColor: "#fff",
                        }}
                    />
                </motion.div>

                {/* Bracket cursor on hover */}
                <motion.div
                    animate={{
                        scale: isHovering ? 1 : 0,
                        opacity: isHovering ? 1 : 0,
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 50,
                        damping: 20,
                    }}
                    className="absolute"
                    style={{
                        width: "40px",
                        height: "40px",
                        top: "-20px",
                        left: "-20px",
                    }}
                >
                    {/* Top-left bracket */}
                    <div
                        className="absolute top-0 left-0"
                        style={{
                            width: "10px",
                            height: "10px",
                            borderTop: "2px solid #fff",
                            borderLeft: "2px solid #fff",
                        }}
                    />
                    {/* Top-right bracket */}
                    <div
                        className="absolute top-0 right-0"
                        style={{
                            width: "10px",
                            height: "10px",
                            borderTop: "2px solid #fff",
                            borderRight: "2px solid #fff",
                        }}
                    />
                    {/* Bottom-left bracket */}
                    <div
                        className="absolute bottom-0 left-0"
                        style={{
                            width: "10px",
                            height: "10px",
                            borderBottom: "2px solid #fff",
                            borderLeft: "2px solid #fff",
                        }}
                    />
                    {/* Bottom-right bracket */}
                    <div
                        className="absolute bottom-0 right-0"
                        style={{
                            width: "10px",
                            height: "10px",
                            borderBottom: "2px solid #fff",
                            borderRight: "2px solid #fff",
                        }}
                    />
                </motion.div>
            </motion.div>
        </>
    );
}
