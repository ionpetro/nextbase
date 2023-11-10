'use server';
import { createSupabaseUserServerComponentClient } from '@/supabase-clients/user/createSupabaseUserServerComponentClient';
import { Enum, Table } from '@/types';
import { serverGetLoggedInUser } from '@/utils/server/serverGetLoggedInUser';
import { revalidatePath } from 'next/cache';

export async function getSlimTeamById(teamId: number) {
  const supabaseClient = createSupabaseUserServerComponentClient();
  const { data, error } = await supabaseClient
    .from('teams')
    .select('id,name,organization_id')
    .eq('id', teamId)
    .single();
  if (error) {
    throw error;
  }
  return data;
}

export const getTeamsInOrganization = async (
  organizationId: string,
): Promise<Table<'teams'>[]> => {
  const supabaseClient = createSupabaseUserServerComponentClient();

  const { data, error } = await supabaseClient
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

export const createTeamAction = async (
  organizationId: string,
  name: string,
) => {
  const supabaseClient = createSupabaseUserServerComponentClient();

  const { data, error } = await supabaseClient
    .from('teams')
    .insert({
      name,
      organization_id: organizationId,
    })
    .select('*')
    .single();

  if (error) {
    throw error;
  }

  revalidatePath(`/organization/${organizationId}`);

  return data;
};

export const getUserTeamRole = async (
  userId: string,
  teamId: number,
): Promise<Enum<'project_team_member_role'> | null> => {
  const supabase = createSupabaseUserServerComponentClient();
  const { data, error } = await supabase
    .from('team_members')
    .select('*')
    .eq('user_id', userId)
    .eq('team_id', teamId);

  const row = data?.[0];

  if (error) {
    throw error;
  }

  return row?.role ?? null;
};

export const getLoggedInUserTeamRole = async (teamId: number) => {
  const user = await serverGetLoggedInUser();
  return getUserTeamRole(user.id, teamId);
};
