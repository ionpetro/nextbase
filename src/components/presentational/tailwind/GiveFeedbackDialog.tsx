'use client';
import { Button } from '@/components/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Enum } from '@/types';
import { useState } from 'react';
import { useCreateInternalFeedback } from '@/utils/react-queries/internalFeedback';

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

export const GiveFeedbackDialog = ({ isExpanded }: { isExpanded: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { control, handleSubmit, formState, reset } = useForm<FeedbackFormType>(
    {
      resolver: zodResolver(feedbackSchema),
      defaultValues: {
        type: 'bug',
      },
    }
  );

  const {
    mutate: createInternalFeedback,
    isLoading: isCreatingInternalFeedback,
  } = useCreateInternalFeedback({
    onSuccess: () => {
      setIsOpen(false);
      reset();
    },
  });

  const { isValid, isLoading } = formState;

  const onSubmit = (data: FeedbackFormType) => {
    // handle form submission logic
    createInternalFeedback(data);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(newIsOpen) => {
        setIsOpen(newIsOpen);
      }}
    >
      <DialogTrigger>
        <Button variant="outline">Give Feedback</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Give Feedback</DialogTitle>
          <DialogDescription>
            Help us improve by sharing feedback or just drop by and say Hi!
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label>Title</Label>
            <Controller
              control={control}
              name="title"
              render={({ field }) => <Input {...field} placeholder="Title" />}
            />
          </div>
          <div className="space-y-2">
            <Label>Content</Label>
            <Controller
              control={control}
              name="content"
              render={({ field }) => <Input {...field} placeholder="Content" />}
            />
          </div>

          <div className="space-y-2">
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
