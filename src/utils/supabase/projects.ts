import { AppSupabaseClient, CommentWithUser, Enum, Table } from '@/types';

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

export const getProjectById = async (
  supabase: AppSupabaseClient,
  projectId: string
) => {
  const { data: project, error: projectError } = await supabase
    .from('projects')
    .select('*')
    .eq('id', projectId)
    .single();

  if (projectError) {
    throw projectError;
  }
  return project;
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

export const getTopLevelDraftProjectsByOrganizationId = async (
  supabase: AppSupabaseClient,
  organizationId: string
) => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('organization_id', organizationId)
    // no team_id
    .is('team_id', null)
    .eq('project_status', 'draft')
    .order('created_at', { ascending: false });
  if (error) {
    throw error;
  }

  return data;
};

export const getTopLevelPendingApprovalProjectsByOrganizationId = async (
  supabase: AppSupabaseClient,
  organizationId: string
) => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('organization_id', organizationId)
    // no team_id
    .is('team_id', null)
    .eq('project_status', 'pending_approval')
    .order('created_at', { ascending: false });
  if (error) {
    throw error;
  }

  return data;
};

export const getTopLevelApprovedProjectsByOrganizationId = async (
  supabase: AppSupabaseClient,
  organizationId: string
) => {
  const { data, error } = await supabase

    .from('projects')
    .select('*')
    .eq('organization_id', organizationId)
    // no team_id
    .is('team_id', null)
    .eq('project_status', 'approved')
    .order('created_at', { ascending: false });
  if (error) {
    throw error;
  }

  return data;
};

export const getTopLevelCompletedProjectsByOrganizationId = async (
  supabase: AppSupabaseClient,
  organizationId: string
) => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('organization_id', organizationId)
    // no team_id
    .is('team_id', null)
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

export const createProject = async (
  supabase: AppSupabaseClient,
  organizationId: string,
  teamId: number | null,
  name: string
) => {
  const { data, error } = await supabase
    .from('projects')
    .insert({
      organization_id: organizationId,
      team_id: teamId,
      name,
    })
    .select('*')
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const deleteProject = async (
  supabase: AppSupabaseClient,
  projectId: string
) => {
  const { data, error } = await supabase
    .from('projects')
    .delete()
    .match({ id: projectId });

  if (error) {
    throw error;
  }

  return data;
};

export const updateProjectName = async (
  supabase: AppSupabaseClient,
  projectId: string,
  name: string
) => {
  const { data, error } = await supabase
    .from('projects')
    .update({ name })
    .match({ id: projectId })
    .select('*')
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const updateProjectStatus = async (
  supabase: AppSupabaseClient,
  projectId: string,
  projectStatus: Enum<'project_status'>
) => {
  const { data, error } = await supabase
    .from('projects')
    .update({ project_status: projectStatus })
    .match({ id: projectId })
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
  const { data, error } = await supabase
    .from('project_comments')
    .insert({ project_id: projectId, text, user_id: userId })
    .select('*')
    .single();
  if (error) {
    throw error;
  }

  return data;
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
  projectId: string
): Promise<Array<CommentWithUser>> => {
  const { data, error } = await supabase
    .from('project_comments')
    .select('*, user_profiles(*)')
    .eq('project_id', projectId)
    .order('created_at', { ascending: false });
  if (error) {
    throw error;
  }

  return data.map(normalizeComment);
};

export const submitProjectForApproval = async (
  supabase: AppSupabaseClient,
  projectId: string
) => {
  const { data, error } = await supabase
    .from('projects')
    .update({ project_status: 'pending_approval' })
    .eq('id', projectId)
    .select('*')
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const approveProject = async (
  supabase: AppSupabaseClient,
  projectId: string
) => {
  const { data, error } = await supabase
    .from('projects')
    .update({ project_status: 'approved' })
    .eq('id', projectId)
    .select('*')
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const rejectProject = async (
  supabase: AppSupabaseClient,
  projectId: string
) => {
  const { data, error } = await supabase
    .from('projects')
    .update({ project_status: 'draft' })
    .eq('id', projectId)
    .select('*')
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const completeProject = async (
  supabase: AppSupabaseClient,
  projectId: string
) => {
  const { data, error } = await supabase
    .from('projects')
    .update({ project_status: 'completed' })
    .eq('id', projectId)
    .select('*')
    .single();

  if (error) {
    throw error;
  }

  return data;
};
