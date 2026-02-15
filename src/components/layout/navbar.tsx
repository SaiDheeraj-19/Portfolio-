"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Menu, X, ArrowLeft, Sun, Moon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import MusicToggle from "@/components/music-toggle"
import { useScrollDirection } from "@/hooks/use-scroll-direction"
import { useTheme } from "next-themes"

interface NavbarProps {
    onOpenProjects?: () => void;
    onOpenResume?: () => void;
    onOpenAbout?: () => void;
    onOpenContact?: () => void;
}

export default function Navbar({ onOpenProjects, onOpenResume, onOpenAbout, onOpenContact }: NavbarProps) {
    const pathname = usePathname()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const scrollDirection = useScrollDirection()
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    // Hide navbar on admin page
    if (pathname === "/admin") return null



    // Check if we're on the home page
    const isHomePage = pathname === "/"

    return (
        <nav
            className={cn(
                "absolute top-0 z-50 w-full transition-all duration-300 ease-in-out py-6 md:py-8 layout-padding bg-transparent"
            )}
        >
            <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">

                {/* Always show name/logo - removed "Back to Home" */}
                <Link href="/" className="text-xl md:text-2xl font-bold tracking-widest uppercase hover:opacity-80 transition-opacity text-foreground">
                    SAI DHEERAJ
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-6">
                    {/* Show Home link only if not on home page */}
                    {!isHomePage && (
                        <Link href="/" className="transition-colors text-sm font-medium tracking-wide text-muted-foreground hover:text-primary mr-4">
                            Home
                        </Link>
                    )}

                    {/* On home page, use callbacks for scroll-to-section. On other pages, use Links */}
                    {isHomePage ? (
                        <>
                            <button onClick={onOpenProjects} className="transition-colors text-sm font-medium tracking-wide text-muted-foreground hover:text-primary mr-4">
                                Projects
                            </button>
                            <button onClick={onOpenResume} className="transition-colors text-sm font-medium tracking-wide text-muted-foreground hover:text-primary mr-4">
                                Resume
                            </button>
                            <button onClick={onOpenAbout} className="transition-colors text-sm font-medium tracking-wide text-muted-foreground hover:text-primary mr-4">
                                About me
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/#projects" className="transition-colors text-sm font-medium tracking-wide text-muted-foreground hover:text-primary mr-4">
                                Projects
                            </Link>
                            <Link href="/#resume" className="transition-colors text-sm font-medium tracking-wide text-muted-foreground hover:text-primary mr-4">
                                Resume
                            </Link>
                            <Link href="/#about" className="transition-colors text-sm font-medium tracking-wide text-muted-foreground hover:text-primary mr-4">
                                About me
                            </Link>
                        </>
                    )}

                    {/* Theme Toggle */}
                    {mounted && (
                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="p-2 rounded-full transition-colors hover:text-primary text-foreground"
                            aria-label="Toggle Theme"
                        >
                            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>
                    )}

                    <MusicToggle className="border-opacity-30 border-foreground/20 text-foreground hover:bg-foreground/5" />
                    {isHomePage ? (
                        <Button onClick={onOpenContact} className="rounded-full px-8 font-bold tracking-wide transition-all bg-primary text-primary-foreground hover:bg-primary/90 shadow-xl border-transparent">
                            CONTACT
                        </Button>
                    ) : (
                        <Link href="/#contact">
                            <Button className="rounded-full px-8 font-bold tracking-wide transition-all bg-primary text-primary-foreground hover:bg-primary/90 shadow-xl border-transparent">
                                CONTACT
                            </Button>
                        </Link>
                    )}
                </div>

                {/* Mobile: Music Toggle + Theme + Menu Button */}
                <div className="md:hidden flex items-center gap-3">
                    {mounted && (
                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="p-2 rounded-full transition-colors text-foreground"
                        >
                            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>
                    )}
                    <MusicToggle className="w-9 h-9 border-foreground/20 text-foreground" />
                    <button className="text-foreground" onClick={toggleMenu}>
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Overlay */}
            {isMenuOpen && (
                <div className="fixed inset-0 top-20 z-40 md:hidden p-8 animate-in slide-in-from-top-4 bg-background/95 backdrop-blur-md border-t border-border/50">
                    <div className="flex flex-col space-y-6 text-center">
                        {!isHomePage && (
                            <Link href="/" onClick={toggleMenu} className="text-2xl transition-colors text-muted-foreground hover:text-primary">
                                Home
                            </Link>
                        )}

                        {isHomePage ? (
                            <>
                                <button onClick={() => { onOpenProjects?.(); toggleMenu(); }} className="text-2xl transition-colors text-muted-foreground hover:text-primary">
                                    Projects
                                </button>
                                <button onClick={() => { onOpenResume?.(); toggleMenu(); }} className="text-2xl transition-colors text-muted-foreground hover:text-primary">
                                    Resume
                                </button>
                                <button onClick={() => { onOpenAbout?.(); toggleMenu(); }} className="text-2xl transition-colors text-muted-foreground hover:text-primary">
                                    About me
                                </button>
                                <button onClick={() => { onOpenContact?.(); toggleMenu(); }} className="text-2xl text-primary font-bold hover:opacity-80 transition-opacity">
                                    CONTACT
                                </button>
                            </>
                        ) : (
                            <>
                                <Link href="/#projects" onClick={toggleMenu} className="text-2xl transition-colors text-muted-foreground hover:text-primary">
                                    Projects
                                </Link>
                                <Link href="/#resume" onClick={toggleMenu} className="text-2xl transition-colors text-muted-foreground hover:text-primary">
                                    Resume
                                </Link>
                                <Link href="/#about" onClick={toggleMenu} className="text-2xl transition-colors text-muted-foreground hover:text-primary">
                                    About me
                                </Link>
                                <Link href="/#contact" onClick={toggleMenu} className="text-2xl text-primary font-bold hover:opacity-80 transition-opacity">
                                    CONTACT
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    )
}
