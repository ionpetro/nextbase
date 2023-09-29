// src/app/(dynamic-pages)/(authenticated-pages)/(user-pages)/invitations/[invitationId]/page.tsx
import { Table } from '@/types';
import { getInvitationById } from '@/utils/supabase/invitations'; // You need to implement these functions
import { createSupabaseUserServerComponentClient } from '@/supabase-clients/user/createSupabaseUserServerComponentClient';
import { T } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { Anchor } from '@/components/Anchor';

export default async function InvitationPage({
  params,
}: {
  params: { invitationId: string };
}) {
  const supabaseClient = createSupabaseUserServerComponentClient();
  const invitation = await getInvitationById(
    supabaseClient,
    params.invitationId,
  );

  if (!invitation) {
    return <div>Loading...</div>;
  }

  const inviter = Array.isArray(invitation.inviter)
    ? invitation.inviter[0]
    : invitation.inviter;
  const organization = Array.isArray(invitation.organization)
    ? (invitation.organization[0] as Table<'organizations'> | null)
    : invitation.organization;
  if (!organization || !inviter) {
    throw new Error('Organization or Inviter not found');
  }

  return (
    <div className="max-w-300px mx-auto space-y-2">
      <T.H2>Invitation from {inviter.full_name}</T.H2>
      <div className="space-y-2">
        <T.P>
          You have been invited to join {organization.title} as a{' '}
          {invitation.invitee_organization_role}.
        </T.P>
        <div>
          <Anchor href={`/api/invitations/accept/${invitation.id}`}>
            <Button variant="default">Accept</Button>
          </Anchor>
          <Anchor href={`/api/invitations/decline/${invitation.id}`}>
            <Button variant="ghost">Decline</Button>
          </Anchor>
        </div>
      </div>
    </div>
  );
}
