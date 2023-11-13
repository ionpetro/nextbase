import { Button } from '@/components/ui/Button';
import { T } from '@/components/ui/Typography';
import { Enum } from '@/types';
import { toSiteURL } from '@/utils/helpers';
import {
  ShadcnTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table/ShadcnTable';
import CheckIcon from 'lucide-react/dist/esm/icons/check';
import RejectIcon from 'lucide-react/dist/esm/icons/x';
import { getPendingInvitationsOfUser } from '@/data/user/invitation';

const PendingInvitationsTable = ({
  pendingInvitationsList,
}: {
  pendingInvitationsList: Array<{
    id: string;
    inviterUserFullName: string;
    organizationTitle: string;
    status: string;
    acceptURL: string;
    declineURL: string;
    role: Enum<'organization_member_role'>;
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
              <TableRow key={invitation.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="text-left">
                  {invitation.inviterUserFullName}
                </TableCell>
                <TableCell>{invitation.organizationTitle}</TableCell>
                <TableCell>{invitation.role}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      size="default"
                      variant="default"
                      onClick={() =>
                        (window.location.href = invitation.acceptURL)
                      }
                    >
                      <CheckIcon className="mr-2" /> Accept
                    </Button>
                    <Button
                      size="default"
                      variant="outline"
                      onClick={() =>
                        (window.location.href = invitation.declineURL)
                      }
                    >
                      <RejectIcon className="mr-2" /> Decline
                    </Button>
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
  const pendingInvitatinos = await getPendingInvitationsOfUser();

  const pendingInvitationsList = pendingInvitatinos
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
        acceptURL: toSiteURL(`/api/invitations/accept/${invitation.id}`),
        declineURL: toSiteURL(`/api/invitations/decline/${invitation.id}`),
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
