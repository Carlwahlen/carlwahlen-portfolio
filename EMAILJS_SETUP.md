# 📧 EmailJS Setup Guide

Formuläret är nu konfigurerat för att skicka emails via EmailJS. Följ dessa steg för att aktivera det:

## Steg 1: Skapa EmailJS-konto

1. Gå till [https://www.emailjs.com/](https://www.emailjs.com/)
2. Skapa ett gratis konto (200 emails/månad)
3. Verifiera din email

## Steg 2: Skapa Email Service

1. Gå till **Email Services** i dashboard
2. Klicka **Add New Service**
3. Välj din email-provider (Gmail, Outlook, etc.)
4. Följ instruktionerna för att koppla ditt email-konto
5. **Kopiera Service ID** (t.ex. `service_abc123`)

## Steg 3: Skapa Email Template

1. Gå till **Email Templates** i dashboard
2. Klicka **Create New Template**
3. Använd följande template:

**Subject:**
```
New Contact Form Submission from {{from_name}}
```

**Content:**
```
You have received a new message from your website contact form.

From: {{from_name}}
Email: {{from_email}}
Company: {{company}}

Interests: {{interests}}

Message:
{{message}}

---
This email was sent from your website contact form.
```

4. **Kopiera Template ID** (t.ex. `template_xyz789`)

## Steg 4: Hämta Public Key

1. Gå till **Account** > **General**
2. Hitta **API Keys** sektionen
3. **Kopiera Public Key** (t.ex. `abcdefghijklmnop`)

## Steg 5: Konfigurera Environment Variables

1. Kopiera `.env.example` till `.env`:
   ```bash
   cp .env.example .env
   ```

2. Öppna `.env` och fyll i dina värden:
   ```env
   VITE_EMAILJS_SERVICE_ID=service_abc123
   VITE_EMAILJS_TEMPLATE_ID=template_xyz789
   VITE_EMAILJS_PUBLIC_KEY=abcdefghijklmnop
   ```

3. **Viktigt:** Starta om din dev server efter att ha lagt till `.env`:
   ```bash
   npm run dev
   ```

## Steg 6: Testa

1. Gå till `/contact` på din webbplats
2. Fyll i formuläret
3. Skicka
4. Kontrollera att du får ett email!

## Troubleshooting

### "EmailJS is not configured"
- Kontrollera att `.env` filen finns i root-mappen
- Kontrollera att variablerna börjar med `VITE_`
- Starta om dev servern

### "Failed to send message"
- Kontrollera att Service ID, Template ID och Public Key är korrekta
- Kontrollera att din Email Service är aktiv i EmailJS dashboard
- Kontrollera EmailJS dashboard för felmeddelanden

### Emails kommer inte fram
- Kontrollera spam-mappen
- Kontrollera att din email-service är korrekt kopplad i EmailJS
- Testa med ett annat email-konto

## Alternativ: Formspree

Om du föredrar Formspree istället:
1. Gå till [https://formspree.io/](https://formspree.io/)
2. Skapa konto (50 submissions/månad gratis)
3. Skapa ett nytt form
4. Ersätt EmailJS-koden med Formspree endpoint

## Kostnad

- **EmailJS Free:** 200 emails/månad
- **EmailJS Paid:** Från $15/månad för 1,000 emails

För en konsultwebbplats räcker gratis-tiern oftast gott och väl!

