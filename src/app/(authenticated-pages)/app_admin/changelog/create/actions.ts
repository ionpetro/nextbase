'use server';

import { getLoggedInUser } from "@/app/(authenticated-pages)/getLoggedInUser";
import { supabaseAdminClient } from "@/supabase-clients/admin/supabaseAdminClient";
import { createSupabaseUserServerActionClient } from "@/supabase-clients/user/createSupabaseUserServerActionClient";
import { createChangelog } from "@/utils/supabase/internalChangelog";
import { revalidatePath } from "next/cache";

export async function createChangelogAction({ title, changes }: {
  title: string, changes: string
}) {
  const supabaseUserClient = createSupabaseUserServerActionClient();
  const user = await getLoggedInUser(supabaseUserClient);
  await createChangelog(
    supabaseAdminClient,
    {
      title,
      changes,
      userId: user.id,
    }
  );
  revalidatePath('/');
}
