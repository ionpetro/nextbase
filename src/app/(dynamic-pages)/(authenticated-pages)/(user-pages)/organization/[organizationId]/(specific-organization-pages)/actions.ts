'use server';

import { createSupabaseUserServerActionClient } from '@/supabase-clients/user/createSupabaseUserServerActionClient';
import { cacheTags } from '@/utils/nextCache';
import { createTeam } from '@/utils/supabase-queries';
import { createProject } from '@/utils/supabase/projects';
import { revalidatePath, revalidateTag } from 'next/cache';

export const createTeamAction = async ({
  organizationId,
  name,
}: {
  organizationId: string;
  name: string;
}) => {
  const supabaseClient = createSupabaseUserServerActionClient();
  const team = await createTeam(supabaseClient, organizationId, name);
  revalidateTag(cacheTags.teamsInOrganization(organizationId));
  return team;
};

export const createProjectAction = async ({
  organizationId,
  name,
}: {
  organizationId: string;
  name: string;
}) => {
  const supabaseClient = createSupabaseUserServerActionClient();
  const project = await createProject(
    supabaseClient,
    organizationId,
    null,
    name,
  );
  revalidateTag(cacheTags.projectsInOrganization(organizationId));
  return project;
};
