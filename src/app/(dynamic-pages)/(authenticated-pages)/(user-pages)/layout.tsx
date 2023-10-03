import { cn } from '@/utils/cn';
import Link from 'next/link';
import { ReactNode } from 'react';
import { AppSupabaseClient } from '@/types';
import { User } from '@supabase/supabase-js';
import { getIsAppAdmin, getUserProfile } from '@/utils/supabase-queries';
import { errors } from '@/utils/errors';
import { redirect } from 'next/navigation';
import { createSupabaseUserServerComponentClient } from '@/supabase-clients/user/createSupabaseUserServerComponentClient';
import setCurrentOrganizationIdAction from '../actions';
import { cookies } from 'next/headers';
import { getAllOrganizationsForUser } from '@/utils/supabase-queries';
import { InternalNavbar } from '@/components/ui/NavigationMenu/InternalNavbar';

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
  const { user } = data;
  if (error) {
    throw error;
  }
  if (!user) {
    throw new Error('User not authenticated');
  }
  const { initialOrganizationsList, isUserAppAdmin, userProfile } =
    await fetchData(supabaseClient, user);
  const currentOrganizationId = cookies().get('current_organization_id')?.value;
  return (
    <>
      <InternalNavbar />
      <div className="relative flex-1 h-auto mt-8 w-full overflow-auto">
        <div className="px-12 space-y-6 pb-10">{children}</div>
      </div>
    </>
  );
}
