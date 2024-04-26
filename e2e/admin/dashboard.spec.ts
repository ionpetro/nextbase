import { expect, test } from '@playwright/test';
import { dashboardDefaultOrganizationIdHelper } from '../_helpers/dashboard-default-organization-id.helper';

test.describe.parallel('admin panel', () => {
  test('dashboard for a user with profile', async ({ browser }) => {
    const adminContext = await browser.newContext({
      storageState: 'playwright/.auth/admin.json',
    });
    const adminPage = await adminContext.newPage();
    const organizationId = await dashboardDefaultOrganizationIdHelper({
      page: adminPage,
    });

    // check that the text with exact match "Admin Panel" appears on the page on a span with data-testid "admin-panel-link"
    const anchorElement = await adminPage.waitForSelector(
      '[data-testid="admin-panel-link"]',
    );
    // expect to be an element of anchor type
    const isAnchor = await anchorElement.evaluate(
      (node) => node.tagName === 'A',
    );
    expect(isAnchor).toBe(true);

    const anchorText = await anchorElement.innerText();
    expect(anchorText).toBe('Admin Panel');
  });

  test('go to admin panel', async ({ browser }) => {
    const adminContext = await browser.newContext({
      storageState: 'playwright/.auth/admin.json',
    });
    const adminPage = await adminContext.newPage();
    await adminPage.goto('/app_admin');
    await adminPage.waitForTimeout(5000);

    // wait for h2 with text "quick stats"
    await adminPage.waitForSelector('h2:has-text("Quick Stats")');
  });
});
