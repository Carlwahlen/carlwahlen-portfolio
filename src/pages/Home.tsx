import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import CaseCarousel from '../components/CaseCarousel';
import { cases } from '../data/cases';
import { servicesEnabled } from '../utils/featureFlags';

const Home: React.FC = () => {
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
        {/* Hero Section - Top Half */}
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
          {/* Text Content - Centered */}
          <div className="text-center max-w-5xl mx-auto mb-8">
            <div className="text-[14px] font-semibold text-gray-900 mb-8 tracking-wider uppercase">
              UX Designer with Product Focus
            </div>
            
            <h1 className="text-[36px] md:text-[40px] lg:text-[40px] text-gray-900 mb-12 leading-[1.2] font-medium text-balance">
              <span className="block max-w-5xl mx-auto">Build digital products by framing problems, mapping user journeys, and making clear MVP decisions.</span>
            </h1>
            
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {servicesEnabled && (
                <>
                  <Link to="/services" className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors no-underline hover:no-underline cursor-pointer">
                    Product Strategy
                  </Link>
                  <Link to="/services" className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors no-underline hover:no-underline cursor-pointer">
                    Business development
                  </Link>
                  <Link to="/services" className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors no-underline hover:no-underline cursor-pointer">
                    UX/UI Design
                  </Link>
                </>
              )}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-0">
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
              {servicesEnabled && (
                <Link to="/services" className="btn-secondary text-base px-8 py-3.5 rounded-full font-medium">
                  Explore Services
                </Link>
              )}
            </div>
          </div>
          
          {/* Case Carousel - Below Text */}
          <div className="max-w-4xl mx-auto -mt-4">
            <CaseCarousel />
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
