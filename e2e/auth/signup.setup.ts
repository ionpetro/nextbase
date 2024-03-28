import { test as setup } from '@playwright/test';
import { onboardUserHelper } from 'e2e/helpers/onboard-user.helper';
import { signupUserHelper } from 'e2e/helpers/signup.helper';


function getIdentifier(): string {
  return `johndoe` + Date.now().toString().slice(-4)
}

const authFile = 'playwright/.auth/user.json';

setup('create account', async ({ page }) => {
  const identifier = getIdentifier()
  const emailAddress = `${identifier}@myapp.com`
  await signupUserHelper({ page, emailAddress, identifier });
  await onboardUserHelper({ page, name: 'John Doe' });
  await page.context().storageState({ path: authFile });
});
