import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Breadcrumbs from '../components/Breadcrumbs';
import { CaseFeedbackPrompt } from '../components/feedback/CaseFeedbackPrompt';

const AINavigationCasePage: React.FC = () => {
  const [researchExpanded, setResearchExpanded] = useState(false);

  return (
    <>
      <Helmet>
        <title>AI Navigation Engine - Carl Wahlen</title>
        <meta name="description" content="Prototype for intent-based navigation enabling users to search naturally, without knowing the website's structure or terminology." />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://carlwahlen.com/case/ai-navigation" />
        <meta property="og:title" content="AI Navigation Engine: Intelligent Website Navigation - Carl Wahlen" />
        <meta property="og:description" content="Prototype for intent-based navigation enabling users to search naturally, without knowing the website's structure or terminology." />
        <meta property="og:image" content="https://carlwahlen.com/og-image-ai-navigation.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Carl Wahlen" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://carlwahlen.com/case/ai-navigation" />
        <meta property="twitter:title" content="AI Navigation Engine: Intelligent Website Navigation - Carl Wahlen" />
        <meta property="twitter:description" content="Prototype for intent-based navigation enabling users to search naturally, without knowing the website's structure or terminology." />
        <meta property="twitter:image" content="https://carlwahlen.com/og-image-ai-navigation.jpg" />

        {/* Additional SEO */}
        <meta name="keywords" content="AI navigation, intelligent website navigation, LLM navigation, user guidance system, tax authority navigation, bank website navigation, municipality navigation, AI assistant, intent detection, step-by-step guidance" />
        <link rel="canonical" href="https://carlwahlen.com/case/ai-navigation" />
      </Helmet>
      
      <div className="min-h-screen bg-white">
        {/* 1) HERO */}
        <section className="pt-20 pb-24 lg:pt-36 lg:pb-32">
          <div className="container-hero">
            <div className="text-center w-full">
              {/* Badge */}
              <div className="inline-flex items-center px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-xs font-medium mb-6">
                AI
                </div>
                
              <h1 className="text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-6 font-medium leading-tight">
                  AI Navigation Engine
                </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-8 font-normal max-w-2xl mx-auto">
                Prototype for intent-based navigation enabling users to search naturally, without knowing the website's structure or terminology.
                </p>
                
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                  <Link 
                    to="/contact" 
                  className="btn-primary inline-flex items-center justify-center"
                  >
                  Contact me
                </Link>
                <Link 
                  to="/case" 
                  className="btn-secondary inline-flex items-center justify-center"
                >
                  View other cases
                  </Link>
                </div>
              </div>

            {/* Hero mockup - Laptop with phones */}
            <div className="flex justify-center mt-16 lg:mt-20">
                <img
                  src="/Ai-navigation-bot.png"
                  alt="AI Navigation Engine interface"
                className="w-full max-w-[20%] lg:max-w-[450px]"
                  loading="lazy"
                />
            </div>
          </div>
        </section>

        {/* Breadcrumbs */}
        <Breadcrumbs />

        {/* Divider */}
        <div className="border-t border-gray-200"></div>

        {/* 2) WHY AI NAVIGATION MATTERS */}
        <section className="py-24 lg:py-32">
          <div className="container-custom">
            <div className="max-w-[680px] mx-auto">
              <h2 className="text-3xl text-gray-900 mb-6 text-LEFT font-medium">
                Why AI Navigation Matters
              </h2>
              
              <p className="text-lg text-gray-600 leading-relaxed mb-12 text-left font-normal">
                Many complex websites are well-designed and fully accessible, yet users still struggle to find what they need because they search using everyday language that does not match the site's internal terminology. This mismatch between user intent and organizational structure creates a persistent navigation barrier.
              </p>
              
              {/* Icon list in two columns - 5-7 bullets */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 text-gray-900 mr-4 mt-0.5">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <p className="text-lg text-gray-700 font-normal">Traditional menus require knowing structure to find info</p>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 text-gray-900 mr-4 mt-0.5">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <p className="text-lg text-gray-700 font-normal">Search rarely understands natural phrasing</p>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 text-gray-900 mr-4 mt-0.5">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <p className="text-lg text-gray-700 font-normal">Users get stuck in complex information systems</p>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 text-gray-900 mr-4 mt-0.5">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <p className="text-lg text-gray-700 font-normal">AI navigation removes friction and lowers cognitive load</p>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 text-gray-900 mr-4 mt-0.5">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <p className="text-lg text-gray-700 font-normal">Users expect conversational interfaces, not menu hierarchies</p>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 text-gray-900 mr-4 mt-0.5">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-lg text-gray-700 font-normal">Task completion rates drop when terminology mismatch occurs</p>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 text-gray-900 mr-4 mt-0.5">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <p className="text-lg text-gray-700 font-normal">Intent-based systems improve user satisfaction significantly</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="border-t border-gray-200"></div>

    

        {/* Divider */}
        <div className="border-t border-gray-200"></div>

        {/* 4) CONCEPT + CORE SOLUTION */}
        <section className="py-24 lg:py-32 bg-gray-50">
          <div className="container-custom" style={{ maxWidth: '1180px' }}>
            <div className="mb-16">
              <h2 className="text-3xl text-gray-900 mb-6 font-medium">
                Concept: My Approach
              </h2>
              <div className="max-w-[680px]">
                <p className="text-lg text-gray-600 leading-relaxed mb-8 font-normal">
                For this project, I conceptualized and designed an AI navigation system grounded in a Zero UI approach. The AI model will translate user intent directly into outcomes, autonomously automating complex workflows without requiring users to operate traditional interfaces. With value-based pricing and continuous AI improvement, it will evolve into a self-running service that performs work, scales instantly, and minimises the need for explicit user interaction.
                </p>
              </div>
             
            </div>

            {/* UI Screenshots with alternating layout */}
            <div className="space-y-20">
              {/* Intent Detection - Text left, Screenshot right */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="max-w-[680px]">
                  <h3 className="text-2xl text-gray-900 mb-4 font-medium">
                    Intent Detection
                  </h3>
                  <p className="text-gray-700 mb-4 font-normal">
                    The AI Navigation Engine uses natural language processing to understand user goals from natural language, interpreting meaning rather than exact keywords or terminology. It provides confidence scoring for search result relevance and handles conversational queries and follow-up questions.
                  </p>
                </div>
                <div>
                  <img
                    src="/Ai_nav_prototyp.svg"
                    alt="Intent detection interface"
                    className="w-full max-w-sm mx-auto"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Flow-Based Guidance - Screenshot left, Text right */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1">
                  <img
                    src="/Ai_nav_pic2.png"
                    alt="Flow-based guidance interface"
                    className="w-full"
                    loading="lazy"
                  />
                </div>
                <div className="order-1 lg:order-2 max-w-[680px]">
                  <h3 className="text-2xl text-gray-900 mb-4 font-medium">
                    Flow-Based Guidance
                  </h3>
                  <p className="text-gray-700 mb-4 font-normal">
                    The system provides dynamic step-by-step navigation tailored to user needs, with conditional visibility based on user context. It enables seamless transitions between authentication and destination, supporting multi-step flows with branching logic.
                  </p>
                </div>
              </div>

              {/* Context Awareness - Text left, Screenshot right */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="max-w-[680px]">
                  <h3 className="text-2xl text-gray-900 mb-4 font-medium">
                    Context Awareness
                  </h3>
                  <p className="text-gray-700 mb-4 font-normal">
                    The navigation system maintains session tracking and state management across flows, with device and language adaptation. It provides personalized suggestions based on user behavior and maintains context through authentication steps.
                  </p>
                </div>
                  <div>
                    <img
                    src="/Ai_nav_pic3.png"
                    alt="Context awareness interface"
                    className="w-full"
                      loading="lazy"
                    />
                  </div>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="border-t border-gray-200"></div>

        {/* 4.5) SYSTEM BLUEPRINT - After screenshots */}
        <section className="py-32 lg:py-40 bg-white">
          <div className="container-custom" style={{ maxWidth: '1180px' }}>
            <div className="max-w-[680px] mx-auto mb-16 text-center">
              <h2 className="text-3xl text-gray-900 mb-6 font-medium">
                AI Navigation as a System Layer
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed font-normal">
                This conceptual system overview illustrates how intent detection, intelligent routing, authentication handling, and user feedback work together to create a seamless navigation experience.
              </p>
            </div>
          </div>
          
          {/* Diagram container - full width */}
          <div className="w-full">
            <div className="container-custom mb-6">
              <div className="text-center">
                <span className="text-sm text-gray-500 font-normal">
                  System-level blueprint (conceptual)
                </span>
              </div>
            </div>
            <div className="w-full">
              <img
                src="/AI_Navigation_as_a_System_Layer.svg"
                alt="AI Navigation System Layer blueprint showing intent detection, routing, authentication, and feedback flows"
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="border-t border-gray-200"></div>

        {/* Divider */}
        <div className="border-t border-gray-200"></div>

        {/* 5) IMPACT & DESIGN RATIONALE */}
        <section className="py-24 lg:py-32">
          <div className="container-custom">
            <div className="max-w-[680px] mx-auto mb-12 text-center">
              <h2 className="text-3xl text-gray-900 mb-4 font-medium">
                Impact & Design Rationale
              </h2>
              <p className="text-base text-gray-600 leading-relaxed font-normal">
                This section summarizes the value of the solution, the approach behind it, and the user insights that informed key decisions.
              </p>
            </div>

            {/* TOP ROW - Impact (compact cards) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              <div className="bg-white rounded-xl border" style={{ borderColor: 'rgba(0,0,0,0.08)', padding: '16px 20px' }}>
                <div className="flex-shrink-0 w-6 h-6 text-gray-900 mb-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="text-base font-medium text-gray-900 mb-2">Reduced navigation friction</h3>
                <ul className="space-y-1 text-gray-600 text-sm font-normal">
                  <li>• Faster information discovery</li>
                  <li>• No need to learn site structure</li>
                  <li>• Lower cognitive load</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl border" style={{ borderColor: 'rgba(0,0,0,0.08)', padding: '16px 20px' }}>
                <div className="flex-shrink-0 w-6 h-6 text-gray-900 mb-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-base font-medium text-gray-900 mb-2">Improved task completion</h3>
                <ul className="space-y-1 text-gray-600 text-sm font-normal">
                  <li>• Higher success rates</li>
                  <li>• Intent correctly interpreted</li>
                  <li>• Guided step-by-step flows</li>
                </ul>
              </div>
              
              <div className="bg-white rounded-xl border" style={{ borderColor: 'rgba(0,0,0,0.08)', padding: '16px 20px' }}>
                <div className="flex-shrink-0 w-6 h-6 text-gray-900 mb-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                </div>
                <h3 className="text-base font-medium text-gray-900 mb-2">Scalable architecture</h3>
                <ul className="space-y-1 text-gray-600 text-sm font-normal">
                  <li>• Self-hosted system</li>
                  <li>• API integrations</li>
                  <li>• Extensible content types</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl border" style={{ borderColor: 'rgba(0,0,0,0.08)', padding: '16px 20px' }}>
                <div className="flex-shrink-0 w-6 h-6 text-gray-900 mb-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-base font-medium text-gray-900 mb-2">Consistent UX</h3>
                <ul className="space-y-1 text-gray-600 text-sm font-normal">
                  <li>• Unified navigation experience</li>
                  <li>• Works across platforms</li>
                  <li>• Accessible design patterns</li>
                </ul>
              </div>
            </div>

            {/* MIDDLE ROW - Approach (horizontal, lightweight) */}
            <div className="max-w-[680px] mx-auto mb-16">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-8">
                <div className="flex items-start gap-3 flex-1">
                  <div className="flex-shrink-0 w-5 h-5 text-gray-900 mt-0.5">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 105.65 5.65a7.5 7.5 0 0010.99 10.99z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-1">Research</h3>
                    <p className="text-sm text-gray-600 font-normal">User behavior analysis and intent detection pattern research</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 flex-1">
                  <div className="flex-shrink-0 w-5 h-5 text-gray-900 mt-0.5">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.757.426 1.757 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.757-2.924 1.757-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.757-.426-1.757-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.607 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-1">Architecture</h3>
                    <p className="text-sm text-gray-600 font-normal">System design for intent-based navigation with LLM integration</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 flex-1">
                  <div className="flex-shrink-0 w-5 h-5 text-gray-900 mt-0.5">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-1">Prototyping</h3>
                    <p className="text-sm text-gray-600 font-normal">Prototype development with iterative flow refinement</p>
                  </div>
                </div>
              </div>
            </div>

            {/* BOTTOM ROW - User Insights (condensed) */}
            <div className="max-w-[680px] mx-auto">
              <h3 className="text-xl text-gray-900 mb-4 text-left font-medium">
                User Insights
              </h3>
              
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-base text-gray-700 font-normal">Users search based on goals and natural language, not menu labels or internal terminology</p>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-base text-gray-700 font-normal">Users expect conversational interfaces that understand intent, not hierarchical navigation systems</p>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-base text-gray-700 font-normal">Task completion rates significantly increase when systems interpret user intent rather than requiring exact keyword matches</p>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-base text-gray-700 font-normal">Users respond faster to AI-powered suggestions than traditional dropdown menus and filter trees</p>
                </li>
              </ul>
              
              {/* Optional toggle */}
              <details className="mt-8 pt-6 border-t border-gray-200">
                <summary 
                  className="cursor-pointer text-sm text-gray-900 font-medium hover:text-gray-700 transition-colors"
                  onClick={() => setResearchExpanded(!researchExpanded)}
                >
                  View detailed research notes
                  <svg 
                    className={`inline-block ml-2 w-4 h-4 transform transition-transform ${researchExpanded ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="mt-4 space-y-3 text-sm text-gray-600 font-normal">
                  <p>
                    Research was conducted through user interviews, analytics analysis, and usability testing on complex government and financial websites. The findings reveal consistent patterns in how users approach information architecture challenges.
                  </p>
                  <p>
                    Key insights include the disconnect between user mental models and organizational structures, the preference for conversational interfaces over hierarchical navigation, and the significant improvement in task completion rates when intent-based systems are implemented.
                  </p>
                </div>
              </details>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="border-t border-gray-200"></div>

        {/* 10) FINAL CTA */}
        <section className="py-32 lg:py-40">
          <div className="container-custom">
            <div className="max-w-[680px] mx-auto text-center">
              <h2 className="text-3xl text-gray-900 mb-6 font-medium">
                Interested in learning more?
              </h2>
              <p className="text-lg text-gray-600 mb-10 leading-relaxed font-normal">
                Let's discuss how I can help build scalable, user-centric solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/contact" 
                className="btn-primary text-lg px-8 py-4"
              >
                Contact me
              </Link>
              <Link 
                to="/case" 
                className="btn-secondary text-lg px-8 py-4"
              >
                View other cases
              </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
      
      {/* Case-specific feedback prompt */}
      <CaseFeedbackPrompt caseId="ai-navigation" />
    </>
  );
};

export default AINavigationCasePage;