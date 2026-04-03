export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  category: 'prompt' | 'agent' | 'python' | 'ui';
  gradient: string;
  icon: string;
  githubUrl?: string;
  demoUrl?: string;
  highlighted?: boolean;
}

export const PROJECTS: Project[] = [
  {
    id: 'ai-task-manager',
    title: 'AI Task Manager',
    description: 'Production-grade SaaS with LangGraph agent orchestration, stateful task decomposition, and real-time streaming chat interface.',
    tech: ['LangGraph', 'FastAPI', 'Next.js', 'WebSocket'],
    category: 'agent',
    gradient: 'linear-gradient(135deg, #9b5de5, #f72585)',
    icon: '🤖',
    githubUrl: 'https://github.com/RushikeshMore66/AI_Task_Manager',
    highlighted: true,
  },
  {
    id: 'neural-rag',
    title: 'Neural RAG Pipeline',
    description: 'Enterprise retrieval-augmented generation system with hybrid search, semantic chunking, and multi-modal document processing.',
    tech: ['LangChain', 'Pinecone', 'FastAPI', 'OpenAI'],
    category: 'python',
    gradient: 'linear-gradient(135deg, #00d4ff, #0a1f3d)',
    icon: '🧠',
    highlighted: true,
  },
  {
    id: 'prompt-optimizer',
    title: 'Prompt Optimizer',
    description: 'Automated prompt engineering toolkit that evaluates, scores, and iteratively improves prompts using DSPy-inspired techniques.',
    tech: ['Python', 'OpenAI', 'Streamlit', 'DSPy'],
    category: 'prompt',
    gradient: 'linear-gradient(135deg, #f7b731, #f72585)',
    icon: '⚡',
  },
  {
    id: 'customer-support-bot',
    title: 'AI Customer Support',
    description: 'Production customer support bot with document ingestion, conversation memory, and escalation routing powered by LangChain.',
    tech: ['LangChain', 'FastAPI', 'React', 'Vector DB'],
    category: 'agent',
    gradient: 'linear-gradient(135deg, #9b5de5, #00d4ff)',
    icon: '💬',
  },
  {
    id: 'space-portfolio',
    title: 'Digital Universe Portfolio',
    description: 'This cinematic 3D portfolio — an interactive neural galaxy built with React Three Fiber, GSAP, and custom physics.',
    tech: ['Next.js', 'Three.js', 'R3F', 'GSAP'],
    category: 'ui',
    gradient: 'linear-gradient(135deg, #f72585, #9b5de5)',
    icon: '🌌',
    highlighted: true,
  },
  {
    id: 'mcp-server',
    title: 'MCP Tool Server',
    description: 'Model Context Protocol server exposing 20+ tools for file system, web search, and code execution to AI agents.',
    tech: ['MCP', 'Python', 'FastAPI', 'Docker'],
    category: 'python',
    gradient: 'linear-gradient(135deg, #00d4ff, #9b5de5)',
    icon: '🔧',
  },
];
