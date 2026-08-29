import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  use: {
    // This tells Playwright where your React app is running
    baseURL: 'http://localhost:5173', 
    headless: true, // Set to false if you want to actually watch the browser open and click!
    screenshot: 'only-on-failure',
  },
});