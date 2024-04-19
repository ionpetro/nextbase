import { test } from '@playwright/test';
import { createFeedbackHelper } from 'e2e/_helpers/create-feedback.spec';

test.describe('Admin can change feedback fields', () => {
  test('admin can create new feedback', async ({ browser }) => {
    const adminContext = await browser.newContext({
      storageState: 'playwright/.auth/admin.json',
    });
    const adminPage = await adminContext.newPage();
    await createFeedbackHelper(adminPage);
  });

  test('admin can change feedback fields', async ({ browser }) => {
    const adminContext = await browser.newContext({
      storageState: 'playwright/.auth/admin.json',
    });
    const adminPage = await adminContext.newPage();

    await adminPage.goto('/feedback');
    await adminPage.waitForTimeout(5000);

    const actionsButton = await adminPage.waitForSelector(
      '[data-testid="feedback-actions-dropdown-button"]',
    );
    if (actionsButton) {
      await actionsButton.click();
    }

    const openForCommentsButton = await adminPage.waitForSelector(
      '[data-testid="open-for-comments-button"]',
    );

    if (openForCommentsButton) {
      await openForCommentsButton.click();
    }

    await adminPage.waitForSelector('text=Open for comments');
  });

  test('admin can add a comment', async ({ browser }) => {
    const adminContext = await browser.newContext({
      storageState: 'playwright/.auth/admin.json',
    });
    const adminPage = await adminContext.newPage();

    await adminPage.goto('/feedback');
    await adminPage.waitForTimeout(5000);

    const addCommentForm = await adminPage.waitForSelector(
      '[data-testid="add-comment-form"]',
    );

    const textArea = await addCommentForm.waitForSelector(
      '[name="comment-area"]',
    );

    if (textArea) {
      await textArea.fill('This is a test comment');
    }

    const sendButton = await addCommentForm.waitForSelector(
      '[name="add-comment-button"]',
    );

    if (sendButton) {
      await sendButton.click();
    }

    await adminPage.waitForSelector('text=Comment added');
  });
});
