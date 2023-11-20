'use client';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useToastMutation } from '@/hooks/useToastMutation';
import { createProjectCommentAction } from '@/data/user/projects';
import { SelectSeparator } from '@/components/ui/Select';
import { useRouter } from 'next/navigation';
import {
  Fragment,
  ReactNode,
  startTransition,
  useOptimistic,
  useState,
} from 'react';
import { T } from '@/components/ui/Typography';
import { Alert } from '@/components/ui/Alert';

const addCommentSchema = z.object({
  text: z.string().min(1),
});

type AddCommentSchema = z.infer<typeof addCommentSchema>;

type InFlightComment = {
  children: JSX.Element;
  id: string | number;
};

export const CommentInput = ({ projectId }: { projectId: string }) => {
  const [commentsInFlight, addCommentToFlight] = useOptimistic<
    InFlightComment[],
    InFlightComment
  >([], (statee, newMessage) => {
    return [...statee, newMessage];
  });

  const { mutate: addComment, isLoading } = useToastMutation(
    async (text: string) => {
      return createProjectCommentAction(projectId, text);
    },
    {
      loadingMessage: 'Adding comment...',
      errorMessage: 'Failed to add comment',
      successMessage: 'Comment added!',
      onSuccess: (data) => {
        // revalidatePath on the server can take a couple of seconds,
        // meanwhile we can show the comment as if it was added using our optimistic hook
        startTransition(() => {
          addCommentToFlight({
            children: data.commentList,
            id: data.id,
          });
        });
      },
    },
  );

  const { handleSubmit, setValue, register } = useForm<AddCommentSchema>({
    resolver: zodResolver(addCommentSchema),
    defaultValues: {
      text: '',
    },
  });
  return (
    <>
      <form
        onSubmit={handleSubmit((data) => {
          addComment(data.text);
          setValue('text', '');
        })}
      >
        <div className="space-y-3">
          <Textarea
            id="text"
            placeholder="Share your thoughts"
            className="bg-gray-200/50 dark:bg-gray-700/50 border-none dark:text-muted-foreground text-gray-700 p-3 h-24 rounded-lg"
            {...register('text')}
          />
          <div className="flex justify-end space-x-2">
            <Button disabled={isLoading} variant="outline" type="reset">
              Reset
            </Button>
            <Button disabled={isLoading} type="submit">
              {isLoading ? 'Adding comment...' : 'Add comment'}
            </Button>
          </div>
        </div>
      </form>
      <div className="mt-8 mb-4">
        <SelectSeparator />
      </div>
      {commentsInFlight.map((comment) => (
        <div className="space-y-2">
          <T.Subtle className="text-xs italic">Sending comment</T.Subtle>
          <Fragment key={comment.id}>{comment.children}</Fragment>
        </div>
      ))}
    </>
  );
};
