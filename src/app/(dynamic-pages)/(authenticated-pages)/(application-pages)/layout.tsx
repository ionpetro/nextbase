import { ReactNode, Suspense } from 'react';
import { InternalNavbar } from '@/components/ui/NavigationMenu/InternalNavbar';
import { Badge } from '@/components/ui/Badge';
import { Sidebar } from '../_sidebar/Sidebar';
import { CURRENT_ORGANIZATION_ID_COOKIE_KEY } from '@/constants';
import { RedirectType } from 'next/dist/client/components/redirect';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { unstable_cache } from 'next/cache';
import { createSupabaseUserServerComponentClient } from '@/supabase-clients/user/createSupabaseUserServerComponentClient';
import { getAllOrganizationsForUser } from '@/utils/supabase/organizations';
import { nextCacheTags } from '@/utils/nextCacheTags';
import { ApplicationSidebar } from './_sidebar/ApplicationSidebar';

function getCurrentOrganizationId(): string | undefined {
  const cookieStore = cookies();
  const currentOrganizationId = cookieStore.get(
    CURRENT_ORGANIZATION_ID_COOKIE_KEY,
  )?.value;

  return currentOrganizationId;
}

const fetchOrganizations = (userId: string) => {
  return unstable_cache(
    async () => {
      'use server';
      const supabaseClient = createSupabaseUserServerComponentClient();
      return await getAllOrganizationsForUser(supabaseClient, userId);
    },
    [nextCacheTags.organizationsByUser(userId)],
    {
      tags: [nextCacheTags.organizationsByUser(userId)],
    },
  );
};

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <div
      className="h-screen w-full grid overflow-hidden"
      style={{
        gridTemplateColumns: 'auto 1fr',
      }}
    >
      <Suspense fallback={<p>Loading application sidebar...</p>}>
        <ApplicationSidebar />
      </Suspense>
      <div>
        <div className="relative flex-1 h-auto mt-8 w-full overflow-auto">
          <div className="px-12 space-y-6 pb-10">{children}</div>
        </div>
      </div>
    </div>
  );
}
