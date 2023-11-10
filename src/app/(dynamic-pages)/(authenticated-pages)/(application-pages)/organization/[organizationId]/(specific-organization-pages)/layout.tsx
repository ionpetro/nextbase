import { ReactNode, Suspense } from 'react';
import { z } from 'zod';
import { PageHeading } from '@/components/presentational/tailwind/PageHeading';
import { ApplicationLayoutShell } from '@/components/ApplicationLayoutShell/ApplicationLayoutShell';
import { OrganizationSidebar } from '../../../_sidebar/OrganizationSidebar';
import { getOrganizationTitle } from '@/data/user/organizations';

const paramsSchema = z.object({
  organizationId: z.string(),
});

async function OrganizationPageHeading({
  organizationId,
}: {
  organizationId: string;
}) {
  const organizationTitle = await getOrganizationTitle(organizationId);
  return (
    <PageHeading
      title={organizationTitle}
      titleHref={`/organization/${organizationId}`}
    />
  );
}

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: unknown;
}) {
  const { organizationId } = paramsSchema.parse(params);

  return (
    <ApplicationLayoutShell
      sidebar={<OrganizationSidebar currentOrganizationId={organizationId} />}
    >
      <div className="space-y-8">
        <div className="space-y-0">
          <Suspense
            fallback={
              <PageHeading
                title={'Loading...'}
                isLoading
                titleHref={`/organization/${organizationId}`}
              />
            }
          >
            <OrganizationPageHeading organizationId={organizationId} />
          </Suspense>
        </div>
        <div>{children}</div>
      </div>
    </ApplicationLayoutShell>
  );
}
