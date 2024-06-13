import { SuspendedUserAvatarWithFullname } from '@/components/UserAvatarForAnonViewers';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { adminGetInternalFeedbackById } from '@/data/admin/internal-feedback';
import { serverGetLoggedInUser } from '@/utils/server/serverGetLoggedInUser';
import { serverGetUserType } from '@/utils/server/serverGetUserType';
import { format } from 'date-fns';
import { Calendar } from 'lucide-react';
import AddComment from './AddComment';
import {
  CommentTimeLineItem,
  SuspendedFeedbackComments,
} from './CommentTimeLine';
import FeedbackActionsDropdown from './FeedbackActionsDropdown';

async function LoggedInUserFeedbackdetail({ feedbackId }) {
  const userRoleType = await serverGetUserType();
  const user = await serverGetLoggedInUser();
  const feedback = await adminGetInternalFeedbackById(feedbackId);

  return (
    <div className="h-full py-2 flex flex-col">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <SuspendedUserAvatarWithFullname
              userId={feedback?.user_id}
              size={32}
            />
            <Separator orientation="vertical" className="h-5" />
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">
              {format(new Date(feedback.created_at), 'do MMMM yyyy')}
            </span>
          </div>
          <FeedbackActionsDropdown
            feedback={feedback}
            userRole={userRoleType}
          />
        </div>
        <h2 className="text-2xl font-medium my-4">{feedback?.title}</h2>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="px-3 py-2 capitalize w-fit">
            Status: {feedback.status}
          </Badge>

          <Badge variant="outline" className="px-3 py-2 capitalize w-fit">
            Type: {feedback.type}
          </Badge>

          <Badge variant="outline" className="px-3 py-2 capitalize w-fit">
            Priority: {feedback.priority}
          </Badge>

        </div>
      </div>
      <Separator orientation="horizontal" />
      <div className="flex-1 px-10 py-10 overflow-y-auto overflow-x-visible shadow-inner">
        <CommentTimeLineItem
          userId={feedback?.user_id}
          comment={feedback?.content}
          postedAt={feedback?.created_at}
        />
        <SuspendedFeedbackComments feedbackId={feedback.id} />
      </div>
      {(feedback.open_for_public_discussion || feedback.user_id == user.id) ?
        (<div className="border-t p-4">
          <AddComment feedbackId={feedback.id} />
        </div>)
        : null}
    </div>
  );
}

export default LoggedInUserFeedbackdetail;
