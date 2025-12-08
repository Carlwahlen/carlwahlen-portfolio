import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Breadcrumbs from '../components/Breadcrumbs';

const FAQ: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>FAQ - Carl Wahlen</title>
        <meta name="description" content="Frequently asked questions about product strategy consulting, data-driven product development, UX/UI design, and technology strategy in Sweden." />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://carlwahlen.com/faq" />
        <meta property="og:title" content="FAQ - Carl Wahlen Product Strategy Consultant" />
        <meta property="og:description" content="Frequently asked questions about product strategy consulting, data-driven product development, UX/UI design, and technology strategy in Sweden." />
        <meta property="og:image" content="https://carlwahlen.com/og-image-faq.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Carl Wahlen" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://carlwahlen.com/faq" />
        <meta property="twitter:title" content="FAQ - Carl Wahlen Product Strategy Consultant" />
        <meta property="twitter:description" content="Frequently asked questions about product strategy consulting, data-driven product development, UX/UI design, and technology strategy in Sweden." />
        <meta property="twitter:image" content="https://carlwahlen.com/og-image-faq.jpg" />

        {/* Additional SEO */}
        <meta name="keywords" content="FAQ product strategy consultant Sweden, frequently asked questions Stockholm, product development questions Nordic, UX design questions Sweden, technology strategy questions Stockholm" />
        <link rel="canonical" href="https://carlwahlen.com/faq" />
      </Helmet>
      
      {/* FAQ Schema Markup for Featured Snippets */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What makes a good product strategy consultant in Sweden?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "A successful product strategy consultant in Sweden combines technical expertise with business acumen. They understand the Nordic market dynamics, have experience with both B2B and B2C products, and can bridge the gap between strategy, technology, and design. Key skills include data-driven decision making, API design, UX for complex systems, and knowledge of payments and compliance regulations in the EU."
              }
            },
            {
              "@type": "Question",
              "name": "How do you approach data-driven product development?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "My approach to data-driven product development follows a structured methodology: Discovery (needs analysis), Blueprint (strategy and architecture), MVP (quick implementation), Iteration (improvement based on feedback), and Measurement (continuous optimization). I focus on establishing proper analytics from day one, implementing A/B testing frameworks, and creating feedback loops that inform product decisions."
              }
            },
            {
              "@type": "Question",
              "name": "What's your experience with payments and fintech in Stockholm?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "I have extensive experience in payments and fintech, having worked on PayLink360's AI-driven PSP orchestration platform. This included API design, smart routing, fallback mechanisms, and full compliance with PCI DSS and PSD2 regulations. I understand the complexities of multi-tenant architectures, real-time processing, and the unique challenges of the Nordic payments landscape."
              }
            },
            {
              "@type": "Question",
              "name": "How do you ensure UX excellence for complex technical systems?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "UX for complex systems requires a deep understanding of both user needs and technical constraints. I use information architecture principles, create clear user flows, implement progressive disclosure, and ensure accessibility compliance (WCAG). My approach includes user research, prototyping, and iterative testing to make complex functionality intuitive and accessible."
              }
            }
          ]
        })}
      </script>
      
      <main>
        {/* Hero Section */}
        <section className="pt-24 pb-16 lg:pt-32 lg:pb-24">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl text-gray-900 mb-6">
                Frequently Asked Questions
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Common questions about product strategy consulting, data-driven development, and technology strategy in Sweden.
              </p>
            </div>
          </div>
        </section>

        {/* Breadcrumbs */}
        <Breadcrumbs />

        {/* FAQ Section */}
        <section className="py-16 lg:py-24 bg-gray-50">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                <div className="card p-8">
                  <h2 className="text-2xl text-gray-900 mb-4">
                    What makes a good product strategy consultant in Sweden?
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    A successful product strategy consultant in Sweden combines technical expertise with business acumen. 
                    They understand the Nordic market dynamics, have experience with both B2B and B2C products, 
                    and can bridge the gap between strategy, technology, and design. Key skills include data-driven 
                    decision making, API design, UX for complex systems, and knowledge of payments and compliance 
                    regulations in the EU.
                  </p>
                </div>
                
                <div className="card p-8">
                  <h2 className="text-2xl text-gray-900 mb-4">
                    How do you approach data-driven product development?
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    My approach to data-driven product development follows a structured methodology: Discovery (needs analysis), 
                    Blueprint (strategy and architecture), MVP (quick implementation), Iteration (improvement based on feedback), 
                    and Measurement (continuous optimization). I focus on establishing proper analytics from day one, 
                    implementing A/B testing frameworks, and creating feedback loops that inform product decisions.
                  </p>
                </div>
                
                <div className="card p-8">
                  <h2 className="text-2xl text-gray-900 mb-4">
                    What's your experience with payments and fintech in Stockholm?
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    I have extensive experience in payments and fintech, having worked on PayLink360's AI-driven PSP 
                    orchestration platform. This included API design, smart routing, fallback mechanisms, and full 
                    compliance with PCI DSS and PSD2 regulations. I understand the complexities of multi-tenant 
                    architectures, real-time processing, and the unique challenges of the Nordic payments landscape.
                  </p>
                </div>
                
                <div className="card p-8">
                  <h2 className="text-2xl text-gray-900 mb-4">
                    How do you ensure UX excellence for complex technical systems?
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    UX for complex systems requires a deep understanding of both user needs and technical constraints. 
                    I use information architecture principles, create clear user flows, implement progressive disclosure, 
                    and ensure accessibility compliance (WCAG). My approach includes user research, prototyping, 
                    and iterative testing to make complex functionality intuitive and accessible.
                  </p>
                </div>

                <div className="card p-8">
                  <h2 className="text-2xl text-gray-900 mb-4">
                    What types of companies do you work with in the Nordic region?
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    I work with a diverse range of companies across the Nordic region, from early-stage startups to established scale-ups. 
                    My clients include fintech companies, PropTech platforms, e-commerce businesses, and B2B SaaS companies. 
                    I have particular expertise in helping companies navigate the complexities of EU regulations, 
                    multi-tenant architectures, and the unique challenges of the Nordic market.
                  </p>
                </div>

                <div className="card p-8">
                  <h2 className="text-2xl text-gray-900 mb-4">
                    How do you measure success in product strategy consulting?
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    Success is measured through both quantitative and qualitative metrics. On the quantitative side, 
                    I track improvements in user engagement, conversion rates, technical performance, and business KPIs. 
                    Qualitatively, I measure client satisfaction, team alignment, and the clarity of product direction. 
                    Every project includes specific, measurable goals that we review regularly throughout the engagement.
                  </p>
                </div>

                <div className="card p-8">
                  <h2 className="text-2xl text-gray-900 mb-4">
                    What's your typical engagement model and timeline?
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    I offer flexible engagement models to fit different needs. Discovery sprints typically run 1-2 weeks, 
                    MVP blueprints take 3-4 weeks, and ongoing part-time TPM engagements can range from 4-8 weeks to several months. 
                    I prefer to start with a discovery phase to understand your specific challenges and recommend the most 
                    appropriate engagement model for your situation.
                  </p>
                </div>

                <div className="card p-8">
                  <h2 className="text-2xl text-gray-900 mb-4">
                    How do you stay current with technology trends and best practices?
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    I maintain a strong focus on continuous learning through hands-on experimentation, industry conferences, 
                    and active participation in the Nordic tech community. I regularly contribute to open-source projects, 
                    write technical articles, and engage with other product strategists and developers. This ensures that 
                    my recommendations are based on current best practices and proven technologies.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl text-gray-900 mb-6">
                Still have questions?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Let's discuss your specific needs and see how I can help you build something great.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact" className="btn-primary text-lg px-8 py-4">
                  Contact me
                </Link>
                <Link to="/case" className="btn-secondary text-lg px-8 py-4">
                  View case studies
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Back to Home */}
        <section className="py-8 bg-gray-50">
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

export default FAQ;
