'use server';
import { supabaseAdmin } from '@/utils/supabase-admin';
import { AdminGetAllInternalFeedack } from '../types';

export async function myAction() {
  console.log('myAction');
  return 5;
}

export const getAllInternalFeedback: AdminGetAllInternalFeedack = async ({
  query,
  types,
  statuses,
  priorities,
}) => {
  let supabaseQuery = supabaseAdmin
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

  const { data, error } = await supabaseQuery;

  if (error) {
    throw error;
  }

  return data;
};
