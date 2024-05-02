'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Enum } from '@/types';
import { formatFieldValue } from '@/utils/feedback';
import { Dispatch, SetStateAction, useState } from 'react';
import { LucideIcon } from '../LucideIcon';
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
          <div className="bg-gray-200/50 dark:bg-gray-700/40 p-3 rounded-lg w-fit">
            <LucideIcon name="MessageSquare" className="w-6 h-6" />
          </div>
          <div className="mb-4 p-1">
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
