'use server';
import { getLoggedInUserAction } from '@/app/(dynamic-pages)/_server-actions/user';
import { createSupabaseUserServerActionClient } from '@/supabase-clients/user/createSupabaseUserServerActionClient';
import { AppSupabaseClient, Enum } from '@/types';
import {
  addCommentToInternalFeedbackThread,
  updateInternalFeedbackType,
} from '@/utils/supabase/internalFeedback';
import { revalidatePath } from 'next/cache';

export async function addComment({
  feedbackId,
  content,
}: {
  feedbackId: string;
  content: string;
}) {
  const supabaseClient = createSupabaseUserServerActionClient();
  const user = await getLoggedInUserAction(supabaseClient);
  await addCommentToInternalFeedbackThread(
    supabaseClient,
    feedbackId,
    user.id,
    content
  );
  revalidatePath('/');
}

export async function updateType({
  feedbackId,
  type,
}: {
  feedbackId: string;
  type: Enum<'internal_feedback_thread_type'>;
}) {
  const supabaseClient = createSupabaseUserServerActionClient();
  await updateInternalFeedbackType(supabaseClient, feedbackId, type);
  revalidatePath('/');
}
