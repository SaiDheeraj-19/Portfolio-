"use client";

import Navbar from "@/components/layout/navbar";
import ToolsBentoGrid from "@/components/tools-bento-grid";

import { motion } from "framer-motion";

export default function TechStackPage() {
    return (
        <main className="relative min-h-screen">
            <Navbar />
            <ToolsBentoGrid />
        </main>
    );
}
