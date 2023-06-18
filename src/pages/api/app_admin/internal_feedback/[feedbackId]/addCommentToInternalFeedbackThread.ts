import { withAppAdminPrivilegesApi } from '@/utils/api-routes/wrappers/withAppAdminPrivilegesApi';
import { NextApiRequest, NextApiResponse } from 'next';
import { AppSupabaseClient } from '@/types';
import { z } from 'zod';
import { withAllowedMethods } from '@/utils/api-routes/wrappers/withAllowedMethods';
import { addCommentToInternalFeedbackThread } from '@/utils/supabase/internalFeedback';

const bodySchema = z.object({
  comment: z.string(),
  userId: z.string(),
});

const querySchema = z.object({
  feedbackId: z.string(),
});

const addCommentToInternalFeedbackThreadApi = async (
  req: NextApiRequest,
  res: NextApiResponse,
  supabaseAdminServerClient: AppSupabaseClient
) => {
  const { feedbackId } = querySchema.parse(req.query);
  const { comment, userId } = bodySchema.parse(req.body);

  try {
    const data = await addCommentToInternalFeedbackThread(
      supabaseAdminServerClient,
      feedbackId,
      userId,
      comment
    );
    res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export default withAllowedMethods(
  ['POST'],
  withAppAdminPrivilegesApi(addCommentToInternalFeedbackThreadApi)
);
