"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X, ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import MusicToggle from "@/components/music-toggle";

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

    // Check if we need dark text (for light backgrounds)
    const isLightPage = false // pathname === "/tech-stack" (This page is actually dark)
    const hoverColorClass = isLightPage ? "hover:text-black" : "hover:text-white"
    const mutedColorClass = isLightPage ? "text-neutral-600" : "text-gray-300"
    const logoColorClass = isLightPage ? "text-black" : "text-white"
    const mobileMenuBg = isLightPage ? "bg-white/95" : "bg-black/95"
    const mobileMenuText = isLightPage ? "text-neutral-600" : "text-gray-300"
    const contactBtnClass = isLightPage
        ? "bg-black text-white hover:bg-neutral-800 shadow-xl border-transparent"
        : "bg-black hover:bg-neutral-800 text-white shadow-lg hover:shadow-white/10 border border-white/10"

    return (
        <nav
            className={cn(
                "fixed top-0 z-50 w-full transition-transform duration-300 ease-in-out py-6 md:py-8 layout-padding",
                "bg-transparent",
            )}
        >
            <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">

                {pathname !== "/" ? (
                    <Link href="/" className={cn("text-sm md:text-base font-medium tracking-wide flex items-center gap-2 hover:opacity-80 transition-opacity", logoColorClass)}>
                        <ArrowLeft className="w-4 h-4" /> Back to Home
                    </Link>
                ) : (
                    <Link href="/" className={cn("text-xl md:text-2xl font-bold tracking-widest uppercase hover:opacity-80 transition-opacity", logoColorClass)}>
                        SAI DHEERAJ
                    </Link>
                )}

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-8">
                    {/* Always show Home link if not on home page */}
                    {pathname !== "/" && (
                        <Link href="/" className={cn("transition-colors text-sm font-medium tracking-wide", mutedColorClass, hoverColorClass)}>
                            Home
                        </Link>
                    )}

                    {!isLightPage && (
                        <>
                            <button onClick={onOpenProjects} className={cn("transition-colors text-sm font-medium tracking-wide", mutedColorClass, hoverColorClass)}>
                                Projects
                            </button>
                            <button onClick={onOpenResume} className={cn("transition-colors text-sm font-medium tracking-wide", mutedColorClass, hoverColorClass)}>
                                Resume
                            </button>
                            <button onClick={onOpenAbout} className={cn("transition-colors text-sm font-medium tracking-wide", mutedColorClass, hoverColorClass)}>
                                About me
                            </button>
                            <MusicToggle className={cn("border-opacity-30", isLightPage ? "border-black/20 text-black hover:bg-black/5" : "border-white/20")} />
                            <Button onClick={onOpenContact} className={cn("rounded-full px-8 font-bold tracking-wide transition-all", contactBtnClass)}>
                                CONTACT
                            </Button>
                        </>
                    )}
                </div>

                {/* Mobile: Music Toggle + Menu Button */}
                <div className="md:hidden flex items-center gap-3">
                    <MusicToggle className={cn("w-9 h-9", isLightPage ? "border-black/20 text-black" : "border-white/20")} />
                    <button className={logoColorClass} onClick={toggleMenu}>
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Overlay */}
            {isMenuOpen && (
                <div className={cn("fixed inset-0 top-20 z-40 md:hidden p-8 animate-in slide-in-from-top-4", mobileMenuBg)}>
                    <div className="flex flex-col space-y-6 text-center">
                        {pathname !== "/" && (
                            <Link href="/" onClick={toggleMenu} className={cn("text-2xl transition-colors", mobileMenuText, hoverColorClass)}>
                                Home
                            </Link>
                        )}
                        {!isLightPage && (
                            <>
                                <button onClick={() => { onOpenProjects?.(); toggleMenu(); }} className={cn("text-2xl transition-colors", mobileMenuText, hoverColorClass)}>
                                    Projects
                                </button>
                                <button onClick={() => { onOpenResume?.(); toggleMenu(); }} className={cn("text-2xl transition-colors", mobileMenuText, hoverColorClass)}>
                                    Resume
                                </button>
                                <button onClick={() => { onOpenAbout?.(); toggleMenu(); }} className={cn("text-2xl transition-colors", mobileMenuText, hoverColorClass)}>
                                    About me
                                </button>

                                <button onClick={() => { onOpenContact?.(); toggleMenu(); }} className="text-2xl text-[#ff4d29] font-bold hover:opacity-80 transition-opacity">
                                    CONTACT
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    )
}
