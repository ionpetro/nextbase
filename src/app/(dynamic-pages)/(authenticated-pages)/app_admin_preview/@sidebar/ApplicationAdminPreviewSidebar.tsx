import { SidebarLogoAndToggle } from '@/components/SidebarComponents/SidebarLogo';
import { SidebarLink } from '@/components/SidebarLink';
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

const links = [
  {
    label: 'Home',
    href: `/dashboard`,
    icon: <HomeIcon className="h-5 w-5" />,
  },
  {
    label: 'Admin Dashboard',
    href: `/app_admin_preview`,
    icon: <FileLineChart className="h-5 w-5" />,
  },
  {
    label: 'Users',
    href: `/app_admin_preview/users`,
    icon: <UsersIcon className="h-5 w-5" />,
  },
  {
    label: 'Organizations',
    href: `/app_admin_preview/organizations`,
    icon: <BriefcaseIcon className="h-5 w-5" />,
  },
  {
    label: 'Application Settings',
    href: `/app_admin_preview/settings`,
    icon: <SettingsIcon className="h-5 w-5" />,
  },
  {
    label: 'Blog',
    href: `/app_admin_preview/blog`,
    icon: <PenToolIcon className="h-5 w-5" />,
  },
  {
    label: 'Feedback List',
    href: `/app_admin_preview/feedback`,
    icon: <FeedbackIcon className="h-5 w-5" />,
  },

  {
    label: 'Changelog List',
    href: `/app_admin_preview/changelog`,
    icon: <ActivityLogIcon className="h-5 w-5" />,
  },
  {
    label: 'Roadmap',
    href: `/app_admin_preview/internal-roadmap`,
    icon: <RoadMapIcon className="h-5 w-5" />,
  },
];

export function ApplicationAdminPreviewSidebar() {
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
