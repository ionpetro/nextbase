'use server';

import { getPendingInvitationCountOfUser } from '@/data/user/invitation';
import { Badge } from '../Badge';
import { Anchor } from '@/components/Anchor';

export async function PendingInvitationCounter() {
  const count = await getPendingInvitationCountOfUser();
  if (count) {
    return (
      <Anchor href="/invitations">
        <Badge
          size="lg"
          className="px-4 w-max rounded-full"
          variant="information"
        >
          {count} pending invites
        </Badge>
      </Anchor>
    );
  }
  return null;
}
