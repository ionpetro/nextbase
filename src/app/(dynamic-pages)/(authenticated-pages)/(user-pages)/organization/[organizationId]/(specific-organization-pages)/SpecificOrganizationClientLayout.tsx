'use client';
import { Anchor } from '@/components/Anchor';
import { PageHeading } from '@/components/presentational/tailwind/PageHeading/PageHeading';
import Overline from '@/components/presentational/tailwind/Text/Overline';
import moment from 'moment';
import { usePathname } from 'next/navigation';
import { match } from 'path-to-regexp';
import { ReactNode, useMemo, useRef } from 'react';
import ChevronLeft from 'lucide-react/dist/esm/icons/chevron-left';
import SettingsIcon from 'lucide-react/dist/esm/icons/settings';
import { Button } from '@/components/ui/Button';
import { CreateTeamDialog } from '@/components/presentational/tailwind/CreateTeamDialog';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { useOrganizationContext } from '@/contexts/OrganizationContext';
import { T } from '@/components/ui/Typography';
import { formatNormalizedSubscription } from '@/utils/formatNormalizedSubscription';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/HoverCard';
import { TabsNavigation } from '@/components/presentational/tailwind/TabsNavigation';
import Check from 'lucide-react/dist/esm/icons/check';
import Hammer from 'lucide-react/dist/esm/icons/hammer';
import ThumbsUp from 'lucide-react/dist/esm/icons/thumbs-up';
import Timer from 'lucide-react/dist/esm/icons/timer';
import UsersIcon from 'lucide-react/dist/esm/icons/users';
import { CreateProjectDialog } from '@/components/presentational/tailwind/CreateProjectDialog';
import { useMutation } from '@tanstack/react-query';
import { Table } from '@/types';

const matchSettingsPath = match('/organization/:organizationId/settings/(.*)?');

function SubscriptionDetails() {
  const { normalizedSubscription, organizationId } = useOrganizationContext();

  const { title, sidenote, description } = formatNormalizedSubscription(
    normalizedSubscription
  );

  if (title) {
    return (
      <HoverCard>
        <HoverCardTrigger asChild>
          <Anchor
            href={`/organization/${organizationId}/settings/billing`}
            className="underline rounded"
          >
            <T.P>
              {title}{' '}
              {sidenote ? <span className="ml-1">{sidenote}</span> : null}
            </T.P>
          </Anchor>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <T.P className="text-blue-500">{description}</T.P>
        </HoverCardContent>
      </HoverCard>
    );
  } else {
    return (
      <HoverCard>
        <HoverCardTrigger asChild>
          <Anchor
            className="flex mr-2 mt-1 p-2"
            href={`/organization/${organizationId}/settings/billing`}
          >
            <T.Small className="font-semibold underline underline-offset-4">
              {sidenote}
            </T.Small>
          </Anchor>
        </HoverCardTrigger>
        <HoverCardContent className="w-60">
          <T.P className="text-gray-700 leading-6 font-[550]">
            {description}
          </T.P>
        </HoverCardContent>
      </HoverCard>
    );
  }
}

export function SpecificOrganizationClientLayout({
  children,
  createTeamAction,
  createProjectAction,
}: {
  children: ReactNode;
  createTeamAction: ({
    name,
    organizationId,
  }: {
    name: string;
    organizationId: string;
  }) => Promise<Table<'teams'>>;
  createProjectAction: ({ name, organizationId }) => Promise<Table<'projects'>>;
}) {
  const pathname = usePathname();
  const isSettingsPath = pathname ? matchSettingsPath(pathname) : false;
  const { organizationByIdData, organizationId } = useOrganizationContext();
  const router = useRouter();
  const createTeamToastRef = useRef<string>();
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
        router.push(`/organization/${organizationId}/team/${team.id}`);
      },
      onError: (error) => {
        const customError =
          error instanceof Error ? error : new Error(String(error));
        toast.error(`Error creating team: ${customError.message}`, {
          id: createTeamToastRef.current,
        });
        createTeamToastRef.current = undefined;
      },
    }
  );
  const createProjectToastRef = useRef<string>();

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
            `Creating name ${name}...`
          );
        },
        onSuccess: (project) => {
          // Invalidate the team list query
          toast.success(`Project ${project.name} created!`, {
            id: createProjectToastRef.current,
          });
          createProjectToastRef.current = undefined;
          router.refresh();
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
      }
    );
  const tabs = useMemo(() => {
    return [
      {
        label: 'Active Projects',
        href: `/organization/${organizationId}`,
        icon: <Hammer />,
      },
      {
        label: 'Projects Pending approval',
        href: `/organization/${organizationId}/pending`,
        icon: <Timer />,
      },
      {
        label: 'Approved Projects',
        href: `/organization/${organizationId}/approved`,
        icon: <ThumbsUp />,
      },
      {
        label: 'Completed Projects',
        href: `/organization/${organizationId}/completed`,
        icon: <Check />,
      },
      {
        label: 'Teams',
        href: `/organization/${organizationId}/teams`,
        icon: <UsersIcon />,
      },
    ];
  }, [organizationId]);

  const onConfirm = (teamName: string) => {
    createTeam({
      name: teamName,
      organizationId,
    });
  };

  return (
    <div className="space-y-8">
      <div className="space-y-0">
        <div className="mb-4">
          {isSettingsPath ? (
            <Anchor
              href={`/organization/${organizationId}`}
              className="group space-x-1 flex items-center"
            >
              <ChevronLeft className="relative text-gray-500 h-4 w-4 hover:-translate-x-10 group-hover:text-gray-800 group-hover:dark:text-gray-400 dark:text-gray-600" />
              <Overline className="text-gray-500 group-hover:text-gray-800 dark:text-gray-600 group-hover:dark:text-gray-400">
                Back to Organization
              </Overline>
            </Anchor>
          ) : (
            <Overline className="text-gray-500 dark:text-gray-600">
              Organization
            </Overline>
          )}
        </div>
        <PageHeading
          title={organizationByIdData.title}
          titleHref={`/organization/${organizationId}`}
          actions={
            <div className="flex items-start  ">
              <div className=" flex items-center space-x-2 pr-4 border-r border-muted-foreground/20 ">
                <SubscriptionDetails />
                <CreateProjectDialog
                  onConfirm={(name) => {
                    createTeamProject({
                      name,
                      organizationId,
                    });
                  }}
                  isLoading={isCreatingTeamProject}
                />
                <CreateTeamDialog
                  isLoading={isCreatingTeam}
                  onConfirm={onConfirm}
                />
              </div>
              <div className="flex flex-col space-y-1 ml-4 items-end">
                <Anchor href={`/organization/${organizationId}/settings`}>
                  <Button variant="outline">
                    <SettingsIcon className="mr-2" />
                    View Organization Settings
                  </Button>
                </Anchor>
                <T.Subtle>
                  Created {moment(organizationByIdData.created_at).fromNow()}
                </T.Subtle>
              </div>
            </div>
          }
        />
      </div>
      {pathname!.startsWith(
        `/organization/${organizationId}/settings`
      ) ? null : (
        <TabsNavigation tabs={tabs} />
      )}
      <div>{children}</div>
    </div>
  );
}
