/**
 * Navigation service - orchestrates navigation logic
 */

import { navigate, continueNavigation } from '@carlwahlen/navigation-core';
import type {
  NavigateRequest,
  NavigateResponse,
  ContinueRequest,
  ContinueResponse,
  UserContext,
} from '@carlwahlen/shared-types';
import { sessionRepository } from '../infra/sessionRepository.js';
import { contentRepository } from '../infra/contentRepository.js';
import { flowRepository } from '../infra/flowRepository.js';
import { llmClient } from '../infra/llmClient.js';
import { queryService } from './queryService.js';

class NavigationService {
  async navigate(request: NavigateRequest): Promise<NavigateResponse> {
    // Get or create session
    let session = request.sessionId
      ? await sessionRepository.getById(request.sessionId)
      : null;

    if (!session) {
      session = await sessionRepository.create({
        tenantId: request.tenantId,
        context: request.userContext || {},
      });
    }

    // Get content index and flows
    const contentIndex = await contentRepository.getByTenant(request.tenantId);
    const flowDefinitions = await flowRepository.getByTenant(request.tenantId);

    // Convert content index to navigation-core format
    const coreContentIndex = contentIndex.map(item => ({
      id: item.id,
      tenantId: item.tenantId,
      url: item.url,
      title: item.title,
      language: item.language,
      tags: item.tags || [],
      contentType: (item.contentType || 'page') as 'page' | 'form' | 'document' | 'video' | 'other',
      description: item.description,
    }));

    // Call core navigation logic
    const result = await navigate({
      inputText: request.input,
      tenantId: request.tenantId,
      session: {
        id: session.id,
        tenantId: session.tenantId,
        currentFlowId: session.currentFlowId,
        currentStepId: session.currentStepId,
        context: session.context as UserContext,
        startedAt: session.startedAt,
        lastActivityAt: session.lastActivityAt,
        completed: session.completed,
      },
      userContext: request.userContext || {},
      contentIndex: coreContentIndex,
      flowDefinitions: flowDefinitions,
      llmClient: llmClient,
    });

    // Update session - find which flow contains this step
    if (result.nextStep) {
      const containingFlow = flowDefinitions.find(flow =>
        flow.steps.some(step => step.id === result.nextStep!.id)
      );
      
      await sessionRepository.update(session.id, {
        currentFlowId: containingFlow?.id,
        currentStepId: result.nextStep.id,
        lastActivityAt: new Date(),
      });
    }

    // Build response
    const containingFlowForResponse = result.nextStep
      ? flowDefinitions.find(flow =>
          flow.steps.some(step => step.id === result.nextStep!.id)
        )
      : undefined;
    
    const response: NavigateResponse = {
      sessionId: session.id,
      intent: result.intent,
      nextStep: result.nextStep
        ? {
            stepId: result.nextStep.id,
            flowId: containingFlowForResponse?.id || '',
            type: result.nextStep.type,
            title: result.nextStep.title,
            description: result.nextStep.description,
          }
        : undefined,
      targetUrl: result.targetUrl,
      assistantMessage: result.assistantMessage,
      confidence: result.confidence,
    };

    // Track query for analytics and priority-based matching
    // GDPR: Only track if user has consented to analytics cookies (trackQuery flag must be true)
    // This happens asynchronously so it doesn't block the response
    if (request.trackQuery === true) {
      queryService.trackQuery({
        query: request.input,
        intent: result.intent,
        flowId: containingFlowForResponse?.id || '',
        targetUrl: result.targetUrl || '',
        tenantId: request.tenantId,
        sessionId: session.id,
        success: true, // Will be updated via feedback endpoint
      }).catch(err => {
        // Log error but don't fail the request
        console.error('Failed to track query:', err);
      });
    }
    // If trackQuery is false or undefined, do not track (GDPR compliance)

    return response;
  }

  async continue(request: ContinueRequest): Promise<ContinueResponse> {
    const session = await sessionRepository.getById(request.sessionId);
    if (!session) {
      throw new Error('Session not found');
    }

    const contentIndex = await contentRepository.getByTenant(session.tenantId);
    const flowDefinitions = await flowRepository.getByTenant(session.tenantId);

    const coreContentIndex = contentIndex.map(item => ({
      id: item.id,
      tenantId: item.tenantId,
      url: item.url,
      title: item.title,
      language: item.language,
      tags: item.tags || [],
      contentType: (item.contentType || 'page') as 'page' | 'form' | 'document' | 'video' | 'other',
      description: item.description,
    }));

    const result = await continueNavigation(
      {
        id: session.id,
        tenantId: session.tenantId,
        currentFlowId: session.currentFlowId,
        currentStepId: session.currentStepId,
        context: session.context as UserContext,
        startedAt: session.startedAt,
        lastActivityAt: session.lastActivityAt,
        completed: session.completed,
      },
      flowDefinitions,
      coreContentIndex,
      llmClient
    );

    // Update session - find which flow contains this step
    if (result.nextStep) {
      const containingFlow = flowDefinitions.find(flow =>
        flow.steps.some(step => step.id === result.nextStep!.id)
      );
      
      await sessionRepository.update(session.id, {
        currentFlowId: containingFlow?.id,
        currentStepId: result.nextStep.id,
        lastActivityAt: new Date(),
        completed: result.flowCompleted || false,
      });
    } else if (result.flowCompleted) {
      await sessionRepository.update(session.id, {
        completed: true,
        lastActivityAt: new Date(),
      });
    }

    return {
      nextStep: result.nextStep
        ? {
            stepId: result.nextStep.id,
            flowId: flowDefinitions.find(flow =>
              flow.steps.some(step => step.id === result.nextStep!.id)
            )?.id || '',
            type: result.nextStep.type,
            title: result.nextStep.title,
            description: result.nextStep.description,
          }
        : undefined,
      targetUrl: result.targetUrl,
      assistantMessage: result.assistantMessage,
      flowCompleted: result.flowCompleted,
    };
  }
}

export const navigationService = new NavigationService();

