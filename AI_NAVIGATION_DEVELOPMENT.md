# AI Navigation - Utvecklingsguide

Denna guide förklarar hur du justerar parametrarna för AI-navigeringen på din portfolio.

## Översikt: Tre huvudfiler

AI-navigeringen styrs av tre huvudfiler:

1. **`apps/ai-navigation-api/src/infra/llmClient.ts`** - Identifierar användarens avsikt (intent)
2. **`apps/ai-navigation-api/src/infra/flowRepository.ts`** - Definierar vilka sidor/flöden som finns
3. **`packages/navigation-core/src/navigate.ts`** - Matchar intent med rätt flöde (keyword matching)

---

## 1. Lägga till nya nyckelord för intent-detection

**Fil:** `apps/ai-navigation-api/src/infra/llmClient.ts`

### Vad gör denna fil?
Den analyserar användarens input och bestämmer vad de vill göra (t.ex. "kontakta", "se case studies", etc.).

### Hur lägger du till nya nyckelord?

Lägg till nya nyckelord i `detectIntent()`-funktionen. Varje intent-block har en prioritet:

```typescript
// Exempel: Lägg till fler synonymer för "contact"
if (lowerInput.includes('contact') || 
    lowerInput.includes('reach out') || 
    lowerInput.includes('get in touch') || 
    lowerInput.includes('hire') ||
    lowerInput.includes('kontakta') ||        // ← NYTT
    lowerInput.includes('prata med') ||       // ← NYTT
    lowerInput.includes('ringa')) {          // ← NYTT
  return { intent: 'contact_support', confidence: 0.9 };
}
```

### Tips:
- **Prioritering**: Ju högre upp i koden, desto högre prioritet
- **Confidence**: Justera `confidence` (0.0-1.0) för att indikera säkerhet
- **Synonymer**: Lägg till både engelska och svenska synonymer

### Exempel: Lägg till support för "priser" eller "pris"

```typescript
// Lägg till efter "Services intent" (rad ~70)
// Pricing intent
if (lowerInput.includes('pris') || lowerInput.includes('price') ||
    lowerInput.includes('kostnad') || lowerInput.includes('cost') ||
    lowerInput.includes('hur mycket') || lowerInput.includes('how much')) {
  return { intent: 'find_information', confidence: 0.8 };
}
```

**OBS:** Om du lägger till ett nytt intent (inte bara nyckelord), måste du också:
1. Lägga till flödet i `flowRepository.ts` (se avsnitt 2)
2. Uppdatera keyword matching i `navigate.ts` (se avsnitt 3)

---

## 2. Lägga till nya sidor/flöden

**Fil:** `apps/ai-navigation-api/src/infra/flowRepository.ts`

### Vad gör denna fil?
Den definierar alla navigationsflöden (vilka sidor som finns och hur man når dem).

### Hur lägger du till en ny sida?

Lägg till ett nytt objekt i `seedFlows`-arrayen:

```typescript
// Exempel: Lägg till en "Blog" sida
{
  id: 'flow-blog',                    // ← Unikt ID (används internt)
  name: 'View Blog',                  // ← Namn för admin/debugging
  description: 'Guide users to blog', // ← Beskrivning
  tenantId: 'demo-tax-agency',       // ← Tenant ID (samma för alla portfolio-sidor)
  intent: 'find_information',        // ← Intent (oftast 'find_information' eller 'contact_support')
  enabled: true,                      // ← Aktiverad eller inte
  steps: [
    {
      id: 'step-blog-1',              // ← Unikt steg-ID
      type: 'content',                // ← Typ: 'content', 'login', 'form', 'summary'
      title: 'Blog',                  // ← Titel som visas
      description: 'Read my blog posts', // ← Beskrivning
      required: true,                 // ← Måste användaren gå igenom detta steg?
      order: 1,                       // ← Ordning (1, 2, 3...)
      directUrl: '/#/blog',           // ← URL till sidan (använd /#/ för hash-routing)
    },
  ],
},
```

### Exempel: Lägg till en "Pricing" sida

```typescript
// Lägg till i seedFlows-arrayen (efter FAQ, rad ~232)
{
  id: 'flow-pricing',
  name: 'View Pricing',
  description: 'Guide users to pricing page',
  tenantId: 'demo-tax-agency',
  intent: 'find_information',
  enabled: true,
  steps: [
    {
      id: 'step-pricing-1',
      type: 'content',
      title: 'Pricing',
      description: 'View pricing information',
      required: true,
      order: 1,
      directUrl: '/#/pricing',
    },
  ],
},
```

### Tips:
- **directUrl**: Använd `/` för startsidan, `/#/sida` för andra sidor
- **intent**: Använd `'contact_support'` för kontakt-sidor, `'find_information'` för övrigt
- **steps**: För enkla sidor behöver du bara ett steg. För komplexa flöden kan du ha flera steg

---

## 3. Förbättra keyword matching för specifika sidor

**Fil:** `packages/navigation-core/src/navigate.ts`

### Vad gör denna fil?
När flera flöden matchar samma intent, används keyword matching för att välja det mest specifika.

### Hur justerar du keyword matching?

I `findMatchingFlow()`-funktionen finns två ställen där du kan lägga till keywords:

#### A) Specifika case studies (rad ~187)

```typescript
const caseKeywords: Record<string, string[]> = {
  'flow-case-founder': ['founder', 'fintech'],
  'flow-case-style-scandinavia': ['style scandinavia', 'style-scandinavia'],
  // Lägg till nya case studies här:
  'flow-case-nytt-case': ['nyckelord1', 'nyckelord2', 'nyckelord3'],
};
```

#### B) Specifika sidor (rad ~202)

```typescript
// Exempel: Lägg till matching för "Pricing" sida
if (lowerInput.includes('pris') || lowerInput.includes('price') ||
    lowerInput.includes('kostnad') || lowerInput.includes('pricing')) {
  const pricingFlow = candidateFlows.find(f => f.id === 'flow-pricing');
  if (pricingFlow) return pricingFlow;
}
```

### Tips:
- **Prioritering**: Specifika case studies matchas först, sedan generella sidor
- **Keywords**: Lägg till både engelska och svenska synonymer
- **Fallback**: Om inget matchar, returneras det första kandidatflödet

---

## 4. Praktiskt exempel: Lägg till en "Blog" sida

### Steg 1: Lägg till intent detection i `llmClient.ts`

```typescript
// Efter "Services intent" (rad ~70)
// Blog intent
if (lowerInput.includes('blog') || lowerInput.includes('artiklar') ||
    lowerInput.includes('posts') || lowerInput.includes('inlägg') ||
    lowerInput.includes('read') || lowerInput.includes('läsa')) {
  return { intent: 'find_information', confidence: 0.8 };
}
```

### Steg 2: Lägg till flödet i `flowRepository.ts`

```typescript
// Lägg till i seedFlows-arrayen (efter FAQ)
{
  id: 'flow-blog',
  name: 'View Blog',
  description: 'Guide users to blog page',
  tenantId: 'demo-tax-agency',
  intent: 'find_information',
  enabled: true,
  steps: [
    {
      id: 'step-blog-1',
      type: 'content',
      title: 'Blog',
      description: 'Read my latest blog posts',
      required: true,
      order: 1,
      directUrl: '/#/blog',
    },
  ],
},
```

### Steg 3: Lägg till keyword matching i `navigate.ts`

```typescript
// Efter "Services" matching (rad ~221)
if (lowerInput.includes('blog') || lowerInput.includes('artiklar') ||
    lowerInput.includes('posts') || lowerInput.includes('inlägg')) {
  const blogFlow = candidateFlows.find(f => f.id === 'flow-blog');
  if (blogFlow) return blogFlow;
}
```

### Steg 4: Testa!

1. Starta API-servern: `npx pnpm dev:ai-api`
2. Testa i widget: "visa bloggen" eller "show me your blog"
3. Kontrollera att du navigeras till rätt sida

---

## 5. Felsökning

### Problem: AI navigerar inte till rätt sida

**Kontrollera:**
1. ✅ Är nyckelorden korrekt stavade i `llmClient.ts`?
2. ✅ Finns flödet i `flowRepository.ts` med rätt `id`?
3. ✅ Matchar `directUrl` den faktiska sidan i din portfolio?
4. ✅ Är flödet `enabled: true`?
5. ✅ Finns keyword matching i `navigate.ts`?

### Problem: AI förstår inte användarens input

**Lösning:**
- Lägg till fler synonymer i `llmClient.ts`
- Öka `confidence` för mer specifika intents
- Lägg till både engelska och svenska nyckelord

### Problem: Flera sidor matchar samma input

**Lösning:**
- Justera prioritet i `llmClient.ts` (högre upp = högre prioritet)
- Lägg till mer specifika keywords i `navigate.ts`
- Använd `caseKeywords` för att prioritera specifika case studies

---

## 6. Best Practices

### ✅ Gör:
- Använd både engelska och svenska nyckelord
- Testa med olika formuleringar ("visa", "show me", "jag vill se", etc.)
- Håll keywords korta och relevanta
- Uppdatera alla tre filerna när du lägger till en ny sida

### ❌ Undvik:
- För långa eller komplexa nyckelord
- Att glömma att uppdatera `navigate.ts` när du lägger till nya flöden
- Att använda samma `id` för flera flöden
- Att glömma att sätta `enabled: true`

---

## 7. Snabbreferens: Filstruktur

```
apps/ai-navigation-api/src/infra/
├── llmClient.ts          ← Intent detection (vad vill användaren?)
└── flowRepository.ts     ← Flödesdefinitioner (vilka sidor finns?)

packages/navigation-core/src/
└── navigate.ts           ← Flow matching (vilket flöde passar bäst?)
```

---

## 8. Nästa steg: Integrera riktig LLM

För närvarande använder systemet en stub-implementation med keyword matching. För att integrera en riktig LLM (t.ex. OpenAI, Anthropic):

1. Ersätt `StubLLMClient` i `llmClient.ts` med en riktig implementation
2. Lägg till API-nyckel i `.env`: `OPENAI_API_KEY=...`
3. Uppdatera `detectIntent()` och `generateResponse()` för att anropa LLM API

**Exempel:**
```typescript
// Ersätt StubLLMClient med:
class OpenAILLMClient implements ILLMClient {
  async detectIntent(input: string, context: {...}): Promise<{...}> {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are a navigation assistant...' },
        { role: 'user', content: input },
      ],
    });
    // Parse response...
  }
}
```

---

## Hjälp behövs?

Om något inte fungerar:
1. Kontrollera att API-servern körs: `http://localhost:3010/health`
2. Kontrollera konsolen för felmeddelanden
3. Testa med enkla nyckelord först ("contact", "home", etc.)
4. Verifiera att `directUrl` matchar din faktiska routing
