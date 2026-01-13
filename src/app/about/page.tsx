"use client"

import Link from "next/link"
import { GraduationCap, Briefcase, Award, Code, Palette, Users, ArrowRight, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const experiences = [
    {
        title: "Full Stack Developer",
        company: "Tech Company",
        period: "2022 - Present",
        description: "Leading development of scalable web applications using modern technologies. Collaborating with cross-functional teams to deliver high-quality solutions.",
        achievements: [
            "Increased application performance by 40%",
            "Led a team of 5 developers",
            "Implemented CI/CD pipelines"
        ]
    },
    {
        title: "Frontend Developer",
        company: "Digital Agency",
        period: "2020 - 2022",
        description: "Developed responsive and interactive user interfaces for various client projects. Focused on creating exceptional user experiences.",
        achievements: [
            "Built 15+ client websites",
            "Improved accessibility scores by 30%",
            "Reduced page load times by 50%"
        ]
    },
    {
        title: "Junior Developer",
        company: "Startup Inc",
        period: "2019 - 2020",
        description: "Started my professional journey learning best practices and contributing to various projects in an agile environment.",
        achievements: [
            "Learned React and TypeScript",
            "Contributed to 10+ features",
            "Participated in code reviews"
        ]
    }
]

const education = [
    {
        degree: "Bachelor of Computer Science",
        school: "University Name",
        period: "2015 - 2019",
        description: "Graduated with honors. Specialized in Software Engineering and Web Technologies.",
        achievements: ["GPA: 3.8/4.0", "Dean's List", "Computer Science Club President"]
    }
]

const skills = {
    "Frontend": ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vue.js", "HTML5", "CSS3", "JavaScript"],
    "Backend": ["Node.js", "Express", "Python", "PostgreSQL", "MongoDB", "REST APIs", "GraphQL"],
    "Tools": ["Git", "Docker", "AWS", "Figma", "VS Code", "Webpack", "Jest", "Cypress"],
    "Design": ["UI/UX Design", "Figma", "Adobe XD", "Responsive Design", "Wireframing", "Prototyping"]
}

const certifications = [
    {
        name: "Oracle Certified Foundations Associate",
        title: "Oracle Cloud Infrastructure AI Foundations",
        issuer: "Oracle",
        date: "2025",
        image: "/certifications/oracle_ai_foundations.png",
        credentialId: "OCI-AI-2025"
    }
]

export default function AboutPage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="py-20 lg:py-32 bg-gradient-to-br from-primary/5 to-secondary/5">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto animate-fade-in">
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                            About <span className="text-primary">Me</span>
                        </h1>
                        <p className="text-xl text-muted-foreground mb-8">
                            Passionate developer and designer with a love for creating beautiful, functional digital experiences.
                            I believe in the power of technology to solve real-world problems and make life better.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" asChild>
                                <Link href="/contact">
                                    Get in Touch
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                            <Button variant="outline" size="lg">
                                <Download className="mr-2 h-4 w-4" />
                                Download Resume
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Content */}
            <section className="py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-12">
                            {/* Story */}
                            <div className="max-w-3xl">
                                <h2 className="text-3xl font-bold mb-6">About Me</h2>
                                <div className="prose prose-muted dark:prose-invert max-w-none">
                                    <p className="text-lg text-muted-foreground mb-6">
                                        Full Stack Developer | Generative AI Specialist (Oracle, Google, NVIDIA Certified) | BTech CSE @ GPCET | Building AI-Powered User Experiences
                                    </p>
                                    <p>
                                        I specialize in creating cutting-edge web applications that leverage the power of Generative AI to deliver exceptional user experiences. With certifications from industry leaders like Oracle, Google, and NVIDIA, I bring a unique blend of full stack development expertise and AI/ML capabilities to every project.
                                    </p>
                                    <p>
                                        My approach combines modern web technologies with artificial intelligence to build intelligent, responsive, and user-centric applications. I'm passionate about pushing the boundaries of what's possible at the intersection of AI and full stack development.
                                    </p>
                                </div>
                            </div>

                            {/* Experience & Education */}
                            <Tabs defaultValue="about" className="animate-slide-up">
                                <TabsList className="grid w-full grid-cols-2">
                                    <TabsTrigger value="about">About</TabsTrigger>
                                    <TabsTrigger value="certifications">Certifications</TabsTrigger>
                                </TabsList>

                                <TabsContent value="about" className="space-y-6">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-xl">Open for Work & Freelancing</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-muted-foreground mb-4">
                                                I'm currently available for freelance projects and full-time opportunities.
                                                With expertise in modern web technologies, I can help bring your ideas to life.
                                            </p>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                                <div>
                                                    <h4 className="font-medium mb-2">Services Offered</h4>
                                                    <ul className="space-y-1 text-sm text-muted-foreground">
                                                        <li>• Full Stack Web Development</li>
                                                        <li>• UI/UX Design</li>
                                                        <li>• API Development</li>
                                                        <li>• Performance Optimization</li>
                                                    </ul>
                                                </div>
                                                <div>
                                                    <h4 className="font-medium mb-2">Availability</h4>
                                                    <ul className="space-y-1 text-sm text-muted-foreground">
                                                        <li>• Freelance Projects</li>
                                                        <li>• Full-time Positions</li>
                                                        <li>• Consulting</li>
                                                        <li>• Quick Response Time</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <Button asChild className="w-full md:w-auto">
                                                <Link href="/contact">Get in Touch</Link>
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </TabsContent>

                                <TabsContent value="certifications" className="space-y-6">
                                    {certifications.map((cert, index) => (
                                        <Card key={index}>
                                            <CardContent className="p-6">
                                                <div className="flex flex-col md:flex-row gap-6 items-center">
                                                    <div className="w-32 h-32 flex-shrink-0">
                                                        <img
                                                            src={cert.image}
                                                            alt={cert.name}
                                                            className="w-full h-full object-contain rounded-lg"
                                                        />
                                                    </div>
                                                    <div className="flex-1 text-center md:text-left">
                                                        <h3 className="text-xl font-semibold mb-2">{cert.name}</h3>
                                                        <h4 className="text-lg text-primary font-medium mb-2">{cert.title}</h4>
                                                        <p className="text-muted-foreground mb-1">Issued by: {cert.issuer}</p>
                                                        <p className="text-muted-foreground mb-1">Valid until: {cert.date}</p>
                                                        <p className="text-sm text-muted-foreground">Credential ID: {cert.credentialId}</p>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </TabsContent>
                            </Tabs>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-8">
                            {/* Profile Photo */}
                            <Card className="animate-scale-in">
                                <CardContent className="p-6">
                                    <div className="w-full h-48 rounded-lg overflow-hidden mb-4">
                                        <img
                                            src="/IMG_6380.png"
                                            alt="Sai Dheeraj"
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f3f4f6'/%3E%3Ctext x='50' y='50' font-family='Arial' font-size='14' fill='%236b7280' text-anchor='middle' dy='.3em'%3E👨‍💻%3C/text%3E%3C/svg%3E";
                                            }}
                                        />
                                    </div>
                                    <div className="text-center">
                                        <h3 className="text-xl font-semibold">Sai Dheeraj</h3>
                                        <p className="text-muted-foreground">Full Stack Developer</p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Quick Stats */}
                            <Card className="animate-scale-in">
                                <CardHeader>
                                    <CardTitle className="text-lg">Quick Stats</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <Code className="w-5 h-5 text-primary mr-3" />
                                            <span className="text-sm">Projects</span>
                                        </div>
                                        <span className="font-semibold">50+ Completed</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <Users className="w-5 h-5 text-primary mr-3" />
                                            <span className="text-sm">Clients</span>
                                        </div>
                                        <span className="font-semibold">30+ Happy</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <Award className="w-5 h-5 text-primary mr-3" />
                                            <span className="text-sm">Awards</span>
                                        </div>
                                        <span className="font-semibold">5+ Won</span>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Skills */}
                            <Card className="animate-scale-in">
                                <CardHeader>
                                    <CardTitle className="text-lg">Core Skills</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-6">
                                        {Object.entries(skills).map(([category, skillList]) => (
                                            <div key={category}>
                                                <h4 className="font-medium mb-2 text-sm">{category}</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {skillList.map((skill) => (
                                                        <span
                                                            key={skill}
                                                            className="px-2 py-1 bg-muted text-muted-foreground rounded-md text-xs"
                                                        >
                                                            {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Interests */}
                            <Card className="animate-scale-in">
                                <CardHeader>
                                    <CardTitle className="text-lg">Interests</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-wrap gap-2">
                                        {["Web Development", "UI/UX Design", "Open Source", "Machine Learning", "Photography", "Travel"].map((interest) => (
                                            <span
                                                key={interest}
                                                className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                                            >
                                                {interest}
                                            </span>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
