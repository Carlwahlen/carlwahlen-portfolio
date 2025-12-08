import React from 'react';
import { Pricing } from '../data/services';
import { Link } from 'react-router-dom';

interface PricingCardProps {
  pricing: Pricing;
  featured?: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({ pricing, featured = false }) => {
  return (
    <div className={`card p-6 relative ${featured ? 'ring-2 ring-lux-green-400/50 bg-neutral-800/30' : ''}`}>
      {featured && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-lux-green-400 text-neutral-950 text-xs px-3 py-1 rounded-full">
            Populär
          </span>
        </div>
      )}
      
      <div className="text-center mb-6">
        <h3 className="text-xl text-neutral-100 mb-2">
          {pricing.title}
        </h3>
        <p className="text-neutral-400 text-sm mb-4">
          {pricing.description}
        </p>
        <div className="text-2xl text-lux-green-400">
          {pricing.price}
        </div>
      </div>
      
      <ul className="space-y-3 mb-6">
        {pricing.features.map((feature, index) => (
          <li key={index} className="flex items-start text-sm text-neutral-300">
            <div className="w-1.5 h-1.5 bg-lux-green-400 rounded-full mr-3 flex-shrink-0 mt-2"></div>
            {feature}
          </li>
        ))}
      </ul>
      
      <Link
        to="/kontakt"
        className={`w-full text-center py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
          featured 
            ? 'btn-primary' 
            : 'btn-secondary'
        }`}
      >
        {pricing.cta}
      </Link>
    </div>
  );
};

export default PricingCard;
