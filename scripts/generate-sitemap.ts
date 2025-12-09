#!/usr/bin/env node
/**
 * Generate Sitemap
 * 
 * Dynamically generates sitemap.xml based on cases array and static pages.
 * Updates lastmod automatically to current date.
 * 
 * Usage: npx tsx scripts/generate-sitemap.ts
 */

import { cases } from '../src/data/cases.js';
import { getAllKnowledgePages } from '../src/content/knowledgePages.js';
import { writeFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const BASE_URL = 'https://carlwahlen.com';
const TODAY = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

// Static pages configuration
const staticPages = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/contact', priority: '0.9', changefreq: 'monthly' },
  { path: '/faq', priority: '0.7', changefreq: 'monthly' },
  { path: '/services', priority: '0.8', changefreq: 'monthly' },
  { path: '/case', priority: '0.8', changefreq: 'monthly' },
  { path: '/knowledge', priority: '0.8', changefreq: 'weekly' },
];

// Generate case page URLs from cases array
const casePages = cases.map(caseItem => ({
  path: `/case/${caseItem.id}`,
  priority: '0.7',
  changefreq: 'monthly' as const,
}));

// Generate knowledge page URLs
const knowledgePages = getAllKnowledgePages().map(page => ({
  path: `/knowledge/${page.areaSlug}/${page.pageSlug}`,
  priority: '0.8',
  changefreq: 'monthly' as const,
}));

// Combine all pages
const allPages = [...staticPages, ...casePages, ...knowledgePages];

// Generate XML sitemap
function generateSitemap(): string {
  const urls = allPages
    .map(
      page => `  <url>
    <loc>${BASE_URL}${page.path}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Main pages -->
${urls}
</urlset>`;
}

// Write sitemap to public directory
const sitemapPath = join(__dirname, '..', 'public', 'sitemap.xml');
const sitemapContent = generateSitemap();

writeFileSync(sitemapPath, sitemapContent, 'utf-8');

console.log(`✅ Sitemap generated successfully at ${sitemapPath}`);
console.log(`📄 Total URLs: ${allPages.length}`);
console.log(`📅 Last modified: ${TODAY}`);
console.log(`\nIncluded case pages:`);
casePages.forEach(page => {
  console.log(`  - ${page.path}`);
});

