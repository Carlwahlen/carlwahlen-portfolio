#!/usr/bin/env node
/**
 * Extract Keywords Script
 * 
 * Analyserar misslyckade testfall och föreslår nya keywords att lägga till.
 * 
 * Usage: npx tsx scripts/extract-keywords.ts
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface FailedCase {
  input: string;
  expectedUrl: string;
  actualUrl?: string;
  expectedIntent: string;
  actualIntent?: string;
}

function extractKeywords(failedCases: FailedCase[]) {
  // Gruppera efter expectedUrl
  const byExpectedUrl: Record<string, string[]> = {};

  failedCases.forEach(fc => {
    if (!byExpectedUrl[fc.expectedUrl]) {
      byExpectedUrl[fc.expectedUrl] = [];
    }
    byExpectedUrl[fc.expectedUrl].push(fc.input);
  });

  // Extrahera vanliga ord för varje URL
  const suggestions: Record<string, { keywords: string[]; examples: string[] }> = {};

  Object.entries(byExpectedUrl).forEach(([url, inputs]) => {
    const words = new Map<string, number>();

    inputs.forEach(input => {
      const tokens = input.toLowerCase()
        .replace(/[^\w\s]/g, ' ') // Ta bort specialtecken
        .split(/\s+/)
        .filter(t => t.length > 0);

      tokens.forEach(token => {
        // Filtrera bort vanliga ord (stop words)
        const stopWords = [
          'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 
          'of', 'with', 'by', 'from', 'as', 'is', 'was', 'are', 'were', 'be', 
          'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 
          'would', 'should', 'could', 'may', 'might', 'must', 'can', 'this', 
          'that', 'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they',
          'me', 'him', 'her', 'us', 'them', 'your', 'my', 'his', 'her', 'our', 'their'
        ];
        
        if (token.length > 2 && !stopWords.includes(token)) {
          words.set(token, (words.get(token) || 0) + 1);
        }
      });
    });

    // Sortera efter frekvens
    const sorted = Array.from(words.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 15) // Top 15
      .map(([word]) => word);

    suggestions[url] = {
      keywords: sorted,
      examples: inputs.slice(0, 5), // Visa första 5 exemplen
    };
  });

  return suggestions;
}

async function main() {
  // Läs testresultat
  const resultsPath = join(__dirname, '../test-data/test-results.json');
  let testResults;

  try {
    testResults = JSON.parse(readFileSync(resultsPath, 'utf-8'));
  } catch (error) {
    console.error('❌ Could not read test-results.json');
    console.error('   Run test-model.ts first to generate test results.\n');
    process.exit(1);
  }

  // Filtrera misslyckade testfall
  const failedCases: FailedCase[] = testResults.results
    .filter((r: any) => !r.passed && !r.error)
    .map((r: any) => ({
      input: r.testCase.input,
      expectedUrl: r.testCase.expectedTargetUrl,
      actualUrl: r.actualTargetUrl,
      expectedIntent: r.testCase.expectedIntent,
      actualIntent: r.actualIntent,
    }));

  if (failedCases.length === 0) {
    console.log('✅ No failed test cases to analyze!\n');
    return;
  }

  console.log(`📊 Analyzing ${failedCases.length} failed test cases...\n`);

  const suggestions = extractKeywords(failedCases);

  console.log('💡 Keyword suggestions based on failed test cases:\n');
  Object.entries(suggestions).forEach(([url, data]) => {
    console.log(`📍 ${url}:`);
    console.log(`   Keywords: ${data.keywords.map(k => `'${k}'`).join(', ')}`);
    console.log(`   Examples:`);
    data.examples.forEach(ex => console.log(`     - "${ex}"`));
    console.log('');
  });

  // Spara till fil
  const outputPath = join(__dirname, '../test-data/keyword-suggestions.json');
  writeFileSync(
    outputPath,
    JSON.stringify(suggestions, null, 2)
  );
  console.log(`💾 Suggestions saved to: test-data/keyword-suggestions.json\n`);
}

main().catch(console.error);

