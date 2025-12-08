import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
// import Testimonials from '../components/Testimonials';
import RelatedArticles from '../components/RelatedArticles';
import Breadcrumbs from '../components/Breadcrumbs';

const Services: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <Helmet>
        <title>Services - Carl Wahlen</title>
        <meta name="description" content="Product strategy consulting services in Sweden: data-driven product development, UX/UI design, business development, and technology strategy. Let's build something great together." />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://carlwahlen.com/Services" />
        <meta property="og:title" content="Services - Carl Wahlen Product Strategy Consultant" />
        <meta property="og:description" content="Product strategy consulting services in Sweden: data-driven product development, UX/UI design, business development, and technology strategy. Let's build something great together." />
        <meta property="og:image" content="https://carlwahlen.com/og-image-services.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Carl Wahlen" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://carlwahlen.com/Services" />
        <meta property="twitter:title" content="Services - Carl Wahlen Product Strategy Consultant" />
        <meta property="twitter:description" content="Product strategy consulting services in Sweden: data-driven product development, UX/UI design, business development, and technology strategy." />
        <meta property="twitter:image" content="https://carlwahlen.com/og-image-services.jpg" />

        {/* Additional SEO */}
        <meta name="keywords" content="product strategy services Sweden, data-driven product development Stockholm, UX design services Nordic, UI design services Sweden, business development consulting Stockholm, technology strategy Nordic, product consultant services Sweden, digital strategy consulting Stockholm" />
        <link rel="canonical" href="https://carlwahlen.com/Services" />
      </Helmet>
      
      <main>
        {/* Hero Section */}
        <section className="min-h-screen w-full bg-gray-50 relative overflow-hidden">
          {/* Location and Time - Top corners */}
          <div className="absolute top-0 left-0 right-0 z-20 pt-[20px] md:pt-[100px]">
            <div className="container-hero flex justify-between">
              <p className="text-base text-gray-700 font-normal">Stockholm</p>
              <p className="text-base text-gray-700 font-normal">{currentTime}</p>
            </div>
          </div>
          
          {/* Tile pattern background - perfectly structured grid with diamonds at intersections */}
          <div 
            className="absolute inset-0 opacity-[0.01]"
            style={{
              backgroundImage: `
                url("data:image/svg+xml,%3Csvg width='80' height='80' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='tile-statement' width='80' height='80' patternUnits='userSpaceOnUse'%3E%3Crect width='80' height='80' fill='transparent'/%3E%3Cline x1='0' y1='0' x2='80' y2='0' stroke='%231f2937' stroke-width='0.5'/%3E%3Cline x1='0' y1='0' x2='0' y2='80' stroke='%231f2937' stroke-width='0.5'/%3E%3Cpolygon points='0,0 3,3 0,6 -3,3' fill='%231f2937'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23tile-statement)'/%3E%3C/svg%3E")
              `,
              backgroundSize: '80px 80px',
            }}
          />
          
          {/* Green signal lines going through the grid */}
          <div 
            className="absolute inset-0 opacity-[0.1]"
            style={{
              backgroundImage: `
                url("data:image/svg+xml,%3Csvg width='80' height='80' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='green-signals' width='80' height='80' patternUnits='userSpaceOnUse'%3E%3Crect width='80' height='80' fill='transparent'/%3E%3Cline x1='0' y1='40' x2='80' y2='40' stroke='%2310b981' stroke-width='1'/%3E%3Cline x1='40' y1='0' x2='40' y2='80' stroke='%2310b981' stroke-width='1'/%3E%3Cline x1='0' y1='0' x2='80' y2='80' stroke='%2310b981' stroke-width='0.8' opacity='0.6'/%3E%3Cline x1='0' y1='80' x2='80' y2='0' stroke='%2310b981' stroke-width='0.8' opacity='0.6'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23green-signals)'/%3E%3C/svg%3E")
              `,
              backgroundSize: '80px 80px',
            }}
          />
          
          {/* Services Heading - Absolutely positioned, centered on screen */}
          <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[calc(50%+270px)] md:-translate-y-[calc(50%+183px)] text-[48px] text-gray-900 font-medium text-center z-30">
                Services
              </h1>
          
          <div className="container-hero relative z-10 pt-[350px] md:pt-[585px] pb-20">
            {/* SCROLL to discover - above the three columns */}
            <div className="mb-[160px] md:mb-[123px] text-center">
              <a 
                href="#services-grid" 
                className="text-[12px] text-gray-400 font-normal tracking-wider cursor-pointer hover:text-gray-600 transition-colors inline-block"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('services-grid')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Scroll to discover
              </a>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24 items-start">
              {/* Column 1 - Main Text */}
              <div>
                <p className="text-lg md:text-xl text-gray-900 font-semibold leading-relaxed">
                  I create digital products that balance usability with results, simple for users and valuable for business.
                </p>
              </div>
              
              {/* Column 2 - Heading (hidden on mobile, shown on desktop) */}
              <div className="hidden md:flex justify-center">
                <h3 className="text-[14px] text-gray-900 font-normal text-left">
                  <a 
                    href="#services-grid" 
                    className="cursor-pointer hover:text-gray-600 transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('services-grid')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Our services:
                  </a>
                </h3>
              </div>
              
              {/* Column 3 - Services List */}
              <div className="md:ml-auto md:max-w-fit">
                {/* Heading shown on mobile above list */}
                <h3 className="text-[14px] text-gray-900 font-normal text-left mb-6 md:hidden">
                  <a 
                    href="#services-grid" 
                    className="cursor-pointer hover:text-gray-600 transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('services-grid')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Our services:
                  </a>
                </h3>
                
                <ul className="space-y-4">
                  <li className="flex items-center">
                    <span className="w-6 h-6 rounded-full border-2 border-gray-900 bg-white flex items-center justify-center text-gray-900 text-sm font-medium mr-4 flex-shrink-0">1</span>
                    <a 
                      href="#product-gtm" 
                      className="text-[12px] text-gray-900 cursor-pointer hover:text-gray-600 transition-colors"
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById('product-gtm')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }}
                    >
                      Product Strategy Consulting
                    </a>
                  </li>
                  <li className="flex items-center">
                    <span className="w-6 h-6 rounded-full border-2 border-gray-900 bg-white flex items-center justify-center text-gray-900 text-sm font-medium mr-4 flex-shrink-0">2</span>
                    <a 
                      href="#ux-complex-systems" 
                      className="text-[12px] text-gray-900 cursor-pointer hover:text-gray-600 transition-colors"
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById('ux-complex-systems')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }}
                    >
                      UX/UI Design
                    </a>
                  </li>
                  <li className="flex items-center">
                    <span className="w-6 h-6 rounded-full border-2 border-gray-900 bg-white flex items-center justify-center text-gray-900 text-sm font-medium mr-4 flex-shrink-0">3</span>
                    <a 
                      href="#business-development" 
                      className="text-[12px] text-gray-900 cursor-pointer hover:text-gray-600 transition-colors"
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById('business-development')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }}
                    >
                      Strategic Business Development
                    </a>
                  </li>
                  <li className="flex items-center">
                    <span className="w-6 h-6 rounded-full border-2 border-gray-900 bg-white flex items-center justify-center text-gray-900 text-sm font-medium mr-4 flex-shrink-0">4</span>
                    <a 
                      href="#technical-pm" 
                      className="text-[12px] text-gray-900 cursor-pointer hover:text-gray-600 transition-colors"
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById('technical-pm')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }}
                    >
                      Technical Product Strategy
                    </a>
                  </li>
                  <li className="flex items-center">
                    <span className="w-6 h-6 rounded-full border-2 border-gray-900 bg-white flex items-center justify-center text-gray-900 text-sm font-medium mr-4 flex-shrink-0">5</span>
                    <a 
                      href="#data-driven-development" 
                      className="text-[12px] text-gray-900 cursor-pointer hover:text-gray-600 transition-colors"
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById('data-driven-development')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }}
                    >
                      Data-Driven Product Development
                    </a>
                  </li>
                  <li className="flex items-center">
                    <span className="w-6 h-6 rounded-full border-2 border-gray-900 bg-white flex items-center justify-center text-gray-900 text-sm font-medium mr-4 flex-shrink-0">6</span>
                    <a 
                      href="#process-methodology" 
                      className="text-[12px] text-gray-900 cursor-pointer hover:text-gray-600 transition-colors"
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById('process-methodology')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }}
                    >
                      Process & Methodology
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Breadcrumbs */}
        <Breadcrumbs />

        {/* Services Grid */}
        <section id="services-grid" className="section-padding bg-[#F8F8F8]">
          <div className="container-custom">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                
                {/* Product Strategy Consulting */}
                <div id="product-gtm" className="card p-8 text-left group scroll-mt-24">
                  <div className="w-16 h-16 bg-lux-green-100 rounded-full flex items-center justify-center mb-6 animate-float">
                    <svg className="w-8 h-8 text-lux-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl text-gray-900 mb-4 ">
                    Product Strategy Consulting
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Help companies define product goals, prioritise features, and build data-informed roadmaps that create real&nbsp;business value.
                  </p>
                  <p className="text-gray-600 mb-4 text-sm font-medium">
                    Services include:
                  </p>
                  <ul className="text-sm text-gray-700 space-y-2 mb-8">
                    <li>• Product strategy & prioritisation</li>
                    <li>• Roadmap development</li>
                    <li>• Market & competitive analysis</li>
                    <li>• Positioning and early-stage go-to-market planning</li>
                    <li>• Problem definition & value proposition design</li>
                  </ul>
                  <Link to="/contact" className="btn-primary-hover-group">
                    Get Started
                  </Link>
                </div>

                {/* UX/UI Design */}
                <div id="ux-complex-systems" className="card p-8 text-left group scroll-mt-24">
                  <div className="w-16 h-16 bg-lux-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce-gentle">
                    <svg className="w-8 h-8 text-lux-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {/* Symmetrical rectangles with equal spacing - proximity principle */}
                      <rect x="4" y="4" width="6" height="16" rx="1" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                      <rect x="14" y="4" width="6" height="16" rx="1" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    </svg>
                  </div>
                  <h3 className="text-xl text-gray-900 mb-4 ">
                    UX/UI Design
                  </h3>
                  <p className="text-gray-600 mb-4">
                    I focus on user behaviour, information structure and interaction flows to make complex products easy to understand&nbsp;and use.
                  </p>
                  <p className="text-gray-600 mb-4 text-sm font-medium">
                    Services include:
                  </p>
                  <ul className="text-sm text-gray-700 space-y-2 mb-8">
                    <li>• User research & usability testing</li>
                    <li>• Wireframing & prototyping</li>
                    <li>• Information architecture & navigation design</li>
                    <li>• Clean, modern UI design</li>
                    <li>• Accessibility (WCAG) guidelines & compliance</li>
                  </ul>
                  <Link to="/contact" className="btn-primary-hover-group">
                    Get Started
                  </Link>
                </div>

                {/* Business Development */}
                <div id="business-development" className="card p-8 text-left group scroll-mt-24">
                  <div className="w-16 h-16 bg-lux-green-100 rounded-full flex items-center justify-center mb-6 animate-float">
                    <svg className="w-8 h-8 text-lux-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <h3 className="text-xl text-gray-900 mb-4 ">
                  Strategic Business Development
                  </h3>
                  <p className="text-gray-600 mb-4">
                    I help define how a product should grow, where it fits in the market, and which strategic relationships can support its&nbsp;expansion.
                  </p>
                  <p className="text-gray-600 mb-4 text-sm font-medium">
                    Services include:
                  </p>
                  <ul className="text-sm text-gray-700 space-y-2 mb-8">
                    <li>• Growth strategy development</li>
                    <li>• Positioning & value proposition</li>
                    <li>• Partnership mapping & ecosystem opportunities</li>
                    <li>• Market expansion research</li>
                    <li>• Revenue models & pricing strategy</li>
                  </ul>
                  <Link to="/contact" className="btn-primary-hover-group">
                    Get Started
                  </Link>
                </div>

                {/* Technology Strategy */}
                <div id="technical-pm" className="card p-8 text-left group scroll-mt-24">
                  <div className="w-16 h-16 bg-lux-green-100 rounded-full flex items-center justify-center mb-6 animate-float">
                    <svg className="w-8 h-8 text-lux-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <h3 className="text-xl text-gray-900 mb-4 ">
                  Technical Product Strategy
                  </h3>
                  <p className="text-gray-600 mb-4">
                    My work bridges design and development, reducing risk early and helping teams build the right things in the right way.
                  </p>
                  <p className="text-gray-600 mb-4 text-sm font-medium">
                    Services include:
                  </p>
                  <ul className="text-sm text-gray-700 space-y-2 mb-8">
                    <li>• Technical feasibility and scope alignment</li>
                    <li>• Requirement definition with engineering input</li>
                    <li>• Collaboration with development teams for efficient execution</li>
                  </ul>
                  <Link to="/contact" className="btn-primary-hover-group">
                    Get Started
                  </Link>
                </div>

                {/* Data-Driven Development */}
                <div id="data-driven-development" className="card p-8 text-left group scroll-mt-24">
                  <div className="w-16 h-16 bg-lux-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce-gentle">
                    <svg className="w-8 h-8 text-lux-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl text-gray-900 mb-4 ">
                    Data-Driven Product Development
                  </h3>
                  <p className="text-gray-600 mb-4">
                    I help companies define what to measure, why it matters, and how data should guide product&nbsp;development.
                  </p>
                  <p className="text-gray-600 mb-4 text-sm font-medium">
                    Services include:
                  </p>
                  <ul className="text-sm text-gray-700 space-y-2 mb-8">
                    <li>• KPI & metrics definition</li>
                    <li>• Analytics planning (product-level strategy)</li>
                    <li>• A/B testing strategy</li>
                    <li>• Data visualisation & dashboards</li>
                    <li>• Measurement plans for MVPs and early growth</li>
                  </ul>
                  <Link to="/contact" className="btn-primary-hover-group">
                    Get Started
                  </Link>
                </div>

                {/* Process & Methodology */}
                <div id="process-methodology" className="card p-8 text-left group scroll-mt-24">
                  <div className="w-16 h-16 bg-lux-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce-gentle">
                    <svg className="w-8 h-8 text-lux-green-600" fill="currentColor" viewBox="0 0 24 24">
                      {/* Design principles: Hierarchy, Balance, Proximity - organic process structure */}
                      {/* Top circle - Discovery (hierarchy: primary starting point) */}
                      <circle cx="12" cy="5" r="2" />
                      
                      {/* Connecting oval - transition element (proximity principle) */}
                      <ellipse cx="12" cy="9" rx="1.5" ry="2.5" opacity="0.4" />
                      
                      {/* Three horizontal nodes - Blueprint, MVP, Iteration (balance & proximity) */}
                      {/* Left node */}
                      <circle cx="8" cy="13" r="1.5" />
                      
                      {/* Center node (slightly larger for hierarchy) */}
                      <circle cx="12" cy="13" r="1.8" />
                      
                      {/* Right node */}
                      <circle cx="16" cy="13" r="1.5" />
                      
                      {/* Bottom node - Measurement (hierarchy: final step) */}
                      <circle cx="12" cy="18" r="1.5" />
                      
                      {/* Connecting lines showing process flow (continuity principle) */}
                      <line x1="12" y1="7" x2="12" y2="11.2" stroke="currentColor" strokeWidth="1.2" opacity="0.3" />
                      <line x1="8" y1="13" x2="10.2" y2="13" stroke="currentColor" strokeWidth="1.2" opacity="0.3" />
                      <line x1="13.8" y1="13" x2="16" y2="13" stroke="currentColor" strokeWidth="1.2" opacity="0.3" />
                      <line x1="12" y1="14.8" x2="12" y2="16.5" stroke="currentColor" strokeWidth="1.2" opacity="0.3" />
                    </svg>
                  </div>
                  <h3 className="text-xl text-gray-900 mb-4 ">
                    Process & Methodology
                  </h3>
                  <p className="text-gray-600 mb-4">
                    My process is designed to reduce risk, accelerate learning and turn ideas into functional, user-ready&nbsp;solutions.
                  </p>
                  <p className="text-gray-600 mb-4 text-sm font-medium">
                    Services include:
                  </p>
                  <ul className="text-sm text-gray-700 space-y-2 mb-8">
                    <li>• Discovery – research, insights & problem framing</li>
                    <li>• Blueprint – flows, structure, strategy & architecture</li>
                    <li>• MVP – focused build of the highest-value features</li>
                    <li>• Iteration – continuous improvement through data & feedback</li>
                    <li>• Measurement – tracking success & informing next steps</li>
                  </ul>
                  <Link to="/contact" className="btn-primary-hover-group">
                    Get Started
                  </Link>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl text-gray-900 mb-6">
                Ready to build something great?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Let's discuss your project and see how we can create value together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact" className="btn-primary text-lg px-8 py-4">
                  Book a Call
                </Link>
                <Link to="/case" className="btn-secondary text-lg px-8 py-4">
                  View Cases
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        {/* <Testimonials showAll={false} /> */}

        {/* Related Articles */}
        <RelatedArticles currentPage="services" />

        {/* Back to Home */}
        <section className="py-8 bg-white">
          <div className="container-custom">
            <div className="text-center">
              <Link 
                to="/" 
                className="text-gray-600 hover:text-gray-900 transition-colors font-medium underline"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Services;
