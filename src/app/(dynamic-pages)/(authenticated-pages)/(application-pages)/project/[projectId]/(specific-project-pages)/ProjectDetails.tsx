'use client';

import { PageHeading } from '@/components/presentational/tailwind/PageHeading';
import { T } from '@/components/ui/Typography';
import {
  approveProjectAction,
  rejectProjectAction,
  submitProjectForApprovalAction,
  markProjectAsCompletedAction,
  addProjectCommentAction,
  getProjectCommentsAction,
} from './action';
import { ApprovalControls } from './ApprovalControls';
import { useProjectContext } from '@/contexts/ProjectContext';

export function ProjectHeader() {
  const { projectByIdData } = useProjectContext();
  return (
    <PageHeading
      title={projectByIdData.name}
      actions={
        <ApprovalControls
          approveProjectAction={approveProjectAction}
          rejectProjectAction={rejectProjectAction}
          submitProjectForApprovalAction={submitProjectForApprovalAction}
          markProjectAsCompletedAction={markProjectAsCompletedAction}
        />
      }
    />
  );
}
