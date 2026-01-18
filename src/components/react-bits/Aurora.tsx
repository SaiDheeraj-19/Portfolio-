import React, { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Color, Triangle } from 'ogl';

interface AuroraProps {
    colorStops?: string[];
    amplitude?: number;
    blend?: number;
    speed?: number;
}

const VERTEX_SHADER = `
    attribute vec2 position;
    attribute vec2 uv;
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = vec4(position, 0.0, 1.0);
    }
`;

const FRAGMENT_SHADER = `
    precision highp float;
    uniform float uTime;
    uniform float uAmplitude;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uColor3;
    uniform float uBlend;
    varying vec2 vUv;

    // Simplex 2D noise
    vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
    float snoise(vec2 v){
        const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy) );
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1;
        i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod(i, 289.0);
        vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
        + i.x + vec3(0.0, i1.x, 1.0 ));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m = m*m ;
        m = m*m ;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
    }

    void main() {
        vec2 uv = vUv;
        
        // Displace UV with noise for weaving effect
        float noiseVal = snoise(vec2(uv.x * 2.0 + uTime * 0.1, uv.y * 2.0 - uTime * 0.2));
        
        // Create aurora-like bands
        float y = uv.y + noiseVal * 0.1 * uAmplitude;
        
        // Band intensity
        float intensity = smoothstep(0.0, 0.5, y) * smoothstep(1.0, 0.5, y);
        intensity += smoothstep(0.0, 0.4, y * 1.5 + noiseVal * 0.2); 
        
        // Color mixing
        // Base mix between color1 and color2
        vec3 c1 = mix(uColor1, uColor2, uv.x + noiseVal * 0.2);
        // Mix result with color3 based on Y
        vec3 finalColor = mix(c1, uColor3, uv.y * 0.8);

        // Alpha / Blend
        // We want black background to be transparent-ish if blend is used, but mostly add color
        // The user wants #000000 -> #ff9300.
        // If we output straight color, we overwrite background. 
        // We should additively blend or just output color.
        
        gl_FragColor = vec4(finalColor * (0.5 + intensity), 1.0);
    }
`;

const Aurora: React.FC<AuroraProps> = ({
    colorStops = ["#000000", "#ff9300", "#ff9300"],
    amplitude = 1.0,
    blend = 0.5,
    speed = 1.0
}) => {
    const ctnRef = useRef<HTMLDivElement>(null);
    const glRef = useRef<Renderer | null>(null);

    useEffect(() => {
        if (!ctnRef.current) return;
        const container = ctnRef.current;

        const renderer = new Renderer({
            width: container.clientWidth,
            height: container.clientHeight,
            alpha: true // Allow transparency
        });
        glRef.current = renderer;
        container.appendChild(renderer.gl.canvas);

        const gl = renderer.gl;
        gl.clearColor(0, 0, 0, 0);

        // Convert hex to vec3
        const hexToVec3 = (hex: string) => {
            const c = new Color(hex);
            return [c.r, c.g, c.b];
        };

        const colors = colorStops.map(hexToVec3);
        // Ensure at least 3 colors
        while (colors.length < 3) colors.push([0, 0, 0]);

        const program = new Program(gl, {
            vertex: VERTEX_SHADER,
            fragment: FRAGMENT_SHADER,
            uniforms: {
                uTime: { value: 0 },
                uAmplitude: { value: amplitude },
                uColor1: { value: colors[0] },
                uColor2: { value: colors[1] },
                uColor3: { value: colors[2] },
                uBlend: { value: blend }
            },
            transparent: true
        });

        const geometry = new Triangle(gl);
        const mesh = new Mesh(gl, { geometry, program });

        let animationId: number;
        const update = (t: number) => {
            animationId = requestAnimationFrame(update);
            program.uniforms.uTime.value = t * 0.001 * speed;
            renderer.render({ scene: mesh });
        };
        animationId = requestAnimationFrame(update);

        const handleResize = () => {
            if (ctnRef.current) {
                renderer.setSize(ctnRef.current.clientWidth, ctnRef.current.clientHeight);
            }
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationId);
            if (container.contains(renderer.gl.canvas)) {
                container.removeChild(renderer.gl.canvas);
            }
        };
    }, [colorStops, amplitude, blend, speed]);

    return <div ref={ctnRef} className="w-full h-full" />;
};

export default Aurora;
