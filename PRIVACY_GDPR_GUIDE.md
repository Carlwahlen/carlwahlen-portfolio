# 🔒 GDPR & Cookie Compliance Guide

## 📋 ÖVERSIKT

**Kort svar:** Ja, du kan bygga en egen lösning, MEN du måste följa GDPR och PUL (Personuppgiftslagen) i Sverige.

## ⚖️ JURIDISK BAS

### GDPR i Sverige (PUL)
- **Necessary cookies** = Inga samtycke behövs (sessionshantering, säkerhet)
- **Analytics cookies** = Samtycke krävs (Google Analytics, Clarity)
- **Marketing cookies** = Samtycke krävs (Facebook Pixel, retargeting)

### Vad krävs?
1. ✅ Cookie-banner före tracking
2. ✅ Tydlig information om vad som samlas in
3. ✅ Möjlighet att välja bort
4. ✅ Privacy policy (Integritetspolicy)
5. ✅ Spara samtycke-beslut

## 🛠️ BYGGA SJÄLV VS TREDJEPART

### **Fördelar med egen lösning:**
- ✅ Full kontroll
- ✅ Ingen tredjepartsdata
- ✅ Kostnadsfri
- ✅ Anpassningsbar design
- ✅ GDPR-kompatibel från start

### **Nackdelar:**
- ⚠️ Du ansvarar för implementation
- ⚠️ Måste uppdateras vid lagändringar
- ⚠️ Testning och underhåll

### **Rekommendation:**
**Bygg själv för enkel analytics**, använd tredjepart för avancerade features (heatmaps, recordings).

## 📊 DATA DU KAN SAMLA IN

### **Utan samtycke (Necessary):**
- Page views (server-side)
- Form submissions (om du lagrar lokal)
- Error logging (server-side)
- Basic navigation (session storage)

### **Med samtycke (Analytics):**
- Google Analytics 4
- Microsoft Clarity (heatmaps)
- Click tracking
- Scroll depth
- Time on page
- Device/browser info
- User journey

### **Känslig data (Kräver EXTRA skydd):**
- IP-adresser (pseudonymisera)
- Email-adresser
- Personuppgifter (via formulär)

## 🚀 IMPLEMENTATION STRATEGI

### **Steg 1: Cookie Consent Banner**
Bygg en komponent som:
- Visas vid första besök
- Sparar val i localStorage
- Blockar tracking tills samtycke
- Låter användare ändra senare

### **Steg 2: Privacy-First Analytics**
- Samla anonymiserad data
- Använd server-side analytics när möjligt
- Pseudonymisera IP-adresser
- Ta bort data efter 26 månader (GDPR krav)

### **Steg 3: Privacy Policy**
Skriv en integritetspolicy som förklarar:
- Vilken data som samlas
- Varför (legitimt intresse)
- Hur länge data sparas
- Användarens rättigheter

## 💻 TEKNISK IMPLEMENTATION

### **Egen Cookie Consent System:**
```typescript
// 1. Cookie consent komponent
// 2. localStorage för att spara val
// 3. Conditional tracking loading
// 4. Privacy policy sida
```

### **Server-Side Analytics (Rekommenderas):**
- **Plausible Analytics** - GDPR-friendly, no cookies
- **PostHog** - Open source, self-hosted option
- **Umami** - Minimalist, open source

### **Hybrid Approach (Bästa):**
1. Server-side för basic stats (no cookies)
2. Client-side för avancerad tracking (med consent)
3. First-party data (ditt eget system)

## 📈 REKOMMENDERADE TOOLS

### **Gratis & GDPR-Friendly:**
1. **Plausible Analytics** - €9/månad, no cookies, server-side
2. **Microsoft Clarity** - Gratis, behöver cookie consent
3. **PostHog** - Open source, kan self-hosta
4. **Umami** - Open source, minimal

### **Sverige-specifikt:**
- Integritetsskyddsmyndigheten (IMY) har guider
- Konsult med jurist för komplexa fall

## ✅ CHECKLISTA

### **Måste ha:**
- [ ] Cookie consent banner
- [ ] Privacy policy sida
- [ ] Samtycke-sparning (localStorage)
- [ ] Möjlighet att återkalla samtycke
- [ ] Anonymisering av IP-adresser

### **Bör ha:**
- [ ] Server-side analytics (no cookies)
- [ ] Cookie-inställningar sida
- [ ] Data retention policy
- [ ] Loggning av samtycke-beslut

## 🎯 MIN REKOMMENDATION

**För din portfolio-website:**

1. **Bygg egen cookie consent** - Enkel, kontrollerbar
2. **Använd Plausible eller Umami** - GDPR-friendly, minimal
3. **Microsoft Clarity med consent** - För heatmaps
4. **Egen event tracking** - För conversions (contact forms)

**Totalkostnad:** €9-19/månad eller gratis (om du self-hostar Umami)

## 📚 RESURSER

- [IMY - Integritetsskyddsmyndigheten](https://www.imy.se/)
- [GDPR.eu Guide](https://gdpr.eu/)
- [Cookiebot Guide](https://www.cookiebot.com/sv/gdpr-cookies/)

