export const nextCacheTags = {
  teamsInOrganization: (organizationId: string): string => {
    return `teams_in_organization_${organizationId}`;
  },
  slimTeamsInOrganization: (organizationId: string): string => {
    return `slim_teams_in_organization_${organizationId}`;
  },
  projectsInOrganization: (organizationId: string): string => {
    return `projects_in_organization_${organizationId}`;
  },

  organizationsByUser: (userId: string): string => {
    return `organizations_by_user_${userId}`;
  },
  isUserAppAdmin: (userId: string): string => {
    return `is_user_app_admin_${userId}`;
  },
  userProfile: (userId: string): string => {
    return `user_profile_${userId}`;
  },
  organizationsForUser: (userId: string): string => {
    return `organizations_for_user_${userId}`;
  },
  slimOrganizationsForUser: (userId: string): string => {
    return `slim_organizations_for_user_${userId}`;
  },
  teamById: (teamId: number): string => {
    return `team_by_id_${teamId}`;
  },
};
