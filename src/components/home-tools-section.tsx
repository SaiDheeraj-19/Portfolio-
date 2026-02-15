"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { tools } from "@/data/tools"

const DISPLAY_TOOLS = [
    "Next.js", "React", "TypeScript", "Tailwind CSS",
    "Framer Motion", "GSAP", "Lucide React", "Radix UI"
]

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

// ... (existing imports)

const USAGE_DETAILS: Record<string, string> = {
    "Next.js": "We chose Next.js 15 (App Router) for its robust server-side rendering capabilities, ensuring lightning-fast initial loads and superior SEO performance for the portfolio.",
    "React": "React 19 serves as the foundational library, enabling a modular component architecture that makes the codebase maintainable and the UI highly interactive.",
    "TypeScript": "TypeScript provides strict type safety, catching errors at compile-time and ensuring the application's logic is robust and self-documenting.",
    "Tailwind CSS": "Used for rapid, utility-first styling. It allowed us to create a completely custom design system with complex animations without fighting the stylesheet.",
    "Framer Motion": "Powers the fluid page transitions, the hanging ID card physics, and the subtle micro-interactions that give the site its 'premium' feel.",
    "GSAP": "GSAP handles the heavy lifting for the complex timeline-based animations, specifically determining precise scroll triggers and loading sequences.",
    "Lucide React": "Selected for its clean, consistent geometric stroke style that perfectly matches the minimalist industrial aesthetic of the site.",
    "Radix UI": "Provides the unstyled, accessible primitives for complex interactive components (like this dialog!), ensuring accessibility standards are met without compromising design."
}

export default function HomeToolsSection() {
    const selectedTools = tools.filter(t => DISPLAY_TOOLS.includes(t.name))
    const [activeTool, setActiveTool] = useState<(typeof tools)[0] | null>(null)

    return (
        <section className="py-24 pb-32 md:pb-24 bg-secondary border-t border-border relative overflow-hidden">
            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <div className="text-center mb-12 md:mb-16">
                    <span className="text-[10px] md:text-sm font-bold tracking-[0.3em] uppercase text-muted-foreground mb-2 block">Powered By</span>
                    <h2 className="text-3xl md:text-6xl font-black text-foreground tracking-tighter leading-none">
                        BUILT <span className="underline decoration-[#ff4d29] decoration-4 underline-offset-8">WITH THIS</span> STACK
                    </h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 md:gap-x-12 gap-y-12 md:gap-y-16 items-center justify-items-center">
                    {selectedTools.map((tool) => (
                        <div
                            key={tool.slug}
                            onClick={() => setActiveTool(tool)}
                            className="flex items-center gap-3 md:gap-4 group cursor-pointer transition-all duration-300 hover:opacity-100 hover:scale-105 opacity-80 backdrop-blur-sm bg-card/60 p-3 md:p-4 rounded-xl border border-border hover:border-primary/50 w-full justify-center md:w-auto active:scale-95"
                        >
                            {/* Icon */}
                            <div className="relative w-8 h-8 md:w-10 md:h-10 shrink-0">
                                <Image
                                    src={tool.icon || `https://cdn.simpleicons.org/${tool.slug}/000000`}
                                    alt={tool.name}
                                    fill
                                    className="object-contain"
                                    unoptimized
                                />
                            </div>

                            {/* Text */}
                            <span className="text-lg md:text-2xl font-bold text-foreground tracking-tight">
                                {tool.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="hidden md:flex absolute left-12 bottom-10 border border-neutral-700/50 rounded-full w-12 h-12 items-center justify-center text-neutral-500 font-mono text-sm pointer-events-auto z-20 backdrop-blur-sm">
                03
            </div>

            <div className="absolute left-0 w-full md:w-auto md:left-auto md:right-12 bottom-10 z-20 pointer-events-auto flex justify-center md:block px-6 md:px-0">
                <Link
                    href="/tech-stack"
                    className="w-full md:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground shadow-lg border border-transparent hover:bg-primary/90 hover:scale-105 transition-all duration-300 font-bold font-mono text-xs tracking-widest uppercase"
                >
                    View Complete Stack <ArrowRight className="w-4 h-4" />
                </Link>
            </div>

            {/* Popup Modal */}
            <AnimatePresence>
                {activeTool && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setActiveTool(null)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />
                        <motion.div
                            layoutId={`tool-${activeTool.slug}`}
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative bg-card border border-border w-full max-w-md p-8 rounded-2xl shadow-2xl z-10 overflow-hidden"
                        >
                            <button
                                onClick={() => setActiveTool(null)}
                                className="absolute top-4 right-4 p-2 rounded-full hover:bg-secondary transition-colors"
                            >
                                <X className="w-5 h-5 text-muted-foreground" />
                            </button>

                            <div className="flex flex-col items-center text-center space-y-6">
                                <div className="relative w-20 h-20 p-4 bg-secondary/50 rounded-2xl border border-border">
                                    <Image
                                        src={activeTool.icon || `https://cdn.simpleicons.org/${activeTool.slug}/000000`}
                                        alt={activeTool.name}
                                        fill
                                        className="object-contain p-2"
                                        unoptimized
                                    />
                                </div>

                                <div>
                                    <h3 className="text-2xl font-black uppercase tracking-tight mb-2">
                                        {activeTool.name}
                                    </h3>
                                    <div className="w-12 h-1 bg-primary mx-auto rounded-full mb-6" />
                                    <p className="text-muted-foreground leading-relaxed">
                                        {USAGE_DETAILS[activeTool.name] || activeTool.description || "A key technology used in building this portfolio."}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section >
    )
}
