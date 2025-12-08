#!/usr/bin/env node
/**
 * View All User Queries
 * 
 * Shows all queries that users have typed into the AI Navigation system,
 * including frequency, success rate, and associated flows.
 * 
 * Usage: npx tsx scripts/view-queries.ts
 */

import { queryRepository } from '../src/infra/queryRepository.js';

async function main() {
  console.log('📊 Fetching all user queries...\n');
  
  try {
    // Get all query logs (raw data)
    const allLogs = await queryRepository.getAllLogs(1000);
    
    // Get query frequency statistics
    const frequencies = await queryRepository.getQueryFrequency(1000);
    
    console.log(`📈 Total unique queries: ${frequencies.length}`);
    console.log(`📝 Total query logs: ${allLogs.length}\n`);
    
    if (frequencies.length === 0) {
      console.log('ℹ️  No queries found yet. Queries will be tracked automatically when users use the AI Navigation system.\n');
      return;
    }
    
    // Show top queries by frequency
    console.log('🔝 Top 20 Queries by Frequency:\n');
    console.log('─'.repeat(80));
    frequencies.slice(0, 20).forEach((q, index) => {
      const successEmoji = q.successRate >= 0.8 ? '✅' : q.successRate >= 0.5 ? '⚠️' : '❌';
      console.log(`${(index + 1).toString().padStart(2)}. ${successEmoji} "${q.normalizedQuery}"`);
      console.log(`    Frequency: ${q.count} | Success: ${(q.successRate * 100).toFixed(1)}% | Flow: ${q.flowId} | URL: ${q.targetUrl}`);
      console.log(`    Last used: ${q.lastUsed.toISOString()}`);
      console.log('');
    });
    
    // Show all unique queries
    console.log('\n📋 All Unique Queries (sorted by frequency):\n');
    console.log('─'.repeat(80));
    frequencies.forEach((q, index) => {
      const successEmoji = q.successRate >= 0.8 ? '✅' : q.successRate >= 0.5 ? '⚠️' : '❌';
      console.log(`${(index + 1).toString().padStart(3)}. ${successEmoji} "${q.normalizedQuery}" (${q.count}x, ${(q.successRate * 100).toFixed(1)}% success)`);
    });
    
    // Show raw query logs (exact text users typed)
    console.log('\n\n📝 Raw Query Logs (exact text users typed):\n');
    console.log('─'.repeat(80));
    allLogs.slice(0, 50).forEach((log, index) => {
      console.log(`${(index + 1).toString().padStart(3)}. "${log.query}"`);
      console.log(`    Intent: ${log.intent} | Flow: ${log.flowId} | URL: ${log.targetUrl}`);
      console.log(`    Session: ${log.sessionId || 'N/A'} | Time: ${log.timestamp.toISOString()}`);
      console.log(`    Success: ${log.success ? '✅' : '❌'}`);
      console.log('');
    });
    
    if (allLogs.length > 50) {
      console.log(`\n... and ${allLogs.length - 50} more queries (showing first 50)\n`);
    }
    
    // Statistics
    console.log('\n📊 Statistics:\n');
    const totalQueries = frequencies.reduce((sum, q) => sum + q.count, 0);
    const avgSuccessRate = frequencies.reduce((sum, q) => sum + q.successRate, 0) / frequencies.length;
    const topFlow = frequencies.reduce((top, q) => 
      frequencies.filter(f => f.flowId === q.flowId).length > 
      frequencies.filter(f => f.flowId === top.flowId).length ? q : top
    );
    
    console.log(`Total queries: ${totalQueries}`);
    console.log(`Unique queries: ${frequencies.length}`);
    console.log(`Average success rate: ${(avgSuccessRate * 100).toFixed(1)}%`);
    console.log(`Most common flow: ${topFlow.flowId} (${frequencies.filter(f => f.flowId === topFlow.flowId).length} unique queries)`);
    console.log('');
    
    // Export option
    console.log('💡 Tip: Run "npm run export-queries" to export this data for synthetic data generation\n');
    
  } catch (error) {
    console.error('❌ Failed to fetch queries:', error);
    console.error('\n💡 Make sure the AI Navigation API has been used so there is query data.\n');
  }
}

main().catch(console.error);

