import React from 'react';
import { Service } from '../data/services';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <div className="card p-6 hover-lift group">
      <div className="mb-4">
        <h3 className="text-xl text-gray-900 group-hover:text-gray-700 transition-colors">
          {service.title}
        </h3>
      </div>
      
      <p className="text-gray-600 text-sm mb-4">
        {service.description}
      </p>
      
      <ul className="space-y-2">
        {service.features.map((feature, index) => (
          <li key={index} className="flex items-center text-sm text-gray-700">
            <div className="w-1.5 h-1.5 bg-gray-900 rounded-full mr-3 flex-shrink-0"></div>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceCard;
