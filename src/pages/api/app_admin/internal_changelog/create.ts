import { withAppAdminPrivilegesApi } from '@/utils/api-routes/wrappers/withAppAdminPrivilegesApi';
import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { withAllowedMethods } from '@/utils/api-routes/wrappers/withAllowedMethods';
import { createChangelog } from '@/utils/supabase/internalChangelog';
import { supabaseAdmin } from '@/utils/supabase-admin';

const bodySchema = z.object({
  title: z.string(),
  changes: z.string(),
  userId: z.string(),
});

const createChangelogApi = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { title, changes, userId } = bodySchema.parse(req.body);

  try {
    await createChangelog(supabaseAdmin, {
      title,
      changes,
      userId,
    });
    res.status(200).json({ message: 'Changelog created successfully' });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export default withAllowedMethods(
  ['POST'],
  withAppAdminPrivilegesApi(createChangelogApi)
);
