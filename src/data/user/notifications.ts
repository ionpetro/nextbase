import { AppSupabaseClient, Table } from '@/types';
import { Json } from '@/lib/database.types';
import { UserNotification } from '@/utils/zod-schemas/notifications';
import { createSupabaseUserServerActionClient } from '@/supabase-clients/user/createSupabaseUserServerActionClient';
import { createSupabaseUserServerComponentClient } from '@/supabase-clients/user/createSupabaseUserServerComponentClient';

export const createNotification = async (userId: string, payload: Json) => {
  const supabaseClient = createSupabaseUserServerActionClient();
  const { data: notification, error } = await supabaseClient
    .from('user_notifications')
    .insert({
      user_id: userId,
      payload,
    });
  if (error) throw error;
  return notification;
};

export const readNotification = async (notificationId: string) => {
  const supabaseClient = createSupabaseUserServerActionClient();

  const { data: notification, error } = await supabaseClient
    .from('user_notifications')
    .update({ is_read: true })
    .match({ id: notificationId })
    .select('*');
  if (error) throw error;
  return notification;
};

export const readAllNotifications = async (userId: string) => {
  const supabaseClient = createSupabaseUserServerActionClient();

  const { data: notifications, error } = await supabaseClient
    .from('user_notifications')
    .update({ is_read: true, is_seen: true })
    .match({ user_id: userId });
  if (error) throw error;
  return notifications;
};

export const seeNotification = async (notificationId: string) => {
  const supabaseClient = createSupabaseUserServerActionClient();

  const { data: notification, error } = await supabaseClient
    .from('user_notifications')
    .update({ is_seen: true })
    .match({ id: notificationId })
    .select('*');
  if (error) throw error;
  return notification;
};

export const getPaginatedNotifications = async (
  userId: string,
  pageNumber: number,
  limit: number,
): Promise<[number, Array<Table<'user_notifications'>>]> => {
  const supabaseClient = createSupabaseUserServerComponentClient();
  const { data: notifications, error } = await supabaseClient
    .from('user_notifications')
    .select('*')
    .match({ user_id: userId })
    .order('created_at', { ascending: false })
    .range(pageNumber * limit, (pageNumber + 1) * limit - 1);
  if (error) throw error;
  return [pageNumber, notifications];
};

export const getUnseenNotificationIds = async (userId: string) => {
  const supabaseClient = createSupabaseUserServerComponentClient();
  const { data: notifications, error } = await supabaseClient
    .from('user_notifications')
    .select('id')
    .eq('is_seen', false)
    .eq('user_id', userId);
  if (error) throw error;
  return notifications;
};

export const createAcceptedOrgInvitationNotification = async (
  userId: string,
  {
    organizationId,
    inviteeFullName,
  }: {
    organizationId: string;
    inviteeFullName: string;
  },
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

  return await createNotification(userId, payload);
};

export const createInvitedToOrganizationNotification = async (
  userId: string,
  {
    organizationId,
    organizationName,
    inviterFullName,
    invitationId,
  }: {
    organizationId: string;
    organizationName: string;
    inviterFullName: string;
    invitationId: string;
  },
) => {
  const payload: Extract<
    UserNotification,
    {
      type: 'invitedToOrganization';
    }
  > = {
    organizationId,
    organizationName,
    inviterFullName,
    invitationId,
    type: 'invitedToOrganization',
  };

  return await createNotification(userId, payload);
};
