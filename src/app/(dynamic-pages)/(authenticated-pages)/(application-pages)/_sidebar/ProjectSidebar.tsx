import { Anchor } from '@/components/Anchor';
import { OrganizationSwitcher } from './OrganizationSwitcher';
import {
  createFetchSlimOrganizations,
  createGetSlimProjectById,
} from './actions';

export async function ProjectSidebar({ projectId }: { projectId: string }) {
  const fetchOrganizations = createFetchSlimOrganizations();
  const [slimOrganizations, project] = await Promise.all([
    fetchOrganizations(),
    createGetSlimProjectById(projectId)(),
  ]);
  const organizationId = project.organization_id;

  return (
    <div className="flex flex-col space-y-2">
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
