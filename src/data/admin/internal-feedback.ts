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
  ensureAppAdmin();
  const zeroIndexedPage = page - 1;
  noStore();
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
  noStore();
  ensureAppAdmin();
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
