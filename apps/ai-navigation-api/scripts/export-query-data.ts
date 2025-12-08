#!/usr/bin/env node
/**
 * Export Query Data for Synthetic Data Generation
 * 
 * Exports real user query frequency data to be used for generating
 * 100x synthetic data that prioritizes common queries.
 * 
 * Usage: npx tsx scripts/export-query-data.ts
 */

import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Import queryService - note: this requires the API to be running or we need to import directly
// For now, we'll import the repository directly
import { queryRepository } from '../src/infra/queryRepository.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function main() {
  console.log('📊 Exporting query frequency data...\n');
  
  try {
    const queryData = await queryRepository.exportForSyntheticGeneration();
    
    const outputPath = join(__dirname, '../test-data/query-frequency.json');
    const output = {
      ...queryData,
      metadata: {
        exportedAt: new Date().toISOString(),
        totalQueries: queryData.queries.length,
      },
    };
    
    writeFileSync(outputPath, JSON.stringify(output, null, 2));
    
    console.log(`✅ Exported ${queryData.queries.length} queries to: test-data/query-frequency.json\n`);
    console.log(`💡 This data will be used by generate-100x-synthetic-data.ts to prioritize common queries\n`);
    
    // Show top 10 queries
    if (queryData.queries.length > 0) {
      console.log('📈 Top 10 queries by frequency:\n');
      queryData.queries.slice(0, 10).forEach((q, index) => {
        console.log(`  ${index + 1}. "${q.query}" (frequency: ${q.frequency}, success: ${(q.successRate * 100).toFixed(1)}%)`);
      });
      console.log('');
    }
  } catch (error) {
    console.error('❌ Failed to export query data:', error);
    console.error('\n💡 Make sure the AI Navigation API has been used so there is query data to export.\n');
  }
}

main().catch(console.error);

