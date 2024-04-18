import { test } from '@playwright/test';
import { createFeedbackHelper } from 'e2e/_helpers/create-feedback.spec';
import { onboardUserHelper } from 'e2e/_helpers/onboard-user.helper';
import { signupUserHelper } from 'e2e/_helpers/signup.helper';

function getIdentifier(): string {
  return `adminjoe` + Date.now().toString().slice(-4);
}

test.describe('Admin can change feedback fields', () => {
  const identifier = getIdentifier();
  const emailAddress = `${identifier}@myapp.com`;

  test('admin can create new feedback', async ({ page }) => {
    await signupUserHelper({ page, emailAddress, identifier });
    await onboardUserHelper({ page, name: 'Admin Joe' });
    await createFeedbackHelper(page);

    await page.goto('/feedback');
    await page.waitForTimeout(5000);

    const feedbacks = await page.locator('[data-testid="feedback-item"]');
    const firstFeedback = await feedbacks.first();

    const actionsButton = await page.locator(
      '[data-testid="feedback-actions-dropdown-button"]',
    );
    await actionsButton.click();

    const openForCommentsButton = await actionsButton.locator(
      '[data-testid="open-for-comments-button"]',
    );
    await openForCommentsButton.click();

    await page.waitForSelector('text=Open for comments');

    const isVisibleButton = await actionsButton.locator(
      '[data-testid="show-thread-button"]',
    );
    await isVisibleButton.click();

    await page.waitForSelector('text=Shown to public');
  });
});
