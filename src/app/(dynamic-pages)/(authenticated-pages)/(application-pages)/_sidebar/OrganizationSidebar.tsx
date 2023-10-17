'use client';

import {
  getSlimTeamsInOrganization,
  getTeamsInOrganization,
} from '@/utils/supabase/teams';
import { Suspense, useCallback, useDeferredValue, useRef } from 'react';
import { supabaseUserClientComponentClient } from '@/supabase-clients/user/supabaseUserClientComponentClient';
import { T } from '@/components/ui/Typography';
import { notFound, usePathname, useRouter } from 'next/navigation';
import {
  useRefetchSuspendable,
  useRefetchablePromiseFactory,
} from '@/contexts/RefetchablePromiseFactory';
import { cn } from '@/utils/cn';
import { Anchor } from '@/components/Anchor';
import { nextCacheTags } from '@/utils/nextCacheTags';
import { CreateTeamDialog } from '@/components/presentational/tailwind/CreateTeamDialog';
import { PlusIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createTeamAction } from '../organization/[organizationId]/(specific-organization-pages)/actions';
import { useFreshCallback } from 'rooks';

function TeamsList({ organizationId }: { organizationId: string }) {
  const teams = useRefetchablePromiseFactory(
    () =>
      getSlimTeamsInOrganization(
        supabaseUserClientComponentClient,
        organizationId,
      ),
    nextCacheTags.slimTeamsInOrganization(organizationId),
  );
  const refetch = useRefetchSuspendable();

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
      <button
        onClick={() => {
          console.log('refetch triggered');
          refetch(nextCacheTags.slimTeamsInOrganization(organizationId));
        }}
      >
        Refetch
      </button>
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

  const createTeamToastRef = useRef<string>();
  const pathname = usePathname();
  const router = useRouter();
  const refetchSuspendable = useRefetchSuspendable();
  const refetchTeams = useCallback(() => {
    refetchSuspendable(nextCacheTags.slimTeamsInOrganization(organizationId));
  }, [organizationId]);
  const freshCallback = useFreshCallback(refetchTeams);
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
        });
        createTeamToastRef.current = undefined;
        console.log('success');
        setTimeout(() => {
          freshCallback();
        });
        // router.push(`/organization/${team.organization_id}/team/${team.id}`);
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
    </div>
  );
}
