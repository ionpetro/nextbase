import { ProFeatureGateDialog } from '@/components/ProFeatureGateDialog';
import { SidebarLink } from '@/components/SidebarLink';
import { fetchSlimOrganizations } from '@/data/user/organizations';
import { cn } from '@/utils/cn';
import { organizationParamSchema } from '@/utils/zod-schemas/params';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { LucideIcon } from '@/components/LucideIcon';
import { DesktopSidebarFallback } from '@/components/SidebarComponents/SidebarFallback';
import { SwitcherAndToggle } from '@/components/SidebarComponents/SidebarLogo';
import { SubscriptionCardSmall } from '@/components/SubscriptionCardSmall';
import { T } from '@/components/ui/Typography';

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
          <SwitcherAndToggle organizationId={organizationId} slimOrganizations={slimOrganizations} />
        </div>
        <div className="flex flex-col gap-6 h-full overflow-y-auto">
          <div>
            <SidebarLink
              label="Home"
              href={`/organization/${organizationId}`}
              icon={<LucideIcon name="Home" className="h-5 w-5" />}
            />
            <SidebarLink
              label="Settings"
              href={`/organization/${organizationId}/settings`}
              icon={<LucideIcon name="Settings" className="h-5 w-5" />}
            />
            <SidebarLink
              label="Projects"
              href={`/organization/${organizationId}/projects`}
              icon={<LucideIcon name="Layers" className="h-5 w-5" />}
            />
            <SidebarLink
              label="Members"
              href={`/organization/${organizationId}/settings/members`}
              icon={<LucideIcon name="Users" className="h-5 w-5" />}
            />
            <SidebarLink
              label="Billing"
              href={`/organization/${organizationId}/settings/billing`}
              icon={<LucideIcon name="DollarSign" className="h-5 w-5" />}
            />
            <Suspense>
              <ProFeatureGateDialog
                organizationId={organizationId}
                label="Feature Pro"
                icon={<LucideIcon name="FileBox" className="h-5 w-5" />}
              />
            </Suspense>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <Suspense fallback={<T.P>Loading subscription details...</T.P>}>
          <div>
            <SubscriptionCardSmall organizationId={organizationId} />
          </div>
        </Suspense>


      </div>
    </div>
  );
}

export async function OrganizationSidebar({ params }: { params: unknown }) {
  try {

    const { organizationId } = organizationParamSchema.parse(params);
    return (
      <Suspense fallback={<DesktopSidebarFallback />}>
        <OrganizationSidebarInternal organizationId={organizationId} />
      </Suspense>
    );
  } catch (e) {
    return notFound();
  }
}
