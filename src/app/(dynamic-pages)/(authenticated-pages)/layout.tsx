import { ClientLayout } from './ClientLayout';
import { AppSupabaseClient } from '@/types';
import { User } from '@supabase/supabase-js';
import { getIsAppAdmin, getUserProfile } from '@/utils/supabase-queries';
import { errors } from '@/utils/errors';
import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { createSupabaseUserServerComponentClient } from '@/supabase-clients/user/createSupabaseUserServerComponentClient';

async function fetchData(supabaseClient: AppSupabaseClient, authUser: User) {
  const [isUserAppAdmin, userProfile] = await Promise.all([
    getIsAppAdmin(supabaseClient, authUser),
    getUserProfile(supabaseClient, authUser.id),
  ]);

  return { isUserAppAdmin, userProfile };
}

export default async function Layout({ children }: { children: ReactNode }) {
  const supabaseClient = createSupabaseUserServerComponentClient();
  const { data, error } = await supabaseClient.auth.getUser();

  if (!data.user) {
    // This is unreachable because the user is authenticated
    // But we need to check for it anyway for TypeScript.
    return redirect('/login');
  } else if (error) {
    return <p>Error: An error occurred.</p>;
  }

  try {
    const { isUserAppAdmin, userProfile } = await fetchData(
      supabaseClient,
      data.user
    );

    return (
      <ClientLayout isUserAppAdmin={isUserAppAdmin} userProfile={userProfile}>
        {children}
      </ClientLayout>
    );
  } catch (fetchDataError) {
    errors.add(fetchDataError);
    return <p>Error: An error occurred.</p>;
  }
}
