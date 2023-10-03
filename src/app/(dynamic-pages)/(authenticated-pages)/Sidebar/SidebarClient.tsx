'use client';

import { InitialOrganizationListType } from '@/utils/react-query-hooks';
import { AppAdminSidebar } from './AppAdminSidebar';
import { UserSidebar } from './UserSidebar';
import { Table } from '@/types';
import { useSelectedLayoutSegments } from 'next/navigation';
import { useUserProfile } from '@/utils/react-queries/user';

const teamPagesSegment = `(specific-team-pages)`;
const organizationPagesSegment = `(specific-organization-pages)`;
const projectPagesSegment = `(specific-project-pages)`;

function isTeamPagesSegment(segments: string[]) {
    return segments.includes(teamPagesSegment);
}

function isOrganizationPagesSegment(segments: string[]) {
    return (
        segments.includes(organizationPagesSegment) && !isTeamPagesSegment(segments)
    );
}

function isProjectPagesSegment(segments: string[]) {
    return segments.includes(projectPagesSegment);
}

export const SidebarClient = ({
    isUserAppAdmin,
    userProfile: initialUserProfile,
    organizationList,
    setCurrentOrganizationId,
    currentOrganizationId,
    teams,
}: {
    isUserAppAdmin: boolean;
    userProfile: Table<'user_profiles'>;
    organizationList: InitialOrganizationListType;
    setCurrentOrganizationId: (organizationId: string) => Promise<void>;
    currentOrganizationId: string | undefined;
    teams: Table<'teams'>[];
}) => {
    const { data } = useUserProfile(initialUserProfile);
    const userProfile = data ?? initialUserProfile;
    const segments = useSelectedLayoutSegments();
    const isAppAdminLayout = segments[0] === 'app_admin';

    const isTeamPages = isTeamPagesSegment(segments);
    const isOrganizationPages = isOrganizationPagesSegment(segments);
    const isProjectPages = isProjectPagesSegment(segments);

    // console.log({
    //     isTeamPages,
    //     isOrganizationPages,
    //     isProjectPages,
    // });
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
            teams={teams}
        />
    );
};
