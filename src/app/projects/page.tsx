/* eslint-disable @typescript-eslint/no-explicit-any */

"use client"

import { useState } from "react"
import Link from "next/link"
import { ExternalLink, Github, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import portfolio from "@/data/portfolio.json"
import { motion, AnimatePresence } from "framer-motion"

export default function ProjectsPage() {
    const categories = ["All", "Web", "AI", "Mobile", "Other"]
    const [selectedCategory, setSelectedCategory] = useState("All")
    const [hoveredProject, setHoveredProject] = useState<string | null>(null)

    const filteredProjects = portfolio.projects.filter(project => {
        return selectedCategory === "All" || project.category === selectedCategory
    })

    return (
        <div className="min-h-screen bg-background text-foreground pb-20 overflow-hidden">
            {/* Minimal Header */}
            <header className="pt-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <Button variant="ghost" asChild className="mb-12 -ml-4 hover:bg-transparent hover:text-primary">
                        <Link href="/">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Home
                        </Link>
                    </Button>
                    
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10">
                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none text-neutral-900 uppercase">
                            Selected<br />Works
                        </h1>
                        <p className="text-lg text-neutral-500 max-w-sm font-medium leading-relaxed">
                            A curated index of production-ready applications, open-source tools, and digital platforms.
                        </p>
                    </div>
                </div>
            </header>

            {/* Content Area */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                


                {/* Awwwards Style Giant Accordion List */}
                <div className="flex flex-col border-t border-neutral-200">
                    {filteredProjects.length > 0 ? (
                        filteredProjects.map((project, index) => {
                            const isHovered = hoveredProject === project.title;
                            
                            return (
                                <div 
                                    key={project.title} 
                                    className="group border-b border-neutral-200 py-8 transition-colors duration-500 hover:bg-neutral-50 cursor-crosshair"
                                    onMouseEnter={() => setHoveredProject(project.title)}
                                    onMouseLeave={() => setHoveredProject(null)}
                                >
                                    <div className="flex flex-col w-full">
                                        
                                        {/* Top Row: Meta and Title */}
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 w-full px-4">
                                            {/* Left: Index & Category */}
                                            <div className="flex items-center gap-6 md:w-1/4 shrink-0">
                                                <span className="text-neutral-300 font-mono text-lg">
                                                    {(index + 1).toString().padStart(2, '0')}
                                                </span>
                                                <span className="text-neutral-500 font-bold text-xs uppercase tracking-[0.2em]">
                                                    {project.category}
                                                </span>
                                            </div>
                                            
                                            {/* Middle: Giant Title */}
                                            <div className="w-full md:w-2/4">
                                                <h3 className={`text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight transition-all duration-500 ${isHovered ? 'text-primary' : 'text-neutral-900'}`}>
                                                    {project.title}
                                                </h3>
                                            </div>
                                            
                                            {/* Right: Year/Tech summary indicator (Desktop only) */}
                                            <div className="hidden md:flex justify-end w-1/4 shrink-0 overflow-hidden">
                                                <span className={`text-neutral-400 font-mono text-sm transition-all duration-500 ${isHovered ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'}`}>
                                                    View Details →
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
                                                    className="overflow-hidden px-4"
                                                >
                                                    <div className="pt-8 pb-4 flex flex-col md:flex-row gap-8 md:gap-16 w-full md:w-3/4 md:ml-auto">
                                                        
                                                        {/* Description Area */}
                                                        <div className="w-full md:w-1/2 flex flex-col gap-8">
                                                            <div>
                                                                <p className="text-neutral-600 font-medium leading-relaxed text-base md:text-lg">
                                                                    {project.description}
                                                                </p>
                                                            </div>
                                                            
                                                            {(project as any).problemStatement && (
                                                                <div className="space-y-2">
                                                                    <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400">The Problem</h4>
                                                                    <p className="text-neutral-600 leading-relaxed text-sm">
                                                                        {(project as any).problemStatement}
                                                                    </p>
                                                                </div>
                                                            )}
                                                            
                                                            {(project as any).motivation && (
                                                                <div className="space-y-2">
                                                                    <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400">Why I Built It</h4>
                                                                    <p className="text-neutral-600 leading-relaxed text-sm">
                                                                        {(project as any).motivation}
                                                                    </p>
                                                                </div>
                                                            )}
                                                        </div>
                                                        
                                                        {/* Tech Stack & Links */}
                                                        <div className="w-full md:w-1/2 flex flex-col gap-6">
                                                            {/* Tech Tags */}
                                                            <div className="flex flex-wrap gap-2">
                                                                {project.tags?.map((tech: string) => (
                                                                    <span key={tech} className="px-4 py-2 bg-neutral-100 border border-neutral-200 rounded-full text-xs font-bold text-neutral-600 uppercase tracking-wider">
                                                                        {tech}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                            
                                                            {/* Action Links */}
                                                            <div className="flex items-center gap-6 pt-4 mt-auto border-t border-neutral-100">
                                                                {(project.links as any)?.github && (project.links as any)?.github !== "#" && (
                                                                    <Link 
                                                                        href={(project.links as any)?.github} 
                                                                        target="_blank" 
                                                                        rel="noopener noreferrer"
                                                                        className="flex items-center text-sm font-black uppercase tracking-widest text-neutral-900 hover:text-primary transition-colors group/link"
                                                                    >
                                                                        <Github className="w-4 h-4 mr-2" />
                                                                        <span className="group-hover/link:underline underline-offset-8">Source Code</span>
                                                                    </Link>
                                                                )}
                                                                {(project.links as any)?.live && (project.links as any)?.live !== "#" && (
                                                                    <Link 
                                                                        href={(project.links as any)?.live} 
                                                                        target="_blank" 
                                                                        rel="noopener noreferrer"
                                                                        className="flex items-center text-sm font-black uppercase tracking-widest text-neutral-900 hover:text-primary transition-colors group/link"
                                                                    >
                                                                        <ExternalLink className="w-4 h-4 mr-2" />
                                                                        <span className="group-hover/link:underline underline-offset-8">Live Platform</span>
                                                                    </Link>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                        
                                    </div>
                                </div>
                            )
                        })
                    ) : (
                        <div className="py-32 text-center border-b border-neutral-200">
                            <p className="text-neutral-500 font-medium text-lg mb-6 uppercase tracking-widest">No matching projects found.</p>
                            <Button variant="outline" className="rounded-full px-8 uppercase font-bold tracking-widest" onClick={() => setSelectedCategory("All")}>
                                View All Index
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
