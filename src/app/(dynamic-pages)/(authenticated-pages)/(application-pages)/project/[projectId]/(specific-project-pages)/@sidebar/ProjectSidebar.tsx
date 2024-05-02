import { LucideIcon } from '@/components/LucideIcon';
import { OrganizationSwitcher } from '@/components/SidebarComponents/OrganizationSwitcher';
import { DesktopSidebarFallback } from '@/components/SidebarComponents/SidebarFallback';
import { SwitcherAndToggle } from '@/components/SidebarComponents/SidebarLogo';
import { SidebarLink } from '@/components/SidebarLink';
import { fetchSlimOrganizations } from '@/data/user/organizations';
import { getSlimProjectById } from '@/data/user/projects';
import { cn } from '@/utils/cn';
import { projectParamSchema } from '@/utils/zod-schemas/params';
import { Suspense } from 'react';

async function ProjectSidebarInternal({ projectId }: { projectId: string }) {
  const [slimOrganizations, project] = await Promise.all([
    fetchSlimOrganizations(),
    getSlimProjectById(projectId),
  ]);
  const organizationId = project.organization_id;

  return (
    <div
      className={cn(
        'flex flex-col justify-between h-full',
        'lg:px-3 lg:py-4 lg:pt-2.5 ',
      )}
    >
      <div>
        <SwitcherAndToggle organizationId={organizationId} slimOrganizations={slimOrganizations} />
        <div className="flex flex-col">
          <SidebarLink
            label="Back to organization"
            href={`/organization/${organizationId}`}
            icon={<LucideIcon name="ArrowLeft" className="w-5 h-5" />}
          />
          {project.team_id && (
            <SidebarLink
              label="Back to team"
              href={`/organization/${organizationId}/team/${project.team_id}`}
              icon={<LucideIcon name="ArrowLeft" className="w-5 h-5" />}
            />
          )}
          <SidebarLink
            label="Project Home"
            href={`/project/${projectId}`}
            icon={<LucideIcon name="Layers" className="w-5 h-5" />}
          />
          <SidebarLink
            label="Project Settings"
            href={`/project/${projectId}/settings`}
            icon={<LucideIcon name="Settings" className="w-5 h-5" />}
          />
        </div>
      </div>
      <OrganizationSwitcher
        currentOrganizationId={organizationId}
        slimOrganizations={slimOrganizations}
      />
    </div>
  );
}

export async function ProjectSidebar({ params }: { params: unknown }) {
  const { projectId } = projectParamSchema.parse(params);
  return (
    <Suspense fallback={<DesktopSidebarFallback />}>
      <ProjectSidebarInternal projectId={projectId} />
    </Suspense>
  );
}
