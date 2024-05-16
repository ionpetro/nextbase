import { ProFeatureGateDialog } from '@/components/ProFeatureGateDialog';
import { SidebarLink } from '@/components/SidebarLink';
import { SubscriptionCardSmall } from '@/components/SubscriptionCardSmall';
import { T } from '@/components/ui/Typography';
import { fetchSlimOrganizations, getOrganizationIdBySlug } from '@/data/user/organizations';
import { cn } from '@/utils/cn';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { DesktopSidebarFallback } from '@/components/SidebarComponents/SidebarFallback';
import { SwitcherAndToggle } from '@/components/SidebarComponents/SidebarLogo';
import { organizationSlugParamSchema } from '@/utils/zod-schemas/params';
import { DollarSign, FileBox, Home, Layers, Settings, UserRound } from 'lucide-react';

async function OrganizationSidebarInternal({
  organizationId,
  organizationSlug,
}: {
  organizationId: string;
  organizationSlug: string;
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
              href={`/${organizationSlug}`}
              icon={<Home className="h-5 w-5" />}
            />
            <SidebarLink
              label="Projects"
              href={`/${organizationSlug}/projects`}
              icon={<Layers className="h-5 w-5" />}
            />
            <SidebarLink
              label="Settings"
              href={`/${organizationSlug}/settings`}
              icon={<Settings className="h-5 w-5" />}
            />
            <SidebarLink
              label="Members"
              href={`/${organizationSlug}/settings/members`}
              icon={<UserRound className="h-5 w-5" />}
            />
            <SidebarLink
              label="Billing"
              href={`/${organizationSlug}/settings/billing`}
              icon={<DollarSign className="h-5 w-5" />}
            />
            <Suspense>
              <ProFeatureGateDialog
                organizationSlug={organizationSlug}
                label="Feature Pro"
                icon={<FileBox className="h-5 w-5" />}
              />
            </Suspense>
          </div>
          {/* <TeamsList organizationId={organizationId} /> */}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <Suspense fallback={<T.P>Loading subscription details...</T.P>}>
          <SubscriptionCardSmall organizationSlug={organizationSlug} organizationId={organizationId} />
        </Suspense>


      </div>
    </div>
  );
}

export default async function OrganizationSidebar({
  params,
}: {
  params: unknown;
}) {
  try {
    const { organizationSlug } = organizationSlugParamSchema.parse(params);
    const organizationId = await getOrganizationIdBySlug(organizationSlug)
    return (
      <Suspense fallback={<DesktopSidebarFallback />}>
        <OrganizationSidebarInternal organizationId={organizationId} organizationSlug={organizationSlug} />
      </Suspense>
    );
  } catch (e) {
    return notFound();
  }
}
