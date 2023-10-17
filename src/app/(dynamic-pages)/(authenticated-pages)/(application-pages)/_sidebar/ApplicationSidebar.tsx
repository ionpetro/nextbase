'use server';

import { createSupabaseUserServerComponentClient } from '@/supabase-clients/user/createSupabaseUserServerComponentClient';
import { nextCacheTags } from '@/utils/nextCacheTags';
import { serverGetLoggedInUser } from '@/utils/server/serverGetLoggedInUser';
import { getAllSlimOrganizationsForUser } from '@/utils/supabase/organizations';
import { unstable_cache } from 'next/cache';
import { ApplicationClientSidebar } from './ApplicationClientSidebar';
import ReactNoSSR from 'react-no-ssr';
import { Suspense } from 'react';

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
    [nextCacheTags.slimOrganizationsForUser(currentUser.id)],
    {
      tags: [nextCacheTags.slimOrganizationsForUser(currentUser.id)],
    },
  );
}

export async function ApplicationSidebar() {
  const fetchSlimOrganizations = await createFetchSlimOrganizations();
  const slimOrganizations = await fetchSlimOrganizations();
  console.log({ slimOrganizations });
  return <ApplicationClientSidebar slimOrganizations={slimOrganizations} />;
}
