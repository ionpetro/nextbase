'use server';
import { createSupabaseUserServerActionClient } from '@/supabase-clients/user/createSupabaseUserServerActionClient';
import { ValidSAPayload } from '@/types';

export async function updatePasswordAction(
  password: string,
): Promise<ValidSAPayload<true>> {
  const supabaseClient = createSupabaseUserServerActionClient();
  const { error } = await supabaseClient.auth.updateUser({
    password,
  });

  console.log('error', error);

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

export async function updateEmailAction(email: string) {
  const supabaseClient = createSupabaseUserServerActionClient();
  const { error } = await supabaseClient.auth.updateUser({
    email,
  });

  if (error) {
    throw error;
  }
}
