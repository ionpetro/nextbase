import { T } from '@/components/ui/Typography';
import {
  approveProjectAction,
  rejectProjectAction,
  submitProjectForApprovalAction,
  markProjectAsCompletedAction,
  addProjectCommentAction,
  getProjectCommentsAction,
} from './action';
import { ProjectComments } from './ProjectComments';
import LayersIcon from 'lucide-react/dist/esm/icons/layers';

export default function ProjectPage() {
  return (
    <div className="space-y-6">
      <div className="mb-10">
        <div
          className="border dotted-bg dark:dotted-bg-dark p-10 border-gray-400/50 dark:border-gray-600/50 rounded-xl bg-gray-100/50 dark:bg-gray-800/20 h-[400px] flex justify-center items-center"
          style={{}}
        >
          <div className="bg-white dark:bg-black items-center px-4 pl-2 flex space-x-3 py-2 shadow-sm border border-gray-400 dark:border-gray-600/50 rounded-xl">
            <div className="p-3 w-fit bg-gray-200/50 dark:bg-gray-700/40 rounded-lg">
              <LayersIcon className=" w-6 h-6" />
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
        <ProjectComments
          addProjectCommentAction={addProjectCommentAction}
          getProjectCommentsAction={getProjectCommentsAction}
        />
      </div>
    </div>
  );
}
