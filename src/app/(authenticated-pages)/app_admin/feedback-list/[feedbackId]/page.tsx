import { supabaseAdminServerComponentClient } from '@/utils/supabase-admin-server-component-client';
import { z } from 'zod';
import {
  addCommentToInternalFeedbackThread,
  getInternalFeedbackById,
  getInternalFeedbackComments,
  updateInternalFeedbackIsAddedToRoadmap,
  updateInternalFeedbackIsOpenForDiscussion,
  updateInternalFeedbackPriority,
  updateInternalFeedbackStatus,
  updateInternalFeedbackType,
} from './actions';
import ClientAdminFeedbackItemPage from './ClientFeedbackItemPage';

const getInternalFeedbackByIdSC = async (feedbackId: string) => {
  const { data, error } = await supabaseAdminServerComponentClient
    .from('internal_feedback_threads')
    .select('*')
    .eq('id', feedbackId)
    .single();
  if (error) {
    throw error;
  }

  return data;
};

const feedbackItemPageParams = z.object({
  feedbackId: z.string(),
});

export default async function AppAdminFeedbackItemPage({
  params,
}: {
  params: unknown;
}) {
  const { feedbackId } = feedbackItemPageParams.parse(params);

  const feedbackThread = await getInternalFeedbackByIdSC(feedbackId);
  return (
    <ClientAdminFeedbackItemPage
      addCommentToInternalFeedbackThread={addCommentToInternalFeedbackThread}
      getInternalFeedbackById={getInternalFeedbackById}
      getInternalFeedbackComments={getInternalFeedbackComments}
      updateInternalFeedbackIsAddedToRoadmap={
        updateInternalFeedbackIsAddedToRoadmap
      }
      updateInternalFeedbackIsOpenForDiscussion={
        updateInternalFeedbackIsOpenForDiscussion
      }
      updateInternalFeedbackPriority={updateInternalFeedbackPriority}
      updateInternalFeedbackStatus={updateInternalFeedbackStatus}
      updateInternalFeedbackType={updateInternalFeedbackType}
      feedbackThread={feedbackThread}
    />
  );
}
