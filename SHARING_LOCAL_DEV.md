# Sharing Your Local Development Site

## Quick Answer

**Ja, du kan dela din sida!** Det finns flera sätt:

1. **Samma WiFi** (enklast) - Om din kompis är på samma nätverk
2. **Tunneling** (fungerar överallt) - Använd ngrok eller Cloudflare Tunnel
3. **Temporär hosting** (bäst för längre tester) - Deploy till Vercel/Netlify

## Metod 1: Lokalt Nätverk (Samma WiFi) ⚡

### Steg 1: Hitta din lokala IP-adress

**Mac:**
```bash
ifconfig | grep "inet " | grep -v 127.0.0.1
```

Eller i Systeminställningar → Nätverk → Visa status → IP-adress

**Exempel:** `192.168.1.100`

### Steg 2: Konfigurera Vite för externa anslutningar

Uppdatera `vite.config.ts`:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    host: '0.0.0.0', // Tillåt externa anslutningar
    port: 5173,
  },
  build: {
    outDir: 'dist'
  }
})
```

### Steg 3: Starta servern

```bash
npm run dev
# eller
pnpm dev
```

### Steg 4: Dela länken

Ge din kompis denna länk:
```
http://192.168.1.100:5173
```

**OBS:** Byt ut `192.168.1.100` mot din faktiska IP-adress!

### Steg 5: AI Navigation API

AI Navigation API måste också vara tillgänglig. Uppdatera `apps/ai-navigation-api/src/index.ts`:

```typescript
app.listen(PORT, '0.0.0.0', () => {
  console.log(`AI Navigation API server running on http://0.0.0.0:${PORT}`);
});
```

Eller starta med:
```bash
HOST=0.0.0.0 npm run dev:ai-api
```

Dela också API-URL:en:
```
http://192.168.1.100:3010
```

**OBS:** Uppdatera `VITE_AI_NAVIGATION_API_URL` i frontend till din lokala IP!

## Metod 2: Tunneling (Fungerar Överallt) 🌐

### Alternativ A: ngrok (Enklast)

1. **Installera ngrok:**
```bash
# Mac
brew install ngrok

# Eller ladda ner från https://ngrok.com
```

2. **Starta din portfolio:**
```bash
npm run dev
```

3. **Skapa tunnel för portfolio:**
```bash
ngrok http 5173
```

4. **Skapa tunnel för AI API:**
```bash
# I ett nytt terminalfönster
ngrok http 3010
```

5. **Dela länkarna:**
- Portfolio: `https://abc123.ngrok.io` (från ngrok output)
- AI API: `https://xyz789.ngrok.io` (från ngrok output)

6. **Uppdatera frontend:**
Sätt `VITE_AI_NAVIGATION_API_URL` till ngrok-URL:en för AI API.

### Alternativ B: Cloudflare Tunnel (Gratis, Ingen Registrering)

1. **Installera cloudflared:**
```bash
# Mac
brew install cloudflared
```

2. **Starta tunnel för portfolio:**
```bash
cloudflared tunnel --url http://localhost:5173
```

3. **Starta tunnel för AI API:**
```bash
# I ett nytt terminalfönster
cloudflared tunnel --url http://localhost:3010
```

4. **Dela länkarna** som visas i terminalen.

## Metod 3: Temporär Hosting (Bäst för Längre Tester) 🚀

### Vercel (Rekommenderat)

1. **Installera Vercel CLI:**
```bash
npm i -g vercel
```

2. **Deploy portfolio:**
```bash
cd /path/to/your/project
vercel
```

3. **Deploy AI API:**
```bash
cd apps/ai-navigation-api
vercel
```

4. **Uppdatera environment variables:**
- I Vercel dashboard, lägg till `VITE_AI_NAVIGATION_API_URL` med AI API-URL:en

5. **Dela länken:**
Vercel ger dig en URL som `https://your-project.vercel.app`

### Netlify

1. **Installera Netlify CLI:**
```bash
npm i -g netlify-cli
```

2. **Deploy:**
```bash
netlify deploy --prod
```

## Rekommendation

**För snabb test:** Använd **Metod 1** (lokalt nätverk) om ni är på samma WiFi.

**För test över internet:** Använd **Metod 2** (ngrok eller Cloudflare Tunnel).

**För längre tester:** Använd **Metod 3** (Vercel/Netlify).

## Viktiga Punkter

⚠️ **Säkerhet:**
- Lokalt nätverk är relativt säkert
- Tunneling/hosting exponerar din sida publikt
- Använd bara för test, inte för produktion med känslig data

⚠️ **AI Navigation API:**
- Kom ihåg att både portfolio OCH AI API måste vara tillgängliga
- Uppdatera `VITE_AI_NAVIGATION_API_URL` i frontend

⚠️ **Firewall:**
- Mac kan blockera inkommande anslutningar
- Gå till Systeminställningar → Säkerhet → Brandvägg
- Tillåt Node.js/Vite om det frågas

## Troubleshooting

**"Connection refused":**
- Kontrollera att servern körs
- Kontrollera att porten är öppen
- Kontrollera firewall-inställningar

**"AI Navigation doesn't work":**
- Kontrollera att AI API är tillgänglig
- Kontrollera `VITE_AI_NAVIGATION_API_URL` i frontend
- Öppna browser console för felmeddelanden

**"Can't find IP address":**
- Kontrollera att du är på samma WiFi
- Prova `ipconfig getifaddr en0` (Mac) för WiFi IP

