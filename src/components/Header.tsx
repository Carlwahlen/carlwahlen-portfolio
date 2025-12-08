import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Search from './Search';
import LanguageSelector from './LanguageSelector';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isMobileMenuOpen && !target.closest('nav')) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isMobileMenuOpen]);

  const navItems = [
    { path: '/Services', label: 'Services' },
    { path: '/case', label: 'Cases' },
    { path: '/about', label: 'About' }
  ];

  return (
    <>
      {/* Top Header - Always visible */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'glass shadow-soft' : 'bg-white/90 backdrop-blur-sm'
        }`}
      >
        <nav className="container-hero">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center space-x-3 text-xl font-bold text-gray-900 hover:text-gray-700 transition-colors"
              aria-label="Carl Wahlén - Gå till startsida"
            >
              <img 
                src="/logo.svg" 
                alt="Carl Wahlén Logo" 
                className="h-8 w-8"
              />
              <span>Carl Wahlén</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-medium transition-colors ${
                    location.pathname === item.path 
                      ? 'nav-link-active' 
                      : 'nav-link'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Search */}
              <div className="hidden lg:block">
                <Search placeholder="Search pages..." />
              </div>
              
              {/* Language Selector */}
              <div className="hidden md:block">
                <LanguageSelector />
              </div>
              
              <Link
                to="/kontakt"
                className="btn-primary text-sm"
              >
                Let's talk
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              aria-label="Toggle mobile menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>

          </div>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="container-hero py-4">
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-base font-medium transition-colors py-2 ${
                      location.pathname === item.path 
                        ? 'text-lux-green-600' 
                        : 'text-gray-600 hover:text-lux-green-600'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                
                {/* Mobile Search */}
                <div className="pt-2">
                  <Search placeholder="Search pages..." />
                </div>
                
                {/* Mobile Language Selector */}
                <div className="pt-2">
                  <LanguageSelector />
                </div>
                
                <Link
                  to="/kontakt"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="btn-primary text-base w-full text-center py-3 mt-4"
                >
                  Let's talk
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

    </>
  );
};

export default Header;
