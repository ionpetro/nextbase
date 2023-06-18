import { withAppAdminPrivilegesApi } from '@/utils/api-routes/wrappers/withAppAdminPrivilegesApi';
import { NextApiRequest, NextApiResponse } from 'next';
import { AppSupabaseClient } from '@/types';
import { z } from 'zod';
import { withAllowedMethods } from '@/utils/api-routes/wrappers/withAllowedMethods';
import { updateInternalFeedbackIsOpenForDiscussion } from '@/utils/supabase/internalFeedback';

const bodySchema = z.object({
  isOpenForPublicDiscussion: z.boolean(),
});

const querySchema = z.object({
  feedbackId: z.string(),
});

const updateInternalFeedbackIsOpenForDiscussionApi = async (
  req: NextApiRequest,
  res: NextApiResponse,
  supabaseAdminServerClient: AppSupabaseClient
) => {
  const { feedbackId } = querySchema.parse(req.query);
  const { isOpenForPublicDiscussion } = bodySchema.parse(req.body);

  try {
    const data = await updateInternalFeedbackIsOpenForDiscussion(
      supabaseAdminServerClient,
      feedbackId,
      isOpenForPublicDiscussion
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
  withAppAdminPrivilegesApi(updateInternalFeedbackIsOpenForDiscussionApi)
);
``;
