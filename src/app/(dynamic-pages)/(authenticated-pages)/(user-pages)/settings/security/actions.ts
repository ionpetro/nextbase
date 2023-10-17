'use server';
import { createSupabaseUserServerActionClient } from '@/supabase-clients/user/createSupabaseUserServerActionClient';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export type UpdatePasswordActionState =
  | {
    status: 'idle';
    message: string | null;
    serverActionCount: number;
  }
  | {
    status: 'success';
    message: string | null;
    serverActionCount: number;
  }
  | {
    status: 'error';
    message: string;
    serverActionCount: number;
  };

export async function updatePasswordAction(
  prevState: UpdatePasswordActionState,
  formData: FormData,
): Promise<UpdatePasswordActionState> {
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
      serverActionCount: prevState.serverActionCount + 1,
    };
  } catch (error) {
    return {
      status: 'error',
      message: error.message,
      serverActionCount: prevState.serverActionCount,
    };
  }
}

export type UpdateEmailActionState =
  | {
    status: 'idle';
    message: string | null;
    serverActionCount: number;
  }
  | {
    status: 'success';
    message: string | null;
    serverActionCount: number;
  }
  | {
    status: 'error';
    message: string;
    serverActionCount: number;
  };

export async function updateEmailAction(
  prevState: UpdateEmailActionState,
  formData: FormData,
): Promise<UpdateEmailActionState> {
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
      serverActionCount: prevState.serverActionCount + 1,
    };
  } catch (error) {
    return {
      status: 'error',
      message: error.message,
      serverActionCount: prevState.serverActionCount,
    };
  }
}
