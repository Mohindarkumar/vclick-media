# VClick Media & Events — Website

A premium, cinematic marketing website for **VClick Media & Events**, a media production
and event management company headquartered in Ajman Free Zone, UAE.

Built with **React 18 + Vite**, **Tailwind CSS** (fully custom theme), **Framer Motion**,
**lucide-react**, and **react-router-dom** (scaffolded for future routes; v1 ships as a
single-page scrolling site).

---

## Getting Started

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:5173` by default.

To build for production:

```bash
npm run build
```

Output is written to `dist/`. Preview the production build locally with:

```bash
npm run preview
```

---

## Project Structure

```
src/
├── assets/          # images/ and video/ placeholders
├── components/
│   ├── common/       # Button, SectionEyebrow, GoldDivider, GlassCard, AnimatedCounter, SEOHead, BrandIcons
│   ├── layout/       # Navbar, Footer, ScrollToTop
│   └── ui/           # Lightbox, Carousel, Accordion
├── modules/          # One folder per page section (hero, about, services, ...)
├── pages/            # HomePage.jsx composes every module in order
├── data/             # services.js, portfolio.js, testimonials.js, pricing.js, faq.js, clients.js
├── hooks/            # useScrollReveal, useCounterAnimation, usePrefersReducedMotion
├── styles/           # index.css (Tailwind directives + base styles)
├── App.jsx
└── main.jsx
```

All section copy lives in `src/data/*.js` so future content edits don't require touching
component code.

---

## Design System

Defined in `tailwind.config.js` under `theme.extend`:

- **Colors:** `ink` (#0B0B0B), `charcoal` (#1C1C1C), `gold` (#D4AF37), `amber` (#FFB703),
  `paper` (#FFFFFF), `mist` (#BDBDBD)
- **Type scale:** `display-1` (72px) / `display-2` (56px) / `h1` / `h2` (48px) / `h3` (28px) /
  `body-lg` (18px) / `body` (16px) / `eyebrow` (13px), set on the Poppins family (weights 300–800)
- **Signature element:** the "cinematic gold-light sweep" — a `GoldDivider` component
  (`src/components/common/GoldDivider.jsx`) used both as a section divider and as an
  animated underline beneath key headline words. Paired with a cursor-following ambient
  gold glow exclusive to the Hero section.

---

## A note on `lucide-react`

This build uses `lucide-react` v1.21, a major-version jump from the icon set the original
brief assumed. That version **removed all brand/social icons** (Instagram, Facebook,
LinkedIn, YouTube, etc.) upstream. Rather than pin an older package version, four small
inline SVG icons were added at `src/components/common/BrandIcons.jsx` to fill that gap —
they follow the same `size`/`className` API as lucide icons, so they drop in without any
special-casing elsewhere in the Footer or Contact section.

---

## Open Items Requiring Real Client Input

These are flagged with `// TODO:` comments throughout the codebase. Search the project
for `TODO:` to find every instance. Summary:

| Item | Where | Status |
|---|---|---|
| Real logo / wordmark | Navbar, Footer, `public/favicon.svg` | Using gold-gradient "VClick" text wordmark + a simple gold "V" monogram favicon |
| Real photography/videography portfolio images | `data/portfolio.js`, `data/services.js`, About collage | Using Unsplash placeholder URLs |
| Real showreel video file | `assets/video/hero-bg.mp4`, `assets/video/showreel.mp4` | Placeholder `<video>` elements, no actual file bundled |
| Real client/corporate partner logos | `data/clients.js` | Using labeled placeholder blocks |
| Real pricing figures | `data/pricing.js` | All prices marked "Starting from AED X — placeholder" |
| Real business hours | Contact section | Currently "Sun–Thu, 9:00 AM – 7:00 PM" placeholder |
| Real WhatsApp / phone / email | Contact section, Footer, SEOHead JSON-LD | Currently `+971 50 000 0000` / `hello@vclickmedia.ae` placeholders |
| Backend / email service for contact form | `modules/contact/ContactForm.jsx` | Stubbed with a simulated delay; see `// TODO: connect to backend` comment in that file |
| Real social profile URLs | Footer, SEOHead JSON-LD `sameAs` | Currently generic `instagram.com` / `facebook.com` etc. root URLs |
| Exact office address / map pin | `modules/contact/MapEmbed.jsx` | Generic "Ajman Free Zone" text-query embed, not a precise pin |

Once real assets are supplied, swapping them is a matter of editing the relevant file in
`src/data/` or `src/assets/` — no component logic needs to change.

---

## Accessibility & SEO

- Single `<h1>` in the Hero; one `<h2>` per content section
- Semantic `<section>`, `<nav>`, `<main>`, `<footer>` throughout
- All images have descriptive `alt` text (or `alt=""` for purely decorative backgrounds)
  and `loading="lazy"` below the fold
- Visible custom focus states on every interactive element (gold outline, see `src/styles/index.css`)
- `prefers-reduced-motion` is respected globally (parallax, cursor-glow, marquee, and
  counter animations all disable or jump to their end state)
- Open Graph tags + JSON-LD `LocalBusiness` schema via `react-helmet-async`
  (`src/components/common/SEOHead.jsx`)

---

## Responsive Breakpoints

Tested at 375px, 768px, 1024px, 1280px, 1440px, and 1920px. Notable behavior:

- Navbar collapses to a full-screen glass overlay menu below **1280px** (`xl`) — widened
  from the more typical `lg` breakpoint because the 8-link nav + logo + CTA button need
  the extra room to avoid overlapping at 1024–1279px.
- Event Process timeline switches from horizontal (`lg` and up) to a vertical stacked
  timeline below that.
- Portfolio masonry collapses to a 2-column stack on mobile.
- Pricing cards stack vertically on mobile; the "Most Popular" Wedding package keeps its
  gold border and crown badge at every breakpoint.
