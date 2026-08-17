"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Github, Linkedin, Mail, ExternalLink, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"

const skills = {
    "Programming": ["Python", "TypeScript", "JavaScript", "SQL"],
    "Frontend": ["React 19", "Next.js", "React Native", "Tailwind CSS", "Framer Motion", "Zustand"],
    "Backend": ["FastAPI", "Node.js", "Express", "REST APIs", "SQLAlchemy"],
    "Databases": ["PostgreSQL", "MongoDB", "Supabase"],
    "AI & ML": ["Groq Vision API", "OpenAI", "Gemini", "YOLOv8", "Hugging Face"],
    "DevOps & Security": ["Docker", "Vercel", "JWT", "RBAC"]
}

const journey = [
    {
        period: "2024",
        phase: "START",
        title: "Computer Science Engineering",
        description: "Began my B.Tech journey at G. Pullaiah College of Engineering and Technology and started building the foundations of software engineering."
    },
    {
        period: "2025",
        phase: "BUILD",
        title: "From concepts to products",
        description: "Moved from learning individual technologies to building complete web applications, APIs, databases, and product experiences."
    },
    {
        period: "2025 → 2026",
        phase: "EXPLORE",
        title: "Beyond traditional software",
        description: "Started exploring AI, computer vision, speech, multilingual technology, security, and real-time systems through increasingly complex projects."
    },
    {
        period: "2026",
        phase: "ENGINEER",
        title: "AI × Full Stack × Real-Time",
        description: "Started building complete intelligent systems — connecting AI models with frontend experiences, backend services, databases, and real-time infrastructure."
    },
    {
        period: "MAY → JULY 2026",
        phase: "ROOTEDLABS",
        title: "Web Development Intern",
        description: "Worked on the official RootedLabs website and AI-powered learning platform, gaining experience building software for real educational use cases."
    },
    {
        period: "JULY 2026 → PRESENT",
        phase: "RMJ IT SOLUTIONS",
        title: "Team Lead Intern",
        description: "Currently working on MicroIntern, taking responsibility across system architecture, AI pipelines, backend engineering, database design, API integration, and DevOps."
    }
]

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background pt-24 pb-24 text-foreground selection:bg-primary/20">
            <div className="container mx-auto px-4 md:px-8 max-w-7xl">
                
                {/* Back to Home */}
                <Button variant="ghost" asChild className="mb-8 md:mb-16 -ml-4 hover:bg-transparent hover:text-primary">
                    <Link href="/">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Home
                    </Link>
                </Button>

                {/* Two Column Layout */}
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 relative">
                    
                    {/* Left Column: Sticky Sidebar */}
                    <div className="w-full lg:w-1/3">
                        <div className="lg:sticky lg:top-32 flex flex-col animate-in fade-in slide-in-from-bottom-8 duration-1000">
                            
                            {/* Profile Image */}
                            <div className="relative w-full aspect-square mb-8 rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-border shadow-sm group">
                                <Image 
                                    src="/profile.jpg"
                                    alt="Sai Dheeraj"
                                    fill
                                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                    sizes="(max-width: 1024px) 100vw, 33vw"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                            </div>

                            {/* Info */}
                            <div>
                                <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2 uppercase">Sai Dheeraj</h1>
                                <p className="text-primary font-mono text-sm tracking-widest uppercase mb-6">Full-Stack AI Engineer</p>
                                
                                <p className="text-muted-foreground leading-relaxed mb-8 text-sm md:text-base">
                                    Architecting intelligent, scalable software systems that drive real-world impact across web, mobile, and AI infrastructure.
                                </p>

                                {/* Contact Links */}
                                <div className="flex flex-col gap-3 border-t border-border pt-6">
                                    <a href="mailto:16saidheeraj@gmail.com" className="flex items-center gap-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group">
                                        <Mail className="w-4 h-4 group-hover:text-primary transition-colors" />
                                        16saidheeraj@gmail.com
                                    </a>
                                    <a href="https://www.linkedin.com/in/sai-dheeraj-a1145830b/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group">
                                        <Linkedin className="w-4 h-4 group-hover:text-primary transition-colors" />
                                        LinkedIn Profile <ExternalLink className="w-3 h-3 opacity-50" />
                                    </a>
                                    <a href="https://github.com/SaiDheeraj-19" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group">
                                        <Github className="w-4 h-4 group-hover:text-primary transition-colors" />
                                        GitHub Portfolio <ExternalLink className="w-3 h-3 opacity-50" />
                                    </a>
                                    <a href="https://www.instagram.com/your.saidheeraj/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group">
                                        <Instagram className="w-4 h-4 group-hover:text-primary transition-colors" />
                                        Instagram Profile <ExternalLink className="w-3 h-3 opacity-50" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Scrolling Content */}
                    <div className="w-full lg:w-2/3 flex flex-col gap-24">
                        
                        {/* Section 1: Biography */}
                        <section className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150">
                            <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-8 pb-4 border-b border-border">Professional Summary</h2>
                            <div className="prose prose-neutral dark:prose-invert prose-lg max-w-none text-muted-foreground leading-relaxed">
                                <p className="mb-6">
                                    I am a <strong className="text-foreground">Full-Stack AI Engineer</strong> specializing in the design and development of intelligent, scalable software systems. By bridging the gap between advanced artificial intelligence and robust full-stack architecture, I build solutions that drive real-world impact.
                                </p>
                                <p className="mb-6">
                                    My expertise spans machine learning, computer vision, multilingual processing, and real-time infrastructure—allowing me to architect end-to-end applications that are both highly innovative and enterprise-ready.
                                </p>
                                <p>
                                    I enjoy solving the problems beneath the interface — how systems communicate, how data moves, how AI fits into a product, and how everything can work together reliably at scale. I care about building software that is technically sound, practical to use, and engineered with purpose.
                                </p>
                            </div>
                        </section>

                        {/* Section 2: Technical Skills */}
                        <section className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
                            <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-8 pb-4 border-b border-border">Technical Capabilities</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                                {Object.entries(skills).map(([category, items]) => (
                                    <div key={category}>
                                        <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4">{category}</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {items.map((skill) => (
                                                <span 
                                                    key={skill} 
                                                    className="px-3 py-1 bg-secondary/50 border border-border rounded-md text-xs font-medium text-foreground hover:bg-secondary transition-colors"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Section 3: Journey Timeline */}
                        <section className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
                            <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-8 pb-4 border-b border-border">Career Progression</h2>
                            
                            <div className="relative border-l border-border ml-3 md:ml-4 space-y-12 pb-8">
                                {journey.map((item, i) => (
                                    <div key={i} className="relative pl-8 md:pl-12 group">
                                        {/* Timeline Node */}
                                        <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 bg-border rounded-full ring-4 ring-background group-hover:bg-primary transition-colors duration-300"></div>
                                        
                                        <div className="flex flex-col gap-1.5">
                                            <span className="text-xs font-mono tracking-widest uppercase text-muted-foreground">
                                                {item.period}
                                            </span>
                                            <h3 className="text-xl md:text-2xl font-bold tracking-tight text-foreground mt-1">
                                                {item.title}
                                            </h3>
                                            <span className="text-xs font-bold uppercase tracking-wider text-primary mb-2">
                                                {item.phase}
                                            </span>
                                            <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Footer Outro */}
                        <section className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-700 pb-12">
                             <div className="p-8 md:p-12 bg-neutral-50 dark:bg-neutral-900 rounded-3xl border border-border">
                                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-foreground mb-4">
                                    Still learning. Still building. 
                                </h3>
                                <p className="text-muted-foreground text-lg mb-8 max-w-xl">
                                    The journey isn&apos;t about knowing everything. It&apos;s about being able to build what comes next. Let&apos;s build something great together.
                                </p>
                                <Button asChild className="rounded-full px-8 py-6 font-bold tracking-widest uppercase">
                                    <Link href="/contact">Get in Touch</Link>
                                </Button>
                             </div>
                        </section>

                    </div>
                </div>

            </div>
        </div>
    )
}
