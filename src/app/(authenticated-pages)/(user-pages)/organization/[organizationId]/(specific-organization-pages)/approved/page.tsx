import { createSupabaseUserServerComponentClient } from '@/supabase-clients/user/createSupabaseUserServerComponentClient';
import { AppSupabaseClient } from '@/types';
import { getTopLevelApprovedProjectsByOrganizationId } from '@/utils/supabase/projects';
import { z } from 'zod';
import { ApprovedTeamProjectsList } from '@/components/presentational/tailwind/Projects/ApprovedTeamProjectsList';

const paramsSchema = z.object({
  organizationId: z.coerce.string(),
});

async function fetchProjects(
  supabase: AppSupabaseClient,
  organizationId: string
) {
  const data = await getTopLevelApprovedProjectsByOrganizationId(
    supabase,
    organizationId
  );
  return data;
}

export default async function ApprovedOrganizationProjectsPage({
  params,
}: {
  params: any;
}) {
  const parsedParams = paramsSchema.parse(params);
  const { organizationId } = parsedParams;
  const projects = await fetchProjects(
    createSupabaseUserServerComponentClient(),
    organizationId
  );
  return (
    <div className="space-y-4">
      <ApprovedTeamProjectsList projects={projects} />
    </div>
  );
}
