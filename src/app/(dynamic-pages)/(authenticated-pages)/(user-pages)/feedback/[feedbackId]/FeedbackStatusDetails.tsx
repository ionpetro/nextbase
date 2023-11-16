import { getInternalFeedbackById } from '@/data/user/internalFeedback';
import { serverGetLoggedInUser } from '@/utils/server/serverGetLoggedInUser';
import { UserUpdateFeedbackType } from './UserUpdateFeedbackType';
import { Switch } from '@/components/ui/Switch';
import { Label } from '@/components/ui/Label';
import { formatFieldValue } from '@/utils/feedback';
import { Button } from '@/components/ui/Button';
import { Enum } from '@/types';
import { z } from 'zod';

const feedbackItemPageParams = z.object({
  feedbackId: z.string(),
});

function ViewPriority({
  currentPriority,
}: {
  currentPriority: Enum<'internal_feedback_thread_priority'>;
}) {
  return (
    <Button variant="outline" disabled>
      Priority: {formatFieldValue(currentPriority)}{' '}
    </Button>
  );
}
function ViewStatus({
  currentStatus,
}: {
  currentStatus: Enum<'internal_feedback_thread_status'>;
}) {
  return (
    <Button variant="outline" disabled>
      Status: {formatFieldValue(currentStatus)}
    </Button>
  );
}

function ViewType({
  currentType,
}: {
  currentType: Enum<'internal_feedback_thread_type'>;
}) {
  return (
    <Button variant="outline" disabled>
      Type: {formatFieldValue(currentType)}
    </Button>
  );
}

function ViewVisibility({ currentVisibility }: { currentVisibility: boolean }) {
  return (
    <div className="flex items-center space-x-2 ">
      <Switch disabled checked={currentVisibility} />{' '}
      <Label className="text-base ">Visible to Public</Label>
    </div>
  );
}

function ViewIsAddedToRoadmap({
  currentIsAddedToRoadmap,
}: {
  currentIsAddedToRoadmap: boolean;
}) {
  return (
    <div className="flex items-center space-x-2">
      <Switch disabled checked={currentIsAddedToRoadmap} />
      <Label className="text-base">Added to Roadmap</Label>
    </div>
  );
}

export async function FeedbackStatusDetails({
  feedbackId,
}: {
  feedbackId: string;
}) {
  const feedbackThread = await getInternalFeedbackById(feedbackId);
  const user = await serverGetLoggedInUser();
  const isOwner = feedbackThread.user_id === user.id;
  return (
    <div className="flex justify-between items-center mb-2 ">
      <div className="flex space-x-2">
        {/* Filter : Status*/}
        <div className="flex justify-start">
          <ViewStatus currentStatus={feedbackThread.status} />
        </div>
        {/* Filter : Priority*/}
        <div className="flex justify-start">
          <ViewPriority currentPriority={feedbackThread.priority} />
        </div>

        <div className="flex justify-start">
          {isOwner ? (
            <UserUpdateFeedbackType
              currentType={feedbackThread.type}
              feedbackId={feedbackThread.id}
            />
          ) : (
            <ViewType currentType={feedbackThread.type} />
          )}
        </div>
      </div>

      <div className="flex space-x-6">
        <ViewVisibility
          currentVisibility={feedbackThread.open_for_public_discussion}
        />

        <ViewIsAddedToRoadmap
          currentIsAddedToRoadmap={feedbackThread.added_to_roadmap}
        />
      </div>
    </div>
  );
}
