'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface OrbitalRingProps {
  radius: number;
  color?: string;
  opacity?: number;
  tubeRadius?: number;
  tiltX?: number;
  tiltZ?: number;
  rotateSpeed?: number;
}

export default function OrbitalRing({
  radius,
  color = '#4488ff',
  opacity = 0.2,
  tubeRadius = 0.025,
  tiltX = 0.1,
  tiltZ = 0,
  rotateSpeed = 0.05,
}: OrbitalRingProps) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.z += delta * rotateSpeed * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[Math.PI / 2 + tiltX, 0, tiltZ]}>
      <torusGeometry args={[radius, tubeRadius, 8, 128]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={opacity}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}
