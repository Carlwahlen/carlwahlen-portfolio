# 🔍 Scraping och Syntetisk Data-Generering

## Översikt

AI-navigationsmodellen använder för närvarande **manuellt definierade keywords** i `llmClient.ts` och `navigate.ts`. Den har **INTE** scrapat sidorna automatiskt ännu.

Detta dokument förklarar hur du kan:
1. Generera 10x mer syntetisk testdata från befintliga inputs
2. Analysera/scrapa sidor för att generera realistiska användarfrågor

## 📊 Syntetisk Data-Generering

### `generate-synthetic-data.ts`

Detta script genererar **10x mer testdata** baserat på dina befintliga testfall genom:

- **Synonymer**: Ersätter ord med synonymer (t.ex. "show" → "display", "see", "view")
- **Frågeformuleringar**: Skapar olika sätt att ställa samma fråga
- **Svenska variationer**: Lägger till svenska översättningar
- **Ordvariationer**: Lägger till/tar bort ord för att skapa variationer

#### Användning:

```bash
cd apps/ai-navigation-api
pnpm generate-synthetic
```

Detta skapar `test-data/test-cases-synthetic.json` med 10x fler testfall.

#### Exempel:

Från:
```json
{
  "input": "show me your case studies",
  "expectedTargetUrl": "/#/case"
}
```

Genereras:
- "display your case studies"
- "see your work"
- "view your projects"
- "I want to see your case studies"
- "Can you show me your case studies?"
- "visa dina case studies" (svenska)
- ... och många fler!

## 🔍 Scraping och Query-Generering

### `scrape-and-generate-queries.ts`

Detta script analyserar portfolio-sidorna och genererar **realistiska användarfrågor** baserat på faktiskt innehåll.

#### Vad det gör:

1. **Analyserar sidinnehåll**: Extraherar nyckelord från titlar, beskrivningar och innehåll
2. **Genererar frågor**: Skapar naturliga frågor som människor skulle ställa
3. **Rankar efter konfidens**: Högre konfidens för frågor baserade på titlar vs. innehåll

#### Användning:

```bash
cd apps/ai-navigation-api
pnpm scrape-queries
```

Detta skapar `test-data/test-cases-scraped.json` med queries baserade på faktiskt sidinnehåll.

#### Exempel output:

För sidan `/services`:
- "tell me about services"
- "what is product strategy consulting"
- "show me your services"
- "I want to see your offerings"
- ... baserat på faktiskt innehåll på sidan

## 🚀 Komplett Workflow

### Steg 1: Generera syntetisk data från befintliga testfall

```bash
pnpm generate-synthetic
```

Detta ger dig **10x fler variationer** av dina befintliga testfall.

### Steg 2: Generera queries från sidinnehåll

```bash
pnpm scrape-queries
```

Detta ger dig **realistiska frågor** baserade på vad som faktiskt finns på sidorna.

### Steg 3: Kombinera och testa

Du kan nu:
1. Kombinera `test-cases.json`, `test-cases-synthetic.json` och `test-cases-scraped.json`
2. Testa modellen med alla queries:

```bash
pnpm test-model
```

### Steg 4: Analysera resultat

```bash
pnpm extract-keywords
```

Detta analyserar misslyckade testfall och föreslår nya keywords att lägga till.

## 📝 Förbättringar för Framtiden

### Verklig Scraping

För att implementera **riktig scraping** skulle du kunna:

1. **Använda Puppeteer/Playwright** för att ladda sidor:
```typescript
import puppeteer from 'puppeteer';

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.goto('http://localhost:5173/#/services');
const content = await page.content();
```

2. **Extrahera text från DOM**:
```typescript
const title = await page.$eval('h1', el => el.textContent);
const paragraphs = await page.$$eval('p', els => els.map(el => el.textContent));
```

3. **Analysera med NLP** för att hitta viktiga koncept och generera queries

### Integration med LLM

För att generera ännu bättre queries kan du använda en LLM:

```typescript
// Pseudokod
const prompt = `Based on this page content: "${pageContent}"
Generate 10 realistic user queries that someone might type to navigate to this page.`;

const queries = await llm.generate(prompt);
```

## 📊 Nuvarande Status

✅ **Implementerat:**
- Syntetisk data-generering från befintliga testfall
- Query-generering baserat på simulerat sidinnehåll
- Keyword-extraktion från misslyckade testfall

❌ **Inte implementerat än:**
- Verklig scraping av faktiska sidor (använder simulerad data)
- LLM-baserad query-generering
- Automatisk uppdatering av keywords baserat på scraping

## 💡 Tips

1. **Kör `generate-synthetic` regelbundet** när du lägger till nya testfall
2. **Uppdatera `scrape-and-generate-queries.ts`** med faktiskt sidinnehåll för bättre queries
3. **Kombinera alla tre datakällor** för omfattande testning
4. **Använd `extract-keywords`** efter testning för att hitta nya keywords att lägga till

