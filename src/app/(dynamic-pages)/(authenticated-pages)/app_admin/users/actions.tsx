'use server';

import { supabaseAdminClient } from '@/supabase-clients/admin/supabaseAdminClient';
import { renderAsync } from '@react-email/render';
import { sendEmail } from '@/utils/api-routes/utils';
import SignInEmail from 'emails/SignInEmail';
import { revalidatePath } from 'next/cache';
import { ADMIN_USER_LIST_VIEW_PAGE_SIZE } from '@/constants';
import { DBFunction } from '@/types';
import { z } from 'zod';
import { User, isAuthError } from '@supabase/supabase-js';
import { ServerActionState } from '@/utils/server-actions/types';

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
      properties: { hashed_token },
    } = generateLinkData;

    if (process.env.NEXT_PUBLIC_SITE_URL !== undefined) {
      // change the origin of the link to the site url

      const tokenHash = hashed_token;
      const searchParams = new URLSearchParams({
        token_hash: tokenHash,
        next: '/dashboard',
      });

      const url = new URL(process.env.NEXT_PUBLIC_SITE_URL);
      url.pathname = `/auth/confirm`;
      url.search = searchParams.toString();

      // send email
      const signInEmailHTML = await renderAsync(
        <SignInEmail signInUrl={url.toString()} />,
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

export async function createUserAction(
  state: ServerActionState<User>,
  formData: FormData,
): Promise<ServerActionState<User>> {
  try {
    const emailPayload = formData.get('email');
    const email = z
      .string()
      .email({
        message: 'Invalid email address',
      })
      .parse(emailPayload);
    const response = await supabaseAdminClient.auth.admin.createUser({
      email,
    });

    if (response.error) {
      throw response.error;
    }

    const { user } = response.data;

    if (user) {
      revalidatePath('/app_admin');
      return {
        status: 'success',
        message: 'User created successfully',
        payload: user,
      };
    } else {
      throw new Error('User not created');
    }
  } catch (error) {
    const errorMessage = isAuthError(error)
      ? error.message
      : 'message' in error
        ? error.message
        : 'Unknown error';
    return {
      status: 'error',
      message: 'User creation failed:' + errorMessage,
    };
  }
}

export async function getUsersPaginatedAction({
  pageNumber,
  search,
}: {
  pageNumber: number;
  search: string | undefined;
}): Promise<[number, DBFunction<'app_admin_get_all_users'>]> {
  const effectivePageNumber = pageNumber + 1;
  const { data, error } = await supabaseAdminClient.rpc(
    'app_admin_get_all_users',
    {
      page: effectivePageNumber,
      search_query: search,
      page_size: ADMIN_USER_LIST_VIEW_PAGE_SIZE,
    },
  );
  if (error) throw error;
  if (!data) {
    return [pageNumber, []];
  }
  return [pageNumber, data];
}

export async function getUserImpersonationUrlAction(
  userId: string,
): Promise<URL> {
  const response = await supabaseAdminClient.auth.admin.getUserById(userId);

  const { data: user, error: userError } = response;

  if (userError) {
    throw new Error(userError.message);
  }

  if (!user?.user) {
    throw new Error('user does not exist');
  }

  if (!user.user.email) {
    throw new Error('user does not have an email');
  }

  const generateLinkResponse =
    await supabaseAdminClient.auth.admin.generateLink({
      email: user.user.email,
      type: 'magiclink',
    });

  const { data: generateLinkData, error: generateLinkError } =
    generateLinkResponse;

  if (generateLinkError) {
    throw new Error(generateLinkError.message);
  }

  if (process.env.NEXT_PUBLIC_SITE_URL !== undefined) {
    // change the origin of the link to the site url
    const {
      properties: { hashed_token },
    } = generateLinkData;

    const tokenHash = hashed_token;
    const searchParams = new URLSearchParams({
      token_hash: tokenHash,
      next: '/dashboard',
    });

    const checkAuthUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL);
    checkAuthUrl.pathname = `/auth/confirm`;
    checkAuthUrl.search = searchParams.toString();

    return checkAuthUrl;
  }

  throw new Error('site url is undefined');
}
