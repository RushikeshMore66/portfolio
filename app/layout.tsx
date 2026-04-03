import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Rushikesh More — AI Agent Developer | Digital Universe Portfolio',
  description: 'Principal AI Agent Developer specializing in LangGraph, autonomous agents, RAG pipelines, and cinematic AI experiences. Explore my neural galaxy portfolio.',
  keywords: ['AI Developer', 'LangGraph', 'AI Agents', 'Next.js', 'Machine Learning', 'Portfolio'],
  authors: [{ name: 'Rushikesh More' }],
  openGraph: {
    title: 'Rushikesh More — AI Agent Developer',
    description: 'A cinematic 3D portfolio — an interactive neural galaxy representing an AI Engineer\'s mind.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000008',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
