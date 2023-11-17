import { Anchor } from '@/components/Anchor';
import { OrganizationSwitcher } from './OrganizationSwitcher';
import { SubscriptionCardSmall } from '@/components/SubscriptionCardSmall';
import { Suspense } from 'react';
import { T } from '@/components/ui/Typography';
import { fetchSlimOrganizations } from '@/data/user/organizations';
import { getSlimTeamById } from '@/data/user/teams';

export async function TeamSidebar({ teamId }: { teamId: number }) {
  const [slimOrganizations, team] = await Promise.all([
    fetchSlimOrganizations(),
    getSlimTeamById(teamId),
  ]);
  const organizationId = team.organization_id;
  return (
    <div className="h-full  w-[264px]">
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col ">
          <OrganizationSwitcher
            currentOrganizationId={organizationId}
            slimOrganizations={slimOrganizations}
          />

          <Anchor href={`/organization/${organizationId}`}>
            Back To Organization
          </Anchor>
          <Anchor href={`/organization/${organizationId}/team/${teamId}/`}>
            Team Home
          </Anchor>
          <Anchor
            href={`/organization/${organizationId}/team/${teamId}/settings`}
          >
            Team Settings
          </Anchor>
        </div>

        <Suspense fallback={<T.P>Loading subscription details...</T.P>}>
          <SubscriptionCardSmall organizationId={organizationId} />
        </Suspense>
      </div>
    </div>
  );
}
