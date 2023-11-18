import { Suspense } from 'react';
import { OrganizationSwitcher } from './OrganizationSwitcher';
import { T } from '@/components/ui/Typography';
import { SubscriptionCardSmall } from '@/components/SubscriptionCardSmall';
import { fetchSlimOrganizations } from '@/data/user/organizations';
import { SidebarTopComponent } from './SidebarTopComponent';

export async function OrganizationSidebar({
  currentOrganizationId,
}: {
  currentOrganizationId: string;
}) {
  const slimOrganizations = await fetchSlimOrganizations();
  return (
    <div className="h-full  w-[264px] border-r dark:border-gray-700/50 select-none">
      <div className="flex flex-col px-3 py-4 justify-between h-full">
        <div className="flex justify-between items-center">
          <SidebarTopComponent />
        </div>
        <div className="flex flex-col gap-4">
          <Suspense fallback={<T.P>Loading subscription details...</T.P>}>
            <SubscriptionCardSmall organizationId={currentOrganizationId} />
          </Suspense>

          <div className="flex flex-col gap-1">
            <p className="text-sm font-normal text-gray-500 dark:text-slate-400">
              Select organization
            </p>
            <OrganizationSwitcher
              currentOrganizationId={currentOrganizationId}
              slimOrganizations={slimOrganizations}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
