import { UserNavPopover } from '@/components/presentational/tailwind/Sidebars/UserNavPopover';
import { ThemeToggle } from '@/components/presentational/tailwind/ThemeToggle';
import { Notifications } from '@/components/ui/NavigationMenu/Notifications';
import { createSupabaseUserServerComponentClient } from '@/supabase-clients/user/createSupabaseUserServerComponentClient';
import { getUserAvatarUrl } from '@/utils/helpers';
import { getUserProfile } from '@/utils/supabase/user';

export async function UserNav() {
    const supabaseClient = createSupabaseUserServerComponentClient();
    const { data, error } = await supabaseClient.auth.getUser();
    const { user } = data;
    if (error) {
        throw error;
    }
    if (!user) {
        throw new Error('User not authenticated');
    }
    const { email } = user;

    if (!email) {
        // unreachable
        throw new Error('User email not found');
    }

    const userProfile = await getUserProfile(supabaseClient, user.id);
    return (
        <>
            <ThemeToggle />
            <Notifications />
            <UserNavPopover
                avatarUrl={getUserAvatarUrl({
                    email,
                    profileAvatarUrl: userProfile.avatar_url,
                })}
                userFullname={userProfile.full_name!}
                userEmail={email}
            />
        </>
    );
}
