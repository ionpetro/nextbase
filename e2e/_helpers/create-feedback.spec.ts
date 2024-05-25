import { expect, type Page } from '@playwright/test';

export async function createFeedbackHelper(page: Page) {
  await page.goto('/dashboard');

  const userNavAvatar = await page.waitForSelector(
    'div[data-testid="user-nav-avatar"]',
  );

  await page.waitForTimeout(12000);

  if (userNavAvatar) {
    await userNavAvatar.click();
  }

  const feedbackLink = page.locator('[data-testid="feedback-link"]');

  if (feedbackLink) {
    await feedbackLink.click();
  }

  const form = page.locator('[data-testid="give-feedback-form"]');
  await expect(form).toBeVisible();

  const titleInput = form.locator('[name="title"]');
  await expect(titleInput).toBeVisible();
  await titleInput.fill('Test title');

  const contentInput = form.locator('[name="content"]');
  await expect(contentInput).toBeVisible();
  await contentInput.fill('Test content');

  const submitButton = page.locator('[data-testid="submit-feedback-button"]');
  await expect(submitButton).toBeVisible();
  await submitButton.click();
}
