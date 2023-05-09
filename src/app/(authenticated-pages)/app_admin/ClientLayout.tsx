'use client';
import { Anchor } from '@/components/Anchor';
import BasicPageHeading from '@/components/ui/Headings/BasicPageHeading';
import { AdminSidebar } from '@/components/presentational/tailwind/Sidebars/AdminSidebar';
import { SidebarBottom } from '@/components/presentational/tailwind/Sidebars/SidebarBottom';
import { TabsNavigation } from '@/components/presentational/tailwind/TabsNavigation';
import { useLoggedInUser } from '@/hooks/useLoggedInUser';
import { useLoggedInUserEmail } from '@/hooks/useLoggedInUserEmail';
import { Table } from '@/types';
import { cn } from '@/utils/cn';
import { getUserAvatarUrl } from '@/utils/helpers';
import { useUserProfile } from '@/utils/react-query-hooks';
import { useMemo, useState } from 'react';
import Image from 'next/image';
import Logo from 'public/logos/logo.png';
import { FiBriefcase, FiSettings, FiUsers } from 'react-icons/fi';
export function ClientLayout({
  children,
  userProfile: initialUserProfile,
}: {
  children: React.ReactNode;
  userProfile: Table<'user_profiles'>;
}) {
  const pageContentClassName = cn(` flex h-full max-h-full overflow-y-auto `);
  const [isExpanded, toggleIsExpanded] = useState(false);
  const user = useLoggedInUser();
  const userEmail = useLoggedInUserEmail();
  const { data: _userProfile } = useUserProfile(initialUserProfile);
  // THIS is a hack to bypass the ts error as
  // the _userProfile is never null since there is an initial value
  const userProfile = _userProfile ?? initialUserProfile;

  const avatarUrl = getUserAvatarUrl({
    email: userEmail,
    profileAvatarUrl: userProfile.avatar_url ?? undefined,
  });
  const nextbaseIconClassName = cn(
    `flex w-full mt-2 gap-2 items-center py-3 mb-1 text-white h-[64px] rounded-lg`,
    isExpanded ? "px-6 justify-start" : "justify-center"
  );
  const tabs = useMemo(() => {
    return [
      {
        label: 'Application Settings',
        href: `/app_admin`,
        icon: <FiSettings />,
      },
      {
        label: 'Users',
        href: `/app_admin/users`,
        icon: <FiUsers />,
      },
      {
        label: 'Organizations',
        href: `/app_admin/organizations`,
        icon: <FiBriefcase />,
      },
    ];
  }, []);

  return (
    <div className={pageContentClassName}>
      <div
        className="bg-slate-900 space-y-2 grid grid-rows-4"
        style={{
          gridTemplateRows: 'auto auto 1fr auto',
        }}
      >
        <div className="flex justify-between w-full">
          <Anchor
            href="/app_admin"
            className={nextbaseIconClassName}
          >

            <Image width={28} src={Logo} alt="Logo Login" />
            {isExpanded ? (
              <span className="text-xl font-[500]">Nextbase</span>
            ) : null}
          </Anchor>
        </div>
        <AdminSidebar
          isExpanded={isExpanded}
          toggleIsExpanded={toggleIsExpanded} />
        <div></div>
        <SidebarBottom
          avatarUrl={avatarUrl}
          userFullname={userProfile.full_name ?? 'User'}
          userEmail={userEmail}
          isExpanded={isExpanded}
        />
      </div>
      <div className="flex-1 h-auto max-w-[1296px] overflow-auto">
        <div className="px-12 py-8 space-y-6">
          <div className="space-y-2">
            <BasicPageHeading
              heading="Admin Panel"
              subheading=" You are currently in the Application Admin Dashboard area. All
            sections of this area are protected and only application admins
            can access this."
            />
          </div>
          <div className="space-y-6">
            <TabsNavigation tabs={tabs} />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
