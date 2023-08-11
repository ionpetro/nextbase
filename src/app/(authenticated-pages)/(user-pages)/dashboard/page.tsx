import { getAllOrganizationsForUser } from '@/utils/supabase-queries';
import { OrganizationList } from './OrganizationList';
import { AppSupabaseClient } from '@/types';
import { getUserPendingInvitationsByEmail } from '@/utils/supabase/invitations';
import { createSupabaseUserServerComponentClient } from '@/supabase-clients/user/createSupabaseUserServerComponentClient';
import { Anchor } from '@/components/Anchor';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/Alert';
import InfoIcon from 'lucide-react/dist/esm/icons/info';

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
      {pendingInvitations.length > 0 ? (
        <Anchor href="/invitations" className="cursor-pointer">
          <Alert variant="info">
            <InfoIcon className="h-4 w-4 mt-1" />
            <AlertTitle>Pending Invitations</AlertTitle>
            <AlertDescription>
              You have{' '}
              <span className="font-bold text-blue-900">
                {pendingInvitations.length}
              </span>{' '}
              pending invitation{pendingInvitations.length > 1 ? 's' : ''}.
              Accept the invitation to join the organization.
            </AlertDescription>
          </Alert>
        </Anchor>
      ) : null}
      <OrganizationList initialOrganizationsList={initialOrganizationsList} />
    </div>
  );
}
