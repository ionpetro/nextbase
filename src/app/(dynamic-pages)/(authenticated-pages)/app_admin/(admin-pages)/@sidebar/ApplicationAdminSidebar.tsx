import { LucideIcon } from '@/components/LucideIcon';
import { SwitcherAndToggle } from '@/components/SidebarComponents/SidebarLogo';
import { SidebarLink } from '@/components/SidebarLink';
import { cn } from '@/utils/cn';

const links = [
  {
    label: 'Home',
    href: `/dashboard`,
    icon: <LucideIcon name="Home" />,
  },
  {
    label: 'Admin Dashboard',
    href: `/app_admin`,
    icon: <LucideIcon name="Home" />,
  },
  {
    label: 'Users',
    href: `/app_admin/users`,
    icon: <LucideIcon name="FileLineChart" />,
  },
  {
    label: 'Organizations',
    href: `/app_admin/organizations`,
    icon: <LucideIcon name="Briefcase" />,
  },
  {
    label: 'Application Settings',
    href: `/app_admin/settings`,
    icon: <LucideIcon name="Settings" />,
  },
  {
    label: 'Blog',
    href: `/app_admin/blog`,
    icon: <LucideIcon name="PenTool" />,
  },
  {
    label: 'Feedback List',
    href: `/feedback`,
    icon: <LucideIcon name="HelpCircle" />,
  },

  {
    label: 'Changelog List',
    href: `/app_admin/changelog`,
    icon: <LucideIcon name="Book" />,
  },
  {
    label: 'Roadmap',
    href: `/app_admin/internal-roadmap`,
    icon: <LucideIcon name="Map" />,
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
