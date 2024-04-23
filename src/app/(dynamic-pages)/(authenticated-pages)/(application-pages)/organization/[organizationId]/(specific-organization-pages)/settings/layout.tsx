import { TabsNavigation } from '@/components/TabsNavigation';
import { organizationParamSchema } from '@/utils/zod-schemas/params';
import DollarSignIcon from 'lucide-react/dist/esm/icons/dollar-sign';
import EditIcon from 'lucide-react/dist/esm/icons/edit';
import UserIcon from 'lucide-react/dist/esm/icons/user-2';

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
      icon: <UserIcon />,
    },
    {
      label: 'Billing',
      href: `/organization/${organizationId}/settings/billing`,
      icon: <DollarSignIcon />,
    },
  ];

  return (
    <div className="space-y-6">
      <TabsNavigation tabs={tabs} />
      {children}
    </div>
  );
}
