'use client';

import { PLANETS } from '@/lib/config/planets';
import { usePortfolioStore } from '@/lib/store';

export default function NavigationDots() {
  const { activePlanet, setActivePlanet } = usePortfolioStore();

  return (
    <div style={{
      position: 'fixed',
      right: 28,
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 100,
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      alignItems: 'center',
    }}>
      {/* Center dot */}
      <button
        onClick={() => setActivePlanet(null)}
        title="Galaxy Center"
        style={{
          width: activePlanet === null ? 12 : 8,
          height: activePlanet === null ? 12 : 8,
          borderRadius: '50%',
          background: activePlanet === null ? '#ffd700' : 'rgba(255,215,0,0.3)',
          border: '1.5px solid rgba(255,215,0,0.6)',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          boxShadow: activePlanet === null ? '0 0 12px #ffd700' : 'none',
          padding: 0,
        }}
      />

      <div style={{
        width: 1,
        height: 16,
        background: 'rgba(255,255,255,0.1)',
      }} />

      {/* Planet dots */}
      {PLANETS.map((planet) => {
        const isActive = activePlanet === planet.id;
        return (
          <div key={planet.id} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            {isActive && (
              <div style={{
                position: 'absolute',
                right: '100%',
                marginRight: 12,
                whiteSpace: 'nowrap',
                fontSize: 10,
                color: planet.color,
                letterSpacing: 1,
                fontFamily: 'JetBrains Mono, monospace',
                opacity: 0.9,
              }}>
                {planet.name}
              </div>
            )}
            <button
              onClick={() => setActivePlanet(planet.id as any)}
              title={planet.name}
              style={{
                width: isActive ? 14 : 8,
                height: isActive ? 14 : 8,
                borderRadius: '50%',
                background: isActive ? planet.color : `${planet.color}44`,
                border: `1.5px solid ${planet.color}88`,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: isActive ? `0 0 15px ${planet.color}` : 'none',
                padding: 0,
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
