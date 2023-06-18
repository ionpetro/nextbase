import { withAppAdminPrivilegesApi } from '@/utils/api-routes/wrappers/withAppAdminPrivilegesApi';
import { NextApiRequest, NextApiResponse } from 'next';
import { AppSupabaseClient } from '@/types';
import { z } from 'zod';
import { withAllowedMethods } from '@/utils/api-routes/wrappers/withAllowedMethods';
import { adminGetUser } from '@/utils/supabase/user';

const querySchema = z.object({
  userId: z.string(),
});

const adminGetUserApi = async (
  req: NextApiRequest,
  res: NextApiResponse,
  supabaseAdminServerClient: AppSupabaseClient
) => {
  const { userId } = querySchema.parse(req.query);

  try {
    const data = await adminGetUser(supabaseAdminServerClient, userId);
    res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export default withAllowedMethods(
  ['GET'],
  withAppAdminPrivilegesApi(adminGetUserApi)
);
