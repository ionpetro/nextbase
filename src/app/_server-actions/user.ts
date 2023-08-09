'use server';
import { createSupabaseUserServerActionClient } from '@/supabase-clients/user/createSupabaseUserServerActionClient';
import { AppSupabaseClient } from '@/types';
import { User } from '@supabase/supabase-js';

export async function getLoggedInUserAction(
  supabaseClient: AppSupabaseClient
): Promise<User> {
  const userResponse = await supabaseClient.auth.getUser();
  const user = userResponse.data.user;
  if (!user) {
    throw new Error('User not logged in');
  }

  return user;
}

export const getUserProfileAction = async (userId: string) => {
  const supabaseClient = createSupabaseUserServerActionClient();
  const { data, error } = await supabaseClient
    .from('user_profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const getSelfProfileAction = async () => {
  const supabaseClient = createSupabaseUserServerActionClient();
  const user = await getLoggedInUserAction(supabaseClient);
  return await getUserProfileAction(user.id);
};
