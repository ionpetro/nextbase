'use client';
import { ConfirmApproveProjectDialog } from '@/components/presentational/tailwind/ApprovalWorkflow/ConfirmApproveProjectDialog';
import { ConfirmMarkProjectAsCompleteDialog } from '@/components/presentational/tailwind/ApprovalWorkflow/ConfirmMarkProjectAsCompleteDialog';
import { ConfirmRejectProjectDialog } from '@/components/presentational/tailwind/ApprovalWorkflow/ConfirmRejectProjectDialog';
import { SubmitProjectForApprovalDialog } from '@/components/presentational/tailwind/ApprovalWorkflow/SubmitProjectForApprovalDialog';
import { T } from '@/components/ui/Typography';
import { useOrganizationContext } from '@/contexts/OrganizationContext';
import { useProjectContext } from '@/contexts/ProjectContext';
import { useTeamContext } from '@/contexts/TeamContext';
import { useApproveProject, useCompleteProject, useRejectProject, useSubmitProjectForApproval } from '@/utils/react-queries/projects';


export function ApprovalControls() {
  const {
    projectByIdData,
    projectId
  } = useProjectContext();
  const {
    teamRole
  } = useTeamContext();

  const {
    organizationRole
  } = useOrganizationContext();


  const { mutate: submitProjectForApproval } = useSubmitProjectForApproval();
  const { mutate: markProjectAsCompleted } = useCompleteProject();
  const { mutate: approveProject } = useApproveProject();
  const { mutate: rejectProject } = useRejectProject();

  const canManageTeam = teamRole === 'admin' || organizationRole === 'admin' || organizationRole === 'owner';
  const canOnlyEdit = teamRole === 'member'

  return (
    <>
      {projectByIdData.project_status === 'draft' ? (
        canManageTeam ? (
          <ConfirmMarkProjectAsCompleteDialog
            onConfirm={() => {
              markProjectAsCompleted(projectId);
            }}
          />
        ) : canOnlyEdit ? (
          <>
            <SubmitProjectForApprovalDialog
              onSubmit={() => {
                submitProjectForApproval(projectId);
              }}
            />
          </>
        ) : null
      ) : null}
      {!canManageTeam && projectByIdData.project_status === 'pending_approval' ? (
        <T.P className="text-green-600 italic text-xs">Awaiting approval</T.P>
      ) : null}
      {canManageTeam && projectByIdData.project_status === 'pending_approval' && (
        <>
          <ConfirmApproveProjectDialog
            onConfirm={() => {
              approveProject(projectId);
            }}
          />
          <ConfirmRejectProjectDialog
            onConfirm={() => {
              rejectProject(projectId);
            }}
          />
        </>
      )}
      {projectByIdData.project_status === 'approved' && canManageTeam ? (
        <ConfirmMarkProjectAsCompleteDialog
          onConfirm={() => {
            markProjectAsCompleted(projectId);
          }}
        />
      ) : null}
    </>
  );
}
