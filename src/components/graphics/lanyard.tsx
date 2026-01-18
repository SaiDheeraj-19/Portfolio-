 
'use client';
import * as THREE from 'three';
import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Lightformer } from '@react-three/drei';

export default function LanyardComponent({ position = [0, 0, 30], fov = 20, transparent = true }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="lanyard-wrapper w-full h-full">
      <Canvas
        camera={{ position: position as [number, number, number], fov: fov }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ alpha: transparent }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
      >
        <ambientLight intensity={Math.PI / 2} />
        <pointLight position={[10, 10, 10]} intensity={1} />

        <LanyardScene isMobile={isMobile} />

        <Environment blur={0.75}>
          <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={10} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
        </Environment>
      </Canvas>
    </div>
  );
}

function LanyardScene({ isMobile }: { isMobile: boolean }) {
  const cardRef = useRef<THREE.Mesh>(null);
  const lanyardRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    // Card animation
    if (cardRef.current) {
      cardRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      cardRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.05;
    }

    // Lanyard animation
    if (lanyardRef.current) {
      lanyardRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Lanyard String */}
      <mesh ref={lanyardRef} position={[0, 2, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 4, 16]} />
        <meshStandardMaterial color="#ffffff" roughness={0.8} />
      </mesh>

      {/* ID Card */}
      <group ref={cardRef} position={[0, 0, 0]}>
        {/* Card Body */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[3.5, 2.2, 0.1]} />
          <meshPhysicalMaterial
            color="#1e40af"
            roughness={0.3}
            metalness={0.7}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </mesh>

        {/* Card Border */}
        <mesh position={[0, 0, 0.06]} castShadow receiveShadow>
          <boxGeometry args={[3.4, 2.1, 0.05]} />
          <meshStandardMaterial color="#3b82f6" roughness={0.5} />
        </mesh>

        {/* Profile Picture Area */}
        <mesh position={[-1.2, 0.3, 0.08]}>
          <boxGeometry args={[1, 1.2, 0.02]} />
          <meshStandardMaterial color="#f3f4f6" />
        </mesh>

        {/* Text Areas */}
        <mesh position={[0.5, 0.3, 0.08]}>
          <boxGeometry args={[1.5, 0.3, 0.02]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>

        <mesh position={[0.5, -0.1, 0.08]}>
          <boxGeometry args={[1.5, 0.2, 0.02]} />
          <meshStandardMaterial color="#e5e7eb" />
        </mesh>

        <mesh position={[0.5, -0.5, 0.08]}>
          <boxGeometry args={[1.5, 0.15, 0.02]} />
          <meshStandardMaterial color="#d1d5db" />
        </mesh>

        {/* Card Hole */}
        <mesh position={[1.5, 0.8, 0.08]}>
          <cylinderGeometry args={[0.15, 0.15, 0.2, 16]} />
          <meshStandardMaterial color="#1f2937" />
        </mesh>
      </group>

      {/* Lanyard Clip */}
      <mesh position={[0, 3.8, 0]}>
        <boxGeometry args={[0.8, 0.4, 0.3]} />
        <meshStandardMaterial color="#374151" roughness={0.6} />
      </mesh>
    </group>
  );
}