# AI Navigation - Modellutveckling med Testdata

Denna guide förklarar hur du utvecklar och förbättrar AI-navigeringen med hjälp av testdata.

## Översikt

För att förbättra modellen behöver du:
1. **Samla in testdata** - Frågor och korrekta svar
2. **Analysera data** - Hitta patterns och missmatchningar
3. **Uppdatera modellen** - Lägg till nya keywords/regler
4. **Testa och iterera** - Verifiera förbättringar

---

## 1. Samla in Testdata

### Metod 1: Använd Feedback API:et

Feedback API:et finns redan på `POST /v1/feedback`. Du kan använda det för att samla in data.

**Exempel på testdata-struktur:**

```json
{
  "sessionId": "session-123",
  "useful": false,
  "reason": "Navigated to wrong page",
  "correctUrl": "/#/case"
}
```

### Metod 2: Skapa en Testdata-fil

Skapa en fil med testfall:

**`apps/ai-navigation-api/test-data/test-cases.json`:**

```json
{
  "testCases": [
    {
      "id": "tc-001",
      "input": "show me your case studies",
      "expectedIntent": "find_information",
      "expectedTargetUrl": "/#/case",
      "expectedFlow": "flow-view-cases",
      "tags": ["case", "portfolio", "work"]
    },
    {
      "id": "tc-002",
      "input": "I want to contact you",
      "expectedIntent": "contact_support",
      "expectedTargetUrl": "/#/contact",
      "expectedFlow": "flow-contact",
      "tags": ["contact", "email", "hire"]
    },
    {
      "id": "tc-003",
      "input": "what services do you offer",
      "expectedIntent": "find_information",
      "expectedTargetUrl": "/#/services",
      "expectedFlow": "flow-services",
      "tags": ["services", "offer", "capabilities"]
    },
    {
      "id": "tc-004",
      "input": "tell me about the founder project",
      "expectedIntent": "find_information",
      "expectedTargetUrl": "/#/case/founder",
      "expectedFlow": "flow-case-founder",
      "tags": ["founder", "fintech", "case"]
    }
  ]
}
```

### Metod 3: Logga Användarinteraktioner

Lägg till logging i `navigationService.ts` för att samla in riktiga användarfrågor:

```typescript
// I navigationService.ts
console.log(JSON.stringify({
  timestamp: new Date().toISOString(),
  input: request.input,
  detectedIntent: result.intent,
  targetUrl: result.targetUrl,
  confidence: result.confidence,
  sessionId: result.sessionId,
}));
```

---

## 2. Analysera Testdata

### Steg 1: Kör Testfallen

Skapa ett testscript som kör alla testfall och samlar resultat:

**`apps/ai-navigation-api/scripts/test-model.ts`:**

```typescript
import { readFileSync } from 'fs';
import { join } from 'path';

interface TestCase {
  id: string;
  input: string;
  expectedIntent: string;
  expectedTargetUrl: string;
  expectedFlow: string;
  tags: string[];
}

interface TestResult {
  testCase: TestCase;
  actualIntent?: string;
  actualTargetUrl?: string;
  actualFlow?: string;
  passed: boolean;
  confidence?: number;
}

async function testModel() {
  // Läs testdata
  const testData = JSON.parse(
    readFileSync(join(__dirname, '../test-data/test-cases.json'), 'utf-8')
  );

  const results: TestResult[] = [];

  for (const testCase of testData.testCases) {
    // Anropa API:et (eller direkt testa llmClient)
    const response = await fetch('http://localhost:3010/v1/navigate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tenantId: 'demo-tax-agency',
        input: testCase.input,
        language: 'en',
      }),
    });

    const data = await response.json();

    const result: TestResult = {
      testCase,
      actualIntent: data.intent,
      actualTargetUrl: data.targetUrl,
      passed:
        data.intent === testCase.expectedIntent &&
        data.targetUrl === testCase.expectedTargetUrl,
      confidence: data.confidence,
    };

    results.push(result);
  }

  // Analysera resultat
  const passed = results.filter(r => r.passed).length;
  const failed = results.filter(r => !r.passed).length;

  console.log(`\n📊 Test Results:`);
  console.log(`✅ Passed: ${passed}/${results.length}`);
  console.log(`❌ Failed: ${failed}/${results.length}`);
  console.log(`📈 Success rate: ${((passed / results.length) * 100).toFixed(1)}%\n`);

  // Visa misslyckade testfall
  const failures = results.filter(r => !r.passed);
  if (failures.length > 0) {
    console.log('❌ Failed test cases:\n');
    failures.forEach(f => {
      console.log(`  ${f.testCase.id}: "${f.testCase.input}"`);
      console.log(`    Expected: ${f.testCase.expectedIntent} → ${f.testCase.expectedTargetUrl}`);
      console.log(`    Got:      ${f.actualIntent} → ${f.actualTargetUrl}`);
      console.log(`    Confidence: ${f.confidence}\n`);
    });
  }

  return results;
}

testModel().catch(console.error);
```

### Steg 2: Hitta Patterns i Misslyckade Testfall

Analysera misslyckade testfall för att hitta:
- **Saknade keywords** - Ord som borde matcha men inte gör det
- **Felaktiga matches** - Ord som matchar fel intent
- **Låg confidence** - Svar med låg säkerhet

---

## 3. Förbättra Modellen Baserat på Testdata

### Steg 1: Identifiera Saknade Keywords

Från testdata kan du se vilka ord som saknas:

**Exempel:**
- Testfall: "visa dina projekt" → Förväntat: `/case`
- Nuvarande: Matchar inte
- **Lösning:** Lägg till `'visa'` och `'projekt'` i case studies intent

### Steg 2: Uppdatera `llmClient.ts`

Lägg till nya keywords baserat på testdata:

```typescript
// I llmClient.ts - USER GOAL 4 (Case studies)
if (lowerInput.includes('case') || 
    lowerInput.includes('visa') ||        // ← NYTT från testdata
    lowerInput.includes('projekt') ||     // ← NYTT från testdata
    lowerInput.includes('show me')) {
  return { intent: 'find_information', confidence: 0.85 };
}
```

### Steg 3: Prioritera Keywords

Ordna keywords efter frekvens i testdata:
- **Högsta prioritet:** Ord som förekommer ofta i testdata
- **Lägre prioritet:** Mindre vanliga ord

---

## 4. Automatiserad Förbättring

### Script för Keyword Extraction

Skapa ett script som extraherar vanliga ord från misslyckade testfall:

**`apps/ai-navigation-api/scripts/extract-keywords.ts`:**

```typescript
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

interface FailedCase {
  input: string;
  expectedUrl: string;
  actualUrl?: string;
}

function extractKeywords(failedCases: FailedCase[]) {
  // Gruppera efter expectedUrl
  const byExpectedUrl: Record<string, string[]> = {};

  failedCases.forEach(fc => {
    if (!byExpectedUrl[fc.expectedUrl]) {
      byExpectedUrl[fc.expectedUrl] = [];
    }
    byExpectedUrl[fc.expectedUrl].push(fc.input);
  });

  // Extrahera vanliga ord för varje URL
  const suggestions: Record<string, string[]> = {};

  Object.entries(byExpectedUrl).forEach(([url, inputs]) => {
    const words = new Map<string, number>();

    inputs.forEach(input => {
      const tokens = input.toLowerCase().split(/\s+/);
      tokens.forEach(token => {
        // Filtrera bort vanliga ord (stop words)
        const stopWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by'];
        if (token.length > 2 && !stopWords.includes(token)) {
          words.set(token, (words.get(token) || 0) + 1);
        }
      });
    });

    // Sortera efter frekvens
    const sorted = Array.from(words.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10) // Top 10
      .map(([word]) => word);

    suggestions[url] = sorted;
  });

  return suggestions;
}

// Användning
const testData = JSON.parse(
  readFileSync(join(__dirname, '../test-data/test-cases.json'), 'utf-8')
);

const failedCases = testData.testCases.filter((tc: any) => !tc.passed);
const suggestions = extractKeywords(failedCases);

console.log('💡 Keyword suggestions based on test data:\n');
Object.entries(suggestions).forEach(([url, keywords]) => {
  console.log(`${url}:`);
  console.log(`  ${keywords.map(k => `'${k}'`).join(', ')}\n`);
});

// Spara till fil
writeFileSync(
  join(__dirname, '../test-data/keyword-suggestions.json'),
  JSON.stringify(suggestions, null, 2)
);
```

---

## 5. Testa Förbättringar

### Regression Testing

Efter varje ändring, kör alla testfall igen:

```bash
# Kör testscript
npx tsx apps/ai-navigation-api/scripts/test-model.ts
```

### Mät Förbättringar

Spara resultat för varje iteration:

```json
{
  "iteration": "v1.0",
  "date": "2024-01-15",
  "totalTests": 50,
  "passed": 45,
  "failed": 5,
  "successRate": 0.90
}
```

---

## 6. Förbered för Riktig ML-modell (Framtida)

### Exportera Data för Träning

När du har tillräckligt med testdata, exportera det för ML-träning:

**`apps/ai-navigation-api/scripts/export-training-data.ts`:**

```typescript
interface TrainingExample {
  input: string;
  intent: string;
  targetUrl: string;
  context?: {
    currentUrl?: string;
    device?: string;
    language?: string;
  };
}

function exportForML(testCases: TestCase[]): TrainingExample[] {
  return testCases.map(tc => ({
    input: tc.input,
    intent: tc.expectedIntent,
    targetUrl: tc.expectedTargetUrl,
    context: {
      language: 'en',
      device: 'desktop',
    },
  }));
}

// Exportera till JSONL-format (för ML-träning)
const trainingData = exportForML(testData.testCases);
const jsonl = trainingData.map(ex => JSON.stringify(ex)).join('\n');

writeFileSync(
  join(__dirname, '../training-data/training.jsonl'),
  jsonl
);
```

---

## 7. Praktiskt Arbetsflöde

### Daglig Utveckling

1. **Samla testdata** (från användare eller manuellt)
2. **Kör testfall** → Se vilka som misslyckas
3. **Analysera misslyckanden** → Hitta saknade keywords
4. **Uppdatera `llmClient.ts`** → Lägg till nya keywords
5. **Testa igen** → Verifiera förbättringar
6. **Iterera**

### Veckovis Granskning

1. **Sammanfatta resultat** → Success rate över tid
2. **Identifiera trender** → Vilka typer av frågor misslyckas ofta?
3. **Planera förbättringar** → Prioritera viktigaste ändringarna

---

## 8. Exempel: Förbättra Case Studies Matching

### Problem från Testdata

```
Testfall: "show me your work"
Expected: /#/case
Got: /#/services
Confidence: 0.8
```

### Analys

Ordet "work" matchar services istället för cases.

### Lösning

1. **Lägg till mer specifika keywords för cases:**
```typescript
// I llmClient.ts - USER GOAL 4
if (lowerInput.includes('case') || 
    lowerInput.includes('work') ||        // ← Flytta hit från services
    lowerInput.includes('projects') ||
    lowerInput.includes('portfolio')) {
  return { intent: 'find_information', confidence: 0.85 };
}
```

2. **Gör services-matching mer specifik:**
```typescript
// I llmClient.ts - USER GOAL 2
// Ta bort 'work' från services, lägg till mer specifika ord
if (lowerInput.includes('what do you offer') ||
    lowerInput.includes('services') ||
    lowerInput.includes('capabilities') ||
    // Ta bort: lowerInput.includes('work') ||
    lowerInput.includes('what can you help')) {
  return { intent: 'find_information', confidence: 0.85 };
}
```

3. **Testa igen:**
```bash
npx tsx apps/ai-navigation-api/scripts/test-model.ts
```

---

## 9. Verktyg och Scripts

### Rekommenderade Scripts

1. **`test-model.ts`** - Kör alla testfall och rapporterar resultat
2. **`extract-keywords.ts`** - Extraherar keywords från misslyckade testfall
3. **`export-training-data.ts`** - Exporterar data för ML-träning
4. **`analyze-coverage.ts`** - Analyserar keyword coverage

### Mätvärden att Spåra

- **Success rate** - Andel testfall som passerar
- **Confidence distribution** - Fördelning av confidence-värden
- **Intent accuracy** - Korrekt intent-identifiering
- **URL accuracy** - Korrekt URL-matchning

---

## 10. Nästa Steg: Riktig ML-modell

När du har tillräckligt med testdata (100+ exempel), kan du:

1. **Finetuna en LLM** (OpenAI, Anthropic)
2. **Träna en klassificeringsmodell** (scikit-learn, TensorFlow)
3. **Använda embeddings** (OpenAI embeddings för similarity search)

Men för nu: **Fortsätt förbättra keyword matching med testdata!**

---

## Snabbreferens

```bash
# 1. Samla testdata
# Skapa test-data/test-cases.json

# 2. Kör tester
npx tsx apps/ai-navigation-api/scripts/test-model.ts

# 3. Analysera resultat
npx tsx apps/ai-navigation-api/scripts/extract-keywords.ts

# 4. Uppdatera llmClient.ts med nya keywords

# 5. Testa igen
npx tsx apps/ai-navigation-api/scripts/test-model.ts
```

---

## Tips

- **Starta smått:** Börja med 10-20 testfall
- **Iterera snabbt:** Gör små ändringar och testa ofta
- **Dokumentera:** Spara varje iteration och dess resultat
- **Prioritera:** Fokusera på de vanligaste frågorna först
- **Automatisera:** Använd scripts för att spara tid

