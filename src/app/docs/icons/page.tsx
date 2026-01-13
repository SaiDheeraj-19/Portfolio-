import { Metadata } from "next"
import { Suspense } from "react"
import { Icons } from "@/components/docs/icons"
import { IconsFallback } from "@/components/docs/icons-fallback"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
    title: "Icons - Portfolio",
    description: "Lucide Icons animated with Motion",
}

export default function IconsPage() {
    return (
        <div className="min-h-screen">
            {/* Header */}
            <section className="py-12 lg:py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center mb-8">
                        <Button variant="ghost" size="sm" asChild>
                            <Link href="/">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Portfolio
                            </Link>
                        </Button>
                    </div>

                    <div className="text-center max-w-3xl mx-auto">
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                            Icon <span className="text-primary">Library</span>
                        </h1>
                        <p className="text-xl text-muted-foreground mb-8">
                            Lucide Icons animated with Motion. A comprehensive collection of beautiful, consistent icons that work perfectly with your design system.
                        </p>
                    </div>
                </div>
            </section>

            {/* Icons Grid */}
            <section className="pb-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-card rounded-lg border p-6">
                        <h2 className="text-2xl font-semibold mb-6">Available Icons</h2>
                        <p className="text-muted-foreground mb-8">
                            Browse through our collection of {200}+ icons. Each icon is carefully crafted and animated for a delightful user experience.
                        </p>

                        <Suspense fallback={<IconsFallback />}>
                            <Icons />
                        </Suspense>
                    </div>
                </div>
            </section>

            {/* Usage Guide */}
            <section className="py-20 bg-muted/50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold mb-8 text-center">How to Use</h2>

                        <div className="space-y-8">
                            <div className="bg-card rounded-lg border p-6">
                                <h3 className="text-xl font-semibold mb-4">Installation</h3>
                                <div className="bg-muted rounded-md p-4 font-mono text-sm">
                                    <code>npm install lucide-react</code>
                                </div>
                            </div>

                            <div className="bg-card rounded-lg border p-6">
                                <h3 className="text-xl font-semibold mb-4">Basic Usage</h3>
                                <div className="bg-muted rounded-md p-4 font-mono text-sm">
                                    <pre>{`import { Heart, Star, Home } from "lucide-react"

function Example() {
  return (
    <div className="flex gap-4">
      <Heart className="w-6 h-6" />
      <Star className="w-6 h-6" />
      <Home className="w-6 h-6" />
    </div>
  )
}`}</pre>
                                </div>
                            </div>

                            <div className="bg-card rounded-lg border p-6">
                                <h3 className="text-xl font-semibold mb-4">With Animation</h3>
                                <div className="bg-muted rounded-md p-4 font-mono text-sm">
                                    <pre>{`import { motion } from "framer-motion"
import { Heart } from "lucide-react"

function AnimatedIcon() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <Heart className="w-6 h-6" />
    </motion.div>
  )
}`}</pre>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
