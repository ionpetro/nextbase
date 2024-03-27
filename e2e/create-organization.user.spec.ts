import test from "@playwright/test";

test('create organization works correctly', async ({ page }) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto('/dashboard');
  await page.waitForTimeout(5000)

  // click button with role combobox and data-name "organization-switcher"
  const orgSwitcherButton = page.locator('button[role="combobox"][data-name="organization-switcher"]');
  await orgSwitcherButton.click();

  // click button with text New Organization
  await page.waitForTimeout(5000)
  const button = page.locator('button:has-text("New Organization")');
  await button.click();

  // wait for form within a div role dialog to show up with data-testid "create-organization-form"
  const form = await page.waitForSelector('div[role="dialog"] form[data-testid="create-organization-form"]');

  // find input with name "name" and type "Lorem Ipsum"
  const input = await form.waitForSelector('input[name="name"]');

  if (!input) {
    throw new Error('input not found');
  }

  await input.fill('Lorem Ipsum');

  // click on button with text "Create Organization"

  const submitButton = await form.waitForSelector('button:has-text("Create Organization")');

  if (!submitButton) {
    throw new Error('submitButton not found');
  }

  await submitButton.click();

  // wait for url to change to /organization/<organizationUUID>

  let organizationId;
  await page.waitForURL(url => {
    const match = url.toString().match(/\/organization\/([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})/);
    if (match) {
      organizationId = match[1];
      return true;
    }
    return false;
  });

  if (!organizationId) {
    throw new Error('organizationId creation failed');
  }

  // go to /organization/<organizationUUID>/settings

  const settingsPageURL = `/organization/${organizationId}/settings`;
  await page.goto(settingsPageURL);

  // wait for data-testid "edit-organization-title-form"
  const editOrganizationTitleForm = await page.waitForSelector('form[data-testid="edit-organization-title-form"]');

  // fill input with name "organization-title"
  const titleInput = await editOrganizationTitleForm.waitForSelector('input[name="organization-title"]');
  if (!titleInput) {
    throw new Error('titleInput not found');
  }

  await titleInput.fill('Lorem Ipsum 2');

  // click on button with text "Update"
  const updateButton = await editOrganizationTitleForm.waitForSelector('button:has-text("Update")');

  if (!updateButton) {
    throw new Error('updateButton not found');
  }

  await updateButton.click();

  // wait for text "Organization title updated!"

  await page.waitForSelector('text=Organization title updated!');
});
