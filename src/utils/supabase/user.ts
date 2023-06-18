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

export const adminGetUser = async (
  supabaseClient: AppSupabaseClient,
  userId: string
) => {
  const [
    userProfileResponse,
    userPrivateInfoResponse,
    authUserResponse,
    isAppAdminResponse,
  ] = await Promise.all([
    supabaseClient.from('user_profiles').select('*').eq('id', userId).single(),
    supabaseClient
      .from('user_private_info')
      .select('*')
      .eq('id', userId)
      .single(),
    supabaseClient.auth.admin.getUserById(userId),
    supabaseClient.rpc('check_if_user_is_app_admin', {
      user_id: userId,
    }),
  ]);

  const { data: userProfile, error: userProfileError } = userProfileResponse;

  const { data: userPrivateInfo, error: userPrivateInfoError } =
    userPrivateInfoResponse;

  const { data: authUser, error: authUserError } = authUserResponse;

  const { data: isAppAdmin, error: isAppAdminError } = isAppAdminResponse;

  if (userProfileError) {
    throw userProfileError;
  }

  if (userPrivateInfoError) {
    throw userPrivateInfoError;
  }

  if (authUserError) {
    throw authUserError;
  }

  if (isAppAdminError) {
    throw isAppAdminError;
  }

  return {
    userProfile,
    userPrivateInfo,
    authUser,
    isAppAdmin,
  };
};
