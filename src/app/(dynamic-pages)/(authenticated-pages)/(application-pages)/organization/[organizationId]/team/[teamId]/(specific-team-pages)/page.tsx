import { AppSupabaseClient } from '@/types';
import { z } from 'zod';
import { getDraftProjectsByTeamId } from '@/utils/supabase/projects';
import { DraftTeamProjectsList } from '@/components/presentational/tailwind/Projects/DraftTeamProjectsList';
import { createSupabaseUserServerComponentClient } from '@/supabase-clients/user/createSupabaseUserServerComponentClient';

const paramsSchema = z.object({
  teamId: z.coerce.number(),
});

async function fetchDraftProjects(supabase: AppSupabaseClient, teamId: number) {
  const data = await getDraftProjectsByTeamId(supabase, teamId);
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
  const projects = await fetchDraftProjects(
    createSupabaseUserServerComponentClient(),
    teamId,
  );
  return (
    <div className="space-y-4">
      <DraftTeamProjectsList projects={projects} />
    </div>
  );
}
