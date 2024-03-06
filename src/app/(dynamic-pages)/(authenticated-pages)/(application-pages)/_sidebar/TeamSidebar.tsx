import { ProFeatureGateDialog } from '@/components/ProFeatureGateDialog';
import { SidebarLink } from '@/components/SidebarLink';
import { SubscriptionCardSmall } from '@/components/SubscriptionCardSmall';
import { T } from '@/components/ui/Typography';
import { fetchSlimOrganizations } from '@/data/user/organizations';
import { getSlimTeamById } from '@/data/user/teams';
import { cn } from '@/utils/cn';
import ArrowLeftIcon from 'lucide-react/dist/esm/icons/arrow-left';
import FileBoxIcon from 'lucide-react/dist/esm/icons/file-box';
import TeamIcon from 'lucide-react/dist/esm/icons/folder';
import SettingsIcon from 'lucide-react/dist/esm/icons/settings';
import { Suspense } from 'react';
import { OrganizationSwitcher } from './_components/OrganizationSwitcher';
import { DesktopSidebarFallback } from './_components/SidebarFallback';
import { SidebarLogoAndToggle } from './_components/SidebarLogo';

async function TeamSidebarInternal({ teamId }: { teamId: number }) {
  const [slimOrganizations, team] = await Promise.all([
    fetchSlimOrganizations(),
    getSlimTeamById(teamId),
  ]);
  const organizationId = team.organization_id;
  return (
    <div
      className={cn(
        'flex flex-col justify-between h-full',
        'lg:px-3 lg:py-4 lg:pt-2.5 ',
      )}
    >
      <div>
        <SidebarLogoAndToggle />
        <div>
          <SidebarLink
            label="Back to organization"
            href={`/organization/${organizationId}`}
            icon={<ArrowLeftIcon className="h-5 w-5" />}
          />
          <SidebarLink
            label="Team Home"
            href={`/organization/${organizationId}/team/${teamId}/`}
            icon={<TeamIcon className="h-5 w-5" />}
          />
          <SidebarLink
            label="Team Settings"
            href={`/organization/${organizationId}/team/${teamId}`}
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
      <div className="flex flex-col gap-4">
        <Suspense fallback={<T.P>Loading subscription details...</T.P>}>
          <SubscriptionCardSmall organizationId={organizationId} />
        </Suspense>

        <div className="flex flex-col gap-1">
          <p className="text-sm font-normal text-gray-500 dark:text-slate-400">
            Select organization
          </p>
          <OrganizationSwitcher
            currentOrganizationId={organizationId}
            slimOrganizations={slimOrganizations}
          />
        </div>
      </div>
    </div>
  );
}

export async function TeamSidebar({ teamId }: { teamId: number }) {
  return (
    <Suspense fallback={<DesktopSidebarFallback />}>
      <TeamSidebarInternal teamId={teamId} />
    </Suspense>
  );
}
