"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, ExternalLink, Github, Linkedin, Mail, Phone, MapPin, Search, Filter, Code, Briefcase, Smartphone, Palette, Database, Instagram, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

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

        // Simulate form submission
        try {
            await new Promise(resolve => setTimeout(resolve, 1000))
            setSubmitStatus("success")
            setFormData({ name: "", email: "", subject: "", message: "" })
        } catch (error) {
            setSubmitStatus("error")
        } finally {
            setIsSubmitting(false)
            setTimeout(() => setSubmitStatus("idle"), 5000)
        }
    }

    const contactInfo = [
        {
            icon: Mail,
            label: "Email",
            value: "16saidheeraj@gmail.com",
            href: "mailto:16saidheeraj@gmail.com"
        },
        {
            icon: Phone,
            label: "Phone",
            value: "+91 9908918853",
            href: "tel:+919908918853"
        },
        {
            icon: Phone,
            label: "WhatsApp",
            value: "+91 9493552753",
            href: "https://wa.me/919493552753"
        },
        {
            icon: MapPin,
            label: "Location",
            value: "India",
            href: "#"
        }
    ]

    const socialLinks = [
        { icon: Github, href: "https://github.com/SaiDheeraj-19", label: "GitHub" },
        { icon: Linkedin, href: "https://www.linkedin.com/in/sai-dheeraj-a1145830b/", label: "LinkedIn" },
        { icon: Instagram, href: "https://www.instagram.com/your.saidheeraj/", label: "Instagram" },
        { icon: Mail, href: "mailto:16saidheeraj@gmail.com", label: "Email" },
    ]

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="py-20 lg:py-32 bg-gradient-to-br from-primary/5 to-secondary/5">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto animate-fade-in">
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                            Get in <span className="text-primary">Touch</span>
                        </h1>
                        <p className="text-xl text-muted-foreground mb-8">
                            Have a project in mind or want to collaborate? I'd love to hear from you.
                            Send me a message and I'll get back to you as soon as possible.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Content */}
            <section className="py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Contact Form */}
                        <div className="lg:col-span-2">
                            <Card className="animate-slide-up">
                                <CardHeader>
                                    <CardTitle className="text-2xl">Send a Message</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label htmlFor="name" className="block text-sm font-medium mb-2">
                                                    Name *
                                                </label>
                                                <Input
                                                    id="name"
                                                    name="name"
                                                    type="text"
                                                    required
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    placeholder="Your Name"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="email" className="block text-sm font-medium mb-2">
                                                    Email *
                                                </label>
                                                <Input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    required
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    placeholder="your@email.com"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="subject" className="block text-sm font-medium mb-2">
                                                Subject *
                                            </label>
                                            <Input
                                                id="subject"
                                                name="subject"
                                                type="text"
                                                required
                                                value={formData.subject}
                                                onChange={handleInputChange}
                                                placeholder="Project Inquiry"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="message" className="block text-sm font-medium mb-2">
                                                Message *
                                            </label>
                                            <Textarea
                                                id="message"
                                                name="message"
                                                required
                                                rows={6}
                                                value={formData.message}
                                                onChange={handleInputChange}
                                                placeholder="Tell me about your project or idea..."
                                            />
                                        </div>

                                        {submitStatus === "success" && (
                                            <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                                                <p className="text-green-800">Thank you for your message! I'll get back to you soon.</p>
                                            </div>
                                        )}

                                        {submitStatus === "error" && (
                                            <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                                                <p className="text-red-800">Something went wrong. Please try again.</p>
                                            </div>
                                        )}

                                        <Button
                                            type="submit"
                                            size="lg"
                                            disabled={isSubmitting}
                                            className="w-full md:w-auto"
                                        >
                                            {isSubmitting ? (
                                                "Sending..."
                                            ) : (
                                                <>
                                                    Send Message
                                                    <Send className="ml-2 h-4 w-4" />
                                                </>
                                            )}
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-8">
                            {/* Contact Details */}
                            <Card className="animate-scale-in">
                                <CardHeader>
                                    <CardTitle className="text-lg">Contact Information</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {contactInfo.map((info) => (
                                        <div key={info.label} className="flex items-center space-x-3">
                                            <info.icon className="w-5 h-5 text-primary flex-shrink-0" />
                                            <div>
                                                <p className="text-sm text-muted-foreground">{info.label}</p>
                                                {info.href.startsWith("#") ? (
                                                    <p className="font-medium">{info.value}</p>
                                                ) : (
                                                    <a
                                                        href={info.href}
                                                        className="font-medium hover:text-primary transition-colors"
                                                    >
                                                        {info.value}
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>

                            {/* Social Links */}
                            <Card className="animate-scale-in">
                                <CardHeader>
                                    <CardTitle className="text-lg">Connect on Social</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {socialLinks.map((social) => (
                                            <a
                                                key={social.label}
                                                href={social.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted transition-colors"
                                            >
                                                <social.icon className="w-5 h-5 text-primary" />
                                                <span className="font-medium">{social.label}</span>
                                            </a>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Response Time */}
                            <Card className="animate-scale-in">
                                <CardHeader>
                                    <CardTitle className="text-lg">Response Time</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3 text-sm text-muted-foreground">
                                        <p>📧 Email: Within 24 hours</p>
                                        <p>💬 Phone: Business hours only</p>
                                        <p>🔄 Weekends: Longer response time</p>
                                        <p className="pt-2 border-t">
                                            I'm currently available for freelance projects and full-time opportunities.
                                            Feel free to reach out to discuss your needs!
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 bg-muted/50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
                        <p className="text-lg text-muted-foreground">
                            Common questions about working together
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {[
                            {
                                question: "What types of projects do you work on?",
                                answer: "I work on a variety of projects including web applications, e-commerce platforms, dashboards, and custom websites. I'm comfortable with both frontend and backend development."
                            },
                            {
                                question: "What is your typical project timeline?",
                                answer: "Project timelines vary depending on complexity. A simple website might take 2-4 weeks, while a complex web application could take 2-6 months. I'll provide a detailed timeline during our initial consultation."
                            },
                            {
                                question: "Do you offer ongoing support?",
                                answer: "Yes! I offer maintenance and support packages for all projects. This includes bug fixes, updates, and new feature development as needed."
                            },
                            {
                                question: "What are your rates?",
                                answer: "My rates vary depending on the project scope and complexity. I offer both project-based pricing and hourly rates. Contact me for a custom quote based on your specific needs."
                            }
                        ].map((faq, index) => (
                            <Card key={index} className="animate-scale-in">
                                <CardHeader>
                                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">{faq.answer}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
