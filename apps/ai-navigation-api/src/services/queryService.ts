/**
 * Query Service - handles query tracking and analytics
 */

import { queryRepository } from '../infra/queryRepository.js';

class QueryService {
  /**
   * Track a navigation query
   */
  async trackQuery(params: {
    query: string;
    intent: string;
    flowId: string;
    targetUrl: string;
    tenantId: string;
    sessionId?: string;
    success?: boolean;
  }): Promise<void> {
    await queryRepository.logQuery(params);
  }
  
  /**
   * Get top queries by frequency
   */
  async getTopQueries(limit: number = 100) {
    return await queryRepository.getQueryFrequency(limit);
  }
  
  /**
   * Get query frequency for a specific query (for priority matching)
   */
  async getQueryPriority(normalizedQuery: string): Promise<number> {
    const frequency = await queryRepository.getFrequencyForQuery(normalizedQuery);
    if (!frequency) return 0;
    
    // Priority score = frequency * success rate
    // Higher frequency and success rate = higher priority
    return frequency.count * frequency.successRate;
  }
  
  /**
   * Get queries for a specific flow
   */
  async getQueriesForFlow(flowId: string, limit: number = 50) {
    return await queryRepository.getQueriesForFlow(flowId, limit);
  }
  
  /**
   * Export query data for synthetic data generation
   */
  async exportForSyntheticGeneration() {
    return await queryRepository.exportForSyntheticGeneration();
  }
}

export const queryService = new QueryService();

