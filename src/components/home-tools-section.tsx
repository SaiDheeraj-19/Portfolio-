"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { tools } from "@/data/tools"

const DISPLAY_TOOLS = [
    "React", "Next.js", "TypeScript", "Tailwind CSS",
    "Radix UI", "Vercel"
]

export default function HomeToolsSection() {
    const selectedTools = tools.filter(t => DISPLAY_TOOLS.includes(t.name))

    return (
        <section className="py-24 pb-32 md:pb-24 bg-black border-t border-white/5 relative overflow-hidden">
            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <div className="text-center mb-12 md:mb-16">
                    <span className="text-[10px] md:text-sm font-bold tracking-[0.3em] uppercase text-neutral-500 mb-2 block">Powered By</span>
                    <h2 className="text-3xl md:text-6xl font-black text-white tracking-tighter leading-none">
                        BUILT <span className="underline decoration-[#ff4d29] decoration-4 underline-offset-8">WITH THIS</span> STACK
                    </h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 md:gap-x-12 gap-y-12 md:gap-y-16 items-center justify-items-center">
                    {selectedTools.map((tool) => (
                        <div
                            key={tool.slug}
                            className="flex items-center gap-3 md:gap-4 group cursor-default transition-all duration-300 hover:opacity-100 hover:scale-105 opacity-80 backdrop-blur-sm bg-black/40 p-3 md:p-4 rounded-xl border border-white/5 hover:border-white/20 w-full justify-center md:w-auto"
                        >
                            {/* Icon */}
                            <div className="relative w-8 h-8 md:w-10 md:h-10 shrink-0">
                                <Image
                                    src={tool.icon || `https://cdn.simpleicons.org/${tool.slug}/ffffff`}
                                    alt={tool.name}
                                    fill
                                    className="object-contain"
                                    unoptimized
                                />
                            </div>

                            {/* Text */}
                            <span className="text-lg md:text-2xl font-bold text-white tracking-tight">
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
                    className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-4 rounded-full border border-neutral-700/50 bg-black/20 text-neutral-400 backdrop-blur-sm hover:bg-white hover:text-black transition-all duration-300 font-mono text-[10px] md:text-xs tracking-widest uppercase shadow-2xl"
                >
                    View Complete Stack <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </section >
    )
}
