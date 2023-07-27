import { getUserProfileAction } from '@/app/_server-actions/user';
import { createSupabaseAdminServerComponentClient } from '@/supabase-clients/admin/createSupabaseAdminServerComponentClient';
import { supabaseAdminClient } from '@/supabase-clients/admin/supabaseAdminClient';
import { getInternalFeedbackById, getInternalFeedbackComments } from '@/utils/supabase/internalFeedback';
import { z } from 'zod';
import { addCommentAction, updateInternalFeedbackIsAddedToRoadmapAction, updateInternalFeedbackIsOpenToDiscussionAction, updateInternalFeedbackPriorityAction, updateInternalFeedbackStatusAction, updateInternalFeedbackTypeAction } from '../actions';

import ClientAdminFeedbackItemPage from './ClientFeedbackItemPage';

const feedbackItemPageParams = z.object({
  feedbackId: z.string(),
});

export async function generateMetadata({ params }: {
  params: unknown;
}) {
  const { feedbackId } = feedbackItemPageParams.parse(params);
  const feedbackThread = await getInternalFeedbackById(
    supabaseAdminClient,
    feedbackId
  );


  return {
    title: `${feedbackThread.title} | User Feedback | Nextbase`,
    description: 'User feedback',
  }
}

export default async function AppAdminFeedbackItemPage({
  params,
}: {
  params: unknown;
}) {
  const { feedbackId } = feedbackItemPageParams.parse(params);

  const [feedbackThread, comments] = await Promise.all([getInternalFeedbackById(
    supabaseAdminClient,
    feedbackId
  ),
  getInternalFeedbackComments(
    supabaseAdminClient,
    feedbackId
  )
  ])

  return <ClientAdminFeedbackItemPage
    feedbackThread={feedbackThread}
    addCommentAction={addCommentAction}
    comments={comments}
    getUserProfileAction={getUserProfileAction}
    updateInternalFeedbackIsAddedToRoadmapAction={updateInternalFeedbackIsAddedToRoadmapAction}
    updateInternalFeedbackIsOpenToDiscussionAction={updateInternalFeedbackIsOpenToDiscussionAction}
    updateInternalFeedbackPriorityAction={updateInternalFeedbackPriorityAction}
    updateInternalFeedbackStatusAction={updateInternalFeedbackStatusAction}
    updateInternalFeedbackTypeAction={updateInternalFeedbackTypeAction}
  />;
}
