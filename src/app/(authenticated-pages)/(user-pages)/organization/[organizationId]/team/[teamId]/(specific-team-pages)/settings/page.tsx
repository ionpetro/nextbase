import { createSupabaseUserServerComponentClient } from '@/supabase-clients/user/createSupabaseUserServerComponentClient';
import { getTeamMembersByTeamId } from '@/utils/supabase/teams';
import { z } from 'zod';
import { ProjectTeamMembersTable } from './ProjectTeamMembersTable';

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
  const teamMembers = await getTeamMembersByTeamId(
    createSupabaseUserServerComponentClient(),
    teamId
  );
  return (
    <div className="space-y-2">
      <ProjectTeamMembersTable teamId={teamId} teamMembers={teamMembers} />
    </div>
  );
}
