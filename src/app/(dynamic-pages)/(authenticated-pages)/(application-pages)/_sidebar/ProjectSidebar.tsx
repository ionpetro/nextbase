import { Anchor } from '@/components/Anchor';
import { OrganizationSwitcher } from './OrganizationSwitcher';

import { fetchSlimOrganizations } from '@/data/user/organizations';
import { getSlimProjectById } from '@/data/user/projects';

export async function ProjectSidebar({ projectId }: { projectId: string }) {
  const [slimOrganizations, project] = await Promise.all([
    fetchSlimOrganizations(),
    getSlimProjectById(projectId),
  ]);
  const organizationId = project.organization_id;

  return (
    <div className="flex flex-col space-y-2 h-full w-[264px]">
      <OrganizationSwitcher
        currentOrganizationId={organizationId}
        slimOrganizations={slimOrganizations}
      />
      <Anchor href={`/organization/${organizationId}`}>
        Back To Organization
      </Anchor>
      {project.team_id && (
        <Anchor
          href={`/organization/${organizationId}/team/${project.team_id}`}
        >
          Back To Team
        </Anchor>
      )}
      <Anchor href={`/project/${projectId}`}>Project Home</Anchor>
      <Anchor href={`/project/${projectId}/settings`}>Project Settings</Anchor>
    </div>
  );
}
