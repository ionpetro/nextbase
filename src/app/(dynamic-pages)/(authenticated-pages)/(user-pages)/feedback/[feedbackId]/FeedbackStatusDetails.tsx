import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { getInternalFeedbackById } from '@/data/user/internalFeedback';
import { Enum } from '@/types';
import { formatFieldValue } from '@/utils/feedback';
import { serverGetLoggedInUser } from '@/utils/server/serverGetLoggedInUser';
import { z } from 'zod';
import { UserUpdateFeedbackType } from './UserUpdateFeedbackType';

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
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center space-x-2 cursor-not-allowed">
            <Switch disabled checked={currentVisibility} />{' '}
            <Label className="text-base ">Visible to Public</Label>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          Only application admins can modify this setting.
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

function ViewIsAddedToRoadmap({
  currentIsAddedToRoadmap,
}: {
  currentIsAddedToRoadmap: boolean;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center space-x-2 cursor-not-allowed">
            <Switch disabled checked={currentIsAddedToRoadmap} />
            <Label className="text-base">Added to Roadmap</Label>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          Only application admins can modify this setting.
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
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

      <div className="flex space-x-6" suppressHydrationWarning>
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
