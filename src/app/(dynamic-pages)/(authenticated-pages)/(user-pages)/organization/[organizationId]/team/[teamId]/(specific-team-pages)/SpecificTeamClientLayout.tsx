'use client';

import { useOrganizationContext } from '@/contexts/OrganizationContext';
import { useTeamContext } from '@/contexts/TeamContext';
import { TabsNavigation } from '@/components/presentational/tailwind/TabsNavigation';
// convert the imports above into modularized imports
import Check from 'lucide-react/dist/esm/icons/check';
import Hammer from 'lucide-react/dist/esm/icons/hammer';
import ThumbsUp from 'lucide-react/dist/esm/icons/thumbs-up';
import Timer from 'lucide-react/dist/esm/icons/timer';
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
    <>
      <div className="space-y-10">
        <div className="space-x-6">
          <span className="text-base py-2 font-[600] text-slate-500">
            <Anchor href="/dashboard">Dashboard</Anchor>
          </span>
          <span className="text-base  py-2 font-[600] text-slate-500">/</span>
          <span className="text-base py-2 font-[600] text-slate-500">
            <Anchor href={`/organization/${organizationByIdData.id}`}>
              {organizationByIdData.title}
            </Anchor>
          </span>
          <span className="text-base  py-2 font-[600] text-slate-500">/</span>
          <span className="text-base py-2 bg-blue-50 rounded-lg px-4 font-[700] text-blue-600">
            {teamByIdData.name}
          </span>
        </div>
        <div className="space-y-6">
          <PageHeading
            title={teamByIdData.name}
            subTitle="Manage your team and projects here."
            actions={
              <div className="mt-3 text-gray-400 flex items-center text-3xl space-x-2">
                <CreateProjectDialog
                  onConfirm={(name) => {
                    createTeamProject({
                      name,
                    });
                  }}
                  isLoading={isCreatingTeamProject}
                />
                <Anchor
                  href={`/organization/${organizationId}/team//${teamId}/settings`}
                >
                  <Button variant={'outline'}>
                    <SettingsIcon className="text-slate-600 mr-2" />
                    View Team Settings
                  </Button>
                </Anchor>
              </div>
            }
          />
          <TabsNavigation tabs={tabs} />
          <div>{children}</div>
        </div>
      </div>
      <TeamGraphs />
    </>
  );
};
