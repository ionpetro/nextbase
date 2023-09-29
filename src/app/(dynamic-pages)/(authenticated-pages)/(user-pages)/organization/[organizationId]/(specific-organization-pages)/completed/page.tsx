import { createSupabaseUserServerComponentClient } from '@/supabase-clients/user/createSupabaseUserServerComponentClient';
import { AppSupabaseClient } from '@/types';
import {
  getTopLevelApprovedProjectsByOrganizationId,
  getTopLevelCompletedProjectsByOrganizationId,
} from '@/utils/supabase/projects';
import { z } from 'zod';
import { ApprovedTeamProjectsList } from '@/components/presentational/tailwind/Projects/ApprovedTeamProjectsList';
import { CompletedTeamProjectsList } from '@/components/presentational/tailwind/Projects/CompletedTeamProjectsList';

const paramsSchema = z.object({
  organizationId: z.coerce.string(),
});

async function fetchProjects(
  supabase: AppSupabaseClient,
  organizationId: string,
) {
  const data = await getTopLevelCompletedProjectsByOrganizationId(
    supabase,
    organizationId,
  );
  return data;
}

export default async function CompletedOrganizationProjectsPage({
  params,
}: {
  params: unknown;
}) {
  const parsedParams = paramsSchema.parse(params);
  const { organizationId } = parsedParams;
  const projects = await fetchProjects(
    createSupabaseUserServerComponentClient(),
    organizationId,
  );
  return (
    <div className="space-y-4">
      <CompletedTeamProjectsList projects={projects} />
    </div>
  );
}
