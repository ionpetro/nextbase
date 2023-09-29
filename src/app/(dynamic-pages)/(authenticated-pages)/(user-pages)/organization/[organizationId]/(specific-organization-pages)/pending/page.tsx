import { createSupabaseUserServerComponentClient } from '@/supabase-clients/user/createSupabaseUserServerComponentClient';
import { AppSupabaseClient } from '@/types';
import { getTopLevelPendingApprovalProjectsByOrganizationId } from '@/utils/supabase/projects';
import { z } from 'zod';
import { PendingApprovalTeamProjectsList } from '@/components/presentational/tailwind/Projects/PendingApprovalTeamProjectsList';

const paramsSchema = z.object({
  organizationId: z.coerce.string(),
});

async function fetchProjects(
  supabase: AppSupabaseClient,
  organizationId: string,
) {
  const data = await getTopLevelPendingApprovalProjectsByOrganizationId(
    supabase,
    organizationId,
  );
  return data;
}

export default async function PendingApprovalOrganizationProjectsPage({
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
      <PendingApprovalTeamProjectsList projects={projects} />
    </div>
  );
}
