import { Anchor } from '@/components/Anchor';
import { PageHeading } from '@/components/presentational/tailwind/PageHeading';
import Overline from '@/components/presentational/tailwind/Text/Overline';
import { Button } from '@/components/ui/Button';
import { Label } from '@/components/ui/Label';
import { Switch } from '@/components/ui/Switch';
import { T } from '@/components/ui/Typography';
import { Enum, Table } from '@/types';
import { formatFieldValue } from '@/utils/feedback';
import { z } from 'zod';
import { AddComment } from './AddComment';
import { FeedbackComponent } from './FeedbackComment';
import {
  getInternalFeedbackById,
  getInternalFeedbackComments,
  getSlimInternalFeedback,
} from '@/data/user/internalFeedback';
import { Suspense } from 'react';
import { serverGetLoggedInUser } from '@/utils/server/serverGetLoggedInUser';
import { UserUpdateInternalFeedbackTypeDialog } from './UserUpdateInternalFeedbackTypeDialog';

const feedbackItemPageParams = z.object({
  feedbackId: z.string(),
});

function ViewPriority({
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

function ViewType({
  feedbackId,
  currentType,
}: {
  feedbackId: string;
  currentType: Enum<'internal_feedback_thread_type'>;
}) {
  return (
    <Button variant="outline" disabled>
      Type: {formatFieldValue(currentType)}
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
      <T.P className="font-bold">Replies ({feedbackComments.length})</T.P>
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

async function CommentListWrapper({
  feedbackId,
  feedbackThreadStatus,
}: {
  feedbackId: string;
  feedbackThreadStatus: Enum<'internal_feedback_thread_status'>;
}) {
  const feedbackComments = await getInternalFeedbackComments(feedbackId);

  return (
    <div className="w-full bg-gray-50 dark:bg-gray-950/40 border border-gray-300 dark:border-gray-600/50 space-y-6  px-6 p-4 pb-8 b-gray-300 overflow-hidden rounded-xl ">
      <CommentList
        feedbackId={feedbackId}
        feedbackComments={feedbackComments}
      />

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

async function FeedbackThreadDetails({ feedbackId }: { feedbackId: string }) {
  const feedbackThread = await getInternalFeedbackById(feedbackId);
  const user = await serverGetLoggedInUser();
  const isOwner = feedbackThread.user_id === user.id;
  return (
    <div className="flex justify-between items-center mb-2 ">
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
          {isOwner ? (
            <UserUpdateInternalFeedbackTypeDialog
              currentType={feedbackThread.type}
              feedbackId={feedbackThread.id}
            />
          ) : (
            <ViewType
              feedbackId={feedbackThread.id}
              currentType={feedbackThread.type}
            />
          )}
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
  );
}

export default async function FeedbackItemPage({
  params,
}: {
  params: unknown;
}) {
  const { feedbackId } = feedbackItemPageParams.parse(params);
  const slimFeedbackThread = await getSlimInternalFeedback(feedbackId);

  return (
    <>
      <div className="flex space-x-4">
        <Overline className="text-gray-500 hover:text-gray-800 dark:text-gray-600 hover:dark:text-gray-400">
          <Anchor href="/">Dashboard</Anchor>
        </Overline>
        <Overline className="text-gray-500 dark:text-gray-600">/</Overline>
        <Overline className="text-gray-500 hover:text-gray-800 dark:text-gray-600 hover:dark:text-gray-400">
          <Anchor href="/feedback">My Feedback</Anchor>
        </Overline>
        <Overline className="text-gray-500 dark:text-gray-600">/</Overline>
        <Overline className="text-gray-800 dark:text-gray-400 font-bold underline-offset-4 underline">
          {slimFeedbackThread.title}
        </Overline>
      </div>

      {/* Page Heading */}
      <PageHeading
        title={slimFeedbackThread.title}
        subTitle={slimFeedbackThread.content}
      />

      {/* Feedback */}

      <div className="space-y-4">
        <Suspense fallback={<T.Subtle>Loading...</T.Subtle>}>
          <FeedbackThreadDetails feedbackId={feedbackId} />
        </Suspense>
        <Suspense fallback={<T.Subtle>Loading...</T.Subtle>}>
          <CommentListWrapper
            feedbackId={feedbackId}
            feedbackThreadStatus={slimFeedbackThread.status}
          />
        </Suspense>
      </div>
    </>
  );
}
