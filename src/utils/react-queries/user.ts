import { getUserProfile } from '../supabase/user';
import { useQuery } from '@tanstack/react-query';
import { useLoggedInUser } from '@/hooks/useLoggedInUser';
import { Table } from '@/types';
import { supabaseUserClientComponentClient } from '@/supabase-clients/user/supabaseUserClientComponentClient';

export const useGetUserPublicProfile = (userId: string) => {
  return useQuery(['user', userId], () =>
    getUserProfile(supabaseUserClientComponentClient, userId)
  );
};

export const useUserProfile = (initialData?: Table<'user_profiles'>) => {
  const user = useLoggedInUser();
  return useQuery<Table<'user_profiles'>>(
    ['user-profile', user.id],
    async () => {
      return getUserProfile(supabaseUserClientComponentClient, user.id);
    },
    {
      initialData,
    }
  );
};

export const useGetUserProfileById = (userId: string) => {
  return useQuery(['user-profile', userId], () =>
    getUserProfile(supabaseUserClientComponentClient, userId)
  );
};
