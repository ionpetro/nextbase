'use server';

import type { ChangelogType } from '@/components/changelog/CreateChangelogForm';
import { supabaseAdminClient } from '@/supabase-clients/admin/supabaseAdminClient';
import { serverGetLoggedInUser } from '@/utils/server/serverGetLoggedInUser';
import { revalidatePath } from 'next/cache';
import { ensureAppAdmin } from './security';

export const createChangelog = async ({
  title,
  content,
  changelog_image,
}: ChangelogType) => {
  await ensureAppAdmin();
  const user = await serverGetLoggedInUser();

  // Introducing a delay of 3 seconds (3000 milliseconds) to test suspense
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const { error, data } = await supabaseAdminClient
    .from('internal_changelog')
    .insert({
      title,
      changes: content,
      cover_image: changelog_image.url,
      user_id: user.id,
    });

  revalidatePath('/changelog', 'page');
  revalidatePath('/app_admin', 'layout');
  if (error) {
    throw error;
  }
  return data;
};
