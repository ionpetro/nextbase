import { NextApiRequest, NextApiResponse } from 'next';
import { withUserLoggedInApi } from '@/utils/api-routes/wrappers/withUserLoggedInApi';
import { AppSupabaseClient } from '@/types';
import { Session, User } from '@supabase/supabase-js';
import { render as renderEmail } from '@react-email/render';
import TeamInvitationEmail from 'emails/TeamInvitation';
import { toSiteURL } from '@/utils/helpers';
import { sendEmail } from '@/utils/api-routes/utils';
import { z } from 'zod';
import { errors } from '@/utils/errors';
import { supabaseAdminClient } from '@/supabase-clients/admin/supabaseAdminClient';
import { appAdminGetUserIdByEmail } from '@/utils/supabase/auth';
import { createInvitedToOrganizationNotification } from '@/utils/supabase/notifications';

const payloadSchema = z.object({
  email: z.string().email(),
  organizationId: z.string(),
  // one of 'admin', 'member', 'readonly'
  role: z.enum(['admin', 'member', 'readonly']),
});

async function setupInviteeUserDetails(email: string): Promise<{
  type: 'USER_CREATED' | 'USER_EXISTS';
  userId: string;
}> {
  const inviteeUserId = await appAdminGetUserIdByEmail(
    supabaseAdminClient,
    email,
  );
  if (!inviteeUserId) {
    const { data, error } = await supabaseAdminClient.auth.admin.createUser({
      email: email,
    });
    if (error) {
      throw error;
    }
    return {
      type: 'USER_CREATED',
      userId: data.user.id,
    };
  }

  return {
    type: 'USER_EXISTS',
    userId: inviteeUserId,
  };
}

async function getMagicLink(email: string): Promise<string> {
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

      return url.toString();
    } else {
      throw new Error('Site URL is not defined');
    }
  } else {
    throw new Error('No data returned');
  }
}

async function getViewInvitationUrl(
  invitationId: string,
  inviteeDetails: {
    type: 'USER_CREATED' | 'USER_EXISTS';
    userId: string;
  },
  email: string,
): Promise<string> {
  if (inviteeDetails.type === 'USER_CREATED') {
    const magicLink = await getMagicLink(email);
    return magicLink;
  }

  return toSiteURL('/api/invitations/view/' + invitationId);
}

async function createInvitationHandler(
  req: NextApiRequest,
  res: NextApiResponse,
  supabaseClient: AppSupabaseClient,
  _: Session,
  user: User,
) {
  try {
    const payload = req.body;
    const parsedBody = payloadSchema.parse(payload);
    const { email, organizationId: organizationId } = parsedBody;

    // check if organization exists
    const organizationResponse = await supabaseClient
      .from('organizations')
      .select('*')
      .eq('id', organizationId)
      .single();

    if (organizationResponse.error) {
      errors.add(organizationResponse.error);
      res.status(400).json({ error: organizationResponse.error.message });
      return;
    }

    const inviteeUserDetails = await setupInviteeUserDetails(email);
    // check if already invited
    const existingInvitationResponse = await supabaseClient
      .from('organization_join_invitations')
      .select('*')
      .eq('invitee_user_id', inviteeUserDetails.userId)
      .eq('inviter_user_id', user.id)
      .eq('status', 'active')
      .eq('organization_id', organizationId);

    if (existingInvitationResponse.error) {
      res.status(400).json({ error: existingInvitationResponse.error.message });
      return;
    } else if (existingInvitationResponse.data.length > 0) {
      res.status(400).json({ error: 'User already invited' });
      return;
    }

    const invitationResponse = await supabaseClient
      .from('organization_join_invitations')
      .insert({
        invitee_user_email: email,
        invitee_user_id: inviteeUserDetails.userId,
        inviter_user_id: user.id,
        status: 'active',
        organization_id: organizationId,
        invitee_organization_role: parsedBody.role,
      })
      .select('*')
      .single();

    if (invitationResponse.error) {
      errors.add(invitationResponse.error);
      res.status(400).json({ error: invitationResponse.error.message });
      return;
    }

    const viewInvitationUrl = await getViewInvitationUrl(
      invitationResponse.data.id,
      inviteeUserDetails,
      email,
    );

    const userProfileData = await supabaseClient
      .from('user_profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (userProfileData.error) {
      res.status(400).json({ error: userProfileData.error.message });
      return;
    }

    const inviterName =
      userProfileData.data?.full_name || `User [${user.email}]`;

    // send email
    const invitationEmailHTML = renderEmail(
      <TeamInvitationEmail
        viewInvitationUrl={viewInvitationUrl}
        inviterName={`${inviterName}`}
        isNewUser={inviteeUserDetails.type === 'USER_CREATED'}
        organizationName={organizationResponse.data.title}
      />,
    );

    if (process.env.NODE_ENV === 'development') {
      // In development, we log the email to the console instead of sending it.
      console.log({
        viewInvitationUrl,
      });
    } else {
      try {
        await sendEmail({
          to: email,
          subject: `Invitation to join ${organizationResponse.data.title}`,
          html: invitationEmailHTML,
          //TODO: Modify this to your app's admin email
          // Make sure you have verified this email in your Sendgrid (mail provider) account
          from: process.env.ADMIN_EMAIL,
        });
      } catch (error) {
        errors.add(error);
      }
    }

    // send notification
    await createInvitedToOrganizationNotification(
      supabaseClient,
      inviteeUserDetails.userId,
      {
        inviterFullName: inviterName,
        organizationId: organizationId,
        organizationName: organizationResponse.data.title,
        invitationId: invitationResponse.data.id,
      },
    );

    const invitation = invitationResponse.data;
    res.status(201).json(invitation);
    return;
  } catch (error) {
    errors.add(error);
    res.status(400).json({ error: error.message });
  }
}

export default withUserLoggedInApi(createInvitationHandler);
