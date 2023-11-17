'use server';
import { CommentList } from '@/components/Projects/CommentList';
import { createSupabaseUserServerActionClient } from '@/supabase-clients/user/createSupabaseUserServerActionClient';
import { createSupabaseUserServerComponentClient } from '@/supabase-clients/user/createSupabaseUserServerComponentClient';
import { CommentWithUser } from '@/types';
import { normalizeComment } from '@/utils/comments';
import { serverGetLoggedInUser } from '@/utils/server/serverGetLoggedInUser';
import { revalidatePath } from 'next/cache';
import { Suspense } from 'react';
import { customRevalidate } from '../anon/revalidate';

export async function getSlimProjectById(projectId: string) {
  const supabaseClient = createSupabaseUserServerComponentClient();
  const { data, error } = await supabaseClient
    .from('projects')
    .select('id,name,project_status,organization_id,team_id') // specify the columns you need
    .eq('id', projectId)
    .single();
  if (error) {
    throw error;
  }
  return data;
}

export async function getProjectById(projectId: string) {
  const supabaseClient = createSupabaseUserServerComponentClient();
  const { data, error } = await supabaseClient
    .from('projects')
    .select('*') // specify the columns you need
    .eq('id', projectId)
    .single();
  if (error) {
    throw error;
  }
  return data;
}

export async function getProjectTitleById(projectId: string) {
  const supabaseClient = createSupabaseUserServerComponentClient();
  const { data, error } = await supabaseClient
    .from('projects')
    .select('name') // specify the columns you need
    .eq('id', projectId)
    .single();
  if (error) {
    throw error;
  }
  return data.name;
}

export const createProjectAction = async ({
  organizationId,
  name,
  teamId,
}: {
  organizationId: string;
  name: string;
  teamId: number | null;
}) => {
  'use server';
  const supabaseClient = createSupabaseUserServerActionClient();
  const { data: project, error } = await supabaseClient
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

  if (teamId) {
    revalidatePath(`/organization/${organizationId}/team/${teamId}`);
  } else {
    revalidatePath(`/organization/${organizationId}`);
  }
  return project;
};

export const getProjectComments = async (
  projectId: string,
): Promise<Array<CommentWithUser>> => {
  const supabase = createSupabaseUserServerComponentClient();
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

export const createProjectCommentAction = async (
  projectId: string,
  text: string,
) => {
  const supabaseClient = createSupabaseUserServerActionClient();
  const user = await serverGetLoggedInUser();
  const { data, error } = await supabaseClient
    .from('project_comments')
    .insert({ project_id: projectId, text, user_id: user.id })
    .select('*, user_profiles(*)')
    .single();
  if (error) {
    throw error;
  }
  revalidatePath(`/project/${projectId}`, 'page');

  return {
    success: true,
    id: data.id,
    commentList: (
      <Suspense>
        <CommentList comments={[normalizeComment(data)]} />
      </Suspense>
    ),
  };
};

export const approveProjectAction = async (projectId: string) => {
  const supabaseClient = createSupabaseUserServerActionClient();
  const { data, error } = await supabaseClient
    .from('projects')
    .update({ project_status: 'approved' })
    .eq('id', projectId)
    .select('*')
    .single();

  if (error) {
    throw error;
  }

  revalidatePath(`/project/${projectId}`);
  return data;
};

export const rejectProjectAction = async (projectId: string) => {
  const supabaseClient = createSupabaseUserServerActionClient();
  const { data, error } = await supabaseClient
    .from('projects')
    .update({ project_status: 'draft' })
    .eq('id', projectId)
    .select('*')
    .single();

  if (error) {
    throw error;
  }

  revalidatePath(`/project/${projectId}`);
  return data;
};

export const submitProjectForApprovalAction = async (projectId: string) => {
  const supabaseClient = createSupabaseUserServerActionClient();
  const { data, error } = await supabaseClient
    .from('projects')
    .update({ project_status: 'pending_approval' })
    .eq('id', projectId)
    .select('*')
    .single();

  if (error) {
    throw error;
  }

  revalidatePath(`/project/${projectId}`);
  return data;
};

export const markProjectAsCompletedAction = async (projectId: string) => {
  const supabaseClient = createSupabaseUserServerActionClient();
  const { data, error } = await supabaseClient
    .from('projects')
    .update({ project_status: 'completed' })
    .eq('id', projectId)
    .select('*')
    .single();

  if (error) {
    throw error;
  }

  revalidatePath(`/project/${projectId}`);
  return data;
};

export const getProjects = async ({
  organizationId,
  teamId,
}: {
  organizationId: string;
  teamId: number | null;
}) => {
  const supabase = createSupabaseUserServerComponentClient();
  let query = supabase
    .from('projects')
    .select('*')
    .eq('organization_id', organizationId);
  if (teamId) {
    query = query.eq('team_id', teamId);
  } else {
    query = query.is('team_id', null);
  }
  const { data, error } = await query.order('created_at', { ascending: false });
  if (error) {
    throw error;
  }

  return data;
};
