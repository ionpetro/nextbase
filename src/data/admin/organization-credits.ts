import { supabaseAdminClient } from '@/supabase-clients/admin/supabaseAdminClient';

export async function incrementOrganizationCredits(
  org_id: string,
  amount: number,
) {
  const { error } = await supabaseAdminClient.rpc('increment_credits', {
    org_id,
    amount,
  });
  if (error) throw error;
}

export async function decrementOrganizationCredits(
  org_id: string,
  amount: number,
) {
  const { error } = await supabaseAdminClient.rpc('decrement_credits', {
    org_id,
    amount,
  });
  if (error) throw error;
}

export async function setOrganizationCredits(org_id: string, amount: number) {
  const { error, data } = await supabaseAdminClient
    .from('organization_credits')
    .update({ credits: amount })
    .eq('organization_id', org_id)
    .select('*')
    .single();
  if (error) throw error;

  return data;
}
