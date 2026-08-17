"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Navbar from "@/components/layout/navbar"
import portfolio from "@/data/portfolio.json"

export default function ExperiencePage() {
    const [hoveredExp, setHoveredExp] = useState<number | null>(null)

    return (
        <div className="min-h-screen bg-white text-neutral-900">
            <Navbar />

            <div className="pt-32 pb-24 px-6 md:px-12 lg:px-24 max-w-screen-xl mx-auto">

                {/* Header */}
                <div className="mb-4">
                    <p className="text-xs font-black tracking-[0.3em] text-neutral-400 uppercase mb-4">Professional Record</p>
                    <h1 className="text-[12vw] md:text-[8vw] font-black uppercase tracking-tighter leading-none text-neutral-900">
                        Experience
                    </h1>
                </div>

                {/* Divider + count */}
                <div className="flex items-center justify-between border-t border-b border-neutral-200 py-4 mb-0 mt-8">
                    <span className="text-xs font-black tracking-[0.3em] text-neutral-400 uppercase">
                        {portfolio.experience.length} Position{portfolio.experience.length !== 1 ? 's' : ''}
                    </span>
                    <span className="text-xs font-black tracking-[0.3em] text-neutral-400 uppercase">Reverse Chronological</span>
                </div>

                {/* Accordion List */}
                <div className="flex flex-col">
                    {portfolio.experience.map((exp, index) => {
                        const isHovered = hoveredExp === index

                        return (
                            <div
                                key={index}
                                className="group border-b border-neutral-200 py-8 md:py-12 transition-colors duration-500 hover:bg-neutral-50"
                                onMouseEnter={() => setHoveredExp(index)}
                                onMouseLeave={() => setHoveredExp(null)}
                            >
                                <div className="flex flex-col w-full px-2 md:px-4">
                                    {/* Top Row */}
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 w-full">
                                        {/* Left: Index & Mode */}
                                        <div className="flex items-center gap-6 md:w-1/4 shrink-0">
                                            <span className="text-neutral-300 font-mono text-lg">
                                                {(index + 1).toString().padStart(2, '0')}
                                            </span>
                                            <div className="flex flex-col gap-1">
                                                <span className="text-neutral-500 font-bold text-xs uppercase tracking-[0.2em]">
                                                    {(exp as any).workMode}
                                                </span>
                                                <span className="text-neutral-400 font-mono text-xs">
                                                    {exp.duration}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Middle: Company + Role */}
                                        <div className="w-full md:w-2/4">
                                            <h2 className={`text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight transition-all duration-500 ${isHovered ? 'text-primary' : 'text-neutral-900'}`}>
                                                {exp.company}
                                            </h2>
                                            <p className="text-neutral-500 font-medium text-sm md:text-base mt-1 tracking-wide">
                                                {exp.role}
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
                                                    {/* Left: Product + Description */}
                                                    <div className="w-full md:w-1/2">
                                                        {(exp as any).product && (
                                                            <p className="text-xs font-black tracking-[0.2em] text-neutral-400 uppercase mb-3">
                                                                {(exp as any).product}
                                                            </p>
                                                        )}
                                                        <p className="text-neutral-600 font-medium leading-relaxed text-sm md:text-base mb-6">
                                                            {exp.description}
                                                        </p>
                                                        <ul className="space-y-2">
                                                            {exp.responsibilities?.slice(0, 6).map((r: string, i: number) => (
                                                                <li key={i} className="flex items-start gap-2 text-xs text-neutral-500">
                                                                    <span className="text-primary mt-0.5 shrink-0">→</span>
                                                                    {r}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>

                                                    {/* Right: Skills */}
                                                    <div className="w-full md:w-1/2 flex flex-col gap-4">
                                                        <p className="text-xs font-black tracking-[0.2em] text-neutral-400 uppercase">Key Areas</p>
                                                        <div className="flex flex-wrap gap-2">
                                                            {(exp as any).skills?.map((skill: string) => (
                                                                <span key={skill} className="px-3 py-1.5 bg-neutral-100 border border-neutral-200 rounded-full text-[10px] font-bold text-neutral-600 uppercase tracking-wider">
                                                                    {skill}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
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
