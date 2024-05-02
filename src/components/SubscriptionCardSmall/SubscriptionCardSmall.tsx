import { T } from '@/components/ui/Typography';
import { Button } from '@/components/ui/button';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { getNormalizedOrganizationSubscription } from '@/data/user/organizations';
import { formatNormalizedSubscription } from '@/utils/formatNormalizedSubscription';
import Link from 'next/link';
import { LucideIcon } from '../LucideIcon';
import { Card } from '../ui/card';

export async function SubscriptionCardSmall({
  organizationId,
}: {
  organizationId: string;
}) {
  const normalizedSubscription =
    await getNormalizedOrganizationSubscription(organizationId);

  const { title, sidenote, description } = formatNormalizedSubscription(
    normalizedSubscription,
  );

  if (title) {
    return (
      <HoverCard>
        <HoverCardTrigger asChild>
          <Link href={`/organization/${organizationId}/settings/billing`}>
            <div className="flex flex-col items-start gap-1 py-2 p-2 pb-3 border rounded-lg w-full cursor-pointer group">
              <T.P className="font-semibold">{title} Pro</T.P>
              {sidenote ? (
                <T.Small className="font-normal underline-offset-4 group-hover:underline">
                  {sidenote}
                </T.Small>
              ) : null}
            </div>
          </Link>
        </HoverCardTrigger>
        <HoverCardContent className="w-60">{description}</HoverCardContent>
      </HoverCard>
    );
  }
  return (
    <Card className='flex flex-col gap-4 bg-secondary p-6'>
      <p>{description}</p>
      <Link
        className="flex items-center gap-2 mt-1 mr-2 rounded-lg w-full cursor-pointer"
        href={`/organization/${organizationId}/settings/billing`}
      >
        <Button variant="default" className="w-full">
          <LucideIcon name="ArrowUpRight" className="mr-2 w-5 h-5" />
          {sidenote}
        </Button>
      </Link>
    </Card >
  );
}
