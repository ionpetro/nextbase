'use client';
import { Enum, Table } from '@/types';
import { createContext, useContext, useMemo } from 'react';

type ProjectContextType = {
  projectId: string;
  projectByIdData: Table<'projects'>;
  isTopLevelProject: boolean;
  organizationRole: Enum<'organization_member_role'>;
  maybeTeamRole: Enum<'project_team_member_role'> | null;
  maybeTeamData: Table<'teams'> | null;
  organizationData: Table<'organizations'>;
};

export const ProjectContext = createContext<ProjectContextType>({
  projectId: '',
  projectByIdData: {} as Table<'projects'>,
  isTopLevelProject: false,
  organizationRole: 'member',
  organizationData: {} as Table<'organizations'>,
  maybeTeamRole: null,
  maybeTeamData: null,
});

export function useProjectContext() {
  return useContext(ProjectContext);
}

export function ProjectContextProvider({
  projectByIdData,
  children,
  isTopLevelProject,
  organizationRole,
  maybeTeamRole,
  maybeTeamData,
  organizationData,
}: {
  children: React.ReactNode;
  projectByIdData: Table<'projects'>;
  isTopLevelProject: boolean;
  organizationRole: Enum<'organization_member_role'>;
  maybeTeamRole: Enum<'project_team_member_role'> | null;
  maybeTeamData: Table<'teams'> | null;
  organizationData: Table<'organizations'>;
}) {
  const contextValue = useMemo<ProjectContextType>(() => {
    return {
      projectByIdData,
      isTopLevelProject,
      projectId: projectByIdData.id,
      organizationRole,
      maybeTeamRole,
      maybeTeamData,
      organizationData,
    };
  }, [
    projectByIdData,
    isTopLevelProject,
    organizationRole,
    maybeTeamRole,
    maybeTeamData,
    organizationData,
  ]);
  return (
    <ProjectContext.Provider value={contextValue}>
      {children}
    </ProjectContext.Provider>
  );
}
