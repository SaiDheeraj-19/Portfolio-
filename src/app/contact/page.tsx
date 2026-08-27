"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Github, Linkedin, Mail, Phone, Instagram, Send, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ContactPage() {
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

    return (
        <div className="min-h-screen bg-background pt-24 pb-24 text-foreground selection:bg-primary/20">
            <div className="container mx-auto px-4 md:px-8 max-w-5xl">
                
                {/* Back to Home */}
                <Button variant="ghost" asChild className="mb-12 md:mb-16 -ml-4 hover:bg-transparent hover:text-primary">
                    <Link href="/">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Home
                    </Link>
                </Button>

                {/* Header */}
                <div className="flex flex-col items-center mb-16 md:mb-24 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-6 text-center">Let&apos;s Talk</h1>
                    <p className="text-muted-foreground text-center text-lg md:text-xl max-w-2xl leading-relaxed">
                        I am currently available for freelance projects, consulting, and full-time opportunities. Choose your preferred way to connect below.
                    </p>
                </div>

                {/* The Big Three Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150">
                    {/* WhatsApp */}
                    <a href="https://wa.me/919908918853" target="_blank" rel="noopener noreferrer"
                        className="group relative flex flex-col items-center justify-center p-10 rounded-3xl bg-card border border-border hover:border-[#25D366] transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                        <div className="w-20 h-20 mb-6 rounded-full bg-[#25D366]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <svg viewBox="0 0 24 24" className="w-10 h-10 fill-[#25D366]" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                        </div>
                        <span className="font-bold text-2xl text-foreground group-hover:text-[#25D366] transition-colors">WhatsApp</span>
                        <span className="text-sm text-muted-foreground mt-3 font-mono tracking-wider opacity-60 group-hover:opacity-100 transition-opacity uppercase">Chat Now</span>
                    </a>

                    {/* Phone */}
                    <a href="tel:+919908918853"
                        className="group relative flex flex-col items-center justify-center p-10 rounded-3xl bg-card border border-border hover:border-blue-500 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                        <div className="w-20 h-20 mb-6 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <Phone className="w-10 h-10 text-blue-500 fill-current" />
                        </div>
                        <span className="font-bold text-2xl text-foreground group-hover:text-blue-500 transition-colors">Call Me</span>
                        <span className="text-sm text-muted-foreground mt-3 font-mono tracking-wider opacity-60 group-hover:opacity-100 transition-opacity uppercase">Personal Line</span>
                    </a>

                    {/* Email */}
                    <a href="mailto:16saidheeraj@gmail.com"
                        className="group relative flex flex-col items-center justify-center p-10 rounded-3xl bg-card border border-border hover:border-primary transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                        <div className="w-20 h-20 mb-6 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <Mail className="w-10 h-10 text-primary fill-current" />
                        </div>
                        <span className="font-bold text-2xl text-foreground group-hover:text-primary transition-colors">Email</span>
                        <span className="text-sm text-muted-foreground mt-3 font-mono tracking-wider opacity-60 group-hover:opacity-100 transition-opacity uppercase">Send Message</span>
                    </a>
                </div>

                {/* Main Content Split */}
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
                    
                    {/* Left Column: Form */}
                    <div className="w-full lg:w-2/3">
                        <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-8 pb-4 border-b border-border">Direct Message</h2>
                        
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
                                    <p className="text-[#25D366] font-medium text-lg">Thank you! Your message has been sent successfully.</p>
                                </div>
                            )}

                            {submitStatus === "error" && (
                                <div className="p-6 bg-red-500/10 border border-red-500/30 rounded-2xl animate-in fade-in">
                                    <p className="text-red-500 font-medium text-lg">Something went wrong. Please try again or use direct contact.</p>
                                </div>
                            )}

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
                        </form>
                    </div>

                    {/* Right Column: Social Links */}
                    <div className="w-full lg:w-1/3">
                        <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-8 pb-4 border-b border-border">Social Connectivity</h2>
                        
                        <div className="flex flex-col gap-4">
                            <a href="https://www.linkedin.com/in/sai-dheeraj-r/" target="_blank" rel="noopener noreferrer" 
                               className="flex items-center justify-between p-6 rounded-2xl bg-secondary/30 hover:bg-secondary border border-transparent hover:border-border transition-all duration-300 group">
                                <div className="flex items-center gap-4">
                                    <Linkedin className="w-6 h-6 text-muted-foreground group-hover:text-[#0A66C2] transition-colors" />
                                    <span className="font-bold text-lg">LinkedIn</span>
                                </div>
                                <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0" />
                            </a>
                            
                            <a href="https://github.com/SaiDheeraj-19" target="_blank" rel="noopener noreferrer" 
                               className="flex items-center justify-between p-6 rounded-2xl bg-secondary/30 hover:bg-secondary border border-transparent hover:border-border transition-all duration-300 group">
                                <div className="flex items-center gap-4">
                                    <Github className="w-6 h-6 text-muted-foreground group-hover:text-foreground transition-colors" />
                                    <span className="font-bold text-lg">GitHub</span>
                                </div>
                                <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0" />
                            </a>

                            <a href="https://www.instagram.com/your.saidheeraj/" target="_blank" rel="noopener noreferrer" 
                               className="flex items-center justify-between p-6 rounded-2xl bg-secondary/30 hover:bg-secondary border border-transparent hover:border-border transition-all duration-300 group">
                                <div className="flex items-center gap-4">
                                    <Instagram className="w-6 h-6 text-muted-foreground group-hover:text-[#E1306C] transition-colors" />
                                    <span className="font-bold text-lg">Instagram</span>
                                </div>
                                <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0" />
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
