import { createSupabaseUserServerComponentClient } from '@/supabase-clients/user/createSupabaseUserServerComponentClient';
import { getAllOrganizationsForUser } from '@/utils/supabase/organizations';
import { z } from 'zod';
import { SidebarClientComponents } from './SidebarClientComponents';
import { AppSupabaseClient } from '@/types';
import { User } from '@supabase/supabase-js';
import { nextCacheKeys } from '@/utils/nextCacheTags';
import { cookies } from 'next/headers';
import setCurrentOrganizationIdAction from '@/app/(dynamic-pages)/(authenticated-pages)/actions';
import { serverGetLoggedInUser } from '@/utils/server/serverGetLoggedInUser';
import { CURRENT_ORGANIZATION_ID_COOKIE_KEY } from '@/constants';
import { getTeamsInOrganization } from '@/data/user/teams';

async function fetchData(supabaseClient: AppSupabaseClient, authUser: User) {
  const [initialOrganizationsList] = await Promise.all([
    getAllOrganizationsForUser(supabaseClient, authUser.id),
  ]);
  return { initialOrganizationsList };
}

export async function OrganizationSidebar({
  organizationId,
}: {
  organizationId: string;
}) {
  const supabaseClient = createSupabaseUserServerComponentClient();
  const user = await serverGetLoggedInUser();
  const currentOrganizationId = cookies().get(
    CURRENT_ORGANIZATION_ID_COOKIE_KEY,
  )?.value;

  const { initialOrganizationsList } = await fetchData(supabaseClient, user);

  const teams = await getTeamsInOrganization(organizationId);
  return (
    <div className="relative transition-all h-screen bg-white dark:bg-slate-900 space-y-5 px-2 border-r flex flex-col">
      <SidebarClientComponents
        organizationIdProp={organizationId}
        organizationList={initialOrganizationsList}
        currentOrganizationId={currentOrganizationId}
        setCurrentOrganizationIdAction={setCurrentOrganizationIdAction}
        teams={teams}
        user={user}
      />
    </div>
  );
}
