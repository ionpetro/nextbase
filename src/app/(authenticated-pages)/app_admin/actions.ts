'use server';
import { supabaseAdmin } from '@/utils/supabase-admin';
import { AdminGetUserData } from './types';

export const adminGetUser = async (
  userId: string
): Promise<AdminGetUserData> => {
  const [userProfileResponse, userPrivateInfoResponse, authUserResponse] =
    await Promise.all([
      supabaseAdmin.from('user_profiles').select('*').eq('id', userId).single(),
      supabaseAdmin
        .from('user_private_info')
        .select('*')
        .eq('id', userId)
        .single(),
      supabaseAdmin.auth.admin.getUserById(userId),
    ]);

  const { data: userProfile, error: userProfileError } = userProfileResponse;

  const { data: userPrivateInfo, error: userPrivateInfoError } =
    userPrivateInfoResponse;

  const { data: authUser, error: authUserError } = authUserResponse;

  if (userProfileError) {
    throw userProfileError;
  }

  if (userPrivateInfoError) {
    throw userPrivateInfoError;
  }

  if (authUserError) {
    throw authUserError;
  }

  if (!userProfile || !authUser || !userPrivateInfo) {
    throw new Error('User not found');
  }

  return {
    userProfile,
    userPrivateInfo,
    authUser,
  };
};
