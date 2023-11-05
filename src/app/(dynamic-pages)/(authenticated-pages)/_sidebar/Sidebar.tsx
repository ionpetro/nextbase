'server only';

import { InitialOrganizationListType } from '@/utils/react-query-hooks';
import { Table } from '@/types';
import { SidebarClient } from './SidebarClient';
import { createSupabaseUserServerComponentClient } from '@/supabase-clients/user/createSupabaseUserServerComponentClient';
import { getTeamsInOrganization } from '@/utils/supabase/teams';
import { unstable_cache } from 'next/cache';
import { nextCacheKeys } from '@/utils/nextCacheTags';
import { cookies } from 'next/headers';
import { getIsAppAdmin, getUserProfile } from '@/utils/supabase/user';
import { serverGetLoggedInUser } from '@/utils/server/serverGetLoggedInUser';
import { CURRENT_ORGANIZATION_ID_COOKIE_KEY } from '@/constants';
import setCurrentOrganizationIdAction from '../actions';
import { getAllOrganizationsForUser } from '@/utils/supabase/organizations';
import { ReactNode } from 'react';

async function createFetchIsAppAdmin(): Promise<() => Promise<boolean>> {
  const currentUser = await serverGetLoggedInUser();
  return unstable_cache(
    async () => {
      'use server';

      const supabaseClient = createSupabaseUserServerComponentClient();
      const isUserAppAdmin = await getIsAppAdmin(supabaseClient, currentUser);
      return isUserAppAdmin;
    },
    [nextCacheKeys.isUserAppAdmin(currentUser.id)],
    {
      tags: [nextCacheKeys.isUserAppAdmin(currentUser.id)],
    },
  );
}

async function createFetchTeams(): Promise<() => Promise<Table<'teams'>[]>> {
  const currentOrganizationId = cookies().get(
    CURRENT_ORGANIZATION_ID_COOKIE_KEY,
  )?.value;
  if (!currentOrganizationId)
    return () => {
      const teams: Table<'teams'>[] = [];
      return Promise.resolve(teams);
    };
  return unstable_cache(
    async () => {
      'use server';
      return await getTeamsInOrganization(
        createSupabaseUserServerComponentClient(),
        currentOrganizationId,
      );
    },
    [nextCacheKeys.teamsInOrganization(currentOrganizationId)],
    {
      tags: [nextCacheKeys.teamsInOrganization(currentOrganizationId)],
    },
  );
}

async function createFetchUserProfile(): Promise<
  () => Promise<Table<'user_profiles'>>
> {
  const currentUserId = cookies().get('current_user_id')?.value;
  if (!currentUserId)
    return () => Promise.resolve({} as Table<'user_profiles'>);

  return unstable_cache(
    async () => {
      'use server';
      const supabaseClient = createSupabaseUserServerComponentClient();
      const userProfile = await getUserProfile(supabaseClient, currentUserId);
      return userProfile;
    },
    [nextCacheKeys.userProfile(currentUserId)],
    {
      tags: [nextCacheKeys.userProfile(currentUserId)],
    },
  );
}

async function createFetchOrganizations() {
  const currentUser = await serverGetLoggedInUser();

  return unstable_cache(
    async () => {
      'use server';
      const supabaseClient = createSupabaseUserServerComponentClient();
      const organizations = await getAllOrganizationsForUser(
        supabaseClient,
        currentUser.id,
      );
      return organizations;
    },
    [nextCacheKeys.organizationsForUser(currentUser.id)],
    {
      tags: [nextCacheKeys.organizationsForUser(currentUser.id)],
    },
  );
}

export const Sidebar = async ({
  currentOrganizationId = undefined,
}: {
  currentOrganizationId?: string | undefined;
}) => {
  const fetchIsAppAdmin = await createFetchIsAppAdmin();
  const fetchUserProfile = await createFetchUserProfile();
  const fetchTeams = await createFetchTeams();
  const fetchOrganizations = await createFetchOrganizations();

  const [isUserAppAdmin, userProfile, teams, organizationList] =
    await Promise.all([
      fetchIsAppAdmin(),
      fetchUserProfile(),
      fetchTeams(),
      fetchOrganizations(),
    ]);

  return (
    <>
      <SidebarClient
        isUserAppAdmin={isUserAppAdmin}
        userProfile={userProfile}
        currentOrganizationId={currentOrganizationId}
        setCurrentOrganizationId={setCurrentOrganizationIdAction}
        organizationList={organizationList}
        teams={teams}
      />
    </>
  );
};
