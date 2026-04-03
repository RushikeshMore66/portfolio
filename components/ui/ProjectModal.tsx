'use client';

import { useEffect, useRef } from 'react';
import { PROJECTS } from '@/lib/config/projects';
import { usePortfolioStore } from '@/lib/store';

export default function ProjectModal() {
  const { showProjectModal, activeProjectId, closeProjectModal } = usePortfolioStore();
  const overlayRef = useRef<HTMLDivElement>(null!);
  const panelRef = useRef<HTMLDivElement>(null!);

  const project = PROJECTS.find(p => p.id === activeProjectId);

  useEffect(() => {
    if (showProjectModal) {
      document.body.style.overflow = 'hidden';
      // Animate in
      setTimeout(() => {
        if (panelRef.current) {
          panelRef.current.style.opacity = '1';
          panelRef.current.style.transform = 'translateY(0) scale(1)';
        }
      }, 50);
    } else {
      document.body.style.overflow = '';
    }
  }, [showProjectModal]);

  const handleClose = () => {
    if (panelRef.current) {
      panelRef.current.style.opacity = '0';
      panelRef.current.style.transform = 'translateY(30px) scale(0.97)';
    }
    setTimeout(closeProjectModal, 300);
  };

  if (!showProjectModal || !project) return null;

  const categoryColors: Record<string, string> = {
    agent: '#9b5de5',
    python: '#00d4ff',
    prompt: '#f7b731',
    ui: '#f72585',
  };
  const color = categoryColors[project.category] || '#00d4ff';

  return (
    <div
      ref={overlayRef}
      onClick={handleClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        background: 'rgba(0,0,8,0.85)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}
    >
      <div
        ref={panelRef}
        onClick={e => e.stopPropagation()}
        style={{
          maxWidth: 560,
          width: '100%',
          background: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(40px)',
          border: `1px solid ${color}30`,
          borderRadius: 20,
          padding: 40,
          position: 'relative',
          opacity: 0,
          transform: 'translateY(30px) scale(0.97)',
          transition: 'opacity 0.3s ease, transform 0.3s ease',
          boxShadow: `0 0 60px ${color}20, 0 20px 60px rgba(0,0,0,0.6)`,
          fontFamily: 'Outfit, sans-serif',
        }}
      >
        {/* Corner decorations */}
        <div style={{
          position: 'absolute', top: 0, left: 0,
          width: 20, height: 20,
          borderTop: `2px solid ${color}`, borderLeft: `2px solid ${color}`,
          borderRadius: '4px 0 0 0',
        }} />
        <div style={{
          position: 'absolute', top: 0, right: 0,
          width: 20, height: 20,
          borderTop: `2px solid ${color}`, borderRight: `2px solid ${color}`,
          borderRadius: '0 4px 0 0',
        }} />
        <div style={{
          position: 'absolute', bottom: 0, left: 0,
          width: 20, height: 20,
          borderBottom: `2px solid ${color}`, borderLeft: `2px solid ${color}`,
          borderRadius: '0 0 0 4px',
        }} />
        <div style={{
          position: 'absolute', bottom: 0, right: 0,
          width: 20, height: 20,
          borderBottom: `2px solid ${color}`, borderRight: `2px solid ${color}`,
          borderRadius: '0 0 4px 0',
        }} />

        {/* Close button */}
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            background: 'none',
            border: '1px solid rgba(255,255,255,0.15)',
            color: '#888',
            cursor: 'pointer',
            width: 32,
            height: 32,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 16,
            transition: 'all 0.2s',
            fontFamily: 'Outfit, sans-serif',
          }}
          onMouseEnter={e => {
            (e.target as HTMLButtonElement).style.color = '#fff';
            (e.target as HTMLButtonElement).style.borderColor = color;
          }}
          onMouseLeave={e => {
            (e.target as HTMLButtonElement).style.color = '#888';
            (e.target as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.15)';
          }}
        >
          ✕
        </button>

        {/* Category badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          background: `${color}18`,
          border: `1px solid ${color}40`,
          borderRadius: 20,
          padding: '4px 12px',
          marginBottom: 20,
        }}>
          <div style={{
            width: 6, height: 6, borderRadius: '50%',
            background: color,
            boxShadow: `0 0 6px ${color}`,
          }} />
          <span style={{ color, fontSize: 10, letterSpacing: 1.5, textTransform: 'uppercase', fontWeight: 600 }}>
            {project.category}
          </span>
        </div>

        {/* Icon + Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
          <div style={{
            fontSize: 40,
            width: 64,
            height: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: `${color}15`,
            borderRadius: 16,
            border: `1px solid ${color}30`,
          }}>
            {project.icon}
          </div>
          <div>
            <h2 style={{
              color: '#fff',
              fontSize: 22,
              fontWeight: 700,
              margin: 0,
              lineHeight: 1.2,
            }}>
              {project.title}
            </h2>
            {project.highlighted && (
              <div style={{
                marginTop: 4,
                fontSize: 9,
                letterSpacing: 2,
                color: color,
                textTransform: 'uppercase',
                opacity: 0.8,
              }}>
                ★ Featured
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        <p style={{
          color: 'rgba(255,255,255,0.65)',
          fontSize: 14,
          lineHeight: 1.7,
          marginBottom: 24,
        }}>
          {project.description}
        </p>

        {/* Tech stack */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
          {project.tech.map(t => (
            <span
              key={t}
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 6,
                padding: '4px 12px',
                fontSize: 11,
                color: '#ccc',
                fontFamily: 'JetBrains Mono, monospace',
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: 12 }}>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                flex: 1,
                padding: '12px 0',
                textAlign: 'center',
                background: `${color}20`,
                border: `1px solid ${color}60`,
                borderRadius: 10,
                color,
                fontSize: 13,
                fontWeight: 600,
                textDecoration: 'none',
                letterSpacing: 0.5,
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                (e.target as HTMLAnchorElement).style.background = `${color}35`;
                (e.target as HTMLAnchorElement).style.boxShadow = `0 0 20px ${color}30`;
              }}
              onMouseLeave={e => {
                (e.target as HTMLAnchorElement).style.background = `${color}20`;
                (e.target as HTMLAnchorElement).style.boxShadow = 'none';
              }}
            >
              GitHub →
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                flex: 1,
                padding: '12px 0',
                textAlign: 'center',
                background: color,
                border: 'none',
                borderRadius: 10,
                color: '#000',
                fontSize: 13,
                fontWeight: 700,
                textDecoration: 'none',
                letterSpacing: 0.5,
                boxShadow: `0 0 20px ${color}40`,
                transition: 'all 0.2s',
              }}
            >
              Live Demo →
            </a>
          )}
          {!project.githubUrl && !project.demoUrl && (
            <div style={{
              flex: 1,
              padding: '12px 0',
              textAlign: 'center',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 10,
              color: '#555',
              fontSize: 12,
            }}>
              Coming Soon
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
