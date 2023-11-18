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
import ArrowUpRightIcon from 'lucide-react/dist/esm/icons/arrow-up-right';

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
            className="group cursor-pointer flex mr-2 gap-2 items-center mt-1 p-2 py-4 border border-neutral-300  bg-neutral-50 dark:bg-gray-800/10 dark:border-gray-700 hover:bg-neutral-100 dark:hover:bg-gray-700/10 dark:bg-white/15  w-full rounded-lg"
            href={`/organization/${organizationId}/settings/billing`}
          >
            <ArrowUpRightIcon className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
            <T.Small className="text-neutral-600 font-normal dark:text-gray-400 group-hover:underline underline-offset-4">
              {sidenote}
            </T.Small>
          </Anchor>
        </HoverCardTrigger>
        <HoverCardContent className="w-60">{description}</HoverCardContent>
      </HoverCard>
    );
  }
}
