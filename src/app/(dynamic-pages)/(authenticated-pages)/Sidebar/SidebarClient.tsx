'use client';

import { InitialOrganizationListType } from '@/utils/react-query-hooks';
import { AppAdminSidebar } from './AppAdminSidebar';
import { UserSidebar } from './UserSidebar';
import { Table } from '@/types';
import { useSelectedLayoutSegments } from 'next/navigation';
import { useUserProfile } from '@/utils/react-queries/user';

export const SidebarClient = ({
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
    const { data } = useUserProfile(initialUserProfile);
    const userProfile = data ?? initialUserProfile;
    const segments = useSelectedLayoutSegments();
    const isAppAdminLayout = segments[0] === 'app_admin';

    return isUserAppAdmin && isAppAdminLayout ? (
        <AppAdminSidebar
            isUserAppAdmin={isUserAppAdmin}
            userProfile={userProfile}
            currentOrganizationId={currentOrganizationId}
            setCurrentOrganizationId={setCurrentOrganizationId}
            organizationList={organizationList}
        />
    ) : (
        <UserSidebar
            isUserAppAdmin={isUserAppAdmin}
            userProfile={userProfile}
            currentOrganizationId={currentOrganizationId}
            setCurrentOrganizationId={setCurrentOrganizationId}
            organizationList={organizationList}
        />
    );
};
