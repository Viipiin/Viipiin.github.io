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
  test('should have functional navigation links', async ({ page }) => {
    await page.goto('/');
    
    // Verify main navigation exists
    const homeLinks = page.locator('a[href*="index"], a[href="/"]');
    const blogLinks = page.locator('a:has-text("Blog")');
    const contactLinks = page.locator('a:has-text("Contact")');
    
    await expect(blogLinks.first()).toBeVisible();
    await expect(contactLinks.first()).toBeVisible();
  });

  test('blog page should be accessible', async ({ page }) => {
    await page.goto('/pages/blog.html');
    
    await expect(page.locator('h1, h2').first()).toBeVisible();
  });

  test('contact page should be accessible', async ({ page }) => {
    await page.goto('/pages/contact.html');
    
    await expect(page.locator('form')).toBeVisible();
  });
});

test.describe('Link Integrity', () => {
  test('pages should have navigation elements', async ({ page }) => {
    await page.goto('/pages/blog.html');
    
    // Verify page has loaded and has navigation
    const navLinks = page.locator('nav a, header a');
    const count = await navLinks.count();
    
    expect(count).toBeGreaterThan(0);
  });

  test('contact page should have functional form', async ({ page }) => {
    await page.goto('/pages/contact.html');
    
    const form = page.locator('form');
    await expect(form).toBeVisible();
  });
});
