import { createSupabaseUserServerComponentClient } from '@/supabase-clients/user/createSupabaseUserServerComponentClient';
import { getTeamsInOrganization } from '@/utils/supabase/teams';
import { z } from 'zod';
import { OrganizationTeams } from './OrganizationTeams';
import { unstable_cache } from 'next/cache';
import { cacheTags } from '@/utils/nextCache';

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
  const fetchTeams = unstable_cache(
    async () => {
      'use server';
      return await getTeamsInOrganization(
        createSupabaseUserServerComponentClient(),
        organizationId,
      );
    },
    undefined,
    {
      tags: [cacheTags.teamsInOrganization(organizationId)],
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
