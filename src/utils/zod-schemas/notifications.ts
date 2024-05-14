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
  feedbackCreatorFullName: z.string(),
});

const feedbackReceivedCommentPayload = z.object({
  type: z.literal('feedbackReceivedComment'),
  feedbackTitle: z.string(),
  feedbackId: z.string(),
  commenterName: z.string(),
  comment: z.string()
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

const feedbackIsInRoadmapUpdatedPayload = z.object({
  type: z.literal('feedbackIsInRoadmapUpdated'),
  feedbackId: z.string(),
  isInRoadmap: z.boolean()
});

const feedbackVisibilityUpdatedPayload = z.object({
  type: z.literal('feedbackVisibilityUpdated'),
  feedbackId: z.string(),
  isPubliclyVisible: z.boolean()
});

const feedbackFeedbackOpenForCommentUpdatedPayload = z.object({
  type: z.literal('feedbackFeedbackOpenForCommentUpdated'),
  feedbackId: z.string(),
  isOpenForComments: z.boolean()
});

export const userNotificationPayloadSchema = z.union([
  invitedToOrganizationPayload,
  acceptedOrganizationInvitationPayload,
  welcomeNotificationPayload,
  receivedFeedbackPayload,
  feedbackReceivedCommentPayload,
  feedbackStatusChangedPayload,
  feedbackPriorityChangedPayload,
  feedbackTypeUpdatedPayload,
  feedbackIsInRoadmapUpdatedPayload,
  feedbackVisibilityUpdatedPayload,
  feedbackFeedbackOpenForCommentUpdatedPayload
]);

export type UserNotification = z.infer<typeof userNotificationPayloadSchema>;
