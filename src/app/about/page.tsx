"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/layout/navbar";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion"
import { useRef, useState } from "react"

const journey = [
    {
        period: "2024",
        phase: "START",
        title: "Computer Science",
        description: "Began my B.Tech journey at G. Pullaiah College of Engineering and Technology."
    },
    {
        period: "2025",
        phase: "BUILD",
        title: "Concepts to Products",
        description: "Transitioned from theoretical foundations to architecting and deploying end-to-end full-stack applications."
    },
    {
        period: "2025 → 2026",
        phase: "EXPLORE",
        title: "Beyond Software",
        description: "Started exploring AI, computer vision, speech, and multilingual technology."
    },
    {
        period: "2026",
        phase: "ENGINEER",
        title: "AI × Full Stack",
        description: "Building complete intelligent systems connecting AI models with real-time infrastructure."
    },
    {
        period: "MAY → JULY 2026",
        phase: "ROOTEDLABS",
        title: "Web Dev Intern",
        description: "Worked on the official RootedLabs website and AI-powered learning platform."
    },
    {
        period: "JULY 2026 → PRESENT",
        phase: "RMJ IT SOLUTIONS",
        title: "Team Lead Intern",
        description: "Currently working on MicroIntern, taking responsibility across system architecture."
    },
    {
        period: "AUGUST 2026 → PRESENT",
        phase: "SYNC AI",
        title: "AI Engineer",
        description: "Building next-generation intelligent systems and architecting scalable AI pipelines."
    }
]

export default function AboutPage() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-85.7142%"]); // 600vw out of 700vw

    const [activeSection, setActiveSection] = useState(0);

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (latest < 0.14) setActiveSection(0); // Intro
        else if (latest < 0.28) setActiveSection(1); // About Me
        else if (latest < 0.9) setActiveSection(2); // Journey
        else setActiveSection(3); // Ready to Build
    });

    const navItems = [
        { name: "Intro", vh: 0 },
        { name: "About Me", vh: 100 },
        { name: "Journey", vh: 200 },
        { name: "Ready to Build", vh: 600 }
    ];

    const scrollToView = (vh: number) => {
        if (!targetRef.current) return;
        const top = targetRef.current.offsetTop;
        window.scrollTo({
            top: top + (vh / 100) * window.innerHeight,
            behavior: "smooth"
        });
    };

    return (
        <div ref={targetRef} className="relative bg-background text-foreground font-sans selection:bg-primary/20">
            
            {/* Top Navigation - Fixed so it stays while scrolling horizontally */}
            <div className="fixed top-0 left-0 w-full z-50 pt-8 pb-4 pointer-events-none">
                <div className="container mx-auto px-6 md:px-12">
                    <Button variant="ghost" asChild className="pointer-events-auto hover:bg-transparent hover:text-primary transition-colors uppercase tracking-widest text-xs font-bold text-muted-foreground">
                        <Link href="/">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Return
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Floating Table of Contents */}
            <div className="fixed bottom-12 right-12 z-50 hidden md:flex flex-col gap-6 items-end mix-blend-difference text-white">
                <div className="flex flex-col items-end gap-4">
                    <p className="text-[10px] font-mono uppercase tracking-[0.3em] mb-2 opacity-50">Contents</p>
                    {navItems.map((item, idx) => (
                        <button 
                            key={idx} 
                            onClick={() => scrollToView(item.vh)}
                            className={`text-[10px] font-mono uppercase tracking-[0.2em] transition-all duration-300 flex items-center gap-4 group ${activeSection === idx ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}
                        >
                            <span>{item.name}</span>
                            <div className={`bg-white transition-all duration-300 ${activeSection === idx ? 'w-8 h-px' : 'w-2 h-px group-hover:w-4'}`} />
                        </button>
                    ))}
                </div>
            </div>

            {/* --- DESKTOP HORIZONTAL SCROLL EXPERIENCE --- */}
            <section className="relative h-[700vh] hidden md:block">
                <div className="sticky top-0 h-screen flex items-center overflow-hidden">
                    <motion.div style={{ x }} className="flex h-full w-[700vw]">
                        
                        {/* PANEL 1: HERO HOOK (100vw) */}
                        <div className="w-[100vw] h-full flex flex-col justify-center px-12 lg:px-24 relative overflow-hidden shrink-0">
                            {/* Dramatic background accent */}
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 2 }}
                                className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/5 rounded-full blur-[120px]" 
                            />
                            <motion.h1 
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                                className="text-[12vw] leading-[0.8] font-black tracking-tighter uppercase text-foreground mb-8"
                            >
                                SAI <br/>DHEERAJ
                            </motion.h1>
                            <motion.div 
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                className="flex gap-12 text-sm uppercase tracking-[0.2em] font-medium text-muted-foreground border-l border-primary/30 pl-8"
                            >
                                <p>Full-Stack<br/>AI Engineer</p>
                                <p>Based in<br/>India</p>
                            </motion.div>
                        </div>

                        {/* PANEL 2: THE BIO (100vw) */}
                        <div className="w-[100vw] h-full flex items-center justify-center px-12 lg:px-24 shrink-0">
                            <div className="max-w-4xl">
                                <motion.h2 
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 0.5 }}
                                    viewport={{ once: true, margin: "-10%" }}
                                    className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-16"
                                >
                                    About Me
                                </motion.h2>
                                <div className="flex flex-col gap-10 text-2xl lg:text-4xl font-light tracking-tight text-muted-foreground leading-[1.4]">
                                    <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
                                        I’m an <strong className="text-foreground font-medium">AI Engineer & Full-Stack Developer</strong> focused on building intelligent software systems that solve real-world problems.
                                    </motion.p>
                                    <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}>
                                        I work across AI engineering and full-stack development, combining computer vision, multilingual processing, real-time systems, backend architecture, and modern web technologies to turn ideas into complete, reliable products.
                                    </motion.p>
                                    <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }} className="text-xl lg:text-2xl mt-4 opacity-70">
                                        I enjoy working beneath the interface — understanding <strong className="text-foreground font-medium">how systems communicate, how data flows, how AI becomes part of a product, and how different components come together into a reliable system</strong>.
                                    </motion.p>
                                </div>
                            </div>
                        </div>

                        {/* PANEL 3: HORIZONTAL TIMELINE (400vw) */}
                        <div className="w-[400vw] h-full flex items-center px-12 lg:px-24 relative shrink-0">
                            
                            {/* Ambient typography background */}
                            <div className="absolute inset-0 flex items-center justify-between px-[10vw] pointer-events-none opacity-[0.02] overflow-hidden">
                                <span className="text-[30vw] font-black tracking-tighter">24</span>
                                <span className="text-[30vw] font-black tracking-tighter">25</span>
                                <span className="text-[30vw] font-black tracking-tighter">26</span>
                                <span className="text-[30vw] font-black tracking-tighter">26</span>
                                <span className="text-[30vw] font-black tracking-tighter">26</span>
                            </div>

                            {/* Continuous Horizontal Line */}
                            <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />
                            
                            <h2 className="absolute top-[20%] left-12 lg:left-24 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground opacity-50">Career Progression</h2>

                            <div className="flex justify-around items-center w-full h-full pt-16 px-12 lg:px-24 relative z-10">
                                {journey.map((item, i) => (
                                    <motion.div 
                                        initial={{ opacity: 0, y: i % 2 === 0 ? 30 : -30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-10%" }}
                                        transition={{ duration: 0.9, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                                        key={i} 
                                        className={`relative w-72 lg:w-96 flex-shrink-0 ${i % 2 === 0 ? 'mb-48' : 'mt-48'} group`}
                                    >
                                        {/* Node on the line */}
                                        <div className={`absolute left-0 ${i % 2 === 0 ? '-bottom-[120px]' : '-top-[120px]'} w-1.5 h-1.5 bg-primary rounded-full z-10 shadow-[0_0_10px_rgba(var(--primary),0.8)] group-hover:scale-[2] transition-transform duration-500`} />
                                        
                                        {/* Connector line to node */}
                                        <div className={`absolute left-[2px] w-px h-[120px] bg-gradient-to-b from-primary/30 to-transparent ${i % 2 === 0 ? '-bottom-[120px] bg-gradient-to-t' : '-top-[120px]'}`} />

                                        <div className="pl-8 border-l border-border/30 group-hover:border-primary/50 transition-colors duration-500">
                                            <span className="text-[10px] font-mono text-muted-foreground/60 tracking-[0.2em] uppercase block mb-3">
                                                {item.period}
                                            </span>
                                            <h3 className="text-2xl font-light tracking-tight text-foreground mb-2 group-hover:text-primary transition-colors duration-500">
                                                {item.title}
                                            </h3>
                                            <span className="inline-block text-[9px] font-bold tracking-[0.3em] uppercase text-primary/70 mb-5">
                                                {item.phase}
                                            </span>
                                            <p className="text-muted-foreground text-sm leading-relaxed font-light">
                                                {item.description}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* PANEL 4: THE OUTRO (100vw) */}
                        <div className="w-[100vw] h-full flex items-center justify-center px-12 lg:px-24 bg-foreground text-background shrink-0">
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, margin: "-10%" }}
                                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                className="text-center max-w-4xl relative z-10"
                            >
                                <h3 className="text-6xl lg:text-[7vw] font-black uppercase tracking-tighter mb-8 leading-[0.9]">
                                    Ready to build?
                                </h3>
                                <p className="text-xl lg:text-2xl text-background/70 font-medium mb-16">
                                    The journey isn&apos;t about knowing everything. It&apos;s about being able to build what comes next.
                                </p>
                                <Button asChild size="lg" className="rounded-full px-12 py-8 text-lg font-bold tracking-widest uppercase bg-background text-foreground hover:scale-105 active:scale-95 transition-all duration-300">
                                    <Link href="/contact">Get in Touch</Link>
                                </Button>
                            </motion.div>
                        </div>

                    </motion.div>
                </div>
            </section>

            {/* --- MOBILE VERTICAL FALLBACK (Hidden on md+) --- */}
            <section className="block md:hidden pt-32 pb-24 px-6 space-y-32">
                
                {/* Mobile Hero */}
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="flex flex-col gap-6">
                    <h1 className="text-6xl leading-[0.8] font-black tracking-tighter uppercase text-foreground mb-4">
                        SAI <br/>DHEERAJ
                    </h1>
                    <div className="flex flex-col gap-4 text-xs uppercase tracking-[0.2em] font-medium text-muted-foreground border-l-2 border-primary/30 pl-4">
                        <p>Full-Stack AI Engineer</p>
                        <p>Based in India</p>
                    </div>
                </motion.div>

                {/* Mobile Bio */}
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.8 }}>
                    <h2 className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-8 opacity-50">About Me</h2>
                    <div className="flex flex-col gap-6 text-xl font-light tracking-tight text-muted-foreground leading-relaxed">
                        <p>I’m an <strong className="text-foreground font-medium">AI Engineer & Full-Stack Developer</strong> focused on building intelligent software systems that solve real-world problems.</p>
                        <p>I work across AI engineering and full-stack development, combining computer vision, multilingual processing, real-time systems, backend architecture, and modern web technologies to turn ideas into complete, reliable products.</p>
                        <p>I enjoy working beneath the interface — understanding <strong className="text-foreground font-medium">how systems communicate, how data flows, how AI becomes part of a product, and how different components come together into a reliable system</strong>.</p>
                    </div>
                </motion.div>

                {/* Mobile Timeline */}
                <div>
                    <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 0.5 }} viewport={{ once: true }} className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-16">Career Progression</motion.h2>
                    <div className="relative border-l border-border/30 ml-3 space-y-16 pb-4">
                        {journey.map((item, i) => (
                            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.6, delay: i * 0.1 }} key={i} className="relative pl-8 group">
                                <div className="absolute -left-[3.5px] top-1.5 w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_10px_rgba(var(--primary),0.8)]" />
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-mono text-muted-foreground/60 tracking-[0.2em] uppercase mb-2">{item.period}</span>
                                    <h3 className="text-xl font-light tracking-tight text-foreground mb-1 group-hover:text-primary transition-colors">{item.title}</h3>
                                    <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-primary/70 mb-3">{item.phase}</span>
                                    <p className="text-muted-foreground text-sm leading-relaxed font-light">{item.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Mobile Outro */}
                <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.8 }} className="bg-foreground text-background p-10 rounded-3xl text-center flex flex-col items-center">
                    <h3 className="text-4xl font-black uppercase tracking-tighter mb-4 leading-none">Ready to build?</h3>
                    <p className="text-background/70 text-sm font-medium mb-8">The journey isn&apos;t about knowing everything. It&apos;s about being able to build what comes next.</p>
                    <Button asChild className="rounded-full w-full py-6 text-sm font-bold tracking-widest uppercase bg-background text-foreground">
                        <Link href="/contact">Get in Touch</Link>
                    </Button>
                </motion.div>

            </section>

        </div>
    )
}
