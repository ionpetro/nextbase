import { SidebarLink } from '@/components/SidebarLink';
import { getTeamsInOrganization } from '@/data/user/teams';
import TeamIcon from 'lucide-react/dist/esm/icons/users-2';

export async function TeamsList({
  organizationId,
}: {
  organizationId: string;
}) {
  const teams = await getTeamsInOrganization(organizationId);
  return (
    <div className="flex flex-col">
      <p className="text-sm uppercase font-semibold px-2 py-[10px]">Teams</p>
      <div className="flex flex-col">
        {teams.map((team) => (
          <SidebarLink
            key={team.id}
            href={`/organization/${organizationId}/team/${team.id}`}
            icon={<TeamIcon className="h-5 w-5" />}
            label={team.name}
          />
        ))}
      </div>
    </div>
  );
}
