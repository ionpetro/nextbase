'use server';
import { supabaseAdminServerActionClient } from '@/utils/supabase-admin-server-action';
import { AdminGetUserData } from './types';

export const adminGetUser = async (
  userId: string
): Promise<AdminGetUserData> => {
  const [
    userProfileResponse,
    userPrivateInfoResponse,
    authUserResponse,
    isAppAdminResponse,
  ] = await Promise.all([
    supabaseAdminServerActionClient
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single(),
    supabaseAdminServerActionClient
      .from('user_private_info')
      .select('*')
      .eq('id', userId)
      .single(),
    supabaseAdminServerActionClient.auth.admin.getUserById(userId),
    supabaseAdminServerActionClient.rpc('check_if_user_is_app_admin', {
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
