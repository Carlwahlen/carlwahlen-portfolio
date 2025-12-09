import React from 'react';
import { Link } from 'react-router-dom';
import { KnowledgePageMeta, getRelatedPages } from '../../content/knowledgePages';

interface RelatedKnowledgePagesProps {
  page: KnowledgePageMeta;
}

const RelatedKnowledgePages: React.FC<RelatedKnowledgePagesProps> = ({ page }) => {
  const relatedPages = getRelatedPages(page);

  if (relatedPages.length === 0) {
    return null;
  }

  return (
    <section className="mt-12 pt-12 border-t border-gray-200">
      <h2 className="text-2xl text-gray-900 mb-6">Related topics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {relatedPages.map((relatedPage) => (
          <Link
            key={`${relatedPage.areaSlug}-${relatedPage.pageSlug}`}
            to={`/knowledge/${relatedPage.areaSlug}/${relatedPage.pageSlug}`}
            className="card p-6 hover-lift group"
          >
            <h3 className="text-lg text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
              {relatedPage.shortTitle || relatedPage.title}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2">
              {relatedPage.description}
            </p>
            {relatedPage.readingTimeMinutes && (
              <p className="text-xs text-gray-500 mt-3">
                {relatedPage.readingTimeMinutes} min read
              </p>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RelatedKnowledgePages;

