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
import { useRefetchablePromiseFactory } from '@/contexts/RefetchablePromiseFactory';
import { cn } from '@/utils/cn';
import { Anchor } from '@/components/Anchor';
import { nextCacheTags } from '@/utils/nextCacheTags';

function TeamDetails({
  organizationId,
  teamId,
}: {
  organizationId: string;
  teamId: number;
}) {
  const fetcher = useCallback(() => {
    return getTeamById(supabaseUserClientComponentClient, teamId);
  }, [organizationId]);
  const team = useRefetchablePromiseFactory(
    fetcher,
    nextCacheTags.teamById(teamId),
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
