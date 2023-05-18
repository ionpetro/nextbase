import { TabsNavigation } from '@/components/presentational/tailwind/TabsNavigation';
import BasicPageHeading from '@/components/ui/Headings/BasicPageHeading';
import { AppSupabaseClient } from '@/types';
import { errors } from '@/utils/errors';
import { getIsAppAdmin } from '@/utils/supabase-queries';
import createClient from '@/utils/supabase-server';
import { User } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';
import { FiBriefcase, FiSettings, FiUsers } from 'react-icons/fi';

const tabs = [
  {
    label: 'Application Settings',
    href: `/app_admin`,
    icon: <FiSettings />,
  },
  {
    label: 'Users',
    href: `/app_admin/users`,
    icon: <FiUsers />,
  },
  {
    label: 'Organizations',
    href: `/app_admin/organizations`,
    icon: <FiBriefcase />,
  },
]

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
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
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
    const { isUserAppAdmin } = await fetchData(
      supabase,
      data.user
    );

    if (!isUserAppAdmin) {
      return redirect('/dashboard');
    }
    return <div className="flex-1 h-auto max-w-[1296px] overflow-auto">
      <div className="px-12 py-8 space-y-6">
        <div className="space-y-2">
          <BasicPageHeading
            heading="Admin Panel"
            subheading=" You are currently in the Application Admin Dashboard area. All
      sections of this area are protected and only application admins
      can access this."
          />
        </div>
        <div className="space-y-6">
          <TabsNavigation tabs={tabs} />
        </div>
        {children}
      </div>
    </div>
  } catch (fetchDataError) {
    errors.add(fetchDataError);
    return <p>Error: An error occurred.</p>;
  }
}
