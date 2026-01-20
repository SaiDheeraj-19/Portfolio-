"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Linkedin, Instagram, Github, Music2 } from "lucide-react"

export default function Footer() {
    return (
        <footer className="bg-primary text-primary-foreground pt-20 pb-0 overflow-hidden relative select-none">
            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-20">

                    {/* Left Side - Socials */}
                    <div className="space-y-6">
                        <h3 className="text-2xl md:text-3xl font-medium tracking-wide">Find me online:</h3>
                        <div className="flex gap-4">
                            <Link
                                href="https://github.com/SaiDheeraj-19"
                                target="_blank"
                                className="bg-[#262626] p-4 rounded-xl hover:bg-white hover:text-primary transition-all duration-300 border border-white/10"
                            >
                                <Github className="w-6 h-6 text-white hover:text-primary" />
                            </Link>

                            <Link
                                href="https://www.linkedin.com/in/sai-dheeraj-a1145830b/"
                                target="_blank"
                                className="bg-[#262626] p-4 rounded-xl hover:bg-white hover:text-primary transition-all duration-300 border border-white/10"
                            >
                                <Linkedin className="w-6 h-6 text-white hover:text-primary" />
                            </Link>

                            <Link
                                href="https://www.instagram.com/your.saidheeraj/"
                                target="_blank"
                                className="bg-[#262626] p-4 rounded-xl hover:bg-white hover:text-primary transition-all duration-300 border border-white/10"
                            >
                                <Instagram className="w-6 h-6 text-white hover:text-primary" />
                            </Link>
                        </div>
                    </div>

                    {/* Right Side - Message */}
                    <div className="text-left md:text-right space-y-4 md:space-y-6">

                        <p className="text-base md:text-2xl font-light text-neutral-400 max-w-lg leading-relaxed">Designed and built by <span className="text-white font-medium">Sai Dheeraj</span> to showcase learning-focused software projects.</p>
                    </div>
                </div>
            </div>

            {/* Bottom Giant Text */}
            <div className="w-full relative flex flex-col justify-center items-center leading-none">
                <motion.h1
                    initial={{ y: "100%" }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-[17vw] font-black text-secondary tracking-tighter leading-[0.75] select-none text-center"
                >
                    SAI DHEERAJ
                </motion.h1>

                {/* Copyright Notice - appears after name animation */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.9, ease: "easeOut" }}
                    viewport={{ once: false }}
                    className="w-full py-6 md:py-8 text-center space-y-2"
                >
                    <p className="text-xs md:text-sm text-neutral-500 font-mono">
                        © 2026 Saidheeraj. All rights reserved.
                    </p>
                    <p className="text-[10px] md:text-xs text-neutral-600">
                        Unauthorized use or reproduction is prohibited.
                    </p>
                    <p className="text-[9px] md:text-[10px] text-neutral-700 italic mt-3 flex items-center justify-center gap-1.5">
                        <Music2 className="w-3 h-3" /> Background Music: &quot;Orchestral Suite No. 2 in B Minor, BWV 1067: VII. Badinerie&quot; — J.S. Bach
                    </p>
                </motion.div>
            </div>
        </footer >
    )
}
