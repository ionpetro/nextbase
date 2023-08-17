import { NextApiRequest, NextApiResponse } from 'next';
import { createSupabaseUserServerPagesClient } from '@/supabase-clients/user/createSupabaseUserServerPagesClient';
import { createAcceptedOrgInvitationNotification } from '@/utils/supabase/notifications';
import { getUserProfile } from '@/utils/supabase/user';

async function AcceptInvitationHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const supabaseClient = createSupabaseUserServerPagesClient({
    req,
    res,
  });
  const { data, error } = await supabaseClient.auth.getSession();
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  const user = data?.session?.user;

  if (!user) {
    res.status(401).send('Please login to accept organization invitation.');
    return;
  }

  const { invitationId } = req.query;

  if (typeof invitationId === 'string') {
    // update invitation status
    const invitationResponse = await supabaseClient
      .from('organization_join_invitations')
      .update({
        status: 'finished_accepted',
        invitee_user_id: user.id, // Add this information here, so that our database function can add this id to the team members table
      })
      .eq('id', invitationId)
      .select('*')
      .single();

    if (invitationResponse.error) {
      throw invitationResponse.error;
    } else {
      const userProfile = await getUserProfile(supabaseClient, user.id);

      await createAcceptedOrgInvitationNotification(
        supabaseClient,
        invitationResponse.data?.inviter_user_id,
        {
          organizationId: invitationResponse.data.organization_id,
          inviteeFullName: userProfile.full_name ?? `User ${userProfile.id}`,
        }
      );
      res.redirect('/dashboard');
    }
  } else {
    res.status(400).json({ error: 'Bad request: Missing invitationId' });
    return;
  }
}

export default AcceptInvitationHandler;
