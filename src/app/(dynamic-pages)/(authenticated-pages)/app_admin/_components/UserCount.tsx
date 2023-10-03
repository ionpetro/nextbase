import { supabaseAdminClient } from '@/supabase-clients/admin/supabaseAdminClient';

export async function UserCount() {
    const { data, error } = await supabaseAdminClient
        .from('user_profiles')
        .select('id');

    if (error) {
        throw error;
    }

    return String(data.length);
}
