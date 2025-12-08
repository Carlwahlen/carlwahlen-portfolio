#!/usr/bin/env node
/**
 * Scrape Pages and Generate Queries
 * 
 * Analyserar portfolio-sidorna och genererar realistiska användarfrågor
 * baserat på innehållet på varje sida.
 * 
 * Detta script simulerar vad en människa skulle kunna skriva in baserat på
 * sidornas faktiska innehåll.
 * 
 * Usage: npx tsx scripts/scrape-and-generate-queries.ts
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface PageContent {
  url: string;
  title: string;
  description: string;
  keywords: string[];
  content: string;
}

interface GeneratedQuery {
  input: string;
  expectedTargetUrl: string;
  expectedIntent: string;
  expectedFlow: string;
  source: string; // Vilken del av sidan som genererade frågan
  confidence: number; // 0-1, hur troligt det är att någon skulle skriva detta
}

// Mappning mellan URL:er och flows
const urlToFlow: Record<string, { flow: string; intent: string }> = {
  '/': { flow: 'flow-home', intent: 'find_information' },
  '/#/': { flow: 'flow-home', intent: 'find_information' },
  '/#/home': { flow: 'flow-home', intent: 'find_information' },
  '/#/services': { flow: 'flow-services', intent: 'find_information' },
  '/#/case': { flow: 'flow-view-cases', intent: 'find_information' },
  '/#/case/founder': { flow: 'flow-case-founder', intent: 'find_information' },
  '/#/case/hellman-partners': { flow: 'flow-case-hellman-partners', intent: 'find_information' },
  '/#/case/style-scandinavia': { flow: 'flow-case-style-scandinavia', intent: 'find_information' },
  '/#/case/ai-navigation': { flow: 'flow-case-ai-navigation', intent: 'find_information' },
  '/#/about': { flow: 'flow-about', intent: 'find_information' },
  '/#/contact': { flow: 'flow-contact', intent: 'contact_support' },
  '/#/faq': { flow: 'flow-faq', intent: 'find_information' },
  '/#/notes': { flow: 'flow-notes', intent: 'find_information' },
};

// Frågeformuleringar baserat på innehåll
const queryTemplates = [
  // Direkta frågor om innehåll
  (keyword: string) => `tell me about ${keyword}`,
  (keyword: string) => `what is ${keyword}`,
  (keyword: string) => `show me ${keyword}`,
  (keyword: string) => `I want to see ${keyword}`,
  (keyword: string) => `I need ${keyword}`,
  (keyword: string) => `where can I find ${keyword}`,
  (keyword: string) => `how do I ${keyword}`,
  
  // Mer naturliga formuleringar
  (keyword: string) => `I'm interested in ${keyword}`,
  (keyword: string) => `tell me more about ${keyword}`,
  (keyword: string) => `I'd like to know about ${keyword}`,
  (keyword: string) => `can you show me ${keyword}`,
  (keyword: string) => `do you have ${keyword}`,
  
  // Svenska
  (keyword: string) => `berätta om ${keyword}`,
  (keyword: string) => `vad är ${keyword}`,
  (keyword: string) => `visa mig ${keyword}`,
  (keyword: string) => `jag vill se ${keyword}`,
];

// Extrahera nyckelord från text
function extractKeywords(text: string, maxKeywords: number = 10): string[] {
  const words = text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 3);
  
  const stopWords = new Set([
    'this', 'that', 'with', 'from', 'have', 'been', 'will', 'your', 'their',
    'what', 'where', 'when', 'which', 'about', 'could', 'should', 'would',
    'product', 'strategy', 'design', 'development', 'technology', 'services',
  ]);
  
  const wordFreq = new Map<string, number>();
  words.forEach(word => {
    if (!stopWords.has(word) && word.length > 3) {
      wordFreq.set(word, (wordFreq.get(word) || 0) + 1);
    }
  });
  
  return Array.from(wordFreq.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, maxKeywords)
    .map(([word]) => word);
}

// Generera frågor från sidinnehåll
function generateQueriesFromPage(page: PageContent): GeneratedQuery[] {
  const queries: GeneratedQuery[] = [];
  const flowInfo = urlToFlow[page.url] || { flow: 'flow-home', intent: 'find_information' };
  
  // Extrahera nyckelord från olika delar
  const titleKeywords = extractKeywords(page.title, 5);
  const descKeywords = extractKeywords(page.description, 5);
  const contentKeywords = extractKeywords(page.content, 10);
  const allKeywords = [...new Set([...titleKeywords, ...descKeywords, ...contentKeywords])];
  
  // Generera frågor från titel (högsta konfidens)
  titleKeywords.forEach(keyword => {
    queryTemplates.slice(0, 5).forEach((template, index) => {
      queries.push({
        input: template(keyword),
        expectedTargetUrl: page.url,
        expectedIntent: flowInfo.intent,
        expectedFlow: flowInfo.flow,
        source: 'title',
        confidence: 0.9 - (index * 0.1),
      });
    });
  });
  
  // Generera frågor från beskrivning (medel konfidens)
  descKeywords.forEach(keyword => {
    queryTemplates.slice(0, 3).forEach((template, index) => {
      queries.push({
        input: template(keyword),
        expectedTargetUrl: page.url,
        expectedIntent: flowInfo.intent,
        expectedFlow: flowInfo.flow,
        source: 'description',
        confidence: 0.7 - (index * 0.1),
      });
    });
  });
  
  // Generera frågor från innehåll (lägre konfidens, men mer variation)
  contentKeywords.slice(0, 5).forEach(keyword => {
    queryTemplates.slice(0, 2).forEach((template, index) => {
      queries.push({
        input: template(keyword),
        expectedTargetUrl: page.url,
        expectedIntent: flowInfo.intent,
        expectedFlow: flowInfo.flow,
        source: 'content',
        confidence: 0.6 - (index * 0.1),
      });
    });
  });
  
  // Lägg till direkta frågor om sidan
  if (page.title) {
    queries.push({
      input: `show me ${page.title.toLowerCase()}`,
      expectedTargetUrl: page.url,
      expectedIntent: flowInfo.intent,
      expectedFlow: flowInfo.flow,
      source: 'direct',
      confidence: 0.95,
    });
  }
  
  return queries;
}

async function main() {
  console.log('🔍 Scraping portfolio pages to generate realistic queries...\n');
  
  // Simulerad sidinnehåll (i verkligheten skulle detta scrapas från faktiska sidor)
  // För nu använder vi data från flowRepository och Search komponenten
  const pages: PageContent[] = [
    {
      url: '/#/services',
      title: 'Services - Product Strategy Consulting',
      description: 'Comprehensive product strategy consulting services including technical PM, payments & compliance, and UX for complex systems.',
      keywords: ['services', 'consulting', 'product strategy', 'technical PM', 'payments', 'compliance', 'UX'],
      content: 'Product strategy consulting services technical project management payments compliance UX design complex systems',
    },
    {
      url: '/#/case',
      title: 'Case Studies - Our Work',
      description: 'Real examples of successful product strategies, including Hellman & Partners PropTech platform and Style Scandinavia UX transformation.',
      keywords: ['case studies', 'work', 'projects', 'examples', 'hellman', 'style scandinavia'],
      content: 'Case studies work projects examples successful product strategies hellman partners proptech style scandinavia UX transformation',
    },
    {
      url: '/#/case/founder',
      title: 'Founder - Product Strategy Journey',
      description: 'Personal journey and insights from building data-driven products in the Nordic market.',
      keywords: ['founder', 'fintech', 'payment', 'payments', 'psp', 'orchestration', 'startup'],
      content: 'Founder fintech payment payments PSP orchestration startup market research MVP development API-first PostgreSQL',
    },
    {
      url: '/#/case/hellman-partners',
      title: 'Hellman & Partners - AI-Driven PropTech Platform',
      description: 'How we built a scalable PropTech solution with AI integration, resulting in 300% valuation increase.',
      keywords: ['hellman', 'partners', 'proptech', 'real estate', 'AI', 'property'],
      content: 'Hellman Partners PropTech real estate property housing market lean product data visualization',
    },
    {
      url: '/#/about',
      title: 'About - Carl Wahlen',
      description: 'Learn about Carl Wahlen\'s experience in product strategy, technical architecture, and UX design for Nordic companies.',
      keywords: ['about', 'background', 'experience', 'carl wahlen', 'nordic'],
      content: 'About background experience Carl Wahlen product strategy technical architecture UX design Nordic companies',
    },
    {
      url: '/#/contact',
      title: 'Contact - Get in Touch',
      description: 'Contact Carl Wahlen for product strategy consulting, technical PM, and UX design services in Sweden.',
      keywords: ['contact', 'email', 'get in touch', 'reach out', 'hire'],
      content: 'Contact email get in touch reach out hire product strategy consulting technical PM UX design services Sweden',
    },
  ];
  
  const allQueries: GeneratedQuery[] = [];
  
  pages.forEach(page => {
    const queries = generateQueriesFromPage(page);
    allQueries.push(...queries);
    console.log(`✅ Generated ${queries.length} queries from: ${page.url}`);
  });
  
  // Filtrera bort duplicater och sortera efter konfidens
  const uniqueQueries = Array.from(
    new Map(allQueries.map(q => [q.input.toLowerCase(), q])).values()
  ).sort((a, b) => b.confidence - a.confidence);
  
  console.log(`\n📈 Total queries generated: ${allQueries.length}`);
  console.log(`✨ Unique queries: ${uniqueQueries.length}`);
  console.log(`📊 Average confidence: ${(uniqueQueries.reduce((sum, q) => sum + q.confidence, 0) / uniqueQueries.length).toFixed(2)}\n`);
  
  // Konvertera till test case-format
  const testCases = uniqueQueries.map((query, index) => ({
    id: `scraped-${String(index + 1).padStart(3, '0')}`,
    input: query.input,
    expectedIntent: query.expectedIntent,
    expectedTargetUrl: query.expectedTargetUrl,
    expectedFlow: query.expectedFlow,
    tags: [query.source, `confidence-${Math.round(query.confidence * 10)}`],
  }));
  
  // Spara till fil
  const outputPath = join(__dirname, '../test-data/test-cases-scraped.json');
  const output = {
    testCases,
    metadata: {
      source: 'scraped_from_pages',
      totalQueries: allQueries.length,
      uniqueQueries: uniqueQueries.length,
      pagesAnalyzed: pages.length,
      generatedAt: new Date().toISOString(),
    },
  };
  
  writeFileSync(outputPath, JSON.stringify(output, null, 2));
  console.log(`💾 Scraped queries saved to: test-data/test-cases-scraped.json\n`);
  console.log(`💡 Tip: Combine this with test-cases.json for comprehensive testing!\n`);
}

main().catch(console.error);

