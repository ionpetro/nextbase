import { z } from 'zod';
import { OrganizationTeams } from './OrganizationTeams';
import { getTeamsInOrganization } from '@/data/user/teams';

const paramsSchema = z.object({
  organizationId: z.string(),
});

export default async function OrganizationPage({
  params,
}: {
  params: z.infer<typeof paramsSchema>;
}) {
  // Add dashed border
  const { organizationId } = paramsSchema.parse(params);
  const teams = await getTeamsInOrganization(organizationId);

  return (
    <div className="space-y-4">
      {teams.length ? (
        <OrganizationTeams organizationId={organizationId} teams={teams} />
      ) : (
        <p>No teams</p>
      )}
    </div>
  );
}
