import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

interface BreadcrumbItem {
  name: string;
  url: string;
}

const Breadcrumbs: React.FC = () => {
  const location = useLocation();

  // Generate breadcrumbs based on current path
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const pathSegments = location.pathname.split('/').filter(segment => segment !== '');
    const breadcrumbs: BreadcrumbItem[] = [
      { name: 'Home', url: '/' }
    ];

    let currentPath = '';
    
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      
      // Map URL segments to display names
      let displayName = segment;
      
      switch (segment) {
        case 'Services':
        case 'services':
          displayName = 'Services';
          break;
        case 'case':
          displayName = 'Cases';
          break;
        case 'about':
          displayName = 'About';
          break;
        case 'contact':
          displayName = 'Contact';
          break;
        case 'faq':
          displayName = 'FAQ';
          break;
        case 'hellman-partners':
          displayName = 'Hellman & Partners';
          break;
        case 'style-scandinavia':
          displayName = 'Style Scandinavia';
          break;
        case 'payment-orchestration':
          displayName = 'Payment Orchestration';
          break;
        default:
          // Capitalize first letter and replace hyphens with spaces
          displayName = segment
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
      }

      breadcrumbs.push({
        name: displayName,
        url: currentPath
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Don't show breadcrumbs on home page
  if (location.pathname === '/' || location.pathname === '') {
    return null;
  }

  // Generate JSON-LD schema for breadcrumbs
  const generateBreadcrumbSchema = () => {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((breadcrumb, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": breadcrumb.name,
        "item": `https://carlwahlen.com${breadcrumb.url}`
      }))
    };
  };

  return (
    <>
      {/* Breadcrumb Schema Markup */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(generateBreadcrumbSchema())}
        </script>
      </Helmet>

      <nav className="bg-white" aria-label="Breadcrumb">
        <div className="container-hero">
          <div className="py-3">
            <ol className="flex items-center space-x-2 text-sm">
              {breadcrumbs.map((breadcrumb, index) => (
                <li key={breadcrumb.url} className="flex items-center">
                  {index > 0 && (
                    <svg
                      className="w-4 h-4 text-gray-400 mx-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                  {index === breadcrumbs.length - 1 ? (
                    // Current page - not clickable
                    <span className="text-gray-900 font-medium">
                      {breadcrumb.name}
                    </span>
                  ) : (
                    // Previous pages - clickable
                    <Link
                      to={breadcrumb.url}
                      className="text-gray-600 hover:text-lux-green-600 transition-colors"
                    >
                      {breadcrumb.name}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Breadcrumbs;
