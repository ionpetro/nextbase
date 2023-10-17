import { getOrganizationById } from '@/utils/supabase-queries';
import { ReactNode } from 'react';
import { z } from 'zod';
import { AppSupabaseClient } from '@/types';
import { getUserOrganizationRole } from '@/utils/supabase/organizations';
import { getNormalizedSubscription } from '@/utils/supabase/subscriptions';
import { createSupabaseUserServerComponentClient } from '@/supabase-clients/user/createSupabaseUserServerComponentClient';
import { cookies } from 'next/headers';
import { PageHeading } from '@/components/presentational/tailwind/PageHeading';
import { SubscriptionDetails } from './SubscriptionDetails';
import { CURRENT_ORGANIZATION_ID_COOKIE_KEY } from '@/constants';

const paramsSchema = z.object({
  organizationId: z.string(),
});

async function fetchData(supabase: AppSupabaseClient, organizationId: string) {
  const { data: sessionResponse, error: userError } =
    await supabase.auth.getSession();
  if (!sessionResponse || !sessionResponse.session?.user) {
    throw new Error('User not found');
  }
  if (userError) {
    throw userError;
  }

  const [organizationByIdData, organizationRole, normalizedSubscription] =
    await Promise.all([
      getOrganizationById(supabase, organizationId),
      getUserOrganizationRole(
        supabase,
        sessionResponse.session.user.id,
        organizationId,
      ),
      getNormalizedSubscription(supabase, organizationId),
    ]);

  return {
    organizationByIdData,
    organizationRole,
    normalizedSubscription,
  };
}

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: unknown;
}) {
  const supabaseClient = createSupabaseUserServerComponentClient();
  const cookieOrganizationId = cookies().get(CURRENT_ORGANIZATION_ID_COOKIE_KEY)
    ?.value;
  const { organizationId } = paramsSchema.parse(params);
  const { organizationByIdData, organizationRole, normalizedSubscription } =
    await fetchData(supabaseClient, organizationId);
  return (
    <>
      <div className="space-y-8">
        <div className="space-y-0">
          <PageHeading
            title={organizationByIdData.title}
            titleHref={`/organization/${organizationId}`}
            actions={
              <div className="flex items-start  ">
                <div className=" flex items-center space-x-2 border-muted-foreground/20 ">
                  <SubscriptionDetails organizationId={organizationId} />
                </div>
              </div>
            }
          />
        </div>

        <div>{children}</div>
      </div>
    </>
  );
}
