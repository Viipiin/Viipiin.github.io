# Playwright Testing Guide

This project uses **Playwright** for end-to-end testing across multiple browsers and device viewports.

## Setup

### Install Dependencies

```bash
npm install
```

This installs `@playwright/test` and sets up Playwright browsers.

## Running Tests

### Run All Tests

```bash
npm test
```

### Run Tests in Headed Mode (See Browser)

```bash
npm run test:headed
```

### Run Tests in Debug Mode

```bash
npm run test:debug
```

### Run Tests in UI Mode (Interactive)

```bash
npm run test:ui
```

### View HTML Report

```bash
npm run test:report
```

## Test Structure

### `tests/homepage.spec.ts`

Tests for the main portfolio homepage:
- **Responsive Design**: Tests at 480px (mobile), 768px (tablet), and desktop (1400px)
- **Navigation Links**: Verifies blog, contact, and external links
- **Back-to-Top**: Tests button visibility and scroll functionality
- **Accessibility**: Heading hierarchy, semantic landmarks, keyboard navigation
- **Performance**: Load time and console errors

### `tests/pages.spec.ts`

Tests for secondary pages (blog, contact):
- **Blog Page**: Rendering, article links, responsiveness
- **Contact Page**: Form fields, form validation, responsiveness
- **Navigation Between Pages**: Link traversal
- **Link Integrity**: Checks for broken links

## Browser Coverage

Playwright runs tests on:

- **Desktop**: Chromium, Firefox, WebKit (Safari)
- **Mobile**: Pixel 5 (Android), iPhone 12 (iOS)
- **Tablet**: iPad Pro

See `playwright.config.ts` for device profiles.

## Viewport Sizes Tested

| Device | Width × Height |
|--------|---|
| Mobile | 480px × 640px |
| Tablet | 768px × 1024px |
| Desktop | 1024px × 768px |
| Large Desktop | 1400px × 900px |
| Pixel 5 | 393px × 851px |
| iPhone 12 | 390px × 844px |
| iPad Pro | 1024px × 1366px |

## Configuration

### `playwright.config.ts`

Key settings:

```typescript
// Base URL for testing
baseURL: 'http://localhost:8000',

// Web server auto-start
webServer: {
  command: 'python -m http.server 8000',
  url: 'http://localhost:8000',
},

// Reporters
reporter: ['html', 'list', 'junit'],

// Screenshots & Videos
screenshot: 'only-on-failure',
video: 'retain-on-failure',
```

## Before Running Tests

Ensure:

1. **No other processes** are using port 8000
2. **Node.js installed** (`node --version`)
3. **Dependencies installed** (`npm install`)
4. **All files committed** (tests should reflect production state)

## Troubleshooting

### Port 8000 Already in Use

```bash
# Check what's using port 8000
lsof -i :8000  # macOS/Linux

# Kill the process
kill -9 <PID>

# On Windows, use Task Manager or:
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

### Tests Timeout

Increase timeout in `playwright.config.ts`:

```typescript
timeout: 60 * 1000,  // Increase from 30s to 60s
```

### Browser Cache Issues

```bash
# Remove browser data
rm -rf ~/Library/Caches/ms-playwright-chromium  # macOS
rm -rf ~/.cache/ms-playwright                    # Linux
```

## CI/CD Integration

For GitHub Actions, add to `.github/workflows/test.yml`:

```yaml
name: Playwright Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
      - run: npm install
      - run: npm test
      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

## Writing New Tests

### Test Structure

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test('should do something specific', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toBeVisible();
  });
});
```

### Common Patterns

```typescript
// Navigate
await page.goto('/');
await page.goto('/pages/contact.html');

// Click
await page.locator('a:has-text("Blog")').click();

// Fill form
await page.fill('input[name="email"]', 'test@example.com');

// Assertions
await expect(page.locator('h1')).toBeVisible();
await expect(page.locator('a')).toHaveAttribute('href', /blog/);
await expect(page).toHaveURL(/blog/);

// Responsive testing
await page.setViewportSize({ width: 480, height: 640 });
```

### Selectors

```typescript
// By text
page.locator('a:has-text("Blog")')

// By attribute
page.locator('input[name="email"]')

// By role
page.locator('button[type="submit"]')

// By placeholder
page.locator('[placeholder="Your name"]')

// Complex
page.locator('section >> a:has-text("Read")')
```

## Performance Tips

1. **Reuse pages**: Set up shared page/context where possible
2. **Parallel execution**: Tests run in parallel by default
3. **Use fixtures**: For common setup (see Playwright docs)
4. **Headless mode**: Faster than headed (default)

## Resources

- [Playwright Documentation](https://playwright.dev)
- [Selectors](https://playwright.dev/docs/selectors)
- [Assertions](https://playwright.dev/docs/test-assertions)
- [Best Practices](https://playwright.dev/docs/best-practices)

---

**Questions?** Refer to `.github/copilot-instructions.md` for project context.
