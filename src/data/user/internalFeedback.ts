'use server';

import { createSupabaseUserServerActionClient } from '@/supabase-clients/user/createSupabaseUserServerActionClient';
import { createSupabaseUserServerComponentClient } from '@/supabase-clients/user/createSupabaseUserServerComponentClient';
import { Enum } from '@/types';
import { serverGetLoggedInUser } from '@/utils/server/serverGetLoggedInUser';
import { revalidatePath } from 'next/cache';

export async function getAllInternalFeedbackForLoggedInUser() {
  const user = await serverGetLoggedInUser();
  const supabaseClient = createSupabaseUserServerComponentClient();
  const { data, error } = await supabaseClient
    .from('internal_feedback_threads')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return data;
}

export async function getAllInternalFeedbackForUser(userId: string) {
  const supabaseClient = createSupabaseUserServerComponentClient();
  const { data, error } = await supabaseClient
    .from('internal_feedback_threads')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return data;
}

export async function getAllInternalFeedback({
  query,
  types,
  statuses,
  priorities,
}: {
  query: string;
  types: Array<Enum<'internal_feedback_thread_type'>>;
  statuses: Array<Enum<'internal_feedback_thread_status'>>;
  priorities: Array<Enum<'internal_feedback_thread_priority'>>;
}) {
  const supabaseClient = createSupabaseUserServerComponentClient();
  let supabaseQuery = supabaseClient
    .from('internal_feedback_threads')
    .select('*');

  if (query) {
    supabaseQuery = supabaseQuery.ilike('title', `%${query}%`);
  }

  if (types.length > 0) {
    supabaseQuery = supabaseQuery.in('type', types);
  }

  if (statuses.length > 0) {
    supabaseQuery = supabaseQuery.in('status', statuses);
  }

  if (priorities.length > 0) {
    supabaseQuery = supabaseQuery.in('priority', priorities);
  }

  const { data, error } = await supabaseQuery.order('created_at', {
    ascending: false,
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function getInternalFeedbackById(feedbackId: string) {
  const supabaseClient = createSupabaseUserServerComponentClient();
  const { data, error } = await supabaseClient
    .from('internal_feedback_threads')
    .select('*')
    .eq('id', feedbackId);

  if (error) {
    throw error;
  }

  return data[0];
}

export async function updateInternalFeedbackStatus(
  feedbackId: string,
  status: Enum<'internal_feedback_thread_status'>,
) {
  const supabaseClient = createSupabaseUserServerActionClient();
  const { error } = await supabaseClient
    .from('internal_feedback_threads')
    .update({ status })
    .eq('id', feedbackId);

  if (error) {
    throw error;
  }
}

export async function updateInternalFeedbackPriority(
  feedbackId: string,
  priority: Enum<'internal_feedback_thread_priority'>,
) {
  const supabaseClient = createSupabaseUserServerActionClient();
  const { error } = await supabaseClient
    .from('internal_feedback_threads')
    .update({ priority })
    .eq('id', feedbackId);

  if (error) {
    throw error;
  }
}

export const updateInternalFeedbackType = async (
  feedbackId: string,
  type: Enum<'internal_feedback_thread_type'>,
) => {
  const supabaseClient = createSupabaseUserServerActionClient();
  const { data, error } = await supabaseClient
    .from('internal_feedback_threads')
    .update({ type })
    .eq('id', feedbackId);

  if (error) {
    throw error;
  }

  return data;
};

export async function createInternalFeedback(payload: {
  title: string;
  content: string;
  type: Enum<'internal_feedback_thread_type'>;
}) {
  const supabaseClient = createSupabaseUserServerActionClient();
  const user = await serverGetLoggedInUser();
  const { data, error } = await supabaseClient
    .from('internal_feedback_threads')
    .insert({
      title: payload.title,
      content: payload.content,
      type: payload.type,
      user_id: user.id,
    })
    .select('*');

  if (error) {
    throw error;
  }

  revalidatePath('/feedback', 'layout');
  revalidatePath('/app_admin', 'layout');

  return data[0];
}

export async function createInternalFeedbackComment(
  feedbackId: string,
  userId: string,
  content: string,
) {
  const supabaseClient = createSupabaseUserServerActionClient();
  const { data, error } = await supabaseClient
    .from('internal_feedback_comments')
    .insert({ thread_id: feedbackId, user_id: userId, content })
    .select('*');

  if (error) {
    throw error;
  }

  return data[0];
}

export async function toggleFeedbackThreadVisibility(
  threadId: string,
  isVisible: boolean,
) {
  const supabaseClient = createSupabaseUserServerActionClient();
  const { data, error } = await supabaseClient
    .from('internal_feedback_threads')
    .update({ added_to_roadmap: isVisible })
    .eq('id', threadId)
    .select('*');

  if (error) {
    throw error;
  }

  return data;
}

export async function toggleFeedbackThreadDiscussion(
  threadId: string,
  isOpen: boolean,
) {
  const supabaseClient = createSupabaseUserServerActionClient();
  const { data, error } = await supabaseClient
    .from('internal_feedback_threads')
    .update({ open_for_public_discussion: isOpen })
    .eq('id', threadId)
    .select('*');

  if (error) {
    throw error;
  }

  return data;
}

export async function createChangelog(title: string, changes: string) {
  const supabaseClient = createSupabaseUserServerActionClient();
  const { data, error } = await supabaseClient
    .from('internal_changelog')
    .insert({
      title,
      changes,
    })
    .select('*');

  if (error) {
    throw error;
  }

  return data[0];
}

export async function getChangelogById(changelogId: string) {
  const supabaseClient = createSupabaseUserServerComponentClient();
  const { data, error } = await supabaseClient
    .from('internal_changelog')
    .select('*')
    .eq('id', changelogId);

  if (error) {
    throw error;
  }

  return data[0];
}

export async function updateChangelog(
  changelogId: string,
  title: string,
  changes: string,
) {
  const supabaseClient = createSupabaseUserServerActionClient();
  const { data, error } = await supabaseClient
    .from('internal_changelog')
    .update({
      title,
      changes,
    })
    .eq('id', changelogId)
    .select('*');

  if (error) {
    throw error;
  }

  return data;
}

export async function deleteChangelog(changelogId: string) {
  const supabaseClient = createSupabaseUserServerActionClient();
  const { data, error } = await supabaseClient
    .from('internal_changelog')
    .delete()
    .eq('id', changelogId);

  if (error) {
    throw error;
  }

  return data;
}

export const getInternalFeedbackComments = async (feedbackId: string) => {
  const supabaseClient = createSupabaseUserServerComponentClient();
  const { data, error } = await supabaseClient
    .from('internal_feedback_comments')
    .select('*')
    .eq('thread_id', feedbackId);

  if (error) {
    throw error;
  }

  return data;
};

export const getSlimInternalFeedback = async (feedbackId: string) => {
  const supabaseClient = createSupabaseUserServerComponentClient();
  const { data, error } = await supabaseClient
    .from('internal_feedback_threads')
    .select('title,content,status')
    .eq('id', feedbackId)
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const updateInternalFeedbackIsOpenForDiscussion = async (
  feedbackId: string,
  isOpen: boolean,
) => {
  const supabaseClient = createSupabaseUserServerActionClient();
  const { data, error } = await supabaseClient
    .from('internal_feedback_threads')
    .update({ open_for_public_discussion: isOpen })
    .eq('id', feedbackId)
    .select('*');

  if (error) {
    throw error;
  }

  return data;
};

export const updateInternalFeedbackIsAddedToRoadmap = async (
  feedbackId: string,
  isAdded: boolean,
) => {
  const supabaseClient = createSupabaseUserServerActionClient();
  const { data, error } = await supabaseClient
    .from('internal_feedback_threads')
    .update({ added_to_roadmap: isAdded })
    .eq('id', feedbackId)
    .select('*');

  if (error) {
    throw error;
  }

  return data;
};

export const addCommentToInternalFeedbackThread = async (
  feedbackId: string,
  content: string,
) => {
  const user = await serverGetLoggedInUser();
  const supabaseClient = createSupabaseUserServerActionClient();
  const { data, error } = await supabaseClient
    .from('internal_feedback_comments')
    .insert({ thread_id: feedbackId, user_id: user.id, content })
    .select('*');

  if (error) {
    throw error;
  }

  revalidatePath(`/feedback`, 'layout');
  revalidatePath('/app_admin', 'layout');

  return data;
};

export async function userUpdateInternalFeedbackType({
  feedbackId,
  type,
}: {
  feedbackId: string;
  type: Enum<'internal_feedback_thread_type'>;
}) {
  const supabaseClient = createSupabaseUserServerActionClient();
  const { data, error } = await supabaseClient
    .from('internal_feedback_threads')
    .update({ type })
    .eq('id', feedbackId)
    .select('*')
    .single();

  if (error) {
    throw error;
  }
  revalidatePath('/feedback');
  revalidatePath('/app_admin/feedback');
  return data;
}
