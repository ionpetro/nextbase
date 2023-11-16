import { Anchor } from '@/components/Anchor';
import { T } from '@/components/ui/Typography';
import { cn } from '@/utils/cn';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { z } from 'zod';

const paramsSchema = z.object({
  organizationId: z.string(),
  teamId: z.coerce.number(),
});

export default function OrganizationSettingsNavbar({
  params,
}: {
  params: unknown;
}) {
  const { organizationId, teamId } = paramsSchema.parse(params);
  return (
    <div className={cn('hidden lg:block', 'relative ')}>
      <T.P className="my-0">
        <Anchor href={`/organization/${organizationId}/team/${teamId}`}>
          <span className="space-x-2 flex items-center">
            <ArrowLeftIcon />
            <span>Back to Team</span>
          </span>
        </Anchor>
      </T.P>
    </div>
  );
}
