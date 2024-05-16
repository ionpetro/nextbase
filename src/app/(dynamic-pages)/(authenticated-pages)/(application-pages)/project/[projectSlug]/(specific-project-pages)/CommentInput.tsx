'use client';
import { T } from '@/components/ui/Typography';
import { Button } from '@/components/ui/button';
import { SelectSeparator } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { createProjectCommentAction } from '@/data/user/projects';
import { useSAToastMutation } from '@/hooks/useSAToastMutation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Fragment, startTransition, useOptimistic } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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

  const { mutate: addComment, isLoading } = useSAToastMutation(
    async (text: string) => {
      return createProjectCommentAction(projectId, text);
    },
    {
      loadingMessage: 'Adding comment...',
      errorMessage(error) {
        try {
          if (error instanceof Error) {
            return String(error.message);
          }
          return `Failed to add comment ${String(error)}`;
        } catch (_err) {
          console.warn(_err);
          return 'Failed to add comment';
        }
      },
      successMessage: 'Comment added!',
      onSuccess: (response) => {
        if (response.status === 'success') {
          startTransition(() => {
            if (response.data) {
              addCommentToFlight({
                children: response.data.commentList,
                id: response.data.id,
              });
            };
          });
        }
      },
    }
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
        <div className="space-y-2" key={comment.id}>
          <T.Subtle className="text-xs italic">Sending comment</T.Subtle>
          <Fragment key={comment.id}>{comment.children}</Fragment>
        </div>
      ))}
    </>
  );
};
