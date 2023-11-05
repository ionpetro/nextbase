'use client';

import {
  getSlimTeamsInOrganization,
  getTeamById,
  getTeamsInOrganization,
} from '@/utils/supabase/teams';
import { Suspense, useCallback } from 'react';
import { supabaseUserClientComponentClient } from '@/supabase-clients/user/supabaseUserClientComponentClient';
import { T } from '@/components/ui/Typography';
import { notFound } from 'next/navigation';
import { Anchor } from '@/components/Anchor';
import { nextCacheKeys } from '@/utils/nextCacheTags';
import { useQuery } from '@tanstack/react-query';
import { useClientSuspenseQuery } from '@/hooks/useClientSuspenseQuery';

function TeamDetails({
  organizationId,
  teamId,
}: {
  organizationId: string;
  teamId: number;
}) {
  const team = useClientSuspenseQuery(
    [nextCacheKeys.teamById(teamId)],
    async () => getTeamById(supabaseUserClientComponentClient, teamId),
  );

  return (
    <div>
      <T.H3>{team.name}</T.H3>
      <Anchor href={`/organization/${organizationId}/team/${teamId}/settings`}>
        Settings
      </Anchor>
    </div>
  );
}

export function TeamSidebar({
  organizationId,
  teamId,
  slimOrganizations,
}: {
  organizationId: string;
  teamId: number;
  slimOrganizations: Array<{
    id: string;
    title: string;
  }>;
}) {
  const organization = slimOrganizations.find(
    (organization) => organization.id === organizationId,
  );

  if (!organization) {
    return notFound();
  }
  return (
    <div>
      <T.H3>{organization.title}</T.H3>
      <Anchor href={`/organization/${organizationId}`}>
        Back to organization
      </Anchor>
      <Suspense fallback={<p>Loading...</p>}>
        <TeamDetails organizationId={organizationId} teamId={teamId} />
      </Suspense>
    </div>
  );
}
