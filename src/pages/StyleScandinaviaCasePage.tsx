import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Breadcrumbs from '../components/Breadcrumbs';

const StyleScandinaviaCasePage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Style Scandinavia - Carl Wahlen</title>
        <meta name="description" content="UX/SEO rebuild with +20% traffic first week, improved IA, templates and WCAG thinking." />
      </Helmet>
      
      <div className="min-h-screen bg-white">
        {/* 1) HERO */}
        <section className="pt-20 pb-24 lg:pt-36 lg:pb-32">
          <div className="container-hero">
            <div className="text-center w-full">
              {/* Badge */}
              <div className="inline-flex items-center px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-xs font-medium mb-6">
                Web Development + Internship
              </div>
              
              <h1 className="text-5xl lg:text-6xl text-gray-900 mb-6 font-medium leading-[56px] lg:leading-[64px]">
                  Style Scandinavia
                </h1>
              <p className="text-xl text-gray-600 leading-7 mb-8 font-normal max-w-2xl mx-auto">
                UX/SEO rebuild with measurable results: +20% traffic first week, improved IA, templates and WCAG thinking.
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
                  src="/Style_Scandinavia_web_mockup.png"
                  alt="Style Scandinavia responsive redesign mockup"
                className="w-full max-w-[40%] lg:max-w-[900px]"
                  loading="lazy"
                />
            </div>
          </div>
        </section>

        {/* Breadcrumbs */}
        <Breadcrumbs />

        {/* Divider */}
        <div className="border-t border-gray-200"></div>

        {/* 2) WHY THIS MATTERS */}
        <section className="py-24 lg:py-32">
          <div className="container-custom">
            <div className="max-w-[680px] mx-auto">
              <h2 className="text-[32px] text-gray-900 mb-6 leading-[40px] text-left font-medium">
                Why This Matters
              </h2>
              
              <p className="text-base text-gray-600 leading-6 mb-12 text-left font-normal">
                A complete rebuild of Style Scandinavia's digital presence focusing on user experience, search optimization, and accessibility. The project resulted in measurable improvements already in the first week.
              </p>
              
              {/* Icon list in two columns - 5-7 bullets */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 text-gray-900 mr-4 mt-0.5">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <p className="text-base text-gray-700 font-normal leading-6">Poor user experience limiting engagement and conversions</p>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 text-gray-900 mr-4 mt-0.5">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                  <p className="text-base text-gray-700 font-normal leading-6">Slow page speed impacting user satisfaction and rankings</p>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 text-gray-900 mr-4 mt-0.5">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <p className="text-base text-gray-700 font-normal leading-6">Low SEO performance limiting organic traffic growth</p>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 text-gray-900 mr-4 mt-0.5">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                </div>
                  <p className="text-base text-gray-700 font-normal leading-6">Accessibility barriers preventing inclusive user experience</p>
            </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 text-gray-900 mr-4 mt-0.5">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <p className="text-base text-gray-700 font-normal leading-6">Outdated information architecture causing navigation confusion</p>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 text-gray-900 mr-4 mt-0.5">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <p className="text-base text-gray-700 font-normal leading-6">No scalable content system for future development</p>
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
            <div className="max-w-[680px] mx-auto mb-16 text-left">
              <h2 className="text-[32px] text-gray-900 mb-6 leading-[40px] font-medium">
                Concept: My Approach
              </h2>
              <p className="text-base text-gray-600 leading-6 font-normal">
                Strategic combination of UX/UI design, SEO optimization, WCAG compliance, and content strategy to rebuild the digital presence with measurable results.
              </p>
            </div>

            {/* 3-column grid with visuals */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8" style={{ gap: '48px' }}>
              {/* Card 1: UX/UI Design */}
              <div className="bg-white rounded-xl border" style={{ borderColor: 'rgba(0,0,0,0.08)', padding: '32px' }}>
                <h3 className="text-xl text-gray-900 mb-4 font-medium">UX/UI Design</h3>
                <ul className="space-y-3 text-gray-700 mb-6 font-normal">
                  <li className="flex items-start">
                    <span className="text-gray-900 mr-2 mt-1">•</span>
                    <span>User-centered design process with prototyping and testing</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-900 mr-2 mt-1">•</span>
                    <span>Improved information architecture for better navigation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-900 mr-2 mt-1">•</span>
                    <span>Responsive design for all devices</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-900 mr-2 mt-1">•</span>
                    <span>Consistent design system and component patterns</span>
                  </li>
                </ul>
              </div>

              {/* Card 2: SEO Optimization */}
              <div className="bg-white rounded-xl border" style={{ borderColor: 'rgba(0,0,0,0.08)', padding: '32px' }}>
                <h3 className="text-xl text-gray-900 mb-4 font-medium">SEO Optimization</h3>
                <ul className="space-y-3 text-gray-700 mb-6 font-normal">
                  <li className="flex items-start">
                    <span className="text-gray-900 mr-2 mt-1">•</span>
                    <span>Technical SEO audit and fixes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-900 mr-2 mt-1">•</span>
                    <span>Keyword analysis and content optimization</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-900 mr-2 mt-1">•</span>
                    <span>Performance and loading time optimization</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-900 mr-2 mt-1">•</span>
                    <span>Structured data and meta tag optimization</span>
                  </li>
                </ul>
              </div>

              {/* Card 3: WCAG & Accessibility */}
              <div className="bg-white rounded-xl border" style={{ borderColor: 'rgba(0,0,0,0.08)', padding: '32px' }}>
                <h3 className="text-xl text-gray-900 mb-4 font-medium">WCAG Compliance</h3>
                <ul className="space-y-3 text-gray-700 mb-6 font-normal">
                  <li className="flex items-start">
                    <span className="text-gray-900 mr-2 mt-1">•</span>
                    <span>Accessibility audit and compliance improvements</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-900 mr-2 mt-1">•</span>
                    <span>Keyboard navigation and screen reader support</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-900 mr-2 mt-1">•</span>
                    <span>Color contrast and typography improvements</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-900 mr-2 mt-1">•</span>
                    <span>Semantic HTML and ARIA labels</span>
                  </li>
                </ul>
              </div>
                  </div>
                  </div>
        </section>

        {/* Divider */}
        <div className="border-t border-gray-200"></div>

        {/* 5) CAPABILITIES / WHAT THIS ENABLES */}
        <section className="py-24 lg:py-32">
          <div className="container-custom">
            <div className="max-w-[680px] mx-auto mb-12 text-left">
              <h2 className="text-[32px] text-gray-900 mb-6 leading-[40px] font-medium">
                What This Solution Enables
              </h2>
                  </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" style={{ gap: '24px' }}>
              <div className="bg-white rounded-xl border" style={{ borderColor: 'rgba(0,0,0,0.08)', padding: '24px 32px' }}>
                <div className="flex-shrink-0 w-6 h-6 text-gray-900 mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-3 leading-7">Improved IA</h3>
                <ul className="space-y-2 text-gray-600 text-sm font-normal">
                  <li>• Better navigation structure</li>
                  <li>• Clearer content organization</li>
                  <li>• Enhanced user flow</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl border" style={{ borderColor: 'rgba(0,0,0,0.08)', padding: '24px 32px' }}>
                <div className="flex-shrink-0 w-6 h-6 text-gray-900 mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Increased traffic</h3>
                <ul className="space-y-2 text-gray-600 text-sm font-normal">
                  <li>• +20% traffic first week</li>
                  <li>• Better SEO visibility</li>
                  <li>• Higher search rankings</li>
                </ul>
              </div>
              
              <div className="bg-white rounded-xl border" style={{ borderColor: 'rgba(0,0,0,0.08)', padding: '24px 32px' }}>
                <div className="flex-shrink-0 w-6 h-6 text-gray-900 mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Faster performance</h3>
                <ul className="space-y-2 text-gray-600 text-sm font-normal">
                  <li>• 74% faster load time</li>
                  <li>• Better Core Web Vitals</li>
                  <li>• Improved user experience</li>
                </ul>
                  </div>
              
              <div className="bg-white rounded-xl border" style={{ borderColor: 'rgba(0,0,0,0.08)', padding: '24px 32px' }}>
                <div className="flex-shrink-0 w-6 h-6 text-gray-900 mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  </div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Accessible design</h3>
                <ul className="space-y-2 text-gray-600 text-sm font-normal">
                  <li>• WCAG compliant</li>
                  <li>• Inclusive for all users</li>
                  <li>• Better accessibility scores</li>
                </ul>
                  </div>
                  </div>
                </div>
        </section>

        {/* Divider */}
        <div className="border-t border-gray-200"></div>

        {/* 6) PROCESS - HOW I APPROACHED */}
        <section className="py-24 lg:py-32 bg-gray-50">
          <div className="container-custom" style={{ maxWidth: '1180px' }}>
            <div className="max-w-[680px] mx-auto mb-12 text-left">
              <h2 className="text-[32px] text-gray-900 mb-6 leading-[40px] font-medium">
                How I Approached the Problem
              </h2>
              </div>

            <div className="relative">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full border border-gray-300 flex items-center justify-center text-gray-900">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 105.65 5.65a7.5 7.5 0 0010.99 10.99z" />
                    </svg>
                  </div>
                  <h3 className="text-xl text-gray-900 mb-3 font-medium">Research</h3>
                  <ul className="space-y-2 text-gray-700 text-left max-w-xs mx-auto text-sm font-normal">
                    <li className="flex items-start">
                      <span className="text-gray-900 mr-2 mt-1">•</span>
                      <span>User needs and behavior analysis</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gray-900 mr-2 mt-1">•</span>
                      <span>SEO audit and keyword research</span>
                    </li>
                  </ul>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full border border-gray-300 flex items-center justify-center text-gray-900">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.757.426 1.757 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.757-2.924 1.757-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.757-.426-1.757-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.607 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl text-gray-900 mb-3 font-medium">Design</h3>
                  <ul className="space-y-2 text-gray-700 text-left max-w-xs mx-auto text-sm font-normal">
                    <li className="flex items-start">
                      <span className="text-gray-900 mr-2 mt-1">•</span>
                      <span>UX/UI design and prototyping</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gray-900 mr-2 mt-1">•</span>
                      <span>Information architecture rebuild</span>
                    </li>
                  </ul>
                  </div>

                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full border border-gray-300 flex items-center justify-center text-gray-900">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 14l-1 5 5-1m11-11L9 18l-3-3L18 5a2.121 2.121 0 013 3z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 6l3 3" />
                    </svg>
                  </div>
                  <h3 className="text-xl text-gray-900 mb-3 font-medium">Implementation</h3>
                  <ul className="space-y-2 text-gray-700 text-left max-w-xs mx-auto text-sm font-normal">
                    <li className="flex items-start">
                      <span className="text-gray-900 mr-2 mt-1">•</span>
                      <span>Performance optimization</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gray-900 mr-2 mt-1">•</span>
                      <span>Template and component system</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="border-t border-gray-200"></div>

        {/* 7) RESULTS & METRICS */}
        <section className="py-24 lg:py-32">
          <div className="container-custom">
            <div className="max-w-[680px] mx-auto mb-12 text-left">
              <h2 className="text-[32px] text-gray-900 mb-6 leading-[40px] font-medium">
                Results & Metrics
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6" style={{ gap: '24px' }}>
              <div className="bg-white p-8 rounded-xl border-2 text-center" style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
                <div className="text-4xl font-bold text-gray-900 mb-2">1.3s</div>
                <div className="text-sm font-medium text-gray-700 mb-1">Load Time</div>
                <div className="text-xs text-gray-500">Before: 5.0s</div>
                <div className="text-sm font-semibold text-green-600 mt-2">-74% improvement</div>
              </div>
              
              <div className="bg-white p-8 rounded-xl border-2 text-center" style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
                <div className="text-4xl font-bold text-gray-900 mb-2">100</div>
                <div className="text-sm font-medium text-gray-700 mb-1">SEO Score</div>
                <div className="text-xs text-gray-500">Before: 67</div>
                <div className="text-sm font-semibold text-green-600 mt-2">+49% improvement</div>
              </div>
              
              <div className="bg-white p-8 rounded-xl border-2 text-center" style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
                <div className="text-4xl font-bold text-gray-900 mb-2">+20%</div>
                <div className="text-sm font-medium text-gray-700 mb-1">Traffic First Week</div>
                <div className="text-xs text-gray-500">Organic growth</div>
                <div className="text-sm font-semibold text-green-600 mt-2">Immediate impact</div>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="border-t border-gray-200"></div>

        {/* 10) FINAL CTA */}
        <section className="py-32 lg:py-40">
          <div className="container-custom">
            <div className="max-w-[680px] mx-auto text-center">
              <h2 className="text-[32px] text-gray-900 mb-6 leading-[40px] font-medium">
                Interested in learning more?
            </h2>
              <p className="text-base text-gray-600 mb-10 leading-6 font-normal">
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
    </>
  );
};

export default StyleScandinaviaCasePage;