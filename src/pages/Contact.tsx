import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ContactForm from '../components/ContactForm';
import Breadcrumbs from '../components/Breadcrumbs';

const Contact: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Contact - Carl Wahlen</title>
        <meta name="description" content="Contact Carl Wahlen, product strategy consultant in Sweden. Discuss your project, book a consultation, or learn more about product strategy, UX/UI design, and business development services in Stockholm and the Nordic region." />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://carlwahlen.com/contact" />
        <meta property="og:title" content="Contact Carl Wahlen - Product Strategy Consultant" />
        <meta property="og:description" content="Contact Carl Wahlen, product strategy consultant in Sweden. Discuss your project, book a consultation, or learn more about product strategy, UX/UI design, and business development services in Stockholm and the Nordic region." />
        <meta property="og:image" content="https://carlwahlen.com/og-image-contact.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Carl Wahlen" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://carlwahlen.com/contact" />
        <meta property="twitter:title" content="Contact Carl Wahlen - Product Strategy Consultant" />
        <meta property="twitter:description" content="Contact Carl Wahlen, product strategy consultant in Sweden. Discuss your project, book a consultation, or learn more about product strategy, UX/UI design, and business development services." />
        <meta property="twitter:image" content="https://carlwahlen.com/og-image-contact.jpg" />

        {/* Additional SEO */}
        <meta name="keywords" content="contact carl wahlen Sweden, product strategy consultant contact Stockholm, project consultation Nordic, book call Sweden, product strategy consultation Stockholm, UX design consultant contact Nordic, business development consultant Sweden" />
        <link rel="canonical" href="https://carlwahlen.com/contact" />
      </Helmet>
      
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Contact Carl Wahlen",
          "description": "Contact page for Carl Wahlen, product strategy consultant in Sweden",
          "url": "https://carlwahlen.com/contact",
          "mainEntity": {
            "@type": "Person",
            "name": "Carl Wahlen",
            "jobTitle": "Product Strategy Consultant",
            "email": "carl@carlwahlen.com",
            "sameAs": [
              "https://github.com/CarlWahlen",
              "https://www.linkedin.com/in/carl-wahlen-digital-strateg-seo-ux/"
            ]
          }
        })}
      </script>
      
      <main>
        {/* Hero Section */}
        <section className="pt-24 pb-16 lg:pt-32 lg:pb-24">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl text-gray-900 mb-6">
                Contact
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Let's discuss your project and see how we can create value together.
              </p>
              
              <p className="text-lg text-gray-600 leading-relaxed mt-6">
                Whether you're looking for product strategy consulting, 
                need help with AI-driven solutions, or want to improve your UX/SEO, 
                I'm here to help you build something great.
              </p>
            </div>
          </div>
        </section>

        {/* Breadcrumbs */}
        <Breadcrumbs />

        {/* Contact Section */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div>
                <h2 className="text-2xl text-gray-900 mb-6">
                  Let's talk
                </h2>
                
                <div className="space-y-6 mb-8">
                  <div>
                    <h3 className="text-lg text-gray-900 mb-2">
                      Email
                    </h3>
                    <a 
                      href="mailto:carl@carlwahlen.com" 
                      className="text-lux-green-500 hover:text-lux-green-600 transition-colors"
                    >
                      carl@carlwahlen.com
                    </a>
                  </div>
                  
                  <div>
                    <h3 className="text-lg text-gray-900 mb-2">
                      GitHub
                    </h3>
                    <a 
                      href="https://github.com/CarlWahlen" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-lux-green-500 hover:text-lux-green-600 transition-colors"
                    >
                      github.com/CarlWahlen
                    </a>
                  </div>
                </div>
                
                <div className="card p-6">
                  <h3 className="text-lg text-gray-900 mb-4">
                    What I can help you with
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-lux-green-400 rounded-full mr-3 flex-shrink-0"></div>
                      Product strategy and roadmap
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-lux-green-400 rounded-full mr-3 flex-shrink-0"></div>
                      Technical architecture and API design
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-lux-green-400 rounded-full mr-3 flex-shrink-0"></div>
                      Business development and growth strategies
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-lux-green-400 rounded-full mr-3 flex-shrink-0"></div>
                      UX for complex systems
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-lux-green-400 rounded-full mr-3 flex-shrink-0"></div>
                      AI and data-driven products
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-lux-green-400 rounded-full mr-3 flex-shrink-0"></div>
                      Process optimization and methodology
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Contact Form */}
              <div>
                <ContactForm />
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

export default Contact;
