import { cn } from '@/utils/cn';
import ActivityLogIcon from 'lucide-react/dist/esm/icons/book';
import BriefcaseIcon from 'lucide-react/dist/esm/icons/briefcase';
import FileLineChart from 'lucide-react/dist/esm/icons/file-line-chart';
import FeedbackIcon from 'lucide-react/dist/esm/icons/help-circle';
import HomeIcon from 'lucide-react/dist/esm/icons/home';
import RoadMapIcon from 'lucide-react/dist/esm/icons/map';
import PenToolIcon from 'lucide-react/dist/esm/icons/pen-tool';
import SettingsIcon from 'lucide-react/dist/esm/icons/settings';
import UsersIcon from 'lucide-react/dist/esm/icons/users';
import { SidebarLink } from './_components/SidebarLink';
import { SidebarLogoAndToggle } from './_components/SidebarLogo';

const links = [
  {
    label: 'Home',
    href: `/dashboard`,
    icon: <HomeIcon className="h-5 w-5" />,
  },
  {
    label: 'Admin Dashboard',
    href: `/app_admin`,
    icon: <FileLineChart className="h-5 w-5" />,
  },
  {
    label: 'Users',
    href: `/app_admin/users`,
    icon: <UsersIcon className="h-5 w-5" />,
  },
  {
    label: 'Organizations',
    href: `/app_admin/organizations`,
    icon: <BriefcaseIcon className="h-5 w-5" />,
  },
  {
    label: 'Application Settings',
    href: `/app_admin/settings`,
    icon: <SettingsIcon className="h-5 w-5" />,
  },
  {
    label: 'Blog',
    href: `/app_admin/blog`,
    icon: <PenToolIcon className="h-5 w-5" />,
  },
  {
    label: 'Feedback List',
    href: `/app_admin/feedback`,
    icon: <FeedbackIcon className="h-5 w-5" />,
  },

  {
    label: 'Changelog List',
    href: `/app_admin/changelog`,
    icon: <ActivityLogIcon className="h-5 w-5" />,
  },
  {
    label: 'Roadmap',
    href: `/app_admin/internal-roadmap`,
    icon: <RoadMapIcon className="h-5 w-5" />,
  },
];

export function ApplicationAdminSidebar() {
  return (
    <div
      className={cn(
        'flex flex-col justify-between h-full',
        'lg:px-3 lg:py-4 lg:pt-2.5 ',
      )}
    >
      <SidebarLogoAndToggle />
      <div className="h-full">
        {links.map((link) => {
          return (
            <SidebarLink
              key={link.href}
              label={link.label}
              href={link.href}
              icon={link.icon}
            />
          );
        })}
      </div>
    </div>
  );
}
