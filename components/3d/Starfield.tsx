'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const STAR_COUNT_FAR = 3500;
const STAR_COUNT_NEAR = 1000;

function generateStarPositions(count: number, spread: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = Math.random() * spread + spread * 0.1;
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }
  return positions;
}

function generateStarColors(count: number): Float32Array {
  const colors = new Float32Array(count * 3);
  const palette = [
    [1.0, 1.0, 1.0],
    [0.7, 0.85, 1.0],
    [1.0, 0.9, 0.7],
    [0.6, 0.7, 1.0],
    [1.0, 0.75, 0.8],
  ];
  for (let i = 0; i < count; i++) {
    const c = palette[Math.floor(Math.random() * palette.length)];
    colors[i * 3] = c[0];
    colors[i * 3 + 1] = c[1];
    colors[i * 3 + 2] = c[2];
  }
  return colors;
}

// Far static star layer
function FarStars() {
  const geoRef = useRef<THREE.BufferGeometry>(null!);

  const { positions, colors, sizes } = useMemo(() => {
    const positions = generateStarPositions(STAR_COUNT_FAR, 200);
    const colors = generateStarColors(STAR_COUNT_FAR);
    const sizes = new Float32Array(STAR_COUNT_FAR);
    for (let i = 0; i < STAR_COUNT_FAR; i++) {
      sizes[i] = Math.random() * 1.5 + 0.3;
    }
    return { positions, colors, sizes };
  }, []);

  useFrame((_, delta) => {
    if (geoRef.current) {
      geoRef.current.rotateY(delta * 0.004);
    }
  });

  return (
    <points>
      <bufferGeometry ref={geoRef}>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.4}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

// Near warp-speed particles
function NearStars() {
  const meshRef = useRef<THREE.Points>(null!);
  const geoRef = useRef<THREE.BufferGeometry>(null!);

  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(STAR_COUNT_NEAR * 3);
    const velocities = new Float32Array(STAR_COUNT_NEAR);
    for (let i = 0; i < STAR_COUNT_NEAR; i++) {
      const theta = Math.random() * Math.PI * 2;
      const r = Math.random() * 25 + 5;
      positions[i * 3] = Math.cos(theta) * r;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 2] = Math.random() * 80 - 40;
      velocities[i] = Math.random() * 0.08 + 0.03;
    }
    return { positions, velocities };
  }, []);

  const posRef = useRef(positions.slice());

  useFrame((_, delta) => {
    const pos = posRef.current;
    for (let i = 0; i < STAR_COUNT_NEAR; i++) {
      pos[i * 3 + 2] += velocities[i] * delta * 60;
      if (pos[i * 3 + 2] > 40) {
        pos[i * 3 + 2] = -40;
      }
    }
    if (geoRef.current) {
      geoRef.current.setAttribute(
        'position',
        new THREE.BufferAttribute(pos, 3)
      );
      geoRef.current.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry ref={geoRef}>
        <bufferAttribute attach="attributes-position" args={[posRef.current, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        color="#88ccff"
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export default function Starfield() {
  return (
    <group>
      <FarStars />
      <NearStars />
    </group>
  );
}
