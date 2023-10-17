import { UserNavPopover } from '@/components/presentational/tailwind/Sidebars/UserNavPopover';
import { ThemeToggle } from '@/components/presentational/tailwind/ThemeToggle';
import { Notifications } from '@/components/ui/NavigationMenu/Notifications';
import { createSupabaseUserServerComponentClient } from '@/supabase-clients/user/createSupabaseUserServerComponentClient';
import { getUserAvatarUrl } from '@/utils/helpers';
import { serverGetLoggedInUser } from '@/utils/server/serverGetLoggedInUser';
import { getUserProfile } from '@/utils/supabase/user';

export async function UserNav() {
  const supabaseClient = createSupabaseUserServerComponentClient();
  const user = await serverGetLoggedInUser();
  const { email } = user;
  if (!email) {
    // unreachable
    throw new Error('User email not found');
  }

  const userProfile = await getUserProfile(supabaseClient, user.id);
  return (
    <>
      <ThemeToggle />
      <Notifications userId={user.id} />
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
