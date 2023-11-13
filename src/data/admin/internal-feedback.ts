'use server';
import { supabaseAdminClient } from '@/supabase-clients/admin/supabaseAdminClient';
import { Enum } from '@/types';
import { unstable_noStore as noStore } from 'next/cache';
import { ensureAppAdmin } from './security';

export const getPaginatedInternalFeedbackList = async ({
  query = '',
  types = [],
  statuses = [],
  priorities = [],
  page = 1,
  limit = 10,
  sort = 'desc',
}: {
  page?: number;
  limit?: number;
  query?: string;
  types?: Array<Enum<'internal_feedback_thread_type'>>;
  statuses?: Array<Enum<'internal_feedback_thread_status'>>;
  priorities?: Array<Enum<'internal_feedback_thread_priority'>>;
  sort?: 'asc' | 'desc';
}) => {
  const zeroIndexedPage = page - 1;
  let supabaseQuery = supabaseAdminClient
    .from('internal_feedback_threads')
    .select('*')
    .range(zeroIndexedPage * limit, (zeroIndexedPage + 1) * limit - 1);

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

  if (sort === 'asc') {
    supabaseQuery = supabaseQuery.order('created_at', { ascending: true });
  } else {
    supabaseQuery = supabaseQuery.order('created_at', { ascending: false });
  }

  const { data, error } = await supabaseQuery;
  if (error) {
    throw error;
  }

  return data;
};

export async function getInternalFeedbackTotalPages({
  query = '',
  types = [],
  statuses = [],
  priorities = [],
  page = 1,
  limit = 10,
  sort = 'desc',
}: {
  page?: number;
  limit?: number;
  query?: string;
  types?: Array<Enum<'internal_feedback_thread_type'>>;
  statuses?: Array<Enum<'internal_feedback_thread_status'>>;
  priorities?: Array<Enum<'internal_feedback_thread_priority'>>;
  sort?: 'asc' | 'desc';
}) {
  const zeroIndexedPage = page - 1;
  let supabaseQuery = supabaseAdminClient
    .from('internal_feedback_threads')
    .select('id', {
      count: 'exact',
      head: true,
    })
    .range(zeroIndexedPage * limit, (zeroIndexedPage + 1) * limit - 1);

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

  if (sort === 'asc') {
    supabaseQuery = supabaseQuery.order('created_at', { ascending: true });
  } else {
    supabaseQuery = supabaseQuery.order('created_at', { ascending: false });
  }

  const { count, error } = await supabaseQuery;
  if (error) {
    throw error;
  }

  if (!count) {
    return 0;
  }

  return Math.ceil(count / limit);
}

export async function updateInternalFeedbackStatus(
  feedbackId: string,
  status: Enum<'internal_feedback_thread_status'>,
) {
  const { error } = await supabaseAdminClient
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
  const { error } = await supabaseAdminClient
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
  const { data, error } = await supabaseAdminClient
    .from('internal_feedback_threads')
    .update({ type })
    .eq('id', feedbackId);

  if (error) {
    throw error;
  }

  return data;
};

export async function createInternalFeedback(
  userId: string,
  payload: {
    title: string;
    content: string;
    type: Enum<'internal_feedback_thread_type'>;
  },
) {
  const { data, error } = await supabaseAdminClient
    .from('internal_feedback_threads')
    .insert({
      title: payload.title,
      content: payload.content,
      type: payload.type,
      user_id: userId,
    })
    .select('*');

  if (error) {
    throw error;
  }

  return data[0];
}

export async function createInternalFeedbackComment(
  feedbackId: string,
  userId: string,
  content: string,
) {
  const { data, error } = await supabaseAdminClient
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
  const { data, error } = await supabaseAdminClient
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
  const { data, error } = await supabaseAdminClient
    .from('internal_feedback_threads')
    .update({ open_for_public_discussion: isOpen })
    .eq('id', threadId)
    .select('*');

  if (error) {
    throw error;
  }

  return data;
}
