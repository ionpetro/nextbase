import { supabaseUserServerComponentClient } from '@/supabase-clients/user/supabaseUserServerComponentClient';
import { AppSupabaseClient } from '@/types';
import { getCompletedProjectsByTeamId } from '@/utils/supabase/projects';
import { z } from 'zod';
import { CompletedTeamProjectsList } from './CompletedTeamProjectsList';

const paramsSchema = z.object({
  teamId: z.coerce.number(),
});

async function fetchProjects(supabase: AppSupabaseClient, teamId: number) {
  const data = await getCompletedProjectsByTeamId(supabase, teamId);
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
      <CompletedTeamProjectsList initialProjects={projects} />
    </div>
  );
}
