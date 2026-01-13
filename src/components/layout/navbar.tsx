"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface NavbarProps {
    onOpenProjects?: () => void;
    onOpenResume?: () => void;
    onOpenAbout?: () => void;
    onOpenContact?: () => void;
}

export default function Navbar({ onOpenProjects, onOpenResume, onOpenAbout, onOpenContact }: NavbarProps) {
    const pathname = usePathname()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

    // Hide navbar on admin page
    if (pathname === "/admin") return null

    return (
        <nav
            className={cn(
                "fixed top-0 z-50 w-full transition-transform duration-300 ease-in-out py-6 md:py-8 layout-padding",
                "bg-transparent", // Minimal transparent background
            )}
        >
            <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">

                <Link href="/admin" className="text-xl md:text-2xl font-bold tracking-widest text-white uppercase hover:opacity-80 transition-opacity">
                    SAI DHEERAJ
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-8">
                    <button onClick={onOpenProjects} className="text-gray-300 hover:text-white transition-colors text-sm font-medium tracking-wide">
                        Projects
                    </button>
                    <button onClick={onOpenResume} className="text-gray-300 hover:text-white transition-colors text-sm font-medium tracking-wide">
                        Resume
                    </button>
                    <button onClick={onOpenAbout} className="text-gray-300 hover:text-white transition-colors text-sm font-medium tracking-wide">
                        About me
                    </button>

                    <Button onClick={onOpenContact} className="bg-black hover:bg-neutral-800 text-white rounded-full px-8 font-bold tracking-wide transition-all shadow-lg hover:shadow-white/10 border border-white/10">
                        CONTACT
                    </Button>
                </div>

                {/* Mobile Menu Button */}
                <button className="md:hidden text-white" onClick={toggleMenu}>
                    {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Navigation Overlay */}
            {isMenuOpen && (
                <div className="fixed inset-0 top-20 bg-black/95 z-40 md:hidden p-8 animate-in slide-in-from-top-4">
                    <div className="flex flex-col space-y-6 text-center">
                        <button onClick={() => { onOpenProjects?.(); toggleMenu(); }} className="text-2xl text-gray-300 hover:text-white">
                            Projects
                        </button>
                        <button onClick={() => { onOpenResume?.(); toggleMenu(); }} className="text-2xl text-gray-300 hover:text-white">
                            Resume
                        </button>
                        <button onClick={() => { onOpenAbout?.(); toggleMenu(); }} className="text-2xl text-gray-300 hover:text-white">
                            About me
                        </button>
                        <button onClick={() => { onOpenContact?.(); toggleMenu(); }} className="text-2xl text-[#ff4d29] font-bold">
                            CONTACT
                        </button>
                    </div>
                </div>
            )}
        </nav>
    )
}
