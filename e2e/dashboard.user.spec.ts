import { test } from '@playwright/test';

test('dashboard for a user with profile', async ({ page }) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto('/dashboard');
  // wait for the url to change to `/organization/<organizationUUID>`
  let organizationId;
  await page.waitForURL(url => {
    console.log(url.toString());
    const match = url.toString().match(/\/organization\/([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})/);
    if (match) {
      organizationId = match[1];
      return true;
    }
    return false;
  });

  const settingsPageURL = `/organization/${organizationId}/settings`;
  const billingPageURL = `/organization/${organizationId}/settings/billing`;
  const membersPageURL = `/organization/${organizationId}/settings/members`;

  // check for the presence of the settings page
  await page.goto(settingsPageURL);
  // wait for text Edit Organization Title
  await page.waitForSelector('text=Edit Organization Title');

  // check for the presence of the members page
  await page.goto(membersPageURL);
  // wait for text Team Members
  await page.waitForSelector('text=Team Members');

  // check for the presence of the billing page
  await page.goto(billingPageURL);
  // wait for text Subscription
  await page.waitForSelector('text=Subscription');
});
