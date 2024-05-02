import { LucideIcon } from '@/components/LucideIcon';
import { SwitcherAndToggle } from '@/components/SidebarComponents/SidebarLogo';
import { SidebarLink } from '@/components/SidebarLink';
import { cn } from '@/utils/cn';

export async function UserSidebar() {
  return (
    <div
      className={cn(
        'flex flex-col justify-between h-full',
        'lg:px-3 lg:py-4 lg:pt-2.5 ',
      )}
    >
      <div>
        <div className="flex justify-between items-center">
          <SwitcherAndToggle />
        </div>
        <div className="">
          <SidebarLink
            label="Dashboard"
            href="/dashboard"
            icon={<LucideIcon name="Home" className="w-5 h-5" />}
          />
          <SidebarLink
            label="Account Settings"
            href="/settings"
            icon={<LucideIcon name="Settings" className="w-5 h-5" />}
          />
          <SidebarLink
            label="Security Settings"
            href="/settings/security"
            icon={<LucideIcon name="Shield" className="w-5 h-5" />}
          />
          <SidebarLink
            label="Developer Settings"
            href="/settings/developer"
            icon={<LucideIcon name="Code" className="w-5 h-5" />}
          />
          <SidebarLink
            label="Invitations"
            href="/invitations"
            icon={<LucideIcon name="Mail" className="w-5 h-5" />}
          />
          <SidebarLink
            label="My Feedback"
            href="/feedback"
            icon={<LucideIcon name="FileQuestion" className="w-5 h-5" />}
          />
        </div>
      </div>
    </div>
  );
}
