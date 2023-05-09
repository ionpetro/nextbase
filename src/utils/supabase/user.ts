import { AppSupabaseClient, AuthProvider, Table } from '@/types';
import { User } from '@supabase/supabase-js';

export const updateUserName = async (
  supabase: AppSupabaseClient,
  user: User,
  name: string
) => {
  await supabase
    .from('user_profiles')
    .update({
      full_name: name,
    })
    .eq('id', user.id);
};

export const getUserProfile = async (
  supabase: AppSupabaseClient,
  userId: string
): Promise<Table<'user_profiles'>> => {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export async function getIsAppAdmin(
  supabaseClient: AppSupabaseClient,
  authUser: User
): Promise<boolean> {
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

export const updateUserProfileNameAndAvatar = async (
  supabase: AppSupabaseClient,
  userId: string,
  {
    fullName,
    avatarUrl,
  }: {
    fullName?: string;
    avatarUrl?: string;
  }
) => {
  const { data, error } = await supabase
    .from('user_profiles')
    .update({
      full_name: fullName,
      avatar_url: avatarUrl,
    })
    .eq('id', userId)
    .single();

  if (error) {
    throw error;
  }

  return data;
};
