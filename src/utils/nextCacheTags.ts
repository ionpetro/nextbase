export const nextCacheKeys = {
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
  slimOrganizations: (): string => {
    return `slim_organizations`;
  },
  teamById: (teamId: number): string => {
    return `team_by_id_${teamId}`;
  },
  projectById: (projectId: string): string => {
    return `project_by_id_${projectId}`;
  },
  organizationById: (organizationId: string): string => {
    return `organization_by_id_${organizationId}`;
  },

  appAdminInternalBlogList: (): string => {
    return `app_admin_internal_blog_list`;
  },
  appAdminInternalChangelogList: (): string => {
    return `app_admin_internal_changelog_list`;
  },
  appAdminInternalRoadmapList: (): string => {
    return `app_admin_internal_roadmap_list`;
  },
};

export const nextCacheTags = {
  organizations: 'organizations',
  organizationsForUser: (userId: string): string => {
    return `organizations_for_user_${userId}`;
  },
  teams: 'teams',
  teamsInOrganization: (organizationId: string): string => {
    return `teams_in_organization_${organizationId}`;
  },
  projects: 'projects',
  projectsInOrganization: (organizationId: string): string => {
    return `projects_in_organization_${organizationId}`;
  },
  users: 'users',
  profiles: 'profiles',
  userProfile: (userId: string): string => {
    return `user_profile_${userId}`;
  },
  appAdmins: 'appAdmins',
  internalBlogPosts: 'internalBlogPosts',
  internalChangelog: 'internalChangelog',
  internalRoadmap: 'internalRoadmap',
  internalFeedback: 'internalFeedback',
};
