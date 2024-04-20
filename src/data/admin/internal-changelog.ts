'use server';
import type { ChangelogType } from '@/app/(dynamic-pages)/(changelog-pages)/changelog/_components/CreateChangelogForm';
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
