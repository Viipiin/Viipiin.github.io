# _archive/ — Unused Files

This folder contains files that were removed from the main repository to reduce clutter. They are preserved here in case you need them later.

## Contents

### React/TypeScript Components (Not Used)
- `RuntimeTypes.ts` — TypeScript runtime type definitions
- `account-card-gallery.tsx` — React card gallery component
- `ui-controls-showcase.tsx` — React UI controls showcase

### PDF Generation (Not Used)
- `create_portfolio_pdf.py` — Python PDF generator script
- `create_portfolio_pdf_playwright.py` — Playwright-based PDF generator
- `pdf_generator.html` — HTML page for PDF generation demo

### Standalone Component (Merged into assets/)
- `back-to-top-component.js` — Moved to `assets/js/`

### Blog System (Not Integrated)
- `Blogs/` — Blog articles and templates (not linked from blog.html)
- `Blogs/assets/` — Blog-specific CSS and JavaScript

### Component Files (Moved to assets/)
- `components/` — Header and footer components (now in `assets/`)

### Demo & Doc Pages
- `demos/` — Demo pages for components
- `docs/` — Additional documentation (DEPLOYMENT_GUIDE.md)

### Resume PDF
- `Downloadable Profile/` — Profile PDF (not used on portfolio)

---

## How to Recover Files

If you need any of these files:

1. **For blog articles**: Copy from `_archive/Blogs/` to `Blogs/` and link from `pages/blog.html`
2. **For PDF generation**: Check `_archive/create_portfolio_pdf.py` or `_archive/create_portfolio_pdf_playwright.py`
3. **For components**: Review `_archive/components/` and integrate into `assets/`
4. **For demos**: Check `_archive/demos/` for reference implementations

---

## Current Active Structure

Your active portfolio uses:
- **index.html** — Main portfolio page
- **pages/blog.html** — Blog listing page
- **pages/contact.html** — Contact form page
- **assets/** — CSS, JavaScript, images (all integrated)
- **tests/** — Playwright E2E tests

---

To reactivate archived content, move files from `_archive/` back to the root directory.
