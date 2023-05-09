import { getAllOrganizationsForUser } from '@/utils/supabase-queries';
import { OrganizationList } from './OrganizationList';
import createClient from '@/utils/supabase-server';
import { AppSupabaseClient } from '@/types';

const fetchData = async (supabaseClient: AppSupabaseClient) => {
  const session = await supabaseClient.auth.getSession();
  const user = session?.data.session?.user;
  if (!user) throw new Error('No user found');
  const initialOrganizationsList = await getAllOrganizationsForUser(
    supabaseClient,
    user.id
  );
  return { initialOrganizationsList };
};

export default async function DashboardPage() {
  const supabase = createClient();
  const { initialOrganizationsList } = await fetchData(supabase);
  return (
    <div className='space-y-10'>
      <OrganizationList initialOrganizationsList={initialOrganizationsList} />
    </div>
  )
}
