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
import { FeedbackThreadPrioritySelect } from '@/components/Feedback/FeedbackThreadPrioritySelect';
import { formatFieldValue } from '@/utils/feedback';

type Props = {
  onUpdate: (priority: Enum<'internal_feedback_thread_priority'>) => void;
  currentPriority: Enum<'internal_feedback_thread_priority'>;
  isLoading: boolean;
};

export const UpdateInternalFeedbackPriorityDialog = ({
  onUpdate,
  currentPriority,
  isLoading,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [priority, setPriority] =
    useState<Enum<'internal_feedback_thread_priority'>>(currentPriority);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          Priority: {formatFieldValue(currentPriority)}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Feedback Priority</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            onUpdate(priority);
            setOpen(false);
          }}
        >
          <div className="space-y-2 mb-6">
            <DialogDescription>
              Update the priority of this feedback thread.
            </DialogDescription>
            <FeedbackThreadPrioritySelect
              value={priority}
              onChange={(newPriority) => setPriority(newPriority)}
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              className="w-full"
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
              disabled={isLoading}
            >
              {isLoading ? 'Updating Priority...' : 'Update'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
