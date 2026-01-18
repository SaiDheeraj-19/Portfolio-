"use client";

import Navbar from "@/components/layout/navbar";
import PortfolioDocumentation from "@/components/portfolio-documentation";

export default function HowIBuiltThisPage() {
    return (
        <main className="min-h-screen bg-black pt-24 md:pt-32 pb-16 md:pb-20 px-4 md:px-6">
            <Navbar />
            <div className="max-w-7xl mx-auto space-y-8 md:space-y-12">
                <PortfolioDocumentation />
            </div>
        </main>
    );
}
