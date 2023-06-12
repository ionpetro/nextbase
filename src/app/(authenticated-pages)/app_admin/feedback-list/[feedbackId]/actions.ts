'use server';
import { Enum } from '@/types';
import { supabaseAdminServerActionClient } from '@/utils/supabase-admin-server-action';

export const getInternalFeedbackById = async (feedbackId: string) => {
  const { data, error } = await supabaseAdminServerActionClient
    .from('internal_feedback_threads')
    .select('*')
    .eq('id', feedbackId)
    .single();
  if (error) {
    throw error;
  }

  return data;
};

export const getInternalFeedbackComments = async (feedbackId: string) => {
  const { data, error } = await supabaseAdminServerActionClient
    .from('internal_feedback_comments')
    .select('*')
    .eq('thread_id', feedbackId);

  if (error) {
    throw error;
  }

  return data;
};

export const updateInternalFeedbackStatus = async (
  feedbackId: string,
  status: Enum<'internal_feedback_thread_status'>
) => {
  const { data, error } = await supabaseAdminServerActionClient
    .from('internal_feedback_threads')
    .update({ status })
    .eq('id', feedbackId);

  if (error) {
    throw error;
  }

  return data;
};

export const updateInternalFeedbackPriority = async (
  feedbackId: string,
  priority: Enum<'internal_feedback_thread_priority'>
) => {
  const { data, error } = await supabaseAdminServerActionClient
    .from('internal_feedback_threads')
    .update({ priority })
    .eq('id', feedbackId);

  if (error) {
    throw error;
  }

  return data;
};

export const updateInternalFeedbackType = async (
  feedbackId: string,
  type: Enum<'internal_feedback_thread_type'>
) => {
  const { data, error } = await supabaseAdminServerActionClient
    .from('internal_feedback_threads')
    .update({ type })
    .eq('id', feedbackId);

  if (error) {
    throw error;
  }

  return data;
};

export const updateInternalFeedbackIsOpenForDiscussion = async (
  feedbackId: string,
  isOpenForPublicDiscussion: boolean
) => {
  const { data, error } = await supabaseAdminServerActionClient
    .from('internal_feedback_threads')
    .update({ open_for_public_discussion: isOpenForPublicDiscussion })
    .eq('id', feedbackId);

  if (error) {
    throw error;
  }

  return data;
};

typeof updateInternalFeedbackIsOpenForDiscussion;

export const updateInternalFeedbackIsAddedToRoadmap = async (
  feedbackId: string,
  isAddedToRoadmap: boolean
) => {
  const { data, error } = await supabaseAdminServerActionClient
    .from('internal_feedback_threads')
    .update({ added_to_roadmap: isAddedToRoadmap })
    .eq('id', feedbackId);

  if (error) {
    throw error;
  }

  return data;
};

export const addCommentToInternalFeedbackThread = async (
  feedbackId: string,
  comment: string,
  userId: string
) => {
  const { data, error } = await supabaseAdminServerActionClient
    .from('internal_feedback_comments')
    .insert({
      thread_id: feedbackId,
      content: comment,
      user_id: userId,
    });

  if (error) {
    throw error;
  }

  return data;
};
