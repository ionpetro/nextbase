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
import { useRouter } from 'next/navigation';

type Props = {
  onUpdate:
    | (({
        feedbackId,
        type,
      }: {
        feedbackId: string;
        type: Enum<'internal_feedback_thread_type'>;
      }) => void)
    | (({
        feedbackId,
        type,
      }: {
        feedbackId: string;
        type: Enum<'internal_feedback_thread_type'>;
      }) => Promise<void>);
  currentType: Enum<'internal_feedback_thread_type'>;
  isLoading: boolean;
  feedbackId: string;
};

export const UpdateInternalFeedbackTypeDialog = ({
  onUpdate,
  currentType,
  isLoading,
  feedbackId,
}: Props) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [type, setType] =
    useState<Enum<'internal_feedback_thread_type'>>(currentType);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Type: {formatFieldValue(currentType)}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Feedback Type</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            onUpdate({
              type,
              feedbackId,
            });
            setOpen(false);
            router.refresh();
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
          <DialogFooter>
            <Button type="submit" variant="success" disabled={isLoading}>
              {isLoading ? 'Updating Type...' : 'Update'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setOpen(false);
              }}
            >
              Cancel
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
