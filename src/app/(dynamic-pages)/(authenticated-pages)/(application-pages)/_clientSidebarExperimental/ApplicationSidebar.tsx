'use server';

import { ApplicationClientSidebar } from './ApplicationClientSidebar';
import { Suspense } from 'react';
import { AppAdminLink } from '@/components/ui/NavigationMenu/AppAdminLink/AppAdminLink';
import { UserNav } from '@/components/ui/NavigationMenu/UserNav';
import { fetchSlimOrganizations } from '@/data/user/organizations';

export async function ApplicationSidebar() {
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
