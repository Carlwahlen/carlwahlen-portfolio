# Architecture Overview

## Monorepo Structure

```
carlwahlen/
├── apps/
│   ├── portfolio/                    # Next.js portfolio (consumer)
│   └── ai-navigation-api/            # Express API server (provider)
│
└── packages/
    ├── navigation-core/               # Pure business logic
    └── shared-types/                 # API contract types
```

## Separation of Concerns

### Portfolio App (`apps/portfolio`)
- **Purpose**: Personal portfolio website
- **Technology**: Next.js 14 + TypeScript
- **Dependencies**: Only `@carlwahlen/shared-types` (for type safety)
- **Integration**: Consumes AI Navigation API via HTTP only
- **Extraction Impact**: None - already treats API as external service

### AI Navigation API (`apps/ai-navigation-api`)
- **Purpose**: Standalone API server for navigation engine
- **Technology**: Express + TypeScript
- **Dependencies**: 
  - `@carlwahlen/navigation-core` (business logic)
  - `@carlwahlen/shared-types` (API contracts)
- **Extraction Impact**: Can be moved to separate repo with minimal changes

### Navigation Core (`packages/navigation-core`)
- **Purpose**: Pure business logic - no I/O, no HTTP, no database
- **Technology**: Pure TypeScript
- **Dependencies**: Only `@carlwahlen/shared-types`
- **Extraction Impact**: Can be published as npm package or moved directly

### Shared Types (`packages/shared-types`)
- **Purpose**: API contract definitions (DTOs)
- **Technology**: Pure TypeScript
- **Dependencies**: None
- **Extraction Impact**: Can be published as npm package

## Data Flow

```
┌─────────────┐
│  Portfolio  │
│  (Next.js)  │
└──────┬──────┘
       │ HTTP
       │ POST /v1/navigate
       ▼
┌─────────────────────┐
│  AI Navigation API   │
│    (Express)         │
└──────┬──────────────┘
       │
       ├──► navigation-core (business logic)
       ├──► repositories (data access)
       └──► llmClient (AI integration)
```

## API Contract

The portfolio and AI API communicate via well-defined HTTP endpoints:

- `POST /v1/navigate` - Main navigation request
- `POST /v1/navigate/continue` - Continue after event
- `POST /v1/feedback` - User feedback
- `POST /v1/content/index` - Content indexing

All contracts are defined in `packages/shared-types` to ensure type safety.

## Extraction Strategy

### Phase 1: Current State (Monorepo)
- All code in one repository
- Workspace dependencies (`workspace:*`)
- Shared development environment

### Phase 2: Extraction (Separate SaaS)
1. **Create new repository** for AI navigation engine
2. **Move packages:**
   - `packages/navigation-core` → new repo
   - `packages/shared-types` → publish as npm package or move to new repo
3. **Move API app:**
   - `apps/ai-navigation-api` → new repo
   - Update dependencies to use published packages
4. **Update portfolio:**
   - Change `NEXT_PUBLIC_AI_NAVIGATION_API_URL` environment variable
   - No code changes needed

### Key Design Decisions for Extraction

1. **No Direct Imports**: Portfolio never imports from `navigation-core` or `ai-navigation-api`
2. **HTTP Only**: All communication via HTTP REST API
3. **Type Safety**: Shared types package ensures contracts stay in sync
4. **Abstraction Layers**: 
   - LLM client is abstracted (easy to swap providers)
   - Repositories are abstracted (easy to swap databases)
5. **No Hardcoded Dependencies**: All tenant-specific data is configurable

## Database Strategy

**Current (Development):**
- In-memory stores in repositories
- Seed data in `flowRepository.ts`

**Future (Production):**
- Replace repository implementations with PostgreSQL
- Use connection pooling and migrations
- Keep repository interfaces unchanged

## LLM Integration Strategy

**Current (Development):**
- Stub implementation with keyword matching
- Located in `apps/ai-navigation-api/src/infra/llmClient.ts`

**Future (Production):**
- Implement actual LLM provider (OpenAI, Anthropic, etc.)
- Use environment variables for API keys
- Keep `LLMClient` interface unchanged

## TypeScript Project References

The monorepo uses TypeScript project references for:
- Type safety across packages
- Incremental compilation
- Proper dependency tracking

```
Root tsconfig.json
├── references packages/shared-types
├── references packages/navigation-core
├── references apps/portfolio
└── references apps/ai-navigation-api
```

## Environment Variables

### AI Navigation API
- `PORT` - Server port (default: 3010)
- `NODE_ENV` - Environment (development/production)
- `OPENAI_API_KEY` - LLM provider key (when implemented)
- `DATABASE_URL` - PostgreSQL connection string (when implemented)

### Portfolio
- `NEXT_PUBLIC_AI_NAVIGATION_API_URL` - API base URL (default: http://localhost:3010)

## Testing Strategy (Future)

- **Unit Tests**: Test `navigation-core` logic in isolation
- **Integration Tests**: Test API endpoints with test database
- **E2E Tests**: Test portfolio widget integration
- **Contract Tests**: Ensure API contracts match shared types

