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
import { useMemo } from 'react';
import { useCreateProject } from '@/utils/react-queries/projects';

export const SpecificTeamClientLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { organizationByIdData, organizationId } = useOrganizationContext();
  const { teamId, teamByIdData } = useTeamContext();
  const { mutate: createProject, isLoading: isCreatingProject } =
    useCreateProject();
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
        <PageHeadingWithActions
          heading={teamByIdData.name}
          subheading="Manage your team and projects here."
        >
          <div className="mt-3 text-gray-400 text-3xl space-x-2">
            <CreateProjectDialog
              onConfirm={(name) => {
                createProject({
                  name,
                  teamId,
                  organizationId,
                });
              }}
              isLoading={isCreatingProject}
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
        </PageHeadingWithActions>
        <TabsNavigation tabs={tabs} />
        <div>{children}</div>
      </div>
    </div>
  );
};
