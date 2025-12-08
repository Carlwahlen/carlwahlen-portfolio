/**
 * Content repository - in-memory implementation for dev
 * 
 * EXTRACTION NOTE: Replace with actual database implementation (PostgreSQL, etc.)
 * when moving to production. This interface should remain the same.
 */

interface ContentItem {
  id: string;
  tenantId: string;
  url: string;
  title: string;
  language: string;
  tags: string[];
  contentType: string;
  description?: string;
}

// In-memory store for development
// TODO: Replace with database (PostgreSQL, etc.)
const contentItems = new Map<string, ContentItem>();

class ContentRepository {
  async create(item: ContentItem): Promise<ContentItem> {
    contentItems.set(item.id, item);
    return item;
  }

  async getById(id: string): Promise<ContentItem | null> {
    return contentItems.get(id) || null;
  }

  async getByTenant(tenantId: string): Promise<ContentItem[]> {
    return Array.from(contentItems.values()).filter(item => item.tenantId === tenantId);
  }

  async bulkUpsert(tenantId: string, items: ContentItem[]): Promise<void> {
    // Remove existing items for this tenant
    const existing = await this.getByTenant(tenantId);
    existing.forEach(item => contentItems.delete(item.id));

    // Add new items
    items.forEach(item => {
      contentItems.set(item.id, item);
    });
  }

  async delete(id: string): Promise<void> {
    contentItems.delete(id);
  }
}

export const contentRepository = new ContentRepository();

