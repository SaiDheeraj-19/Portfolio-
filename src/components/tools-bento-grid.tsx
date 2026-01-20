"use client";

import { useState } from "react"
import { tools } from "@/data/tools"
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
    const [selectedTool, setSelectedTool] = useState<typeof tools[0] | null>(null)

    return (
        <section id="tech-grid" className="bg-background py-12 md:py-20 px-4 sm:px-6 md:px-20 border-t border-border">
            <div className="max-w-7xl mx-auto">


                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4"
                >
                    {tools.map((tool) => (
                        <motion.div
                            key={tool.slug}
                            layoutId={`card-${tool.slug}`}
                            onClick={() => setSelectedTool(tool)}
                            className="group relative flex flex-col items-center justify-center p-4 md:p-6 bg-card border border-border rounded-2xl md:rounded-3xl cursor-pointer hover:border-primary transition-colors active:scale-95 overflow-hidden"
                            whileHover={{ y: -5 }}
                        >
                            <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] bg-red-500 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />

                            <div className="relative z-10 p-3 md:p-4 bg-muted/20 rounded-full mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                                <Image
                                    src={tool.icon || `https://cdn.simpleicons.org/${tool.slug}/ffffff`}
                                    alt={tool.name}
                                    width={32}
                                    height={32}
                                    className="w-8 h-8 md:w-10 md:h-10 object-contain"
                                    unoptimized
                                />
                            </div>
                            <h3 className="relative z-10 text-sm md:text-lg font-bold text-card-foreground mb-1 text-center">{tool.name}</h3>

                            {/* Meteors Effect on Hover */}
                            <div className="absolute inset-x-0 bottom-0 h-1/2 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                                <Meteors number={10} />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            <Dialog open={!!selectedTool} onOpenChange={(open) => !open && setSelectedTool(null)}>
                <DialogContent className="bg-card border-border text-card-foreground sm:max-w-md">
                    <DialogHeader className="flex flex-col items-center gap-4">
                        <div className="relative w-20 h-20 bg-neutral-800/50 rounded-full p-4 border border-neutral-700">
                            {selectedTool && (
                                <Image
                                    src={selectedTool.icon || `https://cdn.simpleicons.org/${selectedTool.slug}/${selectedTool.color}`}
                                    alt={selectedTool.name}
                                    fill
                                    className="object-contain p-3"
                                    unoptimized
                                />
                            )}
                        </div>
                        <DialogTitle className="text-2xl font-bold tracking-tight text-center">
                            {selectedTool?.name}
                        </DialogTitle>
                        <DialogDescription className="text-neutral-400 text-center text-base leading-relaxed">
                            {selectedTool?.description || "A key technology in my development stack."}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="mt-4 flex justify-center">
                        <span className="text-xs font-mono text-neutral-600 bg-neutral-900 border border-neutral-800 px-3 py-1 rounded-full uppercase tracking-widest">
                            {selectedTool?.slug}
                        </span>
                    </div>
                </DialogContent>
            </Dialog>
        </section>
    )
}
