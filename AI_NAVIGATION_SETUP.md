# AI Navigation Engine - Setup Guide

## Snabbstart

För att testa AI Navigation Engine på din portfolio-sida behöver du starta API-servern.

### 1. Installera dependencies

Från projektets rot:
```bash
pnpm install
```

### 2. Starta AI Navigation API

```bash
pnpm dev:ai-api
```

API:et kommer att köra på `http://localhost:3010`

### 3. Starta Portfolio (Vite)

I ett annat terminalfönster:
```bash
pnpm dev
```

Portfolio kommer att köra på `http://localhost:5173`

### 4. Testa på portfolio-sidan

1. Gå till `http://localhost:5173/#/case/ai-navigation`
2. Scrolla ner till "Try It Out"-sektionen
3. Testa att fråga:
   - "I want to file my tax return"
   - "Help me apply for benefits"
   - "Check my application status"
   - "I need to contact support"

## Miljövariabler

Skapa en `.env`-fil i projektets rot (för Vite):
```env
VITE_AI_NAVIGATION_API_URL=http://localhost:3010
```

Om API:et körs på annan port, uppdatera URL:en därefter.

## Struktur

- **Portfolio (Vite)**: `src/` - Din befintliga portfolio-app
- **AI Navigation API**: `apps/ai-navigation-api/` - Express API-server
- **Navigation Core**: `packages/navigation-core/` - Ren affärslogik
- **Shared Types**: `packages/shared-types/` - Delade TypeScript-typer

## Felsökning

**API:et svarar inte:**
- Kontrollera att API:et körs på port 3010
- Kolla terminalen för felmeddelanden
- Verifiera att `pnpm dev:ai-api` körs

**Widget visar fel:**
- Kontrollera att `VITE_AI_NAVIGATION_API_URL` är korrekt satt
- Öppna browser console för att se HTTP-fel
- Verifiera CORS-inställningar i API:et

**TypeScript-fel:**
- Kör `pnpm install` i rotmappen
- Verifiera att alla workspace dependencies är installerade

