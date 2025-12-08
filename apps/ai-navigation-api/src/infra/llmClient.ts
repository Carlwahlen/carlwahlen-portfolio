/**
 * LLM Client - abstraction for LLM providers
 * 
 * Default implementation: Rule-based intent detection (StubLLMClient)
 * This is a clean, fast, and GitHub Pages-compatible solution that demonstrates
 * the principle of AI navigation without requiring servers or LLM infrastructure.
 * 
 * Optional: Can be upgraded to use Python AI service (FastAPI + Ollama) by setting
 * USE_AI_SERVICE=true, but this requires a server and is not needed for demonstration.
 */

import type { LLMClient as ILLMClient, Intent, ContentItem, UserContext, Flow, Step } from '@carlwahlen/navigation-core';

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:8001';
const USE_AI_SERVICE = process.env.USE_AI_SERVICE === 'true'; // Default to false - use rule-based system

/**
 * Rule-based LLM Client (StubLLMClient)
 * 
 * This is a clean, fast, rule-based intent detection system that demonstrates
 * the principle of AI navigation without requiring LLM infrastructure.
 * 
 * It uses keyword matching and pattern recognition to understand user intent,
 * which is perfect for demonstrating the concept and works on GitHub Pages.
 */
class StubLLMClient implements ILLMClient {
  async detectIntent(
    input: string,
    _context: {
      tenantId: string;
      availableIntents: Intent[];
      contentIndex: ContentItem[];
      userContext: UserContext;
    }
  ): Promise<{ intent: Intent; confidence: number; reasoning?: string }> {
    // Rule-based intent detection - demonstrates the principle of AI navigation
    // Focus: What is the user's purpose/goal?
    const lowerInput = input.toLowerCase();

    // USER GOAL 1: Get contact information (email, phone, contact details)
    // Highest priority - specific action
    if (lowerInput.includes('contact') || lowerInput.includes('reach out') || 
        lowerInput.includes('get in touch') || lowerInput.includes('reach you') ||
        lowerInput.includes('reach him') || lowerInput.includes('contact you') ||
        lowerInput.includes('contact him') || lowerInput.includes('contact details') ||
        lowerInput.includes('contact information') || lowerInput.includes('contact info') ||
        lowerInput.includes('contact data') || lowerInput.includes('how to contact') ||
        lowerInput.includes('how can i contact') || lowerInput.includes('where can i contact') ||
        lowerInput.includes('how do i contact') || lowerInput.includes('how to reach') ||
        lowerInput.includes('how can i reach') || lowerInput.includes('where can i reach') ||
        lowerInput.includes('email') || lowerInput.includes('e-mail') ||
        lowerInput.includes('email address') || lowerInput.includes('e-mail address') ||
        lowerInput.includes('mail address') || lowerInput.includes('mail') ||
        lowerInput.includes('phone') || lowerInput.includes('telephone') ||
        lowerInput.includes('phone number') || lowerInput.includes('telephone number') ||
        lowerInput.includes('phone no') || lowerInput.includes('tel') ||
        lowerInput.includes('call') || lowerInput.includes('book a call') ||
        lowerInput.includes('schedule a call') || lowerInput.includes('set up a call') ||
        lowerInput.includes('message') || lowerInput.includes('send message') ||
        lowerInput.includes('send email') || lowerInput.includes('email you') ||
        lowerInput.includes('email him') || lowerInput.includes('hire') ||
        lowerInput.includes('hire you') || lowerInput.includes('work with you') ||
        lowerInput.includes('work together') || lowerInput.includes('collaborate') ||
        lowerInput.includes('discuss') || lowerInput.includes('discussion') ||
        lowerInput.includes('let\'s talk') || lowerInput.includes('lets talk') ||
        lowerInput.includes('talk to') || lowerInput.includes('speak with') ||
        lowerInput.includes('get contact') || lowerInput.includes('find contact') ||
        lowerInput.includes('contact method') || lowerInput.includes('way to contact') ||
        lowerInput.includes('way to reach') || lowerInput.includes('contact form')) {
      return { intent: 'contact_support', confidence: 0.9 };
    }

    // Specific case studies - Founder Project
    if (lowerInput.includes('founder') || lowerInput.includes('fintech') ||
        lowerInput.includes('payment') || lowerInput.includes('payments') ||
        lowerInput.includes('psp') || lowerInput.includes('orchestration') ||
        lowerInput.includes('market research') || lowerInput.includes('mvp development') ||
        lowerInput.includes('api-first') || lowerInput.includes('postgresql') ||
        lowerInput.includes('startup') || lowerInput.includes('secret project')) {
      return { intent: 'find_information', confidence: 0.9 };
    }

    // Style Scandinavia case
    if (lowerInput.includes('style scandinavia') || lowerInput.includes('style-scandinavia') ||
        lowerInput.includes('style') || (lowerInput.includes('scandinavia') && lowerInput.includes('case')) ||
        lowerInput.includes('ux/seo') || lowerInput.includes('ux seo') ||
        lowerInput.includes('traffic increase') || lowerInput.includes('wcag') ||
        lowerInput.includes('accessibility') || lowerInput.includes('e-commerce') ||
        lowerInput.includes('ecommerce') || lowerInput.includes('seo optimization')) {
      return { intent: 'find_information', confidence: 0.9 };
    }

    // Hellman & Partners case
    if (lowerInput.includes('hellman') || lowerInput.includes('partners') || 
        lowerInput.includes('proptech') || lowerInput.includes('prop tech') ||
        lowerInput.includes('real estate') || lowerInput.includes('fastigheter') ||
        lowerInput.includes('property') || lowerInput.includes('housing market') ||
        lowerInput.includes('bostadsmarknad') || lowerInput.includes('lean product') ||
        lowerInput.includes('data visualization') || lowerInput.includes('mvp-driven')) {
      return { intent: 'find_information', confidence: 0.9 };
    }

    // Portfolio Website case
    if (lowerInput.includes('portfolio website') || lowerInput.includes('portfolio-website') ||
        (lowerInput.includes('portfolio') && lowerInput.includes('website')) ||
        lowerInput.includes('react') || lowerInput.includes('typescript') ||
        lowerInput.includes('web development') || lowerInput.includes('p5.js') ||
        lowerInput.includes('custom website') || lowerInput.includes('personal website')) {
      return { intent: 'find_information', confidence: 0.9 };
    }

    // AI Navigation case
    if (lowerInput.includes('ai navigation') || lowerInput.includes('ai-navigation') || 
        lowerInput.includes('navigation engine') || lowerInput.includes('ai powered') ||
        lowerInput.includes('intelligent navigation') || lowerInput.includes('llm') ||
        lowerInput.includes('ai assistant') || lowerInput.includes('navigation system')) {
      return { intent: 'find_information', confidence: 0.9 };
    }

    // About page - check BEFORE notes to prioritize "read about" queries
    // Specific check for "about yourself" queries - high priority to ensure they go to About page
    if (lowerInput.includes('about yourself') || lowerInput.includes('tell me about yourself') ||
        lowerInput.includes('about you') || lowerInput.includes('about him') || 
        lowerInput.includes('about carl') || lowerInput.includes('who are you') || 
        lowerInput.includes('who is he') || lowerInput.includes('who is carl')) {
      return { intent: 'find_information', confidence: 0.95 };
    }
    
    if (lowerInput.includes('about') || lowerInput.includes('background') ||
        lowerInput.includes('experience') || lowerInput.includes('bio') ||
        lowerInput.includes('biography') || lowerInput.includes('om mig') ||
        lowerInput.includes('vem är') || lowerInput.includes('expertise') ||
        lowerInput.includes('skills') || lowerInput.includes('stockholm') ||
        lowerInput.includes('based in') || lowerInput.includes('read about') ||
        lowerInput.includes('tell me about') || lowerInput.includes('learn about')) {
      return { intent: 'find_information', confidence: 0.85 };
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
      return { intent: 'find_information', confidence: 0.85 };
    }

    // FAQ intent
    if (lowerInput.includes('faq') || lowerInput.includes('question') || 
        lowerInput.includes('answer') || lowerInput.includes('frequently asked') ||
        lowerInput.includes('frågor') || lowerInput.includes('svar') ||
        lowerInput.includes('how do you') || lowerInput.includes('what makes') ||
        lowerInput.includes('what\'s your') || lowerInput.includes('how do you measure') ||
        lowerInput.includes('engagement model') || lowerInput.includes('timeline')) {
      return { intent: 'find_information', confidence: 0.8 };
    }

    // EMPLOYER GOAL 1: Assess if you can solve their problem
    // Match skills with needs - "Can you solve our problem?"
    if (lowerInput.includes('can you solve') || lowerInput.includes('can he solve') ||
        lowerInput.includes('can you help solve') || lowerInput.includes('can he help solve') ||
        lowerInput.includes('solve our problem') || lowerInput.includes('solve my problem') ||
        lowerInput.includes('solve this problem') || lowerInput.includes('help with our') ||
        lowerInput.includes('help with my') || lowerInput.includes('help with this') ||
        lowerInput.includes('can you help our company') || lowerInput.includes('can he help our company') ||
        lowerInput.includes('can you help my company') || lowerInput.includes('can he help my company') ||
        lowerInput.includes('what can you help our company') || lowerInput.includes('what can he help our company') ||
        lowerInput.includes('what can you help my company') || lowerInput.includes('what can he help my company') ||
        lowerInput.includes('what can you help us') || lowerInput.includes('what can he help us') ||
        lowerInput.includes('what can you help me') || lowerInput.includes('what can he help me') ||
        lowerInput.includes('can you help us achieve') || lowerInput.includes('can he help us achieve') ||
        lowerInput.includes('can you help me achieve') || lowerInput.includes('can he help me achieve') ||
        lowerInput.includes('what can you help our company achieve') || lowerInput.includes('what can he help our company achieve') ||
        lowerInput.includes('what can you help us achieve') || lowerInput.includes('what can he help us achieve') ||
        lowerInput.includes('how can you help our company') || lowerInput.includes('how can he help our company') ||
        lowerInput.includes('how can you help us') || lowerInput.includes('how can he help us') ||
        lowerInput.includes('how can you help my company') || lowerInput.includes('how can he help my company') ||
        lowerInput.includes('how can your skills help') || lowerInput.includes('how can his skills help') ||
        lowerInput.includes('how can your skills add value') || lowerInput.includes('how can his skills add value') ||
        lowerInput.includes('how can you add value') || lowerInput.includes('how can he add value') ||
        lowerInput.includes('how can you add value to our team') || lowerInput.includes('how can he add value to our team') ||
        lowerInput.includes('how can you add value to our project') || lowerInput.includes('how can he add value to our project') ||
        lowerInput.includes('how can your skills add value to our team') || lowerInput.includes('how can his skills add value to our team') ||
        lowerInput.includes('how can your skills add value to our project') || lowerInput.includes('how can his skills add value to our project') ||
        lowerInput.includes('match our needs') || lowerInput.includes('match my needs') ||
        lowerInput.includes('fit our needs') || lowerInput.includes('fit my needs') ||
        lowerInput.includes('suitable for') || lowerInput.includes('right for') ||
        lowerInput.includes('can handle') || lowerInput.includes('able to handle')) {
      return { intent: 'find_information', confidence: 0.9 };
    }

    // EMPLOYER GOAL 2: Understand strengths and specialization
    // "What is your core expertise?" "What are you best at?" "What type of services?"
    // USER GOAL 2: Explore what services/qualities are offered
    // What do you offer? What services? What can you do? What are your capabilities?
    if (lowerInput.includes('what type of services') || lowerInput.includes('what types of services') ||
        lowerInput.includes('what type of service') || lowerInput.includes('what types of service') ||
        lowerInput.includes('what are your expertise') || lowerInput.includes('what are his expertise') ||
        lowerInput.includes('what is your expertise') || lowerInput.includes('what is his expertise') ||
        lowerInput.includes('what are your expertises') || lowerInput.includes('what are his expertises') ||
        lowerInput.includes('what expertise do you have') || lowerInput.includes('what expertise does he have') ||
        lowerInput.includes('what expertise') || lowerInput.includes('what are you expert') ||
        lowerInput.includes('what is your core expertise') || lowerInput.includes('what is his core expertise') ||
        lowerInput.includes('what are you best at') || lowerInput.includes('what is he best at') ||
        lowerInput.includes('what are your best skills') || lowerInput.includes('what are his best skills') ||
        lowerInput.includes('what is your specialization') || lowerInput.includes('what is his specialization') ||
        lowerInput.includes('what do you specialize') || lowerInput.includes('what does he specialize') ||
        lowerInput.includes('what are you specialized in') || lowerInput.includes('what is he specialized in') ||
        lowerInput.includes('what is your main expertise') || lowerInput.includes('what is his main expertise') ||
        lowerInput.includes('what is your primary expertise') || lowerInput.includes('what is his primary expertise') ||
        lowerInput.includes('what is your strongest area') || lowerInput.includes('what is his strongest area') ||
        lowerInput.includes('what is your strongest skill') || lowerInput.includes('what is his strongest skill') ||
        lowerInput.includes('what do you do') || lowerInput.includes('what does he do') ||
        lowerInput.includes('what can you do') || lowerInput.includes('what can he do') ||
        lowerInput.includes('what are you') || lowerInput.includes('what is he') ||
        lowerInput.includes('what do you offer') || lowerInput.includes('what does he offer') ||
        lowerInput.includes('what services') || lowerInput.includes('what service') ||
        lowerInput.includes('what are your services') || lowerInput.includes('what are his services') ||
        lowerInput.includes('what services do you') || lowerInput.includes('what services does he') ||
        lowerInput.includes('what can you help') || lowerInput.includes('what can he help') ||
        lowerInput.includes('what are your capabilities') || lowerInput.includes('what are his capabilities') ||
        lowerInput.includes('what are you capable') || lowerInput.includes('what is he capable') ||
        lowerInput.includes('what do you provide') || lowerInput.includes('what does he provide') ||
        lowerInput.includes('what do you deliver') || lowerInput.includes('what does he deliver') ||
        lowerInput.includes('what are your offerings') || lowerInput.includes('what are his offerings') ||
        lowerInput.includes('what qualities') || lowerInput.includes('what quality') ||
        lowerInput.includes('what skills') || lowerInput.includes('what skill') ||
        lowerInput.includes('what are you specialized') || lowerInput.includes('what is he specialized') ||
        lowerInput.includes('what are you good at') || lowerInput.includes('what is he good at') ||
        lowerInput.includes('what are your strengths') || lowerInput.includes('what are his strengths') ||
        lowerInput.includes('service') || lowerInput.includes('services') ||
        lowerInput.includes('offer') || lowerInput.includes('offering') ||
        lowerInput.includes('offerings') || lowerInput.includes('capabilities') ||
        lowerInput.includes('capability') || lowerInput.includes('can you help') ||
        lowerInput.includes('can he help') || lowerInput.includes('do you provide') ||
        lowerInput.includes('does he provide') || lowerInput.includes('do you offer') ||
        lowerInput.includes('does he offer') || lowerInput.includes('product strategy') ||
        lowerInput.includes('consulting') || lowerInput.includes('consultant') ||
        lowerInput.includes('ux/ui design') || lowerInput.includes('ux design') ||
        lowerInput.includes('ui design') || lowerInput.includes('business development') ||
        lowerInput.includes('technology strategy') || lowerInput.includes('technical architecture') ||
        lowerInput.includes('data-driven') || lowerInput.includes('go-to-market') ||
        lowerInput.includes('gtm') || lowerInput.includes('roadmap') ||
        lowerInput.includes('api design') || lowerInput.includes('system architecture') ||
        lowerInput.includes('payments') || lowerInput.includes('compliance') ||
        lowerInput.includes('pci') || lowerInput.includes('psd2') ||
        lowerInput.includes('gdpr') || lowerInput.includes('dashboard') ||
        lowerInput.includes('information architecture') || lowerInput.includes('ia') ||
        lowerInput.includes('a/b testing') || lowerInput.includes('ab testing') ||
        lowerInput.includes('seo') || lowerInput.includes('process') ||
        lowerInput.includes('methodology') || lowerInput.includes('discovery') ||
        lowerInput.includes('blueprint') || lowerInput.includes('mvp') ||
        lowerInput.includes('iteration') || lowerInput.includes('measurement') ||
        lowerInput.includes('pricing') || lowerInput.includes('price')) {
      return { intent: 'find_information', confidence: 0.85 };
    }

    // EMPLOYER GOAL 4: Evaluate professionalism and communication
    // EMPLOYER GOAL 5: Determine if you're someone they want to work with
    // "How do you approach problem-solving?" "Why should we work with you?"
    // USER GOAL 3: Explore experience/background - who has he worked with, what experience
    // What experience? What background? Who have you worked with? What clients?
    if (lowerInput.includes('how do you approach') || lowerInput.includes('how does he approach') ||
        lowerInput.includes('how do you approach problem-solving') || lowerInput.includes('how does he approach problem-solving') ||
        lowerInput.includes('how do you solve problems') || lowerInput.includes('how does he solve problems') ||
        lowerInput.includes('what is your approach') || lowerInput.includes('what is his approach') ||
        lowerInput.includes('how do you work') || lowerInput.includes('how does he work') ||
        lowerInput.includes('what is your process') || lowerInput.includes('what is his process') ||
        lowerInput.includes('how do you handle') || lowerInput.includes('how does he handle') ||
        lowerInput.includes('why should we work with you') || lowerInput.includes('why should we work with him') ||
        lowerInput.includes('why should i work with you') || lowerInput.includes('why should i work with him') ||
        lowerInput.includes('why should we hire you') || lowerInput.includes('why should we hire him') ||
        lowerInput.includes('why should i hire you') || lowerInput.includes('why should i hire him') ||
        lowerInput.includes('why choose you') || lowerInput.includes('why choose him') ||
        lowerInput.includes('why you instead of') || lowerInput.includes('why him instead of') ||
        lowerInput.includes('why you rather than') || lowerInput.includes('why him rather than') ||
        lowerInput.includes('what makes you different') || lowerInput.includes('what makes him different') ||
        lowerInput.includes('what sets you apart') || lowerInput.includes('what sets him apart') ||
        lowerInput.includes('what makes you unique') || lowerInput.includes('what makes him unique') ||
        lowerInput.includes('what makes you stand out') || lowerInput.includes('what makes him stand out') ||
        lowerInput.includes('why you') || lowerInput.includes('why him') ||
        lowerInput.includes('about') || lowerInput.includes('about you') ||
        lowerInput.includes('about him') || lowerInput.includes('who are you') ||
        lowerInput.includes('who is he') || lowerInput.includes('who is') ||
        lowerInput.includes('background') || lowerInput.includes('your background') ||
        lowerInput.includes('his background') || lowerInput.includes('experience') ||
        lowerInput.includes('your experience') || lowerInput.includes('his experience') ||
        lowerInput.includes('what experience') || lowerInput.includes('what background') ||
        lowerInput.includes('what is your experience') || lowerInput.includes('what is his experience') ||
        lowerInput.includes('what is your background') || lowerInput.includes('what is his background') ||
        lowerInput.includes('tell me about') || lowerInput.includes('tell me about you') ||
        lowerInput.includes('tell me about him') || lowerInput.includes('bio') ||
        lowerInput.includes('biography') || lowerInput.includes('your bio') ||
        lowerInput.includes('his bio') || lowerInput.includes('expertise') ||
        lowerInput.includes('your expertise') || lowerInput.includes('his expertise') ||
        lowerInput.includes('what expertise') || lowerInput.includes('skills') ||
        lowerInput.includes('your skills') || lowerInput.includes('his skills') ||
        lowerInput.includes('what skills') || lowerInput.includes('qualifications') ||
        lowerInput.includes('qualification') || lowerInput.includes('education') ||
        lowerInput.includes('who have you worked with') || lowerInput.includes('who has he worked with') ||
        lowerInput.includes('who have you worked for') || lowerInput.includes('who has he worked for') ||
        lowerInput.includes('what clients') || lowerInput.includes('what client') ||
        lowerInput.includes('who are your clients') || lowerInput.includes('who are his clients') ||
        lowerInput.includes('what companies') || lowerInput.includes('what company') ||
        lowerInput.includes('who are your clients') || lowerInput.includes('who are his clients') ||
        lowerInput.includes('what companies have you') || lowerInput.includes('what companies has he') ||
        lowerInput.includes('what projects have you') || lowerInput.includes('what projects has he') ||
        lowerInput.includes('what work have you') || lowerInput.includes('what work has he') ||
        lowerInput.includes('previous clients') || lowerInput.includes('past clients') ||
        lowerInput.includes('previous companies') || lowerInput.includes('past companies') ||
        lowerInput.includes('previous work') || lowerInput.includes('past work') ||
        lowerInput.includes('work history') || lowerInput.includes('work experience') ||
        lowerInput.includes('professional experience') || lowerInput.includes('career') ||
        lowerInput.includes('stockholm') || lowerInput.includes('based in') ||
        lowerInput.includes('where are you based') || lowerInput.includes('where is he based') ||
        lowerInput.includes('master') || lowerInput.includes('uxim') ||
        lowerInput.includes('user experience') || lowerInput.includes('interactive media') ||
        lowerInput.includes('studies') || lowerInput.includes('education')) {
      return { intent: 'find_information', confidence: 0.85 };
    }

    // EMPLOYER GOAL 3: See concrete examples and results
    // "What kind of projects have you worked on?" "What results have you delivered?"
    // USER GOAL 4: Explore case studies/projects/work examples
    // What cases? What projects? Show me your work. Examples of work.
    if (lowerInput.includes('what kind of projects') || lowerInput.includes('what kinds of projects') ||
        lowerInput.includes('what kind of projects have you') || lowerInput.includes('what kind of projects has he') ||
        lowerInput.includes('what types of projects') || lowerInput.includes('what type of projects') ||
        lowerInput.includes('what types of projects have you') || lowerInput.includes('what types of projects has he') ||
        lowerInput.includes('what results have you delivered') || lowerInput.includes('what results has he delivered') ||
        lowerInput.includes('what results') || lowerInput.includes('what result') ||
        lowerInput.includes('what have you delivered') || lowerInput.includes('what has he delivered') ||
        lowerInput.includes('what outcomes') || lowerInput.includes('what outcome') ||
        lowerInput.includes('what have you achieved') || lowerInput.includes('what has he achieved') ||
        lowerInput.includes('what achievements') || lowerInput.includes('what achievement') ||
        lowerInput.includes('what impact') || lowerInput.includes('what impacts') ||
        lowerInput.includes('what have you accomplished') || lowerInput.includes('what has he accomplished') ||
        lowerInput.includes('show me results') || lowerInput.includes('show results') ||
        lowerInput.includes('see results') || lowerInput.includes('view results') ||
        lowerInput.includes('case') || lowerInput.includes('case study') ||
        lowerInput.includes('case studies') || lowerInput.includes('cases') ||
        lowerInput.includes('what cases') || lowerInput.includes('what case') ||
        lowerInput.includes('what case studies') || lowerInput.includes('what case study') ||
        lowerInput.includes('show me your cases') || lowerInput.includes('show me his cases') ||
        lowerInput.includes('show me your work') || lowerInput.includes('show me his work') ||
        lowerInput.includes('show me your projects') || lowerInput.includes('show me his projects') ||
        lowerInput.includes('show me your portfolio') || lowerInput.includes('show me his portfolio') ||
        lowerInput.includes('show me examples') || lowerInput.includes('show examples') ||
        lowerInput.includes('see your work') || lowerInput.includes('see his work') ||
        lowerInput.includes('see your cases') || lowerInput.includes('see his cases') ||
        lowerInput.includes('see your projects') || lowerInput.includes('see his projects') ||
        lowerInput.includes('see your portfolio') || lowerInput.includes('see his portfolio') ||
        lowerInput.includes('see examples') || lowerInput.includes('view your work') ||
        lowerInput.includes('view his work') || lowerInput.includes('view your cases') ||
        lowerInput.includes('view his cases') || lowerInput.includes('view your projects') ||
        lowerInput.includes('view his projects') || lowerInput.includes('view your portfolio') ||
        lowerInput.includes('view his portfolio') || lowerInput.includes('view examples') ||
        lowerInput.includes('portfolio') || lowerInput.includes('work') ||
        lowerInput.includes('your work') || lowerInput.includes('his work') ||
        lowerInput.includes('projects') || lowerInput.includes('project') ||
        lowerInput.includes('your projects') || lowerInput.includes('his projects') ||
        lowerInput.includes('examples') || lowerInput.includes('example') ||
        lowerInput.includes('examples of') || lowerInput.includes('example of') ||
        lowerInput.includes('examples of your') || lowerInput.includes('examples of his') ||
        lowerInput.includes('previous work') || lowerInput.includes('past work') ||
        lowerInput.includes('previous projects') || lowerInput.includes('past projects') ||
        lowerInput.includes('previous cases') || lowerInput.includes('past cases') ||
        lowerInput.includes('client work') || lowerInput.includes('client projects') ||
        lowerInput.includes('what have you done') || lowerInput.includes('what has he done') ||
        lowerInput.includes('what have you built') || lowerInput.includes('what has he built') ||
        lowerInput.includes('what have you created') || lowerInput.includes('what has he created') ||
        lowerInput.includes('what projects') || lowerInput.includes('what project') ||
        lowerInput.includes('what work') || lowerInput.includes('what portfolio')) {
      return { intent: 'find_information', confidence: 0.9 };
    }

    // Home intent
    if (lowerInput.includes('home') || lowerInput.includes('start') || 
        lowerInput.includes('main page') || lowerInput.includes('homepage') ||
        lowerInput.includes('startpage') || lowerInput.includes('startsida') ||
        lowerInput.includes('hem') || lowerInput.includes('beginning') ||
        lowerInput.includes('start over') || lowerInput.includes('go back')) {
      return { intent: 'find_information', confidence: 0.7 };
    }

    // Default to find_information
    return { intent: 'find_information', confidence: 0.5 };
  }

  async generateResponse(input: {
    intent: Intent;
    currentStep?: Step;
    flow: Flow;
    userContext: UserContext;
    contentIndex: ContentItem[];
  }): Promise<{ message: string; suggestedActions?: string[] }> {
    const { intent, currentStep } = input;

    // Stub implementation - generate simple messages
    let message = '';

    if (currentStep) {
      message = `${currentStep.description || `Let me guide you to: ${currentStep.title}`}`;
    } else {
      switch (intent) {
        case 'contact_support':
          message = "I'll help you get in touch. Let me show you the contact page.";
          break;
        case 'find_information':
          message = "I'll help you find what you're looking for. Let me guide you to the right page.";
          break;
        default:
          message = "I'll help you navigate the site. Let me show you the way.";
      }
    }

    return {
      message,
      suggestedActions: currentStep ? ['Continue', 'Skip'] : undefined,
    };
  }
}

/**
 * Python AI Service Client
 * Calls the Python FastAPI service for LLM operations
 */
class PythonAIServiceClient implements ILLMClient {
  private stubClient: StubLLMClient;

  constructor() {
    this.stubClient = new StubLLMClient();
  }

  async detectIntent(
    input: string,
    context: {
      tenantId: string;
      availableIntents: Intent[];
      contentIndex: ContentItem[];
      userContext: UserContext;
    }
  ): Promise<{ intent: Intent; confidence: number; reasoning?: string }> {
    if (!USE_AI_SERVICE) {
      return this.stubClient.detectIntent(input, context);
    }

    try {
      const response = await fetch(`${AI_SERVICE_URL}/detect-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input,
          tenant_id: context.tenantId,
          available_intents: context.availableIntents,
          content_index: context.contentIndex,
          user_context: context.userContext,
        }),
      });

      if (!response.ok) {
        throw new Error(`AI service returned ${response.status}`);
      }

      const data = await response.json();
      return {
        intent: data.intent as Intent,
        confidence: data.confidence,
        reasoning: data.reasoning,
      };
    } catch (error) {
      console.warn('AI service unavailable, falling back to stub:', error);
      return this.stubClient.detectIntent(input, context);
    }
  }

  async generateResponse(input: {
    intent: Intent;
    currentStep?: Step;
    flow: Flow;
    userContext: UserContext;
    contentIndex: ContentItem[];
  }): Promise<{ message: string; suggestedActions?: string[] }> {
    if (!USE_AI_SERVICE) {
      return this.stubClient.generateResponse(input);
    }

    try {
      const response = await fetch(`${AI_SERVICE_URL}/generate-response`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          intent: input.intent,
          current_step: input.currentStep,
          flow: input.flow,
          user_context: input.userContext,
          content_index: input.contentIndex,
        }),
      });

      if (!response.ok) {
        throw new Error(`AI service returned ${response.status}`);
      }

      const data = await response.json();
      return {
        message: data.message,
        suggestedActions: data.suggested_actions,
      };
    } catch (error) {
      console.warn('AI service unavailable, falling back to stub:', error);
      return this.stubClient.generateResponse(input);
    }
  }
}

// Export the appropriate client based on configuration
// Default to rule-based system (StubLLMClient) for simplicity and GitHub Pages compatibility
// Set USE_AI_SERVICE=true to use Python AI service (requires server)
export const llmClient = USE_AI_SERVICE 
  ? new PythonAIServiceClient()
  : new StubLLMClient();

