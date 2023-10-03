import { Anchor } from '@/components/Anchor';
import { createSupabaseUserServerComponentClient } from '@/supabase-clients/user/createSupabaseUserServerComponentClient';
import { classNames } from '@/utils/classNames';
import { getIsAppAdmin } from '@/utils/supabase/user';
import ServerIcon from 'lucide-react/dist/esm/icons/server';
import { AppAdminLinkClient } from './AppAdminLinkClient';

export async function AppAdminLink() {
    const supabaseClient = createSupabaseUserServerComponentClient();
    const { data, error } = await supabaseClient.auth.getUser();
    const { user } = data;
    if (error) {
        throw error;
    }
    if (!user) {
        throw new Error('User not authenticated');
    }
    const isUserAppAdmin = await getIsAppAdmin(supabaseClient, user);
    return <>{isUserAppAdmin ? <AppAdminLinkClient /> : <span />}</>;
}
