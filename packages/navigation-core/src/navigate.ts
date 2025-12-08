/**
 * Core navigation engine logic.
 * 
 * This is the heart of the AI navigation system - pure business logic
 * with no HTTP, database, or external service dependencies.
 * 
 * EXTRACTION NOTE: This module can be extracted to a SaaS repo without changes.
 */

import type {
  NavigationInput,
  NavigationResult,
  Flow,
  Step,
  Intent,
  ContentItem,
  UserContext,
  Session,
  LLMClient,
} from './types';

/**
 * Main navigation function that determines the next step based on user input.
 */
export async function navigate(input: NavigationInput): Promise<NavigationResult> {
  const {
    inputText,
    tenantId,
    session,
    userContext,
    contentIndex,
    flowDefinitions,
    llmClient,
  } = input;

  // 1. Detect user intent using LLM
  const availableIntents = extractAvailableIntents(flowDefinitions);
  const intentResult = await llmClient.detectIntent(inputText, {
    tenantId,
    availableIntents,
    contentIndex,
    userContext,
  });

  const detectedIntent = intentResult.intent;

  // 2. Find matching flow for the intent
  const matchingFlow = findMatchingFlow(
    flowDefinitions,
    detectedIntent,
    tenantId,
    userContext,
    inputText
  );

  if (!matchingFlow) {
    // No matching flow found - provide generic response
    // Create a dummy flow for the response
    const dummyFlow: Flow = {
      id: 'no-flow',
      name: 'No matching flow',
      tenantId,
      intent: detectedIntent,
      enabled: true,
      steps: [],
    };
    
    const response = await llmClient.generateResponse({
      intent: detectedIntent,
      flow: dummyFlow,
      userContext,
      contentIndex,
    });

    return {
      assistantMessage: response.message,
      confidence: intentResult.confidence,
    };
  }

  // 3. Determine current step
  let currentStep: Step | undefined;
  if (session.currentFlowId === matchingFlow.id && session.currentStepId) {
    currentStep = matchingFlow.steps.find(s => s.id === session.currentStepId);
  }

  // 4. Determine next step
  const nextStep = determineNextStep(
    matchingFlow,
    currentStep,
    userContext
  );

  // 5. Generate assistant message
  const response = await llmClient.generateResponse({
    intent: detectedIntent,
    currentStep: nextStep,
    flow: matchingFlow,
    userContext,
    contentIndex,
  });

  // 6. Build target URL
  const targetUrl = buildTargetUrl(nextStep, contentIndex);

  // 7. Check if flow is completed
  const flowCompleted = nextStep === undefined && currentStep !== undefined;

  return {
    intent: detectedIntent,
    nextStep,
    targetUrl,
    assistantMessage: response.message,
    confidence: intentResult.confidence,
    flowCompleted,
  };
}

/**
 * Extract available intents from flow definitions.
 */
function extractAvailableIntents(flows: Flow[]): Intent[] {
  const intents = new Set<Intent>();
  flows.forEach(flow => {
    if (flow.enabled) {
      intents.add(flow.intent);
    }
  });
  return Array.from(intents);
}

/**
 * Find a matching flow for the given intent and context.
 * Uses keyword matching to select the most specific flow when multiple flows match the same intent.
 */
function findMatchingFlow(
  flows: Flow[],
  intent: Intent,
  tenantId: string,
  userContext: UserContext,
  inputText: string
): Flow | undefined {
  const lowerInput = inputText.toLowerCase();
  
  // First, filter flows by intent, tenant, and conditions
  const candidateFlows = flows.filter(flow => {
    if (!flow.enabled || flow.tenantId !== tenantId || flow.intent !== intent) {
      return false;
    }

    // Check flow conditions
    if (flow.conditions) {
      if (flow.conditions.language && userContext.language) {
        if (!flow.conditions.language.includes(userContext.language)) {
          return false;
        }
      }

      if (flow.conditions.userType && userContext.userType) {
        if (!flow.conditions.userType.includes(userContext.userType)) {
          return false;
        }
      }

      if (flow.conditions.device && userContext.device) {
        if (!flow.conditions.device.includes(userContext.device)) {
          return false;
        }
      }
    }

    return true;
  });

  if (candidateFlows.length === 0) {
    return undefined;
  }

  if (candidateFlows.length === 1) {
    return candidateFlows[0];
  }

  // Multiple flows match - use keyword matching to find the most specific one
  // Priority: specific case studies > general pages
  
  // Match specific case studies first
  const caseKeywords: Record<string, string[]> = {
    'flow-case-founder': [
      'founder', 'fintech', 'payment', 'payments', 'psp', 'orchestration',
      'market research', 'mvp development', 'api-first', 'postgresql', 'startup'
    ],
    'flow-case-style-scandinavia': [
      'style scandinavia', 'style-scandinavia', 'style', 'scandinavia',
      'ux/seo', 'ux seo', 'traffic increase', 'wcag', 'accessibility', 'e-commerce', 'ecommerce'
    ],
    'flow-case-hellman-partners': [
      'hellman', 'partners', 'proptech', 'prop tech', 'real estate', 'fastigheter',
      'property', 'housing market', 'bostadsmarknad', 'lean product', 'data visualization'
    ],
    'flow-case-portfolio-website': [
      'portfolio website', 'portfolio-website', 'react', 'typescript',
      'web development', 'p5.js', 'custom website', 'personal website'
    ],
    'flow-case-ai-navigation': [
      'ai navigation', 'ai-navigation', 'navigation engine', 'ai powered',
      'intelligent navigation', 'llm', 'ai assistant', 'navigation system'
    ],
  };

  for (const [flowId, keywords] of Object.entries(caseKeywords)) {
    const flow = candidateFlows.find(f => f.id === flowId);
    if (flow && keywords.some(keyword => lowerInput.includes(keyword))) {
      return flow;
    }
  }

  // Match specific pages
  if (lowerInput.includes('contact') || lowerInput.includes('reach out') || 
      lowerInput.includes('get in touch') || lowerInput.includes('hire') ||
      lowerInput.includes('kontakta') || lowerInput.includes('prata med') ||
      lowerInput.includes('book a call') || lowerInput.includes('boka samtal') ||
      lowerInput.includes('let\'s talk') || lowerInput.includes('discuss')) {
    const contactFlow = candidateFlows.find(f => f.id === 'flow-contact');
    if (contactFlow) return contactFlow;
  }

  // About page - check BEFORE notes to prioritize "read about" queries
  // Specific check for "about yourself" queries - high priority to ensure they go to About page
  if (lowerInput.includes('about yourself') || lowerInput.includes('tell me about yourself') ||
      lowerInput.includes('about you') || lowerInput.includes('about him') || 
      lowerInput.includes('about carl') || lowerInput.includes('who are you') || 
      lowerInput.includes('who is he') || lowerInput.includes('who is carl')) {
    const aboutFlow = candidateFlows.find(f => f.id === 'flow-about');
    if (aboutFlow) return aboutFlow;
  }
  
  if (lowerInput.includes('about') || lowerInput.includes('background') ||
      lowerInput.includes('experience') || lowerInput.includes('bio') ||
      lowerInput.includes('biography') || lowerInput.includes('om mig') ||
      lowerInput.includes('vem är') || lowerInput.includes('expertise') ||
      lowerInput.includes('skills') || lowerInput.includes('stockholm') ||
      lowerInput.includes('based in') || lowerInput.includes('read about') ||
      lowerInput.includes('tell me about') || lowerInput.includes('learn about')) {
    const aboutFlow = candidateFlows.find(f => f.id === 'flow-about');
    if (aboutFlow) return aboutFlow;
  }

  // Notes/Insights page - more specific keywords to avoid matching "read about"
  if (lowerInput.includes('notes') || lowerInput.includes('insights') ||
      lowerInput.includes('insikter') || lowerInput.includes('blog') ||
      lowerInput.includes('articles') || lowerInput.includes('artiklar') ||
      lowerInput.includes('posts') || lowerInput.includes('inlägg') ||
      lowerInput.includes('thoughts') || lowerInput.includes('tankar') ||
      lowerInput.includes('read notes') || lowerInput.includes('read articles') ||
      lowerInput.includes('read blog') || lowerInput.includes('read posts') ||
      lowerInput.includes('läsa artiklar') || lowerInput.includes('läsa inlägg')) {
    const notesFlow = candidateFlows.find(f => f.id === 'flow-notes');
    if (notesFlow) return notesFlow;
  }

  if (lowerInput.includes('faq') || lowerInput.includes('question') ||
      lowerInput.includes('frequently asked') || lowerInput.includes('frågor') ||
      lowerInput.includes('svar') || lowerInput.includes('how do you') ||
      lowerInput.includes('what makes') || lowerInput.includes('what\'s your')) {
    const faqFlow = candidateFlows.find(f => f.id === 'flow-faq');
    if (faqFlow) return faqFlow;
  }

  if (lowerInput.includes('what type of services') || lowerInput.includes('what types of services') ||
      lowerInput.includes('what are your expertise') || lowerInput.includes('what is your expertise') ||
      lowerInput.includes('what expertise') || lowerInput.includes('what are you expert') ||
      lowerInput.includes('service') || lowerInput.includes('services') ||
      lowerInput.includes('what do you do') || lowerInput.includes('what does he do') ||
      lowerInput.includes('offer') || lowerInput.includes('tjanster') ||
      lowerInput.includes('tjänster') || lowerInput.includes('product strategy') ||
      lowerInput.includes('consulting') || lowerInput.includes('ux/ui design') ||
      lowerInput.includes('ux design') || lowerInput.includes('business development') ||
      lowerInput.includes('technology strategy') || lowerInput.includes('technical architecture') ||
      lowerInput.includes('data-driven') || lowerInput.includes('go-to-market') ||
      lowerInput.includes('gtm') || lowerInput.includes('roadmap') ||
      lowerInput.includes('api design') || lowerInput.includes('system architecture') ||
      lowerInput.includes('payments') || lowerInput.includes('compliance') ||
      lowerInput.includes('dashboard') || lowerInput.includes('information architecture') ||
      lowerInput.includes('a/b testing') || lowerInput.includes('seo') ||
      lowerInput.includes('process') || lowerInput.includes('methodology') ||
      lowerInput.includes('pricing') || lowerInput.includes('pris')) {
    const servicesFlow = candidateFlows.find(f => f.id === 'flow-services');
    if (servicesFlow) return servicesFlow;
  }

  if (lowerInput.includes('case') || lowerInput.includes('case study') ||
      lowerInput.includes('work') || lowerInput.includes('projects') ||
      lowerInput.includes('examples') || lowerInput.includes('show me') ||
      lowerInput.includes('projekt') || lowerInput.includes('arbete') ||
      lowerInput.includes('visa') || lowerInput.includes('previous work') ||
      lowerInput.includes('past projects') || lowerInput.includes('client work')) {
    const casesFlow = candidateFlows.find(f => f.id === 'flow-view-cases');
    if (casesFlow) return casesFlow;
  }

  if (lowerInput.includes('home') || lowerInput.includes('start') ||
      lowerInput.includes('main page') || lowerInput.includes('homepage') ||
      lowerInput.includes('startpage') || lowerInput.includes('startsida') ||
      lowerInput.includes('hem') || lowerInput.includes('beginning') ||
      lowerInput.includes('go back')) {
    const homeFlow = candidateFlows.find(f => f.id === 'flow-home');
    if (homeFlow) return homeFlow;
  }

  // If no specific match, return the first candidate (fallback)
  return candidateFlows[0];
}

/**
 * Determine the next step in the flow.
 */
function determineNextStep(
  flow: Flow,
  currentStep: Step | undefined,
  userContext: UserContext
): Step | undefined {
  const sortedSteps = [...flow.steps].sort((a, b) => a.order - b.order);

  if (!currentStep) {
    // Start from the first eligible step
    return findFirstEligibleStep(sortedSteps, userContext);
  }

  // Find current step index
  const currentIndex = sortedSteps.findIndex(s => s.id === currentStep.id);
  if (currentIndex === -1) {
    return findFirstEligibleStep(sortedSteps, userContext);
  }

  // Find next eligible step
  for (let i = currentIndex + 1; i < sortedSteps.length; i++) {
    const step = sortedSteps[i];
    if (isStepEligible(step, userContext)) {
      return step;
    }
  }

  // No more steps
  return undefined;
}

/**
 * Find the first eligible step in a list.
 */
function findFirstEligibleStep(steps: Step[], userContext: UserContext): Step | undefined {
  return steps.find(step => isStepEligible(step, userContext));
}

/**
 * Check if a step is eligible based on conditions.
 */
function isStepEligible(step: Step, userContext: UserContext): boolean {
  if (!step.conditions) {
    return true;
  }

  if (step.conditions.language && userContext.language) {
    if (!step.conditions.language.includes(userContext.language)) {
      return false;
    }
  }

  if (step.conditions.userType && userContext.userType) {
    if (!step.conditions.userType.includes(userContext.userType)) {
      return false;
    }
  }

  if (step.conditions.loggedIn !== undefined) {
    if (userContext.loggedIn !== step.conditions.loggedIn) {
      return false;
    }
  }

  if (step.conditions.device && userContext.device) {
    if (!step.conditions.device.includes(userContext.device)) {
      return false;
    }
  }

  return true;
}

/**
 * Build target URL for a step.
 */
function buildTargetUrl(step: Step | undefined, contentIndex: ContentItem[]): string | undefined {
  if (!step) {
    return undefined;
  }

  if (step.directUrl) {
    return step.directUrl;
  }

  if (step.contentItemId) {
    const contentItem = contentIndex.find(item => item.id === step.contentItemId);
    return contentItem?.url;
  }

  return undefined;
}

/**
 * Continue navigation after an event (e.g., step completed, login success).
 */
export async function continueNavigation(
  session: Session,
  flowDefinitions: Flow[],
  contentIndex: ContentItem[],
  llmClient: LLMClient
): Promise<NavigationResult> {
  if (!session.currentFlowId) {
    return {
      assistantMessage: 'No active flow. Please start a new navigation request.',
    };
  }

  const flow = flowDefinitions.find(f => f.id === session.currentFlowId);
  if (!flow) {
    return {
      assistantMessage: 'Flow not found. Please start a new navigation request.',
    };
  }

  const currentStep = flow.steps.find(s => s.id === session.currentStepId);
  const nextStep = determineNextStep(flow, currentStep, session.context);

  const response = await llmClient.generateResponse({
    intent: flow.intent,
    currentStep: nextStep,
    flow,
    userContext: session.context,
    contentIndex,
  });

  const targetUrl = buildTargetUrl(nextStep, contentIndex);
  const flowCompleted = nextStep === undefined && currentStep !== undefined;

  return {
    intent: flow.intent,
    nextStep,
    targetUrl,
    assistantMessage: response.message || 'Continue to the next step.',
    flowCompleted,
  };
}

