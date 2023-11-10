import { Database } from '@/lib/database.types';
import { NextApiRequest, NextApiResponse } from 'next';
import { enableCors } from '../enable-cors';
import { AppSupabaseClient } from '@/types';
import { createSupabaseUserServerPagesClient } from '@/supabase-clients/user/createSupabaseUserServerPagesClient';
import { supabaseAdminClient } from '@/supabase-clients/admin/supabaseAdminClient';
import { getIsAppAdmin } from '@/data/admin/security';

/**
 * @description Ensures that the user is an Application Admin.
 * This is a wrapper around the createServiceRoleServerSupabaseClient
 * that checks if the user is an Application Admin and returns a 401 if not
 * */
export const withAppAdminPrivilegesApi = (
  cb: (
    req: NextApiRequest,
    res: NextApiResponse,
    supabaseClient: AppSupabaseClient,
  ) => void,
) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const supabaseClient = createSupabaseUserServerPagesClient({ req, res });
    enableCors(req, res);

    // return ok if options request
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    const {
      data: { session },
    } = await supabaseClient.auth.getSession();

    if (!session || !session.user) {
      return res.status(401).json({
        error: 'not_authenticated',
        description:
          'The user does not have an active session or is not authenticated',
      });
    }

    const isAppAdmin = await getIsAppAdmin(session.user);

    if (!isAppAdmin) {
      return res.status(401).json({
        error: 'not_allowed',
        description: 'The user is not allowed to perform this action',
      });
    }

    return cb(req, res, supabaseAdminClient);
  };
};
