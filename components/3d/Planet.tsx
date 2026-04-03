'use client';

import { useRef, useMemo, useState, useCallback } from 'react';
import { useFrame, ThreeEvent } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { Planet as PlanetConfig } from '@/lib/config/planets';
import { usePortfolioStore } from '@/lib/store';

interface PlanetProps {
  config: PlanetConfig;
}

// Satellite mini-moon for Agent planet
function Satellite({ parentRef }: { parentRef: React.RefObject<THREE.Group | null> }) {
  const ref = useRef<THREE.Mesh>(null!);
  const angle = useRef(Math.random() * Math.PI * 2);

  useFrame((_, delta) => {
    angle.current += delta * 1.2;
    if (ref.current) {
      ref.current.position.x = Math.cos(angle.current) * 1.5;
      ref.current.position.y = Math.sin(angle.current * 0.5) * 0.5;
      ref.current.position.z = Math.sin(angle.current) * 1.5;
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.12, 8, 8]} />
      <meshStandardMaterial color="#aaaaff" emissive="#4444ff" emissiveIntensity={0.8} />
    </mesh>
  );
}

// Grid overlay for Prompt planet
function GridOverlay({ size }: { size: number }) {
  const lineCount = 8;
  const gridLines = useMemo(() => {
    const result: THREE.Line[] = [];
    const mat = new THREE.LineBasicMaterial({ color: '#f7b731', transparent: true, opacity: 0.3 });
    const step = (size * 2) / lineCount;
    for (let i = 0; i <= lineCount; i++) {
      const v = -size + i * step;
      const ptsX = [new THREE.Vector3(v, 0.01, -size), new THREE.Vector3(v, 0.01, size)];
      const ptsZ = [new THREE.Vector3(-size, 0.01, v), new THREE.Vector3(size, 0.01, v)];
      const gX = new THREE.BufferGeometry().setFromPoints(ptsX);
      const gZ = new THREE.BufferGeometry().setFromPoints(ptsZ);
      result.push(new THREE.Line(gX, mat), new THREE.Line(gZ, mat));
    }
    return result;
  }, [size]);

  return (
    <group>
      {gridLines.map((lineObj, i) => (
        <primitive key={i} object={lineObj} />
      ))}
    </group>
  );
}

// Planet label tooltip
function PlanetLabel({ name, subtitle, color, visible }: {
  name: string;
  subtitle: string;
  color: string;
  visible: boolean;
}) {
  if (!visible) return null;
  return (
    <Html center distanceFactor={10} style={{ pointerEvents: 'none' }}>
      <div style={{
        background: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(10px)',
        border: `1px solid ${color}40`,
        borderRadius: 8,
        padding: '8px 14px',
        minWidth: 160,
        textAlign: 'center',
        fontFamily: 'Outfit, sans-serif',
        transform: 'translateY(-80px)',
        boxShadow: `0 0 20px ${color}30`,
      }}>
        <div style={{ color, fontSize: 13, fontWeight: 600, letterSpacing: 1 }}>{name}</div>
        <div style={{ color: '#888', fontSize: 10, marginTop: 2 }}>{subtitle}</div>
      </div>
    </Html>
  );
}

export default function Planet({ config }: PlanetProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const planetRef = useRef<THREE.Mesh>(null!);
  const glowRef = useRef<THREE.Mesh>(null!);
  const angle = useRef(config.orbitOffset);
  const [hovered, setHovered] = useState(false);
  const [scale, setScale] = useState(1);

  const { setHoveredPlanet, setActivePlanet, setParticleMode, activePlanet } = usePortfolioStore();

  const isActive = activePlanet === config.id;

  const targetScale = hovered ? 1.25 : isActive ? 1.15 : 1.0;
  const currentScale = useRef(1.0);

  useFrame((_, delta) => {
    angle.current += delta * config.orbitSpeed * 0.15;

    // Orbital position
    if (groupRef.current) {
      groupRef.current.position.x = Math.cos(angle.current) * config.orbitRadius;
      groupRef.current.position.z = Math.sin(angle.current) * config.orbitRadius;
      groupRef.current.position.y = Math.sin(angle.current * 0.4) * 0.5;
    }

    // Self rotation
    if (planetRef.current) {
      planetRef.current.rotation.y += delta * 0.4;
    }

    // Smooth scale lerp
    currentScale.current += (targetScale - currentScale.current) * 8 * delta;
    if (groupRef.current) {
      groupRef.current.scale.setScalar(currentScale.current);
    }

    // Glow pulse
    if (glowRef.current) {
      const t = Date.now() * 0.001;
      const pulseOpacity = (hovered ? 0.2 : 0.08) + 0.04 * Math.sin(t * 1.5);
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity = pulseOpacity;
    }
  });

  const handlePointerEnter = useCallback((e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHovered(true);
    setHoveredPlanet(config.id as any);
    document.body.style.cursor = 'pointer';
  }, [config.id, setHoveredPlanet]);

  const handlePointerLeave = useCallback((e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHovered(false);
    setHoveredPlanet(null);
    setParticleMode(false);
    document.body.style.cursor = 'none';
  }, [setHoveredPlanet, setParticleMode]);

  const handleClick = useCallback((e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    setActivePlanet(isActive ? null : config.id as any);
  }, [config.id, isActive, setActivePlanet]);

  return (
    <group ref={groupRef}>
      {/* Planet core */}
      <mesh
        ref={planetRef}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onClick={handleClick}
      >
        <sphereGeometry args={[config.size, 32, 32]} />
        <meshStandardMaterial
          color={config.color}
          emissive={config.emissiveColor}
          emissiveIntensity={hovered ? 1.5 : 0.8}
          roughness={0.4}
          metalness={0.3}
        />
      </mesh>

      {/* Glow halo */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[config.size * 2.0, 16, 16]} />
        <meshBasicMaterial
          color={config.glowColor}
          transparent
          opacity={0.08}
          depthWrite={false}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Type-specific visual decorations */}
      {config.type === 'prompt' && (
        <GridOverlay size={config.size * 0.8} />
      )}

      {config.type === 'agent' && (
        <>
          <Satellite parentRef={groupRef} />
          <Satellite parentRef={groupRef} />
        </>
      )}

      {config.type === 'ui' && (
        <mesh rotation={[0, 0, 0]}>
          <ringGeometry args={[config.size * 1.3, config.size * 1.45, 64]} />
          <meshBasicMaterial
            color={config.glowColor}
            transparent
            opacity={0.35}
            depthWrite={false}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      )}

      {config.type === 'python' && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[config.size * 1.2, config.size * 1.3, 6]} />
          <meshBasicMaterial
            color={config.glowColor}
            transparent
            opacity={0.4}
            depthWrite={false}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      )}

      {/* Point light when hovered */}
      {hovered && (
        <pointLight color={config.glowColor} intensity={2} distance={8} decay={2} />
      )}

      {/* Label tooltip */}
      <PlanetLabel
        name={config.name}
        subtitle={config.subtitle}
        color={config.glowColor}
        visible={hovered || isActive}
      />
    </group>
  );
}
