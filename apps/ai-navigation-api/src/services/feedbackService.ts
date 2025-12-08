/**
 * Feedback service
 */

import type { FeedbackRequest, FeedbackResponse } from '@carlwahlen/shared-types';
import { feedbackRepository } from '../infra/feedbackRepository.js';
import { queryRepository } from '../infra/queryRepository.js';

class FeedbackService {
  async recordFeedback(request: FeedbackRequest): Promise<FeedbackResponse> {
    await feedbackRepository.create({
      sessionId: request.sessionId,
      useful: request.useful,
      reason: request.reason,
      correctUrl: request.correctUrl,
    });

    // Update query success rate if we have the original query
    // This helps improve priority-based matching
    // Note: In a production system, you'd store the query with the session
    // For now, we'll extract it from the reason if it was logged there
    if (request.reason && request.reason.includes('query:')) {
      const queryMatch = request.reason.match(/query:\s*"([^"]+)"/);
      if (queryMatch) {
        const normalizedQuery = queryMatch[1].toLowerCase().trim();
        const success = request.useful === true; // Useful = successful navigation
        await queryRepository.updateQuerySuccess(normalizedQuery, success).catch(err => {
          console.error('Failed to update query success:', err);
        });
      }
    }

    return { success: true };
  }
}

export const feedbackService = new FeedbackService();

