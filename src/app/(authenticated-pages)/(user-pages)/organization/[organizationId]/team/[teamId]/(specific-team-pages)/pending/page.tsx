import { AppSupabaseClient } from '@/types';
import { z } from 'zod';
import { PendingApprovalTeamProjectsList } from './PendingApprovalTeamProjectsList';
import { getPendingApprovalProjectsByTeamId } from '@/utils/supabase/projects';
import { createSupabaseUserServerComponentClient } from '@/supabase-clients/user/createSupabaseUserServerComponentClient';

const paramsSchema = z.object({
  teamId: z.coerce.number(),
});

async function fetchProjects(supabase: AppSupabaseClient, teamId: number) {
  const data = await getPendingApprovalProjectsByTeamId(supabase, teamId);
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
    createSupabaseUserServerComponentClient(),
    teamId
  );
  return (
    <div className="space-y-4">
      <PendingApprovalTeamProjectsList initialProjects={projects} />
    </div>
  );
}
