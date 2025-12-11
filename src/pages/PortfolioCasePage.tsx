import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Breadcrumbs from '../components/Breadcrumbs';

const PortfolioCasePage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Portfolio Website - Carl Wahlen</title>
        <meta name="description" content="Custom-built portfolio demonstrating technical execution, modern React/TypeScript architecture, and UX-centered design." />
      </Helmet>
      
      <div className="min-h-screen bg-white">
        {/* 1) HERO */}
        <section className="pt-20 pb-24 lg:pt-36 lg:pb-32">
          <div className="container-hero">
            <div className="text-center w-full">
              {/* Badge */}
              <div className="inline-flex items-center px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-xs font-medium mb-6">
                Web Development
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-6 font-medium leading-tight">
                  Portfolio Website
                </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-8 font-normal max-w-2xl mx-auto">
                Custom-built portfolio demonstrating technical execution, modern React/TypeScript architecture, and UX-centered design.
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
                  src="/Portfolio_website_mockup2.png"
                alt="Portfolio website mockup"
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
              <h2 className="text-3xl text-gray-900 mb-6 text-center font-medium">
                Why This Matters
                </h2>
              
              <p className="text-lg text-gray-600 leading-relaxed mb-12 text-center font-normal">
                This portfolio website demonstrates full-stack development capabilities through custom React/TypeScript implementation, user-centered design principles, and performance-optimized architecture.
                </p>
                
              {/* Icon list in two columns - 5-7 bullets */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 text-gray-900 mr-4 mt-0.5">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <p className="text-lg text-gray-700 font-normal">Built from scratch without WordPress or drag-and-drop tools</p>
                  </div>
                
                  <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 text-gray-900 mr-4 mt-0.5">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                  </div>
                  <p className="text-lg text-gray-700 font-normal">Component-based architecture for maintainable code</p>
              </div>
              
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 text-gray-900 mr-4 mt-0.5">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                  <p className="text-lg text-gray-700 font-normal">Fast load times and Core Web Vitals optimization</p>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 text-gray-900 mr-4 mt-0.5">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <p className="text-lg text-gray-700 font-normal">Comprehensive SEO with structured data</p>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 text-gray-900 mr-4 mt-0.5">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <p className="text-lg text-gray-700 font-normal">WCAG-compliant accessible design</p>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 text-gray-900 mr-4 mt-0.5">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-lg text-gray-700 font-normal">Consistent design system with reusable components</p>
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
            <div className="max-w-[680px] mx-auto mb-16 text-center">
              <h2 className="text-3xl text-gray-900 mb-6 font-medium">
                Concept: My Approach
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed font-normal">
                Built with a focus on technical excellence, performance optimization, and user-centered design. The architecture prioritizes maintainability, scalability, and best practices for modern web development.
              </p>
            </div>
            
            {/* 3-column grid with visuals */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8" style={{ gap: '48px' }}>
              {/* Card 1: Architecture */}
              <div className="bg-white rounded-xl border" style={{ borderColor: 'rgba(0,0,0,0.08)', padding: '32px' }}>
                <h3 className="text-xl text-gray-900 mb-4 font-medium">Architecture & Planning</h3>
                <ul className="space-y-3 text-gray-700 mb-6 font-normal">
                  <li className="flex items-start">
                    <span className="text-gray-900 mr-2 mt-1">•</span>
                    <span>Component-based React architecture</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-900 mr-2 mt-1">•</span>
                    <span>TypeScript for type safety</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-900 mr-2 mt-1">•</span>
                    <span>Tailwind CSS styling system</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-900 mr-2 mt-1">•</span>
                    <span>Vite for fast development and builds</span>
                  </li>
                </ul>
              </div>
              
              {/* Card 2: UX & Design */}
              <div className="bg-white rounded-xl border" style={{ borderColor: 'rgba(0,0,0,0.08)', padding: '32px' }}>
                <h3 className="text-xl text-gray-900 mb-4 font-medium">UX & Design Principles</h3>
                <ul className="space-y-3 text-gray-700 mb-6 font-normal">
                  <li className="flex items-start">
                    <span className="text-gray-900 mr-2 mt-1">•</span>
                    <span>User-centered design approach</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-900 mr-2 mt-1">•</span>
                    <span>Consistent 4-point spacing system</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-900 mr-2 mt-1">•</span>
                    <span>Clear visual hierarchy</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-900 mr-2 mt-1">•</span>
                    <span>WCAG accessibility compliance</span>
                  </li>
                </ul>
              </div>
              
              {/* Card 3: Performance & SEO */}
              <div className="bg-white rounded-xl border" style={{ borderColor: 'rgba(0,0,0,0.08)', padding: '32px' }}>
                <h3 className="text-xl text-gray-900 mb-4 font-medium">Performance & SEO</h3>
                <ul className="space-y-3 text-gray-700 mb-6 font-normal">
                  <li className="flex items-start">
                    <span className="text-gray-900 mr-2 mt-1">•</span>
                    <span>React Helmet for meta management</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-900 mr-2 mt-1">•</span>
                    <span>Structured data (JSON-LD)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-900 mr-2 mt-1">•</span>
                    <span>Core Web Vitals optimization</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-900 mr-2 mt-1">•</span>
                    <span>Mobile-first responsive design</span>
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
            <div className="max-w-[680px] mx-auto mb-12 text-center">
              <h2 className="text-3xl text-gray-900 mb-6 font-medium">
                What This Solution Enables
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" style={{ gap: '24px' }}>
              <div className="bg-white rounded-xl border" style={{ borderColor: 'rgba(0,0,0,0.08)', padding: '24px 32px' }}>
                <div className="flex-shrink-0 w-6 h-6 text-gray-900 mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Modular system</h3>
                <ul className="space-y-2 text-gray-600 text-sm font-normal">
                  <li>• Component-based architecture</li>
                  <li>• Reusable UI elements</li>
                  <li>• Maintainable codebase</li>
                </ul>
              </div>
              
              <div className="bg-white rounded-xl border" style={{ borderColor: 'rgba(0,0,0,0.08)', padding: '24px 32px' }}>
                <div className="flex-shrink-0 w-6 h-6 text-gray-900 mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Fast performance</h3>
                <ul className="space-y-2 text-gray-600 text-sm font-normal">
                  <li>• Optimized load times</li>
                  <li>• Core Web Vitals</li>
                  <li>• Efficient builds</li>
                </ul>
              </div>
              
              <div className="bg-white rounded-xl border" style={{ borderColor: 'rgba(0,0,0,0.08)', padding: '24px 32px' }}>
                <div className="flex-shrink-0 w-6 h-6 text-gray-900 mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">SEO optimized</h3>
                <ul className="space-y-2 text-gray-600 text-sm font-normal">
                  <li>• Structured data</li>
                  <li>• Meta tag management</li>
                  <li>• Search visibility</li>
                </ul>
              </div>
              
              <div className="bg-white rounded-xl border" style={{ borderColor: 'rgba(0,0,0,0.08)', padding: '24px 32px' }}>
                <div className="flex-shrink-0 w-6 h-6 text-gray-900 mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Consistent UX</h3>
                <ul className="space-y-2 text-gray-600 text-sm font-normal">
                  <li>• Design system</li>
                  <li>• Reusable components</li>
                  <li>• Accessible patterns</li>
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
            <div className="max-w-[680px] mx-auto mb-12 text-center">
              <h2 className="text-3xl text-gray-900 mb-6 font-medium">
                How I Approached the Problem
              </h2>
            </div>
            
                <div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-left">
                  <div className="w-16 h-16 mb-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-900">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 105.65 5.65a7.5 7.5 0 0010.99 10.99z" />
                    </svg>
                  </div>
                  <h3 className="text-xl text-gray-900 mb-4 font-medium">Research</h3>
                  <ul className="space-y-2 text-gray-700 text-left text-sm font-normal">
                    <li className="flex items-start">
                      <span className="text-gray-900 mr-4 mt-0">•</span>
                      <span>Technology stack selection</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gray-900 mr-4 mt-0">•</span>
                      <span>Design system planning</span>
                    </li>
                  </ul>
                </div>
                
                <div className="text-left">
                  <div className="w-16 h-16 mb-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-900">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.757.426 1.757 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.757-2.924 1.757-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.757-.426-1.757-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.607 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl text-gray-900 mb-4 font-medium">Architecture</h3>
                  <ul className="space-y-2 text-gray-700 text-left text-sm font-normal">
                    <li className="flex items-start">
                      <span className="text-gray-900 mr-4 mt-0">•</span>
                      <span>Component structure design</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gray-900 mr-4 mt-0">•</span>
                      <span>TypeScript implementation</span>
                    </li>
                  </ul>
                </div>
                
                <div className="text-left">
                  <div className="w-16 h-16 mb-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-900">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </div>
                  <h3 className="text-xl text-gray-900 mb-4 font-medium">Development</h3>
                  <ul className="space-y-2 text-gray-700 text-left text-sm font-normal">
                    <li className="flex items-start">
                      <span className="text-gray-900 mr-4 mt-0">•</span>
                      <span>Performance optimization</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gray-900 mr-4 mt-0">•</span>
                      <span>SEO implementation</span>
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
            <div className="max-w-[680px] mx-auto mb-12 text-center">
              <h2 className="text-3xl text-gray-900 mb-6 font-medium">
                Results & Metrics
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6" style={{ gap: '24px' }}>
              <div className="bg-white p-8 rounded-xl border-2 text-center" style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
                <div className="text-4xl font-bold text-gray-900 mb-2">1.3s</div>
                <div className="text-sm font-medium text-gray-700 mb-1">Load Time</div>
                <div className="text-xs text-gray-500">Measured via Lighthouse</div>
              </div>
              
              <div className="bg-white p-8 rounded-xl border-2 text-center" style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
                <div className="text-4xl font-bold text-gray-900 mb-2">100</div>
                <div className="text-sm font-medium text-gray-700 mb-1">SEO Score</div>
                <div className="text-xs text-gray-500">Measured via Lighthouse</div>
              </div>
              
              <div className="bg-white p-8 rounded-xl border-2 text-center" style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
                <div className="text-4xl font-bold text-gray-900 mb-2">98</div>
                <div className="text-sm font-medium text-gray-700 mb-1">Performance</div>
                <div className="text-xs text-gray-500">Measured via Lighthouse</div>
              </div>
              
              <div className="bg-white p-8 rounded-xl border-2 text-center" style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
                <div className="text-4xl font-bold text-gray-900 mb-2">100%</div>
                <div className="text-sm font-medium text-gray-700 mb-1">Mobile Responsive</div>
                <div className="text-xs text-gray-500">All breakpoints</div>
              </div>
              
              <div className="bg-white p-8 rounded-xl border-2 text-center" style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
                <div className="text-4xl font-bold text-gray-900 mb-2">0</div>
                <div className="text-sm font-medium text-gray-700 mb-1">External Dependencies</div>
                <div className="text-xs text-gray-500">No third-party bloat</div>
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
    </>
  );
};

export default PortfolioCasePage;