import { SidebarItem, SidebarLink } from '@/components/SidebarLink';
import { SimpleDialog } from '@/components/SimpleDialog';
import { SubscriptionCardSmall } from '@/components/SubscriptionCardSmall';
import { T } from '@/components/ui/Typography';
import { fetchSlimOrganizations } from '@/data/user/organizations';
import { cn } from '@/utils/cn';
import DollarIcon from 'lucide-react/dist/esm/icons/dollar-sign';
import TeamsIcon from 'lucide-react/dist/esm/icons/folders';
import HomeIcon from 'lucide-react/dist/esm/icons/home';
import SettingsIcon from 'lucide-react/dist/esm/icons/settings';
import UserIcon from 'lucide-react/dist/esm/icons/user-2';
import { Suspense } from 'react';
import { OrganizationSwitcher } from './_components/OrganizationSwitcher';
import { OrganizationTeams } from './_components/OrganizationTeams';
import { DesktopSidebarFallback } from './_components/SidebarFallback';

import { SidebarLogoAndToggle } from './_components/SidebarLogo';

async function OrganizationSidebarInternal({
  organizationId,
}: {
  organizationId: string;
}) {
  const slimOrganizations = await fetchSlimOrganizations();
  return (
    <div
      className={cn(
        'flex flex-col justify-between h-full',
        'lg:px-3 lg:py-4 lg:pt-2.5 ',
      )}
    >
      <div>
        <div className="flex justify-between items-center">
          <SidebarLogoAndToggle />
        </div>
        <div className="flex flex-col gap-6 h-full overflow-y-auto">
          {/* <ProjectsList organizationId={organizationId} />
        <TeamsList organizationId={organizationId} /> */}
          <div>
            <SidebarLink
              label="Home"
              href={`/organization/${organizationId}`}
              icon={<HomeIcon className="h-5 w-5" />}
            />
            <SidebarLink
              label="Settings"
              href={`/organization/${organizationId}/settings`}
              icon={<SettingsIcon className="h-5 w-5" />}
            />
            <SidebarLink
              label="Members"
              href={`/organization/${organizationId}/settings/members`}
              icon={<UserIcon className="h-5 w-5" />}
            />
            <SidebarLink
              label="Billing"
              href={`/organization/${organizationId}/settings/billing`}
              icon={<DollarIcon className="h-5 w-5" />}
            />
            <Suspense>
              <SimpleDialog
                trigger={
                  <SidebarItem
                    label="Teams"
                    icon={<TeamsIcon className="h-5 w-5" />}
                  />
                }
              >
                <OrganizationTeams organizationId={organizationId} />
              </SimpleDialog>
            </Suspense>
          </div>
          {/* <TeamsList organizationId={organizationId} /> */}
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

export async function OrganizationSidebar({
  organizationId,
}: {
  organizationId: string;
}) {
  return (
    <Suspense fallback={<DesktopSidebarFallback />}>
      <OrganizationSidebarInternal organizationId={organizationId} />
    </Suspense>
  );
}
