import { Json } from '@/lib/database.types';
import { UserNotification } from '@/utils/zod-schemas/notifications';
import { createSupabaseUserServerActionClient } from '@/supabase-clients/user/createSupabaseUserServerActionClient';

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
