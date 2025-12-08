import React, { useState } from 'react';

interface CaseFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CaseFilter: React.FC<CaseFilterProps> = ({ 
  categories, 
  selectedCategory, 
  onCategoryChange 
}) => {
  return (
    <div className="flex flex-wrap gap-3 mb-8 justify-start">
      <button
        onClick={() => onCategoryChange('all')}
        className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
          selectedCategory === 'all'
            ? 'bg-lux-green-600 text-white shadow-md'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        All Cases
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
            selectedCategory === category
              ? 'bg-lux-green-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CaseFilter;
