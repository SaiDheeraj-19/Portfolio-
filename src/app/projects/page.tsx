"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, ExternalLink, Github, Filter, Search, Code, Briefcase, Smartphone, Palette, Database } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const projects = [
    {
        id: 1,
        title: "E-Commerce Platform",
        description: "A modern e-commerce platform with real-time inventory management, secure payment processing, and responsive design. Built with scalability and performance in mind.",
        image: "🛍️",
        technologies: ["React", "Node.js", "MongoDB", "Stripe", "Tailwind CSS"],
        category: "Full Stack",
        liveUrl: "#",
        githubUrl: "https://github.com/SaiDheeraj-19",
        featured: true,
        highlights: ["Real-time inventory", "Secure payments", "Responsive design"]
    },
    {
        id: 2,
        title: "Task Management Dashboard",
        description: "Collaborative task management tool with drag-and-drop functionality, real-time updates, and team collaboration features. Includes analytics and reporting.",
        image: "📊",
        technologies: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Socket.io"],
        category: "Web App",
        liveUrl: "#",
        githubUrl: "https://github.com/SaiDheeraj-19",
        featured: true,
        highlights: ["Drag & drop", "Real-time sync", "Analytics dashboard"]
    },
    {
        id: 3,
        title: "Weather App",
        description: "Beautiful weather application with location-based forecasts, interactive maps, and detailed weather analytics. Features dark mode and notifications.",
        image: "🌤️",
        technologies: ["React Native", "TypeScript", "OpenWeather API", "Redux"],
        category: "Mobile",
        liveUrl: "#",
        githubUrl: "https://github.com/SaiDheeraj-19",
        featured: false,
        highlights: ["Location-based", "Interactive maps", "Push notifications"]
    },
    {
        id: 4,
        title: "Portfolio Website",
        description: "Personal portfolio website showcasing projects and skills with smooth animations, responsive design, and optimized performance.",
        image: "🎨",
        technologies: ["Next.js", "Tailwind CSS", "Framer Motion", "TypeScript"],
        category: "Design",
        liveUrl: "#",
        githubUrl: "https://github.com/SaiDheeraj-19",
        featured: true,
        highlights: ["Smooth animations", "Optimized performance", "Responsive design"]
    },
    {
        id: 5,
        title: "Social Media Analytics",
        description: "Analytics dashboard for social media metrics with data visualization, export features, and automated reporting capabilities.",
        image: "📈",
        technologies: ["Vue.js", "D3.js", "Express", "MySQL", "Chart.js"],
        category: "Data",
        liveUrl: "#",
        githubUrl: "https://github.com/SaiDheeraj-19",
        featured: false,
        highlights: ["Data visualization", "Export features", "Automated reports"]
    },
    {
        id: 6,
        title: "Chat Application",
        description: "Real-time messaging application with end-to-end encryption, file sharing, voice/video calls, and group chat functionality.",
        image: "💬",
        technologies: ["React", "WebRTC", "Socket.io", "Node.js", "JWT"],
        category: "Web App",
        liveUrl: "#",
        githubUrl: "https://github.com/SaiDheeraj-19",
        featured: false,
        highlights: ["End-to-end encryption", "File sharing", "Video calls"]
    }
]

const categories = ["All", "Full Stack", "Web App", "Mobile", "Design", "Data"]

const getCategoryIcon = (category: string) => {
    switch (category) {
        case "Full Stack": return <Code className="w-4 h-4" />
        case "Web App": return <Briefcase className="w-4 h-4" />
        case "Mobile": return <Smartphone className="w-4 h-4" />
        case "Design": return <Palette className="w-4 h-4" />
        case "Data": return <Database className="w-4 h-4" />
        default: return <Code className="w-4 h-4" />
    }
}

export default function ProjectsPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("All")

    const filteredProjects = projects.filter((project) => {
        const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.description.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = selectedCategory === "All" || project.category === selectedCategory
        return matchesSearch && matchesCategory
    })

    const featuredProjects = projects.filter((project) => project.featured)

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="py-20 lg:py-32 bg-gradient-to-br from-primary/5 to-secondary/5">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto animate-fade-in">
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                            My <span className="text-primary">Projects</span>
                        </h1>
                        <p className="text-xl text-muted-foreground mb-8">
                            A collection of my work showcasing web development, design, and problem-solving skills.
                            Each project represents a unique challenge and learning experience.
                        </p>

                        {/* Search Bar */}
                        <div className="relative max-w-md mx-auto mb-8">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input
                                placeholder="Search projects..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Projects Bento Grid */}
            {selectedCategory === "All" && !searchTerm && featuredProjects.length > 0 && (
                <section className="py-20">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
                            <p className="text-lg text-muted-foreground">
                                Highlighted work showcasing my best capabilities
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">
                            {featuredProjects.map((project, index) => (
                                <div
                                    key={project.id}
                                    className={`${index === 0 ? 'md:col-span-2 lg:col-span-2' : ''} animate-scale-in`}
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <Card className="h-full group hover:shadow-xl transition-all duration-300 overflow-hidden">
                                        <CardContent className="p-0 h-full">
                                            <div className="relative h-full">
                                                {/* Project Image */}
                                                <div className={`h-48 ${index === 0 ? 'md:h-64' : ''} bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center`}>
                                                    <span className="text-6xl opacity-20">{project.image}</span>
                                                </div>

                                                {/* Content */}
                                                <div className="p-6">
                                                    <div className="flex items-center justify-between mb-3">
                                                        <h3 className="text-xl font-semibold">{project.title}</h3>
                                                        <div className="flex items-center text-sm text-muted-foreground">
                                                            {getCategoryIcon(project.category)}
                                                            <span className="ml-1">{project.category}</span>
                                                        </div>
                                                    </div>

                                                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                                                        {project.description}
                                                    </p>

                                                    {/* Highlights */}
                                                    <div className="flex flex-wrap gap-2 mb-4">
                                                        {project.highlights?.slice(0, 2).map((highlight) => (
                                                            <span
                                                                key={highlight}
                                                                className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs"
                                                            >
                                                                {highlight}
                                                            </span>
                                                        ))}
                                                    </div>

                                                    {/* Technologies */}
                                                    <div className="flex flex-wrap gap-1 mb-4">
                                                        {project.technologies.slice(0, 3).map((tech) => (
                                                            <span
                                                                key={tech}
                                                                className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs"
                                                            >
                                                                {tech}
                                                            </span>
                                                        ))}
                                                    </div>

                                                    {/* Actions */}
                                                    <div className="flex gap-2">
                                                        <Button size="sm" variant="outline" asChild className="flex-1">
                                                            <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                                                <Github className="h-3 w-3 mr-1" />
                                                                Code
                                                            </Link>
                                                        </Button>
                                                        <Button size="sm" asChild className="flex-1">
                                                            <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                                                <ExternalLink className="h-3 w-3 mr-1" />
                                                                Live
                                                            </Link>
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* All Projects Bento Grid */}
            <section className="py-20 bg-muted/50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            {searchTerm ? "Search Results" : "All Projects"}
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            {searchTerm ? `Found ${filteredProjects.length} project(s)` : "Complete project portfolio"}
                        </p>
                    </div>

                    {/* Category Tabs */}
                    <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-12">
                        <TabsList className="grid w-full grid-cols-3 md:grid-cols-6">
                            {categories.map((category) => (
                                <TabsTrigger key={category} value={category} className="capitalize">
                                    {category}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </Tabs>

                    {/* Projects Grid */}
                    {filteredProjects.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[280px]">
                            {filteredProjects.map((project, index) => (
                                <div
                                    key={project.id}
                                    className="animate-scale-in"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <Card className="h-full group hover:shadow-lg transition-all duration-300 overflow-hidden">
                                        <CardContent className="p-0 h-full">
                                            <div className="relative h-full">
                                                {/* Project Image */}
                                                <div className="h-40 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                                                    <span className="text-5xl opacity-20">{project.image}</span>
                                                </div>

                                                {/* Content */}
                                                <div className="p-4">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <h3 className="font-semibold">{project.title}</h3>
                                                        <div className="flex items-center text-xs text-muted-foreground">
                                                            {getCategoryIcon(project.category)}
                                                        </div>
                                                    </div>

                                                    <p className="text-muted-foreground text-xs mb-3 line-clamp-2">
                                                        {project.description}
                                                    </p>

                                                    {/* Technologies */}
                                                    <div className="flex flex-wrap gap-1 mb-3">
                                                        {project.technologies.slice(0, 2).map((tech) => (
                                                            <span
                                                                key={tech}
                                                                className="px-1 py-0.5 bg-muted text-muted-foreground rounded text-xs"
                                                            >
                                                                {tech}
                                                            </span>
                                                        ))}
                                                        {project.technologies.length > 2 && (
                                                            <span className="px-1 py-0.5 bg-muted text-muted-foreground rounded text-xs">
                                                                +{project.technologies.length - 2}
                                                            </span>
                                                        )}
                                                    </div>

                                                    {/* Actions */}
                                                    <div className="flex gap-2">
                                                        <Button size="sm" variant="outline" asChild className="flex-1 text-xs">
                                                            <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                                                <Github className="h-3 w-3 mr-1" />
                                                                Code
                                                            </Link>
                                                        </Button>
                                                        <Button size="sm" asChild className="flex-1 text-xs">
                                                            <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                                                <ExternalLink className="h-3 w-3 mr-1" />
                                                                Live
                                                            </Link>
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-muted-foreground text-lg">
                                No projects found matching your criteria.
                            </p>
                            <Button variant="outline" className="mt-4" onClick={() => {
                                setSearchTerm("")
                                setSelectedCategory("All")
                            }}>
                                Clear filters
                            </Button>
                        </div>
                    )}
                </div>
            </section>
        </div>
    )
}
