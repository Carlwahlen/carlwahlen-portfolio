# Quick Start Guide

## Initial Setup

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Set up environment variables:**

   Create `apps/ai-navigation-api/.env`:
   ```env
   PORT=3010
   NODE_ENV=development
   ```

   Create `apps/portfolio/.env.local`:
   ```env
   NEXT_PUBLIC_AI_NAVIGATION_API_URL=http://localhost:3010
   ```

## Running the Applications

### Option 1: Run Both Apps Together
```bash
pnpm dev:all
```

This will start:
- Portfolio on http://localhost:3000
- AI Navigation API on http://localhost:3010

### Option 2: Run Apps Separately

**Portfolio only:**
```bash
pnpm dev:portfolio
```

**AI Navigation API only:**
```bash
pnpm dev:ai-api
```

## Testing the AI Navigation

1. Start both apps: `pnpm dev:all`
2. Open http://localhost:3000 in your browser
3. You'll see the AI Navigation Demo widget
4. Try asking:
   - "I want to file my tax return"
   - "Help me apply for benefits"
   - "Check my application status"

## Project Structure Summary

```
apps/
  portfolio/              # Next.js portfolio (port 3000)
  ai-navigation-api/      # Express API (port 3010)

packages/
  navigation-core/        # Business logic
  shared-types/           # API contracts
```

## Next Steps

1. **Migrate existing portfolio content** from `src/` to `apps/portfolio/src/`
2. **Implement real LLM integration** in `apps/ai-navigation-api/src/infra/llmClient.ts`
3. **Add database** (PostgreSQL) by replacing repository implementations
4. **Add tests** for navigation-core and API endpoints

## Troubleshooting

**Port already in use:**
- Change `PORT` in `apps/ai-navigation-api/.env`
- Update `NEXT_PUBLIC_AI_NAVIGATION_API_URL` in portfolio `.env.local`

**Type errors:**
- Run `pnpm type-check` to check all packages
- Ensure all packages are built: `pnpm build`

**Workspace issues:**
- Delete `node_modules` and reinstall: `rm -rf node_modules && pnpm install`

