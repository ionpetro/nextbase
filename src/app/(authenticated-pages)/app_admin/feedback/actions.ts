'use server'

import { supabaseAdminClient } from "@/supabase-clients/admin/supabaseAdminClient";
import { createSupabaseUserServerActionClient } from "@/supabase-clients/user/createSupabaseUserServerActionClient";
import { addCommentToInternalFeedbackThread, updateInternalFeedbackIsAddedToRoadmap, updateInternalFeedbackIsOpenForDiscussion, updateInternalFeedbackPriority, updateInternalFeedbackStatus, updateInternalFeedbackType } from "@/utils/supabase/internalFeedback";
import { revalidatePath } from "next/cache";
import { Enum } from "@/types";
import { getLoggedInUserAction } from "@/app/_server-actions/user";

export const addCommentAction = async ({
  feedbackId,
  comment
}: {
  feedbackId: string,
  comment: string
}) => {
  const supabaseClient = createSupabaseUserServerActionClient();
  const user = await getLoggedInUserAction(supabaseClient);
  await addCommentToInternalFeedbackThread(
    supabaseAdminClient,
    feedbackId,
    user.id,
    comment
  );
  revalidatePath('/');
}

export const updateInternalFeedbackIsAddedToRoadmapAction = async ({
  feedbackId,
  isAddedToRoadmap
}: {
  feedbackId: string,
  isAddedToRoadmap: boolean
}) => {

  await updateInternalFeedbackIsAddedToRoadmap(
    supabaseAdminClient,
    feedbackId,
    isAddedToRoadmap
  );

  revalidatePath('/');
}

export const updateInternalFeedbackIsOpenToDiscussionAction = async ({
  feedbackId,
  isOpenToDiscussion
}: {
  feedbackId: string,
  isOpenToDiscussion: boolean
}) => {

  await updateInternalFeedbackIsOpenForDiscussion(
    supabaseAdminClient,
    feedbackId,
    isOpenToDiscussion
  );

  revalidatePath('/');
}


export const updateInternalFeedbackPriorityAction = async ({
  feedbackId,
  priority
}: {
  feedbackId: string,
  priority: Enum<'internal_feedback_thread_priority'>

}) => {

  await updateInternalFeedbackPriority(
    supabaseAdminClient,
    feedbackId,
    priority
  );

  revalidatePath('/');
}

export const updateInternalFeedbackStatusAction = async ({
  feedbackId,
  status
}: {
  feedbackId: string,
  status: Enum<'internal_feedback_thread_status'>

}) => {

  await updateInternalFeedbackStatus(
    supabaseAdminClient,
    feedbackId,
    status
  );

  revalidatePath('/');
}

export const updateInternalFeedbackTypeAction = async ({
  feedbackId,
  type
}: {
  feedbackId: string,
  type: Enum<'internal_feedback_thread_type'>

}) => {

  await updateInternalFeedbackType(
    supabaseAdminClient,
    feedbackId,
    type
  );

  revalidatePath('/');
}
