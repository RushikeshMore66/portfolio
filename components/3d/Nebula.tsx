'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface NebulaPlaneProps {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  color: string;
  opacity: number;
  pulseSpeed: number;
  pulseOffset: number;
}

function NebulaPlane({ position, rotation, scale, color, opacity, pulseSpeed, pulseOffset }: NebulaPlaneProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const matRef = useRef<THREE.MeshBasicMaterial>(null!);

  useFrame(({ clock }) => {
    if (matRef.current) {
      const t = clock.elapsedTime * pulseSpeed + pulseOffset;
      matRef.current.opacity = opacity * (0.6 + 0.4 * Math.sin(t));
    }
    if (meshRef.current) {
      meshRef.current.rotation.z += 0.0001;
    }
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <meshBasicMaterial
        ref={matRef}
        color={color}
        transparent
        opacity={opacity}
        depthWrite={false}
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

export default function Nebula() {
  return (
    <group>
      {/* Main deep purple nebula cloud */}
      <NebulaPlane
        position={[0, 0, -80]}
        rotation={[0, 0, 0]}
        scale={[200, 200, 1]}
        color="#2a0a3d"
        opacity={0.35}
        pulseSpeed={0.3}
        pulseOffset={0}
      />
      {/* Blue nebula accent left */}
      <NebulaPlane
        position={[-60, 20, -60]}
        rotation={[0.2, 0.3, 0.1]}
        scale={[120, 80, 1]}
        color="#0a1f3d"
        opacity={0.25}
        pulseSpeed={0.2}
        pulseOffset={1.2}
      />
      {/* Purple nebula accent right */}
      <NebulaPlane
        position={[50, -15, -50]}
        rotation={[-0.1, -0.2, 0.15]}
        scale={[100, 100, 1]}
        color="#1a0533"
        opacity={0.2}
        pulseSpeed={0.25}
        pulseOffset={2.4}
      />
      {/* Cyan accent glow */}
      <NebulaPlane
        position={[30, 30, -40]}
        rotation={[0, 0, 0.3]}
        scale={[80, 50, 1]}
        color="#001428"
        opacity={0.15}
        pulseSpeed={0.4}
        pulseOffset={0.8}
      />
      {/* Warm center glow */}
      <NebulaPlane
        position={[0, 0, -20]}
        rotation={[0, 0, 0]}
        scale={[60, 60, 1]}
        color="#1a0a00"
        opacity={0.1}
        pulseSpeed={0.5}
        pulseOffset={3.1}
      />
    </group>
  );
}
