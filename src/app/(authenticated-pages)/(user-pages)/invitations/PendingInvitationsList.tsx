'use client';
import { Button } from '@/components/ui/Button';
import { T } from '@/components/ui/Typography';
import { Enum, UnwrapPromise } from '@/types';
import { toSiteURL } from '@/utils/helpers';
import { useGetUserPendingInvitations } from '@/utils/react-queries/invitations';
import { getUserPendingInvitationsByEmail } from '@/utils/supabase/invitations';
import {
  ShadcnTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table/ShadcnTable';

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
      <T.Subtle>
        You have {pendingInvitationsList.length} pending invitations
      </T.Subtle>
      <div className="w-full rounded-lg border border-neutral-200 shadow-sm overflow-hidden">
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
                  <div className="text-sm text-gray-900">
                    {invitation.inviterUserFullName}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm text-gray-900">
                    {invitation.organizationTitle}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm text-gray-900 uppercase">
                    {invitation.role}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      size="xs"
                      variant="outline"
                      className=" border-green-300 bg-green-100  rounded-md text-green-600 hover:text-green-700 hover:bg-green-100 px-2"
                      onClick={() =>
                        (window.location.href = invitation.acceptURL)
                      }
                    >
                      Accept
                    </Button>
                    <Button
                      size="xs"
                      variant="outline"
                      className=" border-red-300 bg-red-100 rounded-md text-red-500 hover:text-red-600 hover:bg-red-100"
                      onClick={() =>
                        (window.location.href = invitation.declineURL)
                      }
                    >
                      Decline
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

export const PendingInvitationsList = ({
  initialPendingInvitationsList,
}: {
  initialPendingInvitationsList: UnwrapPromise<
    ReturnType<typeof getUserPendingInvitationsByEmail>
  >;
}) => {
  const { data, isLoading } = useGetUserPendingInvitations(
    initialPendingInvitationsList
  );
  if (isLoading || !data) return <div>Loading...</div>;
  if (data.length === 0) return null;

  const filteredData = data.filter((invitation) => {
    return Boolean(invitation.organization) && Boolean(invitation.inviter);
  });

  const pendingInvitationsList = filteredData
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
    <div className="space-y-2">
      <T.H2>Pending Invitations</T.H2>
      <PendingInvitationsTable
        pendingInvitationsList={pendingInvitationsList}
      />
    </div>
  );
};
