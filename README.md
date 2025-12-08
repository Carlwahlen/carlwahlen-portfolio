# Carl Wahlen Monorepo

This monorepo contains:
- **Portfolio App** (`apps/portfolio`) - Next.js personal portfolio site
- **AI Navigation API** (`apps/ai-navigation-api`) - TypeScript Express API server for AI navigation engine
- **AI Navigation AI Service** (`apps/ai-navigation-ai`) - Python FastAPI service for LLM operations (Ollama)
- **Navigation Core** (`packages/navigation-core`) - Pure business logic library
- **Shared Types** (`packages/shared-types`) - Shared TypeScript types for API contracts

## Architecture

The project is structured for easy extraction of the AI navigation engine into a separate SaaS product:

- **Portfolio** and **AI Navigation API** are completely independent
- Portfolio consumes AI Navigation API via HTTP only (no direct imports)
- Navigation Core is pure business logic with no external dependencies
- Shared Types ensure API contract consistency

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0
- Python >= 3.9 (for AI service)
- Ollama (for local LLM inference) - [Install from ollama.ai](https://ollama.ai)

### Installation

```bash
pnpm install
```

### Development

Run both apps in parallel:
```bash
pnpm dev:all
```

Or run individually:
```bash
# Portfolio only
pnpm dev:portfolio

# AI Navigation API only
pnpm dev:ai-api
```

### Building

```bash
# Build all
pnpm build

# Build individual apps
pnpm build:portfolio
pnpm build:ai-api
```

## Project Structure

```
.
├── apps/
│   ├── portfolio/              # Next.js portfolio app
│   │   └── src/
│   │       ├── app/            # Next.js app router
│   │       └── components/     # React components
│   │
│   └── ai-navigation-api/      # Express API server
│       └── src/
│           ├── routes/         # HTTP route handlers
│           ├── services/       # Business logic orchestration
│           └── infra/          # Infrastructure (DB, LLM clients)
│
└── packages/
    ├── navigation-core/        # Pure business logic
    │   └── src/
    │       ├── types.ts        # Domain models
    │       └── navigate.ts     # Core navigation engine
    │
    └── shared-types/           # API contract types
        └── src/
            └── index.ts        # Shared DTOs
```

## AI Navigation API

The AI Navigation API runs on `http://localhost:3010` by default.

### Endpoints

- `POST /v1/navigate` - Main navigation endpoint
- `POST /v1/navigate/continue` - Continue navigation after an event
- `POST /v1/feedback` - Collect user feedback
- `POST /v1/content/index` - Index content items for a tenant
- `GET /health` - Health check

### Environment Variables

Create `apps/ai-navigation-api/.env`:
```env
PORT=3010
NODE_ENV=development
AI_SERVICE_URL=http://localhost:8001
USE_AI_SERVICE=true
```

## AI Navigation AI Service (Python)

The Python AI service runs on `http://localhost:8001` by default and handles all LLM operations using Ollama.

### Setup

1. Install Python dependencies:
```bash
cd apps/ai-navigation-ai
pip install -r requirements.txt
```

2. Install and start Ollama:
```bash
# Install from https://ollama.ai
# Pull a model:
ollama pull llama2
# Or for better performance:
ollama pull mistral
```

3. Configure environment:
```bash
cp .env.example .env
# Edit .env with your settings
```

4. Run the service:
```bash
python main.py
# Or with uvicorn:
uvicorn main:app --reload --port 8001
```

### Environment Variables

Create `apps/ai-navigation-ai/.env`:
```env
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama2
```

### Endpoints

- `GET /health` - Health check and Ollama connection status
- `POST /detect-intent` - Detect user intent from natural language
- `POST /generate-response` - Generate natural language responses

## Portfolio App

The portfolio app runs on `http://localhost:3000` by default.

### Environment Variables

Create `apps/portfolio/.env.local`:
```env
NEXT_PUBLIC_AI_NAVIGATION_API_URL=http://localhost:3010
```

## Extraction to Separate SaaS

When ready to extract the AI navigation engine:

1. **Move packages:**
   - `packages/navigation-core` → new repo
   - `packages/shared-types` → new repo (or publish as npm package)

2. **Move API app:**
   - `apps/ai-navigation-api` → new repo
   - Update package.json to reference published packages or use workspace

3. **Update portfolio:**
   - Change `NEXT_PUBLIC_AI_NAVIGATION_API_URL` to production API URL
   - No code changes needed - portfolio already uses HTTP only

## Development Notes

- **LLM Integration**: 
  - **Default: Rule-based system** (StubLLMClient) - Clean, fast, works on GitHub Pages
  - Demonstrates the principle of AI navigation using keyword matching and pattern recognition
  - **Optional: Python AI service** (FastAPI + Ollama) - Set `USE_AI_SERVICE=true` to enable
  - Python service requires a server and is not needed for demonstration purposes
- **Database**: Currently in-memory. Replace repositories with PostgreSQL when ready
- **Type Safety**: TypeScript project references ensure type safety across packages
- **Architecture**: Hybrid TypeScript (API) + Python (AI) for best of both worlds
- **GitHub Pages**: Frontend works perfectly. Rule-based system requires no backend.

## License

Private
