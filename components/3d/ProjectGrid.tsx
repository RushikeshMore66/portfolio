'use client';

import { useRef, useState, useCallback } from 'react';
import { useFrame, ThreeEvent } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { PROJECTS, Project } from '@/lib/config/projects';
import { usePortfolioStore } from '@/lib/store';

interface ProjectBubbleProps {
  project: Project;
  position: [number, number, number];
  index: number;
}

function ProjectBubble({ project, position, index }: ProjectBubbleProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const glowRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);
  const { openProjectModal } = usePortfolioStore();
  const floatOffset = index * 0.8;

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(t * 0.8 + floatOffset) * 0.3;
      meshRef.current.rotation.y += 0.005;
    }
    if (glowRef.current) {
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity =
        (hovered ? 0.25 : 0.1) + 0.05 * Math.sin(t * 1.5 + floatOffset);
    }
  });

  const colorMap: Record<string, string> = {
    agent: '#9b5de5',
    python: '#00d4ff',
    prompt: '#f7b731',
    ui: '#f72585',
  };
  const color = colorMap[project.category] || '#ffffff';

  return (
    <group position={position}>
      {/* Bubble sphere */}
      <mesh
        ref={meshRef}
        onPointerEnter={(e: ThreeEvent<PointerEvent>) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerLeave={(e: ThreeEvent<PointerEvent>) => {
          e.stopPropagation();
          setHovered(false);
          document.body.style.cursor = 'none';
        }}
        onClick={(e: ThreeEvent<MouseEvent>) => {
          e.stopPropagation();
          openProjectModal(project.id);
        }}
        scale={hovered ? 1.2 : 1}
      >
        <sphereGeometry args={[0.7, 24, 24]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 0.8 : 0.3}
          metalness={0.5}
          roughness={0.2}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Glow */}
      <mesh ref={glowRef} scale={2.2}>
        <sphereGeometry args={[0.7, 12, 12]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.1}
          depthWrite={false}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Label */}
      {hovered && (
        <Html center distanceFactor={8} style={{ pointerEvents: 'none' }}>
          <div style={{
            background: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(15px)',
            border: `1px solid ${color}50`,
            borderRadius: 8,
            padding: '8px 14px',
            width: 160,
            textAlign: 'center',
            fontFamily: 'Outfit, sans-serif',
            transform: 'translateY(-100px)',
            boxShadow: `0 0 25px ${color}40`,
          }}>
            <div style={{ fontSize: 20, marginBottom: 4 }}>{project.icon}</div>
            <div style={{ color, fontSize: 11, fontWeight: 700, letterSpacing: 0.5 }}>{project.title}</div>
            <div style={{ color: '#999', fontSize: 9, marginTop: 2, lineHeight: 1.4 }}>
              {project.tech.slice(0, 3).join(' · ')}
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}

export default function ProjectGrid() {
  const projects = PROJECTS;

  // Arrange in a 3D grid pattern
  const positions: [number, number, number][] = projects.map((_, i) => {
    const cols = 3;
    const col = i % cols;
    const row = Math.floor(i / cols);
    return [
      (col - 1) * 3.5,
      0,
      row * -3.5,
    ];
  });

  return (
    <group position={[0, 2, 0]}>
      {projects.map((project, i) => (
        <ProjectBubble
          key={project.id}
          project={project}
          position={positions[i]}
          index={i}
        />
      ))}
    </group>
  );
}
