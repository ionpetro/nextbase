'use client';
import { Anchor } from '@/components/Anchor';
import { cn } from '@/utils/cn';
import Image from 'next/image';
import { useState } from 'react';
import darkLogo from 'public/logos/nextbase-dark-logo.png';
import lightLogo from 'public/logos/nextbase-light-logo.png';
import { AppSidebar } from '@/components/presentational/tailwind/Sidebars/AppSidebar';
import PanelLeftOpen from 'lucide-react/dist/esm/icons/panel-left-open';
import PanelLeftClose from 'lucide-react/dist/esm/icons/panel-left-close';
import { SidebarBottom } from '@/components/presentational/tailwind/Sidebars/SidebarBottom';
import { Table } from '@/types';
import { useUserProfile } from '@/utils/react-queries/user';
import { getUserAvatarUrl } from '@/utils/helpers';
import { useLoggedInUserEmail } from '@/hooks/useLoggedInUserEmail';
import { AdminSidebar } from '@/components/presentational/tailwind/Sidebars/AdminSidebar';
import { T } from '@/components/ui/Typography';
import { InitialOrganizationListType } from '@/utils/react-query-hooks';

export function AppAdminSidebar({
  isUserAppAdmin,
  userProfile: initialUserProfile,
  organizationList,
  setCurrentOrganizationId,
  currentOrganizationId,
}: {
  isUserAppAdmin: boolean;
  userProfile: Table<'user_profiles'>;
  organizationList: InitialOrganizationListType;
  setCurrentOrganizationId: (organizationId: string) => Promise<void>;
  currentOrganizationId: string | undefined;
}) {
  const { data: _userProfile } = useUserProfile(initialUserProfile);
  const userProfile = _userProfile ?? initialUserProfile;
  const userEmail = useLoggedInUserEmail();
  const avatarUrl = getUserAvatarUrl({
    email: userEmail,
    profileAvatarUrl: userProfile.avatar_url ?? undefined,
  });
  const [isExpanded, toggleIsExpanded] = useState<boolean>(false);
  const nextbaseIconClassName = cn(
    `flex w-full gap-2 items-center py-3 mb-1 text-white h-[64px] rounded-lg`,
    isExpanded ? 'px-9 justify-start' : 'justify-center',
  );
  const chevronClassName = cn(
    `absolute flex text-gray-700 dark:text-gray-400 justify-start transition hover:bg-gray-100 dark:hover:bg-gray-900 p-2.5 rounded-lg text-4xl cursor-pointer items-start -top-[12px]`,
    isExpanded ? 'left-56 bg-transparent' : 'left-[calc(100%-19px)] ',
  );

  return (
    <div
      className="relative bg-gray-100/50 dark:bg-gray-900/60 space-y-5 px-2 grid grid-rows-4 border-r"
      style={{
        gridTemplateRows: 'auto auto 1fr auto',
      }}
    >
      <div className="flex justify-between w-full">
        <Anchor href="/app_admin" className={nextbaseIconClassName}>
          <Image
            width={40}
            src={lightLogo}
            alt="Logo Login"
            className={cn(
              'rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0',
              isExpanded ? '-ml-2 ' : 'ml-0  ',
            )}
          />
          <Image
            width={40}
            src={darkLogo}
            alt="Logo Login"
            className={cn(
              ' absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100',
              isExpanded ? '-ml-2 ' : '-ml-0  ',
            )}
          />
          {isExpanded ? (
            <T.P className="text-lg font-[600] text-gray-800 dark:text-gray-300">
              nextbase
            </T.P>
          ) : null}
        </Anchor>
      </div>
      <AdminSidebar
        isExpanded={isExpanded}
        toggleIsExpanded={toggleIsExpanded}
      />
      <div
        className={chevronClassName}
        onClick={() => toggleIsExpanded(!isExpanded)}
      >
        {isExpanded ? (
          <PanelLeftClose className="h-6 w-6 z-50" />
        ) : (
          <PanelLeftOpen className="h-6 w-6 z-50" />
        )}
      </div>
      <div></div>
      <SidebarBottom
        avatarUrl={avatarUrl}
        userFullname={userProfile.full_name ?? 'User'}
        userEmail={userEmail}
        isExpanded={isExpanded}
      />
    </div>
  );
}
