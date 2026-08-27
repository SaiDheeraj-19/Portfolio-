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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
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
        <section id="tech-grid" className="bg-secondary py-12 md:py-20 px-4 sm:px-6 md:px-20 border-t border-border min-h-screen">
            <div className="max-w-7xl mx-auto">
                
                <Tabs defaultValue="AI Engineer" className="w-full">
                    <div className="flex justify-center mb-16">
                        <TabsList className="bg-card border border-border p-1 rounded-full overflow-hidden flex flex-wrap md:flex-nowrap justify-center h-auto">
                            {categories.map(cat => (
                                <TabsTrigger 
                                    key={cat} 
                                    value={cat}
                                    className="rounded-full px-4 md:px-8 py-2 md:py-3 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 whitespace-nowrap"
                                >
                                    {cat}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </div>

                    {categories.map(cat => {
                        const catTools = tools.filter(t => t.category === cat);
                        
                        // Group by description (sub-category)
                        const groupedTools = catTools.reduce((acc, tool) => {
                            if (!acc[tool.description]) acc[tool.description] = [];
                            acc[tool.description].push(tool);
                            return acc;
                        }, {} as Record<string, Tool[]>);

                        return (
                            <TabsContent key={cat} value={cat} className="space-y-16 md:space-y-24 mt-0">
                                {Object.entries(groupedTools).map(([subCategory, items]) => (
                                    <div key={subCategory} className="space-y-8">
                                        <div className="flex items-center gap-6">
                                            <h2 className="text-sm md:text-base font-black uppercase tracking-[0.2em] text-foreground/80">
                                                {subCategory}
                                            </h2>
                                            <div className="h-px bg-border flex-1" />
                                        </div>
                                        
                                        <motion.div
                                            variants={containerVariants}
                                            initial="hidden"
                                            whileInView="visible"
                                            viewport={{ once: true, margin: "-100px" }}
                                            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6"
                                        >
                                            {items.map((tool) => (
                                                <motion.div
                                                    key={tool.name}
                                                    layoutId={`card-${tool.slug}`}
                                                    onClick={() => setSelectedTool(tool)}
                                                    className="group relative flex flex-col items-center justify-center p-4 md:p-6 bg-card border border-border rounded-2xl md:rounded-3xl cursor-pointer hover:border-primary transition-colors active:scale-95 overflow-hidden"
                                                    whileHover={{ y: -5 }}
                                                >
                                                    <div className="absolute inset-0 h-full w-full bg-primary/5 transform scale-[0.80] rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                                    <div className="relative z-10 p-3 md:p-4 bg-muted/20 border border-border/50 rounded-full mb-3 md:mb-4 group-hover:scale-110 group-hover:bg-background group-hover:border-primary/30 transition-all duration-300 flex items-center justify-center h-14 w-14 md:h-16 md:w-16">
                                                        {renderIcon(tool, "w-6 h-6 md:w-8 md:h-8")}
                                                    </div>
                                                    <h3 className="relative z-10 text-xs md:text-sm font-bold text-card-foreground mb-1 text-center line-clamp-2 px-2">{tool.name}</h3>

                                                    {/* Meteors Effect on Hover */}
                                                    <div className="absolute inset-x-0 bottom-0 h-1/2 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                                                        <Meteors number={10} />
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </motion.div>
                                    </div>
                                ))}
                            </TabsContent>
                        )
                    })}
                </Tabs>
            </div>

            <Dialog open={!!selectedTool} onOpenChange={(open) => !open && setSelectedTool(null)}>
                <DialogContent className="bg-card border-border text-card-foreground sm:max-w-md rounded-3xl">
                    <DialogHeader className="flex flex-col items-center gap-6 pt-4">
                        <div className="relative w-24 h-24 bg-muted/20 rounded-full p-6 border border-border flex items-center justify-center shadow-inner">
                            {selectedTool && renderIcon(selectedTool, "w-12 h-12")}
                        </div>
                        <div className="space-y-2">
                            <DialogTitle className="text-3xl font-black tracking-tighter text-center uppercase">
                                {selectedTool?.name}
                            </DialogTitle>
                            <DialogDescription className="text-muted-foreground text-center text-sm md:text-base leading-relaxed px-4">
                                {selectedTool?.description || "A key technology in my development stack."}
                            </DialogDescription>
                        </div>
                    </DialogHeader>
                    <div className="mt-8 mb-4 flex justify-center">
                        <span className="text-[10px] font-bold text-primary bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full uppercase tracking-[0.2em]">
                            {selectedTool?.category}
                        </span>
                    </div>
                </DialogContent>
            </Dialog>
        </section>
    )
}
