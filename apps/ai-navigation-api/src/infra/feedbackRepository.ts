/**
 * Feedback repository - in-memory implementation for dev
 * 
 * EXTRACTION NOTE: Replace with actual database implementation (PostgreSQL, etc.)
 * when moving to production. This interface should remain the same.
 */

interface Feedback {
  id: string;
  sessionId: string;
  useful: boolean;
  reason?: string;
  correctUrl?: string;
  createdAt: Date;
}

// In-memory store for development
// TODO: Replace with database (PostgreSQL, etc.)
const feedbacks = new Map<string, Feedback>();

class FeedbackRepository {
  async create(data: {
    sessionId: string;
    useful: boolean;
    reason?: string;
    correctUrl?: string;
  }): Promise<Feedback> {
    const feedback: Feedback = {
      id: `feedback-${Date.now()}-${Math.random()}`,
      sessionId: data.sessionId,
      useful: data.useful,
      reason: data.reason,
      correctUrl: data.correctUrl,
      createdAt: new Date(),
    };

    feedbacks.set(feedback.id, feedback);
    return feedback;
  }

  async getBySession(sessionId: string): Promise<Feedback[]> {
    return Array.from(feedbacks.values()).filter(f => f.sessionId === sessionId);
  }
}

export const feedbackRepository = new FeedbackRepository();

