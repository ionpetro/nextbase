'use client';

import { Anchor } from '@/components/Anchor';
import { T } from '@/components/ui/Typography';
import { Table } from '@/types';
import { classNames } from '@/utils/classNames';
import UsersIcon from 'lucide-react/dist/esm/icons/users-2';
import PlusIcon from 'lucide-react/dist/esm/icons/plus';
import ChevronRightIcon from 'lucide-react/dist/esm/icons/chevron-right';
import { CreateTeamDialog } from '../CreateTeamDialog';
import { createTeamAction } from '@/app/(dynamic-pages)/(authenticated-pages)/(user-pages)/organization/[organizationId]/(specific-organization-pages)/actions';
import { useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { Button } from '@/components/ui/Button';
import { usePathname, useRouter } from 'next/navigation';

export const CurrentOrganizationTeams = ({
    teams,
    className,
    currentOrganizationId,
}: {
    teams: Table<'teams'>[];
    className?: string;
    currentOrganizationId: string | undefined;
}) => {
    const createTeamToastRef = useRef<string>();
    const pathname = usePathname();
    const router = useRouter();
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
                router.refresh();
                router.push(`/organization/${team.organization_id}/team/${team.id}`);
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
            organizationId: currentOrganizationId!,
        });
    };

    return (
        <>
            <div
                className={classNames(
                    'ml-4 mt-1 overflow-y-auto max-h-[160px]',
                    className,
                )}
            >
                {teams.length !== 0
                    ? teams
                        .sort(
                            (a, b) =>
                                new Date(b.created_at!).getTime() -
                                new Date(a.created_at!).getTime(),
                        )
                        .map((team) => (
                            <Anchor
                                key={team.id}
                                href={`/organization/${team.organization_id}/team/${team.id}`}
                                className={classNames('group')}
                            >
                                <div
                                    className={classNames(
                                        'flex items-center py-1.5 pl-4 pr-2 pr-5.5 rounded-lg cursor-pointer  hover:bg-gray-100 dark:hover:bg-slate-800 ',
                                        pathname ===
                                            `/organization/${team.organization_id}/team/${team.id}`
                                            ? 'bg-gray-100 dark:bg-slate-800'
                                            : 'bg-transparent',
                                    )}
                                >
                                    <UsersIcon className="mr-2 w-5 h-5 text-gray-500 dark:text-slate-500" />
                                    <T.Small className="font-normal tracking-normal">
                                        {team.name}
                                    </T.Small>
                                    <ChevronRightIcon className="hidden group-hover:block ml-auto mr-4 group-hover:mr-0 transition opacity-0 group-hover:opacity-100  h-4 w-4 text-gray-500 dark:text-slate-600" />
                                </div>
                            </Anchor>
                        ))
                    : null}
            </div>
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
        </>
    );
};
