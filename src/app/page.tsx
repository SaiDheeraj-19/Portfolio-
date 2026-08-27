"use client"
import HeroBackground from "@/components/ui/hero-background";

import Link from "next/link"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowRight, Github, Mail, Code, Award, Instagram,
  ExternalLink, Phone, Layers, Folder, ArrowLeft, Briefcase, Send
} from "lucide-react"

import { Button } from "@/components/ui/button"
// Removed unused imports
import Image from "next/image"
import TextType from "@/components/TextType";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog"
import ProfileCard from "@/components/react-bits/ProfileCard"


import Navbar from "@/components/layout/navbar"
import HomeToolsSection from "@/components/home-tools-section"
// import ToolsSection from "@/components/tools-section" // Moved to Tech Stack page

export default function Home() {
  // --- Projects State ---
  // Unused state commented out
  // const [searchTerm, setSearchTerm] = useState("")
  // const [selectedCategory, setSelectedCategory] = useState("All")
  // const [openCategories, setOpenCategories] = useState<string[]>([])
  // const toggleCategory ...

  // Gallery State
  const [showContactPopup, setShowContactPopup] = useState(false)
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null)

  // Contact Form State
  const [formData, setFormData] = useState({
      name: "",
      email: "",
      subject: "",
      message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target
      setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      setIsSubmitting(true)
      setSubmitStatus("idle")

      try {
          const response = await fetch('/api/contact', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
          });

          if (!response.ok) {
              throw new Error('Failed to send message');
          }

          setSubmitStatus("success")
          setFormData({ name: "", email: "", subject: "", message: "" })
      } catch (error) {
          console.error(error);
          setSubmitStatus("error")
      } finally {
          setIsSubmitting(false)
          setTimeout(() => setSubmitStatus("idle"), 5000)
      }
  }



  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [certificationsData, setCertificationsData] = useState<any>({})
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [projects, setProjects] = useState<any[]>([])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [profile, setProfile] = useState<any>(null)

  // Removed unused useEffect dependency array issues if any, keeping bare minimum
  useEffect(() => {
    fetch('/api/portfolio')
      .then(res => res.json())
      .then(data => {
        if (data.certificationsData) setCertificationsData(data.certificationsData)
        if (data.projects) setProjects(data.projects)
        if (data.profile) setProfile(data.profile)
      })
      .catch(err => console.error("Failed to fetch portfolio data", err))
  }, [])

  // Handle Hash Navigation (for when coming from other pages like /tech-stack)
  useEffect(() => {
    // Small delay to ensure state and DOM are ready
    const timer = setTimeout(() => {
      const hash = window.location.hash;
      if (hash === '#contact') setShowContactPopup(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Removed unused categories array
  // const categories = ["All", "Full Stack", "Mobile", "AI"]

  // Removed unused getCategoryIcon function

  // ... (rest of file)

  // Later down in JSX... I will target the Image component separately in next chunk?
  // No, I can't do multiple discontinuous chunks if I replace this block.
  // Wait, I am replacing lines 127-149 roughly?
  // Let's do state/effect update first.

  // Actually, I'll split this into 2 chunks in one call.


  // Removed unused filteredProjects
  // const filteredProjects = ...

  // --- About Data ---
  // Removed unused skills object

  // Removed unused certifications object (using fetched data instead)

  // --- Contact Form State ---
  // Removed unused form data and handlers
  // const [formData, setFormData] = useState(...)

  // Removed unused socialLinks and contactInfo arrays
  // const socialLinks = ...
  // const contactInfo = ...

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar
        onOpenContact={() => setShowContactPopup(true)}
      />
      {/* Hero Section */}
      <section id="home" className="relative h-dvh min-h-screen flex flex-col items-center justify-center overflow-hidden">
        <HeroBackground />



        {/* Background Large Text - Responsive sizing */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none overflow-hidden z-0 py-24 md:py-0">
          <span className="text-[18vw] md:text-[15vw] font-black text-foreground/60 whitespace-nowrap tracking-tighter leading-[0.8] select-none animate-[pulse_3s_ease-in-out_infinite]">
            SAI DHEERAJ
          </span>
        </div>

        {/* Hanging ID Card Wrapper */}
        <div className="relative z-10 flex flex-col items-center -mt-12 animate-in fade-in duration-1000">
          {/* Lanyard Strap Removed */}

          {/* The Swing Animation Container */}
          <div className="origin-top animate-swing hover:animate-none transition-all duration-500 ease-out">
            <div className="w-[85vw] max-w-[320px] aspect-[2/3] md:w-[380px] md:h-[550px]">
              <ProfileCard
                name="Sai Dheeraj"
                title="FULL-STACK AI ENGINEER"
                handle="Building Scalable Systems"
                avatarUrl="/profile.jpg"
                contactText="CONTACT ME"
                status="OPEN TO WORK"
                enableTilt={true}
                enableMobileTilt={true} // Allow tilt on mobile
                enableDrag={true}
                className="bg-neutral-900 border-neutral-800 dark:bg-neutral-100 dark:border-neutral-200 p-1.5 shadow-2xl"
              >
                {/* Canvas/Container for 3D Faces */}
                <div className="relative w-full h-full" style={{ transformStyle: "preserve-3d" }}>

                  {/* --- FRONT FACE --- */}
                  <div className="absolute inset-0 w-full h-full" style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", zIndex: 20 }}>
                    <div className="relative w-full h-full rounded-[20px] overflow-hidden bg-[#0a0a0a] border border-white/10 dark:bg-white dark:border-black/10">
                      
                      {/* Noise Texture */}
                      <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

                      {/* Photo */}
                      <div className="absolute inset-0 z-10 flex items-end justify-center hover:scale-[1.02] transition-transform duration-500">
                        <div className="relative w-full h-full">
                          <Image
                            src={profile?.idCardPhoto || "/profile.jpg"}
                            fill
                            priority
                            className="object-cover object-center"
                            style={{
                              transform: profile?.idCardConfig
                                ? `scale(${profile.idCardConfig.scale}) translate(${profile.idCardConfig.x}px, ${profile.idCardConfig.y}px)`
                                : "scale(1.05) translateY(4px)" // Slight adjustment for the full bleed
                            }}
                            alt="Sai Dheeraj"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                        </div>
                      </div>

                      {/* Bottom Layout */}
                      <div className="absolute bottom-0 inset-x-0 h-[30%] z-40 p-6 flex flex-col justify-end pb-12 pointer-events-none">
                        
                        {/* Text Block */}
                        <div className="font-sans text-3xl md:text-4xl font-black tracking-tight text-white dark:text-black leading-[1.05] drop-shadow-md">
                          <div className="font-mono text-white/70 dark:text-black/70 text-[10px] tracking-[0.2em] mb-2 font-medium uppercase">ROLE //</div>
                          <div>FULL-STACK</div>
                          <div>AI ENGINEER</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* --- BACK FACE --- */}
                  <div className="absolute inset-0 w-full h-full" style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", zIndex: 10 }}>
                    <div className="relative w-full h-full bg-[#050505] dark:bg-[#fafafa] rounded-[20px] overflow-hidden border border-white/10 dark:border-black/10 p-6 flex flex-col">
                      
                      {/* Grid overlay */}
                      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>
                      
                      {/* Top Bar */}
                      <div className="flex justify-between items-center border-b border-white/10 dark:border-black/10 pb-4 z-20">
                        <span className="text-[10px] font-mono tracking-widest text-white/50 dark:text-black/50">SYSTEM PROFILE</span>
                        <div className="px-2 py-0.5 border border-white/20 dark:border-black/20 text-[8px] font-mono tracking-widest text-white/70 dark:text-black/70">VERIFIED</div>
                      </div>

                      {/* Data List */}
                      <div className="flex flex-col gap-4 mt-6 z-20 flex-grow">
                        
                        <div>
                          <p className="text-[8px] font-mono tracking-widest text-white/40 dark:text-black/40 mb-1 uppercase">IDENTITY</p>
                          <p className="text-xs font-sans font-bold tracking-widest text-white dark:text-black uppercase">SAI DHEERAJ</p>
                        </div>

                        <div>
                          <p className="text-[8px] font-mono tracking-widest text-white/40 dark:text-black/40 mb-1 uppercase">ROLE</p>
                          <p className="text-xs font-sans font-bold tracking-widest text-white dark:text-black uppercase">FULL-STACK AI ENGINEER</p>
                        </div>

                        <div>
                          <p className="text-[8px] font-mono tracking-widest text-white/40 dark:text-black/40 mb-1 uppercase">SPECIALIZATION</p>
                          <p className="text-xs font-sans font-bold tracking-widest text-white dark:text-black uppercase leading-[1.4]">AI SYSTEMS<br/>REAL-TIME ENGINEERING<br/>FULL-STACK ARCHITECTURE</p>
                        </div>

                        <div>
                          <p className="text-[8px] font-mono tracking-widest text-white/40 dark:text-black/40 mb-1 uppercase">FOCUS</p>
                          <p className="text-xs font-sans font-bold tracking-widest text-white dark:text-black uppercase leading-[1.4]">INTELLIGENT SOFTWARE<br/>SCALABLE SYSTEMS</p>
                        </div>

                        <div className="mt-auto pt-4">
                          <p className="text-[8px] font-mono tracking-widest text-white/40 dark:text-black/40 mb-1 uppercase">LOCATION</p>
                          <p className="text-xs font-sans font-bold tracking-widest text-white dark:text-black uppercase">KURNOOL // INDIA</p>
                        </div>
                        
                      </div>

                    </div>
                  </div>

                </div>
              </ProfileCard>
            </div>
          </div>

          {/* Foreground Floating Elements */}



        </div>

        {/* Bottom Elements - Optimized for Mobile */}
        <div className="absolute bottom-6 md:bottom-10 w-full z-20 pointer-events-none px-6 md:px-12 flex items-end justify-between">
          <div className="border border-neutral-500/50 backdrop-blur-sm rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-neutral-300 font-mono text-xs md:text-sm pointer-events-auto">
            01
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 bottom-0 flex flex-col items-center gap-2 animate-bounce text-black font-mono hidden md:flex">
            <span className="text-[10px] tracking-[0.3em] font-bold">SCROLL</span>
            <div className="w-[1px] h-12 bg-black" />
          </div>

          <div className="text-right font-mono pointer-events-auto">
            <span className="block text-[10px] uppercase tracking-wider mb-0.5 text-muted-foreground opacity-80">Leveled up by:</span>
            <span className="font-bold text-foreground text-xs md:text-sm uppercase tracking-widest">HARDWORK</span>
          </div>
        </div>
      </section>

      <section className="relative pt-16 pb-32 md:py-32 px-4 md:px-6 overflow-hidden bg-background">
        {/* Animated Background Removed */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-0"></div>

        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <TextType
            text={["I architect intelligent, scalable software systems that drive real-world impact."]}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter="|"
            loop={false}
            as="h2"
            className="text-3xl md:text-5xl lg:text-7xl font-black text-primary tracking-tight leading-[1.05] mb-10 inline-block min-h-[120px]"
          />

          <motion.p
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{
              type: "spring",
              bounce: 0.4,
              duration: 1.5,
              delay: 0.5
            }}
            className="text-lg md:text-2xl lg:text-3xl font-medium text-foreground/90 leading-relaxed max-w-4xl mx-auto mb-12 md:mb-0"
          >
            I am a <span className="font-bold text-primary">Full-Stack AI Engineer</span> with deep expertise spanning computer vision, multilingual processing, and robust real-time infrastructure.
          </motion.p>
        </div>
        <div className="absolute left-6 md:left-12 bottom-10 border border-neutral-700/50 rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-neutral-500 font-mono text-xs md:text-sm pointer-events-auto z-20 backdrop-blur-sm hidden sm:flex">
          02
        </div>

        <div className="absolute left-0 w-full md:w-auto md:left-auto md:right-12 bottom-8 md:bottom-10 z-20 pointer-events-auto flex justify-center md:block px-6 md:px-0">
          <Button
            asChild
            className="w-full md:w-auto rounded-full bg-primary text-primary-foreground shadow-lg border border-transparent hover:bg-primary/90 hover:scale-105 transition-all duration-300 px-8 py-6 font-bold font-mono text-xs tracking-widest uppercase"
          >
            <Link href="/about">
              EXPLORE SAI DHEERAJ <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Tools Grid Section */}
      <HomeToolsSection />




      <Dialog open={showContactPopup} onOpenChange={setShowContactPopup}>
        <DialogContent className="max-w-4xl w-[95vw] bg-background border-border text-foreground p-0 overflow-hidden rounded-[2rem] shadow-2xl [&>button]:hidden flex flex-col">
          <div className="absolute top-4 right-4 md:top-6 md:right-6 z-50">
            <button
              onClick={() => setShowContactPopup(false)}
              className="p-3 rounded-full bg-secondary hover:bg-secondary/80 transition-colors text-muted-foreground hover:text-foreground"
            >
              <span className="sr-only">Close</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
            </button>
          </div>

          <div className="p-8 md:p-16 relative z-10 flex flex-col items-center overflow-y-auto custom-scrollbar">
            <DialogTitle className="text-4xl md:text-6xl font-black mb-4 text-center tracking-tighter uppercase text-foreground">Let&apos;s Talk</DialogTitle>
            <p className="text-muted-foreground mb-12 text-center text-sm md:text-lg max-w-lg leading-relaxed">Choose your preferred way to connect. I&apos;m always open to discussing new projects and ideas.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
              {/* WhatsApp */}
              <a href="https://wa.me/919908918853" target="_blank" rel="noopener noreferrer"
                className="group relative flex flex-col items-center justify-center p-8 rounded-3xl bg-card border border-border hover:border-[#25D366] transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="w-16 h-16 md:w-20 md:h-20 mb-6 rounded-full bg-[#25D366]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg viewBox="0 0 24 24" className="w-8 h-8 md:w-10 md:h-10 fill-[#25D366]" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                </div>
                <span className="font-bold text-xl text-foreground group-hover:text-[#25D366] transition-colors">WhatsApp</span>
                <span className="text-xs text-muted-foreground mt-2 font-mono tracking-wider opacity-60 group-hover:opacity-100 transition-opacity uppercase">Chat Now</span>
              </a>

              {/* Phone */}
              <a href="tel:+919908918853"
                className="group relative flex flex-col items-center justify-center p-8 rounded-3xl bg-card border border-border hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="w-16 h-16 md:w-20 md:h-20 mb-6 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-8 h-8 md:w-10 md:h-10 text-blue-500" />
                </div>
                <span className="font-bold text-xl text-foreground group-hover:text-blue-500 transition-colors">Call Me</span>
                <span className="text-xs text-muted-foreground mt-2 font-mono tracking-wider opacity-60 group-hover:opacity-100 transition-opacity uppercase">Personal Line</span>
              </a>

              {/* Email */}
              <a href="mailto:16saidheeraj@gmail.com"
                className="group relative flex flex-col items-center justify-center p-8 rounded-3xl bg-card border border-border hover:border-primary transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="w-16 h-16 md:w-20 md:h-20 mb-6 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-8 h-8 md:w-10 md:h-10 text-primary" />
                </div>
                <span className="font-bold text-xl text-foreground group-hover:text-primary transition-colors">Email</span>
                <span className="text-xs text-muted-foreground mt-2 font-mono tracking-wider opacity-60 group-hover:opacity-100 transition-opacity uppercase">Send Message</span>
              </a>
            </div>

            {/* Inline Direct Message Form */}
            <div className="w-full mt-16 pt-12 border-t border-border/50 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
              <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-12 text-center md:text-left">Direct Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-16">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      <div className="relative group">
                          <input
                              id="name"
                              name="name"
                              type="text"
                              required
                              value={formData.name}
                              onChange={handleInputChange}
                              className="w-full bg-transparent border-b border-border/30 pb-4 text-foreground focus:outline-none focus:border-primary transition-colors peer placeholder-transparent"
                              placeholder="YOUR NAME"
                          />
                          <label htmlFor="name" className="absolute left-0 top-0 text-sm md:text-base uppercase tracking-widest text-muted-foreground/70 transition-all peer-focus:-translate-y-8 peer-focus:text-xs peer-focus:text-primary peer-valid:-translate-y-8 peer-valid:text-xs peer-valid:text-muted-foreground cursor-text">
                              Your Name
                          </label>
                      </div>
                      <div className="relative group">
                          <input
                              id="email"
                              name="email"
                              type="email"
                              required
                              value={formData.email}
                              onChange={handleInputChange}
                              className="w-full bg-transparent border-b border-border/30 pb-4 text-foreground focus:outline-none focus:border-primary transition-colors peer placeholder-transparent"
                              placeholder="EMAIL ADDRESS"
                          />
                          <label htmlFor="email" className="absolute left-0 top-0 text-sm md:text-base uppercase tracking-widest text-muted-foreground/70 transition-all peer-focus:-translate-y-8 peer-focus:text-xs peer-focus:text-primary peer-valid:-translate-y-8 peer-valid:text-xs peer-valid:text-muted-foreground cursor-text">
                              Email Address
                          </label>
                      </div>
                  </div>

                  <div className="relative group">
                      <input
                          id="subject"
                          name="subject"
                          type="text"
                          required
                          value={formData.subject}
                          onChange={handleInputChange}
                          className="w-full bg-transparent border-b border-border/30 pb-4 text-foreground focus:outline-none focus:border-primary transition-colors peer placeholder-transparent"
                          placeholder="SUBJECT"
                      />
                      <label htmlFor="subject" className="absolute left-0 top-0 text-sm md:text-base uppercase tracking-widest text-muted-foreground/70 transition-all peer-focus:-translate-y-8 peer-focus:text-xs peer-focus:text-primary peer-valid:-translate-y-8 peer-valid:text-xs peer-valid:text-muted-foreground cursor-text">
                          Subject
                      </label>
                  </div>

                  <div className="relative group mt-24">
                      <textarea
                          id="message"
                          name="message"
                          required
                          rows={1}
                          value={formData.message}
                          onChange={handleInputChange}
                          className="w-full bg-transparent border-b border-border/30 pb-4 text-foreground focus:outline-none focus:border-primary transition-colors peer placeholder-transparent resize-none overflow-hidden min-h-[40px]"
                          placeholder="PROJECT DETAILS / MESSAGE"
                          onInput={(e) => {
                              const target = e.target as HTMLTextAreaElement;
                              target.style.height = 'auto';
                              target.style.height = target.scrollHeight + 'px';
                          }}
                      />
                      <label htmlFor="message" className="absolute left-0 top-0 text-sm md:text-base uppercase tracking-widest text-muted-foreground/70 transition-all peer-focus:-translate-y-8 peer-focus:text-xs peer-focus:text-primary peer-valid:-translate-y-8 peer-valid:text-xs peer-valid:text-muted-foreground cursor-text">
                          Project Details / Message
                      </label>
                  </div>

                  {submitStatus === "success" && (
                      <div className="p-6 bg-[#25D366]/10 border border-[#25D366]/30 rounded-2xl animate-in fade-in">
                          <p className="text-[#25D366] font-medium text-lg text-center">Thank you! Your message has been sent successfully.</p>
                      </div>
                  )}

                  {submitStatus === "error" && (
                      <div className="p-6 bg-red-500/10 border border-red-500/30 rounded-2xl animate-in fade-in">
                          <p className="text-red-500 font-medium text-lg text-center">Something went wrong. Please try again or use direct contact.</p>
                      </div>
                  )}

                  <div className="flex justify-center md:justify-start">
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full md:w-auto rounded-full px-12 py-8 text-lg font-bold tracking-widest uppercase transition-all duration-300 hover:scale-105"
                    >
                        {isSubmitting ? (
                            "Sending..."
                        ) : (
                            <>
                                Send Message
                                <Send className="ml-3 h-5 w-5" />
                            </>
                        )}
                    </Button>
                  </div>
              </form>
            </div>
          </div>
        </DialogContent>
      </Dialog>


      <Dialog open={selectedPhoto !== null} onOpenChange={(open) => !open && setSelectedPhoto(null)}>
        <DialogContent className="!fixed !top-0 !left-0 !translate-x-0 !translate-y-0 !w-screen !h-screen !max-w-none !m-0 !p-0 border-none bg-black/95 z-[9999] [&>button]:hidden flex items-center justify-center overflow-hidden">
          <DialogTitle className="sr-only">Selected Certificate</DialogTitle>

          {/* Custom Close Button */}
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-6 right-6 z-[10000] p-3 rounded-full bg-neutral-800 text-white hover:bg-[#ff4d29] transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
          </button>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full h-full p-4 md:p-10 flex items-center justify-center"
            onClick={() => setSelectedPhoto(null)} // Click outside image to close
          >
            {selectedPhoto && (
              <div className="relative w-full h-full max-w-7xl max-h-[90vh]">
                <Image
                  src={selectedPhoto}
                  fill
                  className="object-contain"
                  alt="Certificate View"
                  priority
                />
              </div>
            )}
          </motion.div>
        </DialogContent>
      </Dialog>


      {/* Sections Removed as per user request (About, Skills, Projects) moved to Popups */}

      {/* Contact Section */}
      <section id="contact" className="relative py-32 bg-background overflow-hidden flex flex-col items-center justify-center min-h-[60vh]">
        <div className="absolute inset-0 z-0 bg-background" />
        <div className="relative z-10 flex flex-col items-center justify-center space-y-12 text-center px-4">
          <h2 className="text-4xl md:text-6xl font-bold text-foreground tracking-tight">Let&apos;s turn ideas into real-world software</h2>

          <Button onClick={() => setShowContactPopup(true)} className="rounded-full px-12 py-10 text-xl md:text-3xl bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300">
            <span className="flex items-center gap-4">
              Let&apos;s Connect <ArrowRight className="w-6 h-6 md:w-8 md:h-8" />
            </span>
          </Button>


          <p className="max-w-xl text-muted-foreground text-sm md:text-base leading-relaxed mt-12">
            Warning: Exploring my work may result in better ideas and higher standards.
          </p>
        </div>
      </section>
    </div >
  )
}
