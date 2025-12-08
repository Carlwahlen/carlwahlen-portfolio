#!/usr/bin/env node
/**
 * Generate 100x Synthetic Test Data
 * 
 * Generates 100x more synthetic test data based on:
 * 1. Existing test cases
 * 2. Real user query frequency data (if available)
 * 3. Advanced variations using synonyms, paraphrasing, and linguistic patterns
 * 
 * This ensures that regardless of how users phrase their queries,
 * they will land on the correct page.
 * 
 * Usage: npx tsx scripts/generate-100x-synthetic-data.ts
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface TestCase {
  id: string;
  input: string;
  expectedIntent: string;
  expectedTargetUrl: string;
  expectedFlow: string;
  tags: string[];
  frequency?: number; // From query tracking
  successRate?: number; // From query tracking
}

// Comprehensive English synonyms and variations
const synonyms: Record<string, string[]> = {
  // Action verbs
  'show': ['display', 'see', 'view', 'find', 'get', 'bring up', 'open', 'present', 'reveal', 'exhibit', 'demonstrate'],
  'tell': ['explain', 'describe', 'inform', 'share', 'provide', 'give', 'present'],
  'want': ['want', 'need', 'would like', 'looking for', 'seeking', 'wish', 'desire', 'require'],
  'help': ['help', 'assist', 'support', 'aid', 'guide', 'facilitate'],
  'can': ['can', 'could', 'are able to', 'will', 'might', 'may'],
  
  // Pronouns and references
  'me': ['me', 'us', 'I', 'we', 'myself', 'ourselves'],
  'you': ['you', 'he', 'your company', 'your business', 'your organization', 'your team'],
  'your': ['your', 'his', 'the', 'their'],
  
  // Content types
  'case studies': ['case studies', 'cases', 'work', 'projects', 'portfolio', 'examples', 'projects you\'ve done', 'previous work', 'past projects', 'client work', 'work samples'],
  'services': ['services', 'offerings', 'what you do', 'capabilities', 'expertise', 'skills', 'specializations', 'competencies'],
  'about': ['about', 'background', 'who you are', 'experience', 'bio', 'biography', 'profile', 'story'],
  'contact': ['contact', 'reach out', 'get in touch', 'email', 'message', 'call', 'speak with', 'connect', 'communicate'],
  
  // Question words
  'what': ['what', 'which', 'tell me about', 'describe', 'explain'],
  'who': ['who', 'which companies', 'what companies', 'what organizations'],
  'where': ['where', 'which page', 'what page', 'what section'],
  'how': ['how', 'in what way', 'by what means'],
  
  // Common phrases
  'email address': ['email address', 'email', 'e-mail', 'email contact', 'mail address', 'contact email'],
  'work with': ['work with', 'collaborate with', 'partner with', 'team up with'],
  'expertise': ['expertise', 'skills', 'specializations', 'competencies', 'capabilities', 'strengths'],
};

// Question patterns for generating variations
const questionPatterns = [
  (base: string) => base,
  (base: string) => `I ${base}`,
  (base: string) => `Can you ${base}?`,
  (base: string) => `I want to ${base}`,
  (base: string) => `I need to ${base}`,
  (base: string) => `I would like to ${base}`,
  (base: string) => `I'm looking for ${base}`,
  (base: string) => `Show me ${base}`,
  (base: string) => `Tell me about ${base}`,
  (base: string) => `What is ${base}?`,
  (base: string) => `Where can I find ${base}?`,
  (base: string) => `How do I ${base}?`,
  (base: string) => `I'd like to ${base}`,
  (base: string) => `Please ${base}`,
  (base: string) => `${base} please`,
  (base: string) => `I want ${base}`,
  (base: string) => `I need ${base}`,
  (base: string) => `Looking for ${base}`,
  (base: string) => `Seeking ${base}`,
  (base: string) => `Find ${base}`,
  (base: string) => `Get ${base}`,
  (base: string) => `Give me ${base}`,
  (base: string) => `Provide ${base}`,
  (base: string) => `Can I see ${base}?`,
  (base: string) => `Can I view ${base}?`,
  (base: string) => `Do you have ${base}?`,
  (base: string) => `What about ${base}?`,
  (base: string) => `Tell me more about ${base}`,
  (base: string) => `I'm interested in ${base}`,
  (base: string) => `I'd like to know about ${base}`,
  (base: string) => `I want to learn about ${base}`,
  (base: string) => `I need information about ${base}`,
  (base: string) => `Help me find ${base}`,
  (base: string) => `Guide me to ${base}`,
  (base: string) => `Direct me to ${base}`,
  (base: string) => `Take me to ${base}`,
  (base: string) => `Navigate to ${base}`,
];

// Modifier words to add variety
const modifiers = [
  '', // No modifier
  'please',
  'thanks',
  'thank you',
  'if possible',
  'if you can',
  'when you have time',
  'at your convenience',
];

// Common typos and variations
const typoVariations = (text: string): string[] => {
  const variations: string[] = [];
  const words = text.split(' ');
  
  // Common typos
  const typoMap: Record<string, string[]> = {
    'you': ['u', 'yu'],
    'your': ['ur', 'youre'],
    'are': ['r'],
    'the': ['teh', 'te'],
    'and': ['&', 'n'],
    'to': ['2'],
    'for': ['4'],
    'with': ['w/'],
  };
  
  words.forEach((word, index) => {
    const lowerWord = word.toLowerCase();
    if (typoMap[lowerWord]) {
      typoMap[lowerWord].forEach(typo => {
        const newWords = [...words];
        newWords[index] = typo;
        variations.push(newWords.join(' '));
      });
    }
  });
  
  return variations;
};

// Generate linguistic variations
function generateLinguisticVariations(text: string): string[] {
  const variations: string[] = [];
  const lowerText = text.toLowerCase();
  
  // Contractions
  if (lowerText.includes('i want')) {
    variations.push(text.replace(/i want/gi, 'I\'d like'));
    variations.push(text.replace(/i want/gi, 'I need'));
  }
  if (lowerText.includes('can you')) {
    variations.push(text.replace(/can you/gi, 'could you'));
    variations.push(text.replace(/can you/gi, 'will you'));
  }
  
  // Formal vs informal
  if (lowerText.includes('show me')) {
    variations.push(text.replace(/show me/gi, 'please show me'));
    variations.push(text.replace(/show me/gi, 'I would like to see'));
  }
  
  // Question variations
  if (text.endsWith('?')) {
    variations.push(text.slice(0, -1)); // Remove question mark
    variations.push(text.replace(/\?$/, ' please'));
  } else {
    variations.push(text + '?');
    variations.push(text + ' please');
  }
  
  return variations;
}

// Replace words with synonyms
function replaceWords(text: string, replacements: Record<string, string[]>): string[] {
  const variations: string[] = [];
  const words = text.toLowerCase().split(/\s+/);
  
  // Try two-word combinations first
  for (let i = 0; i < words.length - 1; i++) {
    const twoWord = `${words[i]} ${words[i + 1]}`;
    if (replacements[twoWord]) {
      for (const synonym of replacements[twoWord]) {
        const newText = text.toLowerCase().replace(new RegExp(twoWord, 'gi'), synonym);
        if (newText !== text.toLowerCase()) {
          variations.push(newText);
        }
      }
    }
  }
  
  // Try single words
  words.forEach((word, index) => {
    if (replacements[word]) {
      for (const synonym of replacements[word]) {
        const newText = text.toLowerCase().replace(new RegExp(`\\b${word}\\b`, 'gi'), synonym);
        if (newText !== text.toLowerCase()) {
          variations.push(newText);
        }
      }
    }
  });
  
  return [...new Set(variations)];
}

// Generate comprehensive variations for a test case
function generateVariations(testCase: TestCase, targetMultiplier: number = 100): TestCase[] {
  const variations: TestCase[] = [testCase]; // Include original
  const baseInput = testCase.input.toLowerCase();
  
  let generatedCount = 0;
  const maxVariations = Math.max(100, targetMultiplier); // At least 100 variations
  
  // 1. Synonym replacements
  const synonymVariations = replaceWords(baseInput, synonyms);
  synonymVariations.forEach((variation, index) => {
    if (variation !== baseInput && variation.length > 0 && generatedCount < maxVariations) {
      variations.push({
        ...testCase,
        id: `${testCase.id}-syn-${index + 1}`,
        input: variation.charAt(0).toUpperCase() + variation.slice(1),
      });
      generatedCount++;
    }
  });
  
  // 2. Question pattern variations
  const baseAction = baseInput.replace(/^(show me|tell me|I want to|I need to|I would like to|I'm looking for|what|where|how|can you|please)\s+/i, '');
  questionPatterns.forEach((pattern, index) => {
    if (generatedCount < maxVariations) {
      try {
        const variation = pattern(baseAction);
        if (variation !== baseInput && variation.length > 0) {
          variations.push({
            ...testCase,
            id: `${testCase.id}-q-${index + 1}`,
            input: variation.charAt(0).toUpperCase() + variation.slice(1),
          });
          generatedCount++;
        }
      } catch (e) {
        // Ignore errors
      }
    }
  });
  
  // 3. Linguistic variations
  const linguisticVariations = generateLinguisticVariations(testCase.input);
  linguisticVariations.forEach((variation, index) => {
    if (variation !== testCase.input && generatedCount < maxVariations) {
      variations.push({
        ...testCase,
        id: `${testCase.id}-ling-${index + 1}`,
        input: variation,
      });
      generatedCount++;
    }
  });
  
  // 4. Add/remove words
  const words = baseInput.split(/\s+/);
  if (words.length > 2) {
    // Remove one word
    for (let i = 0; i < words.length && generatedCount < maxVariations; i++) {
      if (words[i].length > 2) {
        const shortened = [...words];
        shortened.splice(i, 1);
        const variation = shortened.join(' ');
        if (variation.length > 0) {
          variations.push({
            ...testCase,
            id: `${testCase.id}-short-${i}`,
            input: variation.charAt(0).toUpperCase() + variation.slice(1),
          });
          generatedCount++;
        }
      }
    }
    
    // Add common words
    const addWords = ['please', 'thanks', 'thank you', 'I need', 'I want', 'I would like'];
    addWords.forEach((addWord, index) => {
      if (!baseInput.includes(addWord) && generatedCount < maxVariations) {
        variations.push({
          ...testCase,
          id: `${testCase.id}-add-${index}`,
          input: `${addWord} ${baseInput}`.charAt(0).toUpperCase() + `${addWord} ${baseInput}`.slice(1),
        });
        generatedCount++;
      }
    });
  }
  
  // 5. Typo variations (limited)
  if (generatedCount < maxVariations) {
    const typoVars = typoVariations(testCase.input);
    typoVars.slice(0, 5).forEach((typo, index) => {
      if (generatedCount < maxVariations) {
        variations.push({
          ...testCase,
          id: `${testCase.id}-typo-${index + 1}`,
          input: typo,
        });
        generatedCount++;
      }
    });
  }
  
  // 6. Capitalization variations
  if (generatedCount < maxVariations) {
    variations.push({
      ...testCase,
      id: `${testCase.id}-lower`,
      input: baseInput,
    });
    variations.push({
      ...testCase,
      id: `${testCase.id}-upper`,
      input: testCase.input.toUpperCase(),
    });
    generatedCount += 2;
  }
  
  // 7. If we haven't reached target, generate more combinations
  while (generatedCount < maxVariations && variations.length < maxVariations * 2) {
    // Combine existing variations with modifiers
    const existingVariation = variations[Math.floor(Math.random() * variations.length)];
    const modifier = modifiers[Math.floor(Math.random() * modifiers.length)];
    
    if (modifier && !existingVariation.input.toLowerCase().includes(modifier.toLowerCase())) {
      const newVariation = modifier 
        ? `${existingVariation.input} ${modifier}`
        : existingVariation.input;
      
      variations.push({
        ...testCase,
        id: `${testCase.id}-mod-${generatedCount}`,
        input: newVariation.charAt(0).toUpperCase() + newVariation.slice(1),
      });
      generatedCount++;
    } else {
      break; // Can't generate more unique variations
    }
  }
  
  return variations;
}

async function main() {
  const testCasesPath = join(__dirname, '../test-data/test-cases.json');
  const queryDataPath = join(__dirname, '../test-data/query-frequency.json');
  
  // Read existing test cases
  let testData: { testCases: TestCase[] };
  try {
    const fileContent = readFileSync(testCasesPath, 'utf-8');
    testData = JSON.parse(fileContent);
  } catch (error) {
    console.error('❌ Could not read test-cases.json');
    console.error(error);
    return;
  }
  
  // Read query frequency data if available (from real usage)
  let queryFrequencyData: { queries: Array<{ query: string; frequency: number; successRate: number; intent: string; flowId: string; targetUrl: string }> } | null = null;
  if (existsSync(queryDataPath)) {
    try {
      const queryContent = readFileSync(queryDataPath, 'utf-8');
      queryFrequencyData = JSON.parse(queryContent);
      console.log(`📊 Found ${queryFrequencyData.queries.length} real user queries to enhance data generation\n`);
    } catch (error) {
      console.log('⚠️  Could not read query-frequency.json, using only test cases\n');
    }
  }
  
  console.log(`📊 Generating 100x synthetic data from ${testData.testCases.length} original test cases...\n`);
  
  const allVariations: TestCase[] = [];
  
  // Generate variations for each test case
  testData.testCases.forEach((testCase) => {
    // Check if this test case has real usage data
    let frequency = 1;
    let successRate = 1.0;
    
    if (queryFrequencyData) {
      const matchingQuery = queryFrequencyData.queries.find(
        q => q.flowId === testCase.expectedFlow || q.targetUrl === testCase.expectedTargetUrl
      );
      if (matchingQuery) {
        frequency = matchingQuery.frequency;
        successRate = matchingQuery.successRate;
        // Higher frequency = generate more variations
        testCase.frequency = frequency;
        testCase.successRate = successRate;
      }
    }
    
    // Generate more variations for high-frequency queries
    const multiplier = Math.min(100, Math.max(50, frequency * 10)); // 50-100x based on frequency
    const variations = generateVariations(testCase, multiplier);
    allVariations.push(...variations);
    console.log(`✅ Generated ${variations.length} variations for: "${testCase.input}" (frequency: ${frequency}, success rate: ${(successRate * 100).toFixed(1)}%)`);
  });
  
  // If we have real query data, add those as well
  if (queryFrequencyData) {
    console.log(`\n📈 Adding ${queryFrequencyData.queries.length} real user queries...\n`);
    queryFrequencyData.queries.forEach((query, index) => {
      const testCase: TestCase = {
        id: `real-query-${index + 1}`,
        input: query.query,
        expectedIntent: query.intent,
        expectedTargetUrl: query.targetUrl,
        expectedFlow: query.flowId,
        tags: ['real-usage', 'high-frequency'],
        frequency: query.frequency,
        successRate: query.successRate,
      };
      
      // Generate variations for real queries too (but fewer, since they're already real)
      const variations = generateVariations(testCase, Math.min(20, query.frequency));
      allVariations.push(...variations);
      console.log(`✅ Added ${variations.length} variations for real query: "${query.query}" (frequency: ${query.frequency})`);
    });
  }
  
  // Remove duplicates based on normalized input
  const uniqueVariations = Array.from(
    new Map(allVariations.map(tc => [tc.input.toLowerCase().trim(), tc])).values()
  );
  
  // Sort by frequency and success rate (highest priority first)
  uniqueVariations.sort((a, b) => {
    const priorityA = (a.frequency || 1) * (a.successRate || 1.0);
    const priorityB = (b.frequency || 1) * (b.successRate || 1.0);
    return priorityB - priorityA;
  });
  
  const originalCount = testData.testCases.length;
  const expansionFactor = (uniqueVariations.length / originalCount).toFixed(1);
  
  console.log(`\n📈 Total variations generated: ${allVariations.length}`);
  console.log(`✨ Unique variations: ${uniqueVariations.length}`);
  console.log(`📊 Expansion factor: ${expansionFactor}x\n`);
  
  // Save to new file
  const outputPath = join(__dirname, '../test-data/test-cases-100x-synthetic.json');
  const output = {
    testCases: uniqueVariations,
    metadata: {
      originalCount,
      syntheticCount: uniqueVariations.length,
      expansionFactor,
      generatedAt: new Date().toISOString(),
      includesRealQueries: queryFrequencyData !== null,
      realQueryCount: queryFrequencyData?.queries.length || 0,
    },
  };
  
  writeFileSync(outputPath, JSON.stringify(output, null, 2));
  console.log(`💾 100x synthetic test data saved to: test-data/test-cases-100x-synthetic.json\n`);
  console.log(`💡 Tip: Use this file with test-model.ts to test your AI navigation model!\n`);
  console.log(`💡 Tip: Export real query data using: npx tsx scripts/export-query-data.ts\n`);
}

main().catch(console.error);

