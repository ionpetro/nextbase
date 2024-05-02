import { LucideIcon } from '@/components/LucideIcon';
import { TabsNavigation } from '@/components/TabsNavigation';
import { organizationParamSchema } from '@/utils/zod-schemas/params';
import { EditIcon } from 'lucide-react';


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
      icon: <EditIcon />,
    },
    {
      label: 'Organization Members',
      href: `/organization/${organizationId}/settings/members`,
      icon: <LucideIcon name="User" />,
    },
    {
      label: 'Billing',
      href: `/organization/${organizationId}/settings/billing`,
      icon: <LucideIcon name="DollarSign" />,
    },
  ];

  return (
    <div className="space-y-6">
      <TabsNavigation tabs={tabs} />
      {children}
    </div>
  );
}
