import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import CaseCarousel from '../components/CaseCarousel';
import CaseCard from '../components/CaseCard';
import { cases } from '../data/cases';
import { servicesEnabled } from '../utils/featureFlags';

const Home: React.FC = () => {
  // Get the first 2 cases for "Recent work" section
  const recentCases = cases.slice(0, 2);

  return (
    <>
      <Helmet>
        <title>Carl Wahlen - UX Designer with Product Focus</title>
        <meta name="description" content="Product strategy consultant in Sweden specializing in data-driven products, UX/UI design, business development, and technology strategy. Experience in developing scalable products that unite strategy, technology, and design for enhanced business value." />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://carlwahlen.com/" />
        <meta property="og:title" content="Carl Wahlen - UX Designer with Product Focus" />
        <meta property="og:description" content="Product strategy consultant in Sweden specializing in data-driven products, UX/UI design, business development, and technology strategy. Experience in developing scalable products that unite strategy, technology, and design for enhanced business value." />
        <meta property="og:image" content="https://carlwahlen.com/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Carl Wahlen" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://carlwahlen.com/" />
        <meta property="twitter:title" content="Carl Wahlen - UX Designer with Product Focus" />
        <meta property="twitter:description" content="Product strategy consultant in Sweden specializing in data-driven products, UX/UI design, business development, and technology strategy. Experience in developing scalable products that unite strategy, technology, and design for enhanced business value." />
        <meta property="twitter:image" content="https://carlwahlen.com/og-image.jpg" />

        {/* Additional SEO */}
        <meta name="keywords" content="product strategy consultant Sweden, data-driven products Stockholm, UX design consultant Nordic, UI design Sweden, business development consultant Stockholm, technology strategy Sweden, product consultant Nordic, scalable products Stockholm, business value Sweden, product development consultant Stockholm, user experience Sweden, user interface Nordic, product management Stockholm, digital strategy Sweden, business growth Nordic, market strategy Stockholm" />
        <link rel="canonical" href="https://carlwahlen.com/" />
      </Helmet>
      
      {/* Additional Schema Markup */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Carl Wahlen",
          "url": "https://carlwahlen.com",
          "logo": "https://carlwahlen.com/logo.png",
          "description": "Product strategy consultant specializing in data-driven products, UX/UI design, business development, and technology strategy",
          "founder": {
            "@type": "Person",
            "name": "Carl Wahlen",
            "jobTitle": "UX Designer with Product Focus"
          },
          "sameAs": [
            "https://github.com/CarlWahlen",
            "https://www.linkedin.com/in/carl-wahlen-digital-strateg-seo-ux/"
          ],
          "service": [
            {
              "@type": "Service",
              "name": "Product Strategy Consulting",
              "description": "Strategic planning and roadmap development for data-driven products"
            },
            {
              "@type": "Service", 
              "name": "UX/UI Design",
              "description": "User experience and user interface design for scalable products"
            },
            {
              "@type": "Service",
              "name": "Technology Strategy",
              "description": "Technology strategy and architecture for enhanced business value"
            },
            {
              "@type": "Service",
              "name": "Business Development",
              "description": "Strategic business development and growth strategies for scalable products"
            },
            {
              "@type": "Service",
              "name": "Data-Driven Product Development",
              "description": "Developing scalable products that unite strategy, technology, and design"
            }
          ]
        })}
      </script>
      
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
                      className="w-full h-full object-cover grayscale profile-image-responsive"
                      style={{ 
                        objectPosition: 'calc(30% + 10px) 0%',
                        objectFit: 'cover',
                        transform: 'scale(1.12)'
                      }}
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
                    <span className="md:inline block">
                      Build digital products by framing problems and
                    </span>{' '}
                    <span className="md:inline block">
                      mapping user journeys, and making
                    </span>{' '}
                    <span className="md:inline block">
                      clear MVP decisions.
                    </span>
                  </p>
                  
                  {/* Location */}
                  <p className="text-base text-gray-500 mb-10">
                    Stockholm, Sweden
                  </p>
                  
                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <Link
                      to="/contact"
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

      {/* Your Product Partner Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-10 items-center">
            {/* Left Side - Logo */}
            <div className="flex justify-center lg:justify-end items-center order-1 pr-0 lg:pr-32 mb-10 lg:mb-0">
              <img 
                src="/logo.svg" 
                alt="Carl Wahlén Logo" 
                className="h-80 w-80 md:h-56 md:w-56 lg:h-64 lg:w-64 opacity-100"
              />
            </div>

            {/* Right Side - Text Content */}
            <div className="text-left order-2 flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl text-gray-900 mb-4">
                Your Product Partner
              </h2>
              <p className="text-base text-gray-600 leading-relaxed mb-6">
                I'm a technical product strategist based in Stockholm, helping companies build data-driven digital products where strategy, technology and design work together to create measurable business value.
              </p>
              <p className="text-base text-gray-600 leading-relaxed mb-6">
                I work with early product ideas and turn them into clear concepts, user flows and interfaces that can be tested with real people. My focus is to reduce uncertainty, create alignment and ensure that teams build things that are useful, understandable and scalable.
              </p>
              <p className="text-base text-gray-600 leading-relaxed mb-6">
                I help organisations move from idea to working prototype through research, structured decision-making and close collaboration between design, product and technology.
              </p>
              {servicesEnabled && (
              <Link 
                to="/services" 
                className="btn-secondary inline-flex items-center justify-center text-base self-start"
              >
                Services
              </Link>
              )}
            </div>
          </div>
        </div>
      </section>


      {/* Navigation & Contact Section */}
      <section className="py-16 bg-gray-50 relative overflow-hidden">
        {/* Tile pattern background - perfectly structured grid with diamonds at intersections */}
        <div 
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `
              url("data:image/svg+xml,%3Csvg width='80' height='80' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='tile-navigation' width='80' height='80' patternUnits='userSpaceOnUse'%3E%3Crect width='80' height='80' fill='transparent'/%3E%3Cline x1='0' y1='0' x2='80' y2='0' stroke='%231f2937' stroke-width='0.5'/%3E%3Cline x1='0' y1='0' x2='0' y2='80' stroke='%231f2937' stroke-width='0.5'/%3E%3Cpolygon points='0,0 3,3 0,6 -3,3' fill='%231f2937'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23tile-navigation)'/%3E%3C/svg%3E")
            `,
            backgroundSize: '80px 80px',
          }}
        />
        <div className="container-custom relative z-10">
          <h2 className="text-3xl font-normal text-gray-900 mb-12 text-left">Explore & Connect</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cases */}
            <Link to="/case" className="block bg-white border border-gray-200 rounded-2xl p-6 md:p-8 hover:shadow-lg transition-all duration-300 group h-full min-h-[280px] flex flex-col no-underline hover:no-underline">
              <div className="mb-4 md:mb-6">
                <svg className="w-10 h-10 md:w-12 md:h-12 text-gray-900 group-hover:text-gray-900 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl text-gray-900 mb-3 transition-colors">Cases</h3>
              <p className="text-gray-600 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
                Explore real-world projects and see how strategic thinking transforms ideas into successful products.
              </p>
              <div className="inline-flex items-center text-gray-900 font-medium transition-colors text-sm md:text-base mt-auto">
                View cases 
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
            
            {/* About */}
            <div className="block bg-white border border-gray-200 rounded-2xl p-6 md:p-8 hover:shadow-lg transition-all duration-300 group h-full min-h-[280px] flex flex-col no-underline hover:no-underline">
              <div className="mb-4 md:mb-6">
                <svg className="w-10 h-10 md:w-12 md:h-12 text-gray-900 group-hover:text-gray-900 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl text-gray-900 mb-3 transition-colors">About</h3>
              <p className="text-gray-600 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
                Learn about my background, expertise, and approach to product strategy and development.
              </p>
              <Link 
                to="/about" 
                className="btn-secondary inline-flex items-center justify-center text-sm md:text-base mt-auto self-start"
              >
                Learn more
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            
            {/* Let's talk */}
            <div className="block bg-white border border-gray-200 rounded-2xl p-6 md:p-8 hover:shadow-lg transition-all duration-300 group h-full min-h-[280px] flex flex-col no-underline hover:no-underline">
              <div className="mb-4 md:mb-6">
                <svg className="w-10 h-10 md:w-12 md:h-12 text-gray-900 group-hover:text-gray-900 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl text-gray-900 mb-3 transition-colors">Let's talk</h3>
              <p className="text-gray-600 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
                Ready to discuss your project? Let's explore how we can create value together.
              </p>
              <Link 
                to="/contact" 
                className="btn-primary inline-flex items-center justify-center text-sm md:text-base mt-auto self-start px-6 py-3 rounded-full"
              >
                Get in touch
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
      </main>
    </>
  );
};

export default Home;
