import { getAllOrganizationsForUser } from '@/utils/supabase-queries';
import { OrganizationList } from './OrganizationList';
import { AppSupabaseClient } from '@/types';
import { getUserPendingInvitationsByEmail } from '@/utils/supabase/invitations';
import { createSupabaseUserServerComponentClient } from '@/supabase-clients/user/createSupabaseUserServerComponentClient';
import { Anchor } from '@/components/Anchor';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/Alert';
import InfoIcon from 'lucide-react/dist/esm/icons/info';
import { cacheTags } from '@/utils/nextCache';
import { User } from '@supabase/supabase-js';
import {
  createOrganizationAction,
  fetchOrganizations,
} from '../all-organizations/actions';

export const metadata = {
  title: 'Dashboard | Nextbase',
};

const fetchData = async (supabaseClient: AppSupabaseClient, user: User) => {
  const [organizationList, pendingInvitations] = await Promise.all([
    fetchOrganizations(user.id)(),
    user.email
      ? getUserPendingInvitationsByEmail(supabaseClient, user.email)
      : getUserPendingInvitationsByEmail(supabaseClient, user.id),
  ]);
  return { organizationList, pendingInvitations };
};

export default async function DashboardPage() {
  const supabaseClient = createSupabaseUserServerComponentClient();
  const session = await supabaseClient.auth.getSession();
  const user = session?.data.session?.user;
  if (!user) throw new Error('No user found');

  const { organizationList, pendingInvitations } = await fetchData(
    supabaseClient,
    user,
  );
  return (
    <div className=" space-y-8">
      {pendingInvitations.length > 0 ? (
        <Anchor href="/invitations" className="cursor-pointer">
          <Alert variant="default">
            <InfoIcon className="h-4 w-4 mt-1" />
            <AlertTitle>Pending Invitations</AlertTitle>
            <AlertDescription className="text-muted-foreground">
              You have{' '}
              <span className="font-bold text-muted-foreground">
                {pendingInvitations.length}
              </span>{' '}
              pending invitation{pendingInvitations.length > 1 ? 's' : ''}.
              Accept the invitation to join the organization.
            </AlertDescription>
          </Alert>
        </Anchor>
      ) : null}
      <OrganizationList
        createOrganization={createOrganizationAction}
        organizationList={organizationList}
      />
    </div>
  );
}
