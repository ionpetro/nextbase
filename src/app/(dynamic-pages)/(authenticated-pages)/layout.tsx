import { ClientLayout } from './ClientLayout';
import { AppSupabaseClient } from '@/types';
import { User } from '@supabase/supabase-js';
import { errors } from '@/utils/errors';
import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { createSupabaseUserServerComponentClient } from '@/supabase-clients/user/createSupabaseUserServerComponentClient';
import { LoggedInUserProvider } from '@/contexts/LoggedInUserContext';
import { getUserProfile } from '@/data/user/user';
import { unstable_noStore } from 'next/cache';

async function fetchData(supabaseClient: AppSupabaseClient, authUser: User) {
  const [userProfile] = await Promise.all([getUserProfile(authUser.id)]);

  return { userProfile };
}

export default async function Layout({ children }: { children: ReactNode }) {
  unstable_noStore();
  const supabaseClient = createSupabaseUserServerComponentClient();
  const { data, error } = await supabaseClient.auth.getUser();
  const { user } = data;

  if (!user) {
    // This is unreachable because the user is authenticated
    // But we need to check for it anyway for TypeScript.
    return redirect('/login');
  } else if (error) {
    return <p>Error: An error occurred.</p>;
  }

  try {
    const { userProfile } = await fetchData(supabaseClient, data.user);

    return (
      <LoggedInUserProvider user={user}>
        <ClientLayout userProfile={userProfile}>{children}</ClientLayout>
      </LoggedInUserProvider>
    );
  } catch (fetchDataError) {
    errors.add(fetchDataError);
    return <p>Error: An error occurred.</p>;
  }
}
