/**
 * Session repository - in-memory implementation for dev
 * 
 * EXTRACTION NOTE: Replace with actual database implementation (PostgreSQL, etc.)
 * when moving to production. This interface should remain the same.
 */

import { v4 as uuidv4 } from 'uuid';
import type { UserContext } from '@carlwahlen/shared-types';

interface Session {
  id: string;
  tenantId: string;
  currentFlowId?: string;
  currentStepId?: string;
  context: UserContext;
  startedAt: Date;
  lastActivityAt: Date;
  completed: boolean;
}

// In-memory store for development
// TODO: Replace with database (PostgreSQL, etc.)
const sessions = new Map<string, Session>();

class SessionRepository {
  async create(data: { tenantId: string; context: UserContext }): Promise<Session> {
    const session: Session = {
      id: uuidv4(),
      tenantId: data.tenantId,
      context: data.context,
      startedAt: new Date(),
      lastActivityAt: new Date(),
      completed: false,
    };

    sessions.set(session.id, session);
    return session;
  }

  async getById(id: string): Promise<Session | null> {
    return sessions.get(id) || null;
  }

  async update(id: string, updates: Partial<Session>): Promise<Session> {
    const session = sessions.get(id);
    if (!session) {
      throw new Error('Session not found');
    }

    const updated = { ...session, ...updates };
    sessions.set(id, updated);
    return updated;
  }

  async getByTenant(tenantId: string): Promise<Session[]> {
    return Array.from(sessions.values()).filter(s => s.tenantId === tenantId);
  }
}

export const sessionRepository = new SessionRepository();

