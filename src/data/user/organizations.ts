'use server';
import { createSupabaseUserServerComponentClient } from '@/supabase-clients/user/createSupabaseUserServerComponentClient';
import { serverGetLoggedInUser } from '@/utils/server/serverGetLoggedInUser';
import { getAllSlimOrganizationsForUser } from '@/utils/supabase/organizations';

export async function fetchSlimOrganizations() {
  const currentUser = await serverGetLoggedInUser();
  const supabaseClient = createSupabaseUserServerComponentClient();
  const organizations = await getAllSlimOrganizationsForUser(
    supabaseClient,
    currentUser.id,
  );
  return organizations;
}
