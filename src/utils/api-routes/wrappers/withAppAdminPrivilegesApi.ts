import { Database as AppDatabase } from '@/lib/database.types';
import { NextApiRequest, NextApiResponse } from 'next';
import { enableCors } from '../enable-cors';
import { getIsAppAdmin } from '@/utils/supabase-queries';
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';
import { AppSupabaseClient } from '@/types';

/**
 * @description Ensures that the user is an Application Admin.
 * This is a wrapper around the createServiceRoleServerSupabaseClient
 * that checks if the user is an Application Admin and returns a 401 if not
 * */
export const withAppAdminPrivilegesApi = (
  cb: (
    req: NextApiRequest,
    res: NextApiResponse,
    supabaseClient: AppSupabaseClient
  ) => void
) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const supabaseClient = createPagesServerClient<AppDatabase>(
      {
        req,
        res,
      },
      {
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
        supabaseKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
        options: {
          global: {
            fetch,
          },
        },
      }
    );
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

    const isAppAdmin = await getIsAppAdmin(supabaseClient, session.user);

    if (!isAppAdmin) {
      return res.status(401).json({
        error: 'not_allowed',
        description: 'The user is not allowed to perform this action',
      });
    }

    return cb(req, res, supabaseClient);
  };
};
