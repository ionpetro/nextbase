import { test as setup } from '@playwright/test';

const API_KEY = process.env.TESTMAIL_API_KEY;
const NAMESPACE = process.env.TESTMAIL_PREFIX;

// eg endpoint: https://api.testmail.app/api/json?apikey=${APIKEY}&namespace=${NAMESPACE}&pretty=true
async function checkIfTestMailReceivedEmail(tag: string): Promise<string> {

  const timeNow = Date.now();
  const url = `https://api.testmail.app/api/json?apikey=${API_KEY}&namespace=${NAMESPACE}&pretty=true&tag=${tag}&timestamp_from=${timeNow - 10000}&livequery=true`;
  const response = await fetch(url);
  const json = await response.json();
  if (json.count > 0 && json.result === 'success') {
    const emailObject = json.emails[0];
    return emailObject.html as string;
  }

  throw new Error('No email received');
}

function parseEmail(email: string): string {
  // email looks like this https://tehlvbdeixytzrwjfils.supabase.co/auth/v1/verify?token=pkce_31568bbc57c710e1cb2b4dc824e7ea0a481e711c4dbf0aa5062e8288&amp;type=magiclink&amp;redirect_to=http://localhost:3000/auth/callback
  // there are two &amp; in the url which need to be replaced with &
  const emailDecoded = decodeURIComponent(email);
  const emailDecoded2 = emailDecoded.replace(/&amp;/g, '&');
  return emailDecoded2;
}

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  const tag = 'test1'
  const emailAddress = `${NAMESPACE}.${tag}@inbox.testmail.app`
  // Perform authentication steps. Replace these actions with your own.
  await page.goto('/login');
  await page.getByTestId('magic-link-form').locator('input').fill(emailAddress);
  // await page.getByLabel('Password').fill('password');
  await page.getByRole('button', { name: 'Login with Magic Link' }).click();
  const emailHTML = await checkIfTestMailReceivedEmail(tag);
  const magicLink = emailHTML.match(/href="([^"]*)/)?.[1];
  // magiclink is escaped parse it
  const magicLinkDecoded = parseEmail(magicLink!);
  await page.goto(magicLinkDecoded!);
  await page.waitForURL('/dashboard');
  await page.context().storageState({ path: authFile });

});
