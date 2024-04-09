// src/app/(dynamic-pages)/(authenticated-pages)/app_admin/feedback/[feedbackId]/AdminUpdateFeedbackStatus.tsx
'use client';
import { useState } from 'react';
import { Enum } from '@/types';
import { useToastMutation } from '@/hooks/useToastMutation';
import { UpdateStatusDialog } from '@/components/Feedback/UpdateStatusDialog';
import { adminUpdateInternalFeedbackStatus } from '@/data/admin/internal-feedback';

type Props = {
  currentStatus: Enum<'internal_feedback_thread_status'>;
  feedbackId: string;
};

export const AdminUpdateFeedbackStatus = ({
  currentStatus,
  feedbackId,
}: Props) => {
  const [open, setOpen] = useState(false);

  const { mutate: updateStatus, isLoading: isUpdatingStatus } =
    useToastMutation(adminUpdateInternalFeedbackStatus, {
      loadingMessage: 'Updating feedback status',
      successMessage: 'Successfully updated feedback status',
      errorMessage: 'Failed to update feedback status',
    });

  return (
    <UpdateStatusDialog
      currentStatus={currentStatus}
      feedbackId={feedbackId}
      isUpdatingStatus={isUpdatingStatus}
      open={open}
      setOpen={setOpen}
      updateStatus={updateStatus}
    />
  );
};
