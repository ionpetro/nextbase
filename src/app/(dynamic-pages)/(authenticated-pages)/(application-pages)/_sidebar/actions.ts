import { createSupabaseUserServerComponentClient } from '@/supabase-clients/user/createSupabaseUserServerComponentClient';
import { nextCacheKeys, nextCacheTags } from '@/utils/nextCacheTags';
import { serverGetLoggedInUser } from '@/utils/server/serverGetLoggedInUser';
import { getAllSlimOrganizationsForUser } from '@/utils/supabase/organizations';
import { unstable_cache } from 'next/cache';

export function createFetchSlimOrganizations() {
  return unstable_cache(
    async () => {
      'use server';
      const currentUser = await serverGetLoggedInUser();
      const supabaseClient = createSupabaseUserServerComponentClient();
      const organizations = await getAllSlimOrganizationsForUser(
        supabaseClient,
        currentUser.id,
      );
      return organizations;
    },
    [nextCacheKeys.slimOrganizations()],
    {
      tags: [nextCacheTags.organizations],
      revalidate: 60,
    },
  );
}

export function createGetSlimTeamById(teamId: number) {
  return unstable_cache(
    async () => {
      'use server';
      const supabaseClient = createSupabaseUserServerComponentClient();
      const { data, error } = await supabaseClient
        .from('teams')
        .select('id,name,organization_id')
        .eq('id', teamId)
        .single();
      if (error) {
        throw error;
      }
      return data;
    },
    [nextCacheKeys.teamById(teamId)],
    {
      tags: [nextCacheTags.teams],
    },
  );
}

export function createGetSlimProjectById(projectId: string) {
  return unstable_cache(
    async () => {
      'use server';
      const supabaseClient = createSupabaseUserServerComponentClient();
      const { data, error } = await supabaseClient
        .from('projects')
        .select('id,name,project_status,organization_id,team_id') // specify the columns you need
        .eq('id', projectId)
        .single();
      if (error) {
        throw error;
      }
      return data;
    },
    [nextCacheKeys.projectById(projectId)],
    {
      tags: [nextCacheTags.projects],
    },
  );
}
