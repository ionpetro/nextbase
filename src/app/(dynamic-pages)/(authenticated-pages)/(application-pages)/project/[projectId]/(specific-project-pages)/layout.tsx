import { ApplicationLayoutShell } from '@/components/ApplicationLayoutShell';
import { InternalNavbar } from '@/components/NavigationMenu/InternalNavbar';
import { PageHeading } from '@/components/PageHeading';
import { getProjectTitleById } from '@/data/user/projects';
import { ReactNode, Suspense } from 'react';
import { z } from 'zod';
import { ApprovalControls } from './ApprovalControls';

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
  navbar,
  sidebar,
}: {
  children: ReactNode;
  params: unknown;
  navbar: ReactNode;
  sidebar: ReactNode;
}) {
  const { projectId } = paramsSchema.parse(params);

  return (
    <ApplicationLayoutShell sidebar={sidebar}>
      <div className="">
        <InternalNavbar>
          <div className="flex w-full justify-between items-center">
            <Suspense>{navbar}</Suspense>
          </div>
        </InternalNavbar>
        <div className="space-y-8 m-6">
          <div className="space-y-0">
            <Suspense>
              <ProjectPageHeading projectId={projectId} />
            </Suspense>
          </div>
          {children}
        </div>
      </div>
    </ApplicationLayoutShell>
  );
}
