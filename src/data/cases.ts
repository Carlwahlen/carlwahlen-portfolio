export interface Case {
  id: string;
  title: string;
  description: string;
  bullets: string[];
  tech: string;
  impact: string;
  category: string;
  tags: string[];
  image?: string;
  teaser?: string;
}

export const cases: Case[] = [
  {
    id: 'payment-orchestration',
    title: 'Payment Orchestration Architecture & Market Study',
    description: 'A new, project under development. Focus on market research, validation and MVP development in fintech.',
    bullets: [
      'Market research & validation',
      'Concept development & strategy',
      'MVP architecture & design',
      'Partnerships & ecosystem'
    ],
    tech: 'Secret (but involves modern tech stack)',
    impact: 'Potential transformation of the payments landscape',
    category: 'FinTech',
    tags: ['MVP', 'Strategy', 'FinTech', 'Startup'],
    image: '/Payment_app_flow.png',
    teaser: 'Transforming fintech with data-driven MVP development and strategic partnerships.'
  },
  {
    id: 'hellman-partners',
    title: 'Hellman & Partners',
    description: 'PropTech start-up, making real estate data accessible through lean product development and user-centered design.',
    bullets: [
      'Lean Product Development',
      'User-centered MVP design',
      'Rapid prototyping & validation',
      'Business model development'
    ],
    tech: 'Figma, React, Market Research, Prototyping',
    impact: 'Strategic foundation for PropTech startup from concept to pitchable MVP',
    category: 'PropTech',
    tags: ['MVP', 'PropTech', 'UX/UI', 'Strategy'],
    image: '/Payment_app_flow.png',
    teaser: 'PropTech start-up, making real estate data accessible through lean product development and user-centered design.'
  },
  {
    id: 'style-scandinavia',
    title: 'Style Scandinavia',
    description: 'UX/SEO rebuild. +20% traffic first week, improved IA, templates and WCAG thinking.',
    bullets: [
      '+20% traffic first week',
      'Improved IA',
      'WCAG thinking'
    ],
    tech: 'UX/UI, SEO, WCAG, Content Strategy',
    impact: 'Significant traffic increase and improved user experience',
    category: 'Web Development',
    tags: ['UX/UI', 'SEO', 'Web Development', 'Accessibility'],
    image: '/Style_Scandinavia_web_mockup.png',
    teaser: '+20% traffic in first week through strategic UX/SEO transformation.'
  },
  {
    id: 'portfolio-website',
    title: 'Portfolio Website',
    description: 'Custom-built portfolio website showcasing technical expertise through modern web development, user-centered design, and performance optimization.',
    bullets: [
      'Custom React/TypeScript development',
      'User-centered design system',
      'SEO-optimized performance',
      'Responsive design system'
    ],
    tech: 'React, TypeScript, Tailwind CSS, Vite',
    impact: 'Professional online presence demonstrating full-stack capabilities',
    category: 'Web Development',
    tags: ['React', 'TypeScript', 'Web Development', 'Portfolio'],
    image: '/Portfolio_website_mockup2.png'
  },
  {
    id: 'ai-navigation',
    title: 'AI Navigation Engine',
    description: "Traditional navigation requires users to understand the organization's structure and terminology. AI Navigation understands the user's intent, regardless of how they phrase it.",
    bullets: [
      'AI-powered intent detection',
      'Step-by-step flow guidance',
      'Self-hosted system architecture',
      'Context-aware navigation'
    ],
    tech: 'TypeScript, Node.js, Express, LLM Integration, Monorepo',
    impact: 'Reduces navigation complexity and improves task completion rates for complex websites',
    category: 'AI',
    tags: ['AI', 'Self-Hosted', 'Navigation', 'LLM', 'TypeScript'],
    image: '/Payment_app_flow.png',
    teaser: 'AI-powered navigation engine that guides users through complex website processes with intelligent step-by-step assistance.'
  }
];
