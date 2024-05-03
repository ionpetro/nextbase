'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { createInternalFeedback } from '@/data/user/internalFeedback';
import { useSAToastMutation } from '@/hooks/useSAToastMutation';
import type { Enum } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import FeedbackIcon from 'lucide-react/dist/esm/icons/message-square';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

type FeedbackType = Enum<'internal_feedback_thread_type'>;

const FeedbackList: Array<FeedbackType> = ['bug', 'feature_request', 'general'];

const FeedbackLabelMap: Record<FeedbackType, string> = {
  bug: 'Bug',
  feature_request: 'Feature Request',
  general: 'General',
};

const feedbackSchema = z.object({
  title: z.string(),
  content: z.string(),
  type: z.enum(['bug', 'feature_request', 'general']),
});

type FeedbackFormType = z.infer<typeof feedbackSchema>;

export const GiveFeedbackDialog = ({
  isExpanded,
  children,
}: {
  isExpanded: boolean;
  children?: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { control, handleSubmit, formState, reset } = useForm<FeedbackFormType>(
    {
      resolver: zodResolver(feedbackSchema),
      defaultValues: {
        type: 'bug',
      },
    },
  );

  const {
    mutate: createInternalFeedbackMutation,
    isLoading: isCreatingInternalFeedback,
  } = useSAToastMutation(
    async (data: FeedbackFormType) => {
      return await createInternalFeedback(data);
    },
    {
      errorMessage(error) {
        try {
          if (error instanceof Error) {
            return String(error.message);
          }
          return `Failed to create feedback ${String(error)}`;
        } catch (_err) {
          console.warn(_err);
          return 'Failed to create feedback';
        }
      },
      onSuccess: () => {
        setIsOpen(false);
        reset();
      },
    },
  );

  const { isValid, isLoading } = formState;

  const onSubmit = (data: FeedbackFormType) => {
    // handle form submission logic
    createInternalFeedbackMutation(data);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(newIsOpen) => {
        setIsOpen(newIsOpen);
      }}
    >
      <DialogTrigger className="w-full" asChild>
        {children ? children : <Button variant="default">Give Feedback</Button>}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <div className="p-3 w-fit bg-gray-200/50 dark:bg-gray-700/40 rounded-lg">
            <FeedbackIcon className="w-6 h-6" />
          </div>
          <div className="p-1 mb-4">
            <DialogTitle className="text-lg">Give Feedback</DialogTitle>
            <DialogDescription className="text-base">
              Help us improve by sharing feedback or just drop by and say Hi!
            </DialogDescription>
          </div>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          data-testid="give-feedback-form"
        >
          <div className="space-y-1">
            <Label>Title</Label>
            <Controller
              control={control}
              name="title"
              render={({ field }) => <Input {...field} placeholder="Title" />}
            />
          </div>
          <div className="space-y-1">
            <Label>Content</Label>
            <Controller
              control={control}
              name="content"
              render={({ field }) => <Input {...field} placeholder="Content" />}
            />
          </div>

          <div className="space-y-1">
            <Label>Type</Label>
            <Controller
              control={control}
              name="type"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {FeedbackList.map((type) => (
                      <SelectItem key={type} value={type}>
                        {FeedbackLabelMap[type]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <Button
            className="w-full mt-4"
            data-testid="submit-feedback-button"
            disabled={!isValid || isCreatingInternalFeedback}
            type="submit"
          >
            {isLoading || isCreatingInternalFeedback
              ? 'Submitting...'
              : 'Submit Feedback'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
