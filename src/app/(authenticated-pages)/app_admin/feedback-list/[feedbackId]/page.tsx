import { z } from 'zod';
import {
    addCommentToInternalFeedbackThread,
    getInternalFeedbackById,
    getInternalFeedbackComments,
    updateInternalFeedbackIsAddedToRoadmap,
    updateInternalFeedbackIsOpenForDiscussion,
    updateInternalFeedbackPriority,
    updateInternalFeedbackStatus,
    updateInternalFeedbackType,
} from './actions'
import ClientAdminFeedbackItemPage from './ClientFeedbackItemPage';

const feedbackItemPageParams = z.object({
    feedbackId: z.string(),
});

type FeedbackItemPageParams = z.infer<typeof feedbackItemPageParams>;

export default async function AppAdminFeedbackItemPage({
    params
}: {
    params: any
}) {
    const {
        feedbackId
    } = feedbackItemPageParams.parse(params);

    const feedbackThread = await getInternalFeedbackById(feedbackId);
    console.log(feedbackThread);
    return <ClientAdminFeedbackItemPage
        addCommentToInternalFeedbackThread={addCommentToInternalFeedbackThread}
        getInternalFeedbackById={getInternalFeedbackById}
        getInternalFeedbackComments={getInternalFeedbackComments}
        updateInternalFeedbackIsAddedToRoadmap={updateInternalFeedbackIsAddedToRoadmap}
        updateInternalFeedbackIsOpenForDiscussion={updateInternalFeedbackIsOpenForDiscussion}
        updateInternalFeedbackPriority={updateInternalFeedbackPriority}
        updateInternalFeedbackStatus={updateInternalFeedbackStatus}
        updateInternalFeedbackType={updateInternalFeedbackType}
        feedbackThread={feedbackThread}
    />
}
