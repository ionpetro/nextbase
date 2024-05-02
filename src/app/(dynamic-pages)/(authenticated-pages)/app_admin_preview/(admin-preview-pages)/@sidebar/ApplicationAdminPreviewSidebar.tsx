import { LucideIcon } from '@/components/LucideIcon';
import { SwitcherAndToggle } from '@/components/SidebarComponents/SidebarLogo';
import { SidebarLink } from '@/components/SidebarLink';
import { cn } from '@/utils/cn';

const links = [
  {
    label: 'Home',
    href: `/dashboard`,
    icon: <LucideIcon name="Home" className="w-5 h-5" />
  },
  {
    label: 'Admin Dashboard',
    href: `/app_admin_preview`,
    icon: <LucideIcon name="FileLineChart" className="w-5 h-5" />
  },
  {
    label: 'Users',
    href: `/app_admin_preview/users`,
    icon: <LucideIcon name="Users" className="w-5 h-5" />
  },
  {
    label: 'Organizations',
    href: `/app_admin_preview/organizations`,
    icon: <LucideIcon name="Briefcase" className="w-5 h-5" />
  },
  {
    label: 'Application Settings',
    href: `/app_admin_preview/settings`,
    icon: <LucideIcon name="Settings" className="w-5 h-5" />
  },
  {
    label: 'Blog',
    href: `/app_admin_preview/blog`,
    icon: <LucideIcon name="PenTool" className="w-5 h-5" />
  },
  {
    label: 'Feedback List',
    href: `/app_admin_preview/feedback`,
    icon: <LucideIcon name="HelpCircle" className="w-5 h-5" />
  },

  {
    label: 'Changelog List',
    href: `/app_admin_preview/changelog`,
    icon: <LucideIcon name="Book" className="w-5 h-5" />
  },
  {
    label: 'Roadmap',
    href: `/app_admin_preview/internal-roadmap`,
    icon: <LucideIcon name="Map" className="w-5 h-5" />
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
      <SwitcherAndToggle />
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
