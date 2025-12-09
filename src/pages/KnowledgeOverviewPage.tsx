import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  getAllAreas, 
  getKnowledgePagesByArea, 
  getAreaDisplayName 
} from '../content/knowledgePages';
import Breadcrumbs from '../components/Breadcrumbs';

const KnowledgeOverviewPage: React.FC = () => {
  const areas = getAllAreas();

  return (
    <>
      <Helmet>
        <title>Knowledge Hub - Carl Wahlen</title>
        <meta 
          name="description" 
          content="Learn about product strategy, UX design, data-driven product development, and more. Practical guides and insights for building successful products." 
        />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://carlwahlen.com/knowledge" />
        <meta property="og:title" content="Knowledge Hub - Carl Wahlen" />
        <meta property="og:description" content="Learn about product strategy, UX design, data-driven product development, and more." />

        <link rel="canonical" href="https://carlwahlen.com/knowledge" />
      </Helmet>

      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="pt-24 pb-16 lg:pt-28 lg:pb-24">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl text-gray-900 mb-6 font-medium">
                Knowledge Hub
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Practical guides and insights on product strategy, UX design, 
                data-driven development, and building successful products.
              </p>
            </div>
          </div>
        </section>

        {/* Breadcrumbs */}
        <Breadcrumbs />

        {/* Knowledge Areas */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="max-w-5xl mx-auto space-y-16">
              {areas.map((areaSlug) => {
                const areaDisplayName = getAreaDisplayName(areaSlug);
                const pages = getKnowledgePagesByArea(areaSlug);

                return (
                  <div key={areaSlug}>
                    <h2 className="text-3xl text-gray-900 mb-8 font-medium">
                      {areaDisplayName}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {pages.map((page) => (
                        <Link
                          key={page.pageSlug}
                          to={`/knowledge/${page.areaSlug}/${page.pageSlug}`}
                          className="card p-6 hover-lift group"
                        >
                          <h3 className="text-lg text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                            {page.shortTitle || page.title}
                          </h3>
                          <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                            {page.description}
                          </p>
                          {page.readingTimeMinutes && (
                            <p className="text-xs text-gray-500">
                              {page.readingTimeMinutes} min read
                            </p>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl text-gray-900 mb-4">
                Need help applying this knowledge?
              </h2>
              <p className="text-gray-600 mb-6">
                I help companies build products that combine strategy, technology, and design.
              </p>
              <Link to="/Services" className="btn-primary">
                View my services
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default KnowledgeOverviewPage;

