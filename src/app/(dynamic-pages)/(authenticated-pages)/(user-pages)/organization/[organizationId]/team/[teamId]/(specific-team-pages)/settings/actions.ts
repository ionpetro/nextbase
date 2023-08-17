'use server';
import { createSupabaseUserServerActionClient } from '@/supabase-clients/user/createSupabaseUserServerActionClient';
import { Enum } from '@/types';
import {
  addUserToTeam,
  removeUserFromTeam,
  updateUserRoleInTeam,
} from '@/utils/supabase/teams';
import { revalidatePath } from 'next/cache';

export const removeUserFromTeamAction = async ({
  userId,
  teamId,
}: {
  userId: string;
  teamId: number;
}) => {
  const supabaseClient = createSupabaseUserServerActionClient();
  removeUserFromTeam(supabaseClient, userId, teamId);
  revalidatePath(`/`);
  return;
};

export const updateUserRoleInTeamAction = async ({
  userId,
  teamId,
  role,
}: {
  userId: string;
  teamId: number;
  role: Enum<'project_team_member_role'>;
}) => {
  const supabaseClient = createSupabaseUserServerActionClient();
  updateUserRoleInTeam(supabaseClient, userId, teamId, role);
  revalidatePath(`/`);
  return;
};

export const addUserToTeamAction = async ({
  userId,
  teamId,
  role,
}: {
  userId: string;
  teamId: number;
  role: Enum<'project_team_member_role'>;
}) => {
  const supabaseClient = createSupabaseUserServerActionClient();
  const data = addUserToTeam(supabaseClient, userId, teamId, role);
  revalidatePath(`/`);
  return data;
};
