import { getInternalFeedbackComments } from '@/data/user/internalFeedback';
import { Enum, Table } from '@/types';
import { UserAvatar } from '@/components/UserAvatar';
import { UserFullName } from '@/components/UserFullName';
import { T } from '@/components/ui/Typography';
import { AddComment } from './AddComment';
import { FeedbackItem } from '@/components/Feedback/FeedbackItem';

export async function FeedbackCommentList({
  feedbackId,
  feedbackThreadStatus,
}: {
  feedbackId: string;
  feedbackThreadStatus: Enum<'internal_feedback_thread_status'>;
}) {
  const feedbackComments = await getInternalFeedbackComments(feedbackId);

  return (
    <div className="w-full bg-gray-50 dark:bg-gray-950/40 border border-gray-300 dark:border-gray-600/50 space-y-6  px-6 p-4 pb-8 b-gray-300 overflow-hidden rounded-xl ">
      <div className="space-y-6">
        <T.P className="font-bold">Replies ({feedbackComments.length})</T.P>
        {feedbackComments.map((comment) => {
          return (
            <FeedbackItem
              key={comment.id}
              userId={comment.user_id}
              comment={comment.content}
            ></FeedbackItem>
          );
        })}
      </div>

      {feedbackThreadStatus === 'closed' ||
      feedbackThreadStatus === 'completed' ? (
        <T.Large className="my-6">
          This thread is now closed for discussion.
        </T.Large>
      ) : (
        <AddComment feedbackId={feedbackId} />
      )}
    </div>
  );
}
