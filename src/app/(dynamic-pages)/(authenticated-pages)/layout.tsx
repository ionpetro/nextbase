import { ClientLayout } from './ClientLayout';
import { AppSupabaseClient } from '@/types';
import { User } from '@supabase/supabase-js';
import { getIsAppAdmin, getUserProfile } from '@/utils/supabase-queries';
import { errors } from '@/utils/errors';
import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { createSupabaseUserServerComponentClient } from '@/supabase-clients/user/createSupabaseUserServerComponentClient';
import setCurrentOrganizationIdAction from './actions';
import { cookies } from 'next/headers';
import { getAllOrganizationsForUser } from '@/utils/supabase-queries';
import { LayoutShell } from './LayoutShell';
import { Sidebar } from './Sidebar/Sidebar';

async function fetchData(supabaseClient: AppSupabaseClient, authUser: User) {
  const [isUserAppAdmin, userProfile] = await Promise.all([
    getIsAppAdmin(supabaseClient, authUser),
    getUserProfile(supabaseClient, authUser.id),
  ]);

  const [initialOrganizationsList] = await Promise.all([
    getAllOrganizationsForUser(supabaseClient, authUser.id),
  ]);
  return { initialOrganizationsList, isUserAppAdmin, userProfile };
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
    const { initialOrganizationsList, isUserAppAdmin, userProfile } =
      await fetchData(supabaseClient, data.user);

    const currentOrganizationId = cookies().get('current_organization_id')
      ?.value;

    return (
      <LayoutShell>
        <Sidebar
          isUserAppAdmin={isUserAppAdmin}
          userProfile={userProfile}
          currentOrganizationId={currentOrganizationId}
          setCurrentOrganizationId={setCurrentOrganizationIdAction}
          organizationList={initialOrganizationsList}
        />
        <ClientLayout
          isUserAppAdmin={isUserAppAdmin}
          userProfile={userProfile}
          currentOrganizationId={currentOrganizationId}
          setCurrentOrganizationId={setCurrentOrganizationIdAction}
          organizationList={initialOrganizationsList}
        >
          {children}
        </ClientLayout>
      </LayoutShell>
    );
  } catch (fetchDataError) {
    errors.add(fetchDataError);
    return <p>Error: An error occurred.</p>;
  }
}
