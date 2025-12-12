/**
 * Feature Flags
 * 
 * Centralized feature flag configuration for toggling site features.
 * 
 * To re-enable Services page:
 * 1. Set VITE_SERVICES_ENABLED=true in .env
 * 2. Restart dev server or rebuild
 */

// Feature flag for Services page
export const servicesEnabled = import.meta.env.VITE_SERVICES_ENABLED === 'true';

