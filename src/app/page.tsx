"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  ArrowRight, Github, Mail, Code, Award, Instagram,
  ExternalLink, Phone, Layers, Folder, ArrowLeft
} from "lucide-react"

import { Button } from "@/components/ui/button"
// Removed unused imports
import Image from "next/image"
import TextType from "@/components/TextType";
import { FloatingPaths } from "@/components/ui/background-paths";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import ProfileCard from "@/components/react-bits/ProfileCard"
import Aurora from "@/components/react-bits/Aurora"
import Hyperspeed, { hyperspeedPresets } from "@/components/react-bits/Hyperspeed"

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
  const [showPhotoGallery, setShowPhotoGallery] = useState(false)
  const [showAboutPopup, setShowAboutPopup] = useState(false)
  const [showCertificatesPopup, setShowCertificatesPopup] = useState(false)
  const [showProjectsPopup, setShowProjectsPopup] = useState(false)
  const [showContactPopup, setShowContactPopup] = useState(false)
  const [selectedCertCategory, setSelectedCertCategory] = useState<string | null>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null)

  const galleryImages = [
    // 1. Top Left (Behind Sticker)
    {
      src: "/gallery/photo1.jpg",
      alt: "Green Field",
      className: "top-[20%] left-[15%] md:left-[20%] w-48 h-60 md:w-60 md:h-72 rotate-[-15deg] opacity-80 hover:opacity-100",
      initial: { opacity: 0, scale: 0.8, rotate: -25 },
      animate: { opacity: 1, scale: 1, rotate: -15 },
      transition: { duration: 0.6, delay: 0.1 }
    },
    // 2. Top Center-Right (Behind Sticker)
    {
      src: "/gallery/photo7.jpg",
      alt: "Gym Mirror",
      className: "top-[15%] right-[25%] md:right-[30%] w-44 h-56 md:w-52 md:h-64 rotate-[10deg] opacity-80 hover:opacity-100",
      initial: { opacity: 0, scale: 0.8, rotate: 20 },
      animate: { opacity: 1, scale: 1, rotate: 10 },
      transition: { duration: 0.6, delay: 0.2 }
    },
    // 3. Middle Left (Peeking out)
    {
      src: "/gallery/photo5.jpg",
      alt: "Standing Field",
      className: "top-[40%] left-[8%] md:left-[15%] w-52 h-64 md:w-64 md:h-80 rotate-[-5deg] opacity-80 hover:opacity-100",
      initial: { opacity: 0, x: -50, rotate: -15 },
      animate: { opacity: 1, x: 0, rotate: -5 },
      transition: { duration: 0.6, delay: 0.3 },
      showInstagramLink: true
    },
    // 4. Middle Right (Peeking out)
    {
      src: "/gallery/photo2.jpg",
      alt: "Mall Selfie",
      className: "top-[45%] right-[10%] md:right-[15%] w-40 h-48 md:w-48 md:h-56 rotate-[8deg] opacity-80 hover:opacity-100",
      initial: { opacity: 0, x: 50, rotate: 15 },
      animate: { opacity: 1, x: 0, rotate: 8 },
      transition: { duration: 0.6, delay: 0.4 }
    },
    // 5. Bottom Left (Under Social Tag)
    {
      src: "/gallery/photo6.jpg",
      alt: "Blue Shirt College",
      className: "bottom-[15%] left-[20%] md:left-[25%] w-48 h-40 md:w-60 md:h-48 rotate-[-10deg] opacity-80 hover:opacity-100",
      initial: { opacity: 0, y: 50, rotate: -20 },
      animate: { opacity: 1, y: 0, rotate: -10 },
      transition: { duration: 0.6, delay: 0.6 }
    },
    // 6. Bottom Right
    {
      src: "/gallery/photo4.jpg",
      alt: "Sitting Pose",
      className: "bottom-[20%] right-[20%] md:right-[25%] w-48 h-60 md:w-56 md:h-72 rotate-[5deg] opacity-80 hover:opacity-100",
      initial: { opacity: 0, y: 50, rotate: 15 },
      animate: { opacity: 1, y: 0, rotate: 5 },
      transition: { duration: 0.6, delay: 0.7 }
    },
    // 7. Deep Background Center
    {
      src: "/gallery/photo3.jpg",
      alt: "B&W Gym",
      className: "top-[10%] left-[45%] -translate-x-1/2 w-40 h-52 md:w-48 md:h-60 rotate-[-2deg] opacity-60 hover:opacity-100 z-0",
      initial: { opacity: 0, scale: 0.5 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.8, delay: 0 }
    },
  ]

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
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar
        onOpenProjects={() => setShowProjectsPopup(true)}
        onOpenResume={() => window.open(profile?.resumeUrl || '/resume.pdf', '_blank')}
        onOpenAbout={() => setShowAboutPopup(true)}
        onOpenContact={() => setShowContactPopup(true)}
      />
      {/* Hero Section */}
      <section id="home" className="relative h-dvh min-h-screen flex flex-col items-center justify-center overflow-hidden">

        {/* Aurora Background */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-50 mix-blend-screen">
          <Aurora
            colorStops={["#000000", "#ffffff", "#aaaaaa"]}
            amplitude={1}
            blend={0.5}
            speed={0.5}
          />
        </div>

        {/* Background Large Text - Responsive sizing */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none overflow-hidden z-0 py-24 md:py-0 opacity-20 md:opacity-100">
          <span className="text-[25vw] md:text-[17vw] font-black text-transparent bg-clip-text bg-gradient-to-b from-white/40 to-white/10 whitespace-nowrap tracking-tighter leading-[0.8] select-none animate-[pulse_3s_ease-in-out_infinite] drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]">
            SAI
          </span>
          <span className="text-[25vw] md:text-[17vw] font-black text-transparent bg-clip-text bg-gradient-to-b from-white/40 to-white/10 whitespace-nowrap tracking-tighter leading-[0.8] select-none animate-[pulse_3s_ease-in-out_infinite] drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]">
            DHEERAJ
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
                title="Full Stack Engineer"
                handle="Building Scalable Systems"
                avatarUrl="/sai_profile_bw.png"
                contactText="CONTACT ME"
                status="OPEN TO WORK"
                enableTilt={true}
                enableMobileTilt={true} // Allow tilt on mobile
                enableDrag={true}
                className="bg-neutral-900 border-neutral-800 p-1.5 shadow-2xl"
              >
                {/* Canvas/Container for 3D Faces */}
                <div className="relative w-full h-full" style={{ transformStyle: "preserve-3d" }}>

                  {/* --- FRONT FACE --- */}
                  <div className="absolute inset-0 w-full h-full" style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", zIndex: 20 }}>
                    {/* Dark Card Body */}
                    <div className="relative w-full h-full rounded-[20px] overflow-hidden" style={{ background: "radial-gradient(circle at top, #1B1E23 0%, #0E1116 40%, #050608 100%)" }}>



                      {/* Left Side Greeting */}
                      <div className="absolute top-6 left-4 z-20 -rotate-6 opacity-70">
                        <span className="text-[10px] font-black tracking-[0.2em] text-white/50">
                          HOLA AMIGOES
                        </span>
                      </div>

                      {/* Photo - Clickable to open Gallery */}
                      <div
                        className="absolute bottom-0 left-0 w-full h-[90%] z-10 flex items-end justify-center cursor-zoom-in hover:scale-[1.02] transition-transform duration-300"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowPhotoGallery(true);
                        }}
                      >
                        <div className="relative w-full h-full">
                          <Image
                            src={profile?.idCardPhoto || "/sai_profile_bw.png"}
                            fill
                            priority
                            className="object-cover object-center"
                            style={{
                              transform: profile?.idCardConfig
                                ? `scale(${profile.idCardConfig.scale}) translate(${profile.idCardConfig.x}px, ${profile.idCardConfig.y}px)`
                                : "scale(1.1) translateY(8px)" // Default fallback matching previous look
                            }}
                            alt="Sai Dheeraj"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
                        </div>
                      </div>

                      {/* Text Overlay */}
                      <div className="relative z-40 p-6 text-white mt-auto h-full flex flex-col justify-end pb-12 pointer-events-none">
                        <p className="text-[10px] font-bold tracking-[0.2em] mb-1 opacity-90 drop-shadow-md">FULL STACK</p>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-[0.85] mb-2 drop-shadow-lg">
                          ENGINEER
                          <br />
                          <span className="text-white/95">& AI DEV</span>
                        </h2>
                      </div>

                      {/* Bottom Notch */}
                      <div className="absolute bottom-0 inset-x-0 h-10 z-30 flex items-center justify-center">
                        <div className="bg-black/20 backdrop-blur-sm px-4 py-1 rounded-t-xl border-t border-white/5">
                          <p className="text-[8px] uppercase tracking-widest opacity-70 font-mono text-white">
                            ©2026, SKILLS NOT REPLACED BY AI (YET)
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Front Tag (Outside overflow-hidden but inside Front Face) */}
                    <div className="absolute -top-1 -right-1 w-[42%] h-16 bg-neutral-900 rounded-bl-[2.5rem] z-20 flex items-center justify-center pt-2 pl-4">
                      <span className="text-white/80 text-[10px] font-bold tracking-widest">
                        (PORTFOLIO)
                      </span>
                    </div>


                  </div>

                  {/* --- BACK FACE --- */}
                  <div className="absolute inset-0 w-full h-full" style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", zIndex: 10 }}>
                    <div className="relative w-full h-full bg-black rounded-[20px] overflow-hidden flex items-center justify-center border border-white/10">



                      {/* Watermark Text */}
                      <span className="text-[8rem] font-black text-white/5 select-none absolute z-0 scale-x-[-1]">
                        SAI
                      </span>

                      {/* Stamp Image */}
                      <div className="relative w-64 h-64 -rotate-12 z-10 flex items-center justify-center opacity-90">
                        <div
                          className="w-full h-full bg-gradient-to-br from-[#ff4d29] to-yellow-400 opacity-90"
                          style={{
                            maskImage: "url(/stamp.png)",
                            WebkitMaskImage: "url(/stamp.png)",
                            maskSize: "contain",
                            WebkitMaskSize: "contain",
                            maskRepeat: "no-repeat",
                            WebkitMaskRepeat: "no-repeat",
                            maskPosition: "center",
                            WebkitMaskPosition: "center"
                          }}
                        />
                        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/90 text-[10px] font-bold tracking-[0.15em] font-mono -rotate-6 whitespace-nowrap">
                          R SAI DHEERAJ
                        </span>
                      </div>
                    </div>

                    {/* Back Tag (Mirrored to Left) */}
                    <div className="absolute -top-1 -left-1 w-[42%] h-16 bg-neutral-900 rounded-br-[2.5rem] z-20" />


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

          <div className="absolute left-1/2 -translate-x-1/2 bottom-0 flex flex-col items-center gap-2 animate-bounce text-neutral-400 font-mono hidden md:flex">
            <span className="text-[10px] tracking-[0.3em]">SCROLL</span>
            <div className="w-[1px] h-12 bg-neutral-500/50" />
          </div>

          <div className="text-right text-neutral-400 font-mono pointer-events-auto">
            <span className="block text-[10px] uppercase tracking-wider mb-0.5 opacity-60">Leveled up by:</span>
            <span className="font-bold text-white text-xs md:text-sm uppercase tracking-widest">HARDWORK</span>
          </div>
        </div>
      </section>

      <section className="relative pt-16 pb-32 md:py-32 px-4 md:px-6 overflow-hidden bg-black">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
          <FloatingPaths position={1} />
          <FloatingPaths position={-1} />
        </div>

        {/* Subtle Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:60px_60px] opacity-20 pointer-events-none z-0" />

        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <TextType
            text={["I’ve been learning how software actually works—beyond the UI—by building projects, writing code, and understanding the logic behind it."]}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter="|"
            loop={false}
            as="h2"
            className="text-3xl md:text-5xl lg:text-7xl font-black text-white tracking-tight leading-[1.05] mb-10 inline-block min-h-[120px]"
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
            className="text-lg md:text-2xl lg:text-3xl font-medium text-white/90 leading-relaxed max-w-4xl mx-auto mb-12 md:mb-0"
          >
            I work on full-stack projects involving features like authentication, data handling, and basic automation, with a focus on building things that work reliably beyond simple demos.
          </motion.p>
        </div>
        <div className="absolute left-6 md:left-12 bottom-10 border border-neutral-700/50 rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-neutral-500 font-mono text-xs md:text-sm pointer-events-auto z-20 backdrop-blur-sm hidden sm:flex">
          02
        </div>

        <div className="absolute left-0 w-full md:w-auto md:left-auto md:right-12 bottom-8 md:bottom-10 z-20 pointer-events-auto flex justify-center md:block px-6 md:px-0">
          <Button
            variant="outline"
            className="w-full md:w-auto rounded-full border-neutral-700/50 bg-black/20 text-neutral-400 backdrop-blur-sm hover:bg-white hover:text-black transition-all duration-300 px-6 py-6 font-mono text-[10px] md:text-xs tracking-widest uppercase"
            onClick={() => setShowAboutPopup(true)}
          >
            EXPLORE SAI DHEERAJ <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </section>

      {/* Tools Grid Section */}
      <HomeToolsSection />

      {/* About Me Popup */}
      <Dialog open={showAboutPopup} onOpenChange={setShowAboutPopup}>
        <DialogContent className="max-w-[95vw] bg-black border-neutral-800 text-white p-0 overflow-hidden !rounded-[2rem] w-[95vw] h-[90vh] [&>button]:hidden">
          <div className="absolute inset-0 z-0">
            <Hyperspeed effectOptions={hyperspeedPresets.three} />
          </div>
          <DialogTitle className="sr-only">Explore Sai Dheeraj</DialogTitle>
          <div className="relative z-10 w-full h-full flex flex-col items-start p-5 md:p-12 overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setShowAboutPopup(false)}
              className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md transition-colors z-50 text-white border border-white/10"
            >
              <span className="sr-only">Close</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
            </button>

            {/* Heading */}
            {/* Heading */}
            <h2 className="text-5xl md:text-7xl font-black mb-12 text-white tracking-tighter leading-none">ABOUT ME</h2>

            {/* Content Container: Photo + Text Side-by-Side */}
            <div className="w-full flex flex-col md:flex-row gap-8 md:gap-16 items-start">

              {/* Left Column: Photo + Button */}
              <div className="flex flex-col gap-6 shrink-0">
                {/* Profile Pic */}
                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-3xl overflow-hidden border-4 border-neutral-800 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-300">
                  <Image
                    src="/about_me_photo_2.jpg"
                    fill
                    className="object-cover object-top"
                    alt="Sai Dheeraj"
                    priority
                  />
                </div>

                {/* Certificates Button */}
                {/* Certificates Button */}
                <Button
                  className="w-full bg-white hover:bg-neutral-200 text-black font-bold tracking-wider py-6 text-lg shadow-lg hover:shadow-white/20 transition-all"
                  onClick={() => setShowCertificatesPopup(true)}
                >
                  <Award className="mr-2 w-5 h-5" />
                  VIEW CERTIFICATES
                </Button>

                <Button
                  className="w-full bg-white hover:bg-neutral-200 text-black font-bold tracking-wider py-6 text-lg shadow-lg hover:shadow-white/20 transition-all border-t border-neutral-300"
                  onClick={() => setShowProjectsPopup(true)}
                >
                  <Layers className="mr-2 w-5 h-5" />
                  VIEW PROJECTS
                </Button>
              </div>

              {/* Bio Text */}
              <div className="flex-1 max-w-2xl">
                <div className="space-y-6 text-neutral-300 text-base md:text-lg leading-relaxed font-light">
                  <p>
                    I&apos;m a <span className="text-white font-medium">Computer Science undergraduate</span> who builds software that has to survive real-world conditions, not just work in perfect demos.
                  </p>
                  <p>
                    Since 2024, I&apos;ve been focused on building full-stack and AI-powered systems where data, identity, and automation are tightly connected. I don&apos;t think in screens or features — I think in how data flows, how users are verified, and how systems make decisions.
                  </p>

                  <div>
                    <h3 className="text-white font-bold mb-2 text-lg uppercase tracking-wide">My work includes:</h3>
                    <ul className="list-disc pl-5 space-y-2 marker:text-white">
                      <li>A <strong className="text-white">biometric attendance platform</strong> that uses face recognition, GPS geofencing, and QR validation to prevent fraud and proxy access.</li>
                      <li>An <strong className="text-white">AI-powered commerce and repair-booking platform</strong> that generates instant, realistic price estimates for customers.</li>
                      <li>A <strong className="text-white">multilingual voice pipeline</strong> that converts speech into text and translates it into South Indian languages for accessibility.</li>
                    </ul>
                  </div>

                  <div className="py-4 border-l-4 border-white pl-6 italic text-white/90 bg-white/5 rounded-r-lg my-6">
                    &quot;What ties all of this together is one idea: Software should behave predictably even when the real world is messy.&quot;
                  </div>

                  <div>
                    <h3 className="text-white font-bold mb-2 text-lg uppercase tracking-wide">That’s why I focus on:</h3>
                    <ul className="list-disc pl-5 space-y-2 marker:text-white">
                      <li>Secure authentication and role-based access</li>
                      <li>Real-time validation</li>
                      <li>AI models connected directly to live user data</li>
                      <li>Systems that don&apos;t break when conditions aren&apos;t perfect</li>
                    </ul>
                  </div>

                  <p className="text-white font-medium text-xl md:text-2xl pt-6 border-t border-neutral-800 mt-6">
                    I&apos;m not interested in building pretty demos.<br />
                    <span className="text-white font-black">I&apos;m interested in building systems people can rely on.</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Certificates Popup */}
      <Dialog open={showCertificatesPopup} onOpenChange={(open) => { setShowCertificatesPopup(open); if (!open) setSelectedCertCategory(null); }}>
        <DialogContent className="max-w-4xl bg-neutral-900 border-neutral-800 text-white p-8 md:p-12 !rounded-[2rem] w-full h-auto max-h-[85vh] overflow-y-auto">
          <DialogTitle className="sr-only">Certifications</DialogTitle>
          <div className="flex flex-col items-center">
            <h2 className="text-3xl md:text-5xl font-black mb-8 text-white tracking-tighter uppercase">
              {selectedCertCategory || "Certifications"}
            </h2>

            {!selectedCertCategory ? (
              /* Folder View */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                {Object.keys(certificationsData).map((category) => (
                  <button
                    type="button"
                    key={category}
                    onClick={() => setSelectedCertCategory(category)}
                    className="bg-neutral-800/50 p-8 rounded-2xl flex flex-col items-center justify-center border border-neutral-700/50 hover:border-white/50 hover:bg-neutral-800 transition-all cursor-pointer group gap-4 aspect-square w-full"
                  >
                    <Folder className="w-24 h-24 text-white group-hover:scale-110 transition-transform" />
                    <h3 className="text-xl font-bold text-center">{category}</h3>
                    <p className="text-neutral-500 text-sm">{certificationsData[category as keyof typeof certificationsData].length} Certificates</p>
                  </button>
                ))}
              </div>
            ) : (
              /* Certificates Grid View */
              <div className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full animate-in fade-in zoom-in-95 duration-300">
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {(selectedCertCategory ? certificationsData[selectedCertCategory as keyof typeof certificationsData] : []).map((cert: any, idx: number) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={(e) => { e.stopPropagation(); setSelectedPhoto(cert.img); }}
                      className="bg-neutral-800/50 p-6 rounded-2xl flex flex-col items-center border border-neutral-700/50 hover:border-white/50 transition-colors group cursor-pointer w-full text-left"
                    >
                      <div className="w-full aspect-[4/3] relative mb-4 overflow-hidden rounded-lg pointer-events-none">
                        <Image src={cert.img} fill className="object-contain group-hover:scale-105 transition-transform duration-500" alt={cert.title} />
                      </div>
                      <h3 className="font-bold text-center text-lg leading-tight mb-2 pointer-events-none">{cert.title}</h3>
                      <p className="text-neutral-400 text-sm font-mono text-center pointer-events-none">{cert.issuer}</p>
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedCertCategory(null)}
                  className="mt-8 flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mx-auto"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to Folders
                </button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Photo Gallery Overlay */}
      <Dialog open={showPhotoGallery} onOpenChange={setShowPhotoGallery}>
        <DialogContent className="!fixed !top-0 !left-0 !translate-x-0 !translate-y-0 !w-screen !h-screen !max-w-none !m-0 !p-0 !rounded-none !border-none bg-transparent overflow-hidden flex items-center justify-center z-[100] [&>button]:hidden">
          <DialogHeader className="sr-only">
            <DialogTitle>Photo Gallery</DialogTitle>
            <DialogDescription>Interactive gallery of my personal photos.</DialogDescription>
          </DialogHeader>

          {/* Custom Background Effect */}
          <div className="absolute inset-0 z-0 bg-black" />

          {/* Close Area */}
          <div className="absolute inset-0 z-10" onClick={() => setShowPhotoGallery(false)} />

          <div className="relative w-full max-w-[90vw] h-[90vh] pointer-events-none">

            {/* --- Central Text Block (Sticker Style) --- */}
            {/* --- Decorative Stickers --- */}
            {/* 1. Dumbbells (Bottom Right - Physical) */}
            <motion.div
              initial={{ opacity: 0, scale: 0, rotate: 45 }}
              animate={{ opacity: 1, scale: 1, rotate: 15 }}
              transition={{ duration: 0.6, delay: 0.8, type: "spring" }}
              className="absolute bottom-[20%] right-[25%] md:right-[30%] w-24 h-24 md:w-32 md:h-32 z-40 pointer-events-none opacity-90"
            >
              <Image src="/gallery/sticker1.png" fill className="object-contain drop-shadow-xl" alt="Gym Sticker" />
            </motion.div>

            {/* 2. Laptop Character (Top Right - Mental/Work) */}
            <motion.div
              initial={{ opacity: 0, scale: 0, rotate: -20 }}
              animate={{ opacity: 1, scale: 1, rotate: 10 }}
              transition={{ duration: 0.6, delay: 0.9, type: "spring" }}
              className="absolute top-[18%] right-[20%] md:right-[25%] w-28 h-28 md:w-36 md:h-36 z-40 pointer-events-none opacity-90"
            >
              <Image src="/gallery/sticker2.png" fill className="object-contain drop-shadow-xl" alt="Coding Sticker" />
            </motion.div>

            {/* 3. Rabbit (Top Left - Fun) */}
            <motion.div
              initial={{ opacity: 0, scale: 0, rotate: 20 }}
              animate={{ opacity: 1, scale: 1, rotate: -10 }}
              transition={{ duration: 0.6, delay: 1.0, type: "spring" }}
              className="absolute top-[22%] left-[20%] md:left-[25%] w-20 h-20 md:w-28 md:h-28 z-40 pointer-events-none opacity-90"
            >
              <Image src="/gallery/sticker3.png" fill className="object-contain drop-shadow-xl" alt="Rabbit Sticker" />
            </motion.div>

            {/* --- Central Text Block (Organic Sticker) --- */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: -2 }}
              transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
              className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-auto"
            >
              <div className="relative bg-[#0a0a0a] text-white px-8 py-6 rounded-[2rem] shadow-2xl transform rotate-[-2deg] max-w-xl text-center border border-white/10">
                {/* White Tag attached to top-left */}
                <span className="absolute -top-4 -left-2 bg-white text-black px-3 py-1 rounded-md text-[10px] mobile:text-xs font-bold tracking-widest shadow-md transform -rotate-3">
                  WHEN I&apos;M NOT DEVELOPING
                </span>

                <h2 className="text-2xl md:text-3xl lg:text-4xl font-black leading-tight tracking-tight">
                  I focus on improving myself
                </h2>
                <p className="text-white/60 text-lg md:text-xl font-medium mt-1">
                  — Mentally & Physically —
                </p>
              </div>
            </motion.div>

            {/* --- Social Gradient Sticker (Floating) --- */}
            <motion.div
              initial={{ opacity: 0, y: 20, rotate: 10 }}
              animate={{ opacity: 1, y: 0, rotate: 6 }}
              transition={{ duration: 0.6, delay: 0.6, type: "spring" }}
              className="absolute top-[58%] left-[60%] md:left-[55%] z-[60] pointer-events-auto"
            >
              <Link
                href="https://instagram.com/your.saidheeraj"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white px-6 py-2 rounded-full font-bold text-sm shadow-xl hover:scale-105 transition-transform flex items-center gap-2"
              >
                <Instagram className="w-4 h-4" />
                @your.saidheeraj
              </Link>
            </motion.div>

            {galleryImages.map((img, index) => (
              <motion.div
                key={index}
                initial={img.initial}
                animate={img.animate}
                transition={img.transition}
                whileHover={{ scale: 1.8, zIndex: 100, rotate: 0, filter: "grayscale(0%)" }}
                onClick={(e) => { e.stopPropagation(); setSelectedPhoto(img.src); }}
                style={{ filter: "grayscale(100%)" }} // Default state: Grayscale
                className={`absolute ${img.className.replace('opacity-80', '').replace('hover:opacity-100', '')} bg-white p-2 pb-8 rounded shadow-2xl transition-all duration-300 cursor-pointer pointer-events-auto group hover:z-50`}
              >
                <div className="w-full h-full bg-neutral-200 overflow-hidden relative transition-all duration-300">
                  <Image src={img.src} fill className="object-cover" alt={img.alt} />
                </div>
                {img.showInstagramLink && (
                  <Link href="https://instagram.com/your.saidheeraj" target="_blank" rel="noopener noreferrer" className="absolute -bottom-6 right-0 bg-purple-600 text-white text-[10px] font-bold px-3 py-1 rounded-full rotate-[-6deg] hover:scale-110 transition-transform z-50">
                    @your.saidheeraj
                  </Link>
                )}
              </motion.div>
            ))}

          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showContactPopup} onOpenChange={setShowContactPopup}>
        <DialogContent className="max-w-3xl w-[90vw] max-h-[90vh] bg-neutral-950/90 backdrop-blur-2xl border-neutral-800 text-white p-0 overflow-hidden rounded-[2rem] md:rounded-[2.5rem] shadow-2xl [&>button]:hidden flex flex-col">
          <div className="absolute top-4 right-4 md:top-6 md:right-6 z-50">
            <button
              onClick={() => setShowContactPopup(false)}
              className="p-2 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md transition-colors text-white/70 hover:text-white border border-white/10"
            >
              <span className="sr-only">Close</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
            </button>
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

          <div className="p-6 md:p-14 relative z-10 flex flex-col items-center overflow-y-auto custom-scrollbar">
            <DialogTitle className="text-3xl md:text-5xl font-black mb-4 text-center tracking-tighter uppercase text-white drop-shadow-lg">Let&apos;s Talk</DialogTitle>
            <p className="text-neutral-400 mb-8 md:mb-12 text-center text-sm md:text-lg max-w-lg leading-relaxed">Choose your preferred way to connect. I&apos;m always open to discussing new projects and ideas.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full">
              {/* WhatsApp */}
              <a href="https://wa.me/919493552753" target="_blank" rel="noopener noreferrer"
                className="group relative flex flex-col items-center justify-center p-6 md:p-8 rounded-3xl bg-neutral-900/60 border border-white/5 hover:bg-[#25D366]/10 hover:border-[#25D366]/50 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(37,211,102,0.2)]">
                <div className="w-16 h-16 md:w-20 md:h-20 mb-4 md:mb-6 rounded-full bg-[#25D366]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-inner">
                  <svg viewBox="0 0 24 24" className="w-8 h-8 md:w-10 md:h-10 fill-[#25D366]" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                </div>
                <span className="font-bold text-lg md:text-xl text-white group-hover:text-[#25D366] transition-colors">WhatsApp</span>
                <span className="text-xs md:text-sm text-neutral-500 mt-2 font-mono tracking-wider opacity-60 group-hover:opacity-100 transition-opacity">Chat Now</span>
              </a>

              {/* Phone */}
              <a href="tel:+919908918853"
                className="group relative flex flex-col items-center justify-center p-6 md:p-8 rounded-3xl bg-neutral-900/60 border border-white/5 hover:bg-blue-500/10 hover:border-blue-500/50 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                <div className="w-16 h-16 md:w-20 md:h-20 mb-4 md:mb-6 rounded-full bg-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-inner">
                  <Phone className="w-8 h-8 md:w-10 md:h-10 text-blue-500 fill-current" />
                </div>
                <span className="font-bold text-lg md:text-xl text-white group-hover:text-blue-500 transition-colors">Call Me</span>
                <span className="text-xs md:text-sm text-neutral-500 mt-2 font-mono tracking-wider opacity-60 group-hover:opacity-100 transition-opacity">Personal Line</span>
              </a>

              {/* Email */}
              <a href="mailto:16saidheeraj@gmail.com"
                className="group relative flex flex-col items-center justify-center p-6 md:p-8 rounded-3xl bg-neutral-900/60 border border-white/5 hover:bg-white/10 hover:border-white/50 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                <div className="w-16 h-16 md:w-20 md:h-20 mb-4 md:mb-6 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-inner">
                  <Mail className="w-8 h-8 md:w-10 md:h-10 text-white fill-current" />
                </div>
                <span className="font-bold text-lg md:text-xl text-white group-hover:text-white transition-colors">Email</span>
                <span className="text-xs md:text-sm text-neutral-500 mt-2 font-mono tracking-wider opacity-60 group-hover:opacity-100 transition-opacity">Send Message</span>
              </a>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showProjectsPopup} onOpenChange={setShowProjectsPopup}>
        <DialogContent className="max-w-5xl bg-black border-neutral-800 text-white p-0 overflow-hidden !rounded-[2rem] w-full h-[85vh]">

          <button
            onClick={() => setShowProjectsPopup(false)}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md transition-colors z-50 text-white border border-white/10"
          >
            <span className="sr-only">Close</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
          </button>
          <DialogTitle className="sr-only">Projects</DialogTitle>
          <div className="relative z-10 flex flex-col items-center w-full h-full overflow-y-auto p-8 md:p-12">


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
              {projects.map((project, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedProject(project)}
                  className="text-left bg-neutral-900/90 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 hover:border-white/50 transition-all flex flex-col h-full group w-full shadow-2xl"
                >
                  <div className="h-48 bg-neutral-800 w-full relative">
                    {project.image && !project.image.includes('placeholder') ? (
                      <Image src={project.image} fill className="object-cover group-hover:scale-105 transition-transform duration-500" alt={project.title} />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-neutral-600">
                        <Code className="w-12 h-12 group-hover:text-white transition-colors" />
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col grow">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <span className="text-white text-xs font-bold tracking-wider uppercase mb-1 block">{project.category}</span>
                        <h3 className="text-xl font-bold">{project.title}</h3>
                      </div>
                    </div>
                    <p className="text-neutral-400 text-sm mb-6 grow">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.tags.map((tag: string) => (
                        <span key={tag} className="px-3 py-1 bg-neutral-900 rounded-full text-xs text-neutral-300 font-mono border border-neutral-700">{tag}</span>
                      ))}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Project Details Modal */}
      <Dialog open={selectedProject !== null} onOpenChange={(open) => !open && setSelectedProject(null)}>
        <DialogContent className="max-w-5xl bg-neutral-900 border-neutral-800 text-white p-0 !rounded-[2rem] w-full h-[85vh] overflow-y-auto flex flex-col md:flex-row overflow-hidden">
          <DialogTitle className="sr-only">Project Details</DialogTitle>

          {selectedProject && (
            <>
              {/* Left/Top: Image Gallery (Simplified to Main Image for now) */}
              <div className="w-full md:w-1/2 bg-black/50 p-8 flex flex-col items-center gap-6 relative min-h-[300px] border-b md:border-b-0 md:border-r border-white/10 overflow-y-auto custom-scrollbar">
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 bg-white text-black text-xs font-bold rounded-full uppercase tracking-wider shadow-lg">{selectedProject.category}</span>
                </div>

                {selectedProject.gallery && selectedProject.gallery.length > 0 ? (
                  selectedProject.gallery.map((img: string, i: number) => (
                    <div key={i} className="relative w-full aspect-video rounded-xl overflow-hidden border border-neutral-800 shadow-xl shrink-0">
                      <Image src={img} fill className="object-cover" alt={`${selectedProject.title} screenshot ${i + 1}`} />
                    </div>
                  ))
                ) : (
                  <div className="relative w-full aspect-video border-2 border-dashed border-neutral-700 rounded-xl bg-neutral-800/50 text-neutral-500 flex flex-col items-center justify-center">
                    <Code className="w-16 h-16 mb-4 text-white" />
                    <span className="text-sm font-mono text-white/60">NO PREVIEWS</span>
                  </div>
                )}
              </div>

              {/* Right/Bottom: Content */}
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col overflow-y-auto bg-neutral-900/50 relative">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-6 right-6 p-2 text-neutral-400 hover:text-white transition-colors"
                >
                  <span className="sr-only">Close</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                </button>

                <h2 className="text-3xl md:text-4xl font-black mb-6 text-white leading-tight tracking-tight mt-4">{selectedProject.title}</h2>

                <div className="flex flex-wrap gap-2 mb-8">
                  {selectedProject.tags.map((tag: string) => (
                    <span key={tag} className="px-3 py-1 bg-[#ff4d29]/10 text-[#ff4d29] text-xs font-bold font-mono rounded-md border border-[#ff4d29]/20">{tag}</span>
                  ))}
                </div>

                <div className="prose prose-invert prose-sm mb-10 text-neutral-300">
                  <p className="whitespace-pre-line leading-relaxed text-base">{selectedProject.details || selectedProject.description}</p>
                </div>

                <div className="mt-auto flex flex-col md:flex-row gap-4">
                  <Button className="flex-1 border-white/20 hover:bg-white/10 text-white font-bold h-12" variant="outline" asChild>
                    <a href={selectedProject.links.github} target="_blank" rel="noreferrer">Codebase <Github className="ml-2 w-4 h-4" /></a>
                  </Button>
                  {selectedProject.links.demo && selectedProject.links.demo !== "#" && (
                    <Button className="flex-1 bg-white text-black hover:bg-white/90 font-bold h-12" asChild>
                      <a href={selectedProject.links.demo} target="_blank" rel="noreferrer">Live Demo <ExternalLink className="ml-2 w-4 h-4" /></a>
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
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
      <section id="contact" className="relative py-32 bg-black overflow-hidden flex flex-col items-center justify-center min-h-[60vh]">
        <div className="absolute inset-0 z-0">
          <Hyperspeed effectOptions={hyperspeedPresets.three} />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center space-y-12 text-center px-4">
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">Let&apos;s turn ideas into real-world software</h2>

          <Button onClick={() => setShowContactPopup(true)} className="rounded-full px-12 py-10 text-xl md:text-3xl bg-transparent border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300">
            <span className="flex items-center gap-4">
              Let&apos;s Connect <ArrowRight className="w-6 h-6 md:w-8 md:h-8" />
            </span>
          </Button>


          <p className="max-w-xl text-neutral-400 text-sm md:text-base leading-relaxed mt-12">
            Warning: Exploring my work may result in better ideas and higher standards.
          </p>
        </div>
      </section>
    </div >
  )
}
