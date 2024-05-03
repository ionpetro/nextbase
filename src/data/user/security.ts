'use server';
import { createSupabaseUserServerActionClient } from '@/supabase-clients/user/createSupabaseUserServerActionClient';
import type { ValidSAPayload } from '@/types';

export async function updatePasswordAction(
  password: string,
): Promise<ValidSAPayload<true>> {
  const supabaseClient = createSupabaseUserServerActionClient();
  const { error } = await supabaseClient.auth.updateUser({
    password,
  });

  if (error) {
    return {
      status: 'error',
      message: error.message,
    };
  }

  return {
    status: 'success',
    data: true,
  };
}

export async function updateEmailAction(
  email: string,
): Promise<ValidSAPayload> {
  const supabaseClient = createSupabaseUserServerActionClient();
  const { error } = await supabaseClient.auth.updateUser({
    email,
  });

  if (error) {
    return {
      status: 'error',
      message: error.message,
    };
  }

  return {
    status: 'success',
  };
}
