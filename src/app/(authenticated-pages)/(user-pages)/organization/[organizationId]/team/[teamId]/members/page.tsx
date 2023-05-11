import { getTeamMembersByTeamId } from '@/utils/supabase-queries';
import { z } from 'zod';
import createClient from '@/utils/supabase-server';
import { ProjectTeamMembersTable } from '@/components/presentational/tailwind/ProjectTeamMembersTable';

const paramsSchema = z.object({
  teamId: z.coerce.number(),
});

export default async function TeamSettingsPage({
  params,
}: {
  params: {
    teamId: string;
  };
}) {
  const parsedParams = paramsSchema.parse(params);
  const { teamId } = parsedParams;
  const supabase = createClient();
  const teamMembers = await getTeamMembersByTeamId(supabase, teamId);
  return (
    <div className="space-y-2">
      <ProjectTeamMembersTable teamId={teamId} teamMembers={teamMembers} />
    </div>
  );
}
