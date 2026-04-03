'use client';

import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';

// Camera controller with lerp
export function CameraController() {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, 6, 32));
  const currentPos = useRef(new THREE.Vector3(0, 6, 32));
  const lookAtTarget = useRef(new THREE.Vector3(0, 0, 0));
  const clock = useRef(0);

  useFrame((_, delta) => {
    clock.current += delta;
    
    // Subtle camera breathe
    const breatheX = Math.sin(clock.current * 0.15) * 0.5;
    const breatheY = Math.cos(clock.current * 0.1) * 0.3;

    currentPos.current.lerp(targetPos.current, delta * 1.5);
    camera.position.copy(currentPos.current).add(
      new THREE.Vector3(breatheX, breatheY, 0)
    );
    camera.lookAt(lookAtTarget.current);
  });

  return null;
}

export default function PostProcessing() {
  return (
    <EffectComposer>
      <Bloom
        luminanceThreshold={0.2}
        luminanceSmoothing={0.9}
        intensity={1.8}
        blendFunction={BlendFunction.ADD}
      />
      <ChromaticAberration
        offset={new THREE.Vector2(0.0008, 0.0008)}
        blendFunction={BlendFunction.NORMAL}
        radialModulation={false}
        modulationOffset={0}
      />
      <Vignette
        eskil={false}
        offset={0.35}
        darkness={0.6}
        blendFunction={BlendFunction.NORMAL}
      />
    </EffectComposer>
  );
}
