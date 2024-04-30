import { LucideIcon } from '@/components/LucideIcon';
import { T } from '@/components/ui/Typography';
import { cn } from '@/utils/cn';
import Link from 'next/link';

export default function InvitationsNavbar() {
  return (
    <div className={cn('hidden lg:block', 'relative ')}>
      <T.P className="my-0">
        <Link href="/invitations">
          <span className="space-x-2 flex items-center">
            <LucideIcon name="ArrowLeft" />
            <span>Back to Invitations</span>
          </span>
        </Link>
      </T.P>
    </div>
  );
}
