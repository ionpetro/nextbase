'use server';

import { supabaseAnonClient } from '@/supabase-clients/anon/supabaseAnonClient';
import { Enum } from '@/types';

export async function anonGetRoadmapFeedbackList() {
  const roadmapItemsResponse = await supabaseAnonClient
    .from('internal_feedback_threads')
    .select('*')
    .eq('added_to_roadmap', true);
  if (roadmapItemsResponse.error) {
    throw roadmapItemsResponse.error;
  }
  if (!roadmapItemsResponse.data) {
    throw new Error('No data found');
  }

  return roadmapItemsResponse.data;
}

async function getRoadmapFeedbackByStatus(
  status: Enum<'internal_feedback_thread_status'>,
) {
  const roadmapItemsResponse = await supabaseAnonClient
    .from('internal_feedback_threads')
    .select('*')
    .eq('added_to_roadmap', true)
    .eq('status', status);
  if (roadmapItemsResponse.error) {
    throw roadmapItemsResponse.error;
  }
  if (!roadmapItemsResponse.data) {
    throw new Error('No data found');
  }
  return roadmapItemsResponse.data;
}

export const anonGetPlannedRoadmapFeedbackList = () =>
  getRoadmapFeedbackByStatus('planned');
export const anonGetInProgressRoadmapFeedbackList = () =>
  getRoadmapFeedbackByStatus('in_progress');
export const anonGetCompletedRoadmapFeedbackList = () =>
  getRoadmapFeedbackByStatus('completed');
