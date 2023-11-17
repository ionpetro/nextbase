// src/app/(dynamic-pages)/(authenticated-pages)/app_admin/feedback/[feedbackId]/AdminUpdateFeedbackPriority.tsx
'use client';
import { useState } from 'react';
import { Enum } from '@/types';
import { useToastMutation } from '@/hooks/useToastMutation';
import { UpdatePriorityDialog } from '@/components/Feedback/UpdatePriorityDialog';
import { adminUpdateInternalFeedbackPriority } from '@/data/admin/internal-feedback'; // Assuming you have this function

type Props = {
  currentPriority: Enum<'internal_feedback_thread_priority'>;
  feedbackId: string;
};

export const AdminUpdateFeedbackPriority = ({
  currentPriority,
  feedbackId,
}: Props) => {
  const [open, setOpen] = useState(false);

  const { mutate: updatePriority, isLoading: isUpdatingPriority } =
    useToastMutation(adminUpdateInternalFeedbackPriority, {
      loadingMessage: 'Updating feedback priority',
      successMessage: 'Successfully updated feedback priority',
      errorMessage: 'Failed to update feedback priority',
    });

  return (
    <UpdatePriorityDialog
      currentPriority={currentPriority}
      feedbackId={feedbackId}
      isUpdatingPriority={isUpdatingPriority}
      open={open}
      setOpen={setOpen}
      updatePriority={updatePriority}
    />
  );
};
