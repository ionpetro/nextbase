import { createSupabaseUserServerComponentClient } from '@/supabase-clients/user/createSupabaseUserServerComponentClient';
import { AppSupabaseClient } from '@/types';
import { errors } from '@/utils/errors';
import { getIsAppAdmin, getUserProfile } from '@/utils/supabase-queries';
import { User } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';
import { AppAdminNavigation } from './AppAdminNavigation';
import { InternalNavbar } from '@/components/ui/NavigationMenu/InternalNavbar';

async function fetchData(supabaseClient: AppSupabaseClient, authUser: User) {
  const [isUserAppAdmin, userProfile] = await Promise.all([
    getIsAppAdmin(supabaseClient, authUser),
    getUserProfile(supabaseClient, authUser.id),
  ]);

  return { isUserAppAdmin, userProfile };
}

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabaseClient = createSupabaseUserServerComponentClient();
  const { data, error } = await supabaseClient.auth.getUser();
  if (error) {
    errors.add(error);
    return <p>Error: An error occurred.</p>;
  }
  if (!data.user) {
    // This is unreachable because the user is authenticated
    // But we need to check for it anyway for TypeScript.
    return <p>No user</p>;
  }

  try {
    const { isUserAppAdmin, userProfile } = await fetchData(
      supabaseClient,
      data.user,
    );

    if (!isUserAppAdmin) {
      return redirect('/dashboard');
    }
    return (
      <div className="flex-1 pb-10 relative h-auto max-h-screen w-full overflow-auto">
        <InternalNavbar />
        <div className="px-12 space-y-6">
          <AppAdminNavigation />
          {children}
        </div>
      </div>
    );
  } catch (fetchDataError) {
    errors.add(fetchDataError);
    return <p>Error: An error occurred.</p>;
  }
}
