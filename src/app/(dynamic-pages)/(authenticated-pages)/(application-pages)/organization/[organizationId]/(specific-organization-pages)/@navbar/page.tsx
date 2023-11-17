// https://github.com/vercel/next.js/issues/58272
import { Anchor } from '@/components/Anchor';
import { Badge } from '@/components/ui/Badge';
import { T } from '@/components/ui/Typography';
import { getOrganizationTitle } from '@/data/user/organizations';
import { Suspense } from 'react';
import { z } from 'zod';

const paramsSchema = z.object({
  organizationId: z.string(),
});

async function Title({ organizationId }: { organizationId: string }) {
  const title = await getOrganizationTitle(organizationId);

  return (
    <div className="flex items-center space-x-1">
      <T.P>{title}</T.P>
      <Badge variant="information" size="lg">
        Organization
      </Badge>
    </div>
  );
}

export default async function OrganizationNavbar({
  params,
}: {
  params: unknown;
}) {
  const { organizationId } = paramsSchema.parse(params);
  return (
    <div className="flex items-center">
      <Anchor href={`/organization/${organizationId}`}>
        <span className="space-x-2 flex items-center">
          <Suspense fallback={<span>Loading...</span>}>
            <Title organizationId={organizationId} />
          </Suspense>
        </span>
      </Anchor>
    </div>
  );
}
