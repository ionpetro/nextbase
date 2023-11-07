'use server';
import { createSupabaseUserServerActionClient } from '@/supabase-clients/user/createSupabaseUserServerActionClient';
import { ServerActionState } from '@/utils/server-actions/types';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export async function updatePasswordAction(
  prevState: ServerActionState,
  formData: FormData,
): Promise<ServerActionState> {
  try {
    const password = z.string().parse(formData.get('password'));
    const supabaseClient = createSupabaseUserServerActionClient();
    const { error } = await supabaseClient.auth.updateUser({
      password,
    });

    if (error) {
      throw error;
    }
    return {
      status: 'success',
      message: 'Password updated successfully',
      payload: undefined,
    };
  } catch (error) {
    return {
      status: 'error',
      message: error.message,
    };
  }
}

export async function updateEmailAction(
  prevState: ServerActionState,
  formData: FormData,
): Promise<ServerActionState> {
  try {
    const email = z.string().email().parse(formData.get('email'));
    const supabaseClient = createSupabaseUserServerActionClient();
    const { error } = await supabaseClient.auth.updateUser({
      email,
    });

    if (error) {
      throw error;
    }
    revalidatePath('/');
    return {
      status: 'success',
      message: 'Email updated successfully',
      payload: undefined,
    };
  } catch (error) {
    return {
      status: 'error',
      message: error.message,
    };
  }
}
