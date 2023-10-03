import { supabaseAdminClient } from '@/supabase-clients/admin/supabaseAdminClient';

export async function OrganizationCount() {
    const { data, error } = await supabaseAdminClient
        .from('organizations')
        .select('id');

    if (error) {
        throw error;
    }

    return String(data.length);
}
