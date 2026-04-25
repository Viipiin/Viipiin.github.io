# Copilot Instructions for Viipiin.github.io

## Project Overview

**Viipiin.github.io** is a responsive, single-page portfolio website showcasing expertise in Power Platform, SharePoint, and digital transformation. The site is built with vanilla HTML/CSS/JavaScript (no frameworks), deployed via GitHub Pages, and designed for both ATS systems and recruiters.

- **Type**: Static portfolio website (GitHub Pages)
- **Tech Stack**: HTML5 semantic markup, vanilla CSS3, vanilla JavaScript (ES6+)
- **No build tools**: Python/Node.js servers only for local development
- **Deployment**: Automatic on push to `main` via GitHub Pages

---

## Quick Commands

### Local Development

```bash
# Using Python (built-in)
python -m http.server 8000

# Using Node.js 
npx http-server -p 8000

# Visit: http://localhost:8000
```

### Testing with Playwright

```bash
# Install dependencies (one-time)
npm install

# Run all tests
npm test

# Run tests in headed mode (see browser)
npm run test:headed

# Run tests in interactive UI mode
npm run test:ui

# View HTML test report
npm run test:report

# Debug a specific test
npm run test:debug
```

### Deployment

- **Automatic**: Push to `main` → GitHub Actions → deployed to `https://viipiin.github.io`
- **Manual**: Settings → Pages → "Deploy from a branch" → `main` → `/ (root)`
- **Key file**: `.nojekyll` (tells GitHub Pages to skip Jekyll processing)

---

## High-Level Architecture

### File Structure

```
Viipiin.github.io/
├── index.html                    # Main portfolio (semantic, single-page)
├── assets/
│   ├── css/
│   │   ├── styles.css            # BASE styles (3814 lines, never modify directly)
│   │   ├── hamna-theme.css       # ALL overrides go here (~1171 lines)
│   │   ├── contact.css           # Contact page-specific styles
│   │   ├── back-to-top.css       # Back-to-top button styles
│   │   └── header-component.css  # Header component styles
│   ├── js/
│   │   ├── script.js             # Main site interactivity
│   │   ├── header-component.js   # Header component logic
│   │   ├── back-to-top.js        # Back-to-top button functionality
│   │   ├── contact-responsive.js # Contact form validation
│   │   └── header-component.js   # Header component logic
│   └── images/
│       └── favicon.svg           # Site icon
├── pages/
│   ├── blog.html                 # Blog listing page
│   └── contact.html              # Contact form page
├── Blogs/
│   ├── README.md                 # Blog architecture docs
│   ├── [articles].html           # Individual blog articles
│   └── assets/
│       ├── css/
│       │   ├── blog-template.css
│       │   └── blog-components.css
│       └── js/
│           ├── blog-components.js
│           ├── blog-interactions.js
│           └── blog-generator.js
├── components/                   # Reusable web components
├── demos/                        # Component demo pages
├── docs/
│   └── DEPLOYMENT_GUIDE.md      # GitHub Pages deployment
├── PROJECT_STRUCTURE.md          # Organization reference
├── PLAN.md                       # Design decisions & verified metrics
└── README.md                     # Feature overview
```

### Key Architectural Decisions

| Decision | Choice | Reason |
|----------|--------|--------|
| **CSS Strategy** | `hamna-theme.css` override layer | Never modify `styles.css` directly (it's large & base); use theme layer for all changes |
| **No CSS Framework** | Vanilla CSS3 + CSS Grid/Flexbox | Lightweight, fast, full control |
| **No JS Framework** | Vanilla ES6+ classes | No build tools, fast, modular |
| **Responsive Breakpoints** | 480px (mobile), 768px (tablet), 768px+ (desktop) | Mobile-first approach |
| **Deployment** | GitHub Pages + `.nojekyll` | Simple, no server needed, automatic on push |
| **Color System** | Theme variables in CSS | Indigo/purple palette (subtle, professional) |

### Theme Color Tokens

All colors stored in CSS custom properties. Key colors:

- **Primary**: `#312E81` (indigo, headings/accents)
- **Accent**: `#6366f1` (indigo, links/badges)
- **Highlight BG**: `#eef2ff` (skill chips)
- **Text**: `#111827` (body), `#374151` (paragraphs), `#64748B` (muted)

---

## CSS Modification Guidelines

### Override Pattern (CRITICAL)

**ALWAYS** use `hamna-theme.css` for any CSS changes. Never modify `styles.css`:

```css
/* In hamna-theme.css (use !important for high-specificity overrides) */
.some-class {
  property: value !important;
}
```

### Current Overrides (as reference)

| `styles.css` rule | Override in `hamna-theme.css` |
|---|---|
| `.career-profile` (max-width, text-align) | Overridden with `!important` |
| `.section-subtitle` max-width | `max-width: none !important` |
| `.back-to-top::before` gradient ring | `display: none !important` |
| `.back-to-top-inner` border-radius | `border-radius: 0 !important` |

### Media Query Breakpoints

```css
/* Mobile-first approach */
@media (max-width: 480px) {
  /* Mobile-specific rules */
}

@media (max-width: 768px) {
  /* Tablet-specific rules */
}

@media (min-width: 769px) {
  /* Desktop-specific rules */
}
```

---

## JavaScript Conventions

### Modular Class Structure

Main site uses object-oriented ES6 classes (see `assets/js/script.js`):

```javascript
class ResponsiveManager {
  // Handles device detection and responsive behavior
}

class FormManager {
  // Manages form validation and submission
}

class InteractiveFeatures {
  // Controls interactive elements and animations
}
```

### Component Pattern

Blog system uses a utility-based pattern:

```javascript
// Blog components API
BlogComponents.addBackToTop()
BlogComponents.addRelatedArticles(articles)
BlogComponents.addShareSection(title, description)
BlogComponents.copyCode(element)
```

### Accessibility & Performance

- All animations respect `prefers-reduced-motion: reduce`
- IntersectionObserver for scroll-triggered animations
- Smooth scroll for back-to-top
- Form validation with real-time feedback
- Keyboard support (e.g., blog keyboard shortcuts: B for back, C for copy)

---

## Blog System Architecture

### Creating a New Blog Article

1. **Copy the template**: `Blogs/assets/article-template.html`
2. **Update metadata**: Title, description, author, tags, publish date
3. **Add content**: Use reusable blog components (see `Blogs/README.md`)
4. **Add to listing**: Include in `pages/blog.html`
5. **Test**: Verify responsiveness on mobile/tablet/desktop

### Blog Components Available

- **Navigation**: Fixed navbar with scroll effects
- **Hero Section**: Article metadata and title
- **Code Blocks**: With copy functionality
- **Method Cards**: Highlighted approach cards (recommended/alternative/warning)
- **Alert Boxes**: Info, warning, success, error, tip
- **Back-to-Top**: Progress indicator
- **Related Articles & Share Section**: Auto-linked

All styled with CSS custom properties for consistency. See `Blogs/README.md` for full documentation.

---

## Key Conventions

### Semantic HTML

- Always use semantic tags: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
- Heading hierarchy: H1 (page title) → H2 (sections) → H3 (subsections) — never skip levels
- Use `aria-label` on landmark sections for accessibility

### File Paths

- **From root**: `assets/css/styles.css`, `assets/js/script.js`
- **From `pages/`**: `../assets/css/styles.css` (go up one level)
- **From `Blogs/`**: Use relative paths carefully (many articles already in subdirectory)
- **Always use forward slashes** in href/src attributes (browsers normalize them)

### Link Consistency

- **Home**: Link to `index.html` or `../index.html` (depending on location)
- **Blog listing**: `pages/blog.html` or `../pages/blog.html`
- **Blog article**: Use relative paths from current location
- **Contact**: `pages/contact.html` or `../pages/contact.html`

### Form Validation

- Use `FormManager` class for contact form validation
- Provide real-time feedback via `NotificationManager`
- Prevent multiple submissions
- Validate: name, email (format), message (non-empty)

### Performance Considerations

- Lazy load images where possible
- Minimize CSS/JS imports in blog articles
- Use CSS variables for consistent theming (no magic colors)
- Avoid inline event handlers; use event delegation or classes

---

## Important Content Guidelines

### ATS & Recruiter Friendly

- **No overclaiming**: All metrics in PLAN.md are verified (11+ years, 7+ projects, 50+ solutions, 4 certs)
- **Realistic verbs**: Use "designed," "implemented," "automated," "collaborated" (not buzzwords)
- **Plain language**: Avoid hype; be clear and grounded
- **Semantic structure**: Proper H1→H2→H3 hierarchy, no skipped levels
- **Accessible contrast**: All text meets WCAG AA standards (minimum 4.5:1 for body text)

### Verified Metrics (Do Not Invent Beyond These)

| Metric | Value |
|--------|-------|
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

## Testing & Validation

### Automated Testing with Playwright

This project includes comprehensive E2E tests using **Playwright**. Tests cover:

- **Responsive Design**: Mobile (480px), tablet (768px), desktop (1400px+)
- **Cross-Browser**: Chromium, Firefox, WebKit (Safari)
- **Mobile Devices**: Pixel 5 (Android), iPhone 12 (iOS), iPad Pro
- **Navigation**: Link integrity, page transitions
- **Accessibility**: Heading hierarchy, semantic landmarks, keyboard navigation
- **Performance**: Load time, console errors

#### Running Tests

```bash
npm test                # Run all tests (headless)
npm run test:headed     # See browser during test
npm run test:ui         # Interactive UI mode (best for development)
npm run test:debug      # Step through test with debugger
npm run test:report     # View HTML test report
```

#### Test Files

- `tests/homepage.spec.ts` — Homepage tests (responsive, navigation, back-to-top, accessibility)
- `tests/pages.spec.ts` — Blog and contact page tests (navigation, forms, links)

See `PLAYWRIGHT.md` for detailed testing documentation.

### Manual Testing

1. **Responsive Design**: Test at 480px, 768px, and desktop (1200px+)
2. **Navigation**: Verify all links work (home, blog, contact, external)
3. **Forms**: Test validation with valid/invalid inputs
4. **Blog Components**: Verify back-to-top, code copy, related articles
5. **Accessibility**: Check keyboard navigation, screen reader compatibility, color contrast

### Browser Support

- ✅ Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

### Lighthouse Scores

Target 95+ across Performance, Accessibility, Best Practices, and SEO.

---

## Deployment Checklist

- [ ] All links tested (no 404s)
- [ ] Responsive design verified (480px, 768px, desktop)
- [ ] Forms validated
- [ ] Images optimized and loading
- [ ] No console errors
- [ ] WCAG contrast ratio met
- [ ] Keyboard navigation works
- [ ] Commit message includes Co-authored-by trailer (see below)
- [ ] Push to `main` branch

### Git Commit Template

```
<subject>

<body>

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>
```

---

## Updating the Portfolio

### To Add a Project Case Study

1. Add section to index.html with: Context → Architecture → Tools → Decisions → Outcome
2. Style using existing `.project-card` pattern in `hamna-theme.css`
3. Include only verified, realistic metrics
4. Test on mobile/tablet/desktop

### To Add a Certification

1. Update the certifications section in `index.html`
2. Add cert name, issuer, date
3. Link to verification if available
4. Test responsiveness

### To Add a Blog Article

1. Copy `Blogs/assets/article-template.html` as starting point
2. Update metadata (title, description, author, tags, date)
3. Use blog components from `Blogs/assets/js/blog-components.js`
4. Add to `pages/blog.html` blog listing
5. Test all interactive features (back-to-top, code copy, etc.)

---

## Common Tasks & Patterns

### Modify Theme Colors

Edit CSS custom properties in `hamna-theme.css`:

```css
:root {
  --primary: #312E81;
  --accent: #6366f1;
  --highlight-bg: #eef2ff;
  /* ... rest of tokens */
}
```

### Add a New Page

1. Create HTML file in `/pages/`
2. Reference: `../assets/css/styles.css`, `../assets/js/script.js`
3. Update navigation in all pages
4. Test links and responsiveness

### Fix a Broken Link

1. Check relative paths from current file location
2. Use `../` to go up directories
3. Use `/` for absolute paths from root (works on GitHub Pages)
4. Test in local dev server before pushing

### Debug a CSS Issue

1. Check `hamna-theme.css` for overrides first
2. Use browser DevTools to inspect computed styles
3. Look for specificity conflicts (`.class` vs `#id` vs `!important`)
4. Ensure media queries match viewport

---

## Resources

- **README.md** — Feature overview and getting started
- **PROJECT_STRUCTURE.md** — File organization reference
- **PLAN.md** — Architecture decisions, color tokens, verified metrics
- **Blogs/README.md** — Blog component system documentation
- **docs/DEPLOYMENT_GUIDE.md** — GitHub Pages deployment details

---

*Last Updated: April 2026*  
*Portfolio designed to showcase Power Platform expertise with ATS/recruiter-friendly content.*
