import { useLoggedInUser } from "@/hooks/useLoggedInUser";
import { Enum, Table } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { getTeamsInOrganization, getUserTeamRole } from "../supabase/teams";
import supabaseClient from '@/utils/supabase-browser';

export const useGetUserTeamRole = (
  teamId: number,
  {
    initialUserTeamRole,
  }: {
    initialUserTeamRole?: Enum<'project_team_member_role'> | null;
  }
) => {
  const user = useLoggedInUser();
  return useQuery(
    ['getUserTeamRole', user.id],
    async () => {
      return getUserTeamRole(supabaseClient, user.id, teamId);
    },
    {
      initialData: initialUserTeamRole,
    }
  );
};

export const useGetTeamsInOrganization = (
  organizationId: string,
  initialData?: Table<'teams'>[]
) => {
  return useQuery(
    ['getTeamsInOrganization', organizationId],
    async () => {
      return getTeamsInOrganization(supabaseClient, organizationId);
    },
    {
      initialData,
    }
  );
};
