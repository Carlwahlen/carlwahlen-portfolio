#!/usr/bin/env node
/**
 * Test Model Script
 * 
 * Kör alla testfall mot AI Navigation API:et och rapporterar resultat.
 * 
 * Usage: npx tsx scripts/test-model.ts
 */

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const API_URL = process.env.API_URL || 'http://localhost:3010';

interface TestCase {
  id: string;
  input: string;
  expectedIntent: string;
  expectedTargetUrl: string;
  expectedFlow: string;
  tags: string[];
}

interface TestResult {
  testCase: TestCase;
  actualIntent?: string;
  actualTargetUrl?: string;
  actualFlow?: string;
  passed: boolean;
  confidence?: number;
  error?: string;
}

async function testModel() {
  console.log('🧪 Testing AI Navigation Model...\n');
  console.log(`API URL: ${API_URL}\n`);

  // Läs testdata
  const testDataPath = join(__dirname, '../test-data/test-cases.json');
  const testData = JSON.parse(readFileSync(testDataPath, 'utf-8'));

  const results: TestResult[] = [];

  for (const testCase of testData.testCases) {
    try {
      // Anropa API:et
      const response = await fetch(`${API_URL}/v1/navigate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tenantId: 'demo-tax-agency',
          input: testCase.input,
          language: 'en',
          userContext: {
            loggedIn: false,
            device: 'desktop',
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json();

      const result: TestResult = {
        testCase,
        actualIntent: data.intent,
        actualTargetUrl: data.targetUrl,
        passed:
          data.intent === testCase.expectedIntent &&
          data.targetUrl === testCase.expectedTargetUrl,
        confidence: data.confidence,
      };

      results.push(result);

      // Visa progress
      const icon = result.passed ? '✅' : '❌';
      console.log(`${icon} ${testCase.id}: "${testCase.input}"`);
    } catch (error) {
      const result: TestResult = {
        testCase,
        passed: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
      results.push(result);
      console.log(`❌ ${testCase.id}: ERROR - ${result.error}`);
    }
  }

  // Analysera resultat
  const passed = results.filter(r => r.passed).length;
  const failed = results.filter(r => !r.passed).length;
  const successRate = (passed / results.length) * 100;

  console.log(`\n📊 Test Results:`);
  console.log(`✅ Passed: ${passed}/${results.length}`);
  console.log(`❌ Failed: ${failed}/${results.length}`);
  console.log(`📈 Success rate: ${successRate.toFixed(1)}%\n`);

  // Visa misslyckade testfall
  const failures = results.filter(r => !r.passed);
  if (failures.length > 0) {
    console.log('❌ Failed test cases:\n');
    failures.forEach(f => {
      console.log(`  ${f.testCase.id}: "${f.testCase.input}"`);
      if (f.error) {
        console.log(`    Error: ${f.error}\n`);
      } else {
        console.log(`    Expected: ${f.testCase.expectedIntent} → ${f.testCase.expectedTargetUrl}`);
        console.log(`    Got:      ${f.actualIntent || 'N/A'} → ${f.actualTargetUrl || 'N/A'}`);
        console.log(`    Confidence: ${f.confidence?.toFixed(2) || 'N/A'}\n`);
      }
    });
  }

  // Visa confidence-statistik
  const confidences = results
    .filter(r => r.confidence !== undefined)
    .map(r => r.confidence!);
  
  if (confidences.length > 0) {
    const avgConfidence = confidences.reduce((a, b) => a + b, 0) / confidences.length;
    const minConfidence = Math.min(...confidences);
    const maxConfidence = Math.max(...confidences);
    
    console.log('📊 Confidence Statistics:');
    console.log(`   Average: ${avgConfidence.toFixed(2)}`);
    console.log(`   Min: ${minConfidence.toFixed(2)}`);
    console.log(`   Max: ${maxConfidence.toFixed(2)}\n`);
  }

  // Spara resultat
  const resultData = {
    timestamp: new Date().toISOString(),
    totalTests: results.length,
    passed,
    failed,
    successRate,
    results,
  };

  const outputPath = join(__dirname, '../test-data/test-results.json');
  const fs = await import('fs/promises');
  await fs.writeFile(outputPath, JSON.stringify(resultData, null, 2));
  console.log(`💾 Results saved to: test-data/test-results.json\n`);

  return results;
}

testModel().catch(console.error);

