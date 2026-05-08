# Vipin Kumar — Portfolio

> **Senior Power Platform Solution Architect** · Capgemini · 11+ years  
> Dataverse · Model-Driven Apps · Copilot Studio · ALM Governance · Azure Integration

🌐 **Live site**: [viipiin.github.io](https://viipiin.github.io)

---

## About

Personal portfolio built with **vanilla HTML / CSS / JavaScript** — no frameworks, no build tools. Deployed automatically to GitHub Pages on every push to `main`. Designed to be ATS-friendly, fast, and fully responsive across mobile, tablet, and desktop.

---

## Sections

| Section | ID | Description |
|---|---|---|
| Hero | `#hero` | Name, title, CTA buttons (GitHub · LinkedIn · Resume) |
| At a Glance | `#stats` | Key metrics (11+ yrs, 7+ projects, 50+ solutions, 4 certs) |
| Career Profile | `#about` | Full bio with dynamic experience badge (daily-calculated tenure) |
| Certifications | `#certifications` | PL-900, PL-100, PL-200, AZ-900 |
| Community Badges | `#badges` | 6 Global AI Community badges — 3D flip card design with skill details |
| Technical Skills | `#skills` | Power Platform, Azure, SharePoint, DevOps toolset |
| Professional Journey | `#experience` | Work history at Capgemini and prior roles |
| Projects | `#projects` | Enterprise case studies with architecture decisions and outcomes |
| Contact | `#contact` | LinkedIn, GitHub, Email, Resume download |
| Education | `#education` | Academic background |

---

## File Structure

```
Viipiin.github.io/
├── index.html                    # Main single-page portfolio
│
├── assets/
│   ├── css/
│   │   ├── styles.css            # Base stylesheet (3800+ lines — do NOT edit directly)
│   │   ├── hamna-theme.css       # All theme overrides go here (use !important where needed)
│   │   ├── contact.css           # Contact page styles
│   │   ├── back-to-top.css       # Back-to-top button styles
│   │   ├── header-component.css  # Header component styles
│   │   └── resources.css         # Resources page styles
│   ├── js/
│   │   ├── script.js             # Main site interactivity (ES6 classes)
│   │   ├── header-component.js   # Sticky header with scroll effects
│   │   ├── back-to-top.js        # Back-to-top with scroll progress
│   │   ├── contact-responsive.js # Contact form validation
│   │   └── clean-url.js          # URL hash cleanup on load
│   └── images/
│       ├── favicon.svg
│       └── Badges-Online/        # 6 community badge PNGs
│
├── pages/
│   ├── blog.html                 # Blog listing page
│   ├── contact.html              # Contact form page
│   └── resources.html            # Resources & cheat sheets
│
├── resources/
│   ├── Resume_PP.pdf             # Downloadable resume (linked from hero + contact)
│   └── pac-cli-cheat-sheet.html  # PAC CLI reference page
│
├── tests/
│   ├── homepage.spec.ts          # Playwright E2E — homepage (responsive, a11y, nav)
│   └── pages.spec.ts             # Playwright E2E — blog, contact, links
│
├── .github/
│   ├── workflows/
│   │   ├── deploy.yml            # GitHub Actions: auto-deploy to GitHub Pages on push
│   │   └── static.yml            # Static pages workflow
│   └── copilot-instructions.md   # Copilot workspace instructions
│
├── .nojekyll                     # Disables Jekyll processing on GitHub Pages
├── package.json                  # npm scripts (serve, test, test:headed, test:ui)
├── playwright.config.ts          # Playwright — 6 browser/device configs
└── README.md                     # This file
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 semantic (`<section>`, `<article>`, `<nav>`, `<main>`) |
| Styling | Vanilla CSS3 — Grid, Flexbox, CSS Custom Properties, `@media` queries |
| Scripting | Vanilla JavaScript ES6+ — classes, `IntersectionObserver`, `Date` API |
| Testing | Playwright (`@playwright/test` v1.40) |
| CI/CD | GitHub Actions → GitHub Pages |
| Dev server | `python -m http.server` or `npx http-server` |

**No frameworks. No bundlers. No transpilers.**

---

## CSS Architecture

All visual changes go in **`hamna-theme.css`** — never edit `styles.css` directly.

```
styles.css          ← base/foundation (treat as read-only)
hamna-theme.css     ← ALL overrides, additions, and new components
```

Use `!important` in `hamna-theme.css` when specificity conflicts with base styles.

### Colour tokens (in `hamna-theme.css :root`)

| Token | Value | Usage |
|---|---|---|
| Primary | `#312E81` | Headings, accents |
| Accent | `#6366f1` | Links, badges, interactive |
| Highlight BG | `#eef2ff` | Skill chips, hover fills |
| Body text | `#111827` | Main copy |
| Paragraph | `#374151` | Secondary copy |
| Muted | `#64748B` | Labels, timestamps |

### Responsive breakpoints

```css
@media (max-width: 480px)  { /* Mobile  */ }
@media (max-width: 768px)  { /* Tablet  */ }
@media (min-width: 769px)  { /* Desktop */ }
```

---

## JavaScript Architecture

`script.js` is structured as ES6 classes, each owning a single responsibility:

```
ResponsiveManager     — viewport detection, layout adjustments
FormManager           — contact form validation & submission guard
InteractiveFeatures   — scroll animations (IntersectionObserver), hover effects
NotificationManager   — toast-style notification system
```

Other scripts are standalone modules:

```
header-component.js   — sticky nav, active section highlighting, scroll effects
back-to-top.js        — visibility toggle + smooth scroll
contact-responsive.js — real-time field validation on contact page
clean-url.js          — removes stale hash fragments on page load
```

---

## Notable Features

### Dynamic Experience Badge
The **"11+ years"** pill in the Career Profile section is fully dynamic.  
Start date: **5 October 2014**. On hover it shows exact tenure:

```
🗓 11 years, 7 months & 3 days   ← recalculated every page load
```

### Community Badges — 3D Flip Cards
Six [Global AI Community](https://globalai.community/about) / [Agent Academy](https://microsoft.github.io/agent-academy/) badges displayed as interactive flip cards:
- **Front**: Badge image + name
- **Back**: Skills demonstrated + Verify link
- Pure CSS 3D flip (`rotateY(180deg)`, `backface-visibility: hidden`)
- `prefers-reduced-motion` fallback (cross-fade instead of flip)

Badges earned:

| Badge | Issuer Link |
|---|---|
| Recruit | [Verify](https://globalai.community/badges/cceb10e7-2a57-416f-a3a2-44a5b38bf3ca/) |
| Operative | [Verify](https://globalai.community/badges/efd3b450-ace8-4c92-9bca-53a3e840f0ab/) |
| Command Specialist | [Verify](https://globalai.community/badges/b88e301d-180c-4223-bd75-2b37322632fc/) |
| YAML Specialist | [Verify](https://globalai.community/badges/755adc0f-7743-465b-9577-46b049fe8a30/) |
| Learn MCP Specialist | [Verify](https://globalai.community/badges/6e820c61-c13a-4ce5-91ee-8c1fc318c13f/) |
| MCP Joker | [Verify](https://globalai.community/badges/cfbcbf0d-d492-48d4-ac73-893374cbbbf8/) |

---

## Local Development

```bash
# Clone
git clone https://github.com/Viipiin/Viipiin.github.io.git
cd Viipiin.github.io

# Serve (Python — built-in, no install needed)
python -m http.server 8000

# Serve (Node.js)
npx http-server -p 8000

# Open
http://localhost:8000
```

---

## Testing

Playwright E2E tests cover responsive design, navigation, accessibility, and forms across **6 browser/device configurations**: Chromium, Firefox, WebKit, Pixel 5, iPhone 12, iPad Pro.

```bash
npm install            # Install Playwright (one-time)

npm test               # Run all tests (headless)
npm run test:headed    # Watch tests run in browser
npm run test:ui        # Interactive Playwright UI
npm run test:debug     # Step-through debugger
npm run test:report    # Open HTML test report
```

---

## Deployment

Push to `main` → GitHub Actions (`deploy.yml`) → GitHub Pages.

```
https://viipiin.github.io
```

No manual steps needed. `.nojekyll` ensures GitHub Pages skips Jekyll and serves files as-is.

---

## Verified Metrics

All numbers used in the portfolio are real — not marketing estimates.

| Metric | Value |
|---|---|
| Years of experience | 11+ (since 5 Oct 2014) |
| Major enterprise projects | 7+ |
| Solutions delivered | 50+ |
| Certifications | 4 (PL-900, PL-100, PL-200, AZ-900) |
| Efficiency gain (Nintex → Power Automate) | 40% |
| Migration effort reduction | 60% |
| Productivity improvement | 45% |
| SharePoint data migrated | 500+ GB |
| Developers led | 8 |

---

## Contact

| | |
|---|---|
| 📧 Email | vipintyagi00@gmail.com |
| 💼 LinkedIn | [linkedin.com/in/viipiintyagi](https://in.linkedin.com/in/viipiintyagi) |
| 🐙 GitHub | [github.com/Viipiin](https://github.com/Viipiin) |
| 📄 Resume | [Download PDF](https://viipiin.github.io/resources/Resume_PP.pdf) |

---

*Built with vanilla HTML/CSS/JS · Deployed on GitHub Pages · © Vipin Kumar*