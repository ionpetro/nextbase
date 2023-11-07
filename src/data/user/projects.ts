'use server';
import { createSupabaseUserServerComponentClient } from '@/supabase-clients/user/createSupabaseUserServerComponentClient';

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
