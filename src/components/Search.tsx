import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  url: string;
  category: string;
  type: 'page' | 'faq' | 'case';
}

interface SearchProps {
  placeholder?: string;
  showResults?: boolean;
  onResultClick?: () => void;
}

const Search: React.FC<SearchProps> = ({ 
  placeholder = "Search...", 
  showResults = true,
  onResultClick 
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Search data
  const searchData: SearchResult[] = [
    // Pages
    {
      id: 'home',
      title: 'Home - Product Strategy Consultant',
      description: 'Carl Wahlen - Technical product strategist specializing in data-driven products, UX/UI design, and technology strategy in Sweden.',
      url: '/',
      category: 'Page',
      type: 'page'
    },
    {
      id: 'services',
      title: 'Services - Product Strategy Consulting',
      description: 'Comprehensive product strategy consulting services including technical PM, payments & compliance, and UX for complex systems.',
      url: '/services',
      category: 'Page',
      type: 'page'
    },
    {
      id: 'about',
      title: 'About - Carl Wahlen',
      description: 'Learn about Carl Wahlen\'s experience in product strategy, technical architecture, and UX design for Nordic companies.',
      url: '/about',
      category: 'Page',
      type: 'page'
    },
    {
      id: 'contact',
      title: 'Contact - Get in Touch',
      description: 'Contact Carl Wahlen for product strategy consulting, technical PM, and UX design services in Sweden.',
      url: '/contact',
      category: 'Page',
      type: 'page'
    },
    {
      id: 'case',
      title: 'Case Studies - Our Work',
      description: 'Real examples of successful product strategies, including Hellman & Partners PropTech platform and Style Scandinavia UX transformation.',
      url: '/case',
      category: 'Page',
      type: 'page'
    },
    {
      id: 'faq',
      title: 'FAQ - Frequently Asked Questions',
      description: 'Common questions about product strategy consulting, data-driven development, and technology strategy in Sweden.',
      url: '/faq',
      category: 'Page',
      type: 'page'
    },
    
    // Case Studies
    {
      id: 'hellman-partners',
      title: 'Hellman & Partners - AI-Driven PropTech Platform',
      description: 'How we built a scalable PropTech solution with AI integration, resulting in 300% valuation increase.',
      url: '/case/hellman-partners',
      category: 'Case Study',
      type: 'case'
    },
    {
      id: 'style-scandinavia',
      title: 'Style Scandinavia - UX/SEO Transformation',
      description: 'Complete UX overhaul and SEO optimization resulting in 300% increase in organic traffic.',
      url: '/case/style-scandinavia',
      category: 'Case Study',
      type: 'case'
    },
    {
      id: 'payment-orchestration',
      title: 'Payment Orchestration - Architecture & Market Study',
      description: 'Exploring how multi-PSP routing, unified APIs and data-driven orchestration could enable more flexible and resilient payments.',
      url: '/case/payment-orchestration',
      category: 'Case Study',
      type: 'case'
    },
    
    // FAQ Items
    {
      id: 'faq-consultant',
      title: 'What makes a good product strategy consultant in Sweden?',
      description: 'A successful product strategy consultant in Sweden combines technical expertise with business acumen...',
      url: '/faq#consultant',
      category: 'FAQ',
      type: 'faq'
    },
    {
      id: 'faq-data-driven',
      title: 'How do you approach data-driven product development?',
      description: 'My approach follows a structured methodology: Discovery, Blueprint, MVP, Iteration, and Measurement...',
      url: '/faq#data-driven',
      category: 'FAQ',
      type: 'faq'
    },
    {
      id: 'faq-payments',
      title: 'What\'s your experience with payments and fintech in Stockholm?',
      description: 'I have extensive experience in payments and fintech, having worked on PayLink360\'s AI-driven platform...',
      url: '/faq#payments',
      category: 'FAQ',
      type: 'faq'
    },
    {
      id: 'faq-ux',
      title: 'How do you ensure UX excellence for complex technical systems?',
      description: 'UX for complex systems requires understanding both user needs and technical constraints...',
      url: '/faq#ux',
      category: 'FAQ',
      type: 'faq'
    }
  ];

  // Search function - simplified to only show page names
  const search = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    const filteredResults = searchData.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setResults(filteredResults.slice(0, 6)); // Limit to 6 results
  };

  // Handle search icon click
  const handleSearchClick = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    search(value);
    setIsOpen(value.length > 0);
    setSelectedIndex(-1);
  };

  // Handle key navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < results.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : results.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < results.length) {
          handleResultClick(results[selectedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        if (isExpanded) {
          setIsExpanded(false);
          setQuery('');
          setResults([]);
        }
        break;
    }
  };

  // Handle result click
  const handleResultClick = (result: SearchResult) => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
    setIsExpanded(false);
    setSelectedIndex(-1);
    if (onResultClick) onResultClick();
  };

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsExpanded(false);
        setQuery('');
        setResults([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus input when expanding
  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  return (
    <div ref={searchRef} className="relative">
      {!isExpanded ? (
        /* Search Icon - Collapsed State */
        <button
          onClick={handleSearchClick}
          className="p-2 text-gray-500 hover:text-lux-green-600 transition-colors rounded-lg hover:bg-gray-100"
          aria-label="Search"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      ) : (
        /* Search Input - Expanded State */
        <div className="relative w-64">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => query.length > 0 && setIsOpen(true)}
            placeholder={placeholder}
            className="w-full px-4 py-2 pl-10 pr-8 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-lux-green-500 focus:border-lux-green-500 transition-colors"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <button
            onClick={() => {
              setQuery('');
              setResults([]);
              setIsOpen(false);
              setIsExpanded(false);
            }}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Search Results - Simplified */}
      {isOpen && showResults && isExpanded && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
          {results.length > 0 ? (
            <div className="py-2">
              {results.map((result, index) => (
                <Link
                  key={result.id}
                  to={result.url}
                  onClick={() => handleResultClick(result)}
                  className={`block px-4 py-3 hover:bg-gray-50 transition-colors ${
                    index === selectedIndex ? 'bg-lux-green-50 border-l-4 border-lux-green-500' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 text-sm">
                        {result.title.split(' - ')[0]} {/* Show only page name before dash */}
                      </h3>
                    </div>
                    <div className="ml-3 flex-shrink-0">
                      {result.type === 'page' && (
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      )}
                      {result.type === 'case' && (
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                      )}
                      {result.type === 'faq' && (
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : query.length > 0 ? (
            <div className="px-4 py-6 text-center text-gray-500">
              <p className="text-sm">No results found for "{query}"</p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default Search;
