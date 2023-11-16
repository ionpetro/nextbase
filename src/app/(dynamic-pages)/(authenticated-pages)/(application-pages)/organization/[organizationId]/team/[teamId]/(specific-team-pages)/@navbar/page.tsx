// https://github.com/vercel/next.js/issues/58272
import { Anchor } from '@/components/Anchor';
import { T } from '@/components/ui/Typography';
import { getTeamNameById } from '@/data/user/teams';
import { Suspense } from 'react';
import { z } from 'zod';

const paramsSchema = z.object({
  organizationId: z.string(),
  teamId: z.coerce.number(),
});

async function Title({ teamId }: { teamId: number }) {
  const title = await getTeamNameById(teamId);
  return <T.P>{title}</T.P>;
}

export default async function OrganizationNavbar({
  params,
}: {
  params: unknown;
}) {
  const { organizationId, teamId } = paramsSchema.parse(params);
  return (
    <div className="flex items-center">
      <Anchor href={`/organization/${organizationId}/team/${teamId}`}>
        <span className="space-x-2 flex items-center">
          <Suspense fallback={<span>Loading...</span>}>
            <Title teamId={teamId} />
          </Suspense>
        </span>
      </Anchor>
    </div>
  );
}
