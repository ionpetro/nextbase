"use client";
import { T } from "@/components/ui/Typography";
import {
  approveProjectAction,
  markProjectAsCompletedAction,
  rejectProjectAction,
  submitProjectForApprovalAction,
} from "@/data/user/projects";
import { useSAToastMutation } from "@/hooks/useSAToastMutation";
import type { Enum } from "@/types";
import { ConfirmApproveProjectDialog } from "./ConfirmApproveProjectDialog";
import { ConfirmMarkProjectAsCompleteDialog } from "./ConfirmMarkProjectAsCompleteDialog";
import { ConfirmRejectProjectDialog } from "./ConfirmRejectProjectDialog";
import { SubmitProjectForApprovalDialog } from "./SubmitProjectForApprovalDialog";

export function ApprovalControlActions({
  projectId,
  canManage,
  canOnlyEdit,
  projectStatus,
}: {
  projectId: string;
  canManage: boolean;
  canOnlyEdit: boolean;
  projectStatus: Enum<"project_status">;
}) {
  const { mutate: submitProjectForApproval } = useSAToastMutation(
    async () => {
      return await submitProjectForApprovalAction(projectId);
    },
    {
      loadingMessage: "Submitting project for approval...",
      errorMessage(error) {
        try {
          if (error instanceof Error) {
            return String(error.message);
          }
          return `Failed to submit project for approval ${String(error)}`;
        } catch (_err) {
          console.warn(_err);
          return 'Failed to submit project for approval';
        }
      },
      successMessage: "Project submitted for approval!",
    },
  );
  const { mutate: markProjectAsCompleted } = useSAToastMutation(
    async () => {
      return await markProjectAsCompletedAction(projectId);
    },
    {
      loadingMessage: "Marking project as complete...",
      errorMessage(error) {
        try {
          if (error instanceof Error) {
            return String(error.message);
          }
          return `Failed to mark project as complete ${String(error)}`;
        } catch (_err) {
          console.warn(_err);
          return 'Failed to mark project as complete';
        }
      },
      successMessage: "Project marked as complete!",
    },
  );
  const { mutate: approveProject } = useSAToastMutation(
    async () => {
      return await approveProjectAction(projectId);
    },
    {
      loadingMessage: "Approving project...",
      errorMessage(error) {
        try {
          if (error instanceof Error) {
            return String(error.message);
          }
          return `Failed to approve project ${String(error)}`;
        } catch (_err) {
          console.warn(_err);
          return 'Failed to approve project';
        }
      },
      successMessage: "Project approved!",
    },
  );
  const { mutate: rejectProject } = useSAToastMutation(
    async () => {
      return await rejectProjectAction(projectId);
    },
    {
      loadingMessage: "Rejecting project...",
      errorMessage(error) {
        try {
          if (error instanceof Error) {
            return String(error.message);
          }
          return `Failed to reject project ${String(error)}`;
        } catch (_err) {
          console.warn(_err);
          return 'Failed to reject project';
        }
      },
      successMessage: "Project rejected!",
    },
  );

  return (
    <>
      {projectStatus === "draft" ? (
        canManage ? (
          <ConfirmMarkProjectAsCompleteDialog
            onConfirm={markProjectAsCompleted}
          />
        ) : canOnlyEdit ? (
          <>
            <SubmitProjectForApprovalDialog
              onSubmit={submitProjectForApproval}
            />
          </>
        ) : null
      ) : null}
      {!canManage && projectStatus === "pending_approval" ? (
        <T.P className="text-green-600 italic text-xs">Awaiting approval</T.P>
      ) : null}
      {canManage && projectStatus === "pending_approval" && (
        <>
          <ConfirmApproveProjectDialog onConfirm={approveProject} />
          <ConfirmRejectProjectDialog onConfirm={rejectProject} />
        </>
      )}
      {projectStatus === "approved" && canManage ? (
        <ConfirmMarkProjectAsCompleteDialog
          onConfirm={markProjectAsCompleted}
        />
      ) : null}
    </>
  );
}
