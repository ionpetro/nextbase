import { NextApiRequest, NextApiResponse } from 'next';
import { createSupabaseUserServerPagesClient } from '@/supabase-clients/user/createSupabaseUserServerPagesClient';
import { toSiteURL } from '@/utils/helpers';
import { z } from 'zod';

const getInvitationIdSchema = z.object({
  invitationId: z.union([z.string(), z.array(z.string())]),
});

async function ViewInvitationHandler(
  req: NextApiRequest,
  res: NextApiResponse,
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

  const { invitationId: invitationIdArg } = getInvitationIdSchema.parse(
    req.query,
  );

  const invitationId = Array.isArray(invitationIdArg)
    ? invitationIdArg[0]
    : invitationIdArg;

  if (!user) {
    const url = new URL(toSiteURL('/login'));
    url.searchParams.append(
      'next',
      `/invitations/${encodeURIComponent(invitationId)}`,
    );
    url.searchParams.append('nextActionType', 'invitationPending');
    res.redirect(url.toString());
    return;
  }

  if (typeof invitationId === 'string') {
    res.redirect(`/invitations/${invitationId}`);
  } else {
    res.status(400).json({ error: 'Bad request: Missing invitationId' });
    return;
  }
}

export default ViewInvitationHandler;
