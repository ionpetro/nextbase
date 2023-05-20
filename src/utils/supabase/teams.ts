import { AppSupabaseClient, CommentWithUser, Enum, Table } from '@/types';
import { getUserOrganizationRole } from './organizations';

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
    console.log(error);
  }

  return row?.role ?? null;
};

export const addUserToTeam = async (
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

export const getTeamById = async (
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

export const updateUserRoleInTeam = async (
  supabase: AppSupabaseClient,
  userId: string,
  teamId: number,
  newRole: Enum<'project_team_member_role'>
) => {
  const { data, error } = await supabase
    .from('team_members')
    .update({ role: newRole })
    .eq('user_id', userId)
    .eq('team_id', teamId);

  if (error) {
    throw error;
  }

  return data;
};

export const getTeamMembersByTeamId = async (
  supabase: AppSupabaseClient,
  teamId: number
) => {
  const { data, error } = await supabase
    .from('team_members')
    .select('*, user_profiles(*)')
    .eq('team_id', teamId);

  if (error) {
    throw error;
  }

  return data;
};

export const removeUserFromTeam = async (
  supabase: AppSupabaseClient,
  userId: string,
  teamId: number
) => {
  const { data, error } = await supabase
    .from('team_members')
    .delete()
    .eq('user_id', userId)
    .eq('team_id', teamId);

  if (error) {
    throw error;
  }

  return data;
};
