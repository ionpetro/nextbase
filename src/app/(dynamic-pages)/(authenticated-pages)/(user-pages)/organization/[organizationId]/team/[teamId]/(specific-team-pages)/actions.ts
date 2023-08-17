'use server';
import { createSupabaseUserServerActionClient } from '@/supabase-clients/user/createSupabaseUserServerActionClient';
import { createProject } from '@/utils/supabase/projects';
import { revalidatePath } from 'next/cache';

export const createProjectAction = async ({
  organizationId,
  name,
  teamId,
}: {
  organizationId: string;
  name: string;
  teamId: number;
}) => {
  const supabaseClient = createSupabaseUserServerActionClient();
  const project = await createProject(
    supabaseClient,
    organizationId,
    teamId,
    name
  );
  revalidatePath(`/organization/${organizationId}`);
  return project;
};
