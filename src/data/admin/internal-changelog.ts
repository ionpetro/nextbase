'use server';
import { supabaseAdminClient } from '@/supabase-clients/admin/supabaseAdminClient';
import { serverGetLoggedInUser } from '@/utils/server/serverGetLoggedInUser';
import { ensureAppAdmin } from './security';
import { revalidatePath } from 'next/cache';

export const createChangelog = async ({
  title,
  changes,
}: {
  title: string;
  changes: string;
}) => {
  await ensureAppAdmin();
  const user = await serverGetLoggedInUser();
  const { error, data } = await supabaseAdminClient
    .from('internal_changelog')
    .insert({
      title,
      changes,
      user_id: user.id,
    });

  revalidatePath('/changelog', 'page');
  revalidatePath('/app_admin', 'layout');
  if (error) {
    throw error;
  }
  return data;
};

export const getChangelogList = async () => {
  const { data, error } = await supabaseAdminClient
    .from('internal_changelog')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return data;
};
