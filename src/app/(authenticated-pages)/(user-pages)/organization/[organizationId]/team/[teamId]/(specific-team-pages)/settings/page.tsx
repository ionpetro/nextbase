import { supabaseUserServerComponentClient } from '@/supabase-clients/user/supabaseUserServerComponentClient';
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
    supabaseUserServerComponentClient,
    teamId
  );
  return (
    <div className="space-y-2">
      <ProjectTeamMembersTable teamId={teamId} teamMembers={teamMembers} />
    </div>
  );
}
