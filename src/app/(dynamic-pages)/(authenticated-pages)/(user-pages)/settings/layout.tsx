'use client';
import { PageHeading } from '@/components/presentational/tailwind/PageHeading';
import { TabsNavigation } from '@/components/presentational/tailwind/TabsNavigation';
import ComputerIcon from 'lucide-react/dist/esm/icons/computer';
import LockIcon from 'lucide-react/dist/esm/icons/lock';
import UserIcon from 'lucide-react/dist/esm/icons/user';
import { useMemo } from 'react';

export default function UserSettingsClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tabs = useMemo(() => {
    return [
      {
        label: 'Account Settings',
        href: `/settings`,
        icon: <UserIcon />,
      },
      {
        label: 'Developer Settings',
        href: `/settings/developer`,
        icon: <ComputerIcon />,
      },
      {
        label: 'Security',
        href: `/settings/security`,
        icon: <LockIcon />,
      },
    ];
  }, []);

  return (
    <div className="space-y-6">
      <PageHeading
        title="User Settings"
        subTitle="Manage your account and security settings here."
      />
      <TabsNavigation tabs={tabs} />
      {children}
    </div>
  );
}
