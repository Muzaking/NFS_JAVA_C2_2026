import { test, expect } from '@playwright/test';

test('Support Desk End-to-End Flow', async ({ page }) => {
  // 1. Open /login
  await page.goto('/login');

  // 2. Login as the seeded test user
  await page.fill('input[type="email"]', 'test@example.com'); // <-- CHANGE TO YOUR DB TEST EMAIL
  await page.fill('input[type="password"]', 'password123'); // <-- CHANGE TO YOUR DB TEST PASSWORD
  await page.click('button:has-text("Login")');

  // 3. Confirm the dashboard opens (waits for URL to change away from login)
  await page.waitForURL('**/app/tickets');
  await expect(page.locator('text=Protected Tickets')).toBeVisible();

  // 4. Open the Create Ticket form (adjust the button text if yours is different)
  // If your form is already visible on the tickets page, it will just skip this click
  const createBtn = page.locator('button:has-text("Create Ticket"), button:has-text("New Ticket")');
  if (await createBtn.isVisible()) {
    await createBtn.click();
  }

  // 5. Submit one valid ticket (using the exact placeholders from Exercise 5)
  await page.fill('input[placeholder="Ticket title"]', 'E2E Playwright Ticket');
  await page.fill('textarea[placeholder="Describe the issue"]', 'Automated smoke test running successfully.');
  await page.click('button:has-text("Save")');

  // 6. Confirm the ticket appears in the list
  await expect(page.locator('text=E2E Playwright Ticket').first()).toBeVisible();
});