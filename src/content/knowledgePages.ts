export type KnowledgeAreaSlug =
  | "product-strategy"
  | "ux-design"
  | "business-development"
  | "technical-product-strategy"
  | "data-driven-product-development"
  | "process-methodology";

export interface KnowledgePageMeta {
  areaSlug: KnowledgeAreaSlug;
  pageSlug: string;
  title: string;
  shortTitle?: string;
  description: string;
  summaryBullets?: string[];
  keywords?: string[];
  readingTimeMinutes?: number;
  relatedSlugs?: string[];
  primaryServicePath?: string; // Future-proofing for pillar pages
}

// Area display names mapping
export const AREA_DISPLAY_NAMES: Record<KnowledgeAreaSlug, string> = {
  "product-strategy": "Product Strategy",
  "ux-design": "UX Design",
  "business-development": "Business Development",
  "technical-product-strategy": "Technical Product Strategy",
  "data-driven-product-development": "Data-Driven Product Development",
  "process-methodology": "Process & Methodology",
};

// Default services path (current single services page)
export const DEFAULT_SERVICES_PATH = "/Services";

// Knowledge pages dataset
export const KNOWLEDGE_PAGES: KnowledgePageMeta[] = [
  // ARTICLE 1: Product Strategy
  {
    areaSlug: "product-strategy",
    pageSlug: "what-is-product-strategy",
    title: "What is Product Strategy? A Practical Guide for Modern Digital Products",
    description: "Product strategy is the foundation that aligns vision, business goals, user needs and development effort. Without it, teams build features — not products. This guide explains what product strategy actually is, how to define it, and how to use frameworks that make decisions faster and less emotional.",
    keywords: ["product strategy", "SaaS strategy", "product roadmap", "prioritization", "product frameworks", "north star metric"],
    summaryBullets: [
      "Aligns business goals with user needs",
      "Prevents feature driven development",
      "Reduces wasted time and misalignment",
      "Frameworks for faster decision making"
    ],
    readingTimeMinutes: 6,
    // Related articles - will auto-fallback to same area if empty
    relatedSlugs: [],
  },

  // ARTICLE 2: UX Design
  {
    areaSlug: "ux-design",
    pageSlug: "ux-vs-ui",
    title: "UX vs UI — The Difference Explained Clearly",
    description: "UX is how something works, UI is how it looks. Both are essential — but they operate on different levels. Here is a simple explanation with examples, processes and when each discipline is most important.",
    keywords: ["ux vs ui", "ux design", "ui design", "interaction design", "ux beginner guide"],
    summaryBullets: [
      "UX = structure & logic, UI = look & feel",
      "UX research + wireframes, UI components + branding",
      "When UX or UI should be prioritized"
    ],
    readingTimeMinutes: 5,
    // Related articles - will auto-fallback to same area if empty
    relatedSlugs: [],
  },

  // ARTICLE 3: Data-Driven Product Development
  {
    areaSlug: "data-driven-product-development",
    pageSlug: "kpi-north-star-metrics",
    title: "KPIs & North Star Metrics — A Smart Guide for Product Teams",
    description: "KPIs and North Star Metrics ensure that teams measure impact, not just output. This guide explains how to choose metrics that matter, track progress, and align roadmap decisions to measurable outcomes.",
    keywords: ["north star metric", "kpi", "product analytics", "data driven product"],
    summaryBullets: [
      "KPI vs North Star difference",
      "Real product metric examples",
      "Rules for metric design",
      "Avoid vanity metrics"
    ],
    readingTimeMinutes: 7,
    // Related articles - will auto-fallback to same area if empty
    relatedSlugs: [],
  },
];

// Helper functions
export function getKnowledgePage(
  areaSlug: KnowledgeAreaSlug,
  pageSlug: string
): KnowledgePageMeta | undefined {
  return KNOWLEDGE_PAGES.find(
    (page) => page.areaSlug === areaSlug && page.pageSlug === pageSlug
  );
}

export function getKnowledgePagesByArea(
  areaSlug: KnowledgeAreaSlug
): KnowledgePageMeta[] {
  return KNOWLEDGE_PAGES.filter((page) => page.areaSlug === areaSlug);
}

export function getRelatedPages(page: KnowledgePageMeta): KnowledgePageMeta[] {
  if (!page.relatedSlugs || page.relatedSlugs.length === 0) {
    // Fallback: return other pages in the same area
    const sameAreaPages = getKnowledgePagesByArea(page.areaSlug);
    return sameAreaPages
      .filter((p) => p.pageSlug !== page.pageSlug)
      .slice(0, 3);
  }

  return page.relatedSlugs
    .map((slug) => getKnowledgePage(page.areaSlug, slug))
    .filter((p): p is KnowledgePageMeta => p !== undefined);
}

export function getAllKnowledgePages(): KnowledgePageMeta[] {
  return KNOWLEDGE_PAGES;
}

export function getAllAreas(): KnowledgeAreaSlug[] {
  return Array.from(new Set(KNOWLEDGE_PAGES.map((page) => page.areaSlug)));
}

export function getAreaDisplayName(areaSlug: KnowledgeAreaSlug): string {
  return AREA_DISPLAY_NAMES[areaSlug];
}

