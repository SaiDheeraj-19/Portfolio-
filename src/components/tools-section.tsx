"use client"

import { useEffect, useRef, useState } from "react"
import Matter from "matter-js"

const tools: { name: string; slug: string; color: string }[] = [
    { name: "GitHub", slug: "github", color: "181717" },
    { name: "Terminal", slug: "gnubash", color: "4EAA25" }, // Safe terminal icon
    { name: "MongoDB", slug: "mongodb", color: "47A248" },
    { name: "Express", slug: "express", color: "000000" },
    { name: "React", slug: "react", color: "61DAFB" },
    { name: "Next.js", slug: "nextdotjs", color: "000000" },
    { name: "Node.js", slug: "nodedotjs", color: "339933" },
    { name: "Python", slug: "python", color: "3776AB" },
    { name: "Flutter", slug: "flutter", color: "02569B" },
    { name: "Hugging Face", slug: "huggingface", color: "FFD21E" },
    { name: "APIs", slug: "postman", color: "FF6C37" },
    { name: "Supabase", slug: "supabase", color: "3ECF8E" },
    { name: "OpenAI", slug: "openai", color: "412991" },
    { name: "TypeScript", slug: "typescript", color: "3178C6" },
    { name: "Radix UI", slug: "radixui", color: "161618" },
    { name: "Framer Motion", slug: "framer", color: "0055FF" },
    { name: "ESLint", slug: "eslint", color: "4B32C3" },
    { name: "Gemini", slug: "google", color: "4285F4" },
    { name: "Face Recog", slug: "opencv", color: "5C3EE8" },
]

const iconCache = new Map<string, string>();

export default function ToolsSection() {
    const containerRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const activeToolRef = useRef<HTMLDivElement>(null) // Ref for Fixed Status Display
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    useEffect(() => {
        if (!isMounted || !containerRef.current || !canvasRef.current) return

        let isCurrent = true;

        const container = containerRef.current
        const canvas = canvasRef.current
        let width = container.clientWidth || window.innerWidth || 800
        let height = container.clientHeight || 600

        console.log("ToolsSection Init:", width, height);

        // Module aliases
        const Engine = Matter.Engine,
            Render = Matter.Render,
            Runner = Matter.Runner,
            Bodies = Matter.Bodies,
            Composite = Matter.Composite,
            Mouse = Matter.Mouse,
            MouseConstraint = Matter.MouseConstraint,
            Query = Matter.Query

        // Create an engine
        const engine = Engine.create({
            positionIterations: 20, // Increase precision to prevent tunneling
            velocityIterations: 20
        })
        engine.world.gravity.y = 0.8

        // Create a renderer
        const render = Render.create({
            element: container,
            canvas: canvas,
            engine: engine,
            options: {
                width,
                height,
                background: 'transparent',
                wireframes: false,
                pixelRatio: typeof window !== 'undefined' ? window.devicePixelRatio : 1
            }
        })

        // Create walls - Make them thicker to prevent tunneling
        const wallOptions = {
            isStatic: true,
            render: { visible: false },
            friction: 0.1,
            restitution: 0.8
        }

        const wallThickness = 500; // MUCH Thicker walls to prevent tunneling
        let ground = Bodies.rectangle(width / 2, height + wallThickness / 2, width * 2, wallThickness, wallOptions)
        let leftWall = Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height * 2, wallOptions)
        let rightWall = Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height * 2, wallOptions)
        let ceiling = Bodies.rectangle(width / 2, -wallThickness * 2, width * 2, wallThickness, wallOptions)

        Composite.add(engine.world, [ground, leftWall, rightWall, ceiling])

        // Robust Fetch + Coloring Logic
        const createBodies = async () => {
            const getColoredIconURI = async (slug: string, color: string, name: string): Promise<string> => {
                const cacheKey = `${slug}-${color}`;
                if (iconCache.has(cacheKey)) {
                    return iconCache.get(cacheKey)!;
                }

                const fallback = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24' fill='black'%3E%3Crect x='2' y='2' width='20' height='20' rx='5' ry='5'/%3E%3C/svg%3E";

                // Helper to return and cache
                const resolveWithCache = (uri: string) => {
                    iconCache.set(cacheKey, uri);
                    return uri;
                };

                // Handle Text/Number Bubbles (slug: "text:01")
                if (slug.startsWith("text:")) {
                    const text = slug.split(":")[1];
                    const size = 128; // High res canvas
                    const canvas = document.createElement("canvas");
                    canvas.width = size;
                    canvas.height = size;
                    const ctx = canvas.getContext("2d");
                    if (ctx) {
                        // Draw Black Circle Background
                        ctx.beginPath();
                        ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
                        ctx.fillStyle = '#0a0a0a'; // Dark black/gray
                        ctx.fill();

                        // Draw Border (Gray Stroke)
                        ctx.strokeStyle = '#333333';
                        ctx.lineWidth = 4;
                        ctx.stroke();

                        // Draw Text
                        ctx.fillStyle = '#ffffff';
                        ctx.font = '500 48px Inter, sans-serif';
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';
                        ctx.fillText(text, size / 2, size / 2 + 4); // +4 for visual centering

                        return resolveWithCache(canvas.toDataURL("image/png"));
                    }
                    return fallback;
                }

                // Normal Icon Fetching Logic
                const sources = [
                    `https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/${slug}.svg`,
                    `https://unpkg.com/simple-icons@latest/icons/${slug}.svg`,
                    `https://cdn.simpleicons.org/${slug}`,
                ];

                if (slug === 'visualstudiocode') {
                    sources.unshift(`https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/visual-studio-code.svg`);
                }

                for (const url of sources) {
                    if (!isCurrent) return fallback; // Stop early if unmounted
                    try {
                        const response = await fetch(url);
                        if (response.ok) {
                            let svgText = await response.text();

                            if (svgText.includes("<svg")) {
                                // Inject Color if needed (for branding inside the white bubble)
                                if (!svgText.includes("fill=")) {
                                    svgText = svgText.replace('<svg', `<svg fill="#${color}"`);
                                } else {
                                    // Force override for consistency - usually works for simple-icons
                                    svgText = svgText.replace('<svg', `<svg fill="#${color}"`);
                                }

                                // Create Bubble (Canvas)
                                const svgBase64 = `data:image/svg+xml;base64,${btoa(svgText)}`;

                                return new Promise((resolve) => {
                                    const img = new Image();
                                    img.onload = () => {
                                        const size = 128; // High res canvas
                                        const canvas = document.createElement("canvas");
                                        canvas.width = size;
                                        canvas.height = size;
                                        const ctx = canvas.getContext("2d");
                                        if (ctx) {
                                            // Draw White Circle Background
                                            ctx.beginPath();
                                            ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
                                            ctx.fillStyle = '#ffffff';
                                            ctx.fill();
                                            // Add shadow/border? Maybe subtle?
                                            ctx.strokeStyle = '#e5e5e5';
                                            ctx.lineWidth = 2;
                                            ctx.stroke();

                                            // Draw Icon Centered (60% scale)
                                            const iconSize = size * 0.6;
                                            const offset = (size - iconSize) / 2;
                                            ctx.drawImage(img, offset, offset, iconSize, iconSize);

                                            resolve(resolveWithCache(canvas.toDataURL("image/png")));
                                        } else {
                                            resolve(resolveWithCache(svgBase64)); // Fallback
                                        }
                                    };
                                    img.onerror = () => resolve(fallback);
                                    img.src = svgBase64;
                                });
                            }
                        }
                    } catch (e) {
                        // Next source
                    }
                }

                console.warn(`All fetches failed for ${name} (${slug})`);
                return fallback;
            };

            const processedTools = await Promise.all(tools.map(async tool => {
                const dataURI = await getColoredIconURI(tool.slug, tool.color, tool.name);
                return { ...tool, icon: dataURI, valid: true };
            }));

            if (!isCurrent) return; // Cleanup check

            const bodies = processedTools
                .map((tool) => {
                    const x = Math.random() * (width - 100) + 50
                    const y = Math.random() * (height / 2) // Spawn INSIDE the box (top half)
                    const size = 90 + Math.random() * 30 // BIGGER Bubbles (90-120px diameter)

                    return Bodies.circle(x, y, size / 2, { // Circle radius is size/2
                        restitution: 0.6, // Bouncier
                        friction: 0.05,
                        density: 0.002,
                        render: {
                            sprite: {
                                texture: tool.icon,
                                xScale: (size) / 128, // Scale 128px texture to 'size'
                                yScale: (size) / 128
                            }
                        },
                        label: tool.name
                    })
                });

            if (bodies.length > 0) {
                console.log("Adding bodies:", bodies.length);
                Composite.add(engine.world, bodies)
            } else {
                console.warn("No bodies created");
            }
        };

        createBodies();

        // Mouse Setup with Custom Event Handling for Smart Scroll
        const mouse = Mouse.create(render.canvas)
        render.canvas.style.touchAction = 'pan-y';

        const mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        })
        Composite.add(engine.world, mouseConstraint)

        // Remove default listeners
        const mouseElement = render.canvas;
        const events = ['mousedown', 'mousemove', 'mouseup', 'touchstart', 'touchmove', 'touchend'];
        events.forEach(evt => {
            mouseElement.removeEventListener(evt, (mouse as any)[evt]);
        });
        mouseElement.removeEventListener("mousewheel", (mouse as any).mousewheel);
        mouseElement.removeEventListener("DOMMouseScroll", (mouse as any).mousewheel);
        mouseElement.removeEventListener("wheel", (mouse as any).mousewheel);

        // Smart Logic Handlers
        const handleTouchStart = (e: TouchEvent) => {
            const rect = mouseElement.getBoundingClientRect();
            const touch = e.touches[0];
            const x = touch.clientX - rect.left;
            const y = touch.clientY - rect.top;

            const allBodies = Composite.allBodies(engine.world).filter(b => !b.isStatic);
            const hits = Query.point(allBodies, { x, y });

            if (hits.length > 0) {
                e.preventDefault();
                (mouse as any).mousedown(e);
            }
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (mouse.button !== -1) {
                e.preventDefault();
                (mouse as any).mousemove(e);
            }
        };

        const handleTouchEnd = (e: TouchEvent) => {
            (mouse as any).mouseup(e);
        };

        // Desktop Events (Pass through) with Cursor Logic & Status Update
        const handleMouseDown = (e: MouseEvent) => {
            (mouse as any).mousedown(e);
        };
        const handleMouseMove = (e: MouseEvent) => {
            const rect = mouseElement.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Check hover
            const allBodies = Composite.allBodies(engine.world).filter(b => !b.isStatic);
            const hits = Query.point(allBodies, { x, y });

            if (hits.length > 0) {
                mouseElement.style.cursor = 'grab';
                // Update Status Display
                if (activeToolRef.current) {
                    activeToolRef.current.innerText = hits[0].label;
                    activeToolRef.current.style.opacity = '1';
                    activeToolRef.current.style.transform = 'translateY(0)';
                }
            } else if (mouseConstraint && mouseConstraint.body) {
                mouseElement.style.cursor = 'grabbing';
                // Update Status while dragging
                if (activeToolRef.current) {
                    activeToolRef.current.innerText = mouseConstraint.body.label;
                    activeToolRef.current.style.opacity = '1';
                    activeToolRef.current.style.transform = 'translateY(0)';
                }
            } else {
                mouseElement.style.cursor = 'default';
                // Show Default Status
                if (activeToolRef.current) {
                    activeToolRef.current.innerText = "Technologies I use to build real systems";
                    activeToolRef.current.style.opacity = '0.5';
                    activeToolRef.current.style.transform = 'translateY(0)';
                }
            }

            (mouse as any).mousemove(e);
        };
        const handleMouseUp = (e: MouseEvent) => {
            (mouse as any).mouseup(e);
            mouseElement.style.cursor = 'default';
        };

        mouseElement.addEventListener('touchstart', handleTouchStart as any, { passive: false });
        mouseElement.addEventListener('touchmove', handleTouchMove as any, { passive: false });
        mouseElement.addEventListener('touchend', handleTouchEnd as any);

        mouseElement.addEventListener('mousedown', handleMouseDown as any);
        mouseElement.addEventListener('mousemove', handleMouseMove as any);
        mouseElement.addEventListener('mouseup', handleMouseUp as any);


        // Run
        Render.run(render)
        const runner = Runner.create()
        Runner.run(runner, engine)

        // Resize handler
        const handleResize = () => {
            if (!containerRef.current) return
            const newWidth = containerRef.current.clientWidth
            const newHeight = containerRef.current.clientHeight

            render.canvas.width = newWidth
            render.canvas.height = newHeight
            render.options.width = newWidth
            render.options.height = newHeight

            Composite.remove(engine.world, [ground, leftWall, rightWall, ceiling])

            const wallThickness = 500;
            ground = Bodies.rectangle(newWidth / 2, newHeight + wallThickness / 2, newWidth * 2, wallThickness, wallOptions)
            leftWall = Bodies.rectangle(-wallThickness / 2, newHeight / 2, wallThickness, newHeight * 2, wallOptions)
            rightWall = Bodies.rectangle(newWidth + wallThickness / 2, newHeight / 2, wallThickness, newHeight * 2, wallOptions)
            ceiling = Bodies.rectangle(newWidth / 2, -wallThickness * 2, newWidth * 2, wallThickness, wallOptions)

            Composite.add(engine.world, [ground, leftWall, rightWall, ceiling])
        }

        window.addEventListener('resize', handleResize)

        return () => {
            isCurrent = false;
            window.removeEventListener('resize', handleResize)

            mouseElement.removeEventListener('touchstart', handleTouchStart as any);
            mouseElement.removeEventListener('touchmove', handleTouchMove as any);
            mouseElement.removeEventListener('touchend', handleTouchEnd as any);
            mouseElement.removeEventListener('mousedown', handleMouseDown as any);
            mouseElement.removeEventListener('mousemove', handleMouseMove as any);
            mouseElement.removeEventListener('mouseup', handleMouseUp as any);

            Render.stop(render)
            Runner.stop(runner)
            Composite.clear(engine.world, false)
            Engine.clear(engine)
        }
    }, [isMounted])

    return (
        <section className="py-24 bg-[#F2F2F2] relative overflow-hidden text-black transition-colors duration-500">
            <div className="container mx-auto px-6 text-center mb-10 relative z-10 flex flex-col items-center">
                <p className="text-black font-bold text-sm tracking-widest uppercase mb-4 animate-pulse">Technology Stack</p>
                <h2 className="text-4xl md:text-6xl font-black text-black leading-tight tracking-tight uppercase mb-4">
                    The stack behind my work
                </h2>
                {/* Fixed Tool Display Badge */}
                <div
                    ref={activeToolRef}
                    className="h-10 px-6 flex items-center justify-center bg-black text-white rounded-full text-sm font-bold tracking-widest uppercase transition-all duration-300 opacity-0 transform translate-y-4 shadow-xl"
                >
                    {/* Content injected via ref */}
                </div>
            </div>

            <div ref={containerRef} className="relative w-full h-[600px] overflow-hidden">
                <canvas ref={canvasRef} className="w-full h-full block" style={{ touchAction: 'pan-y' }} />

                {/* Instruction Overlay */}
                <div className="absolute top-6 left-0 w-full text-center pointer-events-none">
                    <span className="text-neutral-500 text-xs font-bold tracking-[0.2em] bg-neutral-100/80 backdrop-blur-md px-4 py-2 rounded-full border border-neutral-200 shadow-sm">
                        SEE WHAT POWERS MY SYSTEMS
                    </span>
                </div>
            </div>

            {/* Decorative numbering or graphic */}
            <div className="absolute left-6 md:left-12 bottom-10 font-bold text-neutral-300 text-6xl md:text-8xl select-none pointer-events-none opacity-20">
                EXPLORE
            </div>

            {/* Page Number 03 Overlay */}
            <div className="absolute left-6 md:left-12 bottom-10 border border-neutral-700/50 rounded-full w-12 h-12 flex items-center justify-center text-neutral-500 font-mono text-sm pointer-events-auto z-20 backdrop-blur-sm">
                03
            </div>

        </section>
    )
}
