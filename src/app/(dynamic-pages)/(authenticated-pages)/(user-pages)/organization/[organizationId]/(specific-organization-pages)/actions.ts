'use server';

import { createSupabaseUserServerActionClient } from '@/supabase-clients/user/createSupabaseUserServerActionClient';
import { createTeam } from '@/utils/supabase-queries';
import { createProject } from '@/utils/supabase/projects';
import { revalidatePath } from 'next/cache';

export const createTeamAction = async ({
  organizationId,
  name,
}: {
  organizationId: string;
  name: string;
}) => {
  const supabaseClient = createSupabaseUserServerActionClient();
  const team = await createTeam(supabaseClient, organizationId, name);
  revalidatePath(`/organization/${organizationId}`);
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
  revalidatePath(`/organization/${organizationId}`);
  return project;
};
