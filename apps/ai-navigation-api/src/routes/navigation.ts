/**
 * Navigation routes
 */

import { Router, type Request, type Response, type NextFunction } from 'express';
import { navigationService } from '../services/navigationService.js';
import type { NavigateRequest, ContinueRequest } from '@carlwahlen/shared-types';

export const navigationRouter: Router = Router();

/**
 * POST /v1/navigate
 * Main navigation endpoint
 */
navigationRouter.post('/', async (req, res, next) => {
  try {
    const body: NavigateRequest = req.body;
    const result = await navigationService.navigate(body);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

/**
 * POST /v1/navigate/continue
 * Continue navigation after an event
 */
navigationRouter.post('/continue', async (req, res, next) => {
  try {
    const body: ContinueRequest = req.body;
    const result = await navigationService.continue(body);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

