"use client";

import { useState } from "react"
import { tools, Tool } from "@/data/tools"
import { motion } from "framer-motion"
import Image from "next/image"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"
import { Meteors } from "@/components/ui/meteors"
import * as LucideIcons from "lucide-react"

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05
        }
    }
}

export default function ToolsBentoGrid() {
    const [selectedTool, setSelectedTool] = useState<Tool | null>(null)

    // Group tools by category
    const categories = ["AI Engineer", "Web Stack", "Mobile Stack"] as const;

    // Helper to render icon
    const renderIcon = (tool: Tool, sizeClasses: string, width = 32, height = 32) => {
        if (tool.isLucide) {
            const Icon = (LucideIcons as any)[tool.slug] || LucideIcons.Code;
            return <Icon className={sizeClasses} style={{ color: `#${tool.color}` }} strokeWidth={1.5} />;
        }
        return (
            <Image
                src={tool.icon || `https://cdn.simpleicons.org/${tool.slug}/${tool.color}`}
                alt={tool.name}
                width={width}
                height={height}
                className={`${sizeClasses} object-contain`}
                unoptimized
            />
        );
    }

    return (
        <section id="tech-gallery" className="bg-secondary py-16 md:py-32 px-4 sm:px-6 md:px-20 border-t border-border min-h-screen relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-20 space-y-4">
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-foreground">
                        Tech Stack <span className="text-primary">Gallery</span>
                    </h2>
                    <p className="text-muted-foreground text-sm md:text-lg max-w-2xl mx-auto">
                        An interactive collection of the tools, frameworks, and technologies I use to build scalable, intelligent applications.
                    </p>
                </div>

                <div className="space-y-32">
                    {categories.map(cat => {
                        const catTools = tools.filter(t => t.category === cat);
                        if (catTools.length === 0) return null;

                        return (
                            <div key={cat} className="space-y-12">
                                <div className="flex flex-col items-center gap-4">
                                    <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-[0.2em] text-foreground/90 text-center">
                                        {cat}
                                    </h3>
                                    <div className="h-1 w-24 bg-primary rounded-full opacity-50" />
                                </div>
                                
                                <motion.div
                                    variants={containerVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, margin: "-100px" }}
                                    className="flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-10"
                                >
                                    {catTools.map((tool) => (
                                        <motion.div
                                            key={tool.name}
                                            layoutId={`gallery-${tool.slug}`}
                                            onClick={() => setSelectedTool(tool)}
                                            className="group relative flex flex-col items-center justify-center cursor-pointer transition-all active:scale-95"
                                            whileHover={{ y: -8 }}
                                        >
                                            {/* Glowing Background Blob */}
                                            <div 
                                                className="absolute inset-0 rounded-full blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none" 
                                                style={{ backgroundColor: `#${tool.color}` }}
                                            />

                                            {/* Glassmorphic Icon Container */}
                                            <div className="relative z-10 p-5 md:p-8 bg-background/50 backdrop-blur-xl border border-border/50 rounded-2xl md:rounded-3xl shadow-xl group-hover:shadow-[0_0_40px_rgba(0,0,0,0.5)] group-hover:bg-background/80 group-hover:border-border transition-all duration-300 flex items-center justify-center h-24 w-24 md:h-32 md:w-32">
                                                {renderIcon(tool, "w-12 h-12 md:w-16 md:h-16", 64, 64)}
                                            </div>

                                            {/* Name Tooltip (visible on hover) */}
                                            <div className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 pointer-events-none whitespace-nowrap z-20">
                                                <span className="bg-foreground text-background text-xs md:text-sm font-bold px-3 py-1.5 rounded-md shadow-lg">
                                                    {tool.name}
                                                </span>
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <Dialog open={!!selectedTool} onOpenChange={(open) => !open && setSelectedTool(null)}>
                <DialogContent className="bg-card/90 backdrop-blur-2xl border-border text-card-foreground sm:max-w-md rounded-3xl shadow-2xl">
                    <DialogHeader className="flex flex-col items-center gap-6 pt-4">
                        <div 
                            className="relative w-28 h-28 rounded-full p-6 border flex items-center justify-center shadow-inner overflow-hidden"
                            style={{ borderColor: `#${selectedTool?.color}40`, backgroundColor: `#${selectedTool?.color}10` }}
                        >
                            {selectedTool && renderIcon(selectedTool, "w-16 h-16", 100, 100)}
                            
                            {/* Meteors Effect in Modal */}
                            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50">
                                <Meteors number={15} />
                            </div>
                        </div>
                        <div className="space-y-3">
                            <DialogTitle className="text-3xl font-black tracking-tighter text-center uppercase">
                                {selectedTool?.name}
                            </DialogTitle>
                            <DialogDescription className="text-muted-foreground text-center text-sm md:text-base leading-relaxed px-4">
                                {selectedTool?.description || "A key technology in my development stack."}
                            </DialogDescription>
                        </div>
                    </DialogHeader>
                    <div className="mt-8 mb-4 flex justify-center">
                        <span 
                            className="text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-[0.2em]"
                            style={{ 
                                color: `#${selectedTool?.color}`, 
                                backgroundColor: `#${selectedTool?.color}20`,
                                borderColor: `#${selectedTool?.color}40`,
                                borderWidth: '1px'
                            }}
                        >
                            {selectedTool?.category}
                        </span>
                    </div>
                </DialogContent>
            </Dialog>
        </section>
    )
}
