/**
 * Query Repository - tracks user queries for analytics and priority-based matching
 * 
 * This repository stores query frequency data to enable:
 * - Priority-based matching (most common queries matched first)
 * - Analytics on what users actually search for
 * - Data-driven synthetic data generation
 */

interface QueryLog {
  id: string;
  query: string;
  normalizedQuery: string; // Lowercased, trimmed for grouping
  intent: string;
  flowId: string;
  targetUrl: string;
  tenantId: string;
  sessionId?: string;
  timestamp: Date;
  success: boolean; // Whether navigation was successful (from feedback)
}

interface QueryFrequency {
  normalizedQuery: string;
  count: number;
  intent: string;
  flowId: string;
  targetUrl: string;
  lastUsed: Date;
  successRate: number; // Percentage of successful navigations
}

// In-memory storage (in production, use database)
const queryLogs = new Map<string, QueryLog>();
const queryFrequency = new Map<string, QueryFrequency>();

class QueryRepository {
  /**
   * Log a user query
   */
  async logQuery(params: {
    query: string;
    intent: string;
    flowId: string;
    targetUrl: string;
    tenantId: string;
    sessionId?: string;
    success?: boolean;
  }): Promise<QueryLog> {
    const normalizedQuery = params.query.toLowerCase().trim();
    const logId = `query-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const log: QueryLog = {
      id: logId,
      query: params.query,
      normalizedQuery,
      intent: params.intent,
      flowId: params.flowId,
      targetUrl: params.targetUrl,
      tenantId: params.tenantId,
      sessionId: params.sessionId,
      timestamp: new Date(),
      success: params.success ?? true, // Default to true if not specified
    };
    
    queryLogs.set(logId, log);
    
    // Update frequency map
    const existing = queryFrequency.get(normalizedQuery);
    if (existing) {
      existing.count += 1;
      existing.lastUsed = new Date();
      // Update success rate (simple moving average)
      const totalSuccesses = existing.successRate * (existing.count - 1) + (params.success ? 1 : 0);
      existing.successRate = totalSuccesses / existing.count;
    } else {
      queryFrequency.set(normalizedQuery, {
        normalizedQuery,
        count: 1,
        intent: params.intent,
        flowId: params.flowId,
        targetUrl: params.targetUrl,
        lastUsed: new Date(),
        successRate: params.success ? 1.0 : 0.0,
      });
    }
    
    return log;
  }
  
  /**
   * Get query frequency statistics
   */
  async getQueryFrequency(limit: number = 100): Promise<QueryFrequency[]> {
    return Array.from(queryFrequency.values())
      .sort((a, b) => {
        // Sort by count (frequency) first, then by success rate
        if (b.count !== a.count) {
          return b.count - a.count;
        }
        return b.successRate - a.successRate;
      })
      .slice(0, limit);
  }
  
  /**
   * Get frequency for a specific normalized query
   */
  async getFrequencyForQuery(normalizedQuery: string): Promise<QueryFrequency | null> {
    return queryFrequency.get(normalizedQuery) || null;
  }
  
  /**
   * Get all queries for a specific flow
   */
  async getQueriesForFlow(flowId: string, limit: number = 50): Promise<QueryFrequency[]> {
    return Array.from(queryFrequency.values())
      .filter(q => q.flowId === flowId)
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);
  }
  
  /**
   * Get all query logs (for analytics)
   */
  async getAllLogs(limit: number = 1000): Promise<QueryLog[]> {
    return Array.from(queryLogs.values())
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
  }
  
  /**
   * Update success status for a query (from feedback)
   */
  async updateQuerySuccess(normalizedQuery: string, success: boolean): Promise<void> {
    const frequency = queryFrequency.get(normalizedQuery);
    if (frequency) {
      // Recalculate success rate
      const totalSuccesses = frequency.successRate * frequency.count;
      frequency.successRate = (totalSuccesses + (success ? 1 : 0)) / (frequency.count + 1);
      frequency.count += 1; // Increment count for the feedback
    }
  }
  
  /**
   * Export query data for synthetic data generation
   */
  async exportForSyntheticGeneration(): Promise<{
    queries: Array<{
      query: string;
      intent: string;
      flowId: string;
      targetUrl: string;
      frequency: number;
      successRate: number;
    }>;
  }> {
    const frequencies = await this.getQueryFrequency(1000);
    return {
      queries: frequencies.map(f => ({
        query: f.normalizedQuery,
        intent: f.intent,
        flowId: f.flowId,
        targetUrl: f.targetUrl,
        frequency: f.count,
        successRate: f.successRate,
      })),
    };
  }
}

export const queryRepository = new QueryRepository();

