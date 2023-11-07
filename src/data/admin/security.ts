'use server';
import { createSupabaseUserServerComponentClient } from '@/supabase-clients/user/createSupabaseUserServerComponentClient';
import { serverGetLoggedInUser } from '@/utils/server/serverGetLoggedInUser';
import { getIsAppAdmin } from '@/utils/supabase/user';

export const ensureAppAdmin = async () => {
  const supabaseClient = createSupabaseUserServerComponentClient();
  const user = await serverGetLoggedInUser();
  if (!user) {
    throw new Error('User not logged in');
  }

  const isAppAdmin = await getIsAppAdmin(supabaseClient, user);

  if (!isAppAdmin) {
    throw new Error('User is not an app admin');
  }

  return true;
};
