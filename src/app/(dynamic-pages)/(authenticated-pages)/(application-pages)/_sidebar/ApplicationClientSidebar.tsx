'use client';

import { usePathname } from 'next/navigation';
import { match } from 'path-to-regexp';
import { OrganizationSidebar } from './OrganizationSidebar';
import { ComponentProps, Suspense } from 'react';
import ReactNoSSR from 'react-no-ssr';
import { TeamSidebar } from './TeamSidebar';
import { z } from 'zod';

const matchOrganization = match<{ organization_id: string }>(
  '/organization/:organization_id/(.*)?',
);
const matchTeam = match<{ organization_id: string; team_id: string }>(
  '/organization/:organization_id/team/:team_id/(.*)?',
);
const matchProject = match<{ project_id: string }>(
  '/project/:project_id/(.*)?',
);

function ApplicationClientSidebarInternal({
  slimOrganizations,
}: {
  slimOrganizations: Array<{
    id: string;
    title: string;
  }>;
}) {
  const pathname = usePathname();

  const isTeamPath = pathname ? matchTeam(pathname) : false;
  const isOrganizationPath =
    pathname && !isTeamPath ? matchOrganization(pathname) : false;
  const isProjectPath = pathname ? matchProject(pathname) : false;

  if (isTeamPath) {
    const { organization_id, team_id } = isTeamPath.params;
    const teamId = z.coerce.number().parse(team_id);
    return (
      <TeamSidebar
        organizationId={organization_id}
        teamId={teamId}
        slimOrganizations={slimOrganizations}
      ></TeamSidebar>
    );
  } else if (isOrganizationPath) {
    const { organization_id } = isOrganizationPath.params;
    return (
      <OrganizationSidebar
        organizationId={organization_id}
        slimOrganizations={slimOrganizations}
      />
    );
  } else if (isProjectPath) {
    const { project_id } = isProjectPath.params;
    return <p>You're in the project path for project {project_id}</p>;
  }
  return <p>You are in a generic path</p>;
}

export function ApplicationClientSidebar(
  props: ComponentProps<typeof ApplicationClientSidebarInternal>,
) {
  return (
    <Suspense fallback={<p>Loading application sidebar...</p>}>
      <ApplicationClientSidebarInternal {...props} />
    </Suspense>
  );
}
