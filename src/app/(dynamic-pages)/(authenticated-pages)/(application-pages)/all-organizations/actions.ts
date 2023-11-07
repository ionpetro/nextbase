'use server';

import { getLoggedInUserAction } from '@/app/(dynamic-pages)/_server-actions/user';
import { createSupabaseUserServerActionClient } from '@/supabase-clients/user/createSupabaseUserServerActionClient';
import { nextCacheKeys } from '@/utils/nextCacheTags';
import {
  createOrganization,
  getAllOrganizationsForUser,
} from '@/utils/supabase-queries';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createOrganizationAction(name: string) {
  const supabaseClient = createSupabaseUserServerActionClient();
  const user = await getLoggedInUserAction(supabaseClient);
  const organization = await createOrganization(supabaseClient, user, name);
  revalidateTag(nextCacheKeys.organizationsByUser(user.id));
  redirect(`/organization/${organization.id}`);
}

export const fetchOrganizations = async (userId: string) => {
  const supabaseClient = createSupabaseUserServerActionClient();
  return await getAllOrganizationsForUser(supabaseClient, userId);
};
