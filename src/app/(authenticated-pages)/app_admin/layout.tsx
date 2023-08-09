import { createSupabaseUserServerComponentClient } from '@/supabase-clients/user/createSupabaseUserServerComponentClient';
import { AppSupabaseClient } from '@/types';
import { errors } from '@/utils/errors';
import { getIsAppAdmin } from '@/utils/supabase-queries';
import { User } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';
import { AppAdminNavigation } from './AppAdminNavigation';

async function fetchData(supabaseClient: AppSupabaseClient, authUser: User) {
  const [isUserAppAdmin] = await Promise.all([
    getIsAppAdmin(supabaseClient, authUser),
  ]);

  return { isUserAppAdmin };
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
    const { isUserAppAdmin } = await fetchData(supabaseClient, data.user);

    if (!isUserAppAdmin) {
      return redirect('/dashboard');
    }
    return (
      <div className="flex-1 h-auto max-h-screen overflow-auto">
        <div className="px-12 py-8 space-y-6">
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
