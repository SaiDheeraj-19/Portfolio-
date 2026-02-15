"use client"

import { useEffect, useRef, useState } from "react"
import Matter from "matter-js"

import { tools } from "@/data/tools"

interface ToolsSectionProps {
    onReveal?: () => void;
}

interface ToolsSectionProps {
    onReveal?: () => void;
    isExpanded?: boolean;
}

export default function ToolsSection({ onReveal, isExpanded }: ToolsSectionProps) {
    const sceneRef = useRef<HTMLDivElement>(null)
    const activeToolRef = useRef<HTMLDivElement>(null)
    const [isCanvasReady, setIsCanvasReady] = useState(false)

    useEffect(() => {
        // Module aliases
        const Engine = Matter.Engine,
            Render = Matter.Render,
            Runner = Matter.Runner,
            Bodies = Matter.Bodies,
            Composite = Matter.Composite,
            Mouse = Matter.Mouse,
            MouseConstraint = Matter.MouseConstraint,
            Events = Matter.Events,
            Query = Matter.Query,
            Body = Matter.Body

        // Setup
        const container = sceneRef.current
        if (!container) return

        const width = container.clientWidth || window.innerWidth
        const height = container.clientHeight || 600

        // Clear previous content
        container.innerHTML = ''

        // Create engine
        const engine = Engine.create({
            gravity: { x: 0, y: 0.8 }
        })

        // Create renderer
        const render = Render.create({
            element: container,
            engine: engine,
            options: {
                width: width,
                height: height,
                background: 'transparent',
                wireframes: false,
                pixelRatio: window.devicePixelRatio || 1
            }
        })

        // Walls
        const wallThickness = 60
        const ground = Bodies.rectangle(width / 2, height + wallThickness / 2, width * 2, wallThickness, {
            isStatic: true,
            render: { visible: false }
        })
        const leftWall = Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height * 2, {
            isStatic: true,
            render: { visible: false }
        })
        const rightWall = Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height * 2, {
            isStatic: true,
            render: { visible: false }
        })

        Composite.add(engine.world, [ground, leftWall, rightWall])

        // Filter tools to only include what's used in this project
        const projectTools = tools.filter(t =>
            ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Three.js', 'Matter.js', 'GSAP', 'Radix UI', 'Vercel'].includes(t.name)
        );

        // Initial loading of bodies (Rounded Rectangles / Blocks) with Synchronous Textures
        const bodies = projectTools.map(tool => {
            const width = 100; // block width
            const height = 100;
            const x = Math.random() * (container.clientWidth - 100) + 50
            const y = Math.random() * (container.clientHeight / 2) - 50

            // Simple block configuration
            return Bodies.rectangle(x, y, width, height, {
                chamfer: { radius: 10 },
                restitution: 0.5,
                friction: 0.1,
                frictionAir: 0.01,
                density: 0.002,
                render: {
                    fillStyle: '#171717',
                    strokeStyle: '#ffffff',
                    lineWidth: 2
                },
                label: tool.name,
                isStatic: false,
                plugin: {
                    toolData: tool,
                    width: width,
                    height: height
                }
            })
        })

        Composite.add(engine.world, bodies)

        // Fix for synchronous setState warning
        setTimeout(() => {
            setIsCanvasReady(true)
        }, 0)

        // Mouse Control
        const mouse = Mouse.create(render.canvas);

        // CRITICAL: Prevent Matter.js from capturing scroll events
        // @ts-expect-error - Accessing internal event handlers to remove them
        mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
        // @ts-expect-error - Accessing internal event handlers to remove them
        mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);
        // @ts-expect-error - Accessing internal event handlers to remove them
        mouse.element.removeEventListener("wheel", mouse.mousewheel);

        const mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: { visible: false }
            }
        })

        Composite.add(engine.world, mouseConstraint)

        // Cursor Handling
        Events.on(mouseConstraint, 'startdrag', () => { render.canvas.style.cursor = 'grabbing' })
        Events.on(mouseConstraint, 'enddrag', () => { render.canvas.style.cursor = 'grab' })
        // Check if render.canvas exists before adding listener
        if (render.canvas) {
            render.canvas.addEventListener('mouseleave', () => { if (render.canvas) render.canvas.style.cursor = 'default' })
        }

        // Interaction Feedback & Respawn
        Events.on(engine, 'beforeUpdate', () => {
            const allBodies = Composite.allBodies(engine.world)

            // Hover logic
            if (activeToolRef.current) {
                if (mouseConstraint.body) {
                    // Dragging
                    activeToolRef.current.innerText = mouseConstraint.body.label
                    activeToolRef.current.style.opacity = '1'
                } else {
                    // Hovering
                    const hovered = Query.point(allBodies, mouse.position)[0]
                    if (hovered && hovered.label && hovered !== ground && hovered !== leftWall && hovered !== rightWall) {
                        render.canvas.style.cursor = 'pointer'
                        activeToolRef.current.innerText = hovered.label
                        activeToolRef.current.style.opacity = '1'
                    } else {
                        render.canvas.style.cursor = 'default'
                        activeToolRef.current.innerText = "TECHNOLOGIES I USE TO BUILD REAL SYSTEMS"
                        activeToolRef.current.style.opacity = '1'
                    }
                }
            }

            // Respawn logic for fallen bodies
            allBodies.forEach(body => {
                if (body.position.y > container.clientHeight + 100) {
                    Body.setPosition(body, {
                        x: Math.random() * (container.clientWidth - 100) + 50,
                        y: -100
                    })
                    Body.setVelocity(body, { x: 0, y: 0 })
                }
            })
        })

        // Run
        Render.run(render)
        const runner = Runner.create()
        Runner.run(runner, engine)

        // Load Icons Asynchronously for Blocks
        bodies.forEach(body => {
            const tool = body.plugin.toolData
            const w = body.plugin.width || 100
            const h = body.plugin.height || 100

            if (!tool) return

            // URL for icon
            const url = tool.icon || `https://cdn.simpleicons.org/${tool.slug}/ffffff`

            // Just set the texture directly for now to test visibility
            // We use a small image loader to ensure it exists before setting
            const img = new Image()
            img.crossOrigin = "Anonymous"
            img.onload = () => {
                body.render.sprite = {
                    texture: url,
                    xScale: (w * 0.6) / img.width, // Scale icon to 60% of block
                    yScale: (h * 0.6) / img.height
                }
            }
            img.src = url
        })

        // Resize handler
        const handleResize = () => {
            if (!render.canvas) return
            const newWidth = container.clientWidth || window.innerWidth
            const newHeight = container.clientHeight || 600

            render.canvas.width = newWidth
            render.canvas.height = newHeight

            // Re-position walls
            Body.setPosition(ground, { x: newWidth / 2, y: newHeight + wallThickness / 2 })
            Body.setPosition(leftWall, { x: -wallThickness / 2, y: newHeight / 2 })
            Body.setPosition(rightWall, { x: newWidth + wallThickness / 2, y: newHeight / 2 })
        }

        window.addEventListener('resize', handleResize)

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize)
            Render.stop(render)
            Runner.stop(runner)
            if (render.canvas) render.canvas.remove()
            Composite.clear(engine.world, false)
            Engine.clear(engine)
        }
    }, [])

    return (
        <section className="min-h-screen bg-[#F2F2F2] relative overflow-hidden text-black flex flex-col">
            {/* Header / Pills Layout */}
            <div className="absolute top-20 md:top-40 left-0 w-full flex flex-col items-center justify-center z-10 pointer-events-none px-4 text-center">
                <span className="text-sm font-bold tracking-widest uppercase mb-4 text-black animate-pulse">TECHNOLOGY STACK</span>
                <h2 className="text-4xl md:text-7xl font-black text-black mb-8 tracking-tighter">THE STACK BEHIND MY WORK</h2>

                {/* Active Tool Pill (Black) */}
                <div
                    ref={activeToolRef}
                    className="h-12 px-8 flex items-center justify-center bg-neutral-600/90 backdrop-blur-sm text-white rounded-full text-sm font-bold tracking-widest uppercase shadow-xl transition-all duration-200"
                >
                    TECHNOLOGIES I USE TO BUILD REAL SYSTEMS
                </div>

                {/* Sub-Pill (Moved up) */}
                <div className="mt-4 h-10 px-6 flex items-center justify-center bg-white/80 backdrop-blur-md text-neutral-500 rounded-full text-xs md:text-[10px] font-bold tracking-[0.2em] shadow-sm uppercase border border-white/50">
                    See What Powers My Systems
                </div>
            </div>

            {/* Canvas */}
            <div className="flex-1 relative w-full h-full min-h-[600px]">
                <div
                    ref={sceneRef}
                    className="absolute inset-0"
                    style={{ touchAction: 'pan-y' }} // Allows vertical scroll on mobile
                />
                {!isCanvasReady && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <span className="text-neutral-300 font-bold uppercase tracking-widest animate-pulse">
                            Loading Physics...
                        </span>
                    </div>
                )}
            </div>

            <div className="absolute left-6 md:left-12 bottom-10 font-bold text-neutral-300/40 text-6xl md:text-8xl select-none pointer-events-none">
                EXPLORE
            </div>

            {/* Explore / View All Trigger */}
            <div
                className={`absolute left-6 md:left-12 bottom-10 flex items-center gap-4 pointer-events-auto cursor-pointer group transtion-colors duration-300`}
                onClick={onReveal}
            >
                <div className={`border ${isExpanded ? 'bg-black border-black text-white' : 'border-black/20 bg-white/50 text-black'} backdrop-blur-md rounded-full w-12 h-12 flex items-center justify-center font-mono text-sm shadow-sm group-hover:bg-black group-hover:text-white transition-all duration-300`}>
                    {isExpanded ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="m18 15-6-6-6 6" /></svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect width="7" height="7" x="3" y="3" rx="1" /><rect width="7" height="7" x="14" y="3" rx="1" /><rect width="7" height="7" x="14" y="14" rx="1" /><rect width="7" height="7" x="3" y="14" rx="1" /></svg>
                    )}
                </div>
                <span className={`${isExpanded ? 'text-black/60' : 'text-black'} font-bold tracking-widest text-sm group-hover:text-neutral-600 transition-colors duration-300 uppercase`}>
                    {isExpanded ? "Hide Technologies" : "View All Technologies"}
                </span>
            </div>
        </section>
    )
}
