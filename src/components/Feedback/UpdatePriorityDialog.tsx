'use client';
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
import { formatFieldValue } from '@/utils/feedback';
import FeedbackIcon from 'lucide-react/dist/esm/icons/message-square';
import { Dispatch, SetStateAction, useState } from 'react';
import { Enum } from '@/types';
import { FeedbackThreadPrioritySelect } from './FeedbackThreadPrioritySelect';

export function UpdatePriorityDialog({
  open,
  setOpen,
  currentPriority,
  updatePriority,
  feedbackId,
  isUpdatingPriority,
}: {
  isUpdatingPriority: boolean;
  feedbackId: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  currentPriority: Enum<'internal_feedback_thread_priority'>;
  updatePriority: (data: {
    priority: Enum<'internal_feedback_thread_priority'>;
    feedbackId: string;
  }) => void;
}) {
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
          <div className="p-3 w-fit bg-gray-200/50 dark:bg-gray-700/40 rounded-lg">
            <FeedbackIcon className="w-6 h-6" />
          </div>
          <div className="p-1 mb-4">
            <DialogTitle className="text-lg">
              Update Feedback Priority
            </DialogTitle>
            <DialogDescription className="text-base">
              Update the priority of this feedback thread.
            </DialogDescription>
          </div>
        </DialogHeader>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            updatePriority({
              priority,
              feedbackId,
            });
            setOpen(false);
          }}
        >
          <div className="space-y-2">
            <DialogDescription>
              Update the priority of this feedback thread.
            </DialogDescription>
            <FeedbackThreadPrioritySelect
              value={priority}
              onChange={(newPriority) => setPriority(newPriority)}
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
              disabled={isUpdatingPriority}
            >
              {isUpdatingPriority ? 'Updating Priority...' : 'Update'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
