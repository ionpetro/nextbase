import { test } from '@playwright/test';
import { createFeedbackHelper } from 'e2e/_helpers/create-feedback.spec';

test.describe('create new feedback', () => {
  test('user can create feedback', async ({ page }) => {
    await createFeedbackHelper(page);
  });
});
