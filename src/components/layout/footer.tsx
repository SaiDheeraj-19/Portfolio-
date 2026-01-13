"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Linkedin, Instagram } from "lucide-react"

export default function Footer() {
    return (
        <footer className="bg-[#111] text-white pt-20 pb-0 overflow-hidden relative select-none">
            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-20">

                    {/* Left Side - Socials */}
                    <div className="space-y-6">
                        <h3 className="text-2xl md:text-3xl font-medium tracking-wide">Find me online:</h3>
                        <div className="flex gap-4">
                            <Link
                                href="https://www.linkedin.com/in/sai-dheeraj-a1145830b/"
                                target="_blank"
                                className="bg-neutral-800 p-4 rounded-xl hover:bg-white hover:text-black transition-all duration-300"
                            >
                                <Linkedin className="w-6 h-6" />
                            </Link>

                            <Link
                                href="https://www.instagram.com/your.saidheeraj/"
                                target="_blank"
                                className="bg-neutral-800 p-4 rounded-xl hover:bg-white hover:text-black transition-all duration-300"
                            >
                                <Instagram className="w-6 h-6" />
                            </Link>
                        </div>
                    </div>

                    {/* Right Side - Message */}
                    <div className="text-left md:text-right space-y-2">
                        <p className="text-xl md:text-2xl font-light text-gray-300 max-w-lg">Designed and built by <span className="text-white font-medium">Sai Dheeraj</span> to showcase real-world engineering work.</p>
                    </div>
                </div>
            </div>

            {/* Bottom Giant Text */}
            <div className="w-full relative flex justify-center items-end leading-none">
                <motion.h1
                    initial={{ y: "100%" }}
                    whileInView={{ y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-[17vw] font-black text-white tracking-tighter leading-[0.75] select-none text-center"
                >
                    SAI DHEERAJ
                </motion.h1>
            </div>
        </footer>
    )
}
