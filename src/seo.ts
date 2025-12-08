export interface SEOData {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  canonical?: string;
}

export const defaultSEO: SEOData = {
  title: 'payment - Teknisk produktstrateg inom betalningar & AI',
  description: 'Jag bygger och leder produkter där strategi, systemarkitektur och design möts. Erfarenhet från PayLink360, Hellman & Partners och Style Scandinavia.',
  keywords: 'produktstrateg, betalningar, AI, fintech, UX, API, systemarkitektur',
  ogImage: '/og-image.jpg',
  canonical: 'https://payment.github.io'
};

export const generateJSONLD = () => ({
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Carl Wahlen",
  "alternateName": "payment",
  "description": "Teknisk produktstrateg inom betalningar & AI. Bygger produkter där strategi, systemarkitektur och design möts.",
  "url": "https://payment.github.io",
  "knowsAbout": [
    "Payment Orchestration",
    "API Architecture", 
    "Product Strategy",
    "UX Design",
    "AI & Machine Learning",
    "Fintech",
    "Technical Product Management"
  ],
  "hasOccupation": {
    "@type": "Occupation",
    "name": "Technical Product Strategist",
    "description": "Specialist inom produktstrategi, systemarkitektur och UX för betalnings- och AI-produkter",
    "occupationLocation": {
      "@type": "Country",
      "name": "Sweden"
    }
  },
  "offers": {
    "@type": "Service",
    "name": "Technical Product Strategy Consulting",
    "description": "Produktstrategi, teknisk PM, payments & compliance, och UX för komplexa system",
    "provider": {
      "@type": "Person",
      "name": "Carl Wahlen"
    }
  },
  "sameAs": [
    "https://github.com/payment"
  ]
});

export const generateBreadcrumbs = (items: Array<{name: string, url: string}>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": `https://payment.github.io${item.url}`
  }))
});
