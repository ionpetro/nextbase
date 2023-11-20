'use client';
import { useState } from 'react';
import { Enum } from '@/types';
import { useToastMutation } from '@/hooks/useToastMutation';
import { userUpdateInternalFeedbackType } from '@/data/user/internalFeedback';
import { UpdateTypeDialog } from '@/components/Feedback/UpdateTypeDialog';
type Props = {
  currentType: Enum<'internal_feedback_thread_type'>;
  feedbackId: string;
};

export const UserUpdateFeedbackType = ({ currentType, feedbackId }: Props) => {
  const [open, setOpen] = useState(false);
  const [type, setType] =
    useState<Enum<'internal_feedback_thread_type'>>(currentType);
  const { mutate: updateType, isLoading: isUpdatingType } = useToastMutation(
    userUpdateInternalFeedbackType,
    {
      loadingMessage: 'Updating feedback type',
      successMessage: 'Successfully updated feedback type',
      errorMessage: 'Failed to update feedback type',
    },
  );

  return (
    <UpdateTypeDialog
      currentType={currentType}
      feedbackId={feedbackId}
      isUpdatingType={isUpdatingType}
      open={open}
      setOpen={setOpen}
      updateType={updateType}
    />
  );
};
