import { useLoggedInUser } from "@/hooks/useLoggedInUser";
import { Enum, Table, UnwrapPromise } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addUserToProjectTeam, getTeamById, getTeamMembersByTeamId, getTeamsInOrganization, getUserTeamRole, removeUserFromTeam, updateUserRoleInProjectTeam } from "../supabase/teams";
import supabaseClient from '@/utils/supabase-browser';
import { useRef } from "react";
import { toast } from 'react-hot-toast';

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

export const useGetTeamById = (
  teamId: number,
  initialData?: Table<'teams'>
) => {
  return useQuery(
    ['getTeamById', teamId],
    async () => {
      return getTeamById(supabaseClient, teamId);
    },
    {
      initialData,
    }
  );
};



export const useAddUserToProjectTeam = () => {
  const toastRef = useRef<string | null>(null);
  const queryClient = useQueryClient();
  return useMutation(
    async ({
      userId,
      teamId,
      role,
    }: {
      userId: string;
      teamId: number;
      role: Enum<'project_team_member_role'>;
    }) => {
      return addUserToProjectTeam(supabaseClient, userId, teamId, role);
    },
    {
      onMutate: () => {
        toastRef.current = toast.loading('Adding user to team...');
      },
      onSuccess: (_data, { teamId }) => {
        toast.success('User added to team!', {
          id: toastRef.current ?? undefined,
        });
        queryClient.invalidateQueries(['getProjectTeamMembers', teamId]);
      },
      onError: (error: Error) => {
        toast.error(String(error), {
          id: toastRef.current ?? undefined,
        });
      },
    }
  );
};

export const useUpdateUserRoleInTeam = () => {
  const toastRef = useRef<string | null>(null);
  const queryClient = useQueryClient();
  return useMutation(
    async ({
      userId,
      teamId,
      newRole,
    }: {
      userId: string;
      teamId: number;
      newRole: Enum<'project_team_member_role'>;
    }) => {
      return updateUserRoleInProjectTeam(supabaseClient, userId, teamId, newRole);
    },
    {
      onMutate: () => {
        toastRef.current = toast.loading('Updating user role...');
      },
      onSuccess: (_data, { teamId }) => {
        toast.success('User role updated!', {
          id: toastRef.current ?? undefined,
        });
        queryClient.invalidateQueries(['getTeamMembers', teamId]);
      },
      onError: (error: Error) => {
        toast.error(String(error), {
          id: toastRef.current ?? undefined,
        });
      },
    }
  );
};

// Remove user from team
export const useRemoveUserFromTeam = () => {
  const toastRef = useRef<string | null>(null);
  const queryClient = useQueryClient();

  return useMutation(
    async ({ userId, teamId }: { userId: string; teamId: number }) => {
      return removeUserFromTeam(supabaseClient, userId, teamId);
    },
    {
      onMutate: () => {
        toastRef.current = toast.loading('Removing user from team...');
      },
      onSuccess: (_data, { teamId }) => {
        toast.success('User removed from team!', {
          id: toastRef.current ?? undefined,
        });
        queryClient.invalidateQueries(['getTeamMembers', teamId]);
      },
      onError: (error: Error) => {
        toast.error(String(error), {
          id: toastRef.current ?? undefined,
        });
      },
    }
  );
};

// User management hooks
export const useGetTeamMembers = (
  teamId: number,
  initialData: UnwrapPromise<ReturnType<typeof getTeamMembersByTeamId>>
) => {
  return useQuery(
    ['getTeamMembers', teamId],
    async () => {
      return getTeamMembersByTeamId(supabaseClient, teamId);
    },
    {
      initialData,
    }
  );
};

