import { createSupabaseUserServerActionClient } from '@/supabase-clients/user/createSupabaseUserServerActionClient';
import { createSupabaseUserServerComponentClient } from '@/supabase-clients/user/createSupabaseUserServerComponentClient';
import { serverGetLoggedInUser } from '@/utils/server/serverGetLoggedInUser';
import { getIsAppAdmin } from '@/utils/supabase/user';
import { unstable_cache } from 'next/cache';

export const ensureAppAdmin = unstable_cache(
  async () => {
    console.log('fetching app admin');
    const supabaseClient = createSupabaseUserServerComponentClient();
    const user = await serverGetLoggedInUser();
    if (!user) {
      throw new Error('User not logged in');
    }

    const isAppAdmin = await getIsAppAdmin(supabaseClient, user);

    if (!isAppAdmin) {
      throw new Error('User is not an app admin');
    }

    return true;
  },
  ['ensureAppAdmin'],
  {
    revalidate: 60,
    tags: ['ensureAppAdmin'],
  },
);
