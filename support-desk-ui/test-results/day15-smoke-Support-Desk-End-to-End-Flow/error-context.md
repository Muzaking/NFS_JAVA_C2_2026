# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: day15-smoke.spec.js >> Support Desk End-to-End Flow
- Location: e2e\day15-smoke.spec.js:3:1

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.fill: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('input[type="email"]')

```

# Page snapshot

```yaml
- generic [active] [ref=e1]: Login Page (Coming Soon)
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test('Support Desk End-to-End Flow', async ({ page }) => {
  4  |   // 1. Open /login
  5  |   await page.goto('/login');
  6  | 
  7  |   // 2. Login as the seeded test user
> 8  |   await page.fill('input[type="email"]', 'test@example.com'); // <-- CHANGE TO YOUR DB TEST EMAIL
     |              ^ Error: page.fill: Test timeout of 30000ms exceeded.
  9  |   await page.fill('input[type="password"]', 'password123'); // <-- CHANGE TO YOUR DB TEST PASSWORD
  10 |   await page.click('button:has-text("Login")');
  11 | 
  12 |   // 3. Confirm the dashboard opens (waits for URL to change away from login)
  13 |   await page.waitForURL('**/app/tickets');
  14 |   await expect(page.locator('text=Protected Tickets')).toBeVisible();
  15 | 
  16 |   // 4. Open the Create Ticket form (adjust the button text if yours is different)
  17 |   // If your form is already visible on the tickets page, it will just skip this click
  18 |   const createBtn = page.locator('button:has-text("Create Ticket"), button:has-text("New Ticket")');
  19 |   if (await createBtn.isVisible()) {
  20 |     await createBtn.click();
  21 |   }
  22 | 
  23 |   // 5. Submit one valid ticket (using the exact placeholders from Exercise 5)
  24 |   await page.fill('input[placeholder="Ticket title"]', 'E2E Playwright Ticket');
  25 |   await page.fill('textarea[placeholder="Describe the issue"]', 'Automated smoke test running successfully.');
  26 |   await page.click('button:has-text("Save")');
  27 | 
  28 |   // 6. Confirm the ticket appears in the list
  29 |   await expect(page.locator('text=E2E Playwright Ticket').first()).toBeVisible();
  30 | });
```