import { withAppAdminPrivilegesApi } from '@/utils/api-routes/wrappers/withAppAdminPrivilegesApi';
import { AppSupabaseClient } from '@/types';
import { NextApiRequest, NextApiResponse } from 'next';

const ImpersonateUser = async (
  req: NextApiRequest,
  res: NextApiResponse,
  supabaseAdmin: AppSupabaseClient
) => {
  const { userId } = req.query;

  if (typeof userId === 'string') {
    const response = await supabaseAdmin.auth.admin.getUserById(userId);

    const { data: user, error: userError } = response;

    if (userError) {
      res.status(400).json({ error: 'Invalid userId ' + userError.message });
      return;
    }

    if (!user?.user) {
      res.status(400).json({ error: 'user does not exist' });
      return;
    }

    if (!user.user.email) {
      res.status(400).json({ error: 'user email does not exist' });
      return;
    }

    const generateLinkResponse = await supabaseAdmin.auth.admin.generateLink({
      email: user.user.email,
      type: 'magiclink',
    });

    const { data: generateLinkData, error: generateLinkError } =
      generateLinkResponse;

    if (generateLinkError) {
      res
        .status(400)
        .json({ error: 'Invalid userId ' + generateLinkError.message });
      return;
    }

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
        res.json({
          url,
        });
        return;
      }

      res.json({
        url: action_link,
      });
      return;
    }

    res.status(500).json({
      error: 'server_error',
    });

    return;
  } else {
    res.status(400).json({ error: 'Invalid userId' });
  }
};

export default withAppAdminPrivilegesApi(ImpersonateUser);
