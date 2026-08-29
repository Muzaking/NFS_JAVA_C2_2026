import { test, expect } from '@playwright/test';

test('Support Desk End-to-End Flow', async ({ page }) => {
  // 1. Open /login
  await page.goto('/login');

  // 2. Login as the seeded test user
  await page.fill('input[type="email"]', 'admin@example.com'); 
  await page.fill('input[type="password"]', 'Admin@12345'); 
  await page.click('button:has-text("Login")');

  // 3. Confirm the dashboard opens (waits for URL to change away from login)
  await page.waitForURL('**/app/tickets');
  
  // FIXED: Updated to look for the actual text on your dashboard
  await expect(page.locator('text=Tickets Page')).toBeVisible();

  // 4. Navigate directly to the new ticket form route
  await page.goto('/app/tickets/new');

  // 5. Submit one valid ticket 
  // IMPORTANT: If your actual React code uses a different placeholder (e.g., "Enter title..."), 
  // you MUST change "Ticket title" here to match your exact code!
  await page.fill('input[placeholder="Ticket title"]', 'E2E Playwright Ticket');
  await page.fill('textarea[placeholder="Describe the issue"]', 'Automated smoke test running successfully.');
  await page.click('button:has-text("Save")'); // Or "Submit", "Next", etc.

  // 6. Confirm the ticket appears in the list
  await page.waitForURL('**/app/tickets');
  await expect(page.locator('text=E2E Playwright Ticket').first()).toBeVisible();
});
