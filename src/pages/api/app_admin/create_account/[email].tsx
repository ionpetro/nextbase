import { withAppAdminPrivilegesApi } from '@/utils/api-routes/wrappers/withAppAdminPrivilegesApi';
import { AppSupabaseClient } from '@/types';
import { NextApiRequest, NextApiResponse } from 'next';
import { ZodError, z } from 'zod';
import { errors } from '@/utils/errors';

const querySchema = z.object({
  email: z.string().email(),
});

const createUserAccount = async (
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

    const response = await supabaseAdmin.auth.admin.createUser({
      email,
    });

    if (response.error) {
      errors.add(response.error.message);
      throw response.error;
    }
    res.status(200).json({
      ok: true,
    });
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

export default withAppAdminPrivilegesApi(createUserAccount);
