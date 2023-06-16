'use client';

import { Button } from '@/components/ui/Button/ButtonShadcn';
import BasicPageHeading from '@/components/ui/Headings/BasicPageHeading';
import { Switch } from '@/components/ui/Switch';
import { Label } from '@/components/ui/Label';
import { useRef, useState } from 'react';
import userImage from 'public/assets/user-image.png';
import adminImage from 'public/assets/admin-image.png';
import { Enum, Table } from '@/types';
import {
  AddCommentToInternalFeedbackThread,
  GetInternalFeedbackById,
  GetInternalFeedbackComments,
  UpdateInternalFeedbackIsAddedToRoadmap,
  UpdateInternalFeedbackIsOpenForDiscussion,
  UpdateInternalFeedbackPriority,
  UpdateInternalFeedbackStatus,
  UpdateInternalFeedbackType,
} from './types';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useLoggedInUser } from '@/hooks/useLoggedInUser';
import { UpdateInternalFeedbackStatusDialog } from './UpdateInternalFeedbackStatusDialog';
import { UpdateInternalFeedbackPriorityDialog } from './UpdateInternalFeedbackPriorityDialog';
import { getPublicUserAvatarUrl } from '@/utils/helpers';

import { UpdateInternalFeedbackTypeDialog } from './UpdateInternalFeedbackTypeDialog';
import { Anchor } from '@/components/Anchor';
import { T } from '@/components/ui/Typography';
import Image from 'next/image';
import { UserAvatar } from '@/components/UserAvatar';
import { AdminViewUserDetails } from '../../_components/AdminViewUserDetails';
import { AdminGetUserData } from '../../types';
import { useAdminViewUserDetails } from '../../_hooks/useAdminViewUserDetails';

function UpdateType({
  feedbackId,
  currentType,
  updateInternalFeedbackType,
}: {
  feedbackId: string;
  currentType: Enum<'internal_feedback_thread_type'>;
  updateInternalFeedbackType: UpdateInternalFeedbackType;
}) {
  const queryClient = useQueryClient();
  const toastRef = useRef<string | null>(null);

  const { mutate, isLoading } = useMutation(
    async (newType: Enum<'internal_feedback_thread_type'>) => {
      return updateInternalFeedbackType(feedbackId, newType);
    },
    {
      onMutate: () => {
        toastRef.current = toast.loading('Updating type');
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['internal_feedback', feedbackId]);
        queryClient.refetchQueries(['internal_feedback', feedbackId]);
        toast.success('Type updated successfully', {
          id: toastRef.current ?? undefined,
        });
        toastRef.current = null;
      },
      onError: () => {
        toast.error('Error updating type', {
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
    />
  );
}

function UpdatePriority({
  feedbackId,
  currentPriority,
  updateInternalFeedbackPriority,
}: {
  feedbackId: string;
  currentPriority: Enum<'internal_feedback_thread_priority'>;
  updateInternalFeedbackPriority: UpdateInternalFeedbackPriority;
}) {
  const queryClient = useQueryClient();
  const toastRef = useRef<string | null>(null);

  const { mutate, isLoading } = useMutation(
    async (newPriority: Enum<'internal_feedback_thread_priority'>) => {
      return updateInternalFeedbackPriority(feedbackId, newPriority);
    },
    {
      onMutate: () => {
        toastRef.current = toast.loading('Updating priority');
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['internal_feedback', feedbackId]);
        queryClient.refetchQueries(['internal_feedback', feedbackId]);
        toast.success('Priority updated successfully', {
          id: toastRef.current ?? undefined,
        });
        toastRef.current = null;
      },
      onError: () => {
        toast.error('Error updating priority', {
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
  updateInternalFeedbackStatus,
}: {
  feedbackId: string;
  currentStatus: Enum<'internal_feedback_thread_status'>;
  updateInternalFeedbackStatus: UpdateInternalFeedbackStatus;
}) {
  const queryClient = useQueryClient();
  const toastRef = useRef<string | null>(null);

  const { mutate, isLoading } = useMutation(
    async (newStatus: Enum<'internal_feedback_thread_status'>) => {
      return updateInternalFeedbackStatus(feedbackId, newStatus);
    },
    {
      onMutate: () => {
        toastRef.current = toast.loading('Updating status');
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['internal_feedback', feedbackId]);
        queryClient.refetchQueries(['internal_feedback', feedbackId]);
        toast.success('Status updated successfully', {
          id: toastRef.current ?? undefined,
        });
        toastRef.current = null;
      },
      onError: () => {
        toast.error('Error updating status', {
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
  addCommentToInternalFeedbackThread,
  feedbackId,
}: {
  addCommentToInternalFeedbackThread: AddCommentToInternalFeedbackThread;
  feedbackId: string;
}) {
  const queryClient = useQueryClient();
  const user = useLoggedInUser();
  const toastRef = useRef<string | null>(null);
  const [content, setContent] = useState('');
  const { mutate, isLoading } = useMutation(
    async () => {
      return addCommentToInternalFeedbackThread(feedbackId, content, user.id);
    },
    {
      onMutate: () => {
        toastRef.current = toast.loading('Adding comment');
      },
      onSuccess: () => {
        queryClient.invalidateQueries([
          'internal_feedback_comments',
          feedbackId,
        ]);
        toast.success('Comment added successfully', {
          id: toastRef.current ?? undefined,
        });
        toastRef.current = null;
        setContent('');
      },
      onError: () => {
        toast.error('Error adding comment', {
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
            mutate();
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
  updateInternalFeedbackIsOpenForDiscussion,
}: {
  feedbackId: string;
  currentVisibility: boolean;
  updateInternalFeedbackIsOpenForDiscussion: UpdateInternalFeedbackIsOpenForDiscussion;
}) {
  const queryClient = useQueryClient();
  const toastRef = useRef<string | null>(null);

  const { mutate, isLoading } = useMutation(
    async (newVisibility: boolean) => {
      return updateInternalFeedbackIsOpenForDiscussion(
        feedbackId,
        newVisibility
      );
    },
    {
      onMutate: () => {
        toastRef.current = toast.loading('Updating visibility');
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['internal_feedback', feedbackId]);
        queryClient.refetchQueries(['internal_feedback', feedbackId]);
        toast.success('Visibility updated successfully', {
          id: toastRef.current ?? undefined,
        });
        toastRef.current = null;
      },
      onError: () => {
        toast.error('Error updating visibility', {
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
  updateInternalFeedbackIsAddedToRoadmap,
}: {
  feedbackId: string;
  currentIsAddedToRoadmap: boolean;
  updateInternalFeedbackIsAddedToRoadmap: UpdateInternalFeedbackIsAddedToRoadmap;
}) {
  const queryClient = useQueryClient();
  const toastRef = useRef<string | null>(null);

  const { mutate, isLoading } = useMutation(
    async (newStatus: boolean) => {
      return updateInternalFeedbackIsAddedToRoadmap(feedbackId, newStatus);
    },
    {
      onMutate: () => {
        toastRef.current = toast.loading('Updating... ');
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['internal_feedback', feedbackId]);
        queryClient.refetchQueries(['internal_feedback', feedbackId]);
        toast.success('Updated successfully', {
          id: toastRef.current ?? undefined,
        });
        toastRef.current = null;
      },
      onError: () => {
        toast.error('Error updating ', {
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
}: {
  userId: string;
  comment: string;
}) {
  const { data: userData, isLoading } = useAdminViewUserDetails(userId);
  if (!userData || isLoading) {
    return null;
  }
  return (
    <div className="flex items-start space-x-4">
      <span className="flex space-x-2 items-center">
        <Image
          className="rounded-full border border-slate-500"
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

function CommentList({
  feedbackId,
  getInternalFeedbackComments,
}: {
  feedbackId: string;
  getInternalFeedbackComments: GetInternalFeedbackComments;
}) {
  const { data: comments, isLoading } = useQuery(
    ['internal_feedback_comments', feedbackId],
    async () => {
      return getInternalFeedbackComments(feedbackId);
    }
  );

  if (!comments || isLoading) {
    return null;
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
  addCommentToInternalFeedbackThread,
  getInternalFeedbackById,
  getInternalFeedbackComments,
  updateInternalFeedbackIsAddedToRoadmap,
  updateInternalFeedbackIsOpenForDiscussion,
  updateInternalFeedbackPriority,
  updateInternalFeedbackStatus,
  updateInternalFeedbackType,
  feedbackThread: initialFeedbackThread,
}: {
  addCommentToInternalFeedbackThread: AddCommentToInternalFeedbackThread;
  getInternalFeedbackById: GetInternalFeedbackById;
  getInternalFeedbackComments: GetInternalFeedbackComments;
  updateInternalFeedbackIsAddedToRoadmap: UpdateInternalFeedbackIsAddedToRoadmap;
  updateInternalFeedbackIsOpenForDiscussion: UpdateInternalFeedbackIsOpenForDiscussion;
  updateInternalFeedbackPriority: UpdateInternalFeedbackPriority;
  updateInternalFeedbackStatus: UpdateInternalFeedbackStatus;
  updateInternalFeedbackType: UpdateInternalFeedbackType;
  feedbackThread: Table<'internal_feedback_threads'>;
}) {
  const queryClient = useQueryClient();
  const { data: _feedbackThread } = useQuery(
    ['internal_feedback', initialFeedbackThread.id],
    async () => {
      console.log('refetching');
      return getInternalFeedbackById(initialFeedbackThread.id);
    },
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
          <Anchor href="/app_admin/feedback-list">All Feedback</Anchor>
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
                updateInternalFeedbackStatus={updateInternalFeedbackStatus}
              />
            </div>
            {/* Filter : Priority*/}
            <div className="flex justify-start">
              <UpdatePriority
                feedbackId={feedbackThread.id}
                currentPriority={feedbackThread.priority}
                updateInternalFeedbackPriority={updateInternalFeedbackPriority}
              />
            </div>

            <div className="flex justify-start">
              <UpdateType
                feedbackId={feedbackThread.id}
                currentType={feedbackThread.type}
                updateInternalFeedbackType={updateInternalFeedbackType}
              />
            </div>
          </div>

          <div className="flex space-x-6">
            <UpdateVisibility
              feedbackId={feedbackThread.id}
              currentVisibility={feedbackThread.open_for_public_discussion}
              updateInternalFeedbackIsOpenForDiscussion={
                updateInternalFeedbackIsOpenForDiscussion
              }
            />

            <UpdateIsAddedToRoadmap
              feedbackId={feedbackThread.id}
              currentIsAddedToRoadmap={feedbackThread.added_to_roadmap}
              updateInternalFeedbackIsAddedToRoadmap={
                updateInternalFeedbackIsAddedToRoadmap
              }
            />
          </div>
        </div>
        <div className="w-full bg-slate-100  space-y-6 border px-6 p-4 pb-8 b-slate-300 overflow-hidden rounded-xl ">
          {/* Feedback Conversation */}
          <CommentList
            feedbackId={feedbackThread.id}
            getInternalFeedbackComments={getInternalFeedbackComments}
          />
          {/* Feedback Text Area for Admin */}

          {feedbackThread.status === 'closed' ||
            feedbackThread.status === 'completed' ? (
            <T.Large className="my-6">
              This thread is now closed for discussion.
            </T.Large>
          ) : (
            <AddComment
              addCommentToInternalFeedbackThread={
                addCommentToInternalFeedbackThread
              }
              feedbackId={feedbackThread.id}
            />
          )}
        </div>
      </div>
    </>
  );
}
