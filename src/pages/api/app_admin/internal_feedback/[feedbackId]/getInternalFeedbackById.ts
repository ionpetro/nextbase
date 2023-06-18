import { withAppAdminPrivilegesApi } from '@/utils/api-routes/wrappers/withAppAdminPrivilegesApi';
import { NextApiRequest, NextApiResponse } from 'next';
import { AppSupabaseClient } from '@/types';
import { z } from 'zod';
import { withAllowedMethods } from '@/utils/api-routes/wrappers/withAllowedMethods';
import { getInternalFeedbackById } from '@/utils/supabase/internalFeedback';

const querySchema = z.object({
  feedbackId: z.string(),
});

const getInternalFeedbackByIdApi = async (
  req: NextApiRequest,
  res: NextApiResponse,
  supabaseAdminServerClient: AppSupabaseClient
) => {
  const { feedbackId } = querySchema.parse(req.query);
  try {
    const data = await getInternalFeedbackById(
      supabaseAdminServerClient,
      feedbackId
    );
    res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export default withAllowedMethods(
  ['GET'],
  withAppAdminPrivilegesApi(getInternalFeedbackByIdApi)
);
