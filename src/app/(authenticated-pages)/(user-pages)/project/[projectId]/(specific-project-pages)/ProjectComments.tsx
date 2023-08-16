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
      <div className="space-y-2">
        <Label htmlFor="text" className="space-x-2 flex items-center">
          {' '}
          <Edit /> <span>New comment</span>
        </Label>
        <Textarea id="text" placeholder="Add a comment" {...register('text')} />
        <div className="flex justify-end">
          <Button type="submit">
            <PlayCircle />
          </Button>
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
        <T.Subtle>Loading comments...</T.Subtle>
      </div>
    );

  if (comments.length === 0)
    return (
      <div className="space-y-2">
        <T.Subtle>No comments yet</T.Subtle>
      </div>
    );

  return (
    <div className="space-y-4">
      <div className="flex space-x-2 items-center">
        <ConversationIcon /> <T.Subtle>All Comments </T.Subtle>
      </div>
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="grid grid-cols-[auto,1fr] items-start gap-3"
        >
          <UserAvatar userId={comment.user_id} size={24} />
          <div className="space-y-2">
            <UserFullName userId={comment.user_id} />
            <T.Small>{comment.text}</T.Small>
            <T.Subtle className="text-xs text-slate-400">
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
    <div className="space-y-4 w-[380px]">
      <T.H4>Comments</T.H4>
      <div className="space-y-2">
        <CommentInput addProjectCommentAction={addProjectCommentAction} />
        <CommentsList getProjectCommentsAction={getProjectCommentsAction} />
      </div>
    </div>
  );
};
