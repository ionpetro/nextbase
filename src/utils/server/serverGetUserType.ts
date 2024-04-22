'use server';
import { createSupabaseUserServerComponentClient } from '@/supabase-clients/user/createSupabaseUserServerComponentClient';
import { UserRole } from '@/types/userTypes';
import { userRoles } from '@/utils/userTypes';

// make sure to return one of UserRoles
export async function serverGetUserType(): Promise<UserRole> {
  const supabase = createSupabaseUserServerComponentClient();
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError) {
    throw sessionError;
  }

  if (!session?.user) {
    return userRoles.ANON;
  }

  if (
    'user_role' in session.user &&
    session.user.user_role == userRoles.ADMIN
  ) {
    return userRoles.ADMIN;
  }

  return userRoles.USER;
}
