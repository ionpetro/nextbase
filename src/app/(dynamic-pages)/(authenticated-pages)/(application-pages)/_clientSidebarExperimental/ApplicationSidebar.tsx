'use server';

import { createSupabaseUserServerComponentClient } from '@/supabase-clients/user/createSupabaseUserServerComponentClient';
import { nextCacheKeys } from '@/utils/nextCacheTags';
import { serverGetLoggedInUser } from '@/utils/server/serverGetLoggedInUser';
import { getAllSlimOrganizationsForUser } from '@/utils/supabase/organizations';
import { unstable_cache } from 'next/cache';
import { ApplicationClientSidebar } from './ApplicationClientSidebar';
import { Suspense } from 'react';
import { AppAdminLink } from '@/components/ui/NavigationMenu/AppAdminLink/AppAdminLink';
import { UserNav } from '@/components/ui/NavigationMenu/UserNav';

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

export async function ApplicationSidebar() {
  const fetchSlimOrganizations = await createFetchSlimOrganizations();
  const slimOrganizations = await fetchSlimOrganizations();
  return (
    <div className="flex justify-between flex-col ">
      <Suspense fallback={<p>Loading ...</p>}>
        <ApplicationClientSidebar slimOrganizations={slimOrganizations} />
      </Suspense>
      <div>
        <AppAdminLink />
        <UserNav />
      </div>
    </div>
  );
}
