import { supabaseUserServerComponentClient } from '@/supabase-clients/user/supabaseUserServerComponentClient';
import { AppSupabaseClient } from '@/types';
import { getApprovedProjectsByTeamId } from '@/utils/supabase/projects';
import { z } from 'zod';
import { ApprovedTeamProjectsList } from './ApprovedTeamProjectsList';

const paramsSchema = z.object({
  teamId: z.coerce.number(),
});

async function fetchProjects(supabase: AppSupabaseClient, teamId: number) {
  const data = await getApprovedProjectsByTeamId(supabase, teamId);
  return data;
}

export default async function TeamPage({
  params,
}: {
  params: {
    teamId: string;
  };
}) {
  const parsedParams = paramsSchema.parse(params);
  const { teamId } = parsedParams;
  const projects = await fetchProjects(
    supabaseUserServerComponentClient,
    teamId
  );
  return (
    <div className="space-y-4">
      <ApprovedTeamProjectsList initialProjects={projects} />
    </div>
  );
}
