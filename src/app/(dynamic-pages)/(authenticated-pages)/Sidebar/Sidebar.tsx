'server only';

import { InitialOrganizationListType } from '@/utils/react-query-hooks';
import { Table } from '@/types';
import { SidebarClient } from './SidebarClient';

export const Sidebar = ({
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
    return (
        <SidebarClient
            isUserAppAdmin={isUserAppAdmin}
            userProfile={initialUserProfile}
            currentOrganizationId={currentOrganizationId}
            setCurrentOrganizationId={setCurrentOrganizationId}
            organizationList={organizationList}
        />
    );
};
