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
import { FeedbackThreadTypeSelect } from '@/components/Feedback/FeedbackThreadTypeSelect';
import { useRouter } from 'next/navigation';
import FeedbackIcon from 'lucide-react/dist/esm/icons/message-square';
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
              disabled={isLoading}
            >
              {isLoading ? 'Updating Type...' : 'Update'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
