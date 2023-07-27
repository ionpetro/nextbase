import { supabaseAdminClient } from '@/supabase-clients/admin/supabaseAdminClient';
import { Enum } from '@/types';
import { getAllInternalFeedback } from '@/utils/supabase/internalFeedback';
import { revalidatePath } from 'next/cache';
import { ClientAdminFeedbackListPage } from './ClientAdminFeedbackListPage';
// Server action must be imported from the server file
// and passed as a prop to the client component

export default function FeedbackList() {

  async function getAllInternalFeedbackAction({
    query,
    types,
    statuses,
    priorities
  }: {
    query: string,
    types: Array<Enum<'internal_feedback_thread_type'>>,
    statuses: Array<Enum<'internal_feedback_thread_status'>>,
    priorities: Array<Enum<'internal_feedback_thread_priority'>>,
  }) {
    'use server';
    const data = await getAllInternalFeedback(supabaseAdminClient, {
      query: query || '',
      types: types || [],
      statuses: statuses || [],
      priorities: priorities || [],
    });
    revalidatePath('/')
    return data;
  }

  return <ClientAdminFeedbackListPage getAllInternalFeedbackAction={getAllInternalFeedbackAction} />;
}
