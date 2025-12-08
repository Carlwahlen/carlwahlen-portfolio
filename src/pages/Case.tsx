import React, { useState, useMemo, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import CaseCard from '../components/CaseCard';
import CaseFilter from '../components/CaseFilter';
import { cases } from '../data/cases';
import Breadcrumbs from '../components/Breadcrumbs';

const Case: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  // Read category from URL on mount
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      // Check if the category exists in our cases
      const categoryExists = cases.some(caseItem => caseItem.category === categoryParam);
      if (categoryExists) {
        setSelectedCategory(categoryParam);
      }
    }
  }, [location.search]);

  // Update URL when category changes
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category === 'all') {
      navigate('/case');
    } else {
      navigate(`/case?category=${category}`);
    }
  };
  
  // Get unique categories from cases, excluding E-commerce
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(cases.map(caseItem => caseItem.category))];
    return uniqueCategories.filter(cat => cat !== 'E-commerce').sort();
  }, []);
  
  // Filter cases based on selected category and sort alphabetically by title
  const filteredCases = useMemo(() => {
    let result;
    if (selectedCategory === 'all') {
      result = cases;
    } else {
      result = cases.filter(caseItem => caseItem.category === selectedCategory);
    }
    // Sort alphabetically by title
    return [...result].sort((a, b) => a.title.localeCompare(b.title));
  }, [selectedCategory]);

  return (
    <>
      <Helmet>
        <title>Case Studies - Carl Wahlen</title>
        <meta name="description" content="Case studies showcasing data-driven product development, UX/UI design, and business development projects in Sweden. Real examples of strategy, technology, and design creating business value." />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://carlwahlen.com/case" />
        <meta property="og:title" content="Case Studies - Carl Wahlen Product Strategy Consultant" />
        <meta property="og:description" content="Case studies showcasing data-driven product development, UX/UI design, and business development projects in Sweden. Real examples of strategy, technology, and design creating business value." />
        <meta property="og:image" content="https://carlwahlen.com/og-image-cases.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Carl Wahlen" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://carlwahlen.com/case" />
        <meta property="twitter:title" content="Case Studies - Carl Wahlen Product Strategy Consultant" />
        <meta property="twitter:description" content="Case studies showcasing data-driven product development, UX/UI design, and business development projects in Sweden." />
        <meta property="twitter:image" content="https://carlwahlen.com/og-image-cases.jpg" />

        {/* Additional SEO */}
        <meta name="keywords" content="case studies Sweden, product strategy case studies Stockholm, UX design case studies Nordic, business development case studies Sweden, data-driven product development Stockholm, PropTech case study Nordic, fintech case study Sweden, e-commerce case study Stockholm" />
        <link rel="canonical" href="https://carlwahlen.com/case" />
      </Helmet>
      
      <main>
        {/* Hero Section */}
        <section className="min-h-screen w-full bg-gray-50 relative overflow-hidden">
          {/* Location and Time - Top corners */}
          <div className="absolute top-0 left-0 right-0 z-20 pt-[20px] md:pt-[100px]">
            <div className="container-hero flex justify-between">
              <p className="text-base text-gray-700 font-normal">Stockholm</p>
              <p className="text-base text-gray-700 font-normal">{currentTime}</p>
            </div>
          </div>
          
          {/* Tile pattern background - perfectly structured grid with diamonds at intersections */}
          <div 
            className="absolute inset-0 opacity-[0.01]"
            style={{
              backgroundImage: `
                url("data:image/svg+xml,%3Csvg width='80' height='80' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='tile-statement' width='80' height='80' patternUnits='userSpaceOnUse'%3E%3Crect width='80' height='80' fill='transparent'/%3E%3Cline x1='0' y1='0' x2='80' y2='0' stroke='%231f2937' stroke-width='0.5'/%3E%3Cline x1='0' y1='0' x2='0' y2='80' stroke='%231f2937' stroke-width='0.5'/%3E%3Cpolygon points='0,0 3,3 0,6 -3,3' fill='%231f2937'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23tile-statement)'/%3E%3C/svg%3E")
              `,
              backgroundSize: '80px 80px',
            }}
          />
          
          {/* Green signal lines going through the grid */}
          <div 
            className="absolute inset-0 opacity-[0.1]"
            style={{
              backgroundImage: `
                url("data:image/svg+xml,%3Csvg width='80' height='80' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='green-signals' width='80' height='80' patternUnits='userSpaceOnUse'%3E%3Crect width='80' height='80' fill='transparent'/%3E%3Cline x1='0' y1='40' x2='80' y2='40' stroke='%2310b981' stroke-width='1'/%3E%3Cline x1='40' y1='0' x2='40' y2='80' stroke='%2310b981' stroke-width='1'/%3E%3Cline x1='0' y1='0' x2='80' y2='80' stroke='%2310b981' stroke-width='0.8' opacity='0.6'/%3E%3Cline x1='0' y1='80' x2='80' y2='0' stroke='%2310b981' stroke-width='0.8' opacity='0.6'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23green-signals)'/%3E%3C/svg%3E")
              `,
              backgroundSize: '80px 80px',
            }}
          />
          
          {/* Case Heading - Absolutely positioned, centered on screen */}
          <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[calc(50%+235px)] md:-translate-y-[calc(50%+183px)] text-[48px] text-gray-900 font-medium text-center z-30">
            Case
              </h1>
          
          <div className="container-hero relative z-10 pt-[350px] md:pt-[585px] pb-20">
            {/* SCROLL to discover - above the three columns */}
            <div className="mb-[160px] md:mb-[123px] text-center">
              <a 
                href="#cases-grid" 
                className="text-[12px] text-gray-400 font-normal tracking-wider cursor-pointer hover:text-gray-600 transition-colors inline-block"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('cases-grid')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Scroll to discover
              </a>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24 items-start">
              {/* Column 1 - Main Text */}
              <div>
                <p className="text-lg md:text-xl text-gray-900 font-semibold leading-relaxed">
                  Showcasing projects where strategy, technology and design come together to create measurable business results.
              </p>
              </div>
              
              {/* Column 2 - Heading (hidden on mobile, shown on desktop) */}
              <div className="hidden md:flex justify-center">
                <h3 className="text-[14px] text-gray-900 font-normal text-left">
                  <a 
                    href="#cases-grid" 
                    className="cursor-pointer hover:text-gray-600 transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('cases-grid')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Our cases:
                  </a>
                </h3>
              </div>
              
              {/* Column 3 - Cases List */}
              <div className="md:ml-auto md:max-w-fit">
                {/* Heading shown on mobile above list */}
                <h3 className="text-[14px] text-gray-900 font-normal text-left mb-6 md:hidden">
                  <a 
                    href="#cases-grid" 
                    className="cursor-pointer hover:text-gray-600 transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('cases-grid')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Our cases:
                  </a>
                </h3>
                
                <ul className="space-y-4">
                  {filteredCases.slice(0, 6).map((caseItem, index) => (
                    <li key={caseItem.id} className="flex items-center">
                      <span className="w-6 h-6 rounded-full border-2 border-gray-900 bg-white flex items-center justify-center text-gray-900 text-sm font-medium mr-4 flex-shrink-0">{index + 1}</span>
                      <a 
                        href={`#${caseItem.id}`} 
                        className="text-[12px] text-gray-900 cursor-pointer hover:text-gray-600 transition-colors"
                        onClick={(e) => {
                          e.preventDefault();
                          document.getElementById(caseItem.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }}
                      >
                        {caseItem.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Breadcrumbs */}
        <Breadcrumbs />

        {/* Filter Section */}
          <section className="py-8 bg-gray-50">
            <div className="container-custom">
              <CaseFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
              />
            </div>
          </section>

        {/* Cases Section */}
        <section id="cases-grid" className="py-16 lg:py-24 bg-[#F8F8F8]">
            <div className="container-custom">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {filteredCases.map((caseItem) => (
                  <div key={caseItem.id} id={caseItem.id}>
                    <CaseCard caseItem={caseItem} />
                  </div>
                ))}
              </div>
              {filteredCases.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No cases found in this category.</p>
                </div>
              )}
            </div>
          </section>
      </main>
    </>
  );
};

export default Case;
