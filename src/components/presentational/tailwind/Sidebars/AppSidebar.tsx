'use client';
import { Anchor } from '@/components/Anchor';
import { useUser } from '@supabase/auth-helpers-react';
import { cn } from '@/utils/cn';
import ChevronRightIcon from 'lucide-react/dist/esm/icons/chevron-right';
import { CurrentOrganizationTeams } from './CurrentOrganizationTeams';
import { Table } from '@/types';
import SettingsIcon from 'lucide-react/dist/esm/icons/settings';
import PlusIcon from 'lucide-react/dist/esm/icons/plus';
import { T } from '@/components/ui/Typography';
import { classNames } from '@/utils/classNames';
import { Match, match } from 'path-to-regexp';
import { usePathname } from 'next/navigation';
import { CreateProjectDialog } from '../CreateProjectDialog';
import { MutateOptions } from '@tanstack/react-query';
import Link from 'next/link';

type LinksProps = {
  isUserAppAdmin: boolean;
  isExpanded: boolean;
  toggleIsExpanded: (isExpanded: boolean) => void;
  teams: Table<'teams'>[];
  currentOrganizationId: string | undefined;
  createTeamProject: (
    variables: {
      name: string;
      organizationId: string;
    },
    options?:
      | MutateOptions<
        {
          created_at: string;
          id: string;
          name: string;
          organization_id: string;
          project_status:
          | 'draft'
          | 'completed'
          | 'pending_approval'
          | 'approved';
          team_id: number | null;
          updated_at: string;
        },
        unknown,
        {
          name: string;
          organizationId: string;
        },
        void
      >
      | undefined,
  ) => void;
  isSettingsPath: Match<object> | false;
  isCreatingTeamProject: boolean;
};
function Links({
  isUserAppAdmin,
  isExpanded,
  toggleIsExpanded,
  teams,
  currentOrganizationId,
  createTeamProject,
  isCreatingTeamProject,
  isSettingsPath,
}: LinksProps) {
  const user = useUser();

  const sidebarContainerClassName = cn(
    `grid grid-rows-[auto,1fr,auto] h-full overflow-auto`,
    isExpanded ? ' px-2 w-[264px]' : 'px-2 w-[64px]',
  );

  return (
    <div className={sidebarContainerClassName}>
      {user ? (
        <>
          {' '}
          {isExpanded ? (
            <T.Small className="ml-4 text-xs font-semibold mb-1 text-gray-500 dark:text-slate-400">
              Project
            </T.Small>
          ) : null}
          {isExpanded ? (
            <CreateProjectDialog
              onConfirm={(name) => {
                createTeamProject({
                  name,
                  organizationId: currentOrganizationId!,
                });
              }}
              isLoading={isCreatingTeamProject}
              trigger={
                <div
                  className={`flex items-center py-2 mt-1 pl-4 pr-2 pr-5.5 rounded-lg cursor-pointer border border-gray-100 dark:border-slate-700 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-slate-700
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
            {isExpanded ? (
              <div className=" py-2 pb-4">
                <T.Small className="ml-4 text-xs font-semibold mb-1 text-gray-500 dark:text-slate-400">
                  Teams
                </T.Small>
                <CurrentOrganizationTeams
                  teams={teams}
                  currentOrganizationId={currentOrganizationId}
                />
              </div>
            ) : null}
          </div>
          {isExpanded ? (
            <T.Small className="ml-4 text-xs font-semibold text-gray-500 dark:text-slate-400">
              Menu
            </T.Small>
          ) : null}
          {isExpanded ? (
            <div className={classNames('', isExpanded ? 'mt-2' : '')}>
              <Link
                href={`/organization/${currentOrganizationId}/settings`}
                className={classNames(
                  `flex gap-2.5 px-4 w-full cursor-pointer items-center group py-2 rounded-lg transition hover:cursor-pointer hover:bg-gray-200/50 dark:hover:bg-slate-700/50 `,
                  isSettingsPath
                    ? ' bg-gray-300/50  dark:bg-slate-800  '
                    : ' bg-transparent',
                )}
                aria-label="Organization Settings"
              >
                <SettingsIcon className="h-5 w-5" />
                <span
                  className={classNames(
                    'transition text-sm font-medium ',
                    isSettingsPath
                      ? ' text-gray-900 dark:text-slate-100 '
                      : ' text-gray-700 dark:text-slate-400 group-hover:text-gray-900 dark:group-hover:text-slate-300',
                  )}
                >
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

export function AppSidebar({
  isUserAppAdmin,
  isExpanded,
  toggleIsExpanded,
  teams,
  currentOrganizationId,
  createTeamProject,
  isCreatingTeamProject,
}: {
  isUserAppAdmin: boolean;
  isExpanded: boolean;
  toggleIsExpanded: (isExpanded: boolean) => void;
  teams: Table<'teams'>[];
  currentOrganizationId: string | undefined;
  createTeamProject: (
    variables: {
      name: string;
      organizationId: string;
    },
    options?:
      | MutateOptions<
        {
          created_at: string;
          id: string;
          name: string;
          organization_id: string;
          project_status:
          | 'draft'
          | 'completed'
          | 'pending_approval'
          | 'approved';
          team_id: number | null;
          updated_at: string;
        },
        unknown,
        {
          name: string;
          organizationId: string;
        },
        void
      >
      | undefined,
  ) => void;

  isCreatingTeamProject: boolean;
}) {
  const pathname = usePathname();
  const matchSettingsPath = match(
    '/organization/:organizationId/settings/(.*)?',
  );
  const isSettingsPath = pathname ? matchSettingsPath(pathname) : false;
  return (
    <nav className="flex w-full">
      <Links
        isSettingsPath={isSettingsPath}
        isUserAppAdmin={isUserAppAdmin}
        isExpanded={isExpanded}
        toggleIsExpanded={toggleIsExpanded}
        teams={teams}
        currentOrganizationId={currentOrganizationId}
        createTeamProject={createTeamProject}
        isCreatingTeamProject={isCreatingTeamProject}
      />

      <div className="flex-grow"></div>
    </nav>
  );
}
