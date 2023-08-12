'use client';
import { TabsNavigation } from '@/components/presentational/tailwind/TabsNavigation';
import BasicPageHeading from '@/components/ui/Headings/BasicPageHeading';
// convert the lucide-react imports above into modularized imports
// import Check from 'lucide-react/dist/esm/icons/check';
import { usePathname } from 'next/navigation';
import { match } from 'path-to-regexp';
import FileLineChart from 'lucide-react/dist/esm/icons/file-line-chart';
import BriefcaseIcon from 'lucide-react/dist/esm/icons/briefcase';
import PenToolIcon from 'lucide-react/dist/esm/icons/pen-tool';
import SettingsIcon from 'lucide-react/dist/esm/icons/settings';
import UsersIcon from 'lucide-react/dist/esm/icons/users';
import FeedbackIcon from 'lucide-react/dist/esm/icons/help-circle';
import ActivityLogIcon from 'lucide-react/dist/esm/icons/book';
import RoadMapIcon from 'lucide-react/dist/esm/icons/map';

const matchFeedbackItemPath = match('/app_admin/feedback/:feedbackItem/(.*)?');

const tabs = [
  {
    label: 'Admin Dashboard',
    href: `/app_admin`,
    icon: <FileLineChart />,
  },
  {
    label: 'Users',
    href: `/app_admin/users`,
    icon: <UsersIcon />,
  },
  {
    label: 'Organizations',
    href: `/app_admin/organizations`,
    icon: <BriefcaseIcon />,
  },
  {
    label: 'Application Settings',
    href: `/app_admin/settings`,
    icon: <SettingsIcon />,
  },
  {
    label: 'Blog',
    href: `/app_admin/blog`,
    icon: <PenToolIcon />,
  },
  {
    label: 'Feedback List',
    href: `/app_admin/feedback`,
    icon: <FeedbackIcon />,
  },

  {
    label: 'Changelog List',
    href: `/app_admin/changelog`,
    icon: <ActivityLogIcon />,
  },
  {
    label: 'Roadmap',
    href: `/app_admin/internal-roadmap`,
    icon: <RoadMapIcon />,
  },
];

export function AppAdminNavigation() {
  const pathname = usePathname();
  const isFeedbackItemPath = pathname ? matchFeedbackItemPath(pathname) : false;
  if (isFeedbackItemPath) {
    return null;
  }
  return (
    <>
      <div className="space-y-2">
        <BasicPageHeading
          heading="Admin Panel"
          subheading=" All
      sections of this area are protected and only accessible by Application Admins"
        />
      </div>
      <div className="space-y-6">
        <TabsNavigation tabs={tabs} />
      </div>
    </>
  );
}
