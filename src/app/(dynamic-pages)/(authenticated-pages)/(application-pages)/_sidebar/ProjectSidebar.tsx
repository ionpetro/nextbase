import { ProFeatureGateDialog } from '@/components/ProFeatureGateDialog';
import { SidebarLink } from '@/components/SidebarLink';
import { fetchSlimOrganizations } from '@/data/user/organizations';
import { getSlimProjectById } from '@/data/user/projects';
import { cn } from '@/utils/cn';
import ArrowLeftIcon from 'lucide-react/dist/esm/icons/arrow-left';
import FileBoxIcon from 'lucide-react/dist/esm/icons/file-box';
import ProjectIcon from 'lucide-react/dist/esm/icons/layers';
import SettingsIcon from 'lucide-react/dist/esm/icons/settings';
import { Suspense } from 'react';
import { OrganizationSwitcher } from './_components/OrganizationSwitcher';
import { DesktopSidebarFallback } from './_components/SidebarFallback';
import { SidebarLogoAndToggle } from './_components/SidebarLogo';

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
        <SidebarLogoAndToggle />
        <div className="flex flex-col">
          <SidebarLink
            label="Back to organization"
            href={`/organization/${organizationId}`}
            icon={<ArrowLeftIcon className="h-5 w-5" />}
          />
          {project.team_id && (
            <SidebarLink
              label="Back to team"
              href={`/organization/${organizationId}/team/${project.team_id}`}
              icon={<ArrowLeftIcon className="h-5 w-5" />}
            />
          )}
          <SidebarLink
            label="Project Home"
            href={`/project/${projectId}`}
            icon={<ProjectIcon className="h-5 w-5" />}
          />
          <SidebarLink
            label="Project Settings"
            href={`/project/${projectId}/settings`}
            icon={<SettingsIcon className="h-5 w-5" />}
          />
          <Suspense>
            <ProFeatureGateDialog
              organizationId={organizationId}
              label="Feature Pro"
              icon={<FileBoxIcon className="h-5 w-5" />}
            />
          </Suspense>
        </div>
      </div>
      <OrganizationSwitcher
        currentOrganizationId={organizationId}
        slimOrganizations={slimOrganizations}
      />
    </div>
  );
}

export async function ProjectSidebar({ projectId }: { projectId: string }) {
  return (
    <Suspense fallback={<DesktopSidebarFallback />}>
      <ProjectSidebarInternal projectId={projectId} />
    </Suspense>
  );
}
