import { OrganizationContextProvider } from "@/contexts/OrganizationContext";
import { AppSupabaseClient } from "@/types";
import { getOrganizationById, getUserOrganizationRole } from "@/utils/supabase/organizations";
import { getProjectById } from "@/utils/supabase/projects";
import { getTeamById, getUserTeamRole } from "@/utils/supabase/teams";
import { ReactNode } from "react";
import { z } from "zod";
import createClient from '@/utils/supabase-server';
import { TeamContextProvider } from "@/contexts/TeamContext";
import { ProjectContextProvider } from "@/contexts/ProjectContext";
import { Anchor } from "@/components/Anchor";
import { SpecificProjectClientLayout } from "./SpecificProjectClientLayout";

const paramsSchema = z.object({
  projectId: z.string(),
});

async function fetchdata(
  projectId: string
) {
  const supabase = createClient();
  const { data: sessionResponse, error: userError } =
    await supabase.auth.getSession();
  if (!sessionResponse || !sessionResponse.session?.user) {
    throw new Error('User not found');
  }
  if (userError) {
    throw userError;
  }

  const projectByIdData = await getProjectById(supabase, projectId);
  const [
    organizationByIdData,
    organizationRole,
    teamByIdData,
    teamRole,
  ] = await Promise.all([
    getOrganizationById(supabase, projectByIdData.organization_id),
    getUserOrganizationRole(
      supabase,
      sessionResponse.session.user.id,
      projectByIdData.organization_id
    ),
    getTeamById(supabase, projectByIdData.team_id),
    getUserTeamRole(
      supabase,
      sessionResponse.session.user.id,
      projectByIdData.team_id
    ),
  ]);

  return {
    projectByIdData,
    organizationByIdData,
    organizationRole,
    teamByIdData,
    teamRole,
  }

}


export default async function ProjectLayout({
  params,
  children
}: {
  children: ReactNode;
  params: any
}) {
  const { projectId } = paramsSchema.parse(params);
  const {
    projectByIdData,
    organizationByIdData,
    organizationRole,
    teamByIdData,
    teamRole,
  } = await fetchdata(
    projectId
  );
  return <OrganizationContextProvider
    organizationRole={organizationRole}
    organizationId={organizationByIdData.id}
    organizationByIdData={organizationByIdData} >
    <TeamContextProvider teamByIdData={teamByIdData} teamId={teamByIdData.id} teamRole={teamRole}>
      <ProjectContextProvider projectByIdData={projectByIdData}>
        <SpecificProjectClientLayout>
          {children}
        </SpecificProjectClientLayout>
      </ProjectContextProvider>
    </TeamContextProvider>
  </OrganizationContextProvider>;
}
