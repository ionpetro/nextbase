'use server';

import { getLoggedInUserAction } from '@/app/(dynamic-pages)/_server-actions/user';
import { supabaseAdminClient } from '@/supabase-clients/admin/supabaseAdminClient';
import { createSupabaseUserServerActionClient } from '@/supabase-clients/user/createSupabaseUserServerActionClient';
import { createChangelog } from '@/utils/supabase/internalChangelog';
import { revalidatePath } from 'next/cache';

export async function createChangelogAction({
  title,
  changes,
}: {
  title: string;
  changes: string;
}) {
  const supabaseUserClient = createSupabaseUserServerActionClient();
  const user = await getLoggedInUserAction(supabaseUserClient);
  await createChangelog(supabaseAdminClient, {
    title,
    changes,
    userId: user.id,
  });
  revalidatePath('/');
}
