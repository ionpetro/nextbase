// src/app/(dynamic-pages)/(authenticated-pages)/(application-pages)/_sidebar/ProjectSidebar.tsx
'use client';

import { Suspense, useCallback } from 'react';
import { supabaseUserClientComponentClient } from '@/supabase-clients/user/supabaseUserClientComponentClient';
import { T } from '@/components/ui/Typography';
import { Anchor } from '@/components/Anchor';
import { nextCacheKeys } from '@/utils/nextCacheTags';
import { useQuery } from '@tanstack/react-query';
import { getProjectById } from '@/utils/supabase/projects';
import { getOrganizationById } from '@/utils/supabase/organizations';
import { getTeamById } from '@/utils/supabase/teams';
import { useClientSuspenseQuery } from '@/hooks/useClientSuspenseQuery';

function BackToTeam({
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
      <Anchor href={`/organization/${organizationId}/team/${teamId}`}>
        Back to {team.name} team
      </Anchor>
    </div>
  );
}

function BackToOrganization({ organizationId }: { organizationId: string }) {
  const organization = useClientSuspenseQuery(
    [nextCacheKeys.organizationById(organizationId)],
    () =>
      getOrganizationById(supabaseUserClientComponentClient, organizationId),
  );

  return (
    <div>
      <Anchor href={`/organization/${organizationId}`}>
        Back to {organization.title} organization
      </Anchor>
    </div>
  );
}

function ProjectDetails({ projectId }: { projectId: string }) {
  const fetcher = useCallback(() => {
    return getProjectById(supabaseUserClientComponentClient, projectId);
  }, [projectId]);
  const project = useClientSuspenseQuery(
    [nextCacheKeys.projectById(projectId)],
    () => getProjectById(supabaseUserClientComponentClient, projectId),
  );

  return (
    <div>
      <T.H3>{project.name}</T.H3>
      <Suspense fallback={<p>Loading organization...</p>}>
        <BackToOrganization organizationId={project.organization_id} />
      </Suspense>
      {project.team_id && (
        <Suspense fallback={<p>Loading team...</p>}>
          <BackToTeam
            organizationId={project.organization_id}
            teamId={project.team_id}
          />
        </Suspense>
      )}
      <Anchor href={`/project/${projectId}/settings`}>Project Settings</Anchor>
    </div>
  );
}

export function ProjectSidebar({ projectId }: { projectId: string }) {
  return (
    <div>
      <Suspense fallback={<p>Loading...</p>}>
        <ProjectDetails projectId={projectId} />
      </Suspense>
    </div>
  );
}
