import FileLineChart from 'lucide-react/dist/esm/icons/file-line-chart';
import BriefcaseIcon from 'lucide-react/dist/esm/icons/briefcase';
import PenToolIcon from 'lucide-react/dist/esm/icons/pen-tool';
import SettingsIcon from 'lucide-react/dist/esm/icons/settings';
import UsersIcon from 'lucide-react/dist/esm/icons/users';
import FeedbackIcon from 'lucide-react/dist/esm/icons/help-circle';
import ActivityLogIcon from 'lucide-react/dist/esm/icons/book';
import RoadMapIcon from 'lucide-react/dist/esm/icons/map';
import HomeIcon from 'lucide-react/dist/esm/icons/home';
import { Anchor } from '@/components/Anchor';

const links = [
  {
    label: 'Home',
    href: `/dashboard`,
    icon: <HomeIcon />,
  },
  {
    label: 'Admin Dashboard',
    href: `/app_admin_preview`,
    icon: <FileLineChart />,
  },
  {
    label: 'Users',
    href: `/app_admin_preview/users`,
    icon: <UsersIcon />,
  },
  {
    label: 'Organizations',
    href: `/app_admin_preview/organizations`,
    icon: <BriefcaseIcon />,
  },
  {
    label: 'Application Settings',
    href: `/app_admin_preview/settings`,
    icon: <SettingsIcon />,
  },
  {
    label: 'Blog',
    href: `/app_admin_preview/blog`,
    icon: <PenToolIcon />,
  },
  {
    label: 'Feedback List',
    href: `/app_admin_preview/feedback`,
    icon: <FeedbackIcon />,
  },

  {
    label: 'Changelog List',
    href: `/app_admin_preview/changelog`,
    icon: <ActivityLogIcon />,
  },
  {
    label: 'Roadmap',
    href: `/app_admin_preview/internal-roadmap`,
    icon: <RoadMapIcon />,
  },
];

export function ApplicationAdminPreviewSidebar() {
  return (
    <div className="h-full w-[264px] border-r dark:border-gray-700/50 select-none">
      <div className="h-full space-y-1">
        {links.map((link) => {
          return (
            <div key={link.href} className="flex flex-row items-center gap-2">
              {link.icon}
              <Anchor href={link.href}>{link.label}</Anchor>
            </div>
          );
        })}
      </div>
    </div>
  );
}
