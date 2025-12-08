# GDPR Compliance - Query Tracking

## Overview

The AI Navigation system respects user privacy and GDPR requirements by only tracking user queries when the user has explicitly consented to analytics cookies.

## How It Works

### 1. Cookie Consent Check (Frontend)

Before sending a navigation request, the frontend checks if the user has consented to analytics cookies:

```typescript
const hasAnalyticsConsent = (): boolean => {
  const consent = localStorage.getItem('cookieConsent');
  if (!consent) return false;
  
  const preferences = JSON.parse(consent);
  return preferences.analytics === true;
};
```

### 2. Query Tracking Flag

The `trackQuery` flag is sent with each navigation request:

```typescript
const request: NavigateRequest = {
  // ... other fields
  trackQuery: hasAnalyticsConsent(), // Only true if user consented
};
```

### 3. Backend Respects Flag

The backend only tracks queries if `trackQuery === true`:

```typescript
if (request.trackQuery === true) {
  queryService.trackQuery({...});
}
// If false or undefined, no tracking occurs
```

## Privacy Guarantees

✅ **No tracking without consent** - Queries are only tracked if `trackQuery === true`

✅ **Explicit consent required** - User must accept analytics cookies in cookie banner

✅ **Opt-out support** - User can withdraw consent at any time via cookie settings

✅ **No data collection by default** - If no consent, no tracking happens

## Cookie Consent Integration

The system integrates with the existing cookie consent system:

- **Necessary cookies** - Always enabled (required for site functionality)
- **Analytics cookies** - User must opt-in (required for query tracking)
- **Marketing cookies** - User must opt-in (not used by query tracking)

## User Rights (GDPR)

Users have the right to:

1. **Access** - View what queries have been tracked (via `/v1/queries` API)
2. **Delete** - Withdraw consent removes future tracking (existing data can be deleted)
3. **Opt-out** - Disable analytics cookies to stop all tracking
4. **Transparency** - Clear information about what is tracked and why

## Implementation Details

### Frontend (`AINavigationDemoWidget.tsx`)
- Checks `localStorage.getItem('cookieConsent')`
- Parses analytics preference
- Sets `trackQuery: true/false` in request

### Backend (`navigationService.ts`)
- Checks `request.trackQuery` flag
- Only calls `queryService.trackQuery()` if flag is `true`
- No tracking if flag is `false` or `undefined`

### Query Repository
- Stores queries in memory (in-memory Map)
- In production, should use database with proper access controls
- Can be cleared when user withdraws consent

## Testing GDPR Compliance

1. **Without consent**: 
   - Don't accept analytics cookies
   - Use AI Navigation
   - Check: No queries should be tracked

2. **With consent**:
   - Accept analytics cookies
   - Use AI Navigation
   - Check: Queries should be tracked

3. **Withdraw consent**:
   - Accept analytics cookies
   - Use AI Navigation (queries tracked)
   - Withdraw consent in cookie settings
   - Use AI Navigation again
   - Check: New queries should NOT be tracked

## Production Considerations

⚠️ **Important for production:**

1. **Database storage** - Replace in-memory storage with database
2. **Data retention** - Implement data retention policies
3. **Access controls** - Secure API endpoints with authentication
4. **Data deletion** - Implement user data deletion on consent withdrawal
5. **Privacy policy** - Update privacy policy to mention query tracking
6. **Audit logs** - Log when consent is given/withdrawn

## Files

- `src/components/AINavigationDemoWidget.tsx` - Frontend consent check
- `src/components/CookieConsent.tsx` - Cookie consent UI
- `apps/ai-navigation-api/src/services/navigationService.ts` - Backend tracking logic
- `packages/shared-types/src/index.ts` - `trackQuery` flag in API contract

