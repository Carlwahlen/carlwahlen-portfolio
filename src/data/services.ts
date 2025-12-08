export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: string;
}

export interface Pricing {
  id: string;
  title: string;
  description: string;
  price: string;
  features: string[];
  cta: string;
}

export const services: Service[] = [
  {
    id: 'product-gtm',
    title: 'Product & Go-to-Market',
    description: 'Roadmap, prioritization, measurement, pricing',
    features: [
      'Product roadmap & strategy',
      'Prioritization & backlog',
      'KPIs & measurement',
      'Pricing strategy'
    ],
    icon: ''
  },
  {
    id: 'technical-pm',
    title: 'Technical PM / Architecture',
    description: 'API design, adapters, webhooks, idempotency, logs/metrics, security',
    features: [
      'API design & documentation',
      'System architecture',
      'Security & compliance',
      'Monitoring & observability'
    ],
    icon: ''
  },
  {
    id: 'payments-compliance',
    title: 'Payments & Compliance',
    description: 'PSP orchestration, routing, fallback, PCI, PSD2, GDPR',
    features: [
      'PSP orchestration',
      'Smart routing & fallback',
      'PCI & PSD2 compliance',
      'GDPR & data protection'
    ],
    icon: ''
  },
  {
    id: 'ux-complex-systems',
    title: 'UX for Complex Systems',
    description: 'Dashboards, IA, flows, A/B, SEO',
    features: [
      'Dashboard design',
      'Information Architecture',
      'A/B testing',
      'SEO optimization'
    ],
    icon: ''
  }
];

export const pricing: Pricing[] = [
  {
    id: 'discovery-sprint',
    title: 'Discovery Sprint',
    description: 'Quick analysis and recommendations',
    price: '25–45k SEK',
    features: [
      'Needs analysis (1–2 weeks)',
      'Recommendations',
      'Prioritized roadmap',
      'Technical overview'
    ],
    cta: 'Book a Call'
  },
  {
    id: 'mvp-blueprint',
    title: 'MVP-Blueprint',
    description: 'Complete product plan',
    price: '75–125k SEK',
    features: [
      'Detailed product plan (3–4 weeks)',
      'Technical architecture',
      'UX/UI wireframes',
      'Implementation roadmap'
    ],
    cta: 'Request Proposal'
  },
  {
    id: 'part-time-tpm',
    title: 'Part-time TPM',
    description: 'Ongoing product management',
    price: '45–90k SEK/month',
    features: [
      'Ongoing product management (4–8 weeks)',
      'Technical advisory',
      'Team coaching',
      'Quality assurance'
    ],
    cta: 'Discuss Needs'
  }
];
