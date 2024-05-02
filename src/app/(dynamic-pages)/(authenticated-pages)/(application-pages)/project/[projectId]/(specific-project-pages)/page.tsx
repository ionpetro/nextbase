import { LucideIcon } from '@/components/LucideIcon';
import { T } from '@/components/ui/Typography';
import { Suspense } from 'react';
import { z } from 'zod';
import { CommentInput } from './CommentInput';
import { ProjectComments } from './ProjectComments';

const paramsSchema = z.object({
  projectId: z.string(),
});

export default function ProjectPage({ params }: { params: unknown }) {
  const { projectId } = paramsSchema.parse(params);
  return (
    <div className="space-y-6">
      <div className="mb-10">
        <div
          className="flex justify-center items-center border-gray-400/50 dark:border-gray-600/50 bg-gray-200/20 dark:dotted-bg-dark dark:bg-slate-950/40 p-10 border rounded-xl h-[400px] dotted-bg"
          style={{}}
        >
          <div className="flex items-center space-x-3 border-gray-300 dark:border-gray-600/50 bg-white dark:bg-slate-900 shadow-sm px-4 py-2 pl-2 border rounded-xl">
            <div className="bg-gray-200/50 dark:bg-slate-700/40 p-3 rounded-lg w-fit">
              <LucideIcon name="Layers" className="w-6 h-6" />
            </div>
            <div className="flex flex-col justify-center space-y-1.5">
              <T.Small className="m-0 leading-none">
                Build something cool here!
              </T.Small>
              <T.Small className="m-0 text-muted-foreground leading-none">
                Your business logic goes here.
              </T.Small>
            </div>
          </div>
        </div>
        <div className="space-y-4 max-w-md">
          <T.H4>Comments</T.H4>
          <div className="space-y-2 mb-10">
            <div className="space-y-4 mt-4 mb-10">
              <CommentInput projectId={projectId} />
              <Suspense>
                <ProjectComments projectId={projectId} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
