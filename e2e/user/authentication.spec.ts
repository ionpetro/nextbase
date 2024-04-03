import { expect, request, test } from '@playwright/test';
import { loginUserHelper } from 'e2e/_helpers/login-user.helper';
import { uniqueId } from 'lodash';
import { dashboardDefaultOrganizationIdHelper } from '../_helpers/dashboard-default-organization-id.helper';


const INBUCKET_URL = `http://localhost:54324`;


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
    // wait for the url to change to `/organization/<organizationUUID>`

    await page.goto(`/settings/security`);

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
    await page.click('button:text-is("Login")')
    await page.waitForSelector('text=Logged in!')

    await page.waitForURL(`/dashboard`);
  });





  test("forgot password works correctly", async ({ page }) => {

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
          items.filter((item) => {
            const itemDate = new Date(item.date).getTime();
            return Math.abs(now - itemDate) < 10000; // Filter out emails received older the last 20 seconds
          }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
        );

      const latestMessage = messages[0];

      if (latestMessage) {
        const message = await requestContext
          .get(`${INBUCKET_URL}/api/v1/mailbox/${username}/${latestMessage.id}`)
          .then((res) => res.json());

        const urlMatch = message.body.text.match(/Reset password \( (.+) \)/);

        if (!urlMatch) {
          throw new Error("Email format unexpected");
        }

        return { url: urlMatch[1] };
      }

      throw new Error("No email received");
    }

    // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
    await dashboardDefaultOrganizationIdHelper({ page });

    await page.goto(`/settings/security`, { waitUntil: 'networkidle' });

    // read email value in the input field
    const emailInput = page.locator('input[name="email"]');
    const email = await emailInput.getAttribute("value");

    await page.goto(`/logout`);

    await page.goto(`/forgot-password`);

    if (!email) {
      throw new Error("Email is empty");
    }

    // fill in the email
    await page.fill('input[name="email"]', email);

    // click button with text Reset password
    await page.click('button:has-text("Reset password")');

    await page.waitForSelector(
      "text=A password reset link has been sent to your email!",
    );

    const identifier = email.split("@")[0];
    let url;
    await expect
      .poll(
        async () => {
          try {
            const { url: urlFromCheck } = await getResetPasswordEmail(identifier);
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

    await page.waitForURL(`/update-password`);

    // wait for text = Reset Password
    await page.waitForSelector("text=Reset Password");

    // fill in a new password in the input field with name password
    const newPassword = "password";
    await page.fill('input[name="password"]', newPassword);

    // click on button with text Confirm Password
    await page.click('button:has-text("Confirm Password")');

    await page.waitForURL(`/dashboard`);

    await page.goto(`/logout`);

    await page.goto(`/login`);

    // find form element with data-testid password-form
    const form = await page.waitForSelector('form[data-testid="password-form"]');
    const emailInput2 = await form.$('input[data-strategy="email-password"]');
    const passwordInput = await form.$('input[name="password"]');

    if (!emailInput2) {
      throw new Error("Email input is empty");
    }

    if (!passwordInput) {
      throw new Error("Password input is empty");
    }

    await emailInput2.fill(email);
    // fill in the password
    await passwordInput.fill(newPassword);

    // click on button of type submit in form
    const submitButton = await form.waitForSelector('button[type="submit"]');

    if (!submitButton) {
      throw new Error("Submit button is empty");
    }

    await submitButton.click();

    await page.goto(`/settings/security`, { waitUntil: 'networkidle' });

  });

})
