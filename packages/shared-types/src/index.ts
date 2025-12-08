/**
 * Shared types for API contracts between portfolio frontend and AI navigation API.
 * 
 * EXTRACTION NOTE: When moving to separate SaaS repo, this package can be published
 * as an npm package or kept as a shared dependency between frontend and backend.
 */

// API Request/Response DTOs
export interface NavigateRequest {
  tenantId: string;
  sessionId?: string;
  input: string;
  language?: string;
  userContext?: UserContext;
  currentUrl?: string;
  trackQuery?: boolean; // GDPR: Only track if user has consented to analytics cookies
}

export interface NavigateResponse {
  sessionId: string;
  intent?: string;
  nextStep?: StepInfo;
  targetUrl?: string;
  assistantMessage: string;
  confidence?: number;
}

export interface ContinueRequest {
  sessionId: string;
  event: SessionEvent;
  metadata?: Record<string, unknown>;
}

export interface ContinueResponse {
  nextStep?: StepInfo;
  targetUrl?: string;
  assistantMessage?: string;
  flowCompleted?: boolean;
}

export interface FeedbackRequest {
  sessionId: string;
  useful: boolean;
  reason?: string;
  correctUrl?: string;
}

export interface FeedbackResponse {
  success: boolean;
}

export interface IndexContentRequest {
  tenantId: string;
  contentItems: ContentItemDTO[];
}

export interface IndexContentResponse {
  success: boolean;
  indexedCount: number;
}

// DTOs
export interface UserContext {
  loggedIn?: boolean;
  userType?: string;
  device?: 'mobile' | 'tablet' | 'desktop';
  language?: string;
  [key: string]: unknown;
}

export interface StepInfo {
  stepId: string;
  flowId: string;
  type: 'content' | 'login' | 'form' | 'summary';
  title?: string;
  description?: string;
}

export type SessionEvent = 
  | 'FLOW_STARTED'
  | 'FLOW_COMPLETED'
  | 'STEP_COMPLETED'
  | 'STEP_SKIPPED'
  | 'LOGIN_SUCCESS'
  | 'LOGIN_FAILED'
  | 'ERROR_OCCURRED';

export interface ContentItemDTO {
  id: string;
  url: string;
  title: string;
  language: string;
  tags?: string[];
  contentType?: string;
  description?: string;
}

