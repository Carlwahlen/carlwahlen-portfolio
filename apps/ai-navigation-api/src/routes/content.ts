/**
 * Content indexing routes
 */

import { Router, type Request, type Response, type NextFunction } from 'express';
import { contentService } from '../services/contentService.js';
import type { IndexContentRequest } from '@carlwahlen/shared-types';

export const contentRouter: Router = Router();

/**
 * POST /v1/content/index
 * Index content items for a tenant
 */
contentRouter.post('/index', async (req, res, next) => {
  try {
    const body: IndexContentRequest = req.body;
    const result = await contentService.indexContent(body);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

