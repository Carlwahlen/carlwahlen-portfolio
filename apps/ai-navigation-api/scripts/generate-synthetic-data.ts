#!/usr/bin/env node
/**
 * Generate Synthetic Test Data
 * 
 * Genererar 10x mer syntetisk testdata baserat på befintliga testfall.
 * Använder variationer, synonymer och olika formuleringar.
 * 
 * Usage: npx tsx scripts/generate-synthetic-data.ts
 */

import { readFileSync, writeFileSync } from 'fs';
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
}

// Synonymer och variationer för vanliga ord
const synonyms: Record<string, string[]> = {
  'show': ['display', 'see', 'view', 'find', 'get', 'bring up', 'open'],
  'me': ['us', 'I', 'we'],
  'your': ['your', 'his', 'the'],
  'case studies': ['case studies', 'cases', 'work', 'projects', 'portfolio', 'examples', 'projects you\'ve done'],
  'contact': ['contact', 'reach out', 'get in touch', 'email', 'message', 'call', 'speak with'],
  'services': ['services', 'offerings', 'what you do', 'capabilities', 'expertise', 'skills'],
  'about': ['about', 'background', 'who you are', 'experience', 'bio'],
  'tell me': ['tell me', 'show me', 'explain', 'describe', 'what is', 'what are'],
  'want': ['want', 'need', 'would like', 'looking for', 'seeking'],
  'you': ['you', 'he', 'your company'],
  'offer': ['offer', 'provide', 'do', 'deliver', 'give'],
  'help': ['help', 'assist', 'support', 'aid'],
  'can': ['can', 'could', 'are able to', 'will'],
  'what': ['what', 'which', 'tell me about'],
  'who': ['who', 'which companies', 'what companies'],
  'work': ['work', 'projects', 'cases', 'examples'],
  'email': ['email', 'e-mail', 'email address', 'mail'],
  'address': ['address', 'contact details', 'info', 'information'],
};

// Frågeformuleringar
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
];

// Svenska variationer
const swedishVariations: Record<string, string[]> = {
  'show me your case studies': [
    'visa dina case studies',
    'visa dina projekt',
    'visa ditt arbete',
    'visa exempel på ditt arbete',
    'jag vill se dina projekt',
  ],
  'I want to contact you': [
    'jag vill kontakta dig',
    'jag vill prata med dig',
    'jag vill höra av mig',
    'kontakta dig',
    'hur når jag dig',
  ],
  'what services do you offer': [
    'vilka tjänster erbjuder du',
    'vad erbjuder du',
    'vad kan du hjälpa till med',
    'vilka tjänster har du',
  ],
};

function replaceWords(text: string, replacements: Record<string, string[]>): string[] {
  const variations: string[] = [];
  const words = text.toLowerCase().split(/\s+/);
  
  // Försök ersätta varje ord med synonymer
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const nextWord = words[i + 1];
    const twoWord = nextWord ? `${word} ${nextWord}` : null;
    
    // Kolla två-ord kombinationer först
    if (twoWord && replacements[twoWord]) {
      for (const synonym of replacements[twoWord]) {
        const newText = text.toLowerCase().replace(new RegExp(twoWord, 'gi'), synonym);
        if (newText !== text.toLowerCase()) {
          variations.push(newText);
        }
      }
    }
    
    // Kolla enkla ord
    if (replacements[word]) {
      for (const synonym of replacements[word]) {
        const newText = text.toLowerCase().replace(new RegExp(`\\b${word}\\b`, 'gi'), synonym);
        if (newText !== text.toLowerCase()) {
          variations.push(newText);
        }
      }
    }
  }
  
  return [...new Set(variations)]; // Ta bort duplicater
}

function generateVariations(testCase: TestCase): TestCase[] {
  const variations: TestCase[] = [testCase]; // Inkludera originalet
  
  const baseInput = testCase.input.toLowerCase();
  
  // 1. Synonymer
  const synonymVariations = replaceWords(baseInput, synonyms);
  synonymVariations.forEach((variation, index) => {
    if (variation !== baseInput && variation.length > 0) {
      variations.push({
        ...testCase,
        id: `${testCase.id}-syn-${index + 1}`,
        input: variation.charAt(0).toUpperCase() + variation.slice(1),
      });
    }
  });
  
  // 2. Frågeformuleringar
  const baseAction = baseInput.replace(/^(show me|tell me|I want to|I need to|I would like to|I'm looking for|what|where|how|can you|please)\s+/i, '');
  questionPatterns.forEach((pattern, index) => {
    try {
      const variation = pattern(baseAction);
      if (variation !== baseInput && variation.length > 0) {
        variations.push({
          ...testCase,
          id: `${testCase.id}-q-${index + 1}`,
          input: variation.charAt(0).toUpperCase() + variation.slice(1),
        });
      }
    } catch (e) {
      // Ignorera fel
    }
  });
  
  // 3. Svenska variationer (om det finns)
  if (swedishVariations[baseInput]) {
    swedishVariations[baseInput].forEach((swedish, index) => {
      variations.push({
        ...testCase,
        id: `${testCase.id}-sv-${index + 1}`,
        input: swedish,
      });
    });
  }
  
  // 4. Lägg till/tar bort ord
  const words = baseInput.split(/\s+/);
  if (words.length > 2) {
    // Ta bort ett ord
    for (let i = 0; i < words.length; i++) {
      if (words[i].length > 2) { // Ta inte bort korta ord
        const shortened = [...words];
        shortened.splice(i, 1);
        const variation = shortened.join(' ');
        if (variation.length > 0) {
          variations.push({
            ...testCase,
            id: `${testCase.id}-short-${i}`,
            input: variation.charAt(0).toUpperCase() + variation.slice(1),
          });
        }
      }
    }
  }
  
  // 5. Lägg till vanliga ord
  const addWords = ['please', 'thanks', 'thank you', 'I need', 'I want'];
  addWords.forEach((addWord, index) => {
    if (!baseInput.includes(addWord)) {
      variations.push({
        ...testCase,
        id: `${testCase.id}-add-${index}`,
        input: `${addWord} ${baseInput}`.charAt(0).toUpperCase() + `${addWord} ${baseInput}`.slice(1),
      });
    }
  });
  
  return variations;
}

async function main() {
  const testCasesPath = join(__dirname, '../test-data/test-cases.json');
  
  // Läs befintliga testfall
  let testData: { testCases: TestCase[] };
  try {
    const fileContent = readFileSync(testCasesPath, 'utf-8');
    testData = JSON.parse(fileContent);
  } catch (error) {
    console.error('❌ Could not read test-cases.json');
    console.error(error);
    return;
  }
  
  console.log(`📊 Generating synthetic data from ${testData.testCases.length} original test cases...\n`);
  
  const allVariations: TestCase[] = [];
  
  // Generera variationer för varje testfall
  testData.testCases.forEach((testCase) => {
    const variations = generateVariations(testCase);
    allVariations.push(...variations);
    console.log(`✅ Generated ${variations.length} variations for: "${testCase.input}"`);
  });
  
  // Ta bort duplicater baserat på input
  const uniqueVariations = Array.from(
    new Map(allVariations.map(tc => [tc.input.toLowerCase(), tc])).values()
  );
  
  const originalCount = testData.testCases.length;
  const expansionFactor = (uniqueVariations.length / originalCount).toFixed(1);
  
  console.log(`\n📈 Total variations generated: ${allVariations.length}`);
  console.log(`✨ Unique variations: ${uniqueVariations.length}`);
  console.log(`📊 Expansion factor: ${expansionFactor}x\n`);
  
  // Spara till ny fil
  const outputPath = join(__dirname, '../test-data/test-cases-synthetic.json');
  const output = {
    testCases: uniqueVariations,
    metadata: {
      originalCount,
      syntheticCount: uniqueVariations.length,
      expansionFactor,
      generatedAt: new Date().toISOString(),
    },
  };
  
  writeFileSync(outputPath, JSON.stringify(output, null, 2));
  console.log(`💾 Synthetic test data saved to: test-data/test-cases-synthetic.json\n`);
  console.log(`💡 Tip: Use this file with test-model.ts to test your AI navigation model!\n`);
}

main().catch(console.error);

