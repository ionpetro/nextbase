import { expect, type Page } from '@playwright/test';

export async function createFeedbackHelper(page: Page) {
  await page.goto('/dashboard');
  await page.waitForTimeout(5000);

  const avatar = page.locator('[data-testid="user-nav-avatar"]');

  if (avatar) {
    await avatar.click();
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
