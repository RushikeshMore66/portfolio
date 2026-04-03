'use client';

import { PLANETS } from '@/lib/config/planets';
import Sun from './Sun';
import OrbitalRing from './OrbitalRing';
import Planet from './Planet';
import { usePortfolioStore } from '@/lib/store';

export default function GalaxySystem() {
  const { setActivePlanet } = usePortfolioStore();

  return (
    <group>
      {/* Ambient lighting */}
      <ambientLight intensity={0.15} color="#1a0a2e" />
      
      {/* Purple/blue accent point lights */}
      <pointLight position={[-20, 10, -10]} color="#4400aa" intensity={1.5} distance={60} decay={2} />
      <pointLight position={[20, -10, 10]} color="#002266" intensity={1.2} distance={60} decay={2} />

      {/* Central sun */}
      <Sun onClick={() => setActivePlanet(null)} />

      {/* Orbital rings - one per planet */}
      {PLANETS.map((planet, i) => (
        <OrbitalRing
          key={`ring-${planet.id}`}
          radius={planet.orbitRadius}
          color={planet.color}
          opacity={0.18 - i * 0.02}
          tubeRadius={0.02}
          tiltX={0.05 + i * 0.02}
          tiltZ={i % 2 === 0 ? 0.02 : -0.02}
          rotateSpeed={planet.orbitSpeed * 0.1}
        />
      ))}

      {/* Planets */}
      {PLANETS.map((planet) => (
        <Planet key={planet.id} config={planet} />
      ))}
    </group>
  );
}
