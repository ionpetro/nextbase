import { AppSupabaseClient } from '@/types';
import { z } from 'zod';
import { getDraftProjectsByTeamId } from '@/utils/supabase/projects';
import { DraftTeamProjectsList } from './DraftTeamProjectsList';
import { supabaseUserServerComponentClient } from '@/supabase-clients/user/supabaseUserServerComponentClient';

const paramsSchema = z.object({
  teamId: z.coerce.number(),
});

async function fetchRuns(supabase: AppSupabaseClient, teamId: number) {
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
  const runs = await fetchRuns(supabaseUserServerComponentClient, teamId);
  return (
    <div className="space-y-4">
      <DraftTeamProjectsList initialRuns={runs} />
    </div>
  );
}
