import { LucideIcon } from '@/components/LucideIcon';
import { T } from '@/components/ui/Typography';
import { cn } from '@/utils/cn';
import { organizationParamSchema } from '@/utils/zod-schemas/params';
import Link from 'next/link';

export default function OrganizationSettingsNavbar({
  params,
}: {
  params: unknown;
}) {
  const { organizationId } = organizationParamSchema.parse(params);

  return (
    <div className={cn('hidden lg:block', 'relative ')}>
      <T.P className="my-0">
        <Link href={`/organization/${organizationId}`}>
          <span className="space-x-2 flex items-center">
            <LucideIcon name="ArrowLeft" />
            <span>Back to Organization catch all</span>
          </span>
        </Link>
      </T.P>
    </div>
  );
}
