import { Anchor } from '@/components/Anchor';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/HoverCard';
import { T } from '@/components/ui/Typography';
import { getNormalizedOrganizationSubscription } from '@/data/user/organizations';
import { createSupabaseUserServerComponentClient } from '@/supabase-clients/user/createSupabaseUserServerComponentClient';
import { formatNormalizedSubscription } from '@/utils/formatNormalizedSubscription';

export async function SubscriptionCardSmall({
  organizationId,
}: {
  organizationId: string;
}) {
  const supabaseClient = createSupabaseUserServerComponentClient();
  const normalizedSubscription =
    await getNormalizedOrganizationSubscription(organizationId);

  const { title, sidenote, description } = formatNormalizedSubscription(
    normalizedSubscription,
  );

  if (title) {
    return (
      <HoverCard>
        <HoverCardTrigger asChild>
          <Anchor
            href={`/organization/${organizationId}/settings/billing`}
            className="mr-2"
          >
            <div>
              <T.P className="font-semibold -mb-2 ">{title} Pro</T.P>
              {sidenote ? (
                <T.Small className="  font-semibold underline text-muted-foreground underline-offset-4">
                  {sidenote}
                </T.Small>
              ) : null}
            </div>
          </Anchor>
        </HoverCardTrigger>
        <HoverCardContent className="w-60">{description}</HoverCardContent>
      </HoverCard>
    );
  } else {
    return (
      <HoverCard>
        <HoverCardTrigger asChild>
          <Anchor
            className="flex mr-2 mt-1 p-2"
            href={`/organization/${organizationId}/settings/billing`}
          >
            <T.Small className="font-semibold underline underline-offset-4">
              {sidenote}
            </T.Small>
          </Anchor>
        </HoverCardTrigger>
        <HoverCardContent className="w-60">{description}</HoverCardContent>
      </HoverCard>
    );
  }
}
