import { T } from '@/components/ui/Typography';
import { getProjectIdBySlug } from '@/data/user/projects';
import { projectSlugParamSchema } from '@/utils/zod-schemas/params';
import { Layers } from 'lucide-react';
import { Suspense } from 'react';
import { CommentInput } from './CommentInput';
import { ProjectComments } from './ProjectComments';


export default async function ProjectPage({ params }: { params: unknown }) {
  const { projectSlug } = projectSlugParamSchema.parse(params);
  const project = await getProjectIdBySlug(projectSlug);
  return (
    <div className="space-y-6">
      <div className="mb-10">
        <div
          className="border dotted-bg dark:dotted-bg-dark p-10 border-gray-400/50 dark:border-gray-600/50 rounded-xl bg-gray-200/20 dark:bg-slate-950/40 h-[400px] flex justify-center items-center"
          style={{}}
        >
          <div className="bg-white dark:bg-slate-900 items-center px-4 pl-2 flex space-x-3 py-2 shadow-sm border border-gray-300 dark:border-gray-600/50 rounded-xl">
            <div className="p-3 w-fit bg-gray-200/50 dark:bg-slate-700/40 rounded-lg">
              <Layers className=" w-6 h-6" />
            </div>
            <div className="flex flex-col justify-center space-y-1.5">
              <T.Small className=" leading-none m-0">
                Build something cool here!
              </T.Small>
              <T.Small className="text-muted-foreground leading-none m-0">
                Your business logic goes here.
              </T.Small>
            </div>
          </div>
        </div>
        <div className="space-y-4 max-w-md">
          <T.H4>Comments</T.H4>
          <div className="space-y-2 mb-10">
            <div className="space-y-4 mt-4 mb-10">
              <CommentInput projectId={project.id} />
              <Suspense>
                <ProjectComments projectId={project.id} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
