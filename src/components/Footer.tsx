import React from 'react';
import { Link } from 'react-router-dom';
import { servicesEnabled } from '../utils/featureFlags';

const Footer: React.FC = () => {
  return (
    <footer className="section-light border-t border-gray-200">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-0 text-xl font-bold text-gray-900 mb-4">
              <span className="text-2xl"></span>
              <span>Carl Wahlén</span>
            </div>
            <p className="text-gray-600 text-sm mb-4 max-w-md">
            Product strategy consultant in Sweden specializing in data-driven products, UX/UI design, business development, and technology strategy.
            </p>
            <div className="flex space-x-4">
              <a 
                href="mailto:carl@carlwahlen.com" 
                className="text-gray-500 hover:text-lux-green-500 transition-colors"
                aria-label="Send email"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </a>
              <a 
                href="https://github.com/CarlWahlen" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-lux-green-500 transition-colors"
                aria-label="GitHub profile"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                </svg>
              </a>
              <a 
                href="https://www.linkedin.com/in/carl-wahlen-digital-strateg-seo-ux/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-lux-green-500 transition-colors"
                aria-label="LinkedIn profile"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xl text-gray-900 mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-lux-green-500 transition-colors text-sm">Home</Link></li>
              {servicesEnabled && <li><Link to="/services" className="text-gray-600 hover:text-lux-green-500 transition-colors text-sm">Services</Link></li>}
              <li><Link to="/case" className="text-gray-600 hover:text-lux-green-500 transition-colors text-sm">Cases</Link></li>
              <li><Link to="/about" className="text-gray-600 hover:text-lux-green-500 transition-colors text-sm">About</Link></li>
              <li><Link to="/faq" className="text-gray-600 hover:text-lux-green-500 transition-colors text-sm">FAQ</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-lux-green-500 transition-colors text-sm">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          {servicesEnabled && (
            <div>
              <h3 className="text-xl text-gray-900 mb-4">Services</h3>
              <ul className="space-y-2">
                <li><Link to="/services#product-gtm" className="text-gray-600 hover:text-lux-green-500 transition-colors text-sm">Product Strategy</Link></li>
                <li><Link to="/services#technical-pm" className="text-gray-600 hover:text-lux-green-500 transition-colors text-sm">Technical PM</Link></li>
                <li><Link to="/services" className="text-gray-600 hover:text-lux-green-500 transition-colors text-sm">Payments & Compliance</Link></li>
                <li><Link to="/services#ux-complex-systems" className="text-gray-600 hover:text-lux-green-500 transition-colors text-sm">UX for Complex Systems</Link></li>
                <li><Link to="/services#data-driven-development" className="text-gray-600 hover:text-lux-green-500 transition-colors text-sm">Data-driven Development</Link></li>
                <li><Link to="/services#business-development" className="text-gray-600 hover:text-lux-green-500 transition-colors text-sm">Business Development</Link></li>
              </ul>
            </div>
          )}
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © 2024 Carl Wahlen. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="/privacy" className="text-gray-500 hover:text-lux-green-500 transition-colors text-sm">Privacy</a>
              <a href="/terms" className="text-gray-500 hover:text-lux-green-500 transition-colors text-sm">Terms</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
