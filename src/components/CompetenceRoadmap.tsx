import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface Competence {
  id: number;
  name: string;
  type: string;
  description: string;
  details: string;
  level: number; // 0-100, där 0 är teknisk och 100 är teoretisk
  category: 'technical' | 'applied' | 'strategic' | 'theoretical';
}

const CompetenceRoadmap: React.FC = () => {
  const [hoveredCompetence, setHoveredCompetence] = useState<number | null>(null);
  const [selectedCompetence, setSelectedCompetence] = useState<number | null>(null);

  // Kompetenser sorterade från teknisk till teoretisk
  const competences: Competence[] = [
    {
      id: 8,
      name: 'Database Design',
      type: 'technical',
      description: 'Data modeling and structured systems',
      details: 'Understands how databases organize, store, and relate data. Can plan data models, identify relationships between entities, and contribute to efficient and scalable data structures.',
      level: 10,
      category: 'technical'
    },
    {
      id: 9,
      name: 'Frontend Development',
      type: 'technical',
      description: 'Modern frontend development',
      details: 'React, TypeScript, responsive design.',
      level: 15,
      category: 'technical'
    },
    {
      id: 2,
      name: 'API Design',
      type: 'technical',
      description: 'API-first design and integration',
      details: 'Understands how APIs structure data and connect systems. Can design endpoint logic, collaborate on RESTful architecture, and ensure smooth communication between backend and frontend.',
      level: 20,
      category: 'technical'
    },
    {
      id: 7,
      name: 'System Architecture',
      type: 'technical',
      description: 'System architecture and scalability',
      details: 'Microservices, event-driven architecture, API Gateway. Scalable system design.',
      level: 25,
      category: 'technical'
    },
    {
      id: 6,
      name: 'AI & Data Modeling',
      type: 'technical',
      description: 'Applied AI concepts and data-driven logic',
      details: 'Understands the fundamentals of machine learning and data modeling. Can define logical flows, interpret AI-driven insights, and apply data-driven thinking.',
      level: 35,
      category: 'applied'
    },
    {
      id: 5,
      name: 'Data Analysis',
      type: 'analytics',
      description: 'Data analysis and insights',
      details: 'Data-driven decision making, KPI analysis, dashboard design.',
      level: 45,
      category: 'applied'
    },
    {
      id: 4,
      name: 'SEO & Accessibility',
      type: 'optimization',
      description: 'SEO and performance optimization',
      details: 'Technical SEO, performance optimization, WCAG compliance.',
      level: 50,
      category: 'applied'
    },
    {
      id: 3,
      name: 'UX/UI Design',
      type: 'design',
      description: 'User-centered design',
      details: 'UX research, wireframing, prototyping, design systems.',
      level: 60,
      category: 'applied'
    },
    {
      id: 10,
      name: 'Project Management',
      type: 'management',
      description: 'Project management and coordination',
      details: 'Agile methodology, stakeholder management, roadmap execution.',
      level: 70,
      category: 'strategic'
    },
    {
      id: 11,
      name: 'Business Development',
      type: 'business',
      description: 'Business development and strategy',
      details: 'Market analysis, business models, partnerships and B2B/B2C strategy.',
      level: 80,
      category: 'strategic'
    },
    {
      id: 1,
      name: 'Product Strategy',
      type: 'strategy',
      description: 'Product strategy and roadmap development',
      details: 'Development of product strategies, roadmap planning, market analysis and competitor analysis.',
      level: 85,
      category: 'strategic'
    },
    {
      id: 12,
      name: 'Technical Writing',
      type: 'communication',
      description: 'Technical communication and clarity',
      details: 'Able to translate complex systems into clear and accessible documentation. Skilled in writing structured technical explanations, process overviews, and developer-oriented materials.',
      level: 90,
      category: 'theoretical'
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'technical':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'applied':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'strategic':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'theoretical':
        return 'bg-green-100 text-green-800 border-green-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getCategoryGradient = (category: string) => {
    switch (category) {
      case 'technical':
        return 'from-blue-500 to-blue-600';
      case 'applied':
        return 'from-purple-500 to-purple-600';
      case 'strategic':
        return 'from-orange-500 to-orange-600';
      case 'theoretical':
        return 'from-green-500 to-green-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getServiceLink = (competence: Competence): string => {
    // Map kompetenser till services baserat på deras beskrivning
    if (competence.name.includes('Product Strategy') || competence.name.includes('Business Development')) {
      return '/services#product-gtm';
    }
    if (competence.name.includes('API') || competence.name.includes('System Architecture') || competence.name.includes('Frontend')) {
      return '/services#technical-pm';
    }
    if (competence.name.includes('UX') || competence.name.includes('Design') || competence.name.includes('SEO')) {
      return '/services#ux-complex-systems';
    }
    return '/services';
  };

  return (
    <div className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl text-gray-900 mb-4">
            Kompetensroadmap
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            En progression från teknisk implementation till teoretisk strategi
          </p>
          
          {/* Progress Indicator */}
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
              <span>Teknisk</span>
              <span>Applicerad</span>
              <span>Strategisk</span>
              <span>Teoretisk</span>
            </div>
            <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 via-orange-500 to-green-500 rounded-full opacity-30"></div>
          </div>
        </div>

        {/* Roadmap Container with Wave Layout */}
        <div className="relative mb-16">
          {/* Curved Path SVG Background */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ height: '600px' }}>
            <path
              d={`M 50 ${200 + Math.sin(0) * 100} 
                  ${competences.map((_, i) => {
                    const x = 50 + (i / (competences.length - 1)) * 90;
                    const y = 200 + Math.sin(i * 0.8) * 100;
                    return `L ${x} ${y}`;
                  }).join(' ')}`}
              stroke="url(#gradient)"
              strokeWidth="2"
              fill="none"
              opacity="0.2"
              strokeDasharray="5,5"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="33%" stopColor="#a855f7" />
                <stop offset="66%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#22c55e" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Competences Grid */}
          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {competences.map((competence, index) => {
              const isHovered = hoveredCompetence === competence.id;
              const isSelected = selectedCompetence === competence.id;
              
              // Calculate wave position
              const waveOffset = Math.sin(index * 0.8) * 60;
              
              return (
                <div
                  key={competence.id}
                  className="relative"
                  style={{ 
                    marginTop: `${waveOffset}px`,
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  {/* Competence Card */}
                  <Link
                    to={getServiceLink(competence)}
                    className="block group h-full"
                    onMouseEnter={() => setHoveredCompetence(competence.id)}
                    onMouseLeave={() => setHoveredCompetence(null)}
                    onClick={(e) => {
                      // Allow navigation but prevent default to handle smooth scroll
                      const href = getServiceLink(competence);
                      if (href.includes('#')) {
                        e.preventDefault();
                        const [path, hash] = href.split('#');
                        // Navigate if needed
                        if (window.location.pathname !== path) {
                          window.location.href = href;
                        } else {
                          // Smooth scroll to anchor
                          const element = document.getElementById(hash);
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }
                        }
                      }
                      setSelectedCompetence(competence.id === selectedCompetence ? null : competence.id);
                    }}
                  >
                    <div className={`
                      relative bg-white border-2 rounded-2xl p-6 h-full
                      transition-all duration-300 transform
                      ${isHovered || isSelected ? 'scale-105 shadow-2xl -translate-y-2 border-dark-green' : 'shadow-md hover:shadow-xl hover:-translate-y-1'}
                      ${getCategoryColor(competence.category)}
                      group-hover:border-opacity-80
                    `}>
                      {/* Level Indicator with Animation */}
                      <div className="absolute -top-4 -right-4">
                        <div className={`
                          w-10 h-10 rounded-full border-4 border-white shadow-lg
                          bg-gradient-to-br ${getCategoryGradient(competence.category)}
                          flex items-center justify-center text-white text-xs                          transition-all duration-300
                          ${isHovered || isSelected ? 'scale-125 rotate-12' : 'group-hover:scale-110'}
                        `}>
                          {competence.level}
                        </div>
                      </div>
                      
                      {/* Category Label */}
                      <div className="mb-3">
                        <span className={`
                          text-xs uppercase tracking-wider
                          px-2 py-1 rounded-full
                          bg-gradient-to-r ${getCategoryGradient(competence.category)}
                          text-white
                        `}>
                          {competence.category === 'technical' ? 'Teknisk' :
                           competence.category === 'applied' ? 'Applicerad' :
                           competence.category === 'strategic' ? 'Strategisk' : 'Teoretisk'}
                        </span>
                      </div>
                      
                      {/* Content */}
                      <div>
                        <h3 className="text-xl mb-2 group-hover:text-dark-green transition-colors">
                          {competence.name}
                        </h3>
                        <p className="text-sm mb-4 opacity-90 leading-relaxed">
                          {competence.description}
                        </p>
                        
                        {/* Arrow Indicator */}
                        <div className="flex items-center text-sm font-medium opacity-70 group-hover:opacity-100 transition-opacity">
                          <span>Läs mer</span>
                          <svg 
                            className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                      
                      {/* Expanded Details with Smooth Animation */}
                      <div className={`
                        overflow-hidden transition-all duration-300
                        ${isHovered || isSelected ? 'max-h-96 mt-4 pt-4 border-t border-current opacity-70' : 'max-h-0'}
                      `}>
                        <p className="text-xs leading-relaxed">
                          {competence.details}
                        </p>
                      </div>
                      
                      {/* Hover Glow Effect */}
                      {(isHovered || isSelected) && (
                        <div className={`
                          absolute inset-0 rounded-2xl -z-10
                          bg-gradient-to-br ${getCategoryGradient(competence.category)}
                          opacity-20 blur-xl
                        `}></div>
                      )}
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend with Enhanced Design */}
        <div className="flex flex-wrap justify-center gap-8 mt-16 p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
          {[
            { color: 'bg-blue-500', label: 'Teknisk', desc: 'Implementation & teknik' },
            { color: 'bg-purple-500', label: 'Applicerad', desc: 'Praktisk tillämpning' },
            { color: 'bg-orange-500', label: 'Strategisk', desc: 'Business & strategi' },
            { color: 'bg-green-500', label: 'Teoretisk', desc: 'Kunskap & teori' }
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded-full ${item.color} shadow-md`}></div>
              <div>
                <div className="text-sm text-gray-900">{item.label}</div>
                <div className="text-xs text-gray-500">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompetenceRoadmap;

