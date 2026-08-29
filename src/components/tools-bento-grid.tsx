"use client";

import { useRef, useState, useEffect } from "react";
import { toolCategories, type ToolEntry, type CategoryEntry } from "@/data/tools";
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from "framer-motion";
import Image from "next/image";
import * as LucideIcons from "lucide-react";

/* ─── Icon renderer ─────────────────────────────────────────── */
function ToolIcon({ tool, size = 20 }: { tool: ToolEntry; size?: number }) {
    if (tool.inlineSvg) {
        return (
            <svg viewBox={tool.svgViewBox ?? "0 0 24 24"}
                style={{ width: size, height: size, fill: `#${tool.color}`, flexShrink: 0 }}
                xmlns="http://www.w3.org/2000/svg">
                <path d={tool.inlineSvg} />
            </svg>
        );
    }
    if (tool.isLucide) {
        const Icon = (LucideIcons as any)[tool.slug ?? "Code"] ?? LucideIcons.Code;
        return <Icon style={{ width: size, height: size, color: `#${tool.color}` }} strokeWidth={1.5} />;
    }
    if (!tool.icon) return <LucideIcons.Code style={{ width: size, height: size }} strokeWidth={1.5} />;
    return (
        <Image src={tool.icon} alt={tool.name} width={size} height={size}
            className="object-contain" unoptimized
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
    );
}

/* ─── Tool chip ─────────────────────────────────────────────── */
function ToolChip({ tool, accent, onClick }: { tool: ToolEntry; accent: string; onClick: () => void }) {
    return (
        <motion.button onClick={onClick}
            whileHover={{ y: -2, scale: 1.05 }} whileTap={{ scale: 0.97 }}
            className="group/chip flex items-center gap-2.5 pl-3 pr-4 py-2.5 relative
                       bg-card/40 hover:bg-card border border-border/30 hover:border-transparent
                       rounded-xl cursor-pointer transition-all duration-200 overflow-hidden"
        >
            <div className="absolute inset-0 opacity-0 group-hover/chip:opacity-100 transition-opacity duration-300 rounded-xl"
                style={{ background: `linear-gradient(135deg, ${accent}18, ${accent}06)`, border: `1px solid ${accent}40` }} />
            <div className="relative z-10 flex-shrink-0 flex items-center justify-center w-5 h-5">
                <ToolIcon tool={tool} size={20} />
            </div>
            <span className="relative z-10 text-[12px] font-medium text-muted-foreground group-hover/chip:text-foreground whitespace-nowrap transition-colors">
                {tool.name}
            </span>
        </motion.button>
    );
}

/* ─── Category card (timeline node) ────────────────────────── */
function CategoryNode({
    cat, isTop, index, onToolClick
}: {
    cat: CategoryEntry; isTop: boolean; index: number; onToolClick: (t: ToolEntry, c: CategoryEntry) => void
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: isTop ? 30 : -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.9, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className={`relative w-[30vw] min-w-[340px] max-w-[480px] flex-shrink-0 group
                        ${isTop ? "mb-48" : "mt-48"}`}
        >
            {/* Dot on the center line */}
            <div
                className={`absolute left-0 w-2 h-2 rounded-full z-10 transition-transform duration-500 group-hover:scale-[2]
                            ${isTop ? "-bottom-[120px]" : "-top-[120px]"}`}
                style={{ backgroundColor: cat.accent, boxShadow: `0 0 12px ${cat.accent}80` }}
            />
            {/* Connector */}
            <div
                className={`absolute left-[3px] w-px h-[120px]
                            ${isTop ? "-bottom-[120px]" : "-top-[120px]"}`}
                style={{ background: isTop
                    ? `linear-gradient(to top, ${cat.accent}40, transparent)`
                    : `linear-gradient(to bottom, ${cat.accent}40, transparent)` }}
            />

            {/* Content */}
            <div className="pl-8 border-l border-border/20 group-hover:border-primary/30 transition-colors duration-500">
                <div className="flex items-center gap-3 mb-3">
                    <span className="text-[10px] font-black tracking-[0.35em] uppercase" style={{ color: cat.accent }}>
                        {cat.number}
                    </span>
                    <div className="h-px flex-1" style={{ backgroundColor: `${cat.accent}30` }} />
                </div>
                <h3 className="text-xl font-light tracking-tight text-foreground mb-5 group-hover:text-primary transition-colors duration-500">
                    {cat.label}
                </h3>
                <div className="flex flex-wrap gap-2">
                    {cat.tools.map((tool) => (
                        <ToolChip key={tool.name} tool={tool} accent={cat.accent}
                            onClick={() => onToolClick(tool, cat)} />
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

/* ─── Main ──────────────────────────────────────────────────── */
export default function ToolsBentoGrid() {
    const [selected, setSelected] = useState<{ tool: ToolEntry; cat: CategoryEntry } | null>(null);
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: targetRef });

    // Prevent background scrolling when modal is open
    useEffect(() => {
        if (selected) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [selected]);

    const TOTAL_VW = 1200;
    const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${((TOTAL_VW - 100) / TOTAL_VW) * 100}%`]);

    const [activeSection, setActiveSection] = useState(0);

    // Section thresholds (evenly split across 0-1)
    const navItems = [
        { name: "Intro",            threshold: 0 },
        { name: "AI Engineering",   threshold: 0.08 },
        { name: "Multimodal AI",    threshold: 0.18 },
        { name: "AI Backend",       threshold: 0.27 },
        { name: "Languages",        threshold: 0.36 },
        { name: "Frontend",         threshold: 0.45 },
        { name: "Backend",          threshold: 0.54 },
        { name: "Databases",        threshold: 0.63 },
        { name: "Security",         threshold: 0.72 },
        { name: "DevOps",           threshold: 0.81 },
        { name: "Dev Tools",        threshold: 0.90 },
    ];

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        let active = 0;
        for (let i = navItems.length - 1; i >= 0; i--) {
            if (latest >= navItems[i].threshold) { active = i; break; }
        }
        setActiveSection(active);
    });

    const scrollToVh = (frac: number) => {
        if (!targetRef.current) return;
        window.scrollTo({
            top: targetRef.current.offsetTop + frac * TOTAL_VW * (window.innerHeight / 100),
            behavior: "smooth"
        });
    };

    const totalTools = toolCategories.reduce((a, c) => a + c.tools.length, 0);

    return (
        <div ref={targetRef} className="relative bg-background text-foreground font-sans selection:bg-primary/20">

            {/* Floating Table of Contents */}
            <div className="fixed bottom-12 right-12 z-50 hidden md:flex flex-col gap-6 items-end mix-blend-difference text-white">
                <div className="flex flex-col items-end gap-4">
                    <p className="text-[10px] font-mono uppercase tracking-[0.3em] mb-2 opacity-50">Contents</p>
                    {navItems.map((item, idx) => (
                        <button 
                            key={idx} 
                            onClick={() => scrollToVh(item.threshold)}
                            className={`text-[10px] font-mono uppercase tracking-[0.2em] transition-all duration-300 flex items-center gap-4 group ${activeSection === idx ? "text-white" : "text-white/40 hover:text-white/70"}`}
                        >
                            <span>{item.name}</span>
                            <div className={`transition-all duration-300 ${activeSection === idx ? "w-8 h-px bg-white" : "w-2 h-px bg-white/40 group-hover:w-4 group-hover:bg-white/70"}`} />
                        </button>
                    ))}
                </div>
            </div>

            {/* ─── DESKTOP HORIZONTAL SCROLL ─── */}
            <section className={`hidden md:block`} style={{ height: `${TOTAL_VW}vh` }}>
                <div className="sticky top-0 h-screen flex items-center overflow-hidden">
                    <motion.div className="flex h-full" style={{ width: `${TOTAL_VW}vw`, x }}>

                        {/* PANEL 1: HERO (100vw) */}
                        <div className="w-[100vw] h-full flex flex-col justify-center px-12 lg:px-24 relative overflow-hidden shrink-0">
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}
                                className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/5 rounded-full blur-[120px]" />

                            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                className="flex items-center gap-4 mb-8">
                                <div className="h-px w-12 bg-primary/50" />
                                <span className="text-[11px] font-bold tracking-[0.4em] uppercase text-primary/70">Technical Arsenal</span>
                            </motion.div>

                            <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                                className="text-[10vw] leading-[0.8] font-black tracking-tighter uppercase text-foreground mb-8">
                                TECHNOLOGY<br /><span className="text-primary">STACK</span>
                            </motion.h1>

                            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                className="text-lg lg:text-2xl font-light text-muted-foreground max-w-2xl border-l border-primary/30 pl-8 leading-relaxed">
                                The tools and frameworks I use to build scalable, high-performance systems and AI products.
                            </motion.div>
                        </div>

                        {/* PANEL 2: TIMELINE (big panel holding all categories) */}
                        <div className="flex items-center px-12 lg:px-24 relative shrink-0"
                            style={{ width: `${TOTAL_VW - 100}vw` }}>

                            {/* Ambient watermark numbers */}
                            <div className="absolute inset-0 flex items-center justify-around pointer-events-none opacity-[0.02] overflow-hidden">
                                {toolCategories.map(c => (
                                    <span key={c.id} className="text-[25vw] font-black tracking-tighter">{c.number}</span>
                                ))}
                            </div>

                            {/* The continuous center line */}
                            <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-border/40 to-transparent" />

                            <span className="absolute top-[20%] left-12 lg:left-24 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground opacity-50">
                                Tech Stack Journey
                            </span>

                            {/* All category nodes */}
                            <div className="flex justify-around items-center w-full h-full pt-16 px-12 lg:px-24 relative z-10">
                                {toolCategories.map((cat, i) => (
                                    <CategoryNode
                                        key={cat.id}
                                        cat={cat}
                                        isTop={i % 2 === 0}
                                        index={i}
                                        onToolClick={(tool, c) => setSelected({ tool, cat: c })}
                                    />
                                ))}
                            </div>
                        </div>

                    </motion.div>
                </div>
            </section>

            {/* ─── MOBILE VERTICAL FALLBACK ─── */}
            <section className="block md:hidden pt-32 pb-24 px-6 space-y-24">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.8 }} className="flex flex-col gap-6">
                    <div className="flex items-center gap-4">
                        <div className="h-px w-8 bg-primary/50" />
                        <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-primary/70">Technical Arsenal</span>
                    </div>
                    <h1 className="text-6xl leading-[0.8] font-black tracking-tighter uppercase">
                        TECHNOLOGY<br /><span className="text-primary">STACK</span>
                    </h1>
                    <div className="text-sm font-light text-muted-foreground border-l-2 border-primary/30 pl-4 leading-relaxed">
                        The tools and frameworks I use to build scalable, high-performance systems and AI products.
                    </div>
                </motion.div>

                <div className="relative border-l border-border/30 ml-3 space-y-16 pb-4">
                    {toolCategories.map((cat, i) => (
                        <motion.div key={cat.id} initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 0.6, delay: i * 0.05 }}
                            className="relative pl-8 group">
                            <div className="absolute -left-[3.5px] top-1.5 w-1.5 h-1.5 rounded-full"
                                style={{ backgroundColor: cat.accent, boxShadow: `0 0 8px ${cat.accent}80` }} />
                            <span className="text-[10px] font-black tracking-[0.35em] uppercase block mb-1" style={{ color: cat.accent }}>{cat.number}</span>
                            <h3 className="text-xl font-light tracking-tight text-foreground mb-4">{cat.label}</h3>
                            <div className="flex flex-wrap gap-2">
                                {cat.tools.map(tool => (
                                    <ToolChip key={tool.name} tool={tool} accent={cat.accent}
                                        onClick={() => setSelected({ tool, cat })} />
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ─── MODAL ─── */}
            <AnimatePresence>
                {selected && (
                    <motion.div key="overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4 md:p-8"
                        style={{ backgroundColor: "rgba(0,0,0,0.7)", backdropFilter: "blur(16px)" }}
                        onClick={() => setSelected(null)}>
                        <motion.div key="card" initial={{ opacity: 0, y: 60, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 60, scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 280, damping: 28 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-2xl rounded-none md:rounded-2xl overflow-hidden shadow-2xl bg-background"
                            style={{ border: `1px solid var(--border)` }}>

                            <div className="p-8 md:p-12">
                                {/* Header row */}
                                <div className="flex flex-col md:flex-row md:items-center gap-6 mb-12">
                                    {/* Big icon - stark minimal box */}
                                    <div className="w-20 h-20 rounded-xl flex items-center justify-center flex-shrink-0 bg-secondary/30 border border-border/50">
                                        <div className="grayscale opacity-80">
                                            <ToolIcon tool={selected.tool} size={40} />
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <span className="inline-block text-[10px] font-mono tracking-[0.3em] uppercase text-muted-foreground mb-3 border border-border/50 px-3 py-1 rounded-full">
                                            {selected.cat.number} — {selected.cat.label}
                                        </span>
                                        <h3 className="text-4xl md:text-5xl font-black tracking-tighter uppercase text-foreground leading-none">
                                            {selected.tool.name}
                                        </h3>
                                    </div>
                                </div>

                                {/* Three editorial sections */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 border-y border-border/40 py-8 my-8">
                                    {[
                                        { label: "Why I chose it", content: selected.tool.why },
                                        { label: "How it helps", content: selected.tool.helpful },
                                        { label: "Scalability",     content: selected.tool.scale },
                                    ].filter(s => s.content).map(({ label, content }) => (
                                        <div key={label} className="space-y-3">
                                            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground/60">
                                                {label}
                                            </p>
                                            <p className="text-sm font-medium text-foreground/80 leading-relaxed">
                                                {content}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                {/* Footer */}
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground/40">
                                        {selected.cat.tools.length} Tools in {selected.cat.label}
                                    </span>
                                    <button onClick={() => setSelected(null)}
                                        className="text-xs font-bold uppercase tracking-[0.2em] text-foreground 
                                                   hover:text-background hover:bg-foreground transition-colors duration-300 px-6 py-3
                                                   rounded-none border border-foreground">
                                        Close
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
