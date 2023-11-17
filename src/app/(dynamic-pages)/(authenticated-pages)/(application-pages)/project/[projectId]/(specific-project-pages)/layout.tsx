import { ReactNode, Suspense } from 'react';
import { z } from 'zod';
import { ApplicationLayoutShell } from '@/components/ApplicationLayoutShell';
import { ProjectSidebar } from '../../../../_sidebar/ProjectSidebar';
import { PageHeading } from '@/components/presentational/tailwind/PageHeading';
import { ApprovalControls } from './ApprovalControls';
import { getProjectTitleById } from '@/data/user/projects';

const paramsSchema = z.object({
  projectId: z.string(),
});

async function ProjectPageHeading({ projectId }: { projectId: string }) {
  const projectTitle = await getProjectTitleById(projectId);
  return (
    <PageHeading
      title={projectTitle}
      actions={
        <Suspense>
          <ApprovalControls projectId={projectId} />
        </Suspense>
      }
    />
  );
}

export default async function ProjectLayout({
  params,
  children,
}: {
  children: ReactNode;
  params: unknown;
}) {
  const { projectId } = paramsSchema.parse(params);

  return (
    <ApplicationLayoutShell sidebar={<ProjectSidebar projectId={projectId} />}>
      <div className="space-y-8">
        <div className="space-y-0">
          <Suspense>
            <ProjectPageHeading projectId={projectId} />
          </Suspense>
        </div>
        {children}
      </div>
    </ApplicationLayoutShell>
  );
}
