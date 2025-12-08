/**
 * AI Navigation API Server
 * 
 * Standalone Express server for the AI navigation engine.
 * 
 * EXTRACTION NOTE: This entire app can be moved to a separate repository.
 * Just ensure packages/navigation-core and packages/shared-types are available
 * (either as workspace dependencies or published npm packages).
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { navigationRouter } from './routes/navigation.js';
import { feedbackRouter } from './routes/feedback.js';
import { contentRouter } from './routes/content.js';
import { queriesRouter } from './routes/queries.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3010;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'ai-navigation-api' });
});

// API routes
app.use('/v1/navigate', navigationRouter);
app.use('/v1/feedback', feedbackRouter);
app.use('/v1/content', contentRouter);
app.use('/v1/queries', queriesRouter);

// Error handling middleware
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`AI Navigation API server running on http://0.0.0.0:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Accessible from network at: http://<your-ip>:${PORT}`);
});

