'use client';

import { Anchor } from '@/components/Anchor';
import { CreateProjectDialog } from '@/components/presentational/tailwind/CreateProjectDialog';
import { T } from '@/components/ui/Typography';
import { classNames } from '@/utils/classNames';
import { cn } from '@/utils/cn';
import Link from 'next/link';
import SettingsIcon from 'lucide-react/dist/esm/icons/settings';
import ChevronRightIcon from 'lucide-react/dist/esm/icons/chevron-right';
import { useRef } from 'react';
import PlusIcon from 'lucide-react/dist/esm/icons/plus';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { CurrentOrganizationTeams } from './CurrentOrganizationTeams';
import { Table } from '@/types';
import { User } from '@supabase/supabase-js';
import { createProjectAction } from '@/app/(dynamic-pages)/(authenticated-pages)/(application-pages)/organization/[organizationId]/(specific-organization-pages)/actions';

export function CreateProjectAndTeam({
  isSidebarExpanded,
  organizationId,
  teams,
  user,
}: {
  isSidebarExpanded: boolean;
  organizationId: string;
  teams: Table<'teams'>[];
  user: User;
}) {
  const createProjectToastRef = useRef<string>();
  const router = useRouter();

  const { mutate: createTeamProject, isLoading: isCreatingTeamProject } =
    useMutation(
      async ({
        name,
        organizationId,
      }: {
        name: string;
        organizationId: string;
      }) => {
        return createProjectAction({ organizationId, name });
      },
      {
        onMutate: async ({ name }) => {
          createProjectToastRef.current = toast.loading(
            `Creating name ${name}...`,
          );
        },
        onSuccess: (project) => {
          // Invalidate the team list query
          toast.success(`Project ${project.name} created!`, {
            id: createProjectToastRef.current,
          });
          createProjectToastRef.current = undefined;
          router.push(`/project/${project.id}`);
        },
        onError: (error) => {
          const customError =
            error instanceof Error ? error : new Error(String(error));
          toast.error(`Error creating project: ${customError.message}`, {
            id: createProjectToastRef.current,
          });
          createProjectToastRef.current = undefined;
        },
      },
    );

  return (
    <div
      className={cn(
        `grid grid-rows-[auto,1fr,auto] h-full overflow-auto`,
        isSidebarExpanded ? ' px-2 w-[264px]' : 'px-2 w-[64px]',
      )}
    >
      {user ? (
        <>
          {isSidebarExpanded ? (
            <T.Small className="ml-4 text-xs font-semibold mb-1 text-gray-500 dark:text-slate-400">
              Project
            </T.Small>
          ) : null}
          {isSidebarExpanded ? (
            <CreateProjectDialog
              onConfirm={(name) => {
                createTeamProject({
                  name,
                  organizationId: organizationId,
                });
              }}
              isLoading={isCreatingTeamProject}
              trigger={
                <div
                  className={`flex h-fit items-center py-2 mt-1 pl-4 pr-2 pr-5.5 rounded-lg cursor-pointer border border-gray-100 dark:border-slate-700 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-slate-700
                            }`}
                >
                  <PlusIcon className="mr-2 w-5 h-5 text-gray-500 dark:text-slate-500" />
                  <T.Small className="font-medium tracking-normal">
                    Create new project
                  </T.Small>
                  <ChevronRightIcon className="hidden group-hover:block ml-auto  h-4 w-4 text-gray-500 dark:text-slate-600" />
                </div>
              }
            />
          ) : null}
          <div className="w-full my-2 mt-4">
            {isSidebarExpanded ? (
              <div className=" py-2 pb-4">
                <T.Small className="ml-4 text-xs font-semibold mb-1 text-gray-500 dark:text-slate-400">
                  Teams
                </T.Small>
                <CurrentOrganizationTeams
                  teams={teams}
                  organizationId={organizationId}
                />
              </div>
            ) : null}
          </div>
          {isSidebarExpanded ? (
            <T.Small className="ml-4 text-xs font-semibold text-gray-500 dark:text-slate-400">
              Menu
            </T.Small>
          ) : null}
          {isSidebarExpanded ? (
            <div className={classNames('', isSidebarExpanded ? 'mt-2' : '')}>
              <Link
                href={`/organization/${organizationId}/settings`}
                className="flex gap-2.5 px-4 w-full bg-transparent cursor-pointer items-center group py-2 rounded-lg transition hover:cursor-pointer hover:bg-gray-200/50 dark:hover:bg-slate-700/50 "
                aria-label="Organization Settings"
              >
                <SettingsIcon className="h-5 w-5" />
                <span className="transition text-sm font-medium text-gray-700 dark:text-slate-400 group-hover:text-gray-900 dark:group-hover:text-slate-300 ">
                  Settings
                </span>
              </Link>
            </div>
          ) : null}
        </>
      ) : (
        <Anchor
          href="/login"
          className="flex py-1 text-slate-400 text-sm font-[600] hover:text-gray-200"
        >
          Login
        </Anchor>
      )}
    </div>
  );
}
