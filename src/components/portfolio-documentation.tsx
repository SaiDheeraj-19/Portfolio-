import React from 'react'

export default function PortfolioDocumentation() {
    return (
        <article className="prose prose-invert prose-lg max-w-4xl mx-auto px-4">
            <div className="border-l-2 border-neutral-800 pl-4 md:pl-8 space-y-12">

                {/* Header */}
                <div className="relative">
                    <span className="absolute -left-[41px] top-1 flex h-5 w-5 items-center justify-center rounded-full bg-neutral-900 ring-4 ring-black">
                        <div className="h-1.5 w-1.5 rounded-full bg-white"></div>
                    </span>
                    <h2 className="text-3xl font-bold text-white tracking-tight mt-0">How I Built This</h2>
                    <p className="text-neutral-400 mt-2 text-xl leading-relaxed">
                        A technical deep dive into the architecture, design decisions, and engineering behind this portfolio.
                    </p>
                </div>

                {/* Introduction */}
                <div className="relative">
                    <span className="absolute -left-[41px] top-2 h-4 w-4 bg-neutral-900 rounded-full border border-neutral-800"></span>
                    <h3 className="text-xl font-bold text-white mb-4">01. Core Stack & Sentiment</h3>
                    <p className="text-neutral-400 leading-relaxed mb-6">
                        I intentionally chose a <strong>closer-to-the-metal stack</strong> to prioritize runtime performance and long-term control, while still maintaining reasonable developer velocity. The goal was to minimize abstraction where it directly impacts rendering, animation, and interactivity.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-lg">
                            <h4 className="text-white font-bold mb-1">OGL (Minimal WebGL)</h4>
                            <p className="text-sm text-neutral-500">Instead of using Three.js (~600kb min+gzip), I used <strong>OGL</strong> to interact directly with the GPU for the homepage shader. This allowed precise control over the render pipeline while keeping the JavaScript bundle lightweight and predictable.</p>
                        </div>
                        <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-lg">
                            <h4 className="text-white font-bold mb-1">Tailwind CSS v4</h4>
                            <p className="text-sm text-neutral-500">I leveraged Tailwind v4&apos;s on-the-fly compilation engine to use arbitrary values (e.g. <code>h-[1px]</code>, <code>rotate-[215deg]</code>) without maintaining separate CSS files. This reduced context switching while preserving design precision.</p>
                        </div>
                        <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-lg">
                            <h4 className="text-white font-bold mb-1">React Server Components</h4>
                            <p className="text-sm text-neutral-500">
                                Using the Next.js 14 App Router, the structural layout is rendered on the server. Static sections of the page ship <strong>no client-side JavaScript</strong>, reducing hydration work and improving time-to-interactive while keeping interactive components isolated.
                            </p>
                        </div>
                        <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-lg">
                            <h4 className="text-white font-bold mb-1">Framer Motion</h4>
                            <p className="text-sm text-neutral-500">Framer Motion handles complex layout transitions using <code>layoutId</code>, automatically managing FLIP-based animations. This enabled fluid grid morphing without writing manual measurement or animation orchestration code.</p>
                        </div>
                    </div>
                </div>

                {/* Section 2: Home Page Engineering */}
                <div className="relative">
                    <span className="absolute -left-[41px] top-2 h-4 w-4 bg-neutral-900 rounded-full border border-neutral-800"></span>
                    <h3 className="text-xl font-bold text-white mb-4">02. Engineering the Home Experience</h3>
                    <p className="text-neutral-400 leading-relaxed mb-4">
                        The homepage focuses on <strong>tactile interaction</strong> rather than decorative animation, aiming to make the UI feel responsive and physical.
                    </p>
                    <ul className="list-disc pl-5 space-y-4 text-neutral-400 mb-6">
                        <li>
                            <strong className="text-white block mb-1">Holographic ID Card:</strong>
                            The ID card uses pointer tracking to calculate rotation transforms in real time, creating a subtle 3D tilt effect. This delivers depth and presence without introducing a full 3D scene graph or additional GPU overhead.
                        </li>
                    </ul>
                </div>

                {/* Section 3: The Tech Stack (Bento + Meteors) */}
                <div className="relative">
                    <span className="absolute -left-[41px] top-2 h-4 w-4 bg-neutral-900 rounded-full border border-neutral-800"></span>
                    <h3 className="text-xl font-bold text-white mb-4">03. Tech Stack Visualization Architecture</h3>
                    <p className="text-neutral-400 leading-relaxed mb-4">
                        The technology stack is presented as a responsive <strong>Bento Grid</strong>, enhanced with a custom <strong>Meteor Particle System</strong> to avoid static presentation.
                    </p>
                    <div className="bg-blue-500/10 border-l-4 border-blue-500 p-4 mb-4">
                        <p className="text-sm text-blue-200">
                            <strong>Engineering Challenge:</strong> Randomized meteor positions caused server–client hydration mismatches during SSR.<br />
                            <strong>Solution:</strong> All non-deterministic logic was isolated inside a <code>useEffect</code> hook. This ensures the server-rendered HTML remains stable, while the client initializes animation only after hydration completes.
                        </p>
                    </div>
                </div>

                {/* Section 4: UX & Navigation Flow */}
                <div className="relative">
                    <span className="absolute -left-[41px] top-2 h-4 w-4 bg-neutral-900 rounded-full border border-neutral-800"></span>
                    <h3 className="text-xl font-bold text-white mb-4">04. UX: Context-Aware Navigation</h3>
                    <p className="text-neutral-400 leading-relaxed mb-6">
                        The <code>/tech-stack</code> route is treated as a <strong>deep-focus environment</strong>.
                    </p>
                    <p className="text-neutral-400 leading-relaxed mb-6">
                        Using <code>usePathname()</code>, the navigation bar conditionally unmounts non-essential links. This is not a visual toggle—DOM elements are fully removed. As a result, screen readers do not announce irrelevant navigation items, improving accessibility and cognitive focus.
                    </p>
                </div>

                {/* Section 5: Polish & Quality Assurance */}
                <div className="relative">
                    <span className="absolute -left-[41px] top-2 h-4 w-4 bg-neutral-900 rounded-full border border-neutral-800"></span>
                    <h3 className="text-xl font-bold text-white mb-4">05. Polish: Type Safety &amp; Performance Hardening</h3>
                    <p className="text-neutral-400 leading-relaxed max-w-prose">
                        The final phase focused on correctness and performance:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-neutral-400 mb-6">
                        <li>Eliminated unsafe <code>any</code> types in the WebGL layer by defining custom OGL TypeScript interfaces</li>
                        <li>Optimized media loading using <code>next/image</code></li>
                        <li>Ensured animations remain at a stable 60fps by offloading heavy computation to the GPU and minimizing main-thread work</li>
                    </ul>
                    <p className="text-neutral-400 leading-relaxed max-w-prose mt-4">
                        The result is a codebase that prioritizes <strong>predictability, performance, and long-term maintainability</strong>.
                    </p>
                </div>
            </div>
        </article>
    )
}
