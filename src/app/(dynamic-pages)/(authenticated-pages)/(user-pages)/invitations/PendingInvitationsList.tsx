import { T } from '@/components/ui/Typography';
import { Button } from '@/components/ui/button';
import {
  Table as ShadcnTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getPendingInvitationsOfUser } from '@/data/user/invitation';
import type { Enum } from '@/types';
import Link from 'next/link';

const PendingInvitationsTable = ({
  pendingInvitationsList,
}: {
  pendingInvitationsList: Array<{
    id: string;
    inviterUserFullName: string;
    organizationTitle: string;
    status: Enum<'organization_join_invitation_link_status'>;
    role: Enum<'organization_member_role'>;
    organizationId: string;
  }>;
}) => {
  return (
    <div className="space-y-2">
      <T.P>You have {pendingInvitationsList.length} pending invitations</T.P>
      <div className="w-full rounded-lg border overflow-hidden">
        <ShadcnTable>
          <TableHeader>
            <TableRow>
              <TableHead scope="col">#</TableHead>
              <TableHead scope="col">Invited By</TableHead>
              <TableHead scope="col">Organization Name</TableHead>
              <TableHead scope="col">ROLE</TableHead>
              <TableHead scope="col">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pendingInvitationsList.map((invitation, index) => (
              <TableRow
                key={invitation.id}
                data-invitation-id={invitation.id}
                data-organization-id={invitation.organizationId}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell className="text-left">
                  {invitation.inviterUserFullName}
                </TableCell>
                <TableCell>{invitation.organizationTitle}</TableCell>
                <TableCell>{invitation.role}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Link href={`/invitations/${invitation.id}`}>
                      <Button size="default" variant="default">
                        View Invitation
                      </Button>
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </ShadcnTable>
      </div>
    </div>
  );
};

export const PendingInvitationsList = async () => {
  const pendingInvitations = await getPendingInvitationsOfUser();

  const pendingInvitationsList = pendingInvitations
    .map((invitation) => {
      const inviter = Array.isArray(invitation.inviter)
        ? invitation.inviter[0]
        : invitation.inviter;
      const organization = Array.isArray(invitation.organization)
        ? invitation.organization[0]
        : invitation.organization;
      if (!organization || !inviter) {
        throw new Error('Organization or Inviter not found');
      }

      return {
        id: invitation.id,
        inviterUserFullName: inviter.full_name ?? invitation.invitee_user_email,
        organizationTitle: organization.title,
        status: invitation.status,
        role: invitation.invitee_organization_role,
        organizationId: organization.id,
      };
    })
    .filter(Boolean);
  return (
    <>
      {pendingInvitationsList.length > 0 ? (
        <PendingInvitationsTable
          pendingInvitationsList={pendingInvitationsList}
        />
      ) : (
        <T.Subtle>You have no pending invitations.</T.Subtle>
      )}
    </>
  );
};
