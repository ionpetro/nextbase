import { getInternalFeedbackById } from '@/data/user/internalFeedback';
import { AdminUpdateFeedbackType } from './AdminUpdateFeedbackType';
import { AdminUpdateFeedbackPriority } from './AdminUpdateFeedbackPriority';
import { AdminUpdateFeedbackStatus } from './AdminUpdateFeedbackStatus';
import { AdminUpdateVisibility } from './AdminUpdateFeedbackVisibility';
import { AdminUpdateFeedbackAddedToRoadmap } from './AdminUpdateFeedbackAddedToRoadmap';

export async function FeedbackStatusDetails({
  feedbackId,
}: {
  feedbackId: string;
}) {
  const feedbackThread = await getInternalFeedbackById(feedbackId);
  return (
    <div className="flex justify-between items-center mb-2 ">
      <div className="flex space-x-2">
        {/* Filter : Status*/}
        <div className="flex justify-start">
          <AdminUpdateFeedbackStatus
            currentStatus={feedbackThread.status}
            feedbackId={feedbackId}
          />
        </div>
        {/* Filter : Priority*/}
        <div className="flex justify-start">
          <AdminUpdateFeedbackPriority
            currentPriority={feedbackThread.priority}
            feedbackId={feedbackId}
          />
        </div>

        <div className="flex justify-start">
          <AdminUpdateFeedbackType
            currentType={feedbackThread.type}
            feedbackId={feedbackThread.id}
          />
        </div>
      </div>

      <div className="flex space-x-6">
        <AdminUpdateVisibility
          currentVisibility={feedbackThread.open_for_public_discussion}
          feedbackId={feedbackThread.id}
        />
        <AdminUpdateFeedbackAddedToRoadmap
          currentIsAddedToRoadmap={feedbackThread.added_to_roadmap}
          feedbackId={feedbackThread.id}
        />
      </div>
    </div>
  );
}
