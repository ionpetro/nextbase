'use server';
import { createSupabaseAdminServerActionClient } from '@/supabase-clients/admin/createSupabaseAdminServerActionClient';
import { AdminGetUserData } from './types';

export const adminGetUserAction = async (
  userId: string
): Promise<AdminGetUserData> => {
  const supabaseClient = createSupabaseAdminServerActionClient();
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
