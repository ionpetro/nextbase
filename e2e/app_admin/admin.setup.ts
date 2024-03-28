import { test as setup } from '@playwright/test';
import { signupUserHelper } from 'e2e/helpers/signup.helper';
import { Client } from 'pg';


function getIdentifier(): string {
  return `adminjoe` + Date.now().toString().slice(-4)
}

const authFile = 'playwright/.auth/admin.json';

setup('check current database user and set admin role', async ({ page }) => {

  const identifier = getIdentifier()
  const emailAddress = `${identifier}@myapp.com`
  await signupUserHelper({ page, emailAddress, identifier });
  // await onboardUserHelper({ page, name: 'Admin Joe' });
  // const emailAddress = `adminjoe3952@myapp.com`
  // const identifier = 'adminjoe3952'

  // Connect to the PostgreSQL database
  const client = new Client({
    connectionString: process.env.SUPABASE_POSTGRES_DB_URL,
  });

  try {
    await client.connect();


    // Find the user ID for the email
    const userIdRes = await client.query(`SELECT id FROM auth.users WHERE email = '${emailAddress}';`);
    const userId = userIdRes.rows[0].id;
    console.log(`User ID for ${emailAddress}:`, userId);

    // Insert the user ID into the user_roles table with role as 'admin'
    if (userId) {
      await client.query("INSERT INTO public.user_roles (user_id, role) VALUES ($1, 'admin');", [userId]);
      console.log(`Admin role set for ${emailAddress}`);
    } else {
      console.log(`User not found for email ${emailAddress}`);
    }
  } catch (error) {
    console.error('Database connection or query execution error:', error);
  } finally {
    await client.end();
  }
});
