# Karuvati Innovations — SEO Tags & Deployment Notes

## 1. Meta tags for `index.html`

Paste this inside the `<head>` of your real Vite `index.html` once you scaffold the production project:

```html
<meta charset="UTF-8" />
<title>Karuvati Innovations | Website & App Development in India</title>
<meta name="description" content="Karuvati Innovations builds professional, fast, affordable websites and web applications for businesses, startups, restaurants, gyms, doctors, schools and e-commerce brands. Get a free quote today." />
<meta name="keywords" content="website development, web app development, UI UX design, affordable website design India, ecommerce website, business website, web developer, React developer" />
<meta name="author" content="Karuvati Innovations" />
<meta name="robots" content="index, follow" />
<link rel="canonical" href="https://www.sujitwebsolutions.in/" />

<!-- Open Graph -->
<meta property="og:type" content="website" />
<meta property="og:title" content="Karuvati Innovations | Website & App Development" />
<meta property="og:description" content="Modern, responsive, SEO-friendly websites and web applications built to grow your business." />
<meta property="og:url" content="https://www.sujitwebsolutions.in/" />
<meta property="og:image" content="https://www.sujitwebsolutions.in/og-image.jpg" />
<meta property="og:locale" content="en_IN" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Karuvati Innovations | Website & App Development" />
<meta name="twitter:description" content="Professional, fast, affordable websites & web apps for local businesses and startups." />
<meta name="twitter:image" content="https://www.sujitwebsolutions.in/og-image.jpg" />

<meta name="theme-color" content="#0F172A" />
<link rel="icon" type="image/png" href="/favicon.png" />
```

*(You'll need to design and export an actual `og-image.jpg` (1200×630) and `favicon.png` — these are visual assets, not code.)*

## 2. Schema markup (JSON-LD)

Add this `<script>` block inside `<head>` as well:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Karuvati Innovations",
  "description": "Website and web application development company offering business websites, e-commerce stores, web apps and UI/UX design.",
  "url": "https://www.sujitwebsolutions.in/",
  "telephone": "+91-9930964404",
  "email": "kvs.sujit@gmail.com",
  "priceRange": "₹2,999 - ₹19,999+",
  "areaServed": "IN",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "IN"
  }
}
</script>
```

## 3. Files included in this delivery

| File | Purpose |
|---|---|
| `karuvati-innovations-website.jsx` | The full interactive website (open the artifact to preview/edit) |
| `robots.txt` | Drop into your site's public root |
| `sitemap.xml` | Drop into your site's public root, update URLs to your real domain |
| `seo-tags-and-deployment-notes.md` | This file |

## 4. What's fully working right now

Everything visual and interactive runs with no setup: dark/light mode, sticky nav with scroll-spy, scroll progress bar, loading screen, all animations, the services/pricing/portfolio grids with filtering, the cost calculator, FAQ accordion, testimonial slider, EN/HI language toggle, cookie consent, exit-intent popup, back-to-top, floating WhatsApp/Call/Email buttons, the client portal (demo preview), and all forms (contact, newsletter, callback request) with client-side validation and toast confirmations.

**AI chat widget — genuinely AI-powered.** It calls the real Claude API (`api.anthropic.com/v1/messages`, model `claude-sonnet-4-6`) with a system prompt grounded in your actual services, pricing, delivery times and contact info, so it can answer open-ended questions, not just keyword-matched ones. This works as-is inside a Claude artifact (no API key needed on your end). If you deploy this outside claude.ai as your own Vite site, this specific call won't work directly from the browser — you'd need to proxy it through your own backend with your own Anthropic API key, since browsers can't safely call the Anthropic API with an embedded key.

## 5. What needs your own setup before it's a live, production site

The brief asked for Firebase, EmailJS, a payment gateway, real PDF downloads, and a real client-login system — these all require your own accounts/API keys, so they're built as working UI with clear next steps rather than faked:

- **Contact/newsletter/callback forms** — currently confirm locally in the browser. Wire them to **EmailJS** (a few lines using your Service ID, Template ID and Public Key) or a **Firebase Function** to actually deliver emails.
- **Client Portal / project tracking** — the footer link opens a demo preview. A real version needs **Firebase Auth + Firestore** (or similar) to create real client accounts.
- **Company Profile / Price List PDF downloads** — currently show a toast. Generate real PDFs with a library like `pdf-lib` or `jsPDF`, or host static PDF files and link to them directly.
- **Payment gateway / EMI** — needs a **Razorpay** or **Stripe** account and their checkout SDK.
- **Android APK wrapper** — a separate build step (e.g. via Capacitor or TWA), not something a website file can produce.

## 6. Turning this into a real deployable Vite project

This file is a single self-contained React component (ideal for previewing and iterating). To ship it as an actual site:
1. `npm create vite@latest karuvati-innovations -- --template react`
2. Install Tailwind CSS and configure it (`tailwind.config.js`, `index.css`) following Tailwind's Vite guide.
3. `npm install lucide-react`
4. Drop this file in as `src/App.jsx`, add the meta tags above to `index.html`.
5. Deploy to **Vercel** or **Netlify** — both connect straight to a GitHub repo and auto-deploy on push.

Happy to help with any of these next steps — just let me know which one you want to tackle first.
