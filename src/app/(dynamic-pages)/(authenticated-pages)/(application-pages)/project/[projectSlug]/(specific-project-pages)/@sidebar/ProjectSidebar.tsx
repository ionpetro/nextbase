import { OrganizationSwitcher } from '@/components/SidebarComponents/OrganizationSwitcher';
import { DesktopSidebarFallback } from '@/components/SidebarComponents/SidebarFallback';
import { SwitcherAndToggle } from '@/components/SidebarComponents/SidebarLogo';
import { SidebarLink } from '@/components/SidebarLink';
import { fetchSlimOrganizations, getOrganizationSlugByOrganizationId } from '@/data/user/organizations';
import { getSlimProjectById, getSlimProjectBySlug } from '@/data/user/projects';
import { cn } from '@/utils/cn';
import { projectSlugParamSchema } from '@/utils/zod-schemas/params';
import { ArrowLeft, Layers, Settings } from 'lucide-react';
import { Suspense } from 'react';

async function ProjectSidebarInternal({ projectId, projectSlug }: { projectId: string; projectSlug: string }) {
  const [slimOrganizations, project] = await Promise.all([
    fetchSlimOrganizations(),
    getSlimProjectById(projectId),
  ]);
  const organizationId = project.organization_id;
  const organizationSlug = await getOrganizationSlugByOrganizationId(organizationId);

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
            href={`/${organizationSlug}`}
            icon={<ArrowLeft className="h-5 w-5" />}
          />
          {project.team_id && (
            <SidebarLink
              label="Back to team"
              href={`/${organizationSlug}/team/${project.team_id}`}
              icon={<ArrowLeft className="h-5 w-5" />}
            />
          )}
          <SidebarLink
            label="Project Home"
            href={`/project/${projectSlug}`}
            icon={<Layers className="h-5 w-5" />}
          />
          <SidebarLink
            label="Project Settings"
            href={`/project/${projectSlug}/settings`}
            icon={<Settings className="h-5 w-5" />}
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
  const { projectSlug } = projectSlugParamSchema.parse(params);
  const project = await getSlimProjectBySlug(projectSlug);
  return (
    <Suspense fallback={<DesktopSidebarFallback />}>
      <ProjectSidebarInternal projectId={project.id} projectSlug={project.slug} />
    </Suspense>
  );
}
