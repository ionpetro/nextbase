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

export function TeamClientLayout({ children }: { children: React.ReactNode }) {
  const { organizationId } = useOrganizationContext();
  const { teamId } = useTeamContext();
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
      <TabsNavigation tabs={tabs} />
      {children}
    </div>
  );
}
