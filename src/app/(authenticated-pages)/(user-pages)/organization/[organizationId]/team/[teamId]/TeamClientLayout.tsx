'use client';
import { TabsNavigation } from '@/components/presentational/tailwind/TabsNavigation';
import {
  Check,
  GlassesIcon,
  Hammer,
  Play,
  ThumbsUp,
  Timer,
  User,
} from 'lucide-react';
import { useMemo } from 'react';
import { useOrganizationContext } from '@/contexts/OrganizationContext';
import { useTeamContext } from '@/contexts/TeamContext';
import PageHeadingWithActions from '@/components/ui/Headings/PageHeadingWithActions';
import { CreateProjectDialog } from '@/components/presentational/tailwind/CreateProjectDialog';
import { Button } from '@/components/ui/Button';
import { IoMdSettings } from 'react-icons/io';

export function TeamClientLayout({ children }: { children: React.ReactNode }) {
  const { organizationId } = useOrganizationContext();
  const { teamId, teamByIdData } = useTeamContext();
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
      {
        label: 'Members',
        href: `/organization/${organizationId}/team/${teamId}/members`,
        icon: <User />,
      },
    ];
  }, []);

  return (
    <div className="space-y-6">
      <PageHeadingWithActions
        heading={teamByIdData.name}
        subheading="Manage your team and projects here."
      >
        <div className="mt-3 text-gray-400 text-3xl space-x-2">
          <CreateProjectDialog onConfirm={console.log} isLoading={false} />
          <Button variant={"outline"}>
            <IoMdSettings className="text-slate-600 mr-2" />
            View Team Settings
          </Button>
        </div>
      </PageHeadingWithActions>
      <TabsNavigation tabs={tabs} />

      <div>{children}</div>
    </div>
  );
}
