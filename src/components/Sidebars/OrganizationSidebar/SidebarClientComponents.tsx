'use client';

import { InitialOrganizationListType } from '@/utils/react-query-hooks';
import { useRef, useState } from 'react';
import { OrganizationSwitcher } from './OrganizationSwitcher';
import { Anchor } from '@/components/Anchor';
import { cn } from '@/utils/cn';
import Image from 'next/image';
import darkLogo from 'public/logos/nextbase-dark-logo.png';
import lightLogo from 'public/logos/nextbase-light-logo.png';
import { redirect } from 'next/navigation';
import { classNames } from '@/utils/classNames';
import { SidebarExpansionToggle } from './SidebarExpansionToggle';
import { CreateProjectAndTeam } from './CreateProjectAndTeam';
import { Table } from '@/types';
import { User } from '@supabase/supabase-js';

export function SidebarClientComponents({
  organizationIdProp,
  setCurrentOrganizationIdAction,
  organizationList,
  currentOrganizationId,
  teams,
  user,
}: {
  organizationIdProp: string | undefined;
  setCurrentOrganizationIdAction: (organizationId: string) => Promise<void>;
  organizationList: InitialOrganizationListType;
  currentOrganizationId: string | undefined;
  teams: Table<'teams'>[];
  user: User;
}) {
  const currentOrganization = organizationList.find(
    (organization) => organization.id === organizationIdProp,
  );

  if (!currentOrganization) {
    return <p>Error: Organization not found.</p>;
  }

  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  return (
    <div className="flex flex-col gap-y-4">
      <SidebarExpansionToggle
        isSidebarExpanded={isSidebarExpanded}
        setIsSidebarExpanded={setIsSidebarExpanded}
      />
      <div className="transition-all">
        <div className="flex items-center justify-between pr-2">
          <Anchor href="/dashboard" className="flex items-center w-full">
            <div
              className={cn(
                `flex gap-2 transition-all items-center py-3 mb-1 text-white h-[64px] rounded-lg`,
                isSidebarExpanded
                  ? 'pl-6 justify-start'
                  : 'px-3 justify-center',
              )}
            >
              <Image
                width={40}
                height={40}
                src={lightLogo}
                alt="Logo Login"
                className={cn(
                  'w-fit rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0',
                  isSidebarExpanded ? 'w-[64px] -ml-2 ' : 'w-[40px] ml-0 ',
                )}
              />
              <Image
                width={40}
                src={darkLogo}
                alt="Logo Login"
                className={cn(
                  ' absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100',
                  isSidebarExpanded ? '-ml-2 ' : '-ml-0',
                )}
              />
            </div>
            <span
              className={classNames(
                'text-base font-medium truncate w-full',
                isSidebarExpanded ? 'block' : 'hidden',
              )}
            >
              {currentOrganization.title}
            </span>
          </Anchor>
          <OrganizationSwitcher
            organizationList={organizationList}
            currentOrganizationId={currentOrganizationId}
            setCurrentOrganizationId={setCurrentOrganizationIdAction}
            isSidebarExpanded={isSidebarExpanded}
          />
        </div>
      </div>
      {organizationIdProp ? (
        <CreateProjectAndTeam
          isSidebarExpanded={isSidebarExpanded}
          organizationId={organizationIdProp}
          teams={teams}
          user={user}
        />
      ) : null}
    </div>
  );
}
