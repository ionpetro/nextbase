'use client';
import { createContext, useContext } from 'react';
import { useOrganizationContext } from './OrganizationContext';
import { Enum, Table } from '@/types';

type TeamContextType = {
  teamId: number;
  canUserManageTeam: boolean;
  teamRole: Enum<'project_team_member_role'> | null;
  teamByIdData: Table<'teams'>;
};
export const TeamContext = createContext<TeamContextType>({
  teamId: -1,
  canUserManageTeam: false,
  teamRole: 'readonly',
  teamByIdData: {} as Table<'teams'>,
});

export function useTeamContext() {
  return useContext(TeamContext);
}

export function TeamContextProvider({
  children,
  teamId,
  teamRole,
  teamByIdData,
}: {
  children: React.ReactNode;
  teamId: number;
  teamRole: Enum<'project_team_member_role'> | null;
  teamByIdData: Table<'teams'>;
}) {
  const { organizationRole } = useOrganizationContext();

  const canUserManageTeam =
    teamRole === 'admin' ||
    organizationRole === 'admin' ||
    organizationRole === 'owner';

  return (
    <TeamContext.Provider
      value={{ teamId: teamId, teamByIdData, teamRole, canUserManageTeam }}
    >
      {children}
    </TeamContext.Provider>
  );
}
