import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import CTABand from '../components/CTABand';
import RelatedArticles from '../components/RelatedArticles';
// import Testimonials from '../components/Testimonials';
import Breadcrumbs from '../components/Breadcrumbs';

const About: React.FC = () => {
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
        <title>About me - Carl Wahlen</title>
        <meta name="description" content="Carl Wahlen - product strategy consultant in Sweden specializing in data-driven products, UX/UI design, business development, and technology strategy. Experience from Payment Orchestration Architecture & Market Study, Hellman & Partners and Style Scandinavia." />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="profile" />
        <meta property="og:url" content="https://carlwahlen.com/about" />
        <meta property="og:title" content="About Carl Wahlen - Product Strategy Consultant" />
        <meta property="og:description" content="Product strategy consultant in Sweden specializing in data-driven products, UX/UI design, business development, and technology strategy. Experience from Payment Orchestration Architecture & Market Study, Hellman & Partners and Style Scandinavia." />
        <meta property="og:image" content="https://carlwahlen.com/og-image-about.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Carl Wahlen" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://carlwahlen.com/about" />
        <meta property="twitter:title" content="About Carl Wahlen - Product Strategy Consultant" />
        <meta property="twitter:description" content="Product strategy consultant in Sweden specializing in data-driven products, UX/UI design, business development, and technology strategy. Experience from Payment Orchestration Architecture & Market Study, Hellman & Partners and Style Scandinavia." />
        <meta property="twitter:image" content="https://carlwahlen.com/og-image-about.jpg" />

        {/* Additional SEO */}
        <meta name="keywords" content="about carl wahlen Sweden, product strategy consultant Stockholm, business development Nordic, UX designer Sweden, UI designer Stockholm, data-driven products Nordic, technology strategy Sweden, Payment Orchestration Architecture, Market Study, Hellman Partners, Style Scandinavia, product strategy Stockholm, business growth Nordic" />
        <link rel="canonical" href="https://carlwahlen.com/about" />
      </Helmet>
      
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Carl Wahlen",
          "jobTitle": "Product Strategist & UX Consultant",
          "url": "https://carlwahlen.com",
          "sameAs": [
            "https://github.com/CarlWahlen",
            "https://www.linkedin.com/in/carl-wahlen-digital-strateg-seo-ux/"
          ],
          "knowsAbout": [
            "Product Strategy",
            "Technical Architecture", 
            "Payments & Compliance",
            "UX for Complex Systems",
            "AI and Data-driven Products"
          ],
          "hasOccupation": {
            "@type": "Occupation",
            "name": "Technical Product Strategist",
            "description": "Specializing in MVP development, AI and UX at the intersection of business, technology and design."
          }
        })}
      </script>
      
      <main className="relative">
        {/* Large Statement Section - Inspired by Defiant style */}
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
          
          {/* About Heading - Absolutely positioned, centered on screen */}
          <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[calc(50%+235px)] md:-translate-y-[calc(50%+183px)] text-[48px] text-gray-900 font-medium text-center z-30">
            About me
          </h1>
          
          <div className="container-hero relative z-10 pt-[350px] md:pt-[585px] pb-20">
            {/* SCROLL to discover - above the three columns */}
            <div className="mb-[160px] md:mb-[123px] text-center">
              <a 
                href="#about-me" 
                className="text-[12px] text-gray-400 font-normal tracking-wider cursor-pointer hover:text-gray-600 transition-colors inline-block"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('about-me')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Scroll to discover
              </a>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24 items-start">
              {/* Column 1 - Main Text */}
              <div>
                <p className="text-lg md:text-xl text-gray-900 font-semibold leading-relaxed">
                  Bridging product strategy, UX and technology to turn complexity into clear, scalable solutions that deliver real business value.
                </p>
              </div>
              
              {/* Column 2 - Empty (hidden on mobile, shown on desktop) */}
              <div className="hidden md:flex justify-center">
              </div>
              
              {/* Column 3 - Empty */}
              <div className="md:ml-auto md:max-w-fit">
              </div>
            </div>
          </div>
        </section>

        {/* Breadcrumbs */}
        <Breadcrumbs />

        {/* New 3-Column Section - Inspired by Joseph Pizzolato style */}
        <section id="about-me" className="pt-24 pb-16 lg:pt-32 lg:pb-24 relative overflow-hidden">
          {/* Tile pattern background - perfectly structured grid with diamonds at intersections */}
          <div 
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage: `
                url("data:image/svg+xml,%3Csvg width='80' height='80' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='tile-hero' width='80' height='80' patternUnits='userSpaceOnUse'%3E%3Crect width='80' height='80' fill='transparent'/%3E%3Cline x1='0' y1='0' x2='80' y2='0' stroke='%231f2937' stroke-width='0.5'/%3E%3Cline x1='0' y1='0' x2='0' y2='80' stroke='%231f2937' stroke-width='0.5'/%3E%3Cpolygon points='0,0 3,3 0,6 -3,3' fill='%231f2937'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23tile-hero)'/%3E%3C/svg%3E")
              `,
              backgroundSize: '80px 80px',
            }}
          />
          <div className="container-hero relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-20 lg:gap-32 items-start">
              {/* Left Column - Title, Name, Short Description, Social */}
              <div className="flex flex-col">
                <div className="text-sm font-semibold text-blue-600 mb-8 tracking-wider uppercase">
                  PRODUCT STRATEGIST & UX CONSULTANT
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-10 font-medium">
                  Carl<br />
                  Wahlén
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-12">
                  Where complexity becomes<br />
                  understandable and the<br />
                  abstract becomes actionable.
                </p>
                <div className="flex items-center">
                  <a 
                    href="https://www.linkedin.com/in/carl-wahlen-digital-strateg-seo-ux/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center hover:bg-gray-800 transition-colors"
                    aria-label="LinkedIn profile"
                  >
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Center Column - Large Image */}
              <div className="flex justify-center items-start">
                <div className="relative w-full max-w-md" style={{ aspectRatio: '4/5' }}>
                  <img
                    src="/Portfolio_Pic.jpg"
                    alt="Carl Wahlen"
                    className="w-full h-full object-cover object-top rounded-lg shadow-2xl"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Right Column - Longer Text */}
              <div className="space-y-12">
                <p className="text-base text-gray-700 leading-relaxed">
                  I'm a product strategist and ux consultant and Master's student in User Experience and Interactive Media Design, working at the intersection of product structure, UX and early stage development. I focus on turning complex or unclear situations into understandable, user centered solutions that support real business goals.
                  </p>
                <p className="text-base text-gray-700 leading-relaxed">
                  Based in Stockholm, I enjoy working with products that involve many moving parts, whether it is a messy user journey, a new service that needs structure, or an MVP that requires clear definition. My approach combines strategic thinking with hands on problem solving, ensuring decisions are grounded in user needs, organisational goals and practical implementation realities.
                  </p>
                <p className="text-base text-gray-700 leading-relaxed">
                  Whether I'm shaping an MVP, clarifying a critical flow or helping teams bring order to complex digital environments, I aim to connect design, engineering and business in a way that makes products clearer, easier to use and more valuable.
                  </p>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-16 lg:py-24 bg-white relative overflow-hidden">
          {/* Tile pattern background - perfectly structured grid with diamonds at intersections */}
          <div 
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage: `
                url("data:image/svg+xml,%3Csvg width='80' height='80' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='tile-skills' width='80' height='80' patternUnits='userSpaceOnUse'%3E%3Crect width='80' height='80' fill='transparent'/%3E%3Cline x1='0' y1='0' x2='80' y2='0' stroke='%231f2937' stroke-width='0.5'/%3E%3Cline x1='0' y1='0' x2='0' y2='80' stroke='%231f2937' stroke-width='0.5'/%3E%3Cpolygon points='0,0 3,3 0,6 -3,3' fill='%231f2937'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23tile-skills)'/%3E%3C/svg%3E")
              `,
              backgroundSize: '80px 80px',
            }}
          />
          
          <div className="container-hero relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24">
              {/* Column 1 - Expertise Areas */}
                <div>
                <h3 className="text-xl text-gray-900 mb-4">Expertise Areas</h3>
                <div className="space-y-5">
                  <div className="flex items-center">
                    <div className="w-1 h-6 bg-gray-900 mr-4 flex-shrink-0"></div>
                    <span className="text-gray-700 font-medium leading-normal">Product Strategy & MVP Design</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-1 h-6 bg-gray-900 mr-4 flex-shrink-0"></div>
                    <span className="text-gray-700 font-medium leading-normal">UX for Complex Systems</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-1 h-6 bg-gray-900 mr-4 flex-shrink-0"></div>
                    <span className="text-gray-700 font-medium leading-normal">User Research & Testing</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-1 h-6 bg-gray-900 mr-4 flex-shrink-0"></div>
                    <span className="text-gray-700 font-medium leading-normal">Data-Driven Product Development</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-1 h-6 bg-gray-900 mr-4 flex-shrink-0"></div>
                    <span className="text-gray-700 font-medium leading-normal">Business Alignment & Tech Collaboration</span>
                  </div>
                </div>
                </div>

              {/* Column 2 - Core Capabilities */}
              <div>
                <h3 className="text-xl text-gray-900 mb-6">Core Capabilities</h3>
                <div className="flex flex-wrap gap-3">
                    <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">Product strategy</span>
                    <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">MVP definition</span>
                    <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">UX research/testing</span>
                    <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">Information architecture</span>
                    <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">Prototyping</span>
                    <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">Product structure</span>
                    <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">User-centred flows</span>
                    <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">Business value framing</span>
                </div>
                  </div>

              {/* Column 3 - Tools & Technical Skills */}
              <div>
                <h3 className="text-xl text-gray-900 mb-6">Tools & Technical Skills</h3>
                <div className="flex flex-wrap gap-3">
                    <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">Figma</span>
                    <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">React</span>
                    <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">JavaScript</span>
                    <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">TypeScript</span>
                    <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">Tailwind CSS</span>
                    <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">Git</span>
                    <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">Visual Studio Code</span>
                    <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">Cursor</span>
                  <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">WordPress</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        {/* <Testimonials showAll={false} /> */}

        {/* Related Articles */}
        <RelatedArticles currentPage="about" />

        {/* CTA Section */}
        <CTABand
          title="Want to know more?"
          description="Let's discuss your project and see how my method can help you reach your goals."
          primaryCTA={{
            text: "Book a call",
            link: "/contact"
          }}
          secondaryCTA={{
            text: "View my cases",
            link: "/case"
          }}
        />
        
        {/* Back to Home */}
        <section className="py-8 bg-gray-50">
          <div className="container-hero">
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

export default About;
