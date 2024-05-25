import { SLUG_PATTERN } from '@/constants';
import { expect, request, test } from '@playwright/test';
import { getUserIdHelper } from 'e2e/_helpers/get-user-id.helper';
import { loginUserHelper } from 'e2e/_helpers/login-user.helper';
import { onboardUserHelper } from 'e2e/_helpers/onboard-user.helper';
import { uniqueId } from 'lodash';
import { randomUUID } from 'node:crypto';
import { dashboardDefaultOrganizationIdHelper } from '../_helpers/dashboard-default-organization-id.helper';

const INBUCKET_URL = `http://localhost:54324`;

test.describe.serial("organization group", () => {
  test("create organization works correctly", async ({ page }) => {
    // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
    await page.goto("/dashboard", {waitUntil: "load"});
    await page.waitForTimeout(26000);

    // click button with role combobox and data-name "organization-switcher"
    const orgSwitcherButton = page.locator(
      'button[name="organization-switcher"]',
    );
    
    await orgSwitcherButton.click();

    const button = await page.waitForSelector(
      'button:has-text("New Organization")'
    );

    if (!button) {
      throw new Error('button not found');
    }

    await button.click();

    // wait for form within a div role dialog to show up with data-testid "create-organization-form"
    const form = await page.waitForSelector(
      'form:has-text("Create Organization")',
    );

    // find input with name "name" and type "Lorem Ipsum"
    const input = await form.waitForSelector("input[name='organizationTitle']");

    if (!input) {
      throw new Error("input not found");
    }

    await input.fill("Lorem Ipsum");

    const orgSwitcherSlug = await form.waitForSelector('input[name="organizationSlug"]');

    if (!orgSwitcherSlug) {
      throw new Error('organizationSlugInput not found');
    }

    await orgSwitcherSlug.fill(randomUUID());

    // click on button with text "Create Organization"

    const submitButton = await form.waitForSelector(
      'button:has-text("Create Organization")',
    );

    if (!submitButton) {
      throw new Error("submitButton not found");
    }

    await submitButton.click();

    // wait for url to change to /organization/<organizationUUID>

    let organizationSlug;
    await page.waitForURL((url) => {
      const match = url
        .toString()
        .match(SLUG_PATTERN);
      if (match) {
        organizationSlug = match[1];
        return true;
      }
      return false;
    });

    if (!organizationSlug) {
      throw new Error("organizationSlug creation failed");
    }

    // go to /organization/<organizationUUID>/settings

    const settingsPageURL = `/${organizationSlug}/settings`;
    await page.goto(settingsPageURL);

    // wait for data-testid "edit-organization-title-form"
    const editOrganizationTitleForm = await page.waitForSelector(
      'form[data-testid="edit-organization-title-form"]',
    );

    const organizationSlugInput = await editOrganizationTitleForm.waitForSelector('input[name="organizationSlug"]');

    if (!organizationSlugInput) {
      throw new Error("organizationSlugInput not found");
    }

    const slug = await organizationSlugInput.inputValue();

    // fill input with name "organization-title"
    const titleInput = await editOrganizationTitleForm.waitForSelector(
      'input[name="organizationTitle"]',
    );

    if (!titleInput) {
      throw new Error("titleInput not found");
    }

    await titleInput.fill("Lorem Ipsum 2");

    await organizationSlugInput.fill(slug);


    // click on button with text "Update"
    const updateButton = await editOrganizationTitleForm.waitForSelector(
      'button:has-text("Update")',
    );

    if (!updateButton) {
      throw new Error("updateButton not found");
    }

    await updateButton.click();

    // wait for text "Organization title updated!"

    await page.waitForSelector("text=Organization information updated!");
  });

  test.describe.serial("Organization invite", () => {
    function getInviteeIdentifier(): string {
      return `johnInvitee` + Date.now().toString().slice(-4);
    }

    const INBUCKET_URL = `http://localhost:54324`;

    // eg endpoint: https://api.testmail.app/api/json?apikey=${APIKEY}&namespace=${NAMESPACE}&pretty=true
    async function getInvitationEmail(username: string): Promise<{
      url: string;
    }> {
      const requestContext = await request.newContext();
      const messages = await requestContext
        .get(`${INBUCKET_URL}/api/v1/mailbox/${username}`)
        .then((res) => res.json())
        // InBucket doesn't have any params for sorting, so here
        // we're sorting the messages by date
        .then((items) =>
          [...items].sort((a, b) => {
            if (a.date < b.date) {
              return 1;
            }

            if (a.date > b.date) {
              return -1;
            }

            return 0;
          }),
        );

      const latestMessageId = messages[0]?.id;

      if (latestMessageId) {
        const message = await requestContext
          .get(
            `${INBUCKET_URL}/api/v1/mailbox/${username}/${latestMessageId}`,
          )
          .then((res) => res.json());

        const url = message.body.text.match(/View Invitation \( (.+) \)/)[1];

        return { url };
      }

      throw new Error("No email received");
    }

    test("invite user to an organization", async ({ page }) => {
      const organizationSlug = await dashboardDefaultOrganizationIdHelper({
        page,
      });

      const membersPageURL = `/${organizationSlug}/settings/members`;

      await page.goto(membersPageURL);

      await page.waitForTimeout(16000);

      await page.waitForSelector("text=Team Members");

      // click button with testid "invite-user-button"
      const inviteUserButton = await page.waitForSelector(
        'button[data-testid="invite-user-button"]',
      );
      if (!inviteUserButton) {
        throw new Error("inviteUserButton not found");
      }

      await inviteUserButton.click();

      // wait for data-testid "invite-user-form"
      const inviteUserForm = await page.waitForSelector(
        'form[data-testid="invite-user-form"]',
      );
      if (!inviteUserForm) {
        throw new Error("inviteUserForm not found");
      }

      const inviteeIdentifier = getInviteeIdentifier();
      const inviteeEmail = `${inviteeIdentifier}@myapp.com`;

      // fill input with name "email"
      const emailInput = await inviteUserForm.waitForSelector(
        'input[name="email"]',
      );

      if (!emailInput) {
        throw new Error("emailInput not found");
      }

      await emailInput.fill(inviteeEmail);

      // click on button with text "Invite"
      const inviteButton = await inviteUserForm.waitForSelector(
        'button:has-text("Invite")',
      );

      if (!inviteButton) {
        throw new Error("inviteButton not found");
      }

      await inviteButton.click();

      // wait for text "User invited!"
      await page.waitForSelector("text=User invited!");

      // logout user
      await page.goto("/logout");

      // open invite link
      let url;
      await expect
        .poll(
          async () => {
            try {
              const { url: urlFromCheck } =
                await getInvitationEmail(inviteeIdentifier);
              url = urlFromCheck;
              return typeof urlFromCheck;
            } catch (e) {
              return null;
            }
          },
          {
            message: "make sure the email is received",
            intervals: [1000, 2000, 5000, 10000, 20000],
          },
        )
        .toBe("string");

      await page.goto(url);

      await page.waitForURL(`/onboarding`);

      await onboardUserHelper({
        page,
        name: "Invitee John " + inviteeIdentifier,
      });

      const inviteeUserId = await getUserIdHelper({ page });

      await page.goto("/invitations");

      // click on anchor with text "View Invitation"
      const viewInvitationAnchor = await page.waitForSelector(
        'a:has-text("View Invitation")',
      );

      if (!viewInvitationAnchor) {
        throw new Error("viewInvitationAnchor not found");
      }

      await viewInvitationAnchor.click();

      // expect url to be /invitations/:invitationId

      let invitationId;
      await page.waitForURL((url) => {
        const match = url
          .toString()
          .match(
            /\/invitations\/([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})/,
          );
        if (match) {
          invitationId = match[1];
          return true;
        }
        return false;
      });

      if (!invitationId) {
        throw new Error("invitationId creation failed");
      }

      // click on button with data-testid accept-dialog-trigger
      const acceptDialogTriggerButton = await page.waitForSelector(
        'button:has-text("Accept Invitation")',
      );

      if (!acceptDialogTriggerButton) {
        throw new Error("acceptDialogTriggerButton not found");
      }

      await acceptDialogTriggerButton.click();

      // wait for div with data-testid dialog-accept-invitation-content
      const acceptDialog = await page.waitForSelector(
        'div[data-testid="dialog-accept-invitation-content"]',
      );

      if (!acceptDialog) {
        throw new Error("acceptDialog not found");
      }

      // click on button with data-testid confirm
      const confirmButton = await acceptDialog.waitForSelector(
        'button[data-testid="confirm"]',
      );

      if (!confirmButton) {
        throw new Error("confirmButton not found");
      }

      await confirmButton.click();

      // wait for text "Invitation accepted!"
      await page.waitForSelector("text=Invitation accepted!");

      await page.waitForTimeout(16000);
      
      await page.goto(membersPageURL);

      // wait for testid "members-table"
      const membersTable = await page.waitForSelector(
        'table[data-testid="members-table"]',
      );

      if (!membersTable) {
        throw new Error("membersTable not found");
      }

      // wait for tr with data-user-id matching inviteeUserId
      const memberRow = await membersTable.waitForSelector(
        `tr[data-user-id="${inviteeUserId}"]`,
      );

      // expect memberRow to be visible
      expect(await memberRow.isVisible()).toBe(true);
    });
  });
})

test.describe.serial('authentication group', () => {
  test('login works correctly', async ({ page }) => {
    await page.goto(`/settings/security`);

    // read email value in the input field
    const emailInput = page.locator('input[name="email"]');
    const emailAddress = await emailInput.getAttribute('value');

    if (!emailAddress) {
      throw new Error('Email is empty');
    }

    await page.goto(`/logout`);

    await loginUserHelper({ page, emailAddress });
    await dashboardDefaultOrganizationIdHelper({ page });
  });

  test('update password should work', async ({ page }) => {
    // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
    await page.goto('/dashboard');

    // wait for the page to load completely
    await page.waitForTimeout(6000);

    await page.goto(`/settings/security`);

    // wait for the page to load completely
    await page.waitForTimeout(6000);

    // read email value in the input field
    const emailInput = page.locator('input[name="email"]');
    const email = await emailInput.getAttribute('value');
    if (!email) {
      throw new Error('Email is empty');
    }
    const newPassword = `password-${uniqueId()}`;

    await page.fill('input[name="password"]', newPassword);
    await page.click('button:has-text("Update Password")');

    await page.waitForSelector('text=Password updated!');

    await page.goto(`/logout`);

    await page.goto(`/login`);

    await page.fill('input[data-strategy="email-password"]', email);
    // fill in the password
    await page.fill('input[name="password"]', newPassword);

    // click on button with text exact: Login
    await page.click('button:text-is("Login")');
    await page.waitForSelector('text=Logged in!');
  });

  test('forgot password works correctly', async ({ page }) => {
    // eg endpoint: https://api.testmail.app/api/json?apikey=${APIKEY}&namespace=${NAMESPACE}&pretty=true
    async function getResetPasswordEmail(username: string): Promise<{
      url: string;
    }> {
      const requestContext = await request.newContext();
      const now = new Date().getTime();
      const messages = await requestContext
        .get(`${INBUCKET_URL}/api/v1/mailbox/${username}`)
        .then((res) => res.json())
        .then((items) =>
          items
            .filter((item) => {
              const itemDate = new Date(item.date).getTime();
              return Math.abs(now - itemDate) < 10000; // Filter out emails received older the last 20 seconds
            })
            .sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
            ),
        );

      const latestMessage = messages[0];

      if (latestMessage) {
        const message = await requestContext
          .get(`${INBUCKET_URL}/api/v1/mailbox/${username}/${latestMessage.id}`)
          .then((res) => res.json());

        const urlMatch = message.body.text.match(/Reset password \( (.+) \)/);

        if (!urlMatch) {
          throw new Error('Email format unexpected');
        }

        return { url: urlMatch[1] };
      }

      throw new Error('No email received');
    }

    // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
    await dashboardDefaultOrganizationIdHelper({ page });

    await page.goto(`/settings/security`);

    // wait for the page to load completely
    await page.waitForTimeout(6000);

    // read email value in the input field
    const emailInput = page.locator('input[name="email"]');
    const email = await emailInput.getAttribute('value');

    await page.goto(`/logout`);

    await page.goto(`/forgot-password`);

    if (!email) {
      throw new Error('Email is empty');
    }

    // fill in the email
    await page.fill('input[name="email"]', email);

    // click button with text Reset password
    await page.click('button:has-text("Reset password")');

    await page.waitForSelector(
      'text="A password reset link has been sent to your email!"',
    );

    const identifier = email.split('@')[0];
    let url;
    await expect
      .poll(
        async () => {
          try {
            const { url: urlFromCheck } =
              await getResetPasswordEmail(identifier);
            url = urlFromCheck;
            return typeof urlFromCheck;
          } catch (e) {
            return null;
          }
        },
        {
          message: 'make sure the email is received',
          intervals: [1000, 2000, 5000, 10000, 20000],
        },
      )
      .toBe('string');

    await page.goto(url);

    await page.waitForURL(`/update-password`);

    // wait for text = Reset Password
    await page.waitForSelector('text=Reset Password');

    // fill in a new password in the input field with name password
    const newPassword = 'password';
    await page.fill('input[name="password"]', newPassword);

    // click on button with text Confirm Password
    await page.click('button:has-text("Confirm Password")');

    await page.waitForURL(`/dashboard`);

    await page.goto(`/logout`);

    await page.goto(`/login`);

    // find form element with data-testid password-form
    const form = await page.waitForSelector(
      'form[data-testid="password-form"]',
    );
    const emailInput2 = await form.$('input[data-strategy="email-password"]');
    const passwordInput = await form.$('input[name="password"]');

    if (!emailInput2) {
      throw new Error('Email input is empty');
    }

    if (!passwordInput) {
      throw new Error('Password input is empty');
    }

    await emailInput2.fill(email);
    // fill in the password
    await passwordInput.fill(newPassword);

    // click on button of type submit in form
    const submitButton = await form.waitForSelector('button[type="submit"]');

    if (!submitButton) {
      throw new Error('Submit button is empty');
    }

    await submitButton.click();

    await page.goto(`/settings/security`, { waitUntil: 'networkidle' });
  });

 
});
