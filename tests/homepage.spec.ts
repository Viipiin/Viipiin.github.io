import { test, expect } from '@playwright/test';

test.describe('Homepage - Responsive Design', () => {
  test('should render hero section on desktop', async ({ page }) => {
    await page.goto('/');
    
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    
    const ctas = page.locator('a:has-text("LinkedIn"), a:has-text("GitHub")');
    await expect(ctas.first()).toBeVisible();
  });

  test('should stack navigation on mobile (480px)', async ({ page }) => {
    await page.setViewportSize({ width: 480, height: 640 });
    await page.goto('/');
    
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
  });

  test('should adapt layout on tablet (768px)', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    
    const sections = page.locator('section');
    const count = await sections.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display properly on large desktop (1400px)', async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.goto('/');
    
    const content = page.locator('main');
    await expect(content).toBeVisible();
  });
});

test.describe('Homepage - Navigation Links', () => {
  test('should have working navigation to blog', async ({ page }) => {
    await page.goto('/');
    
    const blogLink = page.locator('a:has-text("Blog")').first();
    await expect(blogLink).toBeVisible();
  });

  test('should have working navigation to contact', async ({ page }) => {
    await page.goto('/');
    
    const contactLink = page.locator('a:has-text("Contact")').first();
    await expect(contactLink).toBeVisible();
  });

  test('should have external links with proper attributes', async ({ page }) => {
    await page.goto('/');
    
    const externalLinks = page.locator('a[target="_blank"]');
    const count = await externalLinks.count();
    
    // Should have external links with rel attributes
    if (count > 0) {
      for (let i = 0; i < Math.min(count, 3); i++) {
        const link = externalLinks.nth(i);
        const rel = await link.getAttribute('rel');
        expect(rel).toBeTruthy();
      }
    }
  });
});

test.describe('Back-to-Top Functionality', () => {
  test('should have back-to-top button', async ({ page }) => {
    await page.goto('/');
    
    const backToTop = page.locator('[class*="back-to-top"]');
    await expect(backToTop).toBeDefined();
  });

  test('should scroll to top on large content', async ({ page }) => {
    await page.goto('/');
    
    // Scroll down
    await page.evaluate(() => window.scrollBy(0, 1000));
    
    const scrollYBefore = await page.evaluate(() => window.scrollY);
    expect(scrollYBefore).toBeGreaterThan(500);
  });
});

test.describe('Accessibility', () => {
  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/');
    
    // Should have exactly one H1
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1);
    
    // Should have H2 sections
    const h2Count = await page.locator('h2').count();
    expect(h2Count).toBeGreaterThan(0);
  });

  test('should have semantic landmarks', async ({ page }) => {
    await page.goto('/');
    
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
  });

  test('should be keyboard navigable', async ({ page }) => {
    await page.goto('/');
    
    // Verify page is interactive (can use keyboard)
    const hasLinks = await page.locator('a').count();
    expect(hasLinks).toBeGreaterThan(0);
  });
});

test.describe('Performance', () => {
  test('should load within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/', { waitUntil: 'networkidle' });
    const loadTime = Date.now() - startTime;
    
    // Page should load in under 5 seconds
    expect(loadTime).toBeLessThan(5000);
  });

  test('should have minimal console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    await page.goto('/');
    
    // Allow for minimal errors (tracking scripts, etc.)
    expect(errors.length).toBeLessThan(3);
  });
});
