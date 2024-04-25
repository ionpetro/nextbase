import { OrganizationSwitcher } from './OrganizationSwitcher';
import { SidebarClose } from './SidebarClose';

type Props = {
  organizationId: string;
  slimOrganizations: { id: string, title: string }[];
};

export function SwitcherAndToggle({ organizationId, slimOrganizations }: Props) {
  return (
    <div className="flex justify-between items-center w-full mb-20 gap-4">
      <OrganizationSwitcher
        currentOrganizationId={organizationId}
        slimOrganizations={slimOrganizations}
      />

      <SidebarClose />
    </div>
  );
}
