"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

// Generate random points in a sphere volume
const generatePoints = (count: number) => {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = 10 * Math.cbrt(Math.random());
    const theta = Math.random() * 2 * Math.PI;
    const phi = Math.acos(2 * Math.random() - 1);
    
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }
  return positions;
};

function ParticleSwarm(props: any) {
  const ref = useRef<any>(null);
  
  // Use useMemo to generate points only once
  const sphere = useMemo(() => generatePoints(4000), []);

  useFrame((state, delta) => {
    if (!ref.current) return;
    
    // Rotate the entire swarm slowly
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
    
    // React to mouse slightly
    const mouseX = (state.pointer.x * Math.PI) / 10;
    const mouseY = (state.pointer.y * Math.PI) / 10;
    
    ref.current.rotation.x += (mouseY - ref.current.rotation.x) * 0.02;
    ref.current.rotation.y += (mouseX - ref.current.rotation.y) * 0.02;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#000000"
          size={0.03}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.3}
        />
      </Points>
    </group>
  );
}

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
      <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
        <ParticleSwarm />
      </Canvas>
    </div>
  );
}
