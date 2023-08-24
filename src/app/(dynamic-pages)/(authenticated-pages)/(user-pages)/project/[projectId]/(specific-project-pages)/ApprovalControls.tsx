'use client';
import { ConfirmApproveProjectDialog } from '@/components/presentational/tailwind/ApprovalWorkflow/ConfirmApproveProjectDialog';
import { ConfirmMarkProjectAsCompleteDialog } from '@/components/presentational/tailwind/ApprovalWorkflow/ConfirmMarkProjectAsCompleteDialog';
import { ConfirmRejectProjectDialog } from '@/components/presentational/tailwind/ApprovalWorkflow/ConfirmRejectProjectDialog';
import { SubmitProjectForApprovalDialog } from '@/components/presentational/tailwind/ApprovalWorkflow/SubmitProjectForApprovalDialog';
import { T } from '@/components/ui/Typography';
import { useProjectContext } from '@/contexts/ProjectContext';
import { Table } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { toast } from 'react-hot-toast';

export function ApprovalControls({
  approveProjectAction,
  rejectProjectAction,
  submitProjectForApprovalAction,
  markProjectAsCompletedAction,
}: {
  approveProjectAction: (projectId) => Promise<Table<'projects'>>;
  rejectProjectAction: (projectId) => Promise<Table<'projects'>>;
  submitProjectForApprovalAction: (projectId) => Promise<Table<'projects'>>;
  markProjectAsCompletedAction: (projectId) => Promise<Table<'projects'>>;
}) {
  const {
    projectByIdData,
    projectId,
    organizationRole,
    isTopLevelProject,
    maybeTeamRole,
  } = useProjectContext();
  console.log({ projectId });
  const router = useRouter();
  const submitApprovalToastRef = useRef<string | null>(null);
  const markProjectAsCompleteToastRef = useRef<string | null>(null);
  const approveProjectToastRef = useRef<string | null>(null);
  const rejectProjectToastRef = useRef<string | null>(null);

  const { mutate: submitProjectForApproval } = useMutation(
    async () => {
      return await submitProjectForApprovalAction(projectId);
    },
    {
      onMutate: async () => {
        submitApprovalToastRef.current = toast.loading(
          `Submitting project for approval...`
        );
      },
      onSuccess: () => {
        toast.success(`Project submitted for approval successfully!`, {
          id: submitApprovalToastRef.current ?? undefined,
        });
        router.refresh();
      },
      onError: (error) => {
        toast.error(String(error), {
          id: submitApprovalToastRef.current ?? undefined,
        });
      },
    }
  );
  const { mutate: markProjectAsCompleted } = useMutation(
    async () => {
      return await markProjectAsCompletedAction(projectId);
    },
    {
      onMutate: async () => {
        markProjectAsCompleteToastRef.current = toast.loading(
          `Marking project as completed...`
        );
      },
      onSuccess: () => {
        toast.success(`Project marked as completed successfully!`, {
          id: markProjectAsCompleteToastRef.current ?? undefined,
        });
        router.refresh();
      },
      onError: (error) => {
        toast.error(String(error), {
          id: markProjectAsCompleteToastRef.current ?? undefined,
        });
      },
    }
  );
  const { mutate: approveProject } = useMutation(
    async () => {
      return await approveProjectAction(projectId);
    },
    {
      onMutate: async () => {
        approveProjectToastRef.current = toast.loading(`Approving project...`);
      },
      onSuccess: () => {
        toast.success(`Project approved successfully!`, {
          id: approveProjectToastRef.current ?? undefined,
        });
        router.refresh();
      },
      onError: (error) => {
        toast.error(String(error), {
          id: approveProjectToastRef.current ?? undefined,
        });
      },
    }
  );
  const { mutate: rejectProject } = useMutation(
    async () => {
      return await rejectProjectAction(projectId);
    },
    {
      onMutate: async () => {
        rejectProjectToastRef.current = toast.loading(`Rejecting project...`);
      },
      onSuccess: () => {
        toast.success(`Project rejected successfully!`, {
          id: rejectProjectToastRef.current ?? undefined,
        });
        router.refresh();
      },
      onError: (error) => {
        toast.error(String(error), {
          id: rejectProjectToastRef.current ?? undefined,
        });
      },
    }
  );
  const isOrganizationManager =
    organizationRole === 'admin' || organizationRole === 'owner';

  const canManageTeam = isTopLevelProject
    ? isOrganizationManager
    : maybeTeamRole === 'admin' || isOrganizationManager;

  const canOnlyEdit = isTopLevelProject
    ? organizationRole === 'member'
    : maybeTeamRole === 'member';

  return (
    <>
      {projectByIdData.project_status === 'draft' ? (
        canManageTeam ? (
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
      {!canManageTeam &&
      projectByIdData.project_status === 'pending_approval' ? (
        <T.P className="text-green-600 italic text-xs">Awaiting approval</T.P>
      ) : null}
      {canManageTeam &&
        projectByIdData.project_status === 'pending_approval' && (
          <>
            <ConfirmApproveProjectDialog onConfirm={approveProject} />
            <ConfirmRejectProjectDialog onConfirm={rejectProject} />
          </>
        )}
      {projectByIdData.project_status === 'approved' && canManageTeam ? (
        <ConfirmMarkProjectAsCompleteDialog
          onConfirm={markProjectAsCompleted}
        />
      ) : null}
    </>
  );
}
