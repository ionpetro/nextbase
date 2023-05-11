import { Table } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { getApprovedProjectsByTeamId, getCompletedProjectsByTeamId, getDraftProjectsByTeamId, getPendingApprovalProjectsByTeamId } from "../supabase/teams";
import supabaseClient from '@/utils/supabase-browser';

export const useGetDraftProjectsByTeam = (
  teamId: number,
  initialData?: Table<'projects'>[]
) => {
  return useQuery(
    ['getDraftProjectsByTeam', teamId],
    async () => {
      return await getDraftProjectsByTeamId(supabaseClient, teamId);
    },
    {
      initialData,
    }
  );
};

export const useGetPendingApprovalProjectsByTeam = (
  teamId: number,
  initialData?: Table<'projects'>[]
) => {
  return useQuery(
    ['getPendingApprovalProjectsByTeam', teamId],
    async () => {
      return await getPendingApprovalProjectsByTeamId(supabaseClient, teamId);
    },
    {
      initialData,
    }
  );
};

export const useGetApprovedProjectsByTeam = (
  teamId: number,
  initialData?: Table<'projects'>[]
) => {
  return useQuery(
    ['getApprovedProjectsByTeam', teamId],
    async () => {
      return await getApprovedProjectsByTeamId(supabaseClient, teamId);
    },
    {
      initialData,
    }
  );
};

export const useGetCompletedProjectsByTeam = (
  teamId: number,
  initialData?: Table<'projects'>[]
) => {
  return useQuery(
    ['getCompletedProjectsByTeam', teamId],
    async () => {
      return await getCompletedProjectsByTeamId(supabaseClient, teamId);
    },
    {
      initialData,
    }
  );
};
