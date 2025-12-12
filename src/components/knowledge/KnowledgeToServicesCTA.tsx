import React from 'react';
import { Link } from 'react-router-dom';
import { DEFAULT_SERVICES_PATH, KnowledgePageMeta } from '../../content/knowledgePages';
import { servicesEnabled } from '../../utils/featureFlags';

interface KnowledgeToServicesCTAProps {
  page?: KnowledgePageMeta;
}

const KnowledgeToServicesCTA: React.FC<KnowledgeToServicesCTAProps> = ({ page }) => {
  // Hide CTA when Services page is disabled
  if (!servicesEnabled) {
    return null;
  }

  const servicePath = page?.primaryServicePath ?? DEFAULT_SERVICES_PATH;

  return (
    <div className="card p-8 bg-gray-50 border border-gray-200">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-2xl text-gray-900 mb-4">
          Need help applying this in your product?
        </h2>
        <p className="text-gray-600 mb-6">
          I help companies build products that combine strategy, technology, and design to create real business value.
        </p>
        <Link to={servicePath} className="btn-primary inline-flex items-center">
          View my services
          <svg 
            className="w-5 h-5 ml-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M13 7l5 5m0 0l-5 5m5-5H6" 
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default KnowledgeToServicesCTA;

