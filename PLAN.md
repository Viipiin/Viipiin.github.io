# Portfolio Redesign — Master Plan & History

> **Owner:** Viipin Kumar  
> **Site:** [viipiin.github.io](https://viipiin.github.io) · Custom domain available  
> **Target roles:** Power Platform Architect · Copilot Studio Architect  
> **Last updated:** April 2026

---

## Project Goal

Redesign and refine the personal portfolio to:

1. Target **Power Platform Architect / Copilot Studio Architect** roles credibly
2. Be **ATS-friendly** — semantic HTML, plain text, logical heading hierarchy
3. Be **accessible** — WCAG contrast, keyboard navigation, ARIA landmarks
4. Be **visually modern** — clean, minimal, no flashy animations
5. Be **fast and maintainable** — vanilla HTML/CSS/JS, no build tools, no frameworks

---

## Architecture Decisions

| Decision | Choice | Reason |
|---|---|---|
| CSS override layer | `hamna-theme.css` (loaded last) | Never modify `styles.css` (3814 lines base) |
| Color palette | Option C — Subtle Purple Tech | Professional, distinct from generic blue |
| Font pair | Plus Jakarta Sans + Inter (Google Fonts) | Modern, readable, widely supported |
| JS approach | Vanilla + IntersectionObserver | No frameworks, fast load |
| Layout | Single-page with anchor nav | ATS-friendly, simple to maintain |
| Max content width | 960–1100px | Generous whitespace, recruiter-readable |

### Color Tokens

| Token | Value | Usage |
|---|---|---|
| Primary | `#312E81` | Headings, section accents |
| Accent | `#6366f1` | Links, badges, underlines |
| Highlight bg | `#eef2ff` | Skill chips, card highlights |
| Highlight text | `#4338ca` | Chip labels |
| Highlight border | `#c7d2fe` | Chip borders |
| Background | `#F9FAFB` | Page background |
| Text | `#111827` | Body headings |
| Body text | `#374151` | Paragraph text |
| Muted | `#64748B` | Secondary labels |

---

## File Structure

```
Viipiin.github.io/
├── index.html                        ← Main single-page portfolio (~726 lines)
├── assets/
│   ├── css/
│   │   ├── styles.css                ← BASE — NEVER MODIFY (3814 lines)
│   │   ├── hamna-theme.css           ← ALL theme overrides go here (~1171 lines)
│   │   ├── back-to-top.css           ← Minimal back-to-top button styles
│   │   └── header-component.css      ← Header component styles
│   └── js/
│       └── back-to-top.js            ← Chevron SVG, no tooltip
├── components/                       ← Header/footer web components
├── back-to-top-component.js
├── PROJECT_STRUCTURE.md
├── README.md
└── PLAN.md                           ← This file
```

---

## Section Order (index.html)

| # | Section ID | Landmark | Purpose |
|---|---|---|---|
| 1 | `#hero` | `<section>` | Name, title, value statement, avatar, CTAs |
| 2 | `#stats` | `<section>` | At-a-glance numbers (11+yr, 7+ projects, 50+ solutions, 4 certs) |
| 3 | `#about` | `<section>` | Career profile — grounded, no hype |
| 4 | `#skills` | `<section>` | Skills table grouped by category |
| 5 | `#certifications` | `<section>` | Microsoft certifications |
| 6 | `#experience` | `<section>` | Resume-style work history |
| 7 | `#projects` | `<section>` | Case study style: Context → Architecture → Tools → Outcome |
| 8 | `#contact` | `<section>` | 4 contact cards (Email, LinkedIn, GitHub, Location) |
| 9 | `#education` | `<section>` | Degree + institution |

---

## All Work Completed (Chronological)

### Phase 1 — Initial Redesign
- [x] Audited reference site (hamna.dev) for design inspiration
- [x] Established color palette, font pair, layout rules
- [x] Rewrote `index.html` with semantic structure
- [x] Created `hamna-theme.css` as override layer
- [x] Designed hero section (two-column, avatar, badges, CTAs)

### Phase 2 — Content Refocus (Power Platform Architect)
- [x] Removed unrelated tech stacks and generic "AI enthusiast" content
- [x] Rewrote headline → *"Power Platform Solution Architect (Aspiring)"*
- [x] Rewrote career profile — calm, credible, architect-like tone
- [x] Curated skills into 5 categories: Architecture · Platform · AI/Copilot · Governance · Integration
- [x] Rewrote experience bullets using realistic verbs: designed, implemented, automated, collaborated
- [x] Wrote 3 project case studies: Context → Architecture → Tools → Decisions → Outcome
- [x] Added verified metrics only (no invented numbers):
  - 40% efficiency gain (Nintex → Power Automate migration)
  - 60% migration effort reduction (PowerShell automation)
  - 45% productivity improvement (form process automation)
  - 500+ GB SharePoint migration
  - 8 developers led

### Phase 3 — Visual Design Polish
- [x] Redesigned header (minimal, sticky, responsive)
- [x] Redesigned footer (ultra-minimal, copyright only)
- [x] Redesigned back-to-top button (square, chevron SVG, indigo border)
- [x] Fixed back-to-top gradient ring bug (`styles.css` override in `hamna-theme.css`)
- [x] Redesigned education section (card-based, consistent with experience)
- [x] Made experience cards consistent with projects cards (removed heavy animation)
- [x] Added skill chips design for Technical Skills section

### Phase 4 — Fonts, Colors & Size Audit
- [x] Standardized heading scale: 2.8rem → 2.2rem → 1.6rem → 1.2rem
- [x] Set body base: `font-size: 16px`, line-height `1.7`
- [x] Applied font pair consistently (`Plus Jakarta Sans` / `Inter`)
- [x] Fixed all low-contrast text (no light gray on white)
- [x] Standardized section padding and card spacing

### Phase 5 — Accessibility & ATS Audit
- [x] Converted all 7 content `<div class="section">` → `<section class="section" aria-label="...">`
- [x] Converted stats div → `<section>` with `aria-label="At a Glance"`
- [x] Added `aria-label` to all 4 contact cards
- [x] Added `rel="noopener noreferrer"` to all `target="_blank"` links
- [x] Fixed education section closing tag (`</div>` → `</section>`)
- [x] Fixed CSS syntax defect (missing newline, line ~202)
- [x] Removed dead CSS (~30 lines: `.hero-typed`, `.typed-role`, `.cursor`, `@keyframes cursorBlink`)
- [x] Removed `max-width: 780px` from `.career-profile` (text misalignment fix)
- [x] Added `max-width: none !important` to `.section-subtitle`

### Phase 6 — Subtle AI & Creative Touches
- [x] **Hero staggered entrance** — h1 → subtitle → bio → badges → CTA cascade-fade-up (70ms stagger each)
- [x] **Avatar ambient glow** — VK ring softly pulses every 5s, pauses on hover
- [x] **Availability dot** — 6px green pulsing dot on "Targeting PP Architect Roles" badge
- [x] **Section underline slide-in** — accent bar grows from centre on scroll (IntersectionObserver)
- [x] **Stats count-up** — numbers count 0→target over 900ms on scroll-in (IntersectionObserver)
- [x] **Current role shimmer** — "Current Role" badge pulses between two greens every 3.5s
- [x] All effects respect `prefers-reduced-motion: reduce`

---

## Verified Content (Do Not Invent Beyond These)

| Metric | Value |
|---|---|
| Years of experience | 11+ |
| Major projects | 7+ |
| Solutions delivered | 50+ |
| Certifications | 4 (PL-900, PL-100, PL-200, AZ-900) |
| Efficiency gain (Nintex→PA) | 40% |
| Migration effort reduction | 60% |
| Productivity improvement | 45% |
| SharePoint data migrated | 500+ GB |
| Developers led | 8 |

---

## Remaining / Future Work

| Priority | Task | Notes |
|---|---|---|
| High | Commit & push all changes to GitHub | `git add -A && git commit && git push` |
| Medium | Add JSON-LD `Person` schema | Richer ATS/search parsing |
| Medium | PL-600 certification — add when achieved | Update certifications section |
| Medium | Add 1–2 more project case studies | Copilot Studio specific projects |
| Low | Dark mode toggle | Only if stays simple and readable |
| Low | PDF resume auto-generation | Update `create_portfolio_pdf_playwright.py` |
| Low | Lighthouse audit | Target 90+ across all categories |

---

## CSS Override Reference

When making future changes, always use `hamna-theme.css`:

```css
/* Pattern for overriding styles.css high-specificity rules */
.some-class {
  property: value !important;
}
```

Key overrides already in place:

| `styles.css` rule | `hamna-theme.css` override |
|---|---|
| `.career-profile` max-width, text-align, color | Overridden with `!important` |
| `.section-subtitle` max-width 500px | `max-width: none !important` |
| `.back-to-top::before` gradient ring | `display: none !important` |
| `.back-to-top-inner` border-radius | `border-radius: 0 !important` |

---

## ATS Quality Checklist

- [x] Semantic HTML: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
- [x] Logical H1 → H2 → H3 hierarchy
- [x] All key info present as text (not only in images)
- [x] Descriptive section titles and plain-language descriptions
- [x] No skill bars with arbitrary percentages
- [x] No overclaiming language or inflated metrics
- [x] Keyboard navigation works for all links
- [x] `aria-label` on all interactive landmark elements
- [x] Contact info in plain text (not image-only)
- [ ] JSON-LD `Person` structured data *(future)*

---

*Portfolio reads like a real architect/developer profile — credible, human, architect-like.*
