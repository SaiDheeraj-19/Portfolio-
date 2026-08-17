/* eslint-disable @typescript-eslint/no-explicit-any */

"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Navbar from "@/components/layout/navbar"
import portfolio from "@/data/portfolio.json"
import { Folder, ArrowLeft } from "lucide-react"
import Image from "next/image"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"

export default function CertificationsPage() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
    const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null)

    const categories = Object.keys(portfolio.certificationsData)

    return (
        <div className="min-h-screen bg-white text-neutral-900">
            <Navbar />

            <div className="pt-32 pb-24 px-6 md:px-12 lg:px-24 max-w-screen-xl mx-auto">
                {/* Header */}
                <div className="mb-4">
                    <p className="text-xs font-black tracking-[0.3em] text-neutral-400 uppercase mb-4">Credentials & Training</p>
                    <h1 className="text-[12vw] md:text-[8vw] font-black uppercase tracking-tighter leading-none text-neutral-900">
                        {selectedCategory || "Certifications"}
                    </h1>
                </div>

                {/* Divider + count */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-b border-neutral-200 py-4 mb-12 mt-8 gap-4">
                    <span className="text-xs font-black tracking-[0.3em] text-neutral-400 uppercase">
                        {selectedCategory 
                            ? `${(portfolio.certificationsData as any)[selectedCategory].length} Credentials` 
                            : `${categories.length} Categories`}
                    </span>
                    {selectedCategory && (
                        <button
                            onClick={() => setSelectedCategory(null)}
                            className="flex items-center gap-2 text-xs font-black tracking-[0.3em] text-neutral-900 uppercase hover:text-primary transition-colors group"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Back to Index
                        </button>
                    )}
                </div>

                <AnimatePresence mode="wait">
                    {!selectedCategory ? (
                        /* Folders Grid */
                        <motion.div 
                            key="folders"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                        >
                            {categories.map((category, index) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className="group aspect-square bg-neutral-50 hover:bg-neutral-900 border border-neutral-200 rounded-3xl p-8 flex flex-col items-center justify-center gap-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
                                >
                                    <Folder className="w-24 h-24 text-neutral-300 group-hover:text-primary group-hover:scale-110 transition-all duration-500" />
                                    <div className="text-center">
                                        <h3 className="text-xl font-black tracking-tight text-neutral-900 group-hover:text-white transition-colors duration-500">
                                            {category}
                                        </h3>
                                        <p className="text-sm font-medium text-neutral-500 group-hover:text-neutral-400 mt-2">
                                            {(portfolio.certificationsData as any)[category].length} Certificates
                                        </p>
                                    </div>
                                </button>
                            ))}
                        </motion.div>
                    ) : (
                        /* Certificates Grid */
                        <motion.div 
                            key="certificates"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {(portfolio.certificationsData as any)[selectedCategory].map((cert: any, idx: number) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedPhoto(cert.img)}
                                    className="group flex flex-col text-left"
                                >
                                    <div className="w-full aspect-[4/3] relative rounded-2xl overflow-hidden bg-neutral-100 mb-6 border border-neutral-200 group-hover:border-primary transition-colors duration-500">
                                        <Image 
                                            src={cert.img} 
                                            fill 
                                            className="object-contain p-4 group-hover:scale-105 transition-transform duration-700 ease-out" 
                                            alt={cert.title} 
                                        />
                                    </div>
                                    <h3 className="text-2xl font-black tracking-tight text-neutral-900 group-hover:text-primary transition-colors duration-300">
                                        {cert.title}
                                    </h3>
                                    <p className="text-sm font-medium text-neutral-500 mt-2 tracking-wide uppercase">
                                        {cert.issuer}
                                    </p>
                                </button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Photo Preview Modal */}
            <Dialog open={!!selectedPhoto} onOpenChange={(open) => !open && setSelectedPhoto(null)}>
                <DialogContent className="max-w-5xl bg-neutral-900/95 backdrop-blur-xl border-white/10 p-4 md:p-8 !rounded-3xl w-full h-[90vh] flex flex-col items-center justify-center shadow-2xl [&>button]:hidden">
                    <DialogTitle className="sr-only">Certificate Preview</DialogTitle>
                    <button
                        onClick={() => setSelectedPhoto(null)}
                        className="absolute top-4 right-4 md:top-6 md:right-6 p-3 rounded-full bg-black/50 hover:bg-black text-white border border-white/10 transition-all hover:scale-110 z-50"
                    >
                        <span className="sr-only">Close</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                    </button>
                    {selectedPhoto && (
                        <div className="relative w-full h-full">
                            <Image src={selectedPhoto} fill className="object-contain drop-shadow-2xl" alt="Certificate Preview" />
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
}
