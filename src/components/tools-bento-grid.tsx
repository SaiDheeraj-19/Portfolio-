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
        <section id="tech-gallery" className="bg-background py-16 md:py-32 px-4 sm:px-6 md:px-20 border-t border-border min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20 space-y-4">
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-foreground">
                        Tech Stack <span className="text-primary">Gallery</span>
                    </h2>
                    <p className="text-muted-foreground text-sm md:text-lg max-w-2xl mx-auto">
                        An interactive collection of the tools, frameworks, and technologies I use to build scalable, intelligent applications.
                    </p>
                </div>

                <div className="space-y-24">
                    {categories.map(cat => {
                        const catTools = tools.filter(t => t.category === cat);
                        if (catTools.length === 0) return null;

                        return (
                            <div key={cat} className="space-y-10">
                                <div className="flex flex-col items-center gap-4">
                                    <h3 className="text-xl md:text-2xl font-bold uppercase tracking-[0.2em] text-foreground/90 text-center">
                                        {cat}
                                    </h3>
                                    <div className="h-px w-full max-w-xs bg-border" />
                                </div>
                                
                                <motion.div
                                    variants={containerVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, margin: "-100px" }}
                                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4"
                                >
                                    {catTools.map((tool) => (
                                        <motion.div
                                            key={tool.name}
                                            layoutId={`gallery-${tool.slug}`}
                                            onClick={() => setSelectedTool(tool)}
                                            className="group relative flex flex-col items-center justify-center p-4 bg-card border border-border rounded-2xl cursor-pointer hover:border-primary hover:bg-card/80 transition-colors active:scale-95 overflow-hidden"
                                            whileHover={{ y: -4 }}
                                        >
                                            {/* Subtle Glow on Hover */}
                                            <div 
                                                className="absolute inset-0 h-full w-full opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none" 
                                                style={{ backgroundColor: `#${tool.color}` }}
                                            />

                                            <div className="relative z-10 p-4 bg-muted/20 border border-border/50 rounded-full mb-3 flex items-center justify-center h-14 w-14">
                                                {renderIcon(tool, "w-8 h-8", 32, 32)}
                                            </div>

                                            <h3 className="relative z-10 text-xs md:text-sm font-bold text-card-foreground text-center line-clamp-2 px-1">
                                                {tool.name}
                                            </h3>
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
