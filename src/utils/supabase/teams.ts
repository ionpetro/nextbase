import { AppSupabaseClient, CommentWithUser, Enum, Table } from "@/types";
import { getUserOrganizationRole } from "./organizations";

export const getUserTeamRole = async (
  supabase: AppSupabaseClient,
  userId: string,
  teamId: number
): Promise<Enum<'project_team_member_role'> | null> => {
  const { data, error } = await supabase
    .from('team_members')
    .select('*')
    .eq('user_id', userId)
    .eq('team_id', teamId);

  const row = data?.[0];

  if (error) {
    console.log(error)
  }

  return row?.role ?? null;
};

export const addUserToProjectTeam = async (
  supabase: AppSupabaseClient,
  userId: string,
  teamId: number,
  role: Enum<'project_team_member_role'>
) => {
  const rowCount = await supabase
    .from('team_members')
    .select('id')
    .eq('user_id', userId)
    .eq('team_id', teamId);

  if (rowCount.error || rowCount.data?.length > 0) {
    throw new Error('User already in team');
  }

  const { data, error } = await supabase
    .from('team_members')
    .insert({
      user_id: userId,
      role: role,
      team_id: teamId,
    })
    .select('*')
    .single();

  if (error) {

    throw error;
  }

  return data;
};

export const updateUserRoleInProjectTeam = async (
  supabase: AppSupabaseClient,
  userId: string,
  projectId: number,
  newRole: Enum<'project_team_member_role'>
) => {
  const { data, error } = await supabase
    .from('team_members')
    .update({ role: newRole })
    .eq('user_id', userId)
    .eq('team_id', projectId);

  if (error) {

    throw error;
  }

  return data;
};

export const createTeamInOrganization = async (
  supabase: AppSupabaseClient,
  organizationId: string,
  teamName: string
) => {
  const { data, error } = await supabase
    .from('teams')
    .insert({
      organization_id: organizationId,
      name: teamName,
    })
    .select('*');

  if (error) {
    throw error;
  }

  return data;
};

export const getTeamsInOrganization = async (
  supabase: AppSupabaseClient,
  organizationId: string
) => {
  const { data, error } = await supabase
    .from('teams')
    .select('*')
    .eq('organization_id', organizationId)
    .order('created_at', { ascending: true });

  if (error) {
    throw error;
  }

  if (!data) {
    throw new Error('No teams found for organization');
  }
  return data;
};

export const getTeam = async (supabase: AppSupabaseClient, teamId: number) => {
  const { data, error } = await supabase
    .from('teams')
    .select('*')
    .eq('id', teamId)
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const getProjectsByTeamId = async (
  supabase: AppSupabaseClient,
  teamId: number
) => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('team_id', teamId)
    .order('created_at', { ascending: false });
  if (error) {

    throw error;
  }

  return data;
};

export const getDraftProjectsByTeamId = async (
  supabase: AppSupabaseClient,
  teamId: number
) => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('team_id', teamId)
    .eq('project_status', 'draft')
    .order('created_at', { ascending: false });
  if (error) {

    throw error;
  }

  return data;
};

export const getPendingApprovalProjectsByTeamId = async (
  supabase: AppSupabaseClient,
  teamId: number
) => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('team_id', teamId)
    .eq('project_status', 'pending_approval')
    .order('created_at', { ascending: false });
  if (error) {

    throw error;
  }

  return data;
};

export const getApprovedProjectsByTeamId = async (
  supabase: AppSupabaseClient,
  teamId: number
) => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('team_id', teamId)
    .eq('project_status', 'approved')
    .order('created_at', { ascending: false });
  if (error) {

    throw error;
  }

  return data;
};

export const getCompletedProjectsByTeamId = async (
  supabase: AppSupabaseClient,
  teamId: number
) => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('team_id', teamId)
    .eq('project_status', 'completed')
    .order('created_at', { ascending: false });
  if (error) {

    throw error;
  }

  return data;
};

export const getProjectsUnAssignedToTeam = async (
  supabase: AppSupabaseClient,
  organizationId: string
) => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('organization_id', organizationId)
    .is('team_id', null);

  if (error) {

    throw error;
  }

  return data;
};

export const getProjectTeamById = async (
  supabase: AppSupabaseClient,
  teamId: number
) => {
  const { data, error } = await supabase
    .from('teams')
    .select('*')
    .eq('id', teamId)
    .single();

  if (error) {

    throw error;
  }

  return data;
};

export const getCanUserManageTeam = async (
  supabase: AppSupabaseClient,
  userId: string,
  organizationId: string,
  teamId: number
) => {
  const [teamRole, orgRole] = await Promise.all([
    getUserTeamRole(supabase, userId, teamId),
    getUserOrganizationRole(supabase, userId, organizationId),
  ]);

  if (teamRole === 'admin' || orgRole === 'owner' || orgRole === 'admin') {
    return true;
  }
  return false;
};


export const submitProjectForApproval = async (
  supabase: AppSupabaseClient,
  runUUID: string
) => {
  const { data, error } = await supabase
    .from('projects')
    .update({ project_status: 'pending_approval' })
    .eq('uuid', runUUID)
    .select('*')
    .single();

  if (error) {

    throw error;
  }

  return data;
};

export const markProjectAsCompleted = async (
  supabase: AppSupabaseClient,
  runUUID: string
) => {
  const { data, error } = await supabase

    .from('projects')
    .update({ project_status: 'completed' })
    .eq('uuid', runUUID)
    .select('*')
    .single();

  if (error) {

    throw error;
  }

  return data;
};

export const approveProject = async (
  supabase: AppSupabaseClient,
  runUUID: string
) => {
  const { data, error } = await supabase
    .from('projects')
    .update({ project_status: 'approved' })
    .eq('uuid', runUUID)
    .select('*')
    .single();

  if (error) {

    throw error;
  }

  return data;
};

export const rejectProject = async (
  supabase: AppSupabaseClient,
  runUUID: string
) => {
  const { data, error } = await supabase
    .from('projects')
    .update({ project_status: 'draft' })
    .eq('uuid', runUUID)
    .select('*')
    .single();

  if (error) {

    throw error;
  }

  return data;
};

export const completeProject = async (
  supabase: AppSupabaseClient,
  runUUID: string
) => {
  const { data, error } = await supabase
    .from('projects')
    .update({ project_status: 'completed' })
    .eq('uuid', runUUID)
    .select('*')
    .single();

  if (error) {

    throw error;
  }

  return data;
};

export const addProjectComment = async (
  supabase: AppSupabaseClient,
  projectId: string,
  text: string,
  userId: string
) => {
  const { error } = await supabase
    .from('project_comments')
    .insert({ project_id: projectId, text, user_id: userId })
    .select('*')
    .single();
  if (error) {

    throw error;
  }

  return true;
};

function normalizeComment(
  comments: Table<'project_comments'> & {
    user_profiles:
    | Table<'user_profiles'>
    | Array<Table<'user_profiles'>>
    | null;
  }
): CommentWithUser {
  const user_profiles = Array.isArray(comments.user_profiles)
    ? comments.user_profiles[0]
    : comments.user_profiles;
  if (!user_profiles) {
    throw new Error('No user profile found for comment');
  }

  return {
    ...comments,
    user_profile: user_profiles,
  };
}

export const getProjectComments = async (
  supabase: AppSupabaseClient,
  runUUID: string
): Promise<Array<CommentWithUser>> => {
  const { data, error } = await supabase
    .from('project_comments')
    .select('*, user_profiles(*)')
    .eq('run_uuid', runUUID);
  if (error) {

    throw error;
  }

  return data.map(normalizeComment);
};
