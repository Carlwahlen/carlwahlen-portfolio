import React from 'react';
import { Role } from '../data/roles';

interface RoleCardProps {
  role: Role;
}

const RoleCard: React.FC<RoleCardProps> = ({ role }) => {
  return (
    <div className="card p-6 hover-lift group">
      <div className="flex items-start justify-between mb-4">
        <div className="text-right">
          <div className="text-xs text-gray-900 font-medium uppercase tracking-wide">
            {role.companyType}
          </div>
        </div>
      </div>
      
      <h3 className="text-xl text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
        {role.title}
      </h3>
      
      <div className="text-sm text-gray-700 font-medium mb-3">
        Fokus: {role.focus}
      </div>
      
      <p className="text-gray-600 text-sm leading-relaxed">
        {role.description}
      </p>
    </div>
  );
};

export default RoleCard;
