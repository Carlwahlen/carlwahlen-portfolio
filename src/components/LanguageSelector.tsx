import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const LanguageSelector: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Map current path to language equivalents
  const getLanguagePath = (lang: 'en' | 'sv') => {
    const currentPath = location.pathname;
    
    // Swedish to English mappings
    const svToEn: Record<string, string> = {
      '/tjanster': '/services',
      '/om': '/about',
      '/kontakt': '/contact',
      '/fall': '/case'
    };
    
    // English to Swedish mappings
    const enToSv: Record<string, string> = {
      '/services': '/tjanster',
      '/about': '/om',
      '/contact': '/kontakt',
      '/case': '/fall'
    };

    if (lang === 'sv') {
      return enToSv[currentPath] || currentPath;
    } else {
      return svToEn[currentPath] || currentPath;
    }
  };

  const handleLanguageChange = (lang: 'en' | 'sv') => {
    const newPath = getLanguagePath(lang);
    navigate(newPath);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-100"
        aria-label="Select language"
      >
        <span>EN</span>
        <svg 
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="py-1">
            <button
              onClick={() => handleLanguageChange('en')}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            >
              English
            </button>
            <button
              onClick={() => handleLanguageChange('sv')}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Svenska
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
