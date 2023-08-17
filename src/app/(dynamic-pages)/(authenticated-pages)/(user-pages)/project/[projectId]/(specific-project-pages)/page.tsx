import {
  approveProjectAction,
  rejectProjectAction,
  submitProjectForApprovalAction,
  markProjectAsCompletedAction,
  addProjectCommentAction,
  getProjectCommentsAction,
} from './action';
import { ApprovalControls } from './ApprovalControls';
import { ProjectComments } from './ProjectComments';
import { ProjectHeader } from './ProjectDetails';

export default function ProjectPage() {
  return (
    <div className="space-y-6">
      <ProjectHeader />
      <ApprovalControls
        approveProjectAction={approveProjectAction}
        rejectProjectAction={rejectProjectAction}
        submitProjectForApprovalAction={submitProjectForApprovalAction}
        markProjectAsCompletedAction={markProjectAsCompletedAction}
      />
      <div className="grid grid-cols-[1fr,auto] gap-6">
        <div className="border-2 border-blue-500 rounded-md border-dashed h-48 flex justify-center items-center">
          <p className="text-sm select-none text-gray-500">
            Build something cool here!
          </p>
        </div>
        <ProjectComments
          addProjectCommentAction={addProjectCommentAction}
          getProjectCommentsAction={getProjectCommentsAction}
        />
      </div>
    </div>
  );
}
