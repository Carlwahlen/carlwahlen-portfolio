/**
 * Core domain models for the AI navigation engine.
 * 
 * EXTRACTION NOTE: This is pure business logic with no external dependencies
 * (except shared-types). Can be easily moved to a separate SaaS repository.
 */

// Tenant - represents a customer organization
export interface Tenant {
  id: string;
  name: string;
  domain?: string;
  defaultLanguage: string;
  enabled: boolean;
  metadata?: Record<string, unknown>;
}

// ContentItem - indexed web page or resource
export interface ContentItem {
  id: string;
  tenantId: string;
  url: string;
  title: string;
  language: string;
  tags: string[];
  contentType: 'page' | 'form' | 'document' | 'video' | 'other';
  description?: string;
  metadata?: Record<string, unknown>;
}

// Intent - what the user wants to accomplish
export type Intent = 
  | 'file_tax_return'
  | 'apply_for_benefit'
  | 'check_status'
  | 'update_information'
  | 'find_information'
  | 'contact_support'
  | 'other';

// Step type
export type StepType = 'content' | 'login' | 'form' | 'summary';

// Step - one step in a flow
export interface Step {
  id: string;
  type: StepType;
  title: string;
  description?: string;
  contentItemId?: string; // Reference to ContentItem
  directUrl?: string; // Direct URL if not using ContentItem
  required: boolean;
  order: number;
  conditions?: StepConditions;
  metadata?: Record<string, unknown>;
}

// Conditions for step eligibility
export interface StepConditions {
  userType?: string[];
  language?: string[];
  loggedIn?: boolean;
  device?: ('mobile' | 'tablet' | 'desktop')[];
  [key: string]: unknown;
}

// Flow - describes an end-to-end task process
export interface Flow {
  id: string;
  name: string;
  description?: string;
  tenantId: string;
  intent: Intent;
  steps: Step[];
  conditions?: FlowConditions;
  enabled: boolean;
  metadata?: Record<string, unknown>;
}

// Conditions for flow eligibility
export interface FlowConditions {
  userType?: string[];
  language?: string[];
  device?: ('mobile' | 'tablet' | 'desktop')[];
  [key: string]: unknown;
}

// User context
export interface UserContext {
  loggedIn?: boolean;
  userType?: string;
  device?: 'mobile' | 'tablet' | 'desktop';
  language?: string;
  [key: string]: unknown;
}

// Session - user navigation session
export interface Session {
  id: string;
  tenantId: string;
  currentFlowId?: string;
  currentStepId?: string;
  context: UserContext;
  startedAt: Date;
  lastActivityAt: Date;
  completed: boolean;
  metadata?: Record<string, unknown>;
}

// Event types
export type EventType = 
  | 'FLOW_STARTED'
  | 'FLOW_COMPLETED'
  | 'STEP_COMPLETED'
  | 'STEP_SKIPPED'
  | 'LOGIN_SUCCESS'
  | 'LOGIN_FAILED'
  | 'ERROR_OCCURRED'
  | 'NAVIGATION_REQUESTED';

// Event - analytics/audit event
export interface Event {
  id: string;
  sessionId: string;
  type: EventType;
  timestamp: Date;
  metadata?: Record<string, unknown>;
}

// LLM Client interface - abstraction for LLM providers
export interface LLMClient {
  detectIntent(input: string, context: {
    tenantId: string;
    availableIntents: Intent[];
    contentIndex: ContentItem[];
    userContext: UserContext;
  }): Promise<{
    intent: Intent;
    confidence: number;
    reasoning?: string;
  }>;

  generateResponse(input: {
    intent: Intent;
    currentStep?: Step;
    flow: Flow;
    userContext: UserContext;
    contentIndex: ContentItem[];
  }): Promise<{
    message: string;
    suggestedActions?: string[];
  }>;
}

// Navigation result
export interface NavigationResult {
  intent?: Intent;
  nextStep?: Step;
  targetUrl?: string;
  assistantMessage: string;
  confidence?: number;
  flowCompleted?: boolean;
}

// Navigation input
export interface NavigationInput {
  inputText: string;
  tenantId: string;
  session: Session;
  userContext: UserContext;
  contentIndex: ContentItem[];
  flowDefinitions: Flow[];
  llmClient: LLMClient;
}

