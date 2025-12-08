# SEO & Prestanda-analys - Carl Wahlen Portfolio

## 📊 ÖVERSIKT

Denna analys granskar webbsidans SEO, prestanda, teknisk SEO och ranking-potential. Analysen baseras på kodgranskning av alla sidor, komponenter och konfigurationsfiler.

---

## 🎯 1. PRESTANDA (Performance)

### ✅ Styrkor
- **Lazy loading**: Bilder använder `loading="lazy"` (utom hero-bilder som använder `loading="eager"`)
- **GPU-acceleration**: Carousel använder `translate3d()` och `will-change-transform`
- **Smooth transitions**: 700ms transitions med `cubic-bezier(0.4, 0, 0.2, 1)`
- **Backface visibility**: `backfaceVisibility: 'hidden'` för att förhindra flickering
- **CSS optimeringar**: Global lazy loading för bilder i `index.css`
- **Preload**: Kritiska resurser preloadas i `index.html`

### ⚠️ Förbättringsområden

#### KRITISKT - INP (Interaction to Next Paint)
**Nuvarande värde: 288ms** (över "good" tröskel på 200ms)

**Problem:**
1. **CaseCarousel** har många event handlers och state updates
2. **Resize listeners** körs för ofta utan debouncing
3. **Auto-play interval** kan påverka INP vid interaktioner
4. **Touch handlers** kan blockera main thread

**Lösningar:**
- Debounce resize listeners (max 1 gång per 100ms)
- Använd `requestAnimationFrame` för layout-beräkningar
- Flytta tunga beräkningar till Web Workers eller memoize
- Använd `passive: true` för touch event listeners
- Optimera carousel state updates med `useMemo` och `useCallback`

#### LCP (Largest Contentful Paint)
**Potentiella problem:**
- Hero-bilder laddas inte med `fetchpriority="high"`
- Inga width/height attribut på alla bilder (kan orsaka layout shift)
- SVG-patterns i bakgrunden kan påverka rendering

**Lösningar:**
- Lägg till `fetchpriority="high"` på hero-bilder
- Lägg till width/height på alla bilder för att förhindra CLS
- Överväg att använda CSS background patterns istället för inline SVG

#### CLS (Cumulative Layout Shift)
**Potentiella problem:**
- Carousel cards har dynamisk höjd baserat på viewport
- Bilder utan width/height attribut
- Font loading kan orsaka layout shift

**Lösningar:**
- Använd `aspect-ratio` CSS property
- Lägg till width/height på alla bilder
- Preload kritiska fonts

---

## 🔍 2. SEO (Search Engine Optimization)

### ✅ Styrkor
- **Helmet** används konsekvent för meta tags
- **Structured Data (JSON-LD)** finns på Home och About
- **Canonical URLs** finns på alla sidor
- **Open Graph** och **Twitter Cards** implementerade
- **Semantisk HTML** med `<main>`, `<section>`, `<article>`
- **Alt-text** på bilder (men kan förbättras)

### ⚠️ Förbättringsområden

#### ✅ FIXAT - Meta Description
**Status:**
- ✅ Contact-sidan har nu korrekt title: "Contact - Carl Wahlen"
- ✅ Contact-sidan refererar nu till "carlwahlen.com" (alla "payment.se" referenser fixade)
- ✅ Contact-sidan har förbättrad meta description och ContactPage schema
- ⚠️ Vissa andra descriptions kan fortfarande vara för generiska

**Återstående förbättringar:**
- Gör descriptions mer specifika och action-oriented på andra sidor

#### ✅ FIXAT - H1 Struktur
**Status:**
- ✅ Home-sidan har nu korrekt H1-struktur (huvudrubriken är nu en riktig H1)
- ✅ Badge-texten är nu en `<div>` istället för H1
- ✅ Varje sida har nu exakt en H1

#### Keywords Meta Tag
**Problem:**
- Keywords meta tag används fortfarande (Google ignorerar detta sedan 2009)
- Tar upp onödig plats i HTML

**Lösningar:**
- Ta bort keywords meta tags (eller behåll för legacy men förvänta dig ingen SEO-effekt)

#### Alt-text Kvalitet
**Problem:**
- Många bilder har generiska alt-texts som "Carl Wahlén Logo"
- Alt-texts beskriver inte innehållet eller kontexten

**Lösningar:**
- Förbättra alt-texts: "Carl Wahlen, product strategy consultant in Stockholm, Sweden"
- Beskriv vad bilden visar i kontexten
- Använd deskriptiva alt-texts för case study bilder

---

## 🛠️ 3. TEKNISK SEO

### ✅ Styrkor
- **Robots.txt** finns och är korrekt konfigurerad
- **Sitemap.xml** finns och innehåller alla viktiga sidor
- **Canonical URLs** på alla sidor
- **HashRouter** används (fungerar för SEO med rätt konfiguration)
- **Structured Data** implementerat

### ⚠️ Förbättringsområden

#### ✅ FIXAT - Sitemap.xml
**Status:**
- ✅ Dynamisk sitemap generation skapad (`scripts/generate-sitemap.ts`)
- ✅ Alla case pages läggs till automatiskt baserat på cases array
- ✅ `lastmod` uppdateras automatiskt till dagens datum
- ✅ Script kan köras med `pnpm generate-sitemap` eller `npx tsx scripts/generate-sitemap.ts`

**Implementation:**
- Script läser från `src/data/cases.ts` och genererar sitemap dynamiskt
- Inkluderar alla statiska sidor och case pages automatiskt
- `lastmod` sätts till dagens datum vid varje körning

#### HashRouter SEO
**Problem:**
- HashRouter (`/#/`) kan vara svårare för Google att crawla än vanliga routes
- Google stödjer hash routing men det är inte optimalt

**Lösningar:**
- Överväg att byta till BrowserRouter när du har egen domän
- Eller implementera server-side rendering (SSR) med Next.js
- För nu: Se till att alla länkar är klickbara och inte bara hash-baserade

#### Robots.txt
**Problem:**
- Sitemap URL pekar på `https://carlwahlen.com/sitemap.xml` men sidan använder hash routing

**Lösningar:**
- Uppdatera sitemap URL om den ska vara tillgänglig via hash routing
- Eller se till att sitemap är tillgänglig på root-nivå

#### Structured Data
**Problem:**
- Structured data finns bara på Home och About
- Case pages saknar structured data (Article eller Project schema)
- Services page saknar Service schema

**Lösningar:**
- Lägg till `Article` eller `Project` schema på case pages
- Lägg till `Service` schema på Services page
- Lägg till `ContactPage` schema på Contact page
- Lägg till `BreadcrumbList` schema (finns redan via Breadcrumbs komponent?)

---

## 📈 4. RANKING-POTENTIAL PER SIDA

### 🏠 Home Page (`/`)
**Potentiella ranking-ord:**
- ✅ "product strategy consultant Sweden"
- ✅ "product strategy consultant Stockholm"
- ✅ "data-driven products Sweden"
- ✅ "UX design consultant Nordic"
- ✅ "business development consultant Stockholm"
- ✅ "technology strategy Sweden"

**Ranking-potential: 7/10**
- **Styrkor:** Bra meta description, structured data, relevanta keywords
- **Svagheter:** H1-struktur, kan ha mer innehåll (minst 300 ord rekommenderas)

**Förbättringar:**
- Lägg till mer innehåll (minst 300-500 ord)
- Förbättra H1-struktur
- Lägg till FAQ-sektion med long-tail keywords

### 👤 About Page (`/about`)
**Potentiella ranking-ord:**
- ✅ "product strategist Stockholm"
- ✅ "UX designer Sweden"
- ✅ "technical product strategist Nordic"
- ✅ "MVP development consultant Sweden"
- ✅ "product strategy consultant Stockholm"

**Ranking-potential: 8/10**
- **Styrkor:** Bra innehåll, structured data (Person schema), detaljerad beskrivning
- **Svagheter:** Kan optimeras med mer long-tail keywords

**Förbättringar:**
- Lägg till mer specifika kompetenser i texten
- Använd mer lokala keywords (Stockholm, Sweden, Nordic)
- Lägg till mer information om erfarenhet och projekt

### 🛠️ Services Page (`/services`)
**Potentiella ranking-ord:**
- ✅ "product strategy consulting Sweden"
- ✅ "UX design services Stockholm"
- ✅ "business development consulting Nordic"
- ✅ "technology strategy consulting Sweden"
- ✅ "MVP development services Stockholm"
- ✅ "data-driven product development Sweden"

**Ranking-potential: 6/10**
- **Styrkor:** Bra struktur, tydliga service-beskrivningar
- **Svagheter:** Saknar Service schema, kan ha mer innehåll per service

**Förbättringar:**
- Lägg till Service schema för varje tjänst
- Utöka varje service-beskrivning (minst 200 ord per service)
- Lägg till FAQ-sektion med service-relaterade frågor
- Lägg till case study länkar för varje service

### 📁 Case Studies (`/case`)
**Potentiella ranking-ord:**
- ✅ "product strategy case studies Sweden"
- ✅ "UX design case studies Stockholm"
- ✅ "PropTech case study Nordic"
- ✅ "fintech case study Sweden"
- ✅ "AI navigation case study"

**Ranking-potential: 7/10**
- **Styrkor:** Bra struktur, filter-funktionalitet
- **Svagheter:** Kan ha mer innehåll på övergripande case page

**Förbättringar:**
- Lägg till mer introduktionstext (minst 200 ord)
- Lägg till kategorier i meta description
- Lägg till Project schema för case collection

### 🤖 AI Navigation Case (`/case/ai-navigation`)
**Potentiella ranking-ord:**
- ✅ "AI navigation engine"
- ✅ "intelligent website navigation"
- ✅ "LLM navigation system"
- ✅ "AI assistant for websites"
- ✅ "intent detection navigation"
- ✅ "self-hosted AI navigation"

**Ranking-potential: 8/10**
- **Styrkor:** Unikt koncept, bra innehåll, relevanta keywords
- **Svagheter:** Kan ha mer tekniska detaljer (om du vill ranka på tekniska termer)

**Förbättringar:**
- Lägg till Article eller Project schema
- Lägg till mer tekniska keywords om relevant
- Lägg till FAQ-sektion om AI navigation

### 🏢 Hellman & Partners Case (`/case/hellman-partners`)
**Potentiella ranking-ord:**
- ✅ "PropTech case study Sweden"
- ✅ "real estate data platform"
- ✅ "PropTech startup Stockholm"
- ✅ "business development PropTech"
- ✅ "platform designer PropTech"

**Ranking-potential: 7/10**
- **Styrkor:** Bra innehåll, relevanta PropTech keywords
- **Svagheter:** Kan ha mer information om resultat och mätbara outcomes

**Förbättringar:**
- Lägg till Article schema
- Lägg till mer information om resultat (om tillgängligt)
- Lägg till mer PropTech-specifika keywords

### 📞 Contact Page (`/contact`)
**Potentiella ranking-ord:**
- ✅ "contact product strategist Sweden"
- ✅ "product strategy consultation Stockholm"
- ✅ "contact carl wahlen Sweden"
- ✅ "UX design consultant contact Nordic"

**Ranking-potential: 7/10** (uppgraderad från 3/10 efter fixar)
- **Styrkor:** Bra struktur, tydlig CTA, korrekt meta data, ContactPage schema implementerat
- **Svagheter:** Kan ha mer information om vad man kan kontakta för

**Förbättringar:**
- ✅ **FIXAT:** Title är nu "Contact - Carl Wahlen"
- ✅ **FIXAT:** Alla "payment.se" referenser ändrade till "carlwahlen.com"
- ✅ **FIXAT:** ContactPage schema implementerat
- Lägg till mer information om vad man kan kontakta för

---

## 🏆 5. KONKURRENSANALYS

### Jämförelse med Konkurrenter

**Fördelar:**
1. ✅ **Modern tech stack** (React, TypeScript, Vite) - snabbare än många WordPress-sites
2. ✅ **Structured Data** - många konkurrenter saknar detta
3. ✅ **Mobile-first design** - viktigt för Google's mobile-first indexing
4. ✅ **Unika case studies** - AI Navigation är unikt och kan ranka på nischade termer
5. ✅ **Lokal fokus** - Stockholm/Sweden/Nordic keywords är mindre konkurrensutsatta

**Nackdelar:**
1. ⚠️ **Hash routing** - kan vara svårare för Google att crawla än vanliga routes
2. ⚠️ **Begränsat innehåll** - många sidor har <300 ord (Google föredrar 300+ ord)
3. ⚠️ **Ingen blog** - saknar kontinuerligt nytt innehåll (viktigt för SEO)
4. ⚠️ **Inga externa länkar** - saknar backlinks och authority signals
5. ⚠️ **Ingen lokal SEO** - saknar Google Business Profile integration

**Ranking-potential vs Konkurrenter: 6.5/10**

**För att konkurrera bättre:**
1. Lägg till blog med regelbundet innehåll om product strategy, UX, etc.
2. Bygg backlinks genom guest posts, partnerships, etc.
3. Lägg till testimonials med länkar till kunders webbplatser
4. Skapa mer innehållsrika sidor (300+ ord per sida)
5. Överväg lokal SEO-strategi (Google Business Profile, lokala directories)

---

## 🎯 6. PRIORITERADE ÅTGÄRDER

### 🔴 KRITISKT (Gör omedelbart)
1. ✅ **FIXAT: Contact page** - Title och meta data är nu korrekta
2. **Förbättra INP** - 288ms är för högt, optimera carousel
3. ✅ **FIXAT: Sitemap** - Dynamisk generation implementerad, alla case pages inkluderade automatiskt, lastmod uppdateras automatiskt
4. ✅ **FIXAT: H1-struktur** på Home page

### 🟡 VIKTIGT (Gör inom 1 vecka)
1. **Lägg till Structured Data** på alla case pages
2. **Förbättra alt-texts** på bilder
3. **Lägg till width/height** på alla bilder
4. **Optimera bildladdning** med fetchpriority

### 🟢 REKOMMENDERAT (Gör inom 1 månad)
1. **Skapa blog** med regelbundet innehåll
2. **Utöka innehåll** på alla sidor (300+ ord)
3. **Lägg till FAQ-sektioner** med long-tail keywords
4. **Skapa Service schema** för varje tjänst
5. **Bygg backlinks** genom partnerships och guest posts

---

## 📊 7. MÄTBARA MÅL

### Kortsiktigt (3 månader)
- INP < 200ms (nuvarande: 288ms)
- LCP < 2.5s
- CLS < 0.1
- Alla sidor indexerade i Google
- 10+ ranking keywords i top 100

### Långsiktigt (6-12 månader)
- 50+ ranking keywords i top 50
- 10+ ranking keywords i top 10
- 1000+ månadsvisa organiska besök
- Blog med 20+ artiklar
- 10+ kvalitativa backlinks

---

## 🔧 8. TEKNISKA REKOMMENDATIONER

### Prestanda
- Implementera code splitting för case pages
- Använd React.lazy() för att lazy-loada case pages
- Optimera bilder med WebP format
- Implementera service worker för caching

### SEO
- Skapa dynamisk sitemap generation
- Implementera BreadcrumbList schema
- Lägg till hreflang tags om du planerar flera språk
- Skapa 404-sida med länkar till viktiga sidor

### Teknisk SEO
- Implementera robots meta tags per sida om nödvändigt
- Lägg till Open Graph images för alla sidor
- Skapa XML sitemap index om du får många sidor
- Implementera canonical tags dynamiskt

---

## 📝 SLUTSATS

Webbsidan har en **solid grund** med modern tech stack, structured data och bra struktur. **Kritiska SEO-problem har fixats** (Contact page, H1-struktur, sitemap). Huvudsakliga återstående förbättringsområden är:

1. **Prestanda** - INP behöver optimeras (288ms → <200ms)
2. **SEO-innehåll** - Fler sidor behöver mer innehåll (300+ ord)
3. **Teknisk SEO** - Structured data behöver kompletteras på case pages
4. **Content marketing** - Blog och regelbundet nytt innehåll saknas

Med dessa förbättringar kan sidan konkurrera väl i nischade keywords som "product strategy consultant Stockholm" och "UX designer Sweden", men kommer ha svårare att konkurrera på breda termer som "product strategy" eller "UX design" utan mer innehåll och backlinks.

**Total bedömning: 7.5/10** (uppgraderad från 7/10) - Bra grund med kritiska SEO-problem fixade, men behöver ytterligare förbättringar för att maximera ranking-potential.

