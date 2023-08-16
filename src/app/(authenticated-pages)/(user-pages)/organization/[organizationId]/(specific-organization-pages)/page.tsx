import { AppSupabaseClient } from '@/types';
import { z } from 'zod';
import { getTopLevelDraftProjectsByOrganizationId } from '@/utils/supabase/projects';
import { createSupabaseUserServerComponentClient } from '@/supabase-clients/user/createSupabaseUserServerComponentClient';
import { DraftTeamProjectsList } from '@/components/presentational/tailwind/Projects/DraftTeamProjectsList';

const paramsSchema = z.object({
  organizationId: z.coerce.string(),
});

async function fetchDraftProjects(
  supabase: AppSupabaseClient,
  organizationId: string
) {
  const data = await getTopLevelDraftProjectsByOrganizationId(
    supabase,
    organizationId
  );
  return data;
}

export default async function TeamPage({ params }: { params: any }) {
  const parsedParams = paramsSchema.parse(params);
  const { organizationId } = parsedParams;
  const projects = await fetchDraftProjects(
    createSupabaseUserServerComponentClient(),
    organizationId
  );
  return (
    <div className="space-y-4">
      <DraftTeamProjectsList projects={projects} />
    </div>
  );
}
