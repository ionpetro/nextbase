import { getUserProfile } from "../supabase/user"
import supabaseClient from '@/utils/supabase-browser';
import { useQuery } from "@tanstack/react-query";

export const useGetUserPublicProfile = (userId: string) => {
  return useQuery(
    ['user', userId],
    () => getUserProfile(supabaseClient, userId),
  )
}
