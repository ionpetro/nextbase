import { Enum, Table } from '@/types';
import { User } from '@supabase/supabase-js';

export type AdminGetUserData = {
  userProfile: Table<'user_profiles'>;
  userPrivateInfo: Table<'user_private_info'>;
  authUser: {
    user: User;
  };
  isAppAdmin: boolean;
};

export type AdminGetAllInternalFeedack = (args: {
  query?: string | undefined;
  types: Array<Enum<'internal_feedback_thread_type'>>;
  statuses: Array<Enum<'internal_feedback_thread_status'>>;
  priorities: Array<Enum<'internal_feedback_thread_priority'>>;
}) => Promise<Array<Table<'internal_feedback_threads'>>>;
