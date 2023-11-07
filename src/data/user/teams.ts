'use server';
import { createSupabaseUserServerComponentClient } from '@/supabase-clients/user/createSupabaseUserServerComponentClient';
import { Table } from '@/types';

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
