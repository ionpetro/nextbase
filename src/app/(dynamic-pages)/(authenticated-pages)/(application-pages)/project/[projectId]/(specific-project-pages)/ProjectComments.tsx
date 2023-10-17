'use client';
import { Button } from '@/components/ui/Button';
import { Label } from '@/components/ui/Label';
import { Textarea } from '@/components/ui/Textarea';
import { T } from '@/components/ui/Typography';
import { UserAvatar } from '@/components/UserAvatar';
import { UserFullName } from '@/components/UserFullName';
import { useProjectContext } from '@/contexts/ProjectContext';
import { zodResolver } from '@hookform/resolvers/zod';
// convert the imports above into modularized imports
// import Check from 'lucide-react/dist/esm/icons/check';
import Edit from 'lucide-react/dist/esm/icons/edit';
import PlayCircle from 'lucide-react/dist/esm/icons/play-circle';

import moment from 'moment';
import { useForm } from 'react-hook-form';
import ConversationIcon from 'lucide-react/dist/esm/icons/message-square';
import { z } from 'zod';
import { Table } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { SelectSeparator } from '@/components/ui/Select';

const addCommentSchema = z.object({
  text: z.string().min(1),
});

type AddCommentSchema = z.infer<typeof addCommentSchema>;

const CommentInput = ({
  addProjectCommentAction,
}: {
  addProjectCommentAction: (
    projectId: string,
    text: string
  ) => Promise<Table<'project_comments'>>;
}) => {
  const toastRef = useRef<string | undefined>();
  const { projectId } = useProjectContext();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate: addComment } = useMutation(
    async (text: string) => {
      return addProjectCommentAction(projectId, text);
    },
    {
      onMutate: async () => {
        toastRef.current = toast.loading(`Adding comment...`);
      },
      onSuccess: () => {
        toast.success(`Comment added successfully!`, {
          id: toastRef.current ?? undefined,
        });
        queryClient.invalidateQueries(['getProjectComments', projectId]);
        router.refresh();
      },
      onError: (error) => {
        toast.error(String(error), {
          id: toastRef.current ?? undefined,
        });
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
          <Button variant="outline" type="reset">
            Reset
          </Button>
          <Button type="submit">Publish</Button>
        </div>
      </div>
    </form>
  );
};

const CommentsList = ({
  getProjectCommentsAction,
}: {
  getProjectCommentsAction: (
    projectId: string
  ) => Promise<Array<Table<'project_comments'>>>;
}) => {
  const { projectId } = useProjectContext();
  const { data: comments, isLoading } = useQuery(
    ['getProjectComments', projectId],
    async () => {
      return getProjectCommentsAction(projectId);
    },
    {
      refetchOnMount: true,
    }
  );
  if (isLoading || !comments)
    return (
      <div className="space-y-2">
        <T.Small>Loading comments...</T.Small>
      </div>
    );

  if (comments.length === 0)
    return (
      <div className="space-y-2">
        <T.Small>No comments yet</T.Small>
      </div>
    );

  return (
    <div className="space-y-4 mt-4 mb-10">
      <div className="mt-8 mb-4">
        <SelectSeparator />
      </div>
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="grid grid-cols-[auto,1fr] items-start gap-3 mb-10"
        >
          <UserAvatar userId={comment.user_id} size={32} />
          <div className="space-y-2">
            <UserFullName userId={comment.user_id} />
            <T.Small className="m-0">{comment.text}</T.Small>
            <T.Subtle className="text-xs text-muted-foreground">
              {moment(comment.created_at).format('LLLL')}
            </T.Subtle>
          </div>
        </div>
      ))}
    </div>
  );
};

export const ProjectComments = ({
  addProjectCommentAction,
  getProjectCommentsAction,
}: {
  addProjectCommentAction: (
    projectId: string,
    text: string
  ) => Promise<Table<'project_comments'>>;
  getProjectCommentsAction: (
    projectId: string
  ) => Promise<Array<Table<'project_comments'>>>;
}) => {
  return (
    <div className="space-y-4 max-w-md">
      <T.H4>Comments</T.H4>
      <div className="space-y-2 mb-10">
        <CommentInput addProjectCommentAction={addProjectCommentAction} />
        <CommentsList getProjectCommentsAction={getProjectCommentsAction} />
      </div>
    </div>
  );
};
