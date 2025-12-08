/**
 * Content service
 */

import type { IndexContentRequest, IndexContentResponse } from '@carlwahlen/shared-types';
import { contentRepository } from '../infra/contentRepository.js';

class ContentService {
  async indexContent(request: IndexContentRequest): Promise<IndexContentResponse> {
    const items = request.contentItems.map(item => ({
      id: item.id,
      tenantId: request.tenantId,
      url: item.url,
      title: item.title,
      language: item.language,
      tags: item.tags || [],
      contentType: item.contentType || 'page',
      description: item.description,
    }));

    await contentRepository.bulkUpsert(request.tenantId, items);

    return {
      success: true,
      indexedCount: items.length,
    };
  }
}

export const contentService = new ContentService();

