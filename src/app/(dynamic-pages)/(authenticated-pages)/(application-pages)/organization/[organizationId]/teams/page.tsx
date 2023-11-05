import { createSupabaseUserServerComponentClient } from '@/supabase-clients/user/createSupabaseUserServerComponentClient';
import { getTeamsInOrganization } from '@/utils/supabase/teams';
import { z } from 'zod';
import { OrganizationTeams } from './OrganizationTeams';
import { unstable_cache } from 'next/cache';
import { nextCacheKeys } from '@/utils/nextCacheTags';
// import setCurrentOrganizationIdAction from '@/app/(dynamic-pages)/(authenticated-pages)/actions';

const paramsSchema = z.object({
  organizationId: z.string(),
});

export default async function OrganizationPage({
  params,
}: {
  params: z.infer<typeof paramsSchema>;
}) {
  // Add dashed border
  const { organizationId } = paramsSchema.parse(params);

  // setCurrentOrganizationIdAction(organizationId);

  const fetchTeams = unstable_cache(
    async () => {
      'use server';
      return await getTeamsInOrganization(
        createSupabaseUserServerComponentClient(),
        organizationId,
      );
    },
    [nextCacheKeys.teamsInOrganization(organizationId)],
    {
      tags: [nextCacheKeys.teamsInOrganization(organizationId)],
    },
  );

  const teams = await fetchTeams();

  return (
    <div className="space-y-4">
      {teams.length ? (
        <OrganizationTeams organizationId={organizationId} teams={teams} />
      ) : (
        <p>No teams</p>
      )}
    </div>
  );
}
