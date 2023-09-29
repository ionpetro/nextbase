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

export const userNotificationPayloadSchema = z.union([
  invitedToOrganizationPayload,
  acceptedOrganizationInvitationPayload,
  welcomeNotificationPayload,
]);

export type UserNotification = z.infer<typeof userNotificationPayloadSchema>;
