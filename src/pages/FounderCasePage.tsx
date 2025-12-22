import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Breadcrumbs from '../components/Breadcrumbs';

const FounderCasePage: React.FC = () => {
  const [researchExpanded, setResearchExpanded] = useState(false);

  return (
    <>
      <Helmet>
        <title>Payment Orchestration Architecture & Market Study - Carl Wahlen</title>
        <meta name="description" content="Exploring how multi-PSP routing, unified APIs and orchestration patterns could unlock more resilient and flexible payment flows." />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://carlwahlen.com/case/payment-orchestration" />
        <meta property="og:title" content="Payment Orchestration Architecture & Market Study - Carl Wahlen Product Strategy Consultant" />
        <meta property="og:description" content="Exploring how multi-PSP routing, unified APIs and orchestration patterns could unlock more resilient and flexible payment flows." />
        <meta property="og:image" content="https://carlwahlen.com/og-image-founder.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Carl Wahlen" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://carlwahlen.com/case/payment-orchestration" />
        <meta property="twitter:title" content="Payment Orchestration Architecture & Market Study - Carl Wahlen Product Strategy Consultant" />
        <meta property="twitter:description" content="Exploring how multi-PSP routing, unified APIs and orchestration patterns could unlock more resilient and flexible payment flows." />
        <meta property="twitter:image" content="https://carlwahlen.com/og-image-founder.jpg" />

        {/* Additional SEO */}
        <meta name="keywords" content="payment orchestration, payment architecture, market study, fintech MVP development, market research validation, startup development, product strategy, business development, payment service provider, fintech innovation" />
        <link rel="canonical" href="https://carlwahlen.com/case/payment-orchestration" />
      </Helmet>
      
      <div className="min-h-screen bg-white">
        {/* 1) HERO */}
        <section className="pt-20 pb-24 lg:pt-28 lg:pb-32">
          <div className="container-hero">
            <div className="text-center w-full">
              {/* Badge */}
              <div className="inline-flex items-center px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-xs font-medium mb-6">
                Market Research + MVP development
              </div>
              
              <h1 className="text-5xl lg:text-6xl text-gray-900 mb-6 font-medium leading-[56px] lg:leading-[64px]">
                Payment Orchestration Architecture<br />& Market Study
                </h1>
              <p className="text-xl text-gray-600 leading-7 mb-8 font-normal max-w-2xl mx-auto">
                Exploring how multi-PSP routing, unified APIs and data-driven orchestration could enable more flexible and resilient payments.
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
                  src="/Payment_app_flow.png"
                alt="Payment orchestration concept mockup showing laptop and mobile devices"
                className="w-full max-w-[90%] lg:max-w-[1200px]"
                  loading="lazy"
                />
            </div>
          </div>
        </section>

        {/* Breadcrumbs */}
        <Breadcrumbs />

        {/* Divider */}
        <div className="border-t border-gray-200"></div>

        {/* 2) WHY ORCHESTRATION MATTERS */}
        <section className="py-16 lg:py-20">
          <div className="container-custom" style={{ maxWidth: '1180px' }}>
            <div>
              <h2 className="text-3xl text-gray-900 mb-12">
                Why Orchestration Matters
              </h2>
              
              {/* Icon list in two columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 text-gray-900 mr-4 mt-0.5">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <p className="text-base text-gray-700 font-normal leading-6">Single PSP dependency creates risk when providers experience downtime</p>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 text-gray-900 mr-4 mt-0.5">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <p className="text-base text-gray-700 font-normal leading-6">Hard rejections instead of intelligent retry and failover strategies</p>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 text-gray-900 mr-4 mt-0.5">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                    </svg>
                  </div>
                  <p className="text-base text-gray-700 font-normal leading-6">Fragmented data across providers makes optimization difficult</p>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 text-gray-900 mr-4 mt-0.5">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <p className="text-base text-gray-700 font-normal leading-6">No flexibility to optimize routing based on performance or cost</p>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 text-gray-900 mr-4 mt-0.5">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                  <p className="text-base text-gray-700 font-normal leading-6">Adding or switching PSPs requires complex new integrations</p>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 text-gray-900 mr-4 mt-0.5">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-base text-gray-700 font-normal leading-6">Limited visibility into payment performance across providers</p>
                </div>
              </div>

              {/* Small diagram row */}
              <div className="flex flex-col md:flex-row items-start justify-center gap-8 md:gap-12 pt-8 border-t border-gray-200">
                <div className="flex-1">
                  <h3 className="text-xl text-gray-900 mb-6 leading-7 text-left font-medium">PSP Routing</h3>
                  <div className="text-center">
                <img
                  src="/psp_flow.svg"
                      alt="Traditional single PSP flow"
                      className="w-full"
                      loading="lazy"
                    />
                  </div>
                </div>
                
                <div className="flex-shrink-0 pt-10 md:pt-14">
                  <svg className="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl text-gray-900 mb-6 leading-7 text-left font-medium">Payment Orchestration Routing</h3>
                  <div className="text-center">
                    <img
                      src="/paymenOrchestration_flow.svg"
                      alt="Payment orchestration flow with multiple PSPs"
                      className="w-full"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="border-t border-gray-200"></div>

        {/* 3) CONCEPT: MY ORCHESTRATION APPROACH */}
        <section className="py-16 lg:py-20 bg-gray-50">
          <div className="container-custom" style={{ maxWidth: '1180px' }}>
            {/* My Orchestration Concept - Text above, Large screenshot below */}
            <div className="mb-20">
              <div className="max-w-[680px] mb-12">
                <h2 className="text-[32px] text-gray-900 mb-6 leading-[40px] font-medium">
                  My Orchestration Concept
                </h2>
                <p className="text-base text-gray-600 leading-6 font-normal">
                  For this project, I conceptualized and designed a payment orchestration system that starts with rule-based routing for immediate control, while building toward signal-based logic and future AI-assisted decisioning. The goal is to provide merchants with flexible, resilient payment infrastructure that adapts as transaction data accumulates.
                </p>
              </div>
              <div className="w-full">
                <img
                  src="/Dashboard.png"
                  alt="Payment orchestration concept dashboard"
                  className="w-full"
                  loading="lazy"
                />
              </div>
            </div>

            {/* UI Screenshots with alternating layout */}
            <div className="space-y-20">
              {/* Centralized visibility - Text left, Screenshot right */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="max-w-[680px]">
                  <h3 className="text-xl text-gray-900 mb-4 leading-7 font-medium">
                    Centralized visibility
                  </h3>
                  <p className="text-gray-700 mb-4 font-normal">
                    The dashboard provides merchants and operations teams with a centralized view of payment orchestration metrics, including transaction volumes, success rates, and performance across multiple PSPs. Key metrics and visualizations help teams monitor real-time payment flows and identify optimization opportunities.
                  </p>
                </div>
                <div>
                  <img
                    src="/Dashboard.png"
                    alt="Centralized visibility dashboard"
                    className="w-full"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Multi-provider management - Screenshot left, Text right */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="lg:order-1">
                  <img
                    src="/connections.png"
                    alt="Connections interface showing PSP integrations"
                    className="w-full"
                    loading="lazy"
                  />
                </div>
                <div className="lg:order-2 max-w-[680px]">
                  <h3 className="text-xl text-gray-900 mb-4 leading-7 font-medium">
                    Multi-provider management
                  </h3>
                  <p className="text-gray-700 mb-4 font-normal">
                    The connections interface allows teams to manage multiple payment service provider integrations from a single view. Each PSP connection can be configured, tested, and monitored independently, enabling merchants to easily add or switch providers without complex technical integration work.
                  </p>
                </div>
              </div>

              {/* Visual routing configuration - Text left, Screenshot right */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="max-w-[680px]">
                  <h3 className="text-xl text-gray-900 mb-4 leading-7 font-medium">
                    Visual routing configuration
                  </h3>
                  <p className="text-gray-700 mb-4 font-normal">
                    The dynamic routing builder enables visual configuration of payment flows with conditional logic, A/B splits, and failover strategies. Teams can design complex routing rules based on transaction characteristics, card types, regions, or PSP performance.
                  </p>
                </div>
                <div>
                  <img
                    src="/dynamic_routing.png"
                    alt="Dynamic routing interface showing rule builder"
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

        {/* 4) WHAT ORCHESTRATION ENABLES */}
        <section className="py-16 lg:py-20">
          <div className="container-custom" style={{ maxWidth: '1180px' }}>
            <div>
              <h2 className="text-3xl text-gray-900 mb-12">
                What Orchestration Enables
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <div className="flex-shrink-0 w-6 h-6 text-gray-900 mb-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Unified API</h3>
                  <p className="text-gray-600 text-sm font-normal">Multiple PSPs under a single unified API interface.</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <div className="flex-shrink-0 w-6 h-6 text-gray-900 mb-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Smart routing</h3>
                  <p className="text-gray-600 text-sm font-normal">Route transactions based on rules, region, card type or response time.</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <div className="flex-shrink-0 w-6 h-6 text-gray-900 mb-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Retry & failover</h3>
                  <p className="text-gray-600 text-sm font-normal">Intelligent retry logic and failover instead of hard rejections.</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <div className="flex-shrink-0 w-6 h-6 text-gray-900 mb-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Unified data</h3>
                  <p className="text-gray-600 text-sm font-normal">Centralized data visualization across all payment providers.</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg border border-gray-200 md:col-span-2">
                  <div className="flex-shrink-0 w-6 h-6 text-gray-900 mb-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Easy switching</h3>
                  <p className="text-gray-600 text-sm font-normal">Faster switching or adding PSPs without new integration work.</p>
                </div>
              </div>

              <p className="text-sm text-gray-500 text-center italic mt-8">
                Designed as concept & technical exploration, not production release.
              </p>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="border-t border-gray-200"></div>

        {/* 5) HOW I APPROACHED THE PROBLEM */}
        <section className="py-16 lg:py-20">
          <div className="container-custom" style={{ maxWidth: '1180px' }}>
            <div className="max-w-[680px] mx-auto mb-12 text-center">
              <h2 className="text-[32px] text-gray-900 mb-6 leading-[40px] font-medium">
                How I Approached the Problem
              </h2>
            </div>
            
            <div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full border border-gray-300 flex items-center justify-center font-semibold text-xl text-gray-900">
                    1
                  </div>
                  <h3 className="text-xl text-gray-900 mb-3 leading-7 font-medium">Research</h3>
                  <p className="text-gray-700 text-sm font-normal max-w-xs mx-auto">
                    Mapped the orchestration landscape, analyzed market models, and identified key pain points and opportunities.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full border border-gray-300 flex items-center justify-center font-semibold text-xl text-gray-900">
                    2
                  </div>
                  <h3 className="text-xl text-gray-900 mb-3 font-medium">Architecture</h3>
                  <p className="text-gray-700 text-sm font-normal max-w-xs mx-auto">
                    Designed system architecture prioritizing rule-based routing first, with scalability toward signal-based logic.
                  </p>
              </div>
              
              <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full border border-gray-300 flex items-center justify-center font-semibold text-xl text-gray-900">
                    3
                  </div>
                  <h3 className="text-xl text-gray-900 mb-3 font-medium">UI Prototype</h3>
                  <p className="text-gray-700 text-sm font-normal max-w-xs mx-auto">
                    Explored interface concepts to understand how merchants and operations teams would interact with orchestration capabilities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="border-t border-gray-200"></div>

        {/* 6) MARKET INSIGHTS */}
        <section className="py-16 lg:py-20 bg-gray-50">
          <div className="container-custom" style={{ maxWidth: '1180px' }}>
            <div>
              <h2 className="text-[32px] text-gray-900 mb-6 leading-[40px] font-medium">
                Market Landscape Insights
              </h2>
              <p className="text-base text-gray-600 mb-10 leading-6 font-normal">
                To understand how orchestration works in practice, I mapped the current market and compared three common architectural approaches.
              </p>

              {/* Compact table */}
              <div className="mb-8">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b-2 border-gray-300">
                        <th className="text-left py-3 px-4 text-gray-900 font-semibold">Model</th>
                        <th className="text-left py-3 px-4 text-gray-900 font-semibold">Routing</th>
                        <th className="text-left py-3 px-4 text-gray-900 font-semibold">Flexibility</th>
                        <th className="text-left py-3 px-4 text-gray-900 font-semibold">Complexity</th>
                        <th className="text-left py-3 px-4 text-gray-900 font-semibold">Best for</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-200">
                        <td className="py-3 px-4 text-gray-900 font-medium">Rule-based</td>
                        <td className="py-3 px-4 text-gray-600">Static</td>
                        <td className="py-3 px-4 text-gray-600">Low</td>
                        <td className="py-3 px-4 text-gray-600">Low</td>
                        <td className="py-3 px-4 text-gray-600">Small merchants with stable flows</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="py-3 px-4 text-gray-900 font-medium">Cloud-native</td>
                        <td className="py-3 px-4 text-gray-600">Dynamic</td>
                        <td className="py-3 px-4 text-gray-600">Medium</td>
                        <td className="py-3 px-4 text-gray-600">Medium</td>
                        <td className="py-3 px-4 text-gray-600">Growth-stage merchants</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-gray-900 font-medium">AI-driven</td>
                        <td className="py-3 px-4 text-gray-600">Predictive</td>
                        <td className="py-3 px-4 text-gray-600">High</td>
                        <td className="py-3 px-4 text-gray-600">High</td>
                        <td className="py-3 px-4 text-gray-600">Large volume + rich data</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <p className="text-base text-gray-600 mb-8 leading-6 font-normal">
                Each orchestration model represents a different balance between control, adaptability, and operational complexity.
              </p>

              {/* Expandable details */}
              <details className="mt-8">
                <summary 
                  className="cursor-pointer text-lg text-gray-900 font-medium hover:text-gray-700 transition-colors"
                  onClick={() => setResearchExpanded(!researchExpanded)}
                >
                   Show full research models
                  <svg 
                    className={`inline-block ml-2 w-5 h-5 transform transition-transform ${researchExpanded ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                
                <div className="space-y-12 mt-8 pt-8 border-t border-gray-200">
                  {/* Rule-based */}
                  <div>
                    <h4 className="text-xl text-gray-900 mb-4 leading-7 font-medium">Rule-based Orchestrators</h4>
                    <div className="mb-6">
                      <img
                        src="/Rule_based_Orchestrators.svg"
                        alt="Rule-based orchestration model"
                        className="w-full"
                        loading="lazy"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="text-lg text-gray-900 font-medium mb-3">Strengths</h5>
                        <ul className="space-y-2 text-gray-600">
                          <li className="flex items-start">
                            <span className="text-gray-900 mr-2 mt-1">+</span>
                            <span>Predictable routing, full control</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-gray-900 mr-2 mt-1">+</span>
                            <span>Low infrastructure complexity</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="text-lg text-gray-900 font-medium mb-3">Limitations</h5>
                        <ul className="space-y-2 text-gray-600">
                          <li className="flex items-start">
                            <span className="text-gray-900 mr-2 mt-1">-</span>
                            <span>No real-time adaptation</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-gray-900 mr-2 mt-1">-</span>
                            <span>Manual rule updates required</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Cloud-native */}
                  <div>
                    <h4 className="text-xl text-gray-900 mb-4 font-medium">Cloud-native Orchestrators</h4>
                    <div className="mb-6">
                      <img
                        src="/Cloud_native_Orchestrators.svg"
                        alt="Cloud-native orchestration model"
                        className="w-full"
                        loading="lazy"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="text-lg text-gray-900 font-medium mb-3">Strengths</h5>
                        <ul className="space-y-2 text-gray-600">
                          <li className="flex items-start">
                            <span className="text-gray-900 mr-2 mt-1">+</span>
                            <span>Dynamic routing + auto failover</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-gray-900 mr-2 mt-1">+</span>
                            <span>Managed infrastructure</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="text-lg text-gray-900 font-medium mb-3">Limitations</h5>
                        <ul className="space-y-2 text-gray-600">
                          <li className="flex items-start">
                            <span className="text-gray-900 mr-2 mt-1">-</span>
                            <span>Vendor dependency</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-gray-900 mr-2 mt-1">-</span>
                            <span>Less granular control</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* AI-driven */}
                  <div>
                    <h4 className="text-xl text-gray-900 mb-4 font-medium">AI-driven Orchestrators</h4>
                    <div className="mb-6">
                      <img
                        src="/AI_driven_Orchestrators.svg"
                        alt="AI-driven orchestration model"
                        className="w-full"
                        loading="lazy"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="text-lg text-gray-900 font-medium mb-3">Strengths</h5>
                        <ul className="space-y-2 text-gray-600">
                          <li className="flex items-start">
                            <span className="text-gray-900 mr-2 mt-1">+</span>
                            <span>Learns patterns + adapts over time</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-gray-900 mr-2 mt-1">+</span>
                            <span>Self-optimizing routing</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="text-lg text-gray-900 font-medium mb-3">Limitations</h5>
                        <ul className="space-y-2 text-gray-600">
                          <li className="flex items-start">
                            <span className="text-gray-900 mr-2 mt-1">-</span>
                            <span>Requires volume/data to be effective</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-gray-900 mr-2 mt-1">-</span>
                            <span>Higher operational complexity</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </details>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="border-t border-gray-200"></div>

        {/* 6) POSITIONING VISUAL */}
        <section className="py-16 lg:py-20">
          <div className="container-custom" style={{ maxWidth: '1180px' }}>
            <div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <img
                    src="/My_positioning_triangle.svg"
                    alt="Positioning triangle showing orchestration models"
                    className="w-full"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h2 className="text-[32px] text-gray-900 mb-6 leading-[40px] font-medium">
                    Positioning: Where My Orchestration Fits
                  </h2>
                  <p className="text-base text-gray-600 mb-6 leading-6 font-normal">
                    After mapping the orchestration landscape, a clear gap emerged between cloud-native platforms and AI-driven systems. This concept sits in the space between those models, starting with rule-based routing for immediate control and flexibility, while building the foundation for signal-based logic and future AI-assisted decisioning.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="border-t border-gray-200"></div>

        {/* 7) STRATEGIC DIRECTION */}
        <section className="py-16 lg:py-20 bg-gray-50">
          <div className="container-custom" style={{ maxWidth: '1180px' }}>
            <div>
              <h2 className="text-3xl text-gray-900 mb-6 text-left font-medium">
                Strategic Direction - Concept Evolution
              </h2>
              <p className="text-base text-gray-600 mb-12 text-left max-w-2xl leading-6 font-normal">
                This research-driven concept explores how an orchestration system could evolve from initial foundation to future intelligence. The purpose is not to present a finished product, but to demonstrate how insights from the market study inform thinking about architectural phases.
              </p>

              {/* Three phases */}
              <div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Phase 1 */}
                  <div className="text-left">
                  <div className="w-16 h-16 mb-6 rounded-full border border-gray-300 flex items-center justify-center font-semibold text-xl text-gray-900">
                      1
                    </div>
                    <h3 className="text-xl text-gray-900 mb-3 font-medium">Phase 1 — Foundation</h3>
                    <p className="text-sm text-gray-600 mb-4 font-normal italic">Establishing core orchestration capabilities</p>
                    <ul className="space-y-2 text-gray-700 text-left font-normal">
                      <li className="flex items-start">
                        <span className="text-gray-900 mr-2 mt-1">•</span>
                        <span className="text-sm">Unified API layer</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-gray-900 mr-2 mt-1">•</span>
                        <span className="text-sm">Basic routing rules</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-gray-900 mr-2 mt-1">•</span>
                        <span className="text-sm">Retry logic and failover</span>
                      </li>
                    </ul>
                  </div>

                  {/* Phase 2 */}
                  <div className="text-left">
                  <div className="w-16 h-16 mb-6 rounded-full border border-gray-300 flex items-center justify-center font-semibold text-xl text-gray-900">
                      2
                    </div>
                    <h3 className="text-xl text-gray-900 mb-3 font-medium">Phase 2 — Growth Potential</h3>
                    <p className="text-sm text-gray-600 mb-4 font-normal italic">Adding dynamic routing and observability</p>
                    <ul className="space-y-2 text-gray-700 text-left font-normal">
                      <li className="flex items-start">
                        <span className="text-gray-900 mr-2 mt-1">•</span>
                        <span className="text-sm">Dynamic rule engine</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-gray-900 mr-2 mt-1">•</span>
                        <span className="text-sm">Data collection infrastructure</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-gray-900 mr-2 mt-1">•</span>
                        <span className="text-sm">Observability dashboards</span>
                      </li>
                    </ul>
                  </div>

                  {/* Phase 3 */}
                  <div className="text-left">
                  <div className="w-16 h-16 mb-6 rounded-full border border-gray-300 flex items-center justify-center font-semibold text-xl text-gray-900">
                      3
                    </div>
                    <h3 className="text-xl text-gray-900 mb-3 font-medium">Phase 3 — Future Opportunity</h3>
                    <p className="text-sm text-gray-600 mb-4 font-normal italic">Exploring AI-assisted decisioning</p>
                    <ul className="space-y-2 text-gray-700 text-left font-normal">
                      <li className="flex items-start">
                        <span className="text-gray-900 mr-2 mt-1">•</span>
                        <span className="text-sm">AI-assisted routing decisions</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-gray-900 mr-2 mt-1">•</span>
                        <span className="text-sm">Pattern detection models</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-gray-900 mr-2 mt-1">•</span>
                        <span className="text-sm">Adaptive decision-making</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-500 text-left italic mt-12 font-normal">
                This illustrates conceptual evolution, not a delivery roadmap.
              </p>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="border-t border-gray-200"></div>

        {/* 8) CLOSING + CTA */}
        <section className="py-20 lg:py-28">
          <div className="container-custom" style={{ maxWidth: '1180px' }}>
            <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl text-gray-900 mb-6">
                Interested in the orchestration concept?
            </h2>
              <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                I'd love to discuss research findings, potential collaborations, or product development pathways.
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
                  View other case studies
              </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default FounderCasePage;