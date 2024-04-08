import { z } from 'zod';

const invitedToOrganizationPayload = z.object({
  organizationName: z.string(),
  organizationId: z.string(),
  inviterFullName: z.string(),
  invitationId: z.string(),
  type: z.literal('invitedToOrganization'),
});

export const acceptedOrganizationInvitationPayload = z.object({
  userFullName: z.string(),
  organizationId: z.string(),
  type: z.literal('acceptedOrganizationInvitation'),
});

export const welcomeNotificationPayload = z.object({
  type: z.literal('welcome'),
});

const receivedFeedbackPayload = z.object({
  type: z.literal('receivedFeedback'),
  feedbackId: z.string(),
  feedbackTitle: z.string(),
});

const feedbackReceivedCommentPayload = z.object({
  type: z.literal('feedbackReceivedComment'),
  feedbackId: z.string(),
  commentId: z.string(),
  commenterName: z.string(),
});

const userCommentedOnFeedbackPayload = z.object({
  type: z.literal('userCommentedOnFeedback'),
  feedbackId: z.string(),
  commentId: z.string(),
  commenterName: z.string(),
});

const feedbackStatusChangedPayload = z.object({
  type: z.literal('feedbackStatusChanged'),
  feedbackId: z.string(),
  oldStatus: z.string(),
  newStatus: z.string(),
});

const feedbackPriorityChangedPayload = z.object({
  type: z.literal('feedbackPriorityChanged'),
  feedbackId: z.string(),
  oldPriority: z.string(),
  newPriority: z.string(),
});

const feedbackTypeUpdatedPayload = z.object({
  type: z.literal('feedbackTypeUpdated'),
  feedbackId: z.string(),
  oldType: z.string(),
  newType: z.string(),
});

const feedbackAddedToRoadmapPayload = z.object({
  type: z.literal('feedbackAddedToRoadmap'),
  feedbackId: z.string(),
  roadmapTitle: z.string(),
});

const feedbackVisibilityChangedPayload = z.object({
  type: z.literal('feedbackVisibilityChanged'),
  feedbackId: z.string(),
  visibility: z.enum(['public', 'private', 'internal']),
});

export const userNotificationPayloadSchema = z.union([
  invitedToOrganizationPayload,
  acceptedOrganizationInvitationPayload,
  welcomeNotificationPayload,
  receivedFeedbackPayload,
  feedbackReceivedCommentPayload,
  userCommentedOnFeedbackPayload,
  feedbackStatusChangedPayload,
  feedbackPriorityChangedPayload,
  feedbackTypeUpdatedPayload,
  feedbackAddedToRoadmapPayload,
  feedbackVisibilityChangedPayload,
]);

export type UserNotification = z.infer<typeof userNotificationPayloadSchema>;
