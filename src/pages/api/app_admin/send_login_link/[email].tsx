import { withAppAdminPrivilegesApi } from '@/utils/api-routes/wrappers/withAppAdminPrivilegesApi';
import { AppSupabaseClient } from '@/types';
import { NextApiRequest, NextApiResponse } from 'next';
import { ZodError, z } from 'zod';
import { errors } from '@/utils/errors';
import { toSiteURL } from '@/utils/helpers';
import SignInEmail from 'emails/SignInEmail';
import { render as renderEmail } from '@react-email/render';
import { sendEmail } from '@/utils/api-routes/utils';

const querySchema = z.object({
  email: z.string().email(),
});

const sendLoginLink = async (
  req: NextApiRequest,
  res: NextApiResponse,
  supabaseAdmin: AppSupabaseClient
) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  try {
    const { email } = querySchema.parse(req.query);

    const response = await supabaseAdmin.auth.admin.generateLink({
      email,
      type: 'magiclink',
    });

    if (response.error) {
      errors.add(response.error.message);
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
        checkAuthUrl.pathname = '/check-auth';
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
          try {
            await sendEmail({
              to: email,
              subject: `Here is your login link `,
              html: signInEmailHTML,
              //TODO: Modify this to your app's admin email
              // Make sure you have verified this email in your Sendgrid (mail provider) account
              from: process.env.ADMIN_EMAIL,
            });
          } catch (error) {
            errors.add(error);
          }
        }
      }

      res.status(200).json({
        ok: true,
      });
      return;
    }

    throw new Error('Something went wrong');
  } catch (error) {
    if (error instanceof ZodError) {
      errors.add(error.issues[0].message);
      res.status(400).json({ error: error.issues[0].message });
    } else {
      errors.add(error.message);
      res.status(400).json({ error: error.message });
    }
  }
};

export default withAppAdminPrivilegesApi(sendLoginLink);
