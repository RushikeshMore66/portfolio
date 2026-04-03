'use client';

import dynamic from 'next/dynamic';
import LoadingScreen from '@/components/ui/LoadingScreen';
import HUD from '@/components/ui/HUD';
import NavigationDots from '@/components/ui/NavigationDots';
import ProjectModal from '@/components/ui/ProjectModal';
import CustomCursor from '@/components/ui/CustomCursor';

// Dynamic import with SSR disabled — required for Three.js / WebGL
const CanvasScene = dynamic(() => import('@/components/3d/CanvasScene'), {
  ssr: false,
  loading: () => null,
});

export default function Home() {
  return (
    <main style={{ position: 'fixed', inset: 0, overflow: 'hidden' }}>
      {/* Custom cursor */}
      <CustomCursor />

      {/* Cinematic loading screen */}
      <LoadingScreen />

      {/* Main 3D canvas — SSR disabled */}
      <CanvasScene />

      {/* Glassmorphism HUD overlay */}
      <HUD />

      {/* Right-side planet navigation */}
      <NavigationDots />

      {/* Project detail modal */}
      <ProjectModal />
    </main>
  );
}
