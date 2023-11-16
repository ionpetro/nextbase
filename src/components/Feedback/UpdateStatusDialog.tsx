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
import { FeedbackThreadStatusSelect } from './FeedbackThreadStatusSelect';

export function UpdateStatusDialog({
  open,
  setOpen,
  currentStatus,
  updateStatus,
  feedbackId,
  isUpdatingStatus,
}: {
  isUpdatingStatus: boolean;
  feedbackId: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  currentStatus: Enum<'internal_feedback_thread_status'>;
  updateStatus: (data: {
    status: Enum<'internal_feedback_thread_status'>;
    feedbackId: string;
  }) => void;
}) {
  const [status, setStatus] =
    useState<Enum<'internal_feedback_thread_status'>>(currentStatus);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          Status: {formatFieldValue(currentStatus)}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <div className="p-3 w-fit bg-gray-200/50 dark:bg-gray-700/40 rounded-lg">
            <FeedbackIcon className="w-6 h-6" />
          </div>
          <div className="p-1 mb-4">
            <DialogTitle className="text-lg">
              Update Feedback Status
            </DialogTitle>
            <DialogDescription className="text-base">
              Update the status of this feedback thread.
            </DialogDescription>
          </div>
        </DialogHeader>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            updateStatus({
              status,
              feedbackId,
            });
            setOpen(false);
          }}
        >
          <div className="space-y-2">
            <DialogDescription>
              Update the status of this feedback thread.
            </DialogDescription>
            <FeedbackThreadStatusSelect
              value={status}
              onChange={(newStatus) => setStatus(newStatus)}
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
              disabled={isUpdatingStatus}
            >
              {isUpdatingStatus ? 'Updating Status...' : 'Update'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
