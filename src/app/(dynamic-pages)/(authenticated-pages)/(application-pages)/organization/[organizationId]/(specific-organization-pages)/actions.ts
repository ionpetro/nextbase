'use server';

import { createSupabaseUserServerActionClient } from '@/supabase-clients/user/createSupabaseUserServerActionClient';
import { createProject } from '@/utils/supabase/projects';
import { revalidatePath } from 'next/cache';

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
