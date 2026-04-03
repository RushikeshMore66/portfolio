'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { SUN_CONFIG } from '@/lib/config/planets';

interface SunProps {
  onClick?: () => void;
}

export default function Sun({ onClick }: SunProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const coreRef = useRef<THREE.Mesh>(null!);
  const halo1Ref = useRef<THREE.Mesh>(null!);
  const halo2Ref = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    
    if (coreRef.current) {
      coreRef.current.rotation.y += 0.003;
      coreRef.current.rotation.z += 0.001;
      const pulse = 1 + 0.06 * Math.sin(t * 1.5);
      coreRef.current.scale.setScalar(pulse);
    }
    
    if (halo1Ref.current) {
      halo1Ref.current.rotation.z -= 0.004;
      const pulseH = 1 + 0.12 * Math.sin(t * 0.8 + 0.5);
      halo1Ref.current.scale.setScalar(pulseH);
      (halo1Ref.current.material as THREE.MeshBasicMaterial).opacity = 0.08 + 0.04 * Math.sin(t * 0.8);
    }

    if (halo2Ref.current) {
      halo2Ref.current.rotation.z += 0.003;
      const pulseH2 = 1 + 0.1 * Math.sin(t * 1.2 + 1);
      halo2Ref.current.scale.setScalar(pulseH2);
      (halo2Ref.current.material as THREE.MeshBasicMaterial).opacity = 0.05 + 0.03 * Math.sin(t * 1.2);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Core sun sphere */}
      <mesh ref={coreRef} onClick={onClick}>
        <sphereGeometry args={[SUN_CONFIG.size, 32, 32]} />
        <meshStandardMaterial
          color={SUN_CONFIG.color}
          emissive={SUN_CONFIG.emissiveColor}
          emissiveIntensity={3.0}
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>

      {/* Inner glow halo */}
      <mesh ref={halo1Ref}>
        <sphereGeometry args={[SUN_CONFIG.size * 2.2, 16, 16]} />
        <meshBasicMaterial
          color={SUN_CONFIG.glowColor}
          transparent
          opacity={0.08}
          depthWrite={false}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Outer glow halo */}
      <mesh ref={halo2Ref}>
        <sphereGeometry args={[SUN_CONFIG.size * 4, 16, 16]} />
        <meshBasicMaterial
          color={SUN_CONFIG.glowColor}
          transparent
          opacity={0.04}
          depthWrite={false}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Point lights for scene illumination */}
      <pointLight color={SUN_CONFIG.glowColor} intensity={4} distance={40} decay={2} />
      <pointLight color="#ffffff" intensity={1} distance={20} decay={2} />
    </group>
  );
}
