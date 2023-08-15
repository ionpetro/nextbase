'use client';

import { Button } from '@/components/ui/Button/ButtonShadcn';
import BasicPageHeading from '@/components/ui/Headings/BasicPageHeading';
import { Switch } from '@/components/ui/Switch';
import { Label } from '@/components/ui/Label';
import { ComponentProps, useRef, useState } from 'react';
import { Enum, Table } from '@/types';
import { UpdateInternalFeedbackStatusDialog } from '@/components/presentational/tailwind/UpdateInternalFeedbackStatusDialog';
import { UpdateInternalFeedbackPriorityDialog } from '@/components/presentational/tailwind/UpdateInternalFeedbackPriorityDialog';
import { getPublicUserAvatarUrl } from '@/utils/helpers';

import { UpdateInternalFeedbackTypeDialog } from '@/components/presentational/tailwind/UpdateInternalFeedbackTypeDialog';
import { Anchor } from '@/components/Anchor';
import { T } from '@/components/ui/Typography';
import Image from 'next/image';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

function UpdateType({
  feedbackId,
  currentType,
  updateInternalFeedbackTypeAction,
}: {
  feedbackId: string;
  currentType: Enum<'internal_feedback_thread_type'>;
  updateInternalFeedbackTypeAction: ({
    type,
    feedbackId,
  }: {
    type: Enum<'internal_feedback_thread_type'>;
    feedbackId: string;
  }) => Promise<void>;
}) {
  const toastRef = useRef<string | null>(null);
  const router = useRouter();
  const { mutate, isLoading } = useMutation(
    async ({
      type,
    }: {
      feedbackId: string;
      type: Enum<'internal_feedback_thread_type'>;
    }) => {
      await updateInternalFeedbackTypeAction({ type, feedbackId });
    },
    {
      onMutate: () => {
        const toastId = toast.loading('Updating feedback type...');
        toastRef.current = toastId;
      },
      onSuccess: () => {
        toast.success('Feedback type updated', {
          id: toastRef.current ?? undefined,
        });
        toastRef.current = null;
        router.refresh();
      },
      onError: (error) => {
        let message = `Failed to update feedback type`;
        if (error instanceof Error) {
          message += `: ${error.message}`;
        } else if (typeof error === 'string') {
          message += `: ${error}`;
        }

        toast.error(message, {
          id: toastRef.current ?? undefined,
        });
        toastRef.current = null;
      },
    }
  );

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
  updateInternalFeedbackPriorityAction,
}: {
  feedbackId: string;
  currentPriority: Enum<'internal_feedback_thread_priority'>;
  updateInternalFeedbackPriorityAction: ({
    priority,
    feedbackId,
  }: {
    priority: Enum<'internal_feedback_thread_priority'>;
    feedbackId: string;
  }) => Promise<void>;
}) {
  const toastRef = useRef<string | null>(null);
  const router = useRouter();
  const { mutate, isLoading } = useMutation(
    async (priority: Enum<'internal_feedback_thread_priority'>) => {
      await updateInternalFeedbackPriorityAction({ priority, feedbackId });
    },
    {
      onMutate: () => {
        const toastId = toast.loading('Updating feedback priority...');
        toastRef.current = toastId;
      },
      onSuccess: () => {
        toast.success('Feedback priority updated', {
          id: toastRef.current ?? undefined,
        });
        toastRef.current = null;
        router.refresh();
      },
      onError: (error) => {
        let message = `Failed to update feedback priority`;
        if (error instanceof Error) {
          message += `: ${error.message}`;
        } else if (typeof error === 'string') {
          message += `: ${error}`;
        }

        toast.error(message, {
          id: toastRef.current ?? undefined,
        });
        toastRef.current = null;
      },
    }
  );

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
  updateInternalFeedbackStatusAction,
}: {
  feedbackId: string;
  currentStatus: Enum<'internal_feedback_thread_status'>;
  updateInternalFeedbackStatusAction: ({
    status,
    feedbackId,
  }: {
    status: Enum<'internal_feedback_thread_status'>;
    feedbackId: string;
  }) => Promise<void>;
}) {
  const toastRef = useRef<string | null>(null);
  const router = useRouter();

  const { mutate, isLoading } = useMutation(
    async (status: Enum<'internal_feedback_thread_status'>) => {
      await updateInternalFeedbackStatusAction({ status, feedbackId });
    },
    {
      onMutate: () => {
        const toastId = toast.loading('Updating feedback status...');
        toastRef.current = toastId;
      },
      onSuccess: () => {
        toast.success('Feedback status updated', {
          id: toastRef.current ?? undefined,
        });
        toastRef.current = null;
        router.refresh();
      },
      onError: (error) => {
        let message = `Failed to update feedback status`;
        if (error instanceof Error) {
          message += `: ${error.message}`;
        } else if (typeof error === 'string') {
          message += `: ${error}`;
        }

        toast.error(message, {
          id: toastRef.current ?? undefined,
        });
        toastRef.current = null;
      },
    }
  );

  return (
    <UpdateInternalFeedbackStatusDialog
      currentStatus={currentStatus}
      isLoading={isLoading}
      onUpdate={mutate}
    />
  );
}

function AddComment({
  feedbackId,
  addCommentAction,
}: {
  feedbackId: string;
  addCommentAction: ({
    comment,
    feedbackId,
  }: {
    comment: string;
    feedbackId: string;
  }) => Promise<void>;
}) {
  const toastRef = useRef<string | null>(null);
  const router = useRouter();
  const [content, setContent] = useState('');
  const { mutate, isLoading } = useMutation(
    async (comment: string) => {
      return addCommentAction({ comment, feedbackId });
    },
    {
      onMutate: () => {
        const toastId = toast.loading('Adding comment to feedback thread...');
        toastRef.current = toastId;
      },
      onSuccess: () => {
        toast.success('Comment added to feedback thread', {
          id: toastRef.current ?? undefined,
        });
        toastRef.current = null;
        setContent('');
        router.refresh();
      },
      onError: (error) => {
        let message = `Failed to add comment to feedback thread`;
        if (error instanceof Error) {
          message += `: ${error.message}`;
        } else if (typeof error === 'string') {
          message += `: ${error}`;
        }

        toast.error(message, {
          id: toastRef.current ?? undefined,
        });
        toastRef.current = null;
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
  updateInternalFeedbackIsOpenToDiscussionAction,
}: {
  feedbackId: string;
  currentVisibility: boolean;
  updateInternalFeedbackIsOpenToDiscussionAction: ({
    isOpenToDiscussion,
    feedbackId,
  }: {
    isOpenToDiscussion: boolean;
    feedbackId: string;
  }) => Promise<void>;
}) {
  const router = useRouter();
  const toastRef = useRef<string | null>(null);
  const { mutate, isLoading } = useMutation(
    async (isOpenToDiscussion: boolean) => {
      await updateInternalFeedbackIsOpenToDiscussionAction({
        isOpenToDiscussion,
        feedbackId,
      });
    },
    {
      onMutate: () => {
        const toastId = toast.loading(
          'Updating feedback open for public discussion...'
        );
        toastRef.current = toastId;
      },
      onSuccess: () => {
        toast.success('Feedback open for public discussion updated', {
          id: toastRef.current ?? undefined,
        });
        toastRef.current = null;
        router.refresh();
      },
      onError: (error) => {
        let message = `Failed to update feedback open for public discussion`;
        if (error instanceof Error) {
          message += `: ${error.message}`;
        } else if (typeof error === 'string') {
          message += `: ${error}`;
        }

        toast.error(message, {
          id: toastRef.current ?? undefined,
        });
        toastRef.current = null;
      },
    }
  );

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
  updateInternalFeedbackIsAddedToRoadmapAction,
}: {
  feedbackId: string;
  currentIsAddedToRoadmap: boolean;
  updateInternalFeedbackIsAddedToRoadmapAction: ({
    isAddedToRoadmap,
    feedbackId,
  }: {
    isAddedToRoadmap: boolean;
    feedbackId: string;
  }) => Promise<void>;
}) {
  const toastRef = useRef<string | null>(null);
  const router = useRouter();
  const { mutate, isLoading } = useMutation(
    async (isAddedToRoadmap: boolean) => {
      await updateInternalFeedbackIsAddedToRoadmapAction({
        isAddedToRoadmap,
        feedbackId,
      });
    },
    {
      onMutate: () => {
        const toastId = toast.loading('Updating feedback added to roadmap...');
        toastRef.current = toastId;
      },
      onSuccess: () => {
        toast.success('Feedback added to roadmap updated', {
          id: toastRef.current ?? undefined,
        });
        toastRef.current = null;
        router.refresh();
      },
      onError: (error) => {
        let message = `Failed to update feedback added to roadmap`;
        if (error instanceof Error) {
          message += `: ${error.message}`;
        } else if (typeof error === 'string') {
          message += `: ${error}`;
        }

        toast.error(message, {
          id: toastRef.current ?? undefined,
        });
        toastRef.current = null;
      },
    }
  );

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
  getUserProfileAction,
}: {
  userId: string;
  comment: string;
  getUserProfileAction: (userId: string) => Promise<Table<'user_profiles'>>;
}) {
  const { data: userData, isLoading } = useQuery(
    ['feedback-get-user-profile', userId],
    async () => {
      return await getUserProfileAction(userId);
    }
  );
  if (!userData || isLoading) {
    return null;
  }
  const userFullName = userData.full_name ?? `User ${userData.id}`;
  return (
    <div className="flex items-start space-x-4">
      <span className="flex space-x-2 items-center">
        <Image
          className="rounded-full border border-slate-500 h-[24px] w-[24px]"
          alt={userFullName}
          src={getPublicUserAvatarUrl(userData.avatar_url)}
          height={24}
          width={24}
        />
      </span>
      <div className="w-[560px] space-y-2">
        <div>
          <p className="text-base font-[600]">{userFullName}</p>
          <p className="text-base font-[500] text-slate-600">{comment}</p>
        </div>
      </div>
    </div>
  );
}

function CommentList({
  feedbackId,
  comments,
  getUserProfileAction,
}: {
  feedbackId: string;
  comments: Table<'internal_feedback_comments'>[];
  getUserProfileAction: (userId: string) => Promise<Table<'user_profiles'>>;
}) {
  return (
    <div className="space-y-6">
      <p className="text-base font-[600] text-black ">
        Replies ({comments.length})
      </p>
      {comments.map((comment) => {
        return (
          <FeedbackComponent
            getUserProfileAction={getUserProfileAction}
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
  feedbackThread,
  updateInternalFeedbackStatusAction,
  updateInternalFeedbackPriorityAction,
  updateInternalFeedbackTypeAction,
  updateInternalFeedbackIsOpenToDiscussionAction,
  updateInternalFeedbackIsAddedToRoadmapAction,
  addCommentAction,
  comments,
  getUserProfileAction,
}: {
  feedbackThread: Table<'internal_feedback_threads'>;
  comments: Table<'internal_feedback_comments'>[];
  getUserProfileAction: (userId: string) => Promise<Table<'user_profiles'>>;
} & Pick<
  ComponentProps<typeof UpdateStatus>,
  'updateInternalFeedbackStatusAction'
> &
  Pick<
    ComponentProps<typeof UpdatePriority>,
    'updateInternalFeedbackPriorityAction'
  > &
  Pick<ComponentProps<typeof UpdateType>, 'updateInternalFeedbackTypeAction'> &
  Pick<
    ComponentProps<typeof UpdateVisibility>,
    'updateInternalFeedbackIsOpenToDiscussionAction'
  > &
  Pick<
    ComponentProps<typeof UpdateIsAddedToRoadmap>,
    'updateInternalFeedbackIsAddedToRoadmapAction'
  > &
  Pick<ComponentProps<typeof AddComment>, 'addCommentAction'>) {
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
                updateInternalFeedbackStatusAction={
                  updateInternalFeedbackStatusAction
                }
                feedbackId={feedbackThread.id}
                currentStatus={feedbackThread.status}
              />
            </div>
            {/* Filter : Priority*/}
            <div className="flex justify-start">
              <UpdatePriority
                updateInternalFeedbackPriorityAction={
                  updateInternalFeedbackPriorityAction
                }
                feedbackId={feedbackThread.id}
                currentPriority={feedbackThread.priority}
              />
            </div>

            <div className="flex justify-start">
              <UpdateType
                updateInternalFeedbackTypeAction={
                  updateInternalFeedbackTypeAction
                }
                feedbackId={feedbackThread.id}
                currentType={feedbackThread.type}
              />
            </div>
          </div>

          <div className="flex space-x-6">
            <UpdateVisibility
              updateInternalFeedbackIsOpenToDiscussionAction={
                updateInternalFeedbackIsOpenToDiscussionAction
              }
              feedbackId={feedbackThread.id}
              currentVisibility={feedbackThread.open_for_public_discussion}
            />

            <UpdateIsAddedToRoadmap
              updateInternalFeedbackIsAddedToRoadmapAction={
                updateInternalFeedbackIsAddedToRoadmapAction
              }
              feedbackId={feedbackThread.id}
              currentIsAddedToRoadmap={feedbackThread.added_to_roadmap}
            />
          </div>
        </div>
        <div className="w-full bg-slate-100  space-y-6 border px-6 p-4 pb-8 b-slate-300 overflow-hidden rounded-xl ">
          {/* Feedback Conversation */}
          <CommentList
            getUserProfileAction={getUserProfileAction}
            comments={comments}
            feedbackId={feedbackThread.id}
          />
          {/* Feedback Text Area for Admin */}

          {feedbackThread.status === 'closed' ||
            feedbackThread.status === 'completed' ? (
            <T.Large className="my-6">
              This thread is now closed for discussion.
            </T.Large>
          ) : (
            <AddComment
              addCommentAction={addCommentAction}
              feedbackId={feedbackThread.id}
            />
          )}
        </div>
      </div>
    </>
  );
}
