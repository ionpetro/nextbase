import { supabaseAdminClient } from '@/supabase-clients/admin/supabaseAdminClient';
import { nextCacheKeys, nextCacheTags } from '@/utils/nextCacheTags';
import { unstable_cache } from 'next/cache';

export const getChangelogList = unstable_cache(
  async () => {
    'use server';
    const { data, error } = await supabaseAdminClient
      .from('internal_changelog')
      .select('*');

    if (error) {
      throw error;
    }

    return data;
  },
  [nextCacheKeys.appAdminInternalChangelogList()],
  {
    tags: [nextCacheTags.internalChangelog],
  },
);
