import { getAllOrganizationsForUser } from '@/utils/supabase-queries';
import { OrganizationList } from './OrganizationList';
import { AppSupabaseClient } from '@/types';
import { getUserPendingInvitationsByEmail } from '@/utils/supabase/invitations';
import { PendingInvitationsList } from './PendingInvitationsList';
import { createSupabaseUserServerComponentClient } from '@/supabase-clients/user/createSupabaseUserServerComponentClient';

const fetchData = async (supabaseClient: AppSupabaseClient) => {
  const session = await supabaseClient.auth.getSession();
  const user = session?.data.session?.user;
  if (!user) throw new Error('No user found');
  const [initialOrganizationsList, pendingInvitations] = await Promise.all([
    getAllOrganizationsForUser(supabaseClient, user.id),
    user.email
      ? getUserPendingInvitationsByEmail(supabaseClient, user.email)
      : getUserPendingInvitationsByEmail(supabaseClient, user.id),
  ]);
  return { initialOrganizationsList, pendingInvitations };
};

export default async function DashboardPage() {
  const supabaseClient = createSupabaseUserServerComponentClient();
  const { initialOrganizationsList, pendingInvitations } = await fetchData(
    supabaseClient
  );
  return (
    <div className="max-w-7xl py-8 px-8 space-y-8">
      <PendingInvitationsList
        initialPendingInvitationsList={pendingInvitations}
      />
      <OrganizationList initialOrganizationsList={initialOrganizationsList} />
    </div>
  );
}
