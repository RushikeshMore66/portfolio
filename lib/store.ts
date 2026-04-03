'use client';

import { create } from 'zustand';
import * as THREE from 'three';

export type PlanetId = 'prompt' | 'agent' | 'python' | 'ui' | null;

interface PortfolioState {
  // Planet state
  activePlanet: PlanetId;
  hoveredPlanet: PlanetId;
  
  // Particle / deconstruction mode
  particleMode: boolean;
  particlePlanetId: PlanetId;
  
  // Camera
  cameraTarget: THREE.Vector3;
  cameraLookAt: THREE.Vector3;
  isTransitioning: boolean;

  // UI state
  showProjectModal: boolean;
  activeProjectId: string | null;
  isLoading: boolean;
  loadProgress: number;
  
  // Navigation
  activeSection: 'home' | 'about' | 'skills' | 'projects' | 'contact';

  // Actions
  setActivePlanet: (id: PlanetId) => void;
  setHoveredPlanet: (id: PlanetId) => void;
  setParticleMode: (active: boolean, planetId?: PlanetId) => void;
  setCameraTarget: (pos: THREE.Vector3, lookAt?: THREE.Vector3) => void;
  setIsTransitioning: (val: boolean) => void;
  openProjectModal: (projectId: string) => void;
  closeProjectModal: () => void;
  setLoadProgress: (progress: number) => void;
  setLoaded: () => void;
  setActiveSection: (section: PortfolioState['activeSection']) => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  activePlanet: null,
  hoveredPlanet: null,
  particleMode: false,
  particlePlanetId: null,
  cameraTarget: new THREE.Vector3(0, 0, 30),
  cameraLookAt: new THREE.Vector3(0, 0, 0),
  isTransitioning: false,
  showProjectModal: false,
  activeProjectId: null,
  isLoading: true,
  loadProgress: 0,
  activeSection: 'home',

  setActivePlanet: (id) => set({ activePlanet: id }),
  setHoveredPlanet: (id) => set({ hoveredPlanet: id }),
  setParticleMode: (active, planetId = null) => set({ 
    particleMode: active, 
    particlePlanetId: active ? planetId : null 
  }),
  setCameraTarget: (pos, lookAt) => set({ 
    cameraTarget: pos, 
    cameraLookAt: lookAt ?? new THREE.Vector3(0, 0, 0) 
  }),
  setIsTransitioning: (val) => set({ isTransitioning: val }),
  openProjectModal: (projectId) => set({ showProjectModal: true, activeProjectId: projectId }),
  closeProjectModal: () => set({ showProjectModal: false, activeProjectId: null }),
  setLoadProgress: (progress) => set({ loadProgress: progress }),
  setLoaded: () => set({ isLoading: false, loadProgress: 100 }),
  setActiveSection: (section) => set({ activeSection: section }),
}));
