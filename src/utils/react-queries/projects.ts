import { Enum, Table } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getApprovedProjectsByTeamId, getCompletedProjectsByTeamId, getDraftProjectsByTeamId, getPendingApprovalProjectsByTeamId, createProject, deleteProject, updateProjectName, updateProjectStatus, getProjectById, addProjectComment, getProjectComments, submitProjectForApproval, markProjectAsCompleted, approveProject, completeProject, rejectProject } from "../supabase/projects";
import supabaseClient from '@/utils/supabase-browser';
import { useRef } from "react";
import { toast } from "react-hot-toast";
import { useLoggedInUser } from "@/hooks/useLoggedInUser";

export const useGetProjectById = (
  projectId: string,
  initialData?: Table<'projects'>
) => {
  return useQuery(
    ['getProjectById', projectId],
    async () => {
      return await getProjectById(supabaseClient, projectId);
    },
    {
      initialData,
    }
  );
};

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



export const useCreateProject = (onSuccess?: (project: Table<'projects'>) => void) => {
  const toastRef = useRef<string | null>(null);
  const queryClient = useQueryClient();
  return useMutation(
    async ({
      organizationId,
      teamId,
      name,
    }: {
      organizationId: string;
      teamId: number;
      name: string;
    }) => {
      return await createProject(supabaseClient, organizationId, teamId, name);
    },
    {
      onMutate: async ({ name },) => {
        toastRef.current = toast.loading(`Creating project ${name}...`);
      },
      onSuccess: (data) => {
        toast.success(`Created project ${data.name}`, {
          id: toastRef.current ?? undefined,
        });
        onSuccess && onSuccess(data);
        if (data.project_status === 'draft') {
          queryClient.invalidateQueries(['getDraftProjectsByTeam', data.team_id]);
        } else if (data.project_status === 'approved') {
          queryClient.invalidateQueries(['getApprovedProjectsByTeam', data.team_id]);
        } else if (data.project_status === 'completed') {
          queryClient.invalidateQueries(['getCompletedProjectsByTeam', data.team_id]);
        } else {
          queryClient.invalidateQueries(['getPendingApprovalProjectsByTeam', data.team_id]);
        }
      },
      onError: (error) => {
        toast.error(String(error), {
          id: toastRef.current ?? undefined,
        });
      }
    }
  );
}

export const useUpdateProjectName = (onSuccess?: (project: Table<'projects'>) => void) => {
  const toastRef = useRef<string | null>(null);
  return useMutation(
    async ({
      projectId,
      name,
    }: {
      projectId: string;
      name: string;
    }) => {
      return await updateProjectName(supabaseClient, projectId, name);
    },
    {
      onMutate: async ({ name }) => {
        toastRef.current = toast.loading(`Updating project name to ${name}...`);
      },
      onSuccess: (data) => {
        toast.success(`Updated project name to ${data.name}`, {
          id: toastRef.current ?? undefined,
        });
        onSuccess && onSuccess(data);
      },
      onError: (error) => {
        toast.error(String(error), {
          id: toastRef.current ?? undefined,
        });
      }
    }
  );
}

export const useUpdateProjectStatus = (onSuccess?: (project: Table<'projects'>) => void) => {
  const toastRef = useRef<string | null>(null);
  return useMutation(
    async ({
      projectId,
      status,
    }: {
      projectId: string;
      status: Enum<'project_status'>;
    }) => {
      return await updateProjectStatus(supabaseClient, projectId, status);
    },
    {
      onMutate: async ({ status }) => {
        toastRef.current = toast.loading(`Updating project status to ${status}...`);
      },
      onSuccess: (data) => {
        toast.success(`Updated project status to ${data.project_status}`, {
          id: toastRef.current ?? undefined,
        });
        onSuccess && onSuccess(data);
      },
      onError: (error) => {
        toast.error(String(error), {
          id: toastRef.current ?? undefined,
        });
      }
    }
  );
}

export const useDeleteProject = (onSuccess?: () => void) => {
  const toastRef = useRef<string | null>(null);
  return useMutation(
    async ({
      projectId,
    }: {
      projectId: string;
    }) => {
      return await deleteProject(supabaseClient, projectId);
    },
    {
      onMutate: async () => {
        toastRef.current = toast.loading(`Deleting project ...`);
      },
      onSuccess: () => {
        toast.success(`Deleted project `, {
          id: toastRef.current ?? undefined,
        });
        onSuccess && onSuccess();
      },
      onError: (error) => {
        toast.error(String(error), {
          id: toastRef.current ?? undefined,
        });
      }
    }
  );
}

// React Query Wrapper for getProjectComments
export const useGetProjectComments = (projectId: string) => {
  return useQuery(
    ['projectComments', projectId],
    async () => {
      return await getProjectComments(supabaseClient, projectId);
    }
  );
};


export const useAddProjectComment = (projectId: string) => {
  const toastRef = useRef<string | null>(null);
  const queryClient = useQueryClient();
  const user = useLoggedInUser();
  return useMutation(
    async ({ text }: { text: string }) => {
      return await addProjectComment(supabaseClient, projectId, text, user.id);
    },
    {
      onMutate: async () => {
        toastRef.current = toast.loading(`Adding comment...`);
      },
      onSuccess: (_data) => {
        toast.success(`Comment added successfully!`, {
          id: toastRef.current ?? undefined,
        });
        queryClient.invalidateQueries(['projectComments', projectId]);
      },
      onError: (error) => {
        toast.error(String(error), {
          id: toastRef.current ?? undefined,
        });
      }
    }
  );
};

// React Query Wrapper for submitProjectForApproval
export const useSubmitProjectForApproval = () => {
  const toastRef = useRef<string | null>(null);
  const queryClient = useQueryClient();
  return useMutation(
    async (projectId: string) => {
      return await submitProjectForApproval(supabaseClient, projectId);
    },
    {
      onMutate: async () => {
        toastRef.current = toast.loading(`Submitting project for approval...`);
      },
      onSuccess: (_data, projectId) => {
        toast.success(`Project submitted for approval successfully!`, {
          id: toastRef.current ?? undefined,
        });
        queryClient.invalidateQueries(['getDraftProjectsByTeam', projectId]);
        queryClient.invalidateQueries(['getPendingApprovalProjectsByTeam', projectId]);
      },
      onError: (error) => {
        toast.error(String(error), {
          id: toastRef.current ?? undefined,
        });
      }
    }
  );
};

// React Query Wrapper for markProjectAsCompleted
export const useCompleteProject = () => {
  const toastRef = useRef<string | null>(null);
  const queryClient = useQueryClient();
  return useMutation(
    async (projectId: string) => {
      return await completeProject(supabaseClient, projectId);
    },
    {
      onMutate: async () => {
        toastRef.current = toast.loading(`Marking project as completed...`);
      },
      onSuccess: (_data, projectId) => {
        toast.success(`Project marked as completed successfully!`, {
          id: toastRef.current ?? undefined,
        });
        queryClient.invalidateQueries(['getApprovedProjectsByTeam', projectId]);
        queryClient.invalidateQueries(['getCompletedProjectsByTeam', projectId]);
      },
      onError: (error) => {
        toast.error(String(error), {
          id: toastRef.current ?? undefined,
        });
      }
    }
  );
};

// React Query Wrapper for approveProject
export const useApproveProject = () => {
  const toastRef = useRef<string | null>(null);
  const queryClient = useQueryClient();
  return useMutation(
    async (projectId: string) => {
      return await approveProject(supabaseClient, projectId);
    },
    {
      onMutate: async () => {
        toastRef.current = toast.loading(`Approving project...`);
      },
      onSuccess: (_data, projectId) => {
        toast.success(`Project approved successfully!`, {
          id: toastRef.current ?? undefined,
        });
        queryClient.invalidateQueries(['getPendingApprovalProjectsByTeam', projectId]);
        queryClient.invalidateQueries(['getApprovedProjectsByTeam', projectId]);
      },
      onError: (error) => {
        toast.error(String(error), {
          id: toastRef.current ?? undefined,
        });
      }
    }
  );
};


export const useRejectProject = () => {
  const toastRef = useRef<string | null>(null);
  const queryClient = useQueryClient();
  return useMutation(
    async (projectId: string) => {
      return await rejectProject(supabaseClient, projectId);
    },
    {
      onMutate: async () => {
        toastRef.current = toast.loading(`Rejecting project...`);
      },
      onSuccess: (_data, projectId) => {
        toast.success(`Project rejected successfully!`, {
          id: toastRef.current ?? undefined,
        });
        queryClient.invalidateQueries(['getPendingApprovalProjectsByTeam', projectId]);
        queryClient.invalidateQueries(['getDraftProjectsByTeam', projectId]);
      },
      onError: (error) => {
        toast.error(String(error), {
          id: toastRef.current ?? undefined,
        });
      }
    }
  );
};
