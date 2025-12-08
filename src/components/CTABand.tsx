import React from 'react';
import { Link } from 'react-router-dom';

interface CTABandProps {
  title: string;
  description: string;
  primaryCTA: {
    text: string;
    link: string;
  };
  secondaryCTA?: {
    text: string;
    link: string;
  };
  className?: string;
}

const CTABand: React.FC<CTABandProps> = ({ 
  title, 
  description, 
  primaryCTA, 
  secondaryCTA,
  className = ''
}) => {
  return (
    <section className={`section-light border-y border-gray-200 ${className}`}>
      <div className="container-custom py-12">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={primaryCTA.link}
              className="btn-primary inline-flex items-center justify-center"
            >
              {primaryCTA.text}
            </Link>
            {secondaryCTA && (
              <Link
                to={secondaryCTA.link}
                className="btn-secondary inline-flex items-center justify-center"
              >
                {secondaryCTA.text}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABand;
