import React from 'react';
import { Case } from '../data/cases';
import { Link } from 'react-router-dom';

interface CaseCardProps {
  caseItem: Case;
}

const CaseCard: React.FC<CaseCardProps> = ({ caseItem }) => {
  // Determine the link URL based on case ID
  const getCaseUrl = () => {
    if (caseItem.id === 'payment-orchestration') return '/case/payment-orchestration';
    if (caseItem.id === 'style-scandinavia') return '/case/style-scandinavia';
    if (caseItem.id === 'hellman-partners') return '/case/hellman-partners';
    if (caseItem.id === 'portfolio-website') return '/case/portfolio-website';
    if (caseItem.id === 'ai-navigation') return '/case/ai-navigation';
    return '/contact';
  };

  // Get image path based on case ID (same logic as CaseCarousel)
  const getImageForCase = (caseId: string): string => {
    switch (caseId) {
      case 'style-scandinavia':
        return '/Style_Scandinavia_web_mockup.png';
      case 'ai-navigation':
        return '/Ai-navigation-bot.png';
      default:
        return caseItem.image || '/Payment_app_flow.png';
    }
  };

  const caseUrl = getCaseUrl();
  const caseImage = getImageForCase(caseItem.id);
  const isContactLink = caseItem.id !== 'payment-orchestration' && 
                       caseItem.id !== 'style-scandinavia' && 
                       caseItem.id !== 'hellman-partners' && 
                       caseItem.id !== 'portfolio-website' &&
                       caseItem.id !== 'ai-navigation';

  return (
    <Link
      to={caseUrl}
      id={caseItem.id}
      className="group block h-full no-underline hover:no-underline"
    >
      <div className="bg-white rounded-3xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
        {/* Image */}
        <div className="relative overflow-hidden bg-gray-100" style={{ height: '240px' }}>
          <img
            src={caseImage}
            alt={caseItem.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            style={caseItem.id === 'hellman-partners' ? { filter: 'blur(4.8px)' } : {}}
            loading="lazy"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Category Badge */}
          <div className="absolute left-4 top-3 bg-gray-900/90 backdrop-blur-sm text-white font-semibold rounded-full shadow-lg px-4 py-1.5 text-xs">
            {caseItem.id === 'style-scandinavia' 
              ? 'Web Development + Internship' 
              : caseItem.id === 'payment-orchestration'
              ? 'Market Research + MVP development'
              : caseItem.category}
          </div>
        </div>
        
        {/* Content */}
        <div className="flex flex-col flex-grow p-6">
          <h3 className="text-lg text-gray-900 mb-2 group-hover:text-gray-700 transition-colors line-clamp-2">
          {caseItem.title}
        </h3>
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 flex-grow mb-4">
          {caseItem.description}
        </p>
          
          {/* CTA */}
          <div className="mt-auto flex items-center font-semibold text-gray-900 group-hover:text-gray-700 transition-colors text-sm">
            <span>{isContactLink ? 'Request demo/README' : 'Read case study'}</span>
            <svg 
              className="ml-2 group-hover:translate-x-2 transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              style={{ width: '14px', height: '14px' }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
      </div>
        </div>
      </div>
    </Link>
  );
};

export default CaseCard;
