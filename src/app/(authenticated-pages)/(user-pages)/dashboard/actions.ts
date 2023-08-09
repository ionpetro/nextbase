'use server';

import { getLoggedInUserAction } from '@/app/_server-actions/user';
import { createSupabaseUserServerActionClient } from '@/supabase-clients/user/createSupabaseUserServerActionClient';
import { createOrganization } from '@/utils/supabase-queries';

export async function createOrganizationAction(name: string) {
  const supabaseClient = createSupabaseUserServerActionClient();
  const user = await getLoggedInUserAction(supabaseClient);
  return await createOrganization(supabaseClient, user, name);
}
