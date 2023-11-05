import { supabaseAdminClient } from '@/supabase-clients/admin/supabaseAdminClient';
import { nextCacheKeys, nextCacheTags } from '@/utils/nextCacheTags';
import moment from 'moment';
import { unstable_cache } from 'next/cache';

export const getRoadmap = unstable_cache(
  async () => {
    'use server';
    const roadmapItemsResponse = await supabaseAdminClient
      .from('internal_feedback_threads')
      .select('*')
      .eq('added_to_roadmap', true);

    if (roadmapItemsResponse.error) {
      throw roadmapItemsResponse.error;
    }
    if (!roadmapItemsResponse.data) {
      throw new Error('No data found');
    }

    const roadmapItems = roadmapItemsResponse.data;

    const roadmapArray = roadmapItems.map((item) => {
      return {
        id: item.id,
        title: item.title,
        description: item.content,
        status: item.status,
        priority: item.priority,
        tag: item.type,
        date: moment(item.created_at).format('LL'),
      };
    });
    const plannedCards = roadmapArray.filter(
      (item) => item.status === 'planned',
    );
    const inProgress = roadmapArray.filter(
      (item) => item.status === 'in_progress',
    );
    const completedCards = roadmapArray.filter(
      (item) => item.status === 'completed',
    );

    return {
      plannedCards,
      inProgress,
      completedCards,
    };
  },
  [nextCacheKeys.appAdminInternalRoadmapList()],
  {
    tags: [nextCacheTags.internalRoadmap],
  },
);
