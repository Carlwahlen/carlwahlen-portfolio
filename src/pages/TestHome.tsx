import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import CaseCard from '../components/CaseCard';
import { cases } from '../data/cases';
import { servicesEnabled } from '../utils/featureFlags';

const TestHome: React.FC = () => {
  // Get the first 2 cases for "Recent work" section
  const recentCases = cases.slice(0, 2);

  return (
    <>
      <Helmet>
        <title>Test Home - Design Testing - Carl Wahlen</title>
        <meta name="description" content="Test page for design experiments - not indexed" />
        {/* Prevent indexing of test page */}
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <main>
        {/* Hero Section - Inspired by Samuel Oldmark but with your design system */}
        <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 hero-gradient relative overflow-hidden">
          {/* Tile pattern background - perfectly structured grid with diamonds at intersections */}
          <div 
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage: `
                url("data:image/svg+xml,%3Csvg width='80' height='80' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='tile-hero-home' width='80' height='80' patternUnits='userSpaceOnUse'%3E%3Crect width='80' height='80' fill='transparent'/%3E%3Cline x1='0' y1='0' x2='80' y2='0' stroke='%231f2937' stroke-width='0.5'/%3E%3Cline x1='0' y1='0' x2='0' y2='80' stroke='%231f2937' stroke-width='0.5'/%3E%3Cpolygon points='0,0 3,3 0,6 -3,3' fill='%231f2937'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23tile-hero-home)'/%3E%3C/svg%3E")
              `,
              backgroundSize: '80px 80px',
            }}
          />
          <div className="container-custom relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-16">
                {/* Profile Image - Circular, similar to Samuel Oldmark */}
                <div className="flex-shrink-0">
                  <div className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden bg-gray-200 border-4 border-gray-900 shadow-xl">
                    <img
                      src="/Portfolio_Pic.jpg"
                      alt="Carl Wahlen"
                      className="w-full h-full object-cover grayscale"
                      style={{ objectPosition: 'calc(50% + 30px) calc(25% + 80px)', transform: 'scale(1.4)' }}
                      loading="eager"
                    />
                  </div>
                </div>
                
                {/* Text Content */}
                <div className="flex-1 text-center lg:text-left">
                  {/* Large title - similar to Samuel Oldmark's style */}
                  <h1 className="text-5xl md:text-6xl lg:text-7xl text-gray-900 mb-6 leading-tight font-medium">
                    UX Designer<br />
                    with Product<br />
                    Focus
                  </h1>
                  
                  {/* Short description */}
                  <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                    Build digital products by framing problems, mapping user journeys, and making clear MVP decisions.
                  </p>
                  
                  {/* Location */}
                  <p className="text-base text-gray-500 mb-10">
                    Stockholm, Sweden
                  </p>
                  
                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <Link
                      to="/kontakt"
                      className="btn-primary text-base px-8 py-3.5 rounded-full font-medium"
                    >
                      Let's talk
                    </Link>
                    <Link
                      to="/about"
                      className="btn-secondary text-base px-8 py-3.5 rounded-full font-medium"
                    >
                      About me
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Recent work section - Inspired by Samuel Oldmark */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="container-custom">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl md:text-4xl text-gray-900 font-medium">
                Recent work
              </h2>
              <Link 
                to="/case" 
                className="btn-secondary text-base px-6 py-3 rounded-full font-medium inline-flex items-center"
              >
                See all work
                <svg 
                  className="w-4 h-4 ml-2" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 5l7 7-7 7" 
                  />
                </svg>
              </Link>
            </div>
            
            {/* Cases Grid - 2 columns on large screens */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {recentCases.map((caseItem) => (
                <CaseCard key={caseItem.id} caseItem={caseItem} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default TestHome;
