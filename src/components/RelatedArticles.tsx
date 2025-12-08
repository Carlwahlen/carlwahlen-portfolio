import React from 'react';
import { Link } from 'react-router-dom';

interface RelatedArticle {
  title: string;
  description: string;
  url: string;
  category: string;
  readTime: string;
}

interface RelatedArticlesProps {
  currentPage: string;
  articles?: RelatedArticle[];
}

const RelatedArticles: React.FC<RelatedArticlesProps> = ({ currentPage, articles }) => {
  // Default related articles based on current page
  const getRelatedArticles = (page: string): RelatedArticle[] => {
    const allArticles = {
      home: [
        {
          title: "How to Build Data-Driven Products in Sweden",
          description: "Learn the methodology behind successful product development in the Nordic market",
          url: "/case/hellman-partners",
          category: "Case Study",
          readTime: "5 min read"
        },
        {
          title: "UX Design for Complex Payment Systems",
          description: "Best practices for designing intuitive payment interfaces",
          url: "/case/style-scandinavia",
          category: "Case Study",
          readTime: "4 min read"
        },
        {
          title: "Product Strategy Consulting Services",
          description: "Comprehensive overview of our consulting approach",
          url: "/services",
          category: "Services",
          readTime: "3 min read"
        }
      ],
      services: [
        {
          title: "Hellman & Partners: AI-Driven PropTech Platform",
          description: "How we built a scalable PropTech solution with AI integration",
          url: "/case/hellman-partners",
          category: "Case Study",
          readTime: "5 min read"
        },
        {
          title: "Style Scandinavia: UX/SEO Transformation",
          description: "UX/SEO rebuild with +20% traffic first week, improved IA, templates and WCAG thinking",
          url: "/case/style-scandinavia",
          category: "Case Study",
          readTime: "4 min read"
        },
        {
          title: "Frequently Asked Questions",
          description: "Common questions about product strategy consulting",
          url: "/faq",
          category: "FAQ",
          readTime: "2 min read"
        }
      ],
      case: [
        {
          title: "Our Product Strategy Services",
          description: "Comprehensive consulting services for data-driven products",
          url: "/services",
          category: "Services",
          readTime: "3 min read"
        },
        {
          title: "About Carl Wahlen",
          description: "Learn more about our approach and methodology",
          url: "/about",
          category: "About",
          readTime: "4 min read"
        },
        {
          title: "Contact Us",
          description: "Ready to start your project? Let's discuss your needs",
          url: "/contact",
          category: "Contact",
          readTime: "1 min read"
        }
      ],
      about: [
        {
          title: "Our Case Studies",
          description: "See real examples of our work and results",
          url: "/case",
          category: "Case Studies",
          readTime: "3 min read"
        },
        {
          title: "Services We Offer",
          description: "Comprehensive product strategy consulting services",
          url: "/services",
          category: "Services",
          readTime: "3 min read"
        },
        {
          title: "Frequently Asked Questions",
          description: "Common questions about our consulting approach",
          url: "/faq",
          category: "FAQ",
          readTime: "2 min read"
        }
      ],
      faq: [
        {
          title: "Our Case Studies",
          description: "Real examples of successful product strategies",
          url: "/case",
          category: "Case Studies",
          readTime: "3 min read"
        },
        {
          title: "Services Overview",
          description: "Comprehensive product strategy consulting services",
          url: "/services",
          category: "Services",
          readTime: "3 min read"
        },
        {
          title: "About Our Approach",
          description: "Learn more about our methodology and experience",
          url: "/about",
          category: "About",
          readTime: "4 min read"
        }
      ],
      contact: [
        {
          title: "Our Services",
          description: "Comprehensive product strategy consulting services",
          url: "/services",
          category: "Services",
          readTime: "3 min read"
        },
        {
          title: "Case Studies",
          description: "See examples of our successful projects",
          url: "/case",
          category: "Case Studies",
          readTime: "3 min read"
        },
        {
          title: "Frequently Asked Questions",
          description: "Common questions about our consulting process",
          url: "/faq",
          category: "FAQ",
          readTime: "2 min read"
        }
      ]
    };

    return allArticles[page as keyof typeof allArticles] || [];
  };

  const relatedArticles = articles || getRelatedArticles(currentPage);

  if (relatedArticles.length === 0) return null;

  return (
    <section className="py-24 lg:py-28 bg-gray-50">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl text-gray-900 text-left mb-12">
            Related Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedArticles.map((article, index) => (
              <Link
                key={index}
                to={article.url}
                className="card p-6 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-lux-green-600 bg-lux-green-50 px-3 py-1 rounded-full">
                    {article.category}
                  </span>
                  <span className="text-sm text-gray-500">
                    {article.readTime}
                  </span>
                </div>
                <h3 className="text-xl text-gray-900 mb-3 group-hover:text-lux-green-600 transition-colors">
                  {article.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {article.description}
                </p>
                <div className="mt-4 flex items-center text-lux-green-600 font-medium group-hover:text-lux-green-700 transition-colors">
                  Read more
                  <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RelatedArticles;
