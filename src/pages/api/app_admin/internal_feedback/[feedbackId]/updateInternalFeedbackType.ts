import { withAppAdminPrivilegesApi } from '@/utils/api-routes/wrappers/withAppAdminPrivilegesApi';
import { NextApiRequest, NextApiResponse } from 'next';
import { AppSupabaseClient } from '@/types';
import { z } from 'zod';
import { withAllowedMethods } from '@/utils/api-routes/wrappers/withAllowedMethods';
import { updateInternalFeedbackType } from '@/utils/supabase/internalFeedback';
import { INTERNAL_FEEDBACK_THREAD_TYPE_VALUES } from '@/utils/typeguards';

const bodySchema = z.object({
  type: z.enum(INTERNAL_FEEDBACK_THREAD_TYPE_VALUES),
});

const querySchema = z.object({
  feedbackId: z.string(),
});

const updateInternalFeedbackTypeApi = async (
  req: NextApiRequest,
  res: NextApiResponse,
  supabaseAdminServerClient: AppSupabaseClient
) => {
  const { feedbackId } = querySchema.parse(req.query);
  const { type } = bodySchema.parse(req.body);
  try {
    const data = await updateInternalFeedbackType(
      supabaseAdminServerClient,
      feedbackId,
      type
    );
    res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export default withAllowedMethods(
  ['PATCH'],
  withAppAdminPrivilegesApi(updateInternalFeedbackTypeApi)
);
