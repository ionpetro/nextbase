import { z } from 'zod';
import { OrganizationSubscripionDetails } from './OrganizationSubscripionDetails';
import {
  getLoggedInUserOrganizationRole,
  getNormalizedOrganizationSubscription,
} from '@/data/user/organizations';
import { Suspense } from 'react';
import { T } from '@/components/ui/Typography';

const paramsSchema = z.object({
  organizationId: z.string(),
});

export default async function OrganizationSettingsPage({
  params,
}: {
  params: unknown;
}) {
  const { organizationId } = paramsSchema.parse(params);
  const normalizedSubscription =
    await getNormalizedOrganizationSubscription(organizationId);
  const organizationRole =
    await getLoggedInUserOrganizationRole(organizationId);
  return (
    <Suspense fallback={<T.Subtle>Loading...</T.Subtle>}>
      <OrganizationSubscripionDetails
        organizationId={organizationId}
        organizationRole={organizationRole}
        normalizedSubscription={normalizedSubscription}
      />
    </Suspense>
  );
}
