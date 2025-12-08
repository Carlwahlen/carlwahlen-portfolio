# AI Navigation Configuration Guide

## Portfolio Demo Configuration

This guide shows how to configure the AI Navigation Engine for your portfolio demo to showcase the tool's value to potential customers.

### 1. Index Content (Pages/URLs)

Use the API endpoint to add portfolio pages:

```bash
curl -X POST http://localhost:3010/v1/content/index \
  -H "Content-Type: application/json" \
  -d '{
    "tenantId": "demo-tax-agency",
    "contentItems": [
      {
        "id": "home-page",
        "url": "/#/",
        "title": "Home",
        "language": "en",
        "tags": ["home", "main"],
        "contentType": "page",
        "description": "Portfolio homepage"
      },
      {
        "id": "cases-page",
        "url": "/#/case",
        "title": "Case Studies",
        "language": "en",
        "tags": ["cases", "portfolio", "work"],
        "contentType": "page",
        "description": "View case studies and project examples"
      },
      {
        "id": "services-page",
        "url": "/#/services",
        "title": "Services",
        "language": "en",
        "tags": ["services", "offerings"],
        "contentType": "page",
        "description": "Learn about available services"
      },
      {
        "id": "contact-page",
        "url": "/#/contact",
        "title": "Contact",
        "language": "en",
        "tags": ["contact", "reach out"],
        "contentType": "page",
        "description": "Get in touch"
      }
    ]
  }'
```

### 2. Configure Flows (Step-by-Step Processes)

Flows are configured in `apps/ai-navigation-api/src/infra/flowRepository.ts`.

**Current flows:**
- `file_tax_return` → guides to tax form steps
- `apply_for_benefit` → guides to benefit application steps

**To add a new flow for portfolio:**

```typescript
{
  id: 'flow-about',
  name: 'Learn About Me',
  description: 'Guide users to about page',
  tenantId: 'demo-tax-agency',
  intent: 'find_information',  // Must match intent detection
  enabled: true,
  steps: [
    {
      id: 'step-about-1',
      type: 'content',
      title: 'Read about me',
      description: 'Learn about my background and experience',
      required: true,
      order: 1,
      directUrl: '/#/about',  // Portfolio page URL
      // OR use contentItemId: 'about-page-id'  // Reference indexed content
    }
  ]
}
```

### 3. How It Works

1. **User asks**: "I want to file my tax return"
2. **Intent Detection** (in `llmClient.ts`): Detects `file_tax_return` intent
3. **Flow Matching**: Finds flow with `intent: 'file_tax_return'`
4. **Step Selection**: Returns first step in the flow
5. **URL Resolution**: 
   - If step has `directUrl` → uses that
   - If step has `contentItemId` → looks up URL from content index

### 4. Step Types

- `content` - Information page
- `login` - Login required
- `form` - Form to fill out
- `summary` - Review/submit page

### 5. Step Conditions

Steps can be conditional:

```typescript
conditions: {
  loggedIn: true,           // Only show if user is logged in
  userType: ['individual'],  // Only for specific user types
  language: ['en', 'sv'],   // Only for specific languages
  device: ['desktop']        // Only for specific devices
}
```

### 6. Adding Content via Code (Alternative)

You can also seed content directly in `contentRepository.ts`:

```typescript
// In contentRepository.ts, add to initialization:
await contentRepository.bulkUpsert('demo-tax-agency', [
  {
    id: 'home-page',
    tenantId: 'demo-tax-agency',
    url: 'https://skatteverket.se',
    title: 'Home',
    language: 'en',
    tags: ['home', 'main'],
    contentType: 'page'
  }
]);
```

### 7. Intent Detection (Current: Stub)

Currently uses keyword matching in `llmClient.ts`. To improve:

- Replace stub with real LLM (OpenAI, Anthropic, etc.)
- The LLM will analyze user input and match to intents
- Intents must match flow `intent` field

### Example: Portfolio Demo Setup

```typescript
// 1. Add portfolio content
POST /v1/content/index
{
  "tenantId": "demo-tax-agency",
  "contentItems": [
    {
      "id": "cases-page",
      "url": "/#/case",
      "title": "Case Studies",
      "language": "en",
      "tags": ["cases", "portfolio"],
      "contentType": "page"
    },
    {
      "id": "contact-page",
      "url": "/#/contact",
      "title": "Contact",
      "language": "en",
      "tags": ["contact"],
      "contentType": "page"
    }
  ]
}

// 2. Flows already configured in flowRepository.ts for portfolio demo
// - "Show me your work" → finds_information → /#/case
// - "I want to contact you" → contact_support → /#/contact
// - "What services do you offer" → finds_information → /#/services

// 3. User asks: "Show me your case studies"
// → Detects intent: find_information
// → Matches flow: flow-view-cases
// → Returns step with URL: /#/case
```

### Quick Reference

- **Content Items**: Pages/URLs that can be navigated to
- **Flows**: Multi-step processes for completing tasks
- **Steps**: Individual steps in a flow (each can link to a URL)
- **Intents**: What the user wants to do (detected from their input)
- **Conditions**: Rules for when steps/flows are shown

