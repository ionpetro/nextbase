'use client';

import { Button } from '@/components/ui/Button/ButtonShadcn';
import BasicPageHeading from '@/components/ui/Headings/BasicPageHeading';
import { Switch } from '@/components/ui/Switch';
import { Label } from '@/components/ui/Label';
import { useState } from 'react';
import { Enum, Table } from '@/types';
import { UpdateInternalFeedbackStatusDialog } from '@/components/presentational/tailwind/UpdateInternalFeedbackStatusDialog';
import { UpdateInternalFeedbackPriorityDialog } from '@/components/presentational/tailwind/UpdateInternalFeedbackPriorityDialog';
import { getPublicUserAvatarUrl } from '@/utils/helpers';

import { UpdateInternalFeedbackTypeDialog } from '@/components/presentational/tailwind/UpdateInternalFeedbackTypeDialog';
import { Anchor } from '@/components/Anchor';
import { T } from '@/components/ui/Typography';
import Image from 'next/image';

import {
  useAddCommentToInternalFeedbackThread,
  useAdminGetUser,
  useGetInternalFeedbackById,
  useGetInternalFeedbackComments,
  useUpdateInternalFeedbackIsOpenForDiscussion,
  useUpdateInternalFeedbackThreadIsAddedToRoadmap,
  useUpdateInternalFeedbackThreadPriority,
  useUpdateInternalFeedbackThreadStatus,
  useUpdateInternalFeedbackThreadType,
} from '@/utils/react-query-hooks-app-admin';

function UpdateType({
  feedbackId,
  currentType,
}: {
  feedbackId: string;
  currentType: Enum<'internal_feedback_thread_type'>;
}) {
  const { mutate, isLoading } = useUpdateInternalFeedbackThreadType(feedbackId);

  return (
    <UpdateInternalFeedbackTypeDialog
      currentType={currentType}
      isLoading={isLoading}
      onUpdate={mutate}
      feedbackId={feedbackId}
    />
  );
}

function UpdatePriority({
  feedbackId,
  currentPriority,
}: {
  feedbackId: string;
  currentPriority: Enum<'internal_feedback_thread_priority'>;
}) {
  const { mutate, isLoading } =
    useUpdateInternalFeedbackThreadPriority(feedbackId);

  return (
    <UpdateInternalFeedbackPriorityDialog
      currentPriority={currentPriority}
      isLoading={isLoading}
      onUpdate={mutate}
    />
  );
}
function UpdateStatus({
  feedbackId,
  currentStatus,
}: {
  feedbackId: string;
  currentStatus: Enum<'internal_feedback_thread_status'>;
}) {
  const { mutate, isLoading } =
    useUpdateInternalFeedbackThreadStatus(feedbackId);
  return (
    <UpdateInternalFeedbackStatusDialog
      currentStatus={currentStatus}
      isLoading={isLoading}
      onUpdate={mutate}
    />
  );
}

function AddComment({ feedbackId }: { feedbackId: string }) {
  const [content, setContent] = useState('');
  const { mutate, isLoading } = useAddCommentToInternalFeedbackThread(
    feedbackId,
    {
      onSuccess: () => {
        setContent('');
      },
    }
  );

  return (
    <div className="space-y-2 mb-12">
      <p className="text-base font-[600] text-black ">Your Response</p>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your Response here"
        className="rounded-lg w-full h-[224px] p-3 border b-slate-300"
      />{' '}
      <div className="flex space-x-2 justify-end">
        <Button
          variant="outline"
          onClick={() => {
            setContent('');
          }}
        >
          Cancel
        </Button>
        <Button
          variant="default"
          onClick={() => {
            mutate(content);
          }}
          disabled={isLoading || content.length === 0}
        >
          {' '}
          Submit
        </Button>
      </div>
    </div>
  );
}

function UpdateVisibility({
  feedbackId,
  currentVisibility,
}: {
  feedbackId: string;
  currentVisibility: boolean;
}) {
  const { mutate, isLoading } =
    useUpdateInternalFeedbackIsOpenForDiscussion(feedbackId);

  return (
    <div className="flex items-center space-x-2 ">
      <Switch
        disabled={isLoading}
        checked={currentVisibility}
        onCheckedChange={(checked) => mutate(checked)}
      />{' '}
      <Label className="text-base ">Visible to Public</Label>
    </div>
  );
}

function UpdateIsAddedToRoadmap({
  feedbackId,
  currentIsAddedToRoadmap,
}: {
  feedbackId: string;
  currentIsAddedToRoadmap: boolean;
}) {
  const { mutate, isLoading } =
    useUpdateInternalFeedbackThreadIsAddedToRoadmap(feedbackId);

  return (
    <div className="flex items-center space-x-2">
      <Switch
        disabled={isLoading}
        checked={currentIsAddedToRoadmap}
        onCheckedChange={(checked) => mutate(checked)}
      />
      <Label className="text-base">Added to Roadmap</Label>
    </div>
  );
}

function FeedbackComponent({
  userId,
  comment,
}: {
  userId: string;
  comment: string;
}) {
  const { data: userData, isLoading } = useAdminGetUser(userId);
  if (!userData || isLoading) {
    return null;
  }
  return (
    <div className="flex items-start space-x-4">
      <span className="flex space-x-2 items-center">
        <Image
          className="rounded-full border border-slate-500 h-[24px] w-[24px]"
          alt={
            userData.userProfile.full_name ??
            userData.authUser.user.email ??
            userData.authUser.user.id
          }
          src={getPublicUserAvatarUrl(userData.userProfile.avatar_url)}
          height={24}
          width={24}
        />
      </span>
      <div className="w-[560px] space-y-2">
        <div>
          <p className="text-base font-[600]">
            {userData.userProfile.full_name}
          </p>
          <p className="text-base font-[500] text-slate-600">{comment}</p>
        </div>
      </div>
    </div>
  );
}

function CommentList({ feedbackId }: { feedbackId: string }) {
  const { data: comments, isLoading } =
    useGetInternalFeedbackComments(feedbackId);

  if (!comments || isLoading) {
    return <T.Subtle>Loading comments...</T.Subtle>;
  }

  return (
    <div className="space-y-6">
      <p className="text-base font-[600] text-black ">
        Replies ({comments.length})
      </p>
      {comments.map((comment) => {
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

export default function ClientAdminFeedbackItemPage({
  feedbackThread: initialFeedbackThread,
}: {
  feedbackThread: Table<'internal_feedback_threads'>;
}) {
  const { data: _feedbackThread } = useGetInternalFeedbackById(
    initialFeedbackThread.id,
    {
      initialData: initialFeedbackThread,
    }
  );

  // this is a hack to tell typescript that the data is not undefined
  // it will never be undefined because we are passing initialData
  const feedbackThread = _feedbackThread ?? initialFeedbackThread;

  return (
    <>
      <div className="space-x-6">
        <span className="text-base py-2 font-[600] text-slate-500">
          <Anchor href="/app_admin">Application Admin Panel</Anchor>
        </span>
        <span className="text-base  py-2 font-[600] text-slate-500">/</span>
        <span className="text-base py-2 font-[600] text-slate-500">
          <Anchor href="/app_admin/feedback">All Feedback</Anchor>
        </span>
        <span className="text-base  py-2 font-[600] text-slate-500">/</span>
        <span className="text-base py-2 bg-blue-50 rounded-lg px-4 font-[700] text-blue-600">
          User's Feedback
        </span>
      </div>

      {/* Page Heading */}
      <BasicPageHeading
        heading={feedbackThread.title}
        subheading={feedbackThread.content}
      />

      {/* Feedback */}

      <div className="space-y-4">
        <div className="flex justify-between items-center ">
          <div className="flex space-x-2">
            {/* Filter : Status*/}
            <div className="flex justify-start">
              <UpdateStatus
                feedbackId={feedbackThread.id}
                currentStatus={feedbackThread.status}
              />
            </div>
            {/* Filter : Priority*/}
            <div className="flex justify-start">
              <UpdatePriority
                feedbackId={feedbackThread.id}
                currentPriority={feedbackThread.priority}
              />
            </div>

            <div className="flex justify-start">
              <UpdateType
                feedbackId={feedbackThread.id}
                currentType={feedbackThread.type}
              />
            </div>
          </div>

          <div className="flex space-x-6">
            <UpdateVisibility
              feedbackId={feedbackThread.id}
              currentVisibility={feedbackThread.open_for_public_discussion}
            />

            <UpdateIsAddedToRoadmap
              feedbackId={feedbackThread.id}
              currentIsAddedToRoadmap={feedbackThread.added_to_roadmap}
            />
          </div>
        </div>
        <div className="w-full bg-slate-100  space-y-6 border px-6 p-4 pb-8 b-slate-300 overflow-hidden rounded-xl ">
          {/* Feedback Conversation */}
          <CommentList feedbackId={feedbackThread.id} />
          {/* Feedback Text Area for Admin */}

          {feedbackThread.status === 'closed' ||
            feedbackThread.status === 'completed' ? (
            <T.Large className="my-6">
              This thread is now closed for discussion.
            </T.Large>
          ) : (
            <AddComment feedbackId={feedbackThread.id} />
          )}
        </div>
      </div>
    </>
  );
}
