'use server';
import { supabaseAdminClient } from '@/supabase-clients/admin/supabaseAdminClient';
import { serverGetLoggedInUser } from '@/utils/server/serverGetLoggedInUser';
import { ensureAppAdmin } from './security';

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
  if (error) {
    throw error;
  }
  return data;
};
