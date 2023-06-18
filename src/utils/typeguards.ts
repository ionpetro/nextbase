import { Enum } from '@/types';

/**
Enums: {
      app_admin_role: "moderator" | "admin" | "super_admin"
      internal_blog_post_status: "draft" | "published"
      internal_feedback_thread_priority: "low" | "medium" | "high"
      internal_feedback_thread_status:
        | "open"
        | "under_review"
        | "planned"
        | "closed"
        | "in_progress"
        | "completed"
      internal_feedback_thread_type: "bug" | "feature_request" | "general"
      maintenance_status: "inactive" | "active" | "scheduled"
      organization_join_invitation_link_status:
        | "active"
        | "finished_accepted"
        | "finished_declined"
        | "inactive"
      organization_joining_status:
        | "invited"
        | "joinied"
        | "declined_invitation"
        | "joined"
      organization_member_role: "owner" | "admin" | "member" | "readonly"
      pricing_plan_interval: "day" | "week" | "month" | "year"
      pricing_type: "one_time" | "recurring"
      project_status: "draft" | "pending_approval" | "approved" | "completed"
      project_team_member_role: "admin" | "member" | "readonly"
      subscription_status:
        | "trialing"
        | "active"
        | "canceled"
        | "incomplete"
        | "incomplete_expired"
        | "past_due"
        | "unpaid"
        | "paused"
    }
         */

export const INTERNAL_FEEDBACK_THREAD_STATUS_VALUES = [
  'open',
  'under_review',
  'planned',
  'closed',
  'in_progress',
  'completed',
] as const;

export const INTERNAL_FEEDBACK_THREAD_PRIORITY_VALUES = [
  'low',
  'medium',
  'high',
] as const;

export const APP_ADMIN_ROLE_VALUES = [
  'moderator',
  'admin',
  'super_admin',
] as const;

export const INTERNAL_BLOG_POST_STATUS_VALUES = ['draft', 'published'] as const;

export const INTERNAL_FEEDBACK_THREAD_TYPE_VALUES = [
  'bug',
  'feature_request',
  'general',
] as const;

export const MAINTENANCE_STATUS_VALUES = [
  'inactive',
  'active',
  'scheduled',
] as const;

export const ORGANIZATION_JOIN_INVITATION_LINK_STATUS_VALUES = [
  'active',
  'finished_accepted',
  'finished_declined',
  'inactive',
] as const;

export const ORGANIZATION_JOINING_STATUS_VALUES: Array<
  Enum<'organization_joining_status'>
> = ['invited', 'joined', 'declined_invitation', 'joined'];

export const ORGANIZATION_MEMBER_ROLE_VALUES: Array<
  Enum<'organization_member_role'>
> = ['owner', 'admin', 'member', 'readonly'];

export const PRICING_PLAN_INTERVAL_VALUES: Array<
  Enum<'pricing_plan_interval'>
> = ['day', 'week', 'month', 'year'];

export const PRICING_TYPE_VALUES: Array<Enum<'pricing_type'>> = [
  'one_time',
  'recurring',
];

export const PROJECT_STATUS_VALUES: Array<Enum<'project_status'>> = [
  'draft',
  'pending_approval',
  'approved',
  'completed',
];

export const PROJECT_TEAM_MEMBER_ROLE_VALUES: Array<
  Enum<'project_team_member_role'>
> = ['admin', 'member', 'readonly'];

export const SUBSCRIPTION_STATUS_VALUES: Array<Enum<'subscription_status'>> = [
  'trialing',
  'active',
  'canceled',
  'incomplete',
  'incomplete_expired',
  'past_due',
  'unpaid',
  'paused',
];

export const isInternalFeedbackThreadStatus = (
  value: string
): value is Enum<'internal_feedback_thread_status'> => {
  return INTERNAL_FEEDBACK_THREAD_STATUS_VALUES.includes(value as any);
};

export const isInternalFeedbackThreadPriority = (
  value: string
): value is Enum<'internal_feedback_thread_priority'> => {
  return INTERNAL_FEEDBACK_THREAD_PRIORITY_VALUES.includes(value as any);
};

export const isAppAdminRole = (
  value: string
): value is Enum<'app_admin_role'> => {
  return APP_ADMIN_ROLE_VALUES.includes(value as any);
};

export const isInternalBlogPostStatus = (
  value: string
): value is Enum<'internal_blog_post_status'> => {
  return INTERNAL_BLOG_POST_STATUS_VALUES.includes(value as any);
};

export const isInternalFeedbackThreadType = (
  value: string
): value is Enum<'internal_feedback_thread_type'> => {
  return INTERNAL_FEEDBACK_THREAD_TYPE_VALUES.includes(value as any);
};

export const isMaintenanceStatus = (
  value: string
): value is Enum<'maintenance_status'> => {
  return MAINTENANCE_STATUS_VALUES.includes(value as any);
};

export const isOrganizationJoinInvitationLinkStatus = (
  value: string
): value is Enum<'organization_join_invitation_link_status'> => {
  return ORGANIZATION_JOIN_INVITATION_LINK_STATUS_VALUES.includes(value as any);
};

export const isOrganizationJoiningStatus = (
  value: string
): value is Enum<'organization_joining_status'> => {
  return ORGANIZATION_JOINING_STATUS_VALUES.includes(value as any);
};

export const isOrganizationMemberRole = (
  value: string
): value is Enum<'organization_member_role'> => {
  return ORGANIZATION_MEMBER_ROLE_VALUES.includes(value as any);
};

export const isPricingPlanInterval = (
  value: string
): value is Enum<'pricing_plan_interval'> => {
  return PRICING_PLAN_INTERVAL_VALUES.includes(value as any);
};

export const isPricingType = (value: string): value is Enum<'pricing_type'> => {
  return PRICING_TYPE_VALUES.includes(value as any);
};

export const isProjectStatus = (
  value: string
): value is Enum<'project_status'> => {
  return PROJECT_STATUS_VALUES.includes(value as any);
};

export const isProjectTeamMemberRole = (
  value: string
): value is Enum<'project_team_member_role'> => {
  return PROJECT_TEAM_MEMBER_ROLE_VALUES.includes(value as any);
};

export const isSubscriptionStatus = (
  value: string
): value is Enum<'subscription_status'> => {
  return SUBSCRIPTION_STATUS_VALUES.includes(value as any);
};
