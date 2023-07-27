'use server'

import { supabaseAdminClient } from "@/supabase-clients/admin/supabaseAdminClient";
import { render as renderEmail } from '@react-email/render';
import { sendEmail } from '@/utils/api-routes/utils';
import SignInEmail from "emails/SignInEmail";
import { revalidatePath } from "next/cache";
import { getUsersPaginated } from "@/utils/supabase-admin";
import { ADMIN_USER_LIST_VIEW_PAGE_SIZE } from "@/constants";
import { DBFunction } from "@/types";

export async function sendLoginLinkAction(email: string) {

  const response = await supabaseAdminClient.auth.admin.generateLink({
    email,
    type: 'magiclink',
  });

  if (response.error) {
    throw response.error;
  }

  const generateLinkData = response.data;

  if (generateLinkData) {
    const {
      properties: { action_link },
    } = generateLinkData;

    if (process.env.NEXT_PUBLIC_SITE_URL !== undefined) {
      // change the origin of the link to the site url
      const checkAuthUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL);
      checkAuthUrl.pathname = '/auth/callback';
      const url = new URL(action_link);
      url.searchParams.set('redirect_to', checkAuthUrl.toString());

      // send email
      const signInEmailHTML = renderEmail(
        <SignInEmail signInUrl={url.toString()} />
      );

      if (process.env.NODE_ENV === 'development') {
        // In development, we log the email to the console instead of sending it.
        console.log({
          link: url.toString(),
        });
      } else {
        await sendEmail({
          to: email,
          subject: `Here is your login link `,
          html: signInEmailHTML,
          //TODO: Modify this to your app's admin email
          // Make sure you have verified this email in your Sendgrid (mail provider) account
          from: process.env.ADMIN_EMAIL,
        });
      }
    }
    return;
  }
}


export async function createUserAction(email: string) {
  const response = await supabaseAdminClient.auth.admin.createUser({
    email,
  });

  if (response.error) {
    throw response.error;
  }

  const user = response.data;

  if (user) {
    revalidatePath('/');
    return user;
  }

  throw new Error('Failed to create user');

}

export async function getUsersPaginatedAction(
  {
    pageNumber,
    search,
  }
    : {
      pageNumber: number,
      search: string | undefined,
    }
): Promise<[
  number,
  DBFunction<'app_admin_get_all_users'>
]> {

  const effectivePageNumber = pageNumber + 1;
  const { data, error } = await supabaseAdminClient.rpc(
    'app_admin_get_all_users',
    {
      page: effectivePageNumber,
      search_query: search,
      page_size: ADMIN_USER_LIST_VIEW_PAGE_SIZE,
    }
  );
  if (error) throw error;
  if (!data) {
    return [pageNumber, []];
  }
  revalidatePath('/');
  return [pageNumber, data];

}
