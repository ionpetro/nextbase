'use client';
import { Anchor } from '@/components/Anchor';
import { cn } from '@/utils/cn';
import { useUser } from '@supabase/auth-helpers-react';
import { SelectSeparator } from '@/components/ui/Select';
import Home from 'lucide-react/dist/esm/icons/home';
import { AdminSidebarLink } from './AdminSidebarLink';
import ChevronRightIcon from 'lucide-react/dist/esm/icons/chevron-right';
import ChevronLeftIcon from 'lucide-react/dist/esm/icons/chevron-left';
import BriefcaseIcon from 'lucide-react/dist/esm/icons/briefcase';
import PenToolIcon from 'lucide-react/dist/esm/icons/pen-tool';
import SettingsIcon from 'lucide-react/dist/esm/icons/settings';
import UsersIcon from 'lucide-react/dist/esm/icons/users';
import FeedbackIcon from 'lucide-react/dist/esm/icons/help-circle';
import BookIcon from 'lucide-react/dist/esm/icons/book';
import RoadMapIcon from 'lucide-react/dist/esm/icons/map';

type LinksProps = {
  isExpanded: boolean;
  toggleIsExpanded: (isExpanded: boolean) => void;
};

function Links({ isExpanded, toggleIsExpanded }: LinksProps) {
  const user = useUser();

  // const chevronClassName = cn(
  //   `absolute flex text-white justify-center bg-slate-900 hover:bg-slate-700 p-2 px-1 rounded-lg text-4xl cursor-pointer items-center top-1/2`,
  //   isExpanded ? 'left-60' : 'left-10'
  // );

  const sidebarContainerClassName = cn(
    `grid grid-rows-[auto,1fr,auto] h-full overflow-auto`,
    isExpanded ? ' px-4 w-[264px]' : 'px-2 w-[64px]'
  );

  return (
    <div className={sidebarContainerClassName}>
      {user ? (
        <>
          <AdminSidebarLink
            href="/dashboard"
            icon={<Home />}
            label="Back to Dashboard"
            isExpanded={isExpanded}
          />
          <AdminSidebarLink
            href="/app_admin"
            icon={<SettingsIcon />}
            label="Application Settings"
            isExpanded={isExpanded}
          />
          <AdminSidebarLink
            href="/app_admin/users"
            icon={<UsersIcon />}
            label="Users"
            isExpanded={isExpanded}
          />
          <AdminSidebarLink
            href="/app_admin/organizations"
            icon={<BriefcaseIcon />}
            label="Organizations"
            isExpanded={isExpanded}
          />
          <SelectSeparator />
          <AdminSidebarLink
            href="/app_admin/blog"
            icon={<PenToolIcon />}
            label="Blog"
            isExpanded={isExpanded}
          />
          <SelectSeparator></SelectSeparator>
          <AdminSidebarLink
            href="/app_admin/feedback"
            icon={<FeedbackIcon />}
            label="Feedback List"
            isExpanded={isExpanded}
          />
          <AdminSidebarLink
            href="/app_admin/changelog"
            icon={<BookIcon />}
            label="Changelog List"
            isExpanded={isExpanded}
          />
          <AdminSidebarLink
            href="/app_admin/internal-roadmap"
            icon={<RoadMapIcon />}
            label="Roadmap"
            isExpanded={isExpanded}
          />
        </>
      ) : (
        <Anchor
          href="/login"
          className="flex py-1 text-slate-400 text-sm font-[600] hover:text-slate-200"
        >
          Login
        </Anchor>
      )}
    </div>
  );
}

export function AdminSidebar({
  isExpanded,
  toggleIsExpanded,
}: {
  isExpanded: boolean;
  toggleIsExpanded: (isExpanded: boolean) => void;
}) {
  return (
    <nav className="flex w-full">
      <Links isExpanded={isExpanded} toggleIsExpanded={toggleIsExpanded} />
      <div className="flex-grow"></div>
    </nav>
  );
}
