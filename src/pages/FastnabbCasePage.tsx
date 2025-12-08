import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import HellmanPartnersVisualization from '../components/FastnabbVisualization';
import Breadcrumbs from '../components/Breadcrumbs';

const HellmanPartnersCasePage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Hellman & Partners - Carl Wahlen</title>
        <meta name="description" content="Hellman & Partners: PropTech start-up, making real estate data accessible through lean product development and user-centered design." />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://carlwahlen.com/case/hellman-partners" />
        <meta property="og:title" content="Hellman & Partners: MVP-Driven PropTech Solution - Carl Wahlen" />
        <meta property="og:description" content="PropTech start-up, making real estate data accessible through lean product development and user-centered design." />
        <meta property="og:image" content="https://carlwahlen.com/og-image-hellman-partners.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Carl Wahlen" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://carlwahlen.com/case/hellman-partners" />
        <meta property="twitter:title" content="Hellman & Partners: MVP-Driven PropTech Solution - Carl Wahlen" />
        <meta property="twitter:description" content="PropTech start-up, making real estate data accessible through lean product development and user-centered design." />
        <meta property="twitter:image" content="https://carlwahlen.com/og-image-hellman-partners.jpg" />

        {/* Additional SEO */}
        <meta name="keywords" content="hellman partners, PropTech MVP, real estate data visualization, lean product development, user-centered design, property market analysis, data accessibility, PropTech innovation Sweden, real estate UX design" />
        <link rel="canonical" href="https://carlwahlen.com/case/hellman-partners" />
      </Helmet>
      
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="pt-24 pb-16 lg:pt-32 lg:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-left">
              <h1 className="text-4xl md:text-5xl text-gray-900 mb-6">
                Hellman & Partners
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Making real estate data accessible and understandable for everyone. A user-centered PropTech MVP 
                that transforms fragmented market information into clear, visual insights through lean product development.
              </p>
              
              {/* PropTech Badge */}
              <div className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium mb-8">
                MVP-Driven PropTech Innovation
              </div>
            </div>
          </div>
        </section>

        {/* Breadcrumbs */}
        <Breadcrumbs />

        {/* Project Overview */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Text Content */}
              <div>
                <h2 className="text-3xl text-gray-900 mb-6">
                  Lean Product Development
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Hellman & Partners was built using Lean Product Development principles, focusing on rapid validation 
                  and user-centered design. Rather than over-engineering the technology, I created a framework 
                  where design, strategy, and market insight converge to validate the core value proposition.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p className="text-gray-700">
                      <strong>Core Problem Identification:</strong> Users lack simple, reliable overview of property values and area facts
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p className="text-gray-700">
                      <strong>Value Proposition:</strong> "A tool that simplifies understanding of the housing market"
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p className="text-gray-700">
                      <strong>MVP Prioritization:</strong> Search, basic data, area analysis, interactive maps, responsive design
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p className="text-gray-700">
                      <strong>Hypothesis-Driven Development:</strong> Rapid prototyping and iterative concept testing
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Interactive Visualization */}
              <div className="flex justify-center">
                <div className="w-full max-w-2xl overflow-hidden">
                  <div className="text-center mb-4">
                    <h3 className="text-lg text-gray-900 mb-2">
                      MVP Concept Visualization
                    </h3>
                    <p className="text-sm text-gray-600">
                      Interactive simulation of Hellman & Partners' user-centered data experience
                    </p>
                  </div>
                  <HellmanPartnersVisualization width={600} height={400} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Stack */}
        <section className="py-16 lg:py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl text-gray-900 mb-4">
                MVP Development Process
              </h2>
              <p className="text-lg text-gray-600">
                Strategic MVP development focusing on user validation, rapid prototyping, and market testing
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="text-lg text-gray-900 mb-2">Problem Identification</h3>
                <p className="text-gray-600 text-sm">Core user needs & market gaps</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg text-gray-900 mb-2">Value Proposition</h3>
                <p className="text-gray-600 text-sm">Clear user benefits & positioning</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg text-gray-900 mb-2">Rapid Prototyping</h3>
                <p className="text-gray-600 text-sm">Interactive concepts & testing</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg text-gray-900 mb-2">Market Validation</h3>
                <p className="text-gray-600 text-sm">User feedback & iteration</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl text-gray-900 mb-4">
                MVP Development Areas
              </h2>
              <p className="text-lg text-gray-600">
                Cross-disciplinary approach combining product strategy, UX design, business development, and market validation
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md border">
                <h3 className="text-xl text-gray-900 mb-4">Product Strategy</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Core problem identification and user needs analysis</li>
                  <li>• Value proposition definition and positioning</li>
                  <li>• MVP feature prioritization and roadmap planning</li>
                  <li>• Hypothesis-driven development approach</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border">
                <h3 className="text-xl text-gray-900 mb-4">UX & UI Design</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Interactive Figma prototypes for user flows</li>
                  <li>• Data visualization concepts and wireframes</li>
                  <li>• Modern visual identity: minimalist and data-driven</li>
                  <li>• WCAG-compliant accessible design principles</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border">
                <h3 className="text-xl text-gray-900 mb-4">Business Development</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Market segmentation: B2B and B2C target groups</li>
                  <li>• Business model development and pricing strategy</li>
                  <li>• Competitor analysis and differentiation</li>
                  <li>• Investment pitch materials and TAM/SAM/SOM</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border">
                <h3 className="text-xl text-gray-900 mb-4">Concept Testing</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Rapid prototyping and iterative design cycles</li>
                  <li>• User feedback collection and validation</li>
                  <li>• Visual communication of product potential</li>
                  <li>• Proof of value demonstration</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Competence Profile Section */}
        <section className="py-16 lg:py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl text-gray-900 mb-4">
                Digital Product Strategist Profile
              </h2>
              <p className="text-lg text-gray-600">
                Demonstrating the ability to combine business acumen, UX sensibility, and product management 
                to build a strategic foundation for a PropTech startup from concept to pitchable MVP
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md border">
                <h3 className="text-xl text-gray-900 mb-4">Product Strategy</h3>
                <p className="text-gray-700 mb-4">
                  Structured complex ideas into clear MVPs, understanding how to go from 
                  prototype to market position with strategic prioritization.
                </p>
                <div className="text-sm text-gray-600">
                  <strong>Application:</strong> MVP framework development
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border">
                <h3 className="text-xl text-gray-900 mb-4">UX & Visual Design</h3>
                <p className="text-gray-700 mb-4">
                  Created interactive prototypes and data simulations that translate 
                  complex information into understandable, accessible design.
                </p>
                <div className="text-sm text-gray-600">
                  <strong>Application:</strong> Data-driven UX strategy
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border">
                <h3 className="text-xl text-gray-900 mb-4">Business Development</h3>
                <p className="text-gray-700 mb-4">
                  Conducted market analysis, defined value propositions, and developed 
                  positioning strategies for both B2B and B2C markets.
                </p>
                <div className="text-sm text-gray-600">
                  <strong>Application:</strong> Go-to-market strategy
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border">
                <h3 className="text-xl text-gray-900 mb-4">Rapid Prototyping</h3>
                <p className="text-gray-700 mb-4">
                  Built interactive Figma prototypes and data visualization concepts to communicate 
                  product potential visually rather than having all features coded.
                </p>
                <div className="text-sm text-gray-600">
                  <strong>Application:</strong> Visual concept validation
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border">
                <h3 className="text-xl text-gray-900 mb-4">Market Validation</h3>
                <p className="text-gray-700 mb-4">
                  Worked in iterative cycles testing design ideas and adapting flows 
                  based on user value and market feedback.
                </p>
                <div className="text-sm text-gray-600">
                  <strong>Application:</strong> Hypothesis-driven development
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border">
                <h3 className="text-xl text-gray-900 mb-4">Communication & Leadership</h3>
                <p className="text-gray-700 mb-4">
                  Developed pitch materials, storytelling, and brand identity to 
                  drive ideas and convince stakeholders across technical and business domains.
                </p>
                <div className="text-sm text-gray-600">
                  <strong>Application:</strong> Cross-functional product leadership
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 bg-gray-50">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl text-gray-900 mb-6">
              Ready to build your MVP strategy?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Let's discuss how lean product development, user-centered design, and strategic 
              MVP planning can transform your ideas into validated, market-ready solutions.
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
        </section>
      </div>
    </>
  );
};

export default HellmanPartnersCasePage;
