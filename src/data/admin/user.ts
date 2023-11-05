import { supabaseAdminClient } from '@/supabase-clients/admin/supabaseAdminClient';
import { AppSupabaseClient, Table } from '@/types';
import { ensureAppAdmin } from './security';

export const appAdminGetUserProfile = async (
  userId: string,
): Promise<Table<'user_profiles'>> => {
  ensureAppAdmin();
  const { data, error } = await supabaseAdminClient
    .from('user_profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    throw error;
  }

  return data;
};
