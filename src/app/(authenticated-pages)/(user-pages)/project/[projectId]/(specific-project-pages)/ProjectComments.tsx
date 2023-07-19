import { Button } from '@/components/ui/Button';
import { Label } from '@/components/ui/Label';
import { Textarea } from '@/components/ui/Textarea';
import { T } from '@/components/ui/Typography';
import { UserAvatar } from '@/components/UserAvatar';
import { UserFullName } from '@/components/UserFullName';
import { useProjectContext } from '@/contexts/ProjectContext';
import {
  useAddProjectComment,
  useGetProjectComments,
} from '@/utils/react-queries/projects';
import { zodResolver } from '@hookform/resolvers/zod';
// convert the imports above into modularized imports
// import Check from 'lucide-react/dist/esm/icons/check';
import Edit from 'lucide-react/dist/esm/icons/edit';
import Play from 'lucide-react/dist/esm/icons/play';
import PlayCircle from 'lucide-react/dist/esm/icons/play-circle';

import moment from 'moment';
import { useForm } from 'react-hook-form';
import ConversationIcon from 'lucide-react/dist/esm/icons/message-square';
import { z } from 'zod';

const addCommentSchema = z.object({
  text: z.string().min(1),
});

type AddCommentSchema = z.infer<typeof addCommentSchema>;

const CommentInput = () => {
  const { projectId } = useProjectContext();
  const { mutate: addComment } = useAddProjectComment(projectId);

  const { handleSubmit, setValue, register } = useForm<AddCommentSchema>({
    resolver: zodResolver(addCommentSchema),
    defaultValues: {
      text: '',
    },
  });
  return (
    <form
      onSubmit={handleSubmit((data) => {
        addComment({
          text: data.text,
        });
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

const CommentsList = () => {
  const { projectId } = useProjectContext();
  const { data: comments, isLoading } = useGetProjectComments(projectId);
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

export const ProjectComments = () => {
  return (
    <div className="space-y-4 w-[380px]">
      <T.H4>Comments</T.H4>
      <div className="space-y-2">
        <CommentInput />
        <CommentsList />
      </div>
    </div>
  );
};
