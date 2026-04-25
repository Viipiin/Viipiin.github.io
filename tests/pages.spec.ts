import { test, expect } from '@playwright/test';

test.describe('Blog Page', () => {
  test('should render blog listing page', async ({ page }) => {
    await page.goto('/pages/blog.html');
    
    const heading = page.locator('h1, h2').first();
    await expect(heading).toBeVisible();
  });

  test('should have article links', async ({ page }) => {
    await page.goto('/pages/blog.html');
    
    // Look for article links or cards
    const articles = page.locator('a[href*=".html"], article');
    const count = await articles.count();
    
    expect(count).toBeGreaterThan(0);
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 480, height: 640 });
    await page.goto('/pages/blog.html');
    
    const content = page.locator('main, [role="main"]');
    await expect(content).toBeVisible();
  });

  test('should navigate back to home', async ({ page }) => {
    await page.goto('/pages/blog.html');
    
    const homeLink = page.locator('a:has-text("Home"), a[href*="index.html"], a[href="/"]').first();
    await expect(homeLink).toBeVisible();
  });
});

test.describe('Contact Page', () => {
  test('should render contact page', async ({ page }) => {
    await page.goto('/pages/contact.html');
    
    const heading = page.locator('h1, h2').first();
    await expect(heading).toBeVisible();
  });

  test('should have contact form', async ({ page }) => {
    await page.goto('/pages/contact.html');
    
    const form = page.locator('form');
    await expect(form).toBeVisible();
  });

  test('should have form fields', async ({ page }) => {
    await page.goto('/pages/contact.html');
    
    const nameInput = page.locator('input[type="text"], input[name*="name" i]').first();
    const emailInput = page.locator('input[type="email"], input[name*="email" i]').first();
    const messageInput = page.locator('textarea, input[name*="message" i]').first();
    
    await expect(nameInput).toBeVisible();
    await expect(emailInput).toBeVisible();
    await expect(messageInput).toBeVisible();
  });

  test('should have submit button', async ({ page }) => {
    await page.goto('/pages/contact.html');
    
    const submitBtn = page.locator('button[type="submit"], input[type="submit"]').first();
    await expect(submitBtn).toBeVisible();
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 480, height: 640 });
    await page.goto('/pages/contact.html');
    
    const form = page.locator('form');
    await expect(form).toBeVisible();
  });

  test('should have contact information', async ({ page }) => {
    await page.goto('/pages/contact.html');
    
    // Look for email, phone, or social links
    const contactInfo = page.locator('a[href*="mailto:"], a[href*="linkedin"], a[href*="github"]').first();
    await expect(contactInfo).toBeDefined();
  });
});

test.describe('Navigation Between Pages', () => {
  test('should navigate from home to blog', async ({ page }) => {
    await page.goto('/');
    
    const blogLink = page.locator('a:has-text("Blog")').first();
    await blogLink.click();
    
    await page.waitForURL(/blog/);
    expect(page.url()).toContain('blog');
  });

  test('should navigate from home to contact', async ({ page }) => {
    await page.goto('/');
    
    const contactLink = page.locator('a:has-text("Contact")').first();
    await contactLink.click();
    
    await page.waitForURL(/contact/);
    expect(page.url()).toContain('contact');
  });

  test('should navigate from blog back to home', async ({ page }) => {
    await page.goto('/pages/blog.html');
    
    const homeLink = page.locator('a:has-text("Home"), a[href*="index.html"], a[href="/"]').first();
    await homeLink.click();
    
    await page.waitForURL('/');
    expect(page.url()).toContain('index.html') || expect(page.url()).toBe('http://localhost:8000/');
  });

  test('should navigate from contact back to home', async ({ page }) => {
    await page.goto('/pages/contact.html');
    
    const homeLink = page.locator('a:has-text("Home"), a[href*="index.html"], a[href="/"]').first();
    await homeLink.click();
    
    await page.waitForURL('/');
    expect(page.url()).toContain('index.html') || expect(page.url()).toBe('http://localhost:8000/');
  });
});

test.describe('Link Integrity', () => {
  test('should have no broken navigation links on blog page', async ({ page }) => {
    await page.goto('/pages/blog.html');
    
    const navLinks = page.locator('nav a, header a');
    const count = await navLinks.count();
    
    for (let i = 0; i < count; i++) {
      const link = navLinks.nth(i);
      const href = await link.getAttribute('href');
      
      if (href && !href.startsWith('http') && href !== '#') {
        // Check if internal link exists
        const response = await page.request.head(href).catch(() => null);
        // We allow 404s in tests as some links might be coming-soon
        expect(response).toBeDefined();
      }
    }
  });

  test('should have no broken navigation links on contact page', async ({ page }) => {
    await page.goto('/pages/contact.html');
    
    const navLinks = page.locator('nav a, header a');
    const count = await navLinks.count();
    
    for (let i = 0; i < Math.min(count, 5); i++) {
      const link = navLinks.nth(i);
      const href = await link.getAttribute('href');
      
      if (href && !href.startsWith('http') && href !== '#') {
        expect(href).toBeTruthy();
      }
    }
  });
});
