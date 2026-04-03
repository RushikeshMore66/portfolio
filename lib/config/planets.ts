export interface Planet {
  id: string;
  name: string;
  subtitle: string;
  orbitRadius: number;
  orbitSpeed: number;
  orbitOffset: number; // initial angle offset in radians
  size: number;
  color: string;
  emissiveColor: string;
  glowColor: string;
  type: 'prompt' | 'agent' | 'python' | 'ui';
  skills: string[];
  description: string;
}

export const PLANETS: Planet[] = [
  {
    id: 'prompt',
    name: 'Prompt Engineering',
    subtitle: 'Language Architecture',
    orbitRadius: 6,
    orbitSpeed: 0.18,
    orbitOffset: 0,
    size: 0.75,
    color: '#f7b731',
    emissiveColor: '#c47800',
    glowColor: '#f7b731',
    type: 'prompt',
    skills: ['Chain-of-Thought', 'Few-Shot Learning', 'RAG Prompting', 'Persona Design', 'Structured Output'],
    description: 'Architecting precision language interfaces that unlock deep AI reasoning and structured cognition.'
  },
  {
    id: 'agent',
    name: 'AI Agent Systems',
    subtitle: 'Autonomous Intelligence',
    orbitRadius: 10,
    orbitSpeed: 0.12,
    orbitOffset: Math.PI / 2,
    size: 0.9,
    color: '#9b5de5',
    emissiveColor: '#5a0eb0',
    glowColor: '#9b5de5',
    type: 'agent',
    skills: ['LangGraph', 'AutoGen', 'Tool Use', 'Memory Systems', 'Multi-Agent'],
    description: 'Engineering autonomous AI agents that plan, reason, and execute complex multi-step workflows.'
  },
  {
    id: 'python',
    name: 'Python / MCP',
    subtitle: 'Infrastructure Core',
    orbitRadius: 14,
    orbitSpeed: 0.08,
    orbitOffset: Math.PI,
    size: 0.8,
    color: '#00d4ff',
    emissiveColor: '#006080',
    glowColor: '#00d4ff',
    type: 'python',
    skills: ['FastAPI', 'LangChain', 'MCP Protocol', 'Vector DBs', 'Async Python'],
    description: 'Building robust AI infrastructure with Python, model context protocols, and scalable backend systems.'
  },
  {
    id: 'ui',
    name: 'Frontend & UI',
    subtitle: 'Experience Design',
    orbitRadius: 18,
    orbitSpeed: 0.06,
    orbitOffset: 3 * Math.PI / 2,
    size: 0.7,
    color: '#f72585',
    emissiveColor: '#8a0040',
    glowColor: '#f72585',
    type: 'ui',
    skills: ['Next.js', 'React', 'Three.js', 'GSAP', 'Tailwind'],
    description: 'Crafting immersive, cinematic interfaces that transform AI capabilities into stunning user experiences.'
  }
];

export const SUN_CONFIG = {
  size: 1.4,
  color: '#fffbe6',
  emissiveColor: '#ff9500',
  glowColor: '#ffd700',
};
