'use server';

import { getLoggedInUserAction } from '@/app/(dynamic-pages)/_server-actions/user';
import { createSupabaseUserServerActionClient } from '@/supabase-clients/user/createSupabaseUserServerActionClient';
import {
  addProjectComment,
  approveProject,
  completeProject,
  getProjectComments,
  rejectProject,
  submitProjectForApproval,
} from '@/utils/supabase/projects';
import { revalidatePath } from 'next/cache';

export const approveProjectAction = async (projectId: string) => {
  const supabaseClient = createSupabaseUserServerActionClient();
  const data = await approveProject(supabaseClient, projectId);
  revalidatePath(`/project/${projectId}`);
  return data;
};

export const rejectProjectAction = async (projectId: string) => {
  const supabaseClient = createSupabaseUserServerActionClient();
  const data = await rejectProject(supabaseClient, projectId);
  revalidatePath(`/project/${projectId}`);
  return data;
};

export const submitProjectForApprovalAction = async (projectId: string) => {
  const supabaseClient = createSupabaseUserServerActionClient();
  const data = await submitProjectForApproval(supabaseClient, projectId);
  revalidatePath(`/project/${projectId}`);
  return data;
};

export const markProjectAsCompletedAction = async (projectId: string) => {
  const supabaseClient = createSupabaseUserServerActionClient();
  const data = await completeProject(supabaseClient, projectId);
  revalidatePath(`/project/${projectId}`);
  return data;
};

export const addProjectCommentAction = async (
  projectId: string,
  text: string
) => {
  const supabaseClient = createSupabaseUserServerActionClient();
  const user = await getLoggedInUserAction(supabaseClient);
  const data = await addProjectComment(
    supabaseClient,
    projectId,
    text,
    user.id
  );
  revalidatePath(`/project/${projectId}`);
  return data;
};

export const getProjectCommentsAction = async (projectId: string) => {
  const supabaseClient = createSupabaseUserServerActionClient();
  return await getProjectComments(supabaseClient, projectId);
};
