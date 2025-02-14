// https://github.com/vercel/next.js/issues/58272
import { T } from '@/components/ui/Typography';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { getOrganizationIdBySlug, getOrganizationTitle } from '@/data/user/organizations';
import { organizationSlugParamSchema } from '@/utils/zod-schemas/params';
import { UsersRound } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

export async function generateMetadata({ params }: { params: unknown }) {
  try {
    const { organizationSlug } = organizationSlugParamSchema.parse(params);
    const organizationId = await getOrganizationIdBySlug(organizationSlug)

    const organizationTitle = await getOrganizationTitle(organizationId);

    return {
      title: `${organizationTitle} | Organization | Nextbase Ultimate`,
      description: 'Organization title',
    };
  } catch (error) {
    return {
      title: 'Not found',
    };
  }
}

async function Title({ organizationId }: { organizationId: string }) {
  const title = await getOrganizationTitle(organizationId);

  return (
    <div className="flex items-center gap-2">
      <UsersRound className="w-4 h-4" />
      <T.P>{title}</T.P>
      <Badge variant="outline" className="lg:inline-flex hidden">
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
  const { organizationSlug } = organizationSlugParamSchema.parse(params);
  const organizationId = await getOrganizationIdBySlug(organizationSlug)
  return (
    <div className="flex items-center">
      <Link href={`/${organizationSlug}`}>
        <span className="flex items-center space-x-2">
          <Suspense fallback={<Skeleton className="w-16 h-6" />}>
            <Title organizationId={organizationId} />
          </Suspense>
        </span>
      </Link>
    </div>
  );
}
