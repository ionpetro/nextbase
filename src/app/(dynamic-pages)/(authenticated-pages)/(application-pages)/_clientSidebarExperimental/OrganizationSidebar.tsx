'use client';

import { getSlimTeamsInOrganization } from '@/utils/supabase/teams';
import { Suspense, useRef } from 'react';
import { supabaseUserClientComponentClient } from '@/supabase-clients/user/supabaseUserClientComponentClient';
import { T } from '@/components/ui/Typography';
import { notFound, useRouter } from 'next/navigation';
import { Anchor } from '@/components/Anchor';
import { nextCacheKeys } from '@/utils/nextCacheTags';
import { CreateTeamDialog } from '@/components/presentational/tailwind/CreateTeamDialog';
import { PlusIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { createTeamAction } from '../organization/[organizationId]/(specific-organization-pages)/actions';
import { useClientSuspenseQuery } from '@/hooks/useClientSuspenseQuery';

function TeamsList({ organizationId }: { organizationId: string }) {
  const teams = useClientSuspenseQuery(
    [nextCacheKeys.slimTeamsInOrganization(organizationId)],
    async () =>
      getSlimTeamsInOrganization(
        supabaseUserClientComponentClient,
        organizationId,
      ),
  );

  return (
    <div>
      {teams.map((team) => {
        return (
          <Anchor
            key={team.id}
            className="block"
            href={`/organization/${organizationId}/team/${team.id}`}
          >
            {team.name}
          </Anchor>
        );
      })}
    </div>
  );
}

export function OrganizationSidebar({
  organizationId,
  slimOrganizations,
}: {
  organizationId: string;
  slimOrganizations: Array<{
    id: string;
    title: string;
  }>;
}) {
  const organization = slimOrganizations.find(
    (organization) => organization.id === organizationId,
  );
  const router = useRouter();
  const createTeamToastRef = useRef<string | number>();
  const queryClient = useQueryClient();

  const { mutate: createTeam, isLoading: isCreatingTeam } = useMutation(
    async ({
      name,
      organizationId,
    }: {
      name: string;
      organizationId: string;
    }) => {
      return createTeamAction({ organizationId, name });
    },
    {
      onMutate: async ({ name }) => {
        createTeamToastRef.current = toast.loading(`Creating name ${name}...`);
      },
      onSuccess: (team) => {
        // Invalidate the team list query
        toast.success(`Team ${team.name} created!`, {
          id: createTeamToastRef.current,
          action: {
            label: 'View team',
            onClick: () => {
              router.push(
                `/organization/${team.organization_id}/team/${team.id}`,
              );
            },
          },
        });
        createTeamToastRef.current = undefined;
        queryClient.invalidateQueries([
          nextCacheKeys.slimTeamsInOrganization(organizationId),
        ]);
      },
      onError: (error) => {
        const customError =
          error instanceof Error ? error : new Error(String(error));
        toast.error(`Error creating team: ${customError.message}`, {
          id: createTeamToastRef.current,
        });
        createTeamToastRef.current = undefined;
      },
    },
  );

  const onConfirmTeam = (teamName: string) => {
    createTeam({
      name: teamName,
      organizationId: organizationId,
    });
  };

  if (!organization) {
    return notFound();
  }
  return (
    <div>
      <T.H3>{organization.title}</T.H3>
      <Suspense fallback={<p>Loading...</p>}>
        <TeamsList organizationId={organizationId} />
      </Suspense>
      <CreateTeamDialog
        title="Create new team"
        isLoading={isCreatingTeam}
        onConfirm={onConfirmTeam}
        trigger={
          <div
            className={`flex items-center py-2 mt-2 pl-4 pr-2 pr-5.5 rounded-lg cursor-pointer border border-gray-100 dark:border-slate-700 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-slate-700
                            }`}
          >
            <PlusIcon className="mr-2 w-5 h-5 text-gray-500 dark:text-slate-500" />
            <T.Small className="font-medium tracking-normal">
              Create new team
            </T.Small>
            <ChevronRightIcon className="hidden group-hover:block ml-auto  h-4 w-4 text-gray-500 dark:text-slate-600" />
          </div>
        }
      />
      <Anchor
        className="block"
        href={`/organization/${organizationId}/settings`}
      >
        General Settings
      </Anchor>
      <Anchor
        className="block"
        href={`/organization/${organizationId}/settings/members`}
      >
        Members
      </Anchor>
      <Anchor
        className="block"
        href={`/organization/${organizationId}/settings/billing`}
      >
        Billing
      </Anchor>
    </div>
  );
}
