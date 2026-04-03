'use client';

import { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr, AdaptiveEvents, Preload } from '@react-three/drei';
import Starfield from './Starfield';
import Nebula from './Nebula';
import GalaxySystem from './GalaxySystem';
import PostProcessing, { CameraController } from './PostProcessing';
import { usePortfolioStore } from '@/lib/store';

function SceneLoader() {
  const { setLoadProgress, setLoaded } = usePortfolioStore();

  useEffect(() => {
    // Simulate loading stages
    const stages = [20, 40, 60, 80, 100];
    let i = 0;
    const interval = setInterval(() => {
      if (i < stages.length) {
        setLoadProgress(stages[i]);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => setLoaded(), 400);
      }
    }, 350);
    return () => clearInterval(interval);
  }, [setLoadProgress, setLoaded]);

  return null;
}

export default function CanvasScene() {
  return (
    <div id="canvas-container">
      <Canvas
        camera={{ position: [0, 6, 32], fov: 60, near: 0.1, far: 1000 }}
        gl={{
          antialias: false,
          alpha: false,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        dpr={[1, 1.5]}
        style={{ background: '#000008' }}
      >
        <Suspense fallback={null}>
          {/* Scene loading tracker */}
          <SceneLoader />

          {/* Camera with smooth motion */}
          <CameraController />

          {/* Background environment */}
          <Nebula />
          <Starfield />
          
          {/* Main galaxy scene */}
          <GalaxySystem />

          {/* Post-processing FX */}
          <PostProcessing />

          {/* Performance adapters */}
          <AdaptiveDpr pixelated />
          <AdaptiveEvents />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
