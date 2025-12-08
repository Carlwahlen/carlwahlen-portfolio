/**
 * Feedback routes
 */

import { Router, type Request, type Response, type NextFunction } from 'express';
import { feedbackService } from '../services/feedbackService.js';
import type { FeedbackRequest } from '@carlwahlen/shared-types';

export const feedbackRouter: Router = Router();

/**
 * POST /v1/feedback
 * Collect user feedback
 */
feedbackRouter.post('/', async (req, res, next) => {
  try {
    const body: FeedbackRequest = req.body;
    const result = await feedbackService.recordFeedback(body);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

