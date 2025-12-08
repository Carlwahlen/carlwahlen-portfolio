/**
 * Query Analytics Routes
 * 
 * API endpoints for viewing query analytics and user input data.
 * 
 * NOTE: In production, add authentication/authorization to protect this data.
 */

import { Router, type Request, type Response, type NextFunction } from 'express';
import { queryService } from '../services/queryService.js';

export const queriesRouter: Router = Router();

/**
 * GET /v1/queries
 * Get all queries with frequency and success rate
 * 
 * Query params:
 * - limit: number (default: 100)
 * - flowId: string (filter by flow)
 */
queriesRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const limit = parseInt(req.query.limit as string) || 100;
    const flowId = req.query.flowId as string | undefined;
    
    let queries;
    if (flowId) {
      queries = await queryService.getQueriesForFlow(flowId, limit);
    } else {
      queries = await queryService.getTopQueries(limit);
    }
    
    res.json({
      success: true,
      data: queries,
      count: queries.length,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /v1/queries/export
 * Export all query data for synthetic data generation
 */
queriesRouter.get('/export', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const exportData = await queryService.exportForSyntheticGeneration();
    
    res.json({
      success: true,
      data: exportData,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /v1/queries/stats
 * Get query statistics
 */
queriesRouter.get('/stats', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const queries = await queryService.getTopQueries(1000);
    
    const totalQueries = queries.reduce((sum, q) => sum + q.count, 0);
    const avgSuccessRate = queries.length > 0
      ? queries.reduce((sum, q) => sum + q.successRate, 0) / queries.length
      : 0;
    
    // Group by flow
    const flowStats: Record<string, number> = {};
    queries.forEach(q => {
      flowStats[q.flowId] = (flowStats[q.flowId] || 0) + q.count;
    });
    
    res.json({
      success: true,
      stats: {
        totalUniqueQueries: queries.length,
        totalQueries,
        averageSuccessRate: avgSuccessRate,
        flowDistribution: flowStats,
        topQueries: queries.slice(0, 10).map(q => ({
          query: q.normalizedQuery,
          frequency: q.count,
          successRate: q.successRate,
          flowId: q.flowId,
        })),
      },
    });
  } catch (error) {
    next(error);
  }
});

