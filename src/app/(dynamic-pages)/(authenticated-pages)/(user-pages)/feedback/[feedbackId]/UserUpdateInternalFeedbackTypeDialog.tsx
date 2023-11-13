'use client';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { Enum } from '@/types';
import { formatFieldValue } from '@/utils/feedback';
import { FeedbackThreadTypeSelect } from '@/components/presentational/tailwind/FeedbackThreadTypeSelect';
import FeedbackIcon from 'lucide-react/dist/esm/icons/message-square';
import { useToastMutation } from '@/hooks/useSonnerMutation';
import { userUpdateInternalFeedbackType } from '@/data/user/internalFeedback';
type Props = {
  currentType: Enum<'internal_feedback_thread_type'>;
  feedbackId: string;
};

export const UserUpdateInternalFeedbackTypeDialog = ({
  currentType,
  feedbackId,
}: Props) => {
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Type: {formatFieldValue(currentType)}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <div className="p-3 w-fit bg-gray-200/50 dark:bg-gray-700/40 rounded-lg">
            <FeedbackIcon className="w-6 h-6" />
          </div>
          <div className="p-1 mb-4">
            <DialogTitle className="text-lg">Update Feedback Type</DialogTitle>
            <DialogDescription className="text-base">
              Update the type of this feedback thread.
            </DialogDescription>
          </div>
        </DialogHeader>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            updateType({
              type,
              feedbackId,
            });
            setOpen(false);
          }}
        >
          <div className="space-y-2">
            <DialogDescription>
              Update the type of this feedback thread.
            </DialogDescription>
            <FeedbackThreadTypeSelect
              value={type}
              onChange={(newType) => setType(newType)}
            />
          </div>
          <DialogFooter className="mt-8">
            <Button
              type="button"
              className="w-full"
              variant="outline"
              onClick={() => {
                setOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="default"
              className="w-full"
              disabled={isUpdatingType}
            >
              {isUpdatingType ? 'Updating Type...' : 'Update'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
