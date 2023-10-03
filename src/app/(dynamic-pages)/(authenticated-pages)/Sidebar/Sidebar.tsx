'server only';

import { InitialOrganizationListType } from '@/utils/react-query-hooks';
import { Table } from '@/types';
import { SidebarClient } from './SidebarClient';
import { createSupabaseUserServerComponentClient } from '@/supabase-clients/user/createSupabaseUserServerComponentClient';
import { getTeamsInOrganization } from '@/utils/supabase/teams';
import { z } from 'zod';
import { unstable_cache } from 'next/cache';
import { cacheTags } from '@/utils/nextCache';

export const Sidebar = async ({
    isUserAppAdmin,
    userProfile: initialUserProfile,
    organizationList,
    setCurrentOrganizationId,
    currentOrganizationId,
}: {
    isUserAppAdmin: boolean;
    userProfile: Table<'user_profiles'>;
    organizationList: InitialOrganizationListType;
    setCurrentOrganizationId: (organizationId: string) => Promise<void>;
    currentOrganizationId: string | undefined;
}) => {
    const fetchTeams = unstable_cache(
        async () => {
            'use server';
            return await getTeamsInOrganization(
                createSupabaseUserServerComponentClient(),
                currentOrganizationId!,
            );
        },
        [cacheTags.teamsInOrganization(currentOrganizationId!)],
        {
            tags: [cacheTags.teamsInOrganization(currentOrganizationId!)],
        },
    );

    const teams = await fetchTeams();
    return (
        <SidebarClient
            isUserAppAdmin={isUserAppAdmin}
            userProfile={initialUserProfile}
            currentOrganizationId={currentOrganizationId}
            setCurrentOrganizationId={setCurrentOrganizationId}
            organizationList={organizationList}
            teams={teams}
        />
    );
};
