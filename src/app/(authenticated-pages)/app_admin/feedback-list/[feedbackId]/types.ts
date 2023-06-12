import { Enum, Table } from '@/types';

export type AddCommentToInternalFeedbackThread = (
  feedbackId: string,
  comment: string,
  userId: string
) => Promise<null>;

export type GetInternalFeedbackById = (
  feedbackId: string
) => Promise<Table<'internal_feedback_threads'>>;
export type GetInternalFeedbackComments = (
  feedbackId: string
) => Promise<Array<Table<'internal_feedback_comments'>>>;

export type UpdateInternalFeedbackIsAddedToRoadmap = (
  feedbackId: string,
  isAddedToRoadmap: boolean
) => Promise<null>;

export type UpdateInternalFeedbackIsOpenForDiscussion = (
  feedbackId: string,
  isOpenForDiscussion: boolean
) => Promise<null>;

export type UpdateInternalFeedbackPriority = (
  feedbackId: string,
  priority: Enum<'internal_feedback_thread_priority'>
) => Promise<null>;

export type UpdateInternalFeedbackStatus = (
  feedbackId: string,
  status: Enum<'internal_feedback_thread_status'>
) => Promise<null>;

export type UpdateInternalFeedbackType = (
  feedbackId: string,
  type: Enum<'internal_feedback_thread_type'>
) => Promise<null>;
