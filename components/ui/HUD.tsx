'use client';

import { useState, useEffect, useRef } from 'react';
import { PLANETS } from '@/lib/config/planets';
import { usePortfolioStore } from '@/lib/store';

const NAV_ITEMS = ['About', 'Skills', 'Projects', 'Contact'];

function DataStream() {
  const lines = ['> NEURAL_LINK: ACTIVE', '> ORBIT_COUNT: 4', '> FPS: 60', '> AI_STATUS: ONLINE'];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(c => (c + 1) % lines.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      fontFamily: 'JetBrains Mono, monospace',
      fontSize: 9,
      color: '#00d4ff',
      opacity: 0.5,
      height: 14,
      overflow: 'hidden',
    }}>
      {lines[current]}
    </div>
  );
}

export default function HUD() {
  const { activePlanet, activeSection, setActiveSection, isLoading } = usePortfolioStore();
  const [mounted, setMounted] = useState(false);
  const hudRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => setMounted(true), 200);
    }
  }, [isLoading]);

  const activePlanetConfig = PLANETS.find(p => p.id === activePlanet);

  return (
    <div
      ref={hudRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        pointerEvents: 'none',
        opacity: mounted ? 1 : 0,
        transition: 'opacity 0.8s ease',
      }}
    >
      {/* ── TOP LEFT: Name + Title ── */}
      <div style={{
        position: 'absolute',
        top: 24,
        left: 28,
        pointerEvents: 'auto',
      }}>
        {/* HUD corner */}
        <div style={{
          position: 'absolute',
          top: -8,
          left: -8,
          width: 16,
          height: 16,
          borderTop: '2px solid #00d4ff',
          borderLeft: '2px solid #00d4ff',
          opacity: 0.6,
        }} />
        
        <div style={{
          fontSize: 9,
          letterSpacing: 4,
          color: '#00d4ff',
          textTransform: 'uppercase',
          marginBottom: 6,
          opacity: 0.6,
          fontFamily: 'JetBrains Mono, monospace',
        }}>
          AI Systems Architect
        </div>
        <div style={{
          fontFamily: 'Outfit, sans-serif',
          fontSize: 28,
          fontWeight: 800,
          color: '#fff',
          lineHeight: 1.1,
          letterSpacing: -0.5,
        }}>
          Rushikesh
        </div>
        <div style={{
          fontFamily: 'Outfit, sans-serif',
          fontSize: 28,
          fontWeight: 300,
          background: 'linear-gradient(135deg, #00d4ff, #9b5de5)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          letterSpacing: -0.5,
        }}>
          More
        </div>
        <div style={{ marginTop: 10 }}>
          <DataStream />
        </div>
      </div>

      {/* ── TOP RIGHT: Navigation ── */}
      <div style={{
        position: 'absolute',
        top: 28,
        right: 60,
        display: 'flex',
        gap: 6,
        pointerEvents: 'auto',
      }}>
        {NAV_ITEMS.map(item => {
          const key = item.toLowerCase() as any;
          const isActive = activeSection === key;
          return (
            <button
              key={item}
              onClick={() => setActiveSection(key)}
              style={{
                background: isActive ? 'rgba(0,212,255,0.12)' : 'rgba(255,255,255,0.04)',
                border: isActive ? '1px solid rgba(0,212,255,0.5)' : '1px solid rgba(255,255,255,0.08)',
                borderRadius: 8,
                padding: '8px 16px',
                color: isActive ? '#00d4ff' : 'rgba(255,255,255,0.5)',
                fontSize: 12,
                fontWeight: isActive ? 600 : 400,
                cursor: 'pointer',
                letterSpacing: 0.5,
                transition: 'all 0.2s ease',
                fontFamily: 'Outfit, sans-serif',
                backdropFilter: 'blur(10px)',
                boxShadow: isActive ? '0 0 15px rgba(0,212,255,0.2)' : 'none',
              }}
              onMouseEnter={e => {
                if (!isActive) {
                  (e.target as HTMLButtonElement).style.color = 'rgba(255,255,255,0.8)';
                  (e.target as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.2)';
                }
              }}
              onMouseLeave={e => {
                if (!isActive) {
                  (e.target as HTMLButtonElement).style.color = 'rgba(255,255,255,0.5)';
                  (e.target as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.08)';
                }
              }}
            >
              {item}
            </button>
          );
        })}
      </div>

      {/* ── BOTTOM LEFT: Active Planet Info ── */}
      <div style={{
        position: 'absolute',
        bottom: 28,
        left: 28,
        pointerEvents: 'auto',
        minWidth: 240,
        transition: 'opacity 0.4s ease, transform 0.4s ease',
        opacity: activePlanetConfig ? 1 : 0.4,
        transform: activePlanetConfig ? 'translateY(0)' : 'translateY(6px)',
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(20px)',
          border: `1px solid ${activePlanetConfig ? activePlanetConfig.color + '30' : 'rgba(255,255,255,0.06)'}`,
          borderRadius: 12,
          padding: '16px 20px',
          boxShadow: activePlanetConfig ? `0 0 30px ${activePlanetConfig.color}15` : 'none',
        }}>
          <div style={{
            fontSize: 9,
            letterSpacing: 2,
            color: activePlanetConfig?.color || '#555',
            textTransform: 'uppercase',
            marginBottom: 6,
            fontFamily: 'JetBrains Mono, monospace',
          }}>
            {activePlanetConfig ? 'Active Node' : 'Select a Planet'}
          </div>
          <div style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: 16,
            fontWeight: 600,
            color: '#fff',
            marginBottom: 4,
          }}>
            {activePlanetConfig?.name || 'Galaxy Core'}
          </div>
          <div style={{
            fontSize: 11,
            color: 'rgba(255,255,255,0.4)',
            marginBottom: activePlanetConfig ? 12 : 0,
            fontFamily: 'Outfit, sans-serif',
          }}>
            {activePlanetConfig?.description || 'An AI Engineer\'s Digital Universe'}
          </div>
          {activePlanetConfig && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {activePlanetConfig.skills.map(skill => (
                <span
                  key={skill}
                  style={{
                    background: `${activePlanetConfig.color}15`,
                    border: `1px solid ${activePlanetConfig.color}35`,
                    borderRadius: 4,
                    padding: '2px 8px',
                    fontSize: 9,
                    color: activePlanetConfig.color,
                    fontFamily: 'JetBrains Mono, monospace',
                    letterSpacing: 0.5,
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── BOTTOM CENTER: Instruction ── */}
      <div style={{
        position: 'absolute',
        bottom: 28,
        left: '50%',
        transform: 'translateX(-50%)',
        textAlign: 'center',
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: 9,
        color: 'rgba(255,255,255,0.2)',
        letterSpacing: 2,
        whiteSpace: 'nowrap',
      }}>
        CLICK PLANET TO EXPLORE · HOVER TO INSPECT
      </div>

      {/* ── BOTTOM RIGHT: Social/Contact ── */}
      <div style={{
        position: 'absolute',
        bottom: 28,
        right: 60,
        display: 'flex',
        gap: 10,
        pointerEvents: 'auto',
      }}>
        {[
          { label: 'GitHub', url: 'https://github.com/RushikeshMore66' },
          { label: 'LinkedIn', url: '#' },
        ].map(link => (
          <a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 8,
              padding: '7px 14px',
              color: 'rgba(255,255,255,0.4)',
              fontSize: 11,
              textDecoration: 'none',
              letterSpacing: 0.5,
              transition: 'all 0.2s',
              backdropFilter: 'blur(10px)',
              fontFamily: 'Outfit, sans-serif',
            }}
            onMouseEnter={e => {
              (e.target as HTMLAnchorElement).style.color = '#00d4ff';
              (e.target as HTMLAnchorElement).style.borderColor = 'rgba(0,212,255,0.3)';
            }}
            onMouseLeave={e => {
              (e.target as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.4)';
              (e.target as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.08)';
            }}
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* ── SCANLINES ── */}
      <div className="scanline" />
    </div>
  );
}
