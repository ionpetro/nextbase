import { OrganizationContextProvider } from '@/contexts/OrganizationContext';
import { AppSupabaseClient } from '@/types';
import {
  getOrganizationById,
  getUserOrganizationRole,
} from '@/utils/supabase/organizations';
import { getProjectById } from '@/utils/supabase/projects';
import { getTeamById, getUserTeamRole } from '@/utils/supabase/teams';
import { ReactNode } from 'react';
import { z } from 'zod';
import { TeamContextProvider } from '@/contexts/TeamContext';
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

  const projectByIdData = await getProjectById(
    supabaseClient,
    projectId
  );
  const [
    organizationByIdData,
    organizationRole,
    teamByIdData,
    teamRole,
    normalizedSubscription,
  ] = await Promise.all([
    getOrganizationById(
      supabaseClient,
      projectByIdData.organization_id
    ),
    getUserOrganizationRole(
      supabaseClient,
      sessionResponse.session.user.id,
      projectByIdData.organization_id
    ),
    getTeamById(supabaseClient, projectByIdData.team_id),
    getUserTeamRole(
      supabaseClient,
      sessionResponse.session.user.id,
      projectByIdData.team_id
    ),
    getNormalizedSubscription(
      supabaseClient,
      projectByIdData.organization_id
    ),
  ]);

  return {
    projectByIdData,
    organizationByIdData,
    organizationRole,
    teamByIdData,
    teamRole,
    normalizedSubscription,
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
    organizationByIdData,
    organizationRole,
    teamByIdData,
    teamRole,
    normalizedSubscription,
  } = await fetchdata(projectId);
  return (
    <OrganizationContextProvider
      organizationRole={organizationRole}
      organizationId={organizationByIdData.id}
      normalizedSubscription={normalizedSubscription}
      organizationByIdData={organizationByIdData}
    >
      <TeamContextProvider
        teamByIdData={teamByIdData}
        teamId={teamByIdData.id}
        teamRole={teamRole}
      >
        <ProjectContextProvider projectByIdData={projectByIdData}>
          <SpecificProjectClientLayout>{children}</SpecificProjectClientLayout>
        </ProjectContextProvider>
      </TeamContextProvider>
    </OrganizationContextProvider>
  );
}
