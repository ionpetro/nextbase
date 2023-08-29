import { getLoggedInUserAction } from '@/app/(dynamic-pages)/_server-actions/user';
import { Anchor } from '@/components/Anchor';
import { PageHeading } from '@/components/presentational/tailwind/PageHeading';
import { UpdateInternalFeedbackTypeDialog } from '@/components/presentational/tailwind/UpdateInternalFeedbackTypeDialog';
import { Button } from '@/components/ui/Button';
import BasicPageHeading from '@/components/ui/Headings/BasicPageHeading';
import { Label } from '@/components/ui/Label';
import { Switch } from '@/components/ui/Switch';
import { T } from '@/components/ui/Typography';
import { createSupabaseUserServerComponentClient } from '@/supabase-clients/user/createSupabaseUserServerComponentClient';
import { Enum, Table } from '@/types';
import { formatFieldValue } from '@/utils/feedback';
import {
  getInternalFeedbackById,
  getInternalFeedbackComments,
} from '@/utils/supabase/internalFeedback';
import { z } from 'zod';
import { addComment, updateType } from './actions';
import { AddComment } from './AddComment';
import { FeedbackComponent } from './FeedbackComment';

const feedbackItemPageParams = z.object({
  feedbackId: z.string(),
});

function ViewPriority({
  feedbackId,
  currentPriority,
}: {
  feedbackId: string;
  currentPriority: Enum<'internal_feedback_thread_priority'>;
}) {
  return (
    <Button variant="outline" disabled>
      Priority: {formatFieldValue(currentPriority)}{' '}
    </Button>
  );
}
function ViewStatus({
  feedbackId,
  currentStatus,
}: {
  feedbackId: string;
  currentStatus: Enum<'internal_feedback_thread_status'>;
}) {
  return (
    <Button variant="outline" disabled>
      Status: {formatFieldValue(currentStatus)}
    </Button>
  );
}

function ViewVisibility({
  feedbackId,
  currentVisibility,
}: {
  feedbackId: string;
  currentVisibility: boolean;
}) {
  return (
    <div className="flex items-center space-x-2 ">
      <Switch disabled checked={currentVisibility} />{' '}
      <Label className="text-base ">Visible to Public</Label>
    </div>
  );
}

function ViewIsAddedToRoadmap({
  feedbackId,
  currentIsAddedToRoadmap,
}: {
  feedbackId: string;
  currentIsAddedToRoadmap: boolean;
}) {
  return (
    <div className="flex items-center space-x-2">
      <Switch disabled checked={currentIsAddedToRoadmap} />
      <Label className="text-base">Added to Roadmap</Label>
    </div>
  );
}

function CommentList({
  feedbackId,
  feedbackComments,
}: {
  feedbackId: string;
  feedbackComments: Table<'internal_feedback_comments'>[];
}) {
  return (
    <div className="space-y-6">
      <p className="text-base font-[600] text-black ">
        Replies ({feedbackComments.length})
      </p>
      {feedbackComments.map((comment) => {
        return (
          <FeedbackComponent
            key={comment.id}
            userId={comment.user_id}
            comment={comment.content}
          ></FeedbackComponent>
        );
      })}
    </div>
  );
}

export default async function FeedbackItemPage({
  params,
}: {
  params: unknown;
}) {
  const supabaseClient = createSupabaseUserServerComponentClient();
  const { feedbackId } = feedbackItemPageParams.parse(params);
  const [user, feedbackThread, feedbackComments] = await Promise.all([
    getLoggedInUserAction(supabaseClient),
    getInternalFeedbackById(supabaseClient, feedbackId),
    getInternalFeedbackComments(supabaseClient, feedbackId),
  ]);

  return (
    <>
      <div className="space-x-6">
        <span className="text-base py-2 font-[600] text-slate-500">
          <Anchor href="/">Dashboard</Anchor>
        </span>
        <span className="text-base  py-2 font-[600] text-slate-500">/</span>
        <span className="text-base py-2 font-[600] text-slate-500">
          <Anchor href="/feedback">My Feedback</Anchor>
        </span>
        <span className="text-base  py-2 font-[600] text-slate-500">/</span>
        <span className="text-base py-2 bg-blue-50 rounded-lg px-4 font-[700] text-blue-600">
          {feedbackThread.title}
        </span>
      </div>

      {/* Page Heading */}
      <PageHeading
        title={feedbackThread.title}
        subTitle={feedbackThread.content}
      />

      {/* Feedback */}

      <div className="space-y-4">
        <div className="flex justify-between items-center ">
          <div className="flex space-x-2">
            {/* Filter : Status*/}
            <div className="flex justify-start">
              <ViewStatus
                feedbackId={feedbackThread.id}
                currentStatus={feedbackThread.status}
              />
            </div>
            {/* Filter : Priority*/}
            <div className="flex justify-start">
              <ViewPriority
                feedbackId={feedbackThread.id}
                currentPriority={feedbackThread.priority}
              />
            </div>

            <div className="flex justify-start">
              <UpdateInternalFeedbackTypeDialog
                currentType={feedbackThread.type}
                isLoading={false}
                feedbackId={feedbackThread.id}
                onUpdate={updateType}
              />
            </div>
          </div>

          <div className="flex space-x-6">
            <ViewVisibility
              feedbackId={feedbackThread.id}
              currentVisibility={feedbackThread.open_for_public_discussion}
            />

            <ViewIsAddedToRoadmap
              feedbackId={feedbackThread.id}
              currentIsAddedToRoadmap={feedbackThread.added_to_roadmap}
            />
          </div>
        </div>
        <div className="w-full bg-slate-100  space-y-6 border px-6 p-4 pb-8 b-slate-300 overflow-hidden rounded-xl ">
          <CommentList
            feedbackId={feedbackThread.id}
            feedbackComments={feedbackComments}
          />

          {feedbackThread.status === 'closed' ||
          feedbackThread.status === 'completed' ? (
            <T.Large className="my-6">
              This thread is now closed for discussion.
            </T.Large>
          ) : (
            <AddComment
              addComment={addComment}
              feedbackId={feedbackThread.id}
            />
          )}
        </div>
      </div>
    </>
  );
}
