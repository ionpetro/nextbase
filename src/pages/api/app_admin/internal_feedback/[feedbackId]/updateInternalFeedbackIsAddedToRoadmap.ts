import { withAppAdminPrivilegesApi } from '@/utils/api-routes/wrappers/withAppAdminPrivilegesApi';
import { NextApiRequest, NextApiResponse } from 'next';
import { AppSupabaseClient } from '@/types';
import { z } from 'zod';
import { withAllowedMethods } from '@/utils/api-routes/wrappers/withAllowedMethods';
import { updateInternalFeedbackIsAddedToRoadmap } from '@/utils/supabase/internalFeedback';

const bodySchema = z.object({
  isAddedToRoadmap: z.boolean(),
});

const querySchema = z.object({
  feedbackId: z.string(),
});

const updateInternalFeedbackIsAddedToRoadmapApi = async (
  req: NextApiRequest,
  res: NextApiResponse,
  supabaseAdminServerClient: AppSupabaseClient
) => {
  const { feedbackId } = querySchema.parse(req.query);
  const { isAddedToRoadmap } = bodySchema.parse(req.body);

  try {
    const data = await updateInternalFeedbackIsAddedToRoadmap(
      supabaseAdminServerClient,
      feedbackId,
      isAddedToRoadmap
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
  withAppAdminPrivilegesApi(updateInternalFeedbackIsAddedToRoadmapApi)
);
