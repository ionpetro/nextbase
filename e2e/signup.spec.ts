import { expect, test } from '@playwright/test';

test('should have title in signup page', async ({ page }) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto('/sign-up')
  await expect(page.locator('h1')).toContainText('Signup to Nextbase')
});

