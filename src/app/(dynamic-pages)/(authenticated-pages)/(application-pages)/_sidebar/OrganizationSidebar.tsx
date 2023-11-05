import { Suspense } from 'react';
import { OrganizationSwitcher } from './OrganizationSwitcher';
import { createFetchSlimOrganizations } from './actions';
import { T } from '@/components/ui/Typography';
import { SubscriptionCardSmall } from '@/components/SubscriptionCardSmall';

export async function OrganizationSidebar({
  currentOrganizationId,
}: {
  currentOrganizationId: string;
}) {
  const fetchOrganizations = createFetchSlimOrganizations();
  const slimOrganizations = await fetchOrganizations();
  return (
    <div className="h-full">
      <div className="flex flex-col justify-between h-full">
        <OrganizationSwitcher
          currentOrganizationId={currentOrganizationId}
          slimOrganizations={slimOrganizations}
        />

        <Suspense fallback={<T.P>Loading subscription details...</T.P>}>
          <SubscriptionCardSmall organizationId={currentOrganizationId} />
        </Suspense>
      </div>
    </div>
  );
}
