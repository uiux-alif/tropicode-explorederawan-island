# Explore Derawan — Tourism Website

A modern, fully responsive, conversion-optimised tourism website for **Kepulauan Derawan**, Kalimantan Timur.  
Built with clean HTML5, CSS3, and vanilla JavaScript — no frameworks, no build tools required.

---

## 📁 Project Structure

```
explore-derawan/
│
├── index.html              # Home page
├── packages.html           # All packages listing
├── package-detail.html     # Individual package detail
├── destinations.html       # All destinations
├── gallery.html            # Photo gallery
├── contact.html            # Contact & inquiry form
│
├── sitemap.xml             # SEO sitemap
├── robots.txt              # SEO robots
│
├── assets/
│   ├── css/
│   │   └── style.css       # All styles — design tokens, components, layout, responsive
│   └── js/
│       └── main.js         # All JS — navbar, slider, gallery, FAQ, data rendering
│
└── data/
    ├── packages.json       # Package cards data
    ├── destinations.json   # Destinations data
    ├── testimonials.json   # Testimonial data
    ├── gallery.json        # Gallery image data
    └── pricing.json        # Pricing tables per package
```

---

## 🚀 Getting Started

### Local Development

No build tools required. Just open in a browser with a local server (required for `fetch()` JSON calls):

**Option 1 — VS Code Live Server extension:**  
Right-click `index.html` → "Open with Live Server"

**Option 2 — Python:**
```bash
cd explore-derawan
python3 -m http.server 8080
# Open http://localhost:8080
```

**Option 3 — Node.js `serve`:**
```bash
npx serve explore-derawan
```

> ⚠️ Opening `index.html` directly as a `file://` URL will cause JSON fetch errors. Always use a local server.

---

## 🌐 Deployment

### Netlify (Recommended)
1. Drag the `explore-derawan/` folder to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Done. Your site is live.

Or via Netlify CLI:
```bash
npm install -g netlify-cli
netlify deploy --dir=explore-derawan --prod
```

### Vercel
```bash
npm install -g vercel
cd explore-derawan
vercel --prod
```

### GitHub Pages
```bash
# Push folder contents to a GitHub repo
# Enable Pages in Settings → Pages → Deploy from branch
```

---

## ✏️ How to Update Content

All editable content lives in `/data/` JSON files — **no HTML editing required** for content updates.

### Update Packages — `data/packages.json`
```json
{
  "id": "my-package",
  "type": "private-trip",         // open-trip | private-trip | luxury-trip | one-day-trip | custom-trip | diving-trip
  "title": "Nama Paket",
  "duration": "3 Hari 2 Malam",
  "destinations": ["Derawan", "Kakaban"],
  "facilities": ["Cottage", "Speed Boat"],
  "price_from": 2500000,          // 0 = tampilkan "Hubungi Kami"
  "badge": "Terpopuler",          // optional label badge
  "image": "https://...",
  "slug": "my-package"            // used for detail page URL param
}
```

### Update Destinations — `data/destinations.json`
```json
{
  "id": "pulau-baru",
  "name": "Pulau Baru",
  "tagline": "Tagline singkat",
  "description": "Deskripsi panjang...",
  "activities": ["Snorkeling", "Hiking"],
  "image": "https://...",
  "highlight": true               // true = appears on homepage grid
}
```

### Update Testimonials — `data/testimonials.json`
```json
{
  "id": 6,
  "name": "Nama Traveler",
  "origin": "Kota Asal",
  "trip": "Private Trip 4D3N",
  "rating": 5,
  "review": "Teks review...",
  "avatar": "https://...",
  "date": "Januari 2025"
}
```

### Update Gallery — `data/gallery.json`
```json
{
  "id": 13,
  "category": "underwater",   // underwater | snorkeling | islands | resorts | whale-sharks | drone
  "title": "Caption foto",
  "image": "https://...",
  "size": "large"             // large | medium (affects masonry weight — cosmetic only)
}
```

### Update Pricing — `data/pricing.json`
Edit the `pricing` array for any package. Each row = one pax bracket with prices per departure point.

---

## 🎨 Customisation

### Colors
All colors are CSS custom properties in `style.css` under `:root`. Change them once, updates everywhere:

```css
:root {
  --ocean-bright:  #1577c4;   /* Primary brand blue */
  --teal:          #0bbfa3;   /* Accent teal / eyebrow / badge */
  --accent-gold:   #f0a500;   /* Package badge color */
}
```

### WhatsApp Number
Replace `6281234567890` globally across all HTML files and `main.js` with your real number (format: country code + number, no `+` or spaces):
```
Find:    6281234567890
Replace: 628XXXXXXXXXX
```

### Brand Name & Logo
Replace `Explore Derawan` / `Explore <span>Derawan</span>` in all HTML files.

### Domain
Update `sitemap.xml` URLs from `https://www.explorederawan.id/` to your real domain.

---

## 📄 Pages Overview

| File | Purpose | Key Sections |
|---|---|---|
| `index.html` | Homepage — main entry point | Hero, About, Trip Types, Facilities, Packages, Destinations, Gallery, Testimonials, CTA |
| `packages.html` | All packages listing + category filter | Filter tabs, Package grid, Trip-type detail sections |
| `package-detail.html` | Individual package deep-dive | Hero banner, Itinerary timeline, Included facilities, Pricing table, Photo gallery, FAQ, Booking sidebar |
| `destinations.html` | All 7 destinations with detail | Sticky anchor nav, Full destination cards with tips |
| `gallery.html` | Masonry photo gallery | Category filters, Masonry grid, Lightbox |
| `contact.html` | Contact & inquiry | WA button, Contact info cards, Smart form → WA, Google Maps embed |

---

## ⚙️ JavaScript Features

All in `assets/js/main.js` — no external dependencies.

| Feature | Description |
|---|---|
| **Navbar** | Transparent → solid scroll transition, mobile hamburger menu |
| **Scroll Reveal** | IntersectionObserver-based fade-up animation on all `.reveal` elements |
| **Testimonials Slider** | Touch-friendly slider with dots navigation, responsive perView |
| **Gallery Filter** | CSS `display` toggle by `data-category` attribute |
| **Lightbox** | Click-to-zoom with keyboard `Escape` dismiss |
| **FAQ Accordion** | Smooth `max-height` CSS transition, one-open-at-a-time |
| **JSON Rendering** | Async `fetch()` loads all cards/grids from data files |
| **Contact Form** | Builds WhatsApp message from all form fields, opens WA |
| **Active Nav** | Auto-marks current page link as active |

---

## 📱 Responsive Breakpoints

| Breakpoint | Behaviour |
|---|---|
| `> 1024px` | Full desktop — 3–4 column grids |
| `768px–1024px` | Tablet — 2 column grids, sidebar stacks |
| `< 768px` | Mobile — 1 column, hamburger nav, stacked hero |
| `< 480px` | Small mobile — single column everywhere |

---

## 🔍 SEO

- Semantic HTML5 (`<nav>`, `<section>`, `<article>`, `<footer>`, `<main>` implied)
- `<title>` and `<meta name="description">` on every page
- OpenGraph tags for social sharing
- Proper heading hierarchy (h1 → h2 → h3)
- `alt` attributes on all `<img>` elements
- `sitemap.xml` and `robots.txt` included
- Focus keywords: *Wisata Derawan, Paket Wisata Derawan, Open Trip Derawan, Private Trip Derawan, Whale Shark Derawan, Pulau Maratua, Pulau Kakaban*

---

## ⚡ Performance Tips

- Images use `loading="lazy"` everywhere except hero (uses `fetchpriority="high"`)
- CSS variables avoid repeated values
- No unused JavaScript libraries
- Fonts loaded via `preconnect` hints
- Use [Squoosh](https://squoosh.app/) or [TinyPNG](https://tinypng.com/) to compress real photos before upload
- For production: replace Unsplash URLs with self-hosted optimised WebP images

---

## 🔧 Integrations to Wire Up

| Integration | Location | What to do |
|---|---|---|
| **WhatsApp Number** | All HTML + `main.js` | Replace `6281234567890` |
| **Email** | Footer, contact.html | Replace `info@explorederawan.id` |
| **Google Maps Embed** | `contact.html` | Replace `<iframe src="...">` with your real embed URL from Google Maps |
| **Instagram** | Footer, gallery.html | Replace `@explorederawan` with real handle |
| **Domain** | `sitemap.xml` | Replace `www.explorederawan.id` |
| **Google Analytics** | All `<head>` | Add `gtag.js` snippet |

---

## 📦 Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 (semantic) |
| Styling | CSS3 (custom properties, grid, flexbox, clamp) |
| Scripting | Vanilla JavaScript (ES2020+, no jQuery) |
| Data | JSON (fetch API) |
| Fonts | Google Fonts — Playfair Display + DM Sans |
| Images | Unsplash (placeholders — replace with real photos) |
| Deployment | Netlify / Vercel / GitHub Pages |

---

## 📜 License

Built for Explore Derawan. All rights reserved.  
Replace Unsplash placeholder images with licensed or owned photography before commercial launch.
