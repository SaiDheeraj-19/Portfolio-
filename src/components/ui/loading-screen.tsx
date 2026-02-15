"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const greetings = [
    "Hello",
    "నమస్కారం", // Telugu
    "வணக்கம்", // Tamil
    "ನಮಸ್ಕಾರ", // Kannada
    "നമസ്കാരം", // Malayalam
    "नमस्ते", // Hindi
    "こんにちは", // Japanese
    "안녕하세요", // Korean
    "Hola", // Spanish
    "Bonjour", // French
];

export default function LoadingScreen() {
    const [index, setIndex] = useState(0);
    const [isPresent, setIsPresent] = useState(true);

    useEffect(() => {
        // Cycle through greetings
        const interval = setInterval(() => {
            setIndex((prev) => {
                if (prev === greetings.length - 1) {
                    clearInterval(interval);
                    setTimeout(() => setIsPresent(false), 500); // Wait a bit after last greeting then exit
                    return prev;
                }
                return prev + 1;
            });
        }, 200); // Fast cycle for dynamic feel

        return () => clearInterval(interval);
    }, []);

    if (!isPresent) return null;

    return (
        <AnimatePresence mode="wait">
            {isPresent && (
                <motion.div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
                    initial={{ opacity: 1 }}
                    exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
                >
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10, transition: { duration: 0.1 } }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center gap-4"
                    >
                        <span className="text-4xl md:text-6xl font-bold text-primary tracking-widest relative">
                            {/* Add a small dot or decorative element if needed, but text alone is clean */}
                            <span className="text-primary/90">{greetings[index]}</span>
                            <span className="absolute -bottom-2 right-0 w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                        </span>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
