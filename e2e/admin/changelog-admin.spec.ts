import { expect, test } from '@playwright/test';

test.describe('Admin can create a new changelog', () => {
  test('admin can create new feedback', async ({ browser }) => {
    const adminContext = await browser.newContext({
      storageState: 'playwright/.auth/admin.json',
    });
    const adminPage = await adminContext.newPage();

    await adminPage.goto('/changelog');
    const createChangelogButton = await adminPage.waitForSelector(
      '[name="create-changelog-button"]',
    );
    await createChangelogButton.click();

    const createChangelogForm = await adminPage.waitForSelector(
      '[data-testid="create-changelog-form"]',
    );

    const changelogTitleInput =
      await createChangelogForm.waitForSelector('[name="title"]');

    await changelogTitleInput.fill('Changelog Title');

    const submitChangelogButton = await createChangelogForm.waitForSelector(
      '[name="submit-changelog"]',
    );

    await submitChangelogButton.click();

    await adminPage.goto('/changelog');

    const changelog = await adminPage.waitForSelector('text=Changelog Title');

    expect(changelog).toBeDefined();
  });
});
