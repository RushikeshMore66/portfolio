'use client';

import { useEffect, useRef } from 'react';
import { usePortfolioStore } from '@/lib/store';

export default function LoadingScreen() {
  const { loadProgress, isLoading } = usePortfolioStore();
  const containerRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    if (!isLoading && containerRef.current) {
      containerRef.current.style.opacity = '0';
      containerRef.current.style.pointerEvents = 'none';
    }
  }, [isLoading]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#000008',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'opacity 0.8s ease',
        fontFamily: 'Outfit, sans-serif',
      }}
    >
      {/* Logo / Title */}
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <div style={{
          fontSize: 11,
          letterSpacing: 6,
          color: '#00d4ff',
          textTransform: 'uppercase',
          marginBottom: 16,
          opacity: 0.7,
          fontFamily: 'JetBrains Mono, monospace',
        }}>
          Neural System Boot
        </div>
        <div style={{
          fontSize: 48,
          fontWeight: 800,
          background: 'linear-gradient(135deg, #00d4ff, #9b5de5, #f72585)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          lineHeight: 1.1,
        }}>
          Rushikesh<br />More
        </div>
        <div style={{
          fontSize: 13,
          color: '#666',
          marginTop: 12,
          letterSpacing: 2,
        }}>
          AI Agent Developer
        </div>
      </div>

      {/* Animated constellation */}
      <div style={{ position: 'relative', width: 120, height: 120, marginBottom: 40 }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          border: '1px solid rgba(0,212,255,0.2)',
          borderRadius: '50%',
          animation: 'spin-slow 8s linear infinite',
        }} />
        <div style={{
          position: 'absolute',
          inset: 12,
          border: '1px solid rgba(155,93,229,0.3)',
          borderRadius: '50%',
          animation: 'spin-slow 5s linear infinite reverse',
        }} />
        <div style={{
          position: 'absolute',
          inset: 28,
          border: '1px solid rgba(247,37,133,0.3)',
          borderRadius: '50%',
          animation: 'spin-slow 3s linear infinite',
        }} />
        <div style={{
          position: 'absolute',
          inset: '50%',
          width: 8,
          height: 8,
          background: '#00d4ff',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 15px #00d4ff, 0 0 30px rgba(0,212,255,0.5)',
        }} />
      </div>

      {/* Progress bar */}
      <div style={{ width: 280, marginBottom: 20 }}>
        <div style={{
          height: 2,
          background: 'rgba(255,255,255,0.08)',
          borderRadius: 4,
          overflow: 'hidden',
        }}>
          <div style={{
            height: '100%',
            width: `${loadProgress}%`,
            background: 'linear-gradient(90deg, #00d4ff, #9b5de5)',
            borderRadius: 4,
            boxShadow: '0 0 10px #00d4ff',
            transition: 'width 0.4s ease',
          }} />
        </div>
      </div>

      {/* Status text */}
      <div style={{
        fontSize: 11,
        color: '#444',
        letterSpacing: 2,
        fontFamily: 'JetBrains Mono, monospace',
      }}>
        {loadProgress < 30 && 'Initializing neural matrix...'}
        {loadProgress >= 30 && loadProgress < 60 && 'Calibrating orbital engines...'}
        {loadProgress >= 60 && loadProgress < 90 && 'Rendering galaxy system...'}
        {loadProgress >= 90 && 'System online...'}
      </div>

      {/* Scanlines */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)',
        pointerEvents: 'none',
      }} />
    </div>
  );
}
