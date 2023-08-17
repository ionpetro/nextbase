import { AppSupabaseClient, Table } from '@/types';
import { UserNotification } from '../zod-schemas/notifications';

export const createNotification = async (
  supabaseClient: AppSupabaseClient,
  userId: string,
  payload: any
) => {
  const { data: notification, error } = await supabaseClient
    .from('user_notifications')
    .insert({
      user_id: userId,
      payload,
    });
  if (error) throw error;
  return notification;
};

export const readNotification = async (
  supabaseClient: AppSupabaseClient,
  notificationId: string
) => {
  const { data: notification, error } = await supabaseClient
    .from('user_notifications')
    .update({ is_read: true })
    .match({ id: notificationId })
    .select('*');
  if (error) throw error;
  return notification;
};

export const readAllNotifications = async (
  supabaseClient: AppSupabaseClient,
  userId: string
) => {
  const { data: notifications, error } = await supabaseClient
    .from('user_notifications')
    .update({ is_read: true, is_seen: true })
    .match({ user_id: userId });
  if (error) throw error;
  return notifications;
};

export const seeNotification = async (
  supabaseClient: AppSupabaseClient,
  notificationId: string
) => {
  const { data: notification, error } = await supabaseClient
    .from('user_notifications')
    .update({ is_seen: true })
    .match({ id: notificationId })
    .select('*');
  if (error) throw error;
  return notification;
};

export const getPaginatedNotifications = async (
  supabaseClient: AppSupabaseClient,
  userId: string,
  pageNumber: number,
  limit: number
): Promise<[number, Array<Table<'user_notifications'>>]> => {
  const { data: notifications, error } = await supabaseClient
    .from('user_notifications')
    .select('*')
    .match({ user_id: userId })
    .order('created_at', { ascending: false })
    .range(pageNumber * limit, (pageNumber + 1) * limit - 1);
  if (error) throw error;
  return [pageNumber, notifications];
};

export const getUnseenNotificationIds = async (
  supabaseClient: AppSupabaseClient,
  userId: string
) => {
  const { data: notifications, error } = await supabaseClient
    .from('user_notifications')
    .select('id')
    .eq('is_seen', false)
    .eq('user_id', userId);
  if (error) throw error;
  return notifications;
};

export const createAcceptedOrgInvitationNotification = async (
  supabaseClient: AppSupabaseClient,
  userId: string,
  {
    organizationId,
    inviteeFullName,
  }: {
    organizationId: string;
    inviteeFullName: string;
  }
) => {
  const payload: Extract<
    UserNotification,
    {
      type: 'acceptedOrganizationInvitation';
    }
  > = {
    organizationId,
    type: 'acceptedOrganizationInvitation',
    userFullName: inviteeFullName,
  };

  return await createNotification(supabaseClient, userId, payload);
};
