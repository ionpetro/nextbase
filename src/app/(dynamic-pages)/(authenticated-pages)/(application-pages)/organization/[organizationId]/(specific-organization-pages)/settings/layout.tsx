import { TabsNavigation } from '@/components/TabsNavigation';
import { organizationParamSchema } from '@/utils/zod-schemas/params';
import { DollarSign, SquarePen, UsersRound } from 'lucide-react';

export default function OrganizationSettingsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: unknown;
}) {
  const { organizationId } = organizationParamSchema.parse(params);
  const tabs = [
    {
      label: 'General',
      href: `/organization/${organizationId}/settings`,
      icon: <SquarePen />,
    },
    {
      label: 'Organization Members',
      href: `/organization/${organizationId}/settings/members`,
      icon: <UsersRound />,
    },
    {
      label: 'Billing',
      href: `/organization/${organizationId}/settings/billing`,
      icon: <DollarSign />,
    },
  ];

  return (
    <div className="space-y-6">
      <TabsNavigation tabs={tabs} />
      {children}
    </div>
  );
}
