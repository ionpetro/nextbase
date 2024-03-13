'use server';
import { createSupabaseUserServerComponentClient } from '@/supabase-clients/user/createSupabaseUserServerComponentClient';
import { serverGetLoggedInUser } from '@/utils/server/serverGetLoggedInUser';
import { getIsAppAdmin } from '../user/user';

export const ensureAppAdmin = async () => {
  const isAppAdmin = await getIsAppAdmin();

  if (!isAppAdmin) {
    throw new Error('User is not an app admin');
  }

  return true;
};

export async function isLoggedInUserAppAdmin(): Promise<boolean> {
  const authUser = await serverGetLoggedInUser();
  const supabaseClient = createSupabaseUserServerComponentClient();
  const { data: isUserAppAdmin, error } = await supabaseClient
    .rpc('check_if_user_is_app_admin', {
      user_id: authUser.id,
    })
    .single();
  if (error) {
    throw error;
  }

  return isUserAppAdmin;
}
