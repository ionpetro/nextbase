/**
 * [WARNING: USE SPARINGLY AND ONLY WHEN NECESSARY]
 * These are queries that are selectively run as application admin for convenience.
 * Another option is to harden RLS policies even further for these scenarios. But the drawback
 * is that all those policies which contain select queries across other tables have the tendency to make the
 * queries slower to run. So, we have to be careful about the trade-offs.
 * Use this sparingly and only when necessary and in exceptional scenarios.
 * */
'use server';

import { Json } from '@/lib/database.types';
import { supabaseAdminClient } from '@/supabase-clients/admin/supabaseAdminClient';

/**
 * [Elevated Query]
 * Get the organization details for the invitation. This query is elevated to run as application admin.
 * Reason: The user is not yet part of the organization and hence cannot see the organization details.
 * Adding an RLS policy to allow inviter to see the organization details would be a security risk. We could
 * split the organization table into separate tables for public and private data. But that would make the
 * organization queries slower to run as they would involve joins across multiple tables.
 * Hence, we selectively run this query as application admin and only within the context of the invitation.
 */
export async function getInvitationOrganizationDetails(organizationId: string) {
  const { data, error } = await supabaseAdminClient
    .from('organizations')
    .select('id, title')
    .eq('id', organizationId)
    .single();

  if (error) {
    throw error;
  }

  return data;
}

/**
 * [Elevated Query]
 * create notification for all admins
 * Reason: A user is not able to view the list of all admins. Hence, we run this query as application admin.
 * This function is called createAdminNotificationForUserActivity because
 * it is used to notify admins when a logged in user performs an activity.
 * */
export const createAdminNotificationForUserActivity = async (payload: Json) => {
  async function getAllAdminUserIds() {
    const { data, error } = await supabaseAdminClient
      .from('user_roles')
      .select('user_id')
      .eq('role', 'admin');

    if (error) {
      throw error;
    }

    return data.map((row) => row.user_id);
  }

  const adminUserIds = await getAllAdminUserIds();
  const { data: notification, error } = await supabaseAdminClient
    .from('user_notifications')
    .insert(
      adminUserIds.map((userId) => ({
        user_id: userId,
        payload,
      })),
    );
  if (error) throw error;
  return notification;
};
