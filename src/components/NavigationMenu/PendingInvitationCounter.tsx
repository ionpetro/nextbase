'use server';

import { Badge } from '@/components/ui/badge';
import { getPendingInvitationCountOfUser } from '@/data/user/invitation';
import Link from 'next/link';
import { LucideIcon } from '../LucideIcon';

export async function PendingInvitationCounter() {
  const count = await getPendingInvitationCountOfUser();
  if (count) {
    return (
      <Link href="/invitations">
        <Badge

          size="lg"
          className="px-3 py-2 rounded-md w-max h-fit"
          variant="secondary"
        >
          <LucideIcon name="MessageSquare" className="w-6 h-6" />
          {count} pending invites
        </Badge>
      </Link>
    );
  }
  return null;
}
