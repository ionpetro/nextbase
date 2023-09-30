export const cacheTags = {
  teamsInOrganization: (organizationId: string): string => {
    return `teams_in_organization_${organizationId}`;
  },

  projectsInOrganization: (organizationId: string): string => {
    return `projects_in_organization_${organizationId}`;
  },

  organizationsList: (): string => {
    return 'organizations_list';
  },
};
