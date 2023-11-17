import { AppSupabaseClient } from '@/types';
import { z } from 'zod';
import { createSupabaseUserServerComponentClient } from '@/supabase-clients/user/createSupabaseUserServerComponentClient';
import { DraftTeamProjectsList } from '@/components/presentational/tailwind/Projects/DraftTeamProjectsList';
import { Suspense } from 'react';
import { PageHeading } from '@/components/presentational/tailwind/PageHeading';
import { OrganizationPageHeading } from './OrganizationPageHeading';
import { OrganizationGraphs } from './OrganizationGraphs';
import { CreateProjectDialog } from '@/components/presentational/tailwind/CreateProjectDialog';
import { ProjectsTable } from '@/components/presentational/tailwind/Projects/ProjectsTable';
import { T } from '@/components/ui/Typography';
import { getProjects } from '@/data/user/projects';
import { unstable_noStore } from 'next/cache';

const paramsSchema = z.object({
  organizationId: z.coerce.string(),
});

async function fetchDraftProjects(
  supabase: AppSupabaseClient,
  organizationId: string,
) {
  const data = await getProjects({ organizationId, teamId: null });
  return data;
}

export default async function OrganizationPage({
  params,
}: {
  params: unknown;
}) {
  const parsedParams = paramsSchema.parse(params);
  const { organizationId } = parsedParams;
  const projects = await fetchDraftProjects(
    createSupabaseUserServerComponentClient(),
    organizationId,
  );

  return (
    <div className="space-y-8">
      <div className="space-y-0 block lg:hidden">
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
      <div>
        <Suspense>
          <OrganizationGraphs />
        </Suspense>
      </div>
      <div className="space-y-4 max-w-4xl">
        <CreateProjectDialog organizationId={organizationId} teamId={null} />
        <div className="space-y-4">
          <div className="mt-10">
            <T.H3 className="leading-none">Projects</T.H3>
          </div>
          <Suspense>
            <ProjectsTable projects={projects} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
