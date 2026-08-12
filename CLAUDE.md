# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

PKU Kookboek (pkuproef.nl) is a static multilingual website promoting cookbooks for people with PKU (phenylketonuria), a metabolic disorder requiring a low-protein diet. The site is available in Dutch (nl) and English (en).

## Development

This is a static HTML/CSS/JS website with no build system. To develop:
- Open HTML files directly in a browser, or
- Use any local web server (e.g., `python -m http.server 8000`)

## Architecture

### Language Structure
- `/index.html` - Root redirect page that detects browser language and redirects to `/nl/` or `/en/`
- `/nl/` - Dutch pages (primary language)
- `/en/` - English pages

Page mapping between languages:
| Dutch | English |
|-------|---------|
| bestellen.html | order.html |
| kookvideo.html | videos.html |
| index.html | index.html |

### Shared Resources
- `/styles.css` - Global stylesheet
- `/script.js` - UI interactions (hamburger menu, smooth scroll, read more toggle)
- `/menu.js` - Dynamic navigation component loaded on all pages
- `/Images/` - All images
- `/Font/` - Custom fonts

### Fonts
The site uses two font families loaded via `@font-face` in `styles.css`:
- **AmericanTypewriter** (`AmericanTypewriterStd-Light.woff2`) - Used for headings (h1, h2) and navigation
- **MyriadPro** (`MyriadPro-Regular.woff2`) - Used for body text

### Video Pages
The video pages (`/nl/kookvideo.html` and `/en/videos.html`) contain 77 embedded YouTube cooking videos using **lite-youtube-embed** (v0.3.3) loaded via jsDelivr CDN for performance. Each video is in a `.video-card` with a `<lite-youtube>` element and an `<h3>` title prefixed with "PKU PROEF Kookstudio: ".

Features:
- Hero header with YouTube image (`Images/PKU Proef KookVideo's op YouTube.jpg`)
- **Search/filter field** at the top of the video grid that filters cards by title (client-side, vanilla JS)
- "No results" message when no videos match the search query
- CTA section at bottom linking to the order page ("Geïnspireerd?" / "Inspired?")
- Page-specific CSS and JS are in inline `<style>` and `<script>` blocks at the bottom of the HTML files

### Menu System
`menu.js` dynamically injects the header/navigation into every page. It:
- Detects current language from URL path (`/en/` vs `/nl/`)
- Renders menu items: Home, Wat is PKU?, Over de kookboeken, Sfeerimpressie, Bestellen, Kookvideo's (and English equivalents)
- Handles language switcher that maps current page to equivalent in other language

### i18n Approach
Each language has its own set of pages under `/nl/` and `/en/` with hardcoded content. The root only contains `/index.html`, which redirects based on browser language.

### Page Headers
Each page has a hero section with book cover images:
- **Homepage**: Both book covers (Deel 1 + Deel 2), no "sold out" overlay
- **Bestellen/Order**: Both book covers with "Uitverkocht"/"Sold out" overlay on Deel 1
- **Kookvideo/Videos**: YouTube image (450px wide, top-aligned)

### Deployment

The site is deployed via **GitHub Pages**. Each push to `main` triggers an automatic deploy (see the Actions tab for build status).

- **GitHub repo**: https://github.com/Sieds/pkuproef
- **GitHub Pages source**: branch `main`, folder `/ (root)` — configured in repo Settings → Pages
- **Custom domain**: `pkuproef.nl`, set via the `/CNAME` file at the repo root (also reflected in Pages settings)
- **Fallback URL**: `https://sieds.github.io/pkuproef/` — redirects to the custom domain when Pages has a CNAME configured

### Hosting migration status

Migration from Hosting.nl to GitHub Pages is **in progress**:
- ✅ Repo on GitHub, Pages deploying successfully
- ✅ `CNAME` file committed with `pkuproef.nl`
- ⏳ **Pending**: DNS records at **Combell** (the domain registrar — hosting and DNS live at different providers: hosting at Hosting.nl, DNS/domain at Combell)
- ⏳ Pending: enable "Enforce HTTPS" in Pages settings (only available after DNS check passes)
- ⏳ Pending: decommission Hosting.nl once `pkuproef.nl` serves from GitHub

### DNS records to configure at Combell

Replace any existing A-records for the apex (`@` / `pkuproef.nl`) that point to Hosting.nl with these four A-records pointing to GitHub Pages:

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

Plus one CNAME for `www` → `sieds.github.io.`

**Do not touch** MX (email) or TXT records at Combell.
