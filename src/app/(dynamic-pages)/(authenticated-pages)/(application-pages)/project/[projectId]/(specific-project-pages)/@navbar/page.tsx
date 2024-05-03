// https://github.com/vercel/next.js/issues/58272
import { T } from '@/components/ui/Typography';
import { Skeleton } from '@/components/ui/skeleton';
import { getProjectById } from '@/data/user/projects';
import ProjectIcon from 'lucide-react/dist/esm/icons/layers';
import Link from 'next/link';

import { Suspense } from 'react';
import { z } from 'zod';

const paramsSchema = z.object({
  projectId: z.string(),
});

async function Title({ projectId }: { projectId: string }) {
  const project = await getProjectById(projectId);
  return (
    <div className="flex items-center gap-2">
      <ProjectIcon className="w-4 h-4" />
      <T.P>{project.name}</T.P>
      <div className="flex items-center gap-2 border-gray-600 dark:border-slate-300 px-2 p-0.5 border rounded-full font-normal text-gray-600 text-xs dark:text-slate-300 uppercase">
        Project
      </div>
    </div>
  );
}

export default async function ProjectNavbar({ params }: { params: unknown }) {
  const { projectId } = paramsSchema.parse(params);
  return (
    <div className="flex items-center">
      <Link href={`/project/${projectId}`}>
        <span className="flex items-center space-x-2">
          <Suspense fallback={<Skeleton className="w-16 h-6" />}>
            <Title projectId={projectId} />
          </Suspense>
        </span>
      </Link>
    </div>
  );
}
