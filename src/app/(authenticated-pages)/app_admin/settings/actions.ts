'use server';
import { supabaseAdminClient } from '@/supabase-clients/admin/supabaseAdminClient';
import { revalidatePath } from 'next/cache';

export const enableMaintenanceModeAction = async () => {
  const { error } = await supabaseAdminClient
    .rpc('enable_maintenance_mode')
    .single();

  if (error) {
    throw error;
  }
  revalidatePath('/');
};

export const disableMaintenanceModeAction = async () => {
  const { error } = await supabaseAdminClient
    .rpc('disable_maintenance_mode')
    .single();

  if (error) {
    throw error;
  }
  revalidatePath('/');
};

export const getIsAppInMaintenanceModeAction = async () => {
  const { data, error } = await supabaseAdminClient.rpc(
    'is_app_in_maintenance_mode'
  );

  if (error) {
    throw error;
  }

  return data;
};
