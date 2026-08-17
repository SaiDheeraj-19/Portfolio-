"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Navbar from "@/components/layout/navbar"
import portfolio from "@/data/portfolio.json"

const medalColors = [
    { badge: 'bg-yellow-50 text-yellow-700 border-yellow-300', dot: 'bg-yellow-400' },
    { badge: 'bg-zinc-100 text-zinc-600 border-zinc-300', dot: 'bg-zinc-400' },
    { badge: 'bg-amber-50 text-amber-800 border-amber-300', dot: 'bg-amber-600' },
]

export default function HackathonsPage() {
    const [hoveredHack, setHoveredHack] = useState<number | null>(null)

    return (
        <div className="min-h-screen bg-white text-neutral-900">
            <Navbar />

            <div className="pt-32 pb-24 px-6 md:px-12 lg:px-24 max-w-screen-xl mx-auto">

                {/* Header */}
                <div className="mb-4">
                    <p className="text-xs font-black tracking-[0.3em] text-neutral-400 uppercase mb-4">Competition Record</p>
                    <h1 className="text-[12vw] md:text-[8vw] font-black uppercase tracking-tighter leading-none text-neutral-900">
                        Hackathons
                    </h1>
                </div>

                {/* Divider + count */}
                <div className="flex items-center justify-between border-t border-b border-neutral-200 py-4 mb-0 mt-8">
                    <span className="text-xs font-black tracking-[0.3em] text-neutral-400 uppercase">
                        {portfolio.hackathons.length} Competitions · 3 Podiums
                    </span>
                    <span className="text-xs font-black tracking-[0.3em] text-neutral-400 uppercase">Ranked by Placement</span>
                </div>

                {/* Accordion List */}
                <div className="flex flex-col">
                    {portfolio.hackathons.map((hack, index) => {
                        const isHovered = hoveredHack === index
                        const medal = medalColors[index] ?? medalColors[2]

                        return (
                            <div
                                key={index}
                                className="group border-b border-neutral-200 py-8 md:py-12 transition-colors duration-500 hover:bg-neutral-50"
                                onMouseEnter={() => setHoveredHack(index)}
                                onMouseLeave={() => setHoveredHack(null)}
                            >
                                <div className="flex flex-col w-full px-2 md:px-4">
                                    {/* Top Row */}
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 w-full">
                                        {/* Left: Index + Achievement badge */}
                                        <div className="flex items-center gap-6 md:w-1/4 shrink-0">
                                            <span className="text-neutral-300 font-mono text-lg">
                                                {(index + 1).toString().padStart(2, '0')}
                                            </span>
                                            <div className="flex flex-col gap-1">
                                                <span className={`inline-block px-3 py-0.5 rounded-full text-[10px] font-black tracking-widest uppercase border ${medal.badge}`}>
                                                    {(hack as any).achievement}
                                                </span>
                                                <span className="text-neutral-400 font-mono text-xs">
                                                    {hack.date}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Middle: Title */}
                                        <div className="w-full md:w-2/4">
                                            <h2 className={`text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight transition-all duration-500 ${isHovered ? 'text-primary' : 'text-neutral-900'}`}>
                                                {hack.title}
                                            </h2>
                                            <p className="text-neutral-400 font-medium text-sm mt-1">
                                                {hack.institution}
                                            </p>
                                        </div>

                                        {/* Right: Indicator */}
                                        <div className="hidden md:flex justify-end w-1/4 shrink-0 overflow-hidden">
                                            <span className={`text-neutral-400 font-mono text-xs uppercase tracking-widest transition-all duration-500 ${isHovered ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'}`}>
                                                Hover to Expand
                                            </span>
                                        </div>
                                    </div>

                                    {/* Expanding Content */}
                                    <AnimatePresence>
                                        {isHovered && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                                className="overflow-hidden"
                                            >
                                                <div className="pt-8 pb-4 flex flex-col md:flex-row gap-8 md:gap-16 w-full md:w-3/4 md:ml-auto">
                                                    {/* Left: Meta + Description + Contributions */}
                                                    <div className="w-full md:w-1/2">
                                                        {/* Meta tags */}
                                                        <div className="flex flex-wrap gap-2 mb-5">
                                                            {(hack as any).role && (
                                                                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-bold uppercase tracking-widest border border-primary/20">
                                                                    {(hack as any).role}
                                                                </span>
                                                            )}
                                                            {(hack as any).team && (
                                                                <span className="px-3 py-1 bg-neutral-100 text-neutral-600 rounded-full text-[10px] font-bold uppercase tracking-widest border border-neutral-200">
                                                                    {(hack as any).team}
                                                                </span>
                                                            )}
                                                            {(hack as any).timeframe && (
                                                                <span className="px-3 py-1 bg-neutral-100 text-neutral-600 rounded-full text-[10px] font-bold uppercase tracking-widest border border-neutral-200">
                                                                    {(hack as any).timeframe}
                                                                </span>
                                                            )}
                                                            {(hack as any).project && (
                                                                <span className="px-3 py-1 bg-neutral-900 text-white rounded-full text-[10px] font-bold uppercase tracking-widest">
                                                                    {(hack as any).project}
                                                                </span>
                                                            )}
                                                        </div>

                                                        <p className="text-neutral-600 font-medium leading-relaxed text-sm md:text-base mb-5">
                                                            {hack.description}
                                                        </p>

                                                        {(hack as any).contributions?.length > 0 && (
                                                            <ul className="space-y-2">
                                                                {(hack as any).contributions.map((c: string, i: number) => (
                                                                    <li key={i} className="flex items-start gap-2 text-xs text-neutral-500">
                                                                        <span className="text-primary mt-0.5 shrink-0">→</span>
                                                                        {c}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        )}
                                                    </div>

                                                    {/* Right: Tech Stack */}
                                                    {(hack as any).technologies?.length > 0 && (
                                                        <div className="w-full md:w-1/2 flex flex-col gap-4">
                                                            <p className="text-xs font-black tracking-[0.2em] text-neutral-400 uppercase">Tech Stack</p>
                                                            <div className="flex flex-wrap gap-2">
                                                                {(hack as any).technologies.map((tech: string) => (
                                                                    <span key={tech} className="px-3 py-1.5 bg-neutral-100 border border-neutral-200 rounded-full text-[10px] font-bold text-neutral-600 uppercase tracking-wider">
                                                                        {tech}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
