import {
  getOrganizationById,
  getUserOrganizationRole,
} from '@/utils/supabase/organizations';
import { getProjectById } from '@/utils/supabase/projects';
import { getTeamById, getUserTeamRole } from '@/utils/supabase/teams';
import { ReactNode } from 'react';
import { z } from 'zod';
import { ProjectContextProvider } from '@/contexts/ProjectContext';
import { SpecificProjectClientLayout } from './SpecificProjectClientLayout';
import { getNormalizedSubscription } from '@/utils/supabase/subscriptions';
import { createSupabaseUserServerComponentClient } from '@/supabase-clients/user/createSupabaseUserServerComponentClient';

const paramsSchema = z.object({
  projectId: z.string(),
});

async function fetchdata(projectId: string) {
  const supabaseClient = createSupabaseUserServerComponentClient();
  const { data: sessionResponse, error: userError } =
    await supabaseClient.auth.getSession();
  if (!sessionResponse || !sessionResponse.session?.user) {
    throw new Error('User not found');
  }
  if (userError) {
    throw userError;
  }

  const projectByIdData = await getProjectById(supabaseClient, projectId);
  const [organizationData, maybeTeamData, organizationRole, teamRole] =
    await Promise.all([
      getOrganizationById(supabaseClient, projectByIdData.organization_id),
      projectByIdData.team_id
        ? getTeamById(supabaseClient, projectByIdData.team_id)
        : null,
      getUserOrganizationRole(
        supabaseClient,
        sessionResponse.session.user.id,
        projectByIdData.organization_id
      ),
      projectByIdData.team_id
        ? getUserTeamRole(
          supabaseClient,
          sessionResponse.session.user.id,
          projectByIdData.team_id
        )
        : null,
      getNormalizedSubscription(
        supabaseClient,
        projectByIdData.organization_id
      ),
    ]);

  return {
    projectByIdData,
    organizationRole,
    teamRole,
    organizationData,
    maybeTeamData,
  };
}

export default async function ProjectLayout({
  params,
  children,
}: {
  children: ReactNode;
  params: any;
}) {
  const { projectId } = paramsSchema.parse(params);
  const {
    projectByIdData,
    organizationRole,
    teamRole,
    organizationData,
    maybeTeamData,
  } = await fetchdata(projectId);
  return (
    <ProjectContextProvider
      isTopLevelProject={!projectByIdData.team_id}
      projectByIdData={projectByIdData}
      organizationRole={organizationRole}
      maybeTeamRole={teamRole}
      maybeTeamData={maybeTeamData}
      organizationData={organizationData}
    >
      <SpecificProjectClientLayout>{children}</SpecificProjectClientLayout>
    </ProjectContextProvider>
  );
}
