'use client';

import { useOrganizationContext } from '@/contexts/OrganizationContext';
import { useTeamContext } from '@/contexts/TeamContext';
import { TabsNavigation } from '@/components/presentational/tailwind/TabsNavigation';
// convert the imports above into modularized imports
import Check from 'lucide-react/dist/esm/icons/check';
import Hammer from 'lucide-react/dist/esm/icons/hammer';
import ThumbsUp from 'lucide-react/dist/esm/icons/thumbs-up';
import Timer from 'lucide-react/dist/esm/icons/timer';
import moment from 'moment';
import PageHeadingWithActions from '@/components/ui/Headings/PageHeadingWithActions';
import { CreateProjectDialog } from '@/components/presentational/tailwind/CreateProjectDialog';
import { Button } from '@/components/ui/Button';
import SettingsIcon from 'lucide-react/dist/esm/icons/settings';
import { Anchor } from '@/components/Anchor';
import { useMemo, useRef } from 'react';
import dynamic from 'next/dynamic';
import { Table } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { PageHeading } from '@/components/presentational/tailwind/PageHeading';
import Overline from '@/components/presentational/tailwind/Text/Overline';
import { T } from '@/components/ui/Typography';
const TeamGraphs = dynamic(
  () => import('../../TeamGraphs').then((mod) => mod.TeamGraphs),
  {
    ssr: false,
  }
);

export const SpecificTeamClientLayout = ({
  children,
  createProjectAction,
}: {
  children: React.ReactNode;
  createProjectAction: ({
    organizationId,
    name,
    teamId,
  }: {
    organizationId: string;
    name: string;
    teamId: number;
  }) => Promise<Table<'projects'>>;
}) => {
  const { organizationByIdData, organizationId } = useOrganizationContext();
  const { teamId, teamByIdData } = useTeamContext();
  const createProjectToastRef = useRef<string>();
  const router = useRouter();
  const { mutate: createTeamProject, isLoading: isCreatingTeamProject } =
    useMutation(
      async ({ name }: { name: string }) => {
        return createProjectAction({ organizationId, teamId, name });
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
        href: `/organization/${organizationId}/team/${teamId}`,
        icon: <Hammer />,
      },
      {
        label: 'Projects Pending approval',
        href: `/organization/${organizationId}/team/${teamId}/pending`,
        icon: <Timer />,
      },
      {
        label: 'Approved Projects',
        href: `/organization/${organizationId}/team/${teamId}/approved`,
        icon: <ThumbsUp />,
      },
      {
        label: 'Completed Projects',
        href: `/organization/${organizationId}/team/${teamId}/completed`,
        icon: <Check />,
      },
    ];
  }, [organizationId, teamId]);
  return (
    <div className="space-y-8">
      <div className="space-y-0">
        <div className="flex mb-4 space-x-4">
          <Overline className="text-gray-500 dark:text-gray-600">
            <Anchor href="/dashboard">Dashboard</Anchor>
          </Overline>
          <Overline className="text-gray-500 dark:text-gray-600">/</Overline>
          <Overline className="text-gray-500 dark:text-gray-600">
            <Anchor href={`/organization/${organizationByIdData.id}`}>
              {organizationByIdData.title}
            </Anchor>
          </Overline>
          <Overline className="text-gray-500 dark:text-gray-600">/</Overline>
          <Overline className="text-gray-800 dark:text-gray-400 font-bold underline-offset-4 underline">
            {teamByIdData.name}
          </Overline>
        </div>
        <div className="space-y-8">
          <PageHeading
            title={teamByIdData.name}
            actions={
              <div className=" text-gray-400 flex items-start text-3xl gap-x-2 space-x-2">
                <div className="pr-4 border-r border-muted-foreground/20">
                  {' '}
                  <CreateProjectDialog
                    onConfirm={(name) => {
                      createTeamProject({
                        name,
                      });
                    }}
                    isLoading={isCreatingTeamProject}
                  />
                </div>
                <div className="flex flex-col space-y-1 ml-4 items-end">
                  <Anchor
                    href={`/organization/${organizationId}/team//${teamId}/settings`}
                  >
                    <Button variant={'outline'}>
                      <SettingsIcon className="text-gray-600 mr-2" />
                      View Team Settings
                    </Button>
                  </Anchor>
                  <T.Subtle>
                    Created {moment(teamByIdData.created_at).fromNow()}
                  </T.Subtle>
                </div>
              </div>
            }
          />
          <TabsNavigation tabs={tabs} />
          <div>{children}</div>
          <TeamGraphs />
        </div>
      </div>
    </div>
  );
};
