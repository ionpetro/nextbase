import { createSupabaseUserServerComponentClient } from '@/supabase-clients/user/createSupabaseUserServerComponentClient';
import { nextCacheKeys } from '@/utils/nextCacheTags';
import { serverGetLoggedInUser } from '@/utils/server/serverGetLoggedInUser';
import { getAllSlimOrganizationsForUser } from '@/utils/supabase/organizations';
import { unstable_cache } from 'next/cache';
import { RedirectType } from 'next/dist/client/components/redirect';
import { notFound, redirect } from 'next/navigation';

async function createFetchSlimOrganizations() {
  const currentUser = await serverGetLoggedInUser();

  return unstable_cache(
    async () => {
      'use server';
      const supabaseClient = createSupabaseUserServerComponentClient();
      const organizations = await getAllSlimOrganizationsForUser(
        supabaseClient,
        currentUser.id,
      );
      return organizations;
    },
    [nextCacheKeys.slimOrganizationsForUser(currentUser.id)],
    {
      tags: [nextCacheKeys.slimOrganizationsForUser(currentUser.id)],
    },
  );
}

async function getDefaultOrganization(): Promise<string> {
  const fetcher = await createFetchSlimOrganizations();
  const slimOrganizations = await fetcher();
  const firstOrganization = slimOrganizations[0];
  const defaultOrganization = slimOrganizations.find(
    (organization) => organization.is_default,
  );

  const defaultOrganizationId =
    defaultOrganization?.id ?? firstOrganization?.id;
  if (!defaultOrganizationId) {
    return notFound();
  }

  return defaultOrganizationId;
}

export default async function DashboardPage() {
  const firstOrganizationId = await getDefaultOrganization();
  return redirect(`/organization/${firstOrganizationId}`, RedirectType.push);
}
