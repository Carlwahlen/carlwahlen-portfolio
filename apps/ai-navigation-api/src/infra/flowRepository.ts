/**
 * Flow repository - in-memory implementation for dev
 * 
 * EXTRACTION NOTE: Replace with actual database implementation (PostgreSQL, etc.)
 * when moving to production. This interface should remain the same.
 */

import type { Flow } from '@carlwahlen/navigation-core';

// In-memory store for development
// TODO: Replace with database (PostgreSQL, etc.)
const flows = new Map<string, Flow>();

// Seed data for demo tenant - Portfolio demo flows
// EXTRACTION NOTE: Move this to a seed script or database migration
const seedFlows: Flow[] = [
  // Home page
  {
    id: 'flow-home',
    name: 'Go to Home',
    description: 'Guide users to homepage',
    tenantId: 'demo-tax-agency',
    intent: 'find_information',
    enabled: true,
    steps: [
      {
        id: 'step-home-1',
        type: 'content',
        title: 'Homepage',
        description: 'Go to the homepage',
        required: true,
        order: 1,
        directUrl: '/#/',
      },
    ],
  },
  // Services page
  {
    id: 'flow-services',
    name: 'View Services',
    description: 'Guide users to services page',
    tenantId: 'demo-tax-agency',
    intent: 'find_information',
    enabled: true,
    steps: [
      {
        id: 'step-services-1',
        type: 'content',
        title: 'Explore services',
        description: 'Learn about the services I offer',
        required: true,
        order: 1,
        directUrl: '/#/services',
      },
    ],
  },
  // Case studies overview
  {
    id: 'flow-view-cases',
    name: 'View Case Studies',
    description: 'Guide users to view portfolio case studies',
    tenantId: 'demo-tax-agency',
    intent: 'find_information',
    enabled: true,
    steps: [
      {
        id: 'step-cases-1',
        type: 'content',
        title: 'Browse case studies',
        description: 'Explore my portfolio case studies to see examples of my work',
        required: true,
        order: 1,
        directUrl: '/#/case',
      },
    ],
  },
  // Individual case pages
  {
    id: 'flow-case-founder',
    name: 'Founder Project Case',
    description: 'Guide users to Founder Project case study',
    tenantId: 'demo-tax-agency',
    intent: 'find_information',
    enabled: true,
    steps: [
      {
        id: 'step-case-founder-1',
        type: 'content',
        title: 'Founder Project',
        description: 'Learn about the Founder Project case study',
        required: true,
        order: 1,
        directUrl: '/#/case/founder',
      },
    ],
  },
  {
    id: 'flow-case-style-scandinavia',
    name: 'Style Scandinavia Case',
    description: 'Guide users to Style Scandinavia case study',
    tenantId: 'demo-tax-agency',
    intent: 'find_information',
    enabled: true,
    steps: [
      {
        id: 'step-case-style-1',
        type: 'content',
        title: 'Style Scandinavia Case',
        description: 'Learn about the Style Scandinavia UX/SEO transformation',
        required: true,
        order: 1,
        directUrl: '/#/case/style-scandinavia',
      },
    ],
  },
  {
    id: 'flow-case-hellman-partners',
    name: 'Hellman & Partners Case',
    description: 'Guide users to Hellman & Partners case study',
    tenantId: 'demo-tax-agency',
    intent: 'find_information',
    enabled: true,
    steps: [
      {
        id: 'step-case-hellman-1',
        type: 'content',
        title: 'Hellman & Partners Case',
        description: 'Learn about the PropTech MVP development for Hellman & Partners',
        required: true,
        order: 1,
        directUrl: '/#/case/hellman-partners',
      },
    ],
  },
  {
    id: 'flow-case-portfolio-website',
    name: 'Portfolio Website Case',
    description: 'Guide users to Portfolio Website case study',
    tenantId: 'demo-tax-agency',
    intent: 'find_information',
    enabled: true,
    steps: [
      {
        id: 'step-case-portfolio-1',
        type: 'content',
        title: 'Portfolio Website Case',
        description: 'Learn about the custom portfolio website development',
        required: true,
        order: 1,
        directUrl: '/#/case/portfolio-website',
      },
    ],
  },
  {
    id: 'flow-case-ai-navigation',
    name: 'AI Navigation Case',
    description: 'Guide users to AI Navigation Engine case study',
    tenantId: 'demo-tax-agency',
    intent: 'find_information',
    enabled: true,
    steps: [
      {
        id: 'step-case-ai-nav-1',
        type: 'content',
        title: 'AI Navigation Engine Case',
        description: 'Learn about the AI-powered navigation system',
        required: true,
        order: 1,
        directUrl: '/#/case/ai-navigation',
      },
    ],
  },
  // About page
  {
    id: 'flow-about',
    name: 'About Me',
    description: 'Guide users to about page',
    tenantId: 'demo-tax-agency',
    intent: 'find_information',
    enabled: true,
    steps: [
      {
        id: 'step-about-1',
        type: 'content',
        title: 'About me',
        description: 'Learn about my background, experience, and expertise',
        required: true,
        order: 1,
        directUrl: '/#/about',
      },
    ],
  },
  // Contact page
  {
    id: 'flow-contact',
    name: 'Contact Me',
    description: 'Guide users to contact page',
    tenantId: 'demo-tax-agency',
    intent: 'contact_support',
    enabled: true,
    steps: [
      {
        id: 'step-contact-1',
        type: 'content',
        title: 'Get in touch',
        description: 'Contact me to discuss your project needs',
        required: true,
        order: 1,
        directUrl: '/#/contact',
      },
    ],
  },
  // FAQ page
  {
    id: 'flow-faq',
    name: 'FAQ',
    description: 'Guide users to FAQ page',
    tenantId: 'demo-tax-agency',
    intent: 'find_information',
    enabled: true,
    steps: [
      {
        id: 'step-faq-1',
        type: 'content',
        title: 'Frequently Asked Questions',
        description: 'Find answers to common questions',
        required: true,
        order: 1,
        directUrl: '/#/faq',
      },
    ],
  },
  // Notes/Insights page
  {
    id: 'flow-notes',
    name: 'Notes & Insights',
    description: 'Guide users to notes and insights page',
    tenantId: 'demo-tax-agency',
    intent: 'find_information',
    enabled: true,
    steps: [
      {
        id: 'step-notes-1',
        type: 'content',
        title: 'Notes & Insights',
        description: 'Read articles and insights about payments, AI, product strategy and UX',
        required: true,
        order: 1,
        directUrl: '/#/notes',
      },
    ],
  },
];

// Initialize seed data
seedFlows.forEach(flow => flows.set(flow.id, flow));

class FlowRepository {
  async create(flow: Flow): Promise<Flow> {
    flows.set(flow.id, flow);
    return flow;
  }

  async getById(id: string): Promise<Flow | null> {
    return flows.get(id) || null;
  }

  async getByTenant(tenantId: string): Promise<Flow[]> {
    return Array.from(flows.values()).filter(flow => flow.tenantId === tenantId && flow.enabled);
  }

  async update(id: string, updates: Partial<Flow>): Promise<Flow> {
    const flow = flows.get(id);
    if (!flow) {
      throw new Error('Flow not found');
    }

    const updated = { ...flow, ...updates };
    flows.set(id, updated);
    return updated;
  }

  async delete(id: string): Promise<void> {
    flows.delete(id);
  }
}

export const flowRepository = new FlowRepository();

