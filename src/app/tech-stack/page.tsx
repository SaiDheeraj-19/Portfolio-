"use client";

import Navbar from "@/components/layout/navbar";
import ToolsBentoGrid from "@/components/tools-bento-grid";

import { motion } from "framer-motion";

export default function TechStackPage() {
    return (
        <main className="min-h-screen bg-background pt-20 md:pt-32 pb-16 md:pb-20 px-4 md:px-6">
            <Navbar />
            <div className="max-w-7xl mx-auto space-y-12 md:space-y-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center space-y-4 md:space-y-6 pt-8 md:pt-0"
                >
                    <h1 className="text-4xl md:text-7xl lg:text-8xl font-black text-primary tracking-tighter leading-none">
                        TECHNOLOGY <br className="md:hidden" /> STACK
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-xl px-4 md:px-0 leading-relaxed font-medium">
                        The tools and frameworks I use to build scalable, <br className="hidden md:block" /> high-performance systems and AI products.
                    </p>
                </motion.div>

                <ToolsBentoGrid />


            </div>
            {/* Background elements if any needed later */}
        </main>
    );
}
