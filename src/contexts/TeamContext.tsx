'use client';
import { createContext, useContext } from 'react';
import { useOrganizationContext } from './OrganizationContext';
import { Enum } from '@/types';
import { useGetUserTeamRole } from '@/utils/react-queries/teams';

type TeamContextType = {
  teamId: number;
  canUserManageTeam: boolean;
  teamRole: Enum<'project_team_member_role'> | null;
};
export const TeamContext = createContext<TeamContextType>({
  teamId: -1,
  canUserManageTeam: false,
  teamRole: 'readonly',
});

export function useTeamContext() {
  return useContext(TeamContext);
}

export function TeamContextProvider({
  children,
  teamId,
  teamRole: teamRoleProp,
}: {
  children: React.ReactNode;
  teamId: number;
  teamRole: Enum<'project_team_member_role'> | null;
}) {

  const { organizationRole } = useOrganizationContext();

  const { data: teamRoleData } = useGetUserTeamRole(teamId, {
    initialUserTeamRole: teamRoleProp,
  });

  // if organizationRole is admin or owner, then user can manage team and teamRole will always be admin
  const teamRole =
    organizationRole === 'admin' || organizationRole === 'owner'
      ? 'admin'
      : teamRoleData;

  if (!teamRole) {
    return <p>Not Authorized</p>;
  }

  const canUserManageTeam =
    teamRole === 'admin' ||
    organizationRole === 'admin' ||
    organizationRole === 'owner';

  return (
    <TeamContext.Provider
      value={{ teamId: teamId, teamRole, canUserManageTeam }}
    >
      {children}
    </TeamContext.Provider>
  );
}
