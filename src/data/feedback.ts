'use server';

import type { Tables } from '@/lib/database.types';
import { supabaseAdminClient } from '@/supabase-clients/admin/supabaseAdminClient';
import { supabaseClientBasedOnUserRole } from '@/supabase-clients/user-role-client';
import type { Enum, ValidSAPayload } from '@/types';
import { serverGetLoggedInUser } from '@/utils/server/serverGetLoggedInUser';
import { serverGetUserType } from '@/utils/server/serverGetUserType';
import { userRoles } from '@/utils/userTypes';
import { revalidatePath } from 'next/cache';

export async function addCommentToInternalFeedbackThread({
  feedbackId,
  content,
}: {
  feedbackId: string;
  content: string;
}): Promise<ValidSAPayload<Tables<'internal_feedback_comments'>[]>> {
  const user = await serverGetLoggedInUser();
  const supabaseClient = await supabaseClientBasedOnUserRole();

  const { data: feedbackThread, error: feedbackThreadError } =
    await supabaseAdminClient
      .from('internal_feedback_threads')
      .select('*')
      .eq('id', feedbackId)
      .maybeSingle();

  if (feedbackThreadError) {
    return {
      status: 'error',
      message: feedbackThreadError.message,
    };
  }

  if (!feedbackThread?.open_for_public_discussion) {
    return {
      status: 'error',
      message: 'This feedback thread is not open for public discussion',
    };
  }

  const { data, error } = await supabaseClient
    .from('internal_feedback_comments')
    .insert({ thread_id: feedbackId, user_id: user.id, content })
    .select('*');

  if (error) {
    return {
      status: 'error',
      message: error.message,
    };
  }

  revalidatePath('/feedback', 'page');
  revalidatePath(`/feedback/${feedbackId}`, 'page');
  return {
    status: 'success',
    data,
  };
}

export async function ownerUpdateFeedbackComment({
  feedbackId,
  commentId,
  feedbackCommentOwnerId,
  content,
}: {
  feedbackId: string;
  commentId: string;
  feedbackCommentOwnerId: string;
  content: string;
}): Promise<ValidSAPayload> {
  const user = await serverGetLoggedInUser();
  if (feedbackCommentOwnerId !== user.id) {
    return {
      status: 'error',
      message: 'You are unathorized to perform this action',
    };
  }

  const supabaseClient = await supabaseClientBasedOnUserRole();

  const { data, error } = await supabaseClient
    .from('internal_feedback_comments')
    .update({ content })
    .eq('id', commentId)
    .eq('thread_id', feedbackId)
    .eq('user_id', feedbackCommentOwnerId);

  if (error) {
    return {
      status: 'error',
      message: error.message,
    };
  }
  revalidatePath('/feedback', 'page');
  revalidatePath(`/feedback/${feedbackId}`, 'page');
  return {
    status: 'success',
  };
}

export async function muteFeedbackThread({
  feedbackId,
  isMuted,
}: {
  feedbackId: string;
  isMuted: boolean;
}) {
  return null;
  // TODO:
  // for logged in users and admins

  // if (error) {
  //     throw error;
  // }

  // revalidatePath(`/feedbacks`, 'page');
  // revalidatePath(`/feedbacks/[[...feedbackId]]`, 'page');
  // return data;
}

export async function adminUpdateFeedbackStatus({
  feedbackId,
  status,
}: {
  feedbackId: string;
  status: Enum<'internal_feedback_thread_status'>;
}) {
  const userRoleType = await serverGetUserType();

  if (userRoleType !== userRoles.ADMIN) {
    throw new Error('You are unathorized to perform this action');
  }

  const { data, error } = await supabaseAdminClient
    .from('internal_feedback_threads')
    .update({ status })
    .eq('id', feedbackId);

  if (error) {
    throw error;
  }

  revalidatePath('/feedback', 'page');
  revalidatePath(`/feedback/${feedbackId}`, 'page');
  return data;
}

export async function adminUpdateFeedbackType({
  feedbackId,
  type,
}: {
  feedbackId: string;
  type: Enum<'internal_feedback_thread_type'>;
}): Promise<ValidSAPayload> {
  const userRoleType = await serverGetUserType();

  if (userRoleType !== userRoles.ADMIN) {
    throw new Error('You are unathorized to perform this action');
  }

  const { error } = await supabaseAdminClient
    .from('internal_feedback_threads')
    .update({ type })
    .eq('id', feedbackId);

  if (error) {
    return { status: 'error', message: error.message };
  }

  revalidatePath(`/feedback/${feedbackId}`, 'page');

  return { status: 'success' };
}

export async function adminUpdateFeedbackPriority({
  feedbackId,
  priority,
}: {
  feedbackId: string;
  priority: Enum<'internal_feedback_thread_priority'>;
}): Promise<ValidSAPayload> {
  const userRoleType = await serverGetUserType();

  if (userRoleType !== userRoles.ADMIN) {
    throw new Error('You are unathorized to perform this action');
  }

  const { error } = await supabaseAdminClient
    .from('internal_feedback_threads')
    .update({ priority })
    .eq('id', feedbackId);

  if (error) {
    return { status: 'error', message: error.message };
  }

  revalidatePath('/feedback', 'page');
  revalidatePath(`/feedback/${feedbackId}`, 'page');

  return { status: 'success' };
}

export async function adminToggleFeedbackFromRoadmap({
  feedbackId,
  isInRoadmap,
}: {
  feedbackId: string;
  isInRoadmap: boolean;
}): Promise<ValidSAPayload> {
  const userRoleType = await serverGetUserType();

  if (userRoleType !== userRoles.ADMIN) {
    throw new Error('You are unathorized to perform this action');
  }

  const { error, data: updatedFeedbackData } = await supabaseAdminClient
    .from('internal_feedback_threads')
    .update({ added_to_roadmap: isInRoadmap })
    .eq('id', feedbackId);

  if (error) {
    return { status: 'error', message: error.message };
  }

  if (isInRoadmap) {
    await adminToggleFeedbackVisibility({
      feedbackId,
      isPubliclyVisible: isInRoadmap,
    });
  }

  revalidatePath('/feedback', 'page');
  revalidatePath(`/feedback/${feedbackId}`, 'page');

  return { status: 'success' };
}

export async function adminToggleFeedbackOpenForComments({
  feedbackId,
  isOpenForComments,
}: {
  feedbackId: string;
  isOpenForComments: boolean;
}): Promise<ValidSAPayload> {
  const userRoleType = await serverGetUserType();

  if (userRoleType !== userRoles.ADMIN) {
    throw new Error('You are unathorized to perform this action');
  }

  const { error } = await supabaseAdminClient
    .from('internal_feedback_threads')
    .update({ open_for_public_discussion: isOpenForComments })
    .eq('id', feedbackId);

  if (error) {
    return { status: 'error', message: error.message };
  }

  if (isOpenForComments) {
    await adminToggleFeedbackVisibility({
      feedbackId,
      isPubliclyVisible: isOpenForComments,
    });
  }

  revalidatePath('/feedback', 'page');
  revalidatePath(`/feedback/${feedbackId}`, 'page');

  return { status: 'success' };
}

export async function adminToggleFeedbackVisibility({
  feedbackId,
  isPubliclyVisible,
}: {
  feedbackId: string;
  isPubliclyVisible: boolean;
}): Promise<ValidSAPayload> {
  const userRoleType = await serverGetUserType();

  if (userRoleType !== userRoles.ADMIN) {
    throw new Error('You are unathorized to perform this action');
  }

  const { error } = await supabaseAdminClient
    .from('internal_feedback_threads')
    .update({ is_publicly_visible: isPubliclyVisible })
    .eq('id', feedbackId);

  if (error) {
    return { status: 'error', message: error.message };
  }

  revalidatePath('/feedback', 'page');
  revalidatePath(`/feedback/${feedbackId}`, 'page');

  return { status: 'success' };
}
