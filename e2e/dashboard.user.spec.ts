import { test } from '@playwright/test';

test('test', async ({ page }) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto('/dashboard')
});
