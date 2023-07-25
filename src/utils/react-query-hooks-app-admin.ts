/* ==================== */
/* ADMIN PANEL */
/* ==================== */

import {
  ADMIN_ORGANIZATION_LIST_VIEW_PAGE_SIZE,
  ADMIN_USER_LIST_VIEW_PAGE_SIZE,
} from '@/constants';
import { useLoggedInUser } from '@/hooks/useLoggedInUser';
import { Enum, Table, UnwrapPromise } from '@/types';
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
  useMutation,
} from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useRef } from 'react';
import toast from 'react-hot-toast';
import { getOrganizationsPaginated, getUsersPaginated } from './supabase-admin';
import qs from 'qs';
import {
  InternalBlogPostSchema,
  internalBlogPostSchema,
} from '@/utils/zod-schemas/internalBlog';

export const useGetUsersInfiniteQuery = (
  initialData: UnwrapPromise<ReturnType<typeof getUsersPaginated>>,
  search?: string | undefined
) => {
  return useInfiniteQuery<UnwrapPromise<ReturnType<typeof getUsersPaginated>>>(
    ['getAdminUsersPaginated', search],
    async ({ pageParam }) => {
      const path = `/api/app_admin/get-users-paginated/${pageParam}`;
      const pathWithQuery = search ? `${path}?search=${search}` : path;
      const response = await axios.get(pathWithQuery, {
        withCredentials: true,
      });
      if (response.status !== 200) throw new Error(response.statusText);
      return response.data;
    },
    {
      getNextPageParam: (lastPage, _pages) => {
        const pageNumber = lastPage[0];
        const rows = lastPage[1];

        if (rows.length < ADMIN_USER_LIST_VIEW_PAGE_SIZE) return undefined;
        return pageNumber + 1;
      },
      initialData: {
        pageParams: [0],
        pages: [initialData],
      },
    }
  );
};

export const useGetOrganizationsInfiniteQuery = (
  initialData: UnwrapPromise<ReturnType<typeof getOrganizationsPaginated>>,
  search?: string | undefined
) => {
  return useInfiniteQuery<
    UnwrapPromise<ReturnType<typeof getOrganizationsPaginated>>
  >(
    ['getAdminOrganizationsPaginated', search],
    async ({ pageParam }) => {
      const path = `/api/app_admin/get-organizations-paginated/${pageParam}`;
      const pathWithQuery = search ? `${path}?search=${search}` : path;
      const response = await axios.get(pathWithQuery, {
        withCredentials: true,
      });
      if (response.status !== 200) throw new Error(response.statusText);
      return response.data;
    },
    {
      getNextPageParam: (lastPage, _pages) => {
        const pageNumber = lastPage[0];
        const rows = lastPage[1];

        if (rows.length < ADMIN_ORGANIZATION_LIST_VIEW_PAGE_SIZE)
          return undefined;
        return pageNumber + 1;
      },
      initialData: {
        pageParams: [0],
        pages: [initialData],
      },
    }
  );
};

const getUserImpersonationUrl = async (userId: string) => {
  const fetchPath = `/api/app_admin/impersonate_user/${userId}`;
  const response = await axios.get<{
    url: string;
  }>(fetchPath, {
    method: 'GET',
    withCredentials: true,
  });

  if (response.status < 200 || response.status >= 300) {
    throw new Error(
      `Failed to fetch user impersonation url. Status: ${response.status}`
    );
  }

  return response.data;
};

export const useFetchUserImpersonationUrl = () => {
  const toastRef = useRef<string | null>(null);
  return useMutation((userId: string) => getUserImpersonationUrl(userId), {
    // don't cache
    cacheTime: 0,
    onMutate: () => {
      const toastId = toast.loading('Fetching login url...');
      toastRef.current = toastId;
    },
    onSuccess: (data) => {
      // You can optionally use a toast
      window.navigator.clipboard.writeText(data.url).then(() => {
        toast.success('Copied login url to clipboard', {
          id: toastRef.current ?? undefined,
        });
        toastRef.current = null;
      });
    },
    onError: (error) => {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to fetch login url';
      toast.error('Failed to fetch login url ' + errorMessage, {
        id: toastRef.current ?? undefined,
      });
      toastRef.current = null;
    },
  });
};

export const useEnableMaintenanceModeMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}) => {
  const queryClient = useQueryClient();
  const toastRef = useRef<string | null>(null);
  return useMutation(
    async () => {
      const path = `/api/app_admin/maintenance-mode/enable-maintenance-mode`;
      const response = await axios.get(path, {
        withCredentials: true,
      });
      if (response.status !== 200) throw new Error(response.statusText);
      return response.data;
    },
    {
      onMutate: () => {
        const toastId = toast.loading('Enabling maintenance mode...');
        toastRef.current = toastId;
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['getIsAppInMaintenanceMode']);

        onSuccess?.();
        toast.success('App is now in maintenance mode', {
          id: toastRef.current ?? undefined,
        });
        toastRef.current = null;
      },
      onError: (error) => {
        onError?.(error);
        toast.error('Failed to set app maintenance mode', {
          id: toastRef.current ?? undefined,
        });
        toastRef.current = null;
      },
      cacheTime: 0,
    }
  );
};

export const useDisableMaintenanceModeMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}) => {
  const queryClient = useQueryClient();
  const toastRef = useRef<string | null>(null);

  return useMutation(
    async () => {
      const path = `/api/app_admin/maintenance-mode/disable-maintenance-mode`;
      const response = await axios.get(path, {
        withCredentials: true,
      });
      if (response.status !== 200) throw new Error(response.statusText);
      return response.data;
    },
    {
      onMutate: () => {
        const toastId = toast.loading('Disabling maintenance mode...');
        toastRef.current = toastId;
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['getIsAppInMaintenanceMode']);

        onSuccess?.();
        toast.success('App is no longer in maintenance mode', {
          id: toastRef.current ?? undefined,
        });
        toastRef.current = null;
      },
      onError: (error) => {
        onError?.(error);
        toast.error('Failed to disable app maintenance mode', {
          id: toastRef.current ?? undefined,
        });
        toastRef.current = null;
      },
      cacheTime: 0,
    }
  );
};

export const useCreateUserMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}) => {
  const queryClient = useQueryClient();
  const toastRef = useRef<string | null>(null);

  return useMutation(
    async ({ email }: { email: string }) => {
      const path = `/api/app_admin/create_account/${email}`;
      const response = await axios.post(
        path,
        {},
        {
          withCredentials: true,
        }
      );
      return response.data;
    },
    {
      onMutate: () => {
        const toastId = toast.loading('Creating user...');
        toastRef.current = toastId;
      },
      onSuccess: () => {
        onSuccess?.();
        toast.success('User created', {
          id: toastRef.current ?? undefined,
        });
        toastRef.current = null;
        queryClient.invalidateQueries({
          queryKey: ['getAdminUsersPaginated'],
        });
      },
      onError: (error) => {
        onError?.(error);
        let message = `Failed to create user`;
        if (error instanceof AxiosError) {
          message += `: ${error.response?.data.error}`;
        } else if (error instanceof Error) {
          message += `: ${error.message}`;
        } else if (typeof error === 'string') {
          message += `: ${error}`;
        }

        toast.error(message, {
          id: toastRef.current ?? undefined,
        });
        toastRef.current = null;
      },
    }
  );
};

export const useSendLoginLinkMutation = () => {
  const toastRef = useRef<string | null>(null);

  return useMutation(
    async ({ email }: { email: string }) => {
      const path = `/api/app_admin/send_login_link/${email}`;
      const response = await axios.post(
        path,
        {},
        {
          withCredentials: true,
        }
      );
      return response.data;
    },
    {
      onMutate: () => {
        const toastId = toast.loading('Sending login link...');
        toastRef.current = toastId;
      },
      onSuccess: () => {
        toast.success('Login link sent', {
          id: toastRef.current ?? undefined,
        });
        toastRef.current = null;
      },
      onError: (error) => {
        let message = `Failed to invite user`;
        if (error instanceof AxiosError) {
          message += `: ${error.response?.data.error}`;
        } else if (error instanceof Error) {
          message += `: ${error.message}`;
        } else if (typeof error === 'string') {
          message += `: ${error}`;
        }

        toast.error(message, {
          id: toastRef.current ?? undefined,
        });
        toastRef.current = null;
      },
    }
  );
};

export const useGetInternalFeedbackById = (
  feedbackId: string,
  {
    initialData,
  }: {
    initialData?: Table<'internal_feedback_threads'>;
  }
) => {
  return useQuery(
    ['internal_feedback', feedbackId],
    async () => {
      const path = `/api/app_admin/internal_feedback/${feedbackId}/getInternalFeedbackById`;
      const response = await axios.get(path, {
        withCredentials: true,
      });
      return response.data;
    },
    {
      initialData,
    }
  );
};

export const useGetInternalFeedbackComments = (feedbackId: string) => {
  return useQuery(['internal_feedback_comments', feedbackId], async () => {
    const path = `/api/app_admin/internal_feedback/${feedbackId}/getInternalFeedbackComments`;
    const response = await axios.get(path, {
      withCredentials: true,
    });
    return response.data;
  });
};

export const useUpdateInternalFeedbackThreadStatus = (
  feedbackId: string,
  {
    onSuccess,
    onError,
  }: {
    onSuccess?: () => void;
    onError?: (error: unknown) => void;
  } = {}
) => {
  const toastRef = useRef<string | null>(null);
  const queryClient = useQueryClient();
  return useMutation(
    async (status: Enum<'internal_feedback_thread_status'>) => {
      const path = `/api/app_admin/internal_feedback/${feedbackId}/updateInternalFeedbackStatus`;
      const response = await axios.patch(
        path,
        {
          status,
        },
        {
          withCredentials: true,
        }
      );
      return response.data;
    },
    {
      onMutate: () => {
        const toastId = toast.loading('Updating feedback status...');
        toastRef.current = toastId;
      },
      onSuccess: () => {
        onSuccess?.();
        toast.success('Feedback status updated', {
          id: toastRef.current ?? undefined,
        });
        toastRef.current = null;
        queryClient.invalidateQueries(['internal_feedback', feedbackId]);
        queryClient.refetchQueries(['internal_feedback', feedbackId]);
      },
      onError: (error) => {
        onError?.(error);
        let message = `Failed to update feedback status`;
        if (error instanceof AxiosError) {
          message += `: ${error.response?.data.error}`;
        } else if (error instanceof Error) {
          message += `: ${error.message}`;
        } else if (typeof error === 'string') {
          message += `: ${error}`;
        }

        toast.error(message, {
          id: toastRef.current ?? undefined,
        });
        toastRef.current = null;
      },
    }
  );
};

export const useUpdateInternalFeedbackThreadPriority = (
  feedbackId: string,
  {
    onSuccess,
    onError,
  }: {
    onSuccess?: () => void;
    onError?: (error: unknown) => void;
  } = {}
) => {
  const toastRef = useRef<string | null>(null);
  const queryClient = useQueryClient();
  return useMutation(
    async (priority: Enum<'internal_feedback_thread_priority'>) => {
      const path = `/api/app_admin/internal_feedback/${feedbackId}/updateInternalFeedbackPriority`;
      const response = await axios.patch(
        path,
        {
          priority,
        },
        {
          withCredentials: true,
        }
      );
      return response.data;
    },
    {
      onMutate: () => {
        const toastId = toast.loading('Updating feedback priority...');
        toastRef.current = toastId;
      },
      onSuccess: () => {
        onSuccess?.();
        toast.success('Feedback priority updated', {
          id: toastRef.current ?? undefined,
        });
        toastRef.current = null;
        queryClient.invalidateQueries(['internal_feedback', feedbackId]);
        queryClient.refetchQueries(['internal_feedback', feedbackId]);
      },
      onError: (error) => {
        onError?.(error);
        let message = `Failed to update feedback priority`;
        if (error instanceof AxiosError) {
          message += `: ${error.response?.data.error}`;
        } else if (error instanceof Error) {
          message += `: ${error.message}`;
        } else if (typeof error === 'string') {
          message += `: ${error}`;
        }

        toast.error(message, {
          id: toastRef.current ?? undefined,
        });
        toastRef.current = null;
      },
    }
  );
};

export const useUpdateInternalFeedbackThreadType = (
  feedbackId: string,
  {
    onSuccess,
    onError,
  }: {
    onSuccess?: () => void;
    onError?: (error: unknown) => void;
  } = {}
) => {
  const toastRef = useRef<string | null>(null);
  const queryClient = useQueryClient();
  return useMutation(
    async ({ type }: {
      feedbackId: string,
      type: Enum<'internal_feedback_thread_type'>
    }) => {
      const path = `/api/app_admin/internal_feedback/${feedbackId}/updateInternalFeedbackType`;
      const response = await axios.patch(
        path,
        {
          type,
        },
        {
          withCredentials: true,
        }
      );
      return response.data;
    },
    {
      onMutate: () => {
        const toastId = toast.loading('Updating feedback type...');
        toastRef.current = toastId;
      },
      onSuccess: () => {
        onSuccess?.();
        toast.success('Feedback type updated', {
          id: toastRef.current ?? undefined,
        });
        toastRef.current = null;
        queryClient.invalidateQueries(['internal_feedback', feedbackId]);
        queryClient.refetchQueries(['internal_feedback', feedbackId]);
      },
      onError: (error) => {
        onError?.(error);
        let message = `Failed to update feedback type`;
        if (error instanceof AxiosError) {
          message += `: ${error.response?.data.error}`;
        } else if (error instanceof Error) {
          message += `: ${error.message}`;
        } else if (typeof error === 'string') {
          message += `: ${error}`;
        }

        toast.error(message, {
          id: toastRef.current ?? undefined,
        });
        toastRef.current = null;
      },
    }
  );
};

export const useUpdateInternalFeedbackIsOpenForDiscussion = (
  feedbackId: string,
  {
    onSuccess,
    onError,
  }: {
    onSuccess?: () => void;
    onError?: (error: unknown) => void;
  } = {}
) => {
  const toastRef = useRef<string | null>(null);
  const queryClient = useQueryClient();
  return useMutation(
    async (isOpenForPublicDiscussion: boolean) => {
      const path = `/api/app_admin/internal_feedback/${feedbackId}/updateInternalFeedbackIsOpenForDiscussion`;
      const response = await axios.patch(
        path,
        {
          isOpenForPublicDiscussion,
        },
        {
          withCredentials: true,
        }
      );
      return response.data;
    },
    {
      onMutate: () => {
        const toastId = toast.loading(
          'Updating feedback open for public discussion...'
        );
        toastRef.current = toastId;
      },
      onSuccess: () => {
        onSuccess?.();
        toast.success('Feedback open for public discussion updated', {
          id: toastRef.current ?? undefined,
        });
        toastRef.current = null;
        queryClient.invalidateQueries(['internal_feedback', feedbackId]);
        queryClient.refetchQueries(['internal_feedback', feedbackId]);
      },
      onError: (error) => {
        onError?.(error);
        let message = `Failed to update feedback open for public discussion`;
        if (error instanceof AxiosError) {
          message += `: ${error.response?.data.error}`;
        } else if (error instanceof Error) {
          message += `: ${error.message}`;
        } else if (typeof error === 'string') {
          message += `: ${error}`;
        }

        toast.error(message, {
          id: toastRef.current ?? undefined,
        });
        toastRef.current = null;
      },
    }
  );
};

export const useUpdateInternalFeedbackThreadIsAddedToRoadmap = (
  feedbackId: string,
  {
    onSuccess,
    onError,
  }: {
    onSuccess?: () => void;
    onError?: (error: unknown) => void;
  } = {}
) => {
  const toastRef = useRef<string | null>(null);
  const queryClient = useQueryClient();
  return useMutation(
    async (isAddedToRoadmap: boolean) => {
      const path = `/api/app_admin/internal_feedback/${feedbackId}/updateInternalFeedbackIsAddedToRoadmap`;
      const response = await axios.patch(
        path,
        {
          isAddedToRoadmap,
        },
        {
          withCredentials: true,
        }
      );
      return response.data;
    },
    {
      onMutate: () => {
        const toastId = toast.loading('Updating feedback added to roadmap...');
        toastRef.current = toastId;
      },
      onSuccess: () => {
        onSuccess?.();
        toast.success('Feedback added to roadmap updated', {
          id: toastRef.current ?? undefined,
        });
        toastRef.current = null;
        queryClient.invalidateQueries(['internal_feedback', feedbackId]);
        queryClient.refetchQueries(['internal_feedback', feedbackId]);
      },
      onError: (error) => {
        onError?.(error);
        let message = `Failed to update feedback added to roadmap`;
        if (error instanceof AxiosError) {
          message += `: ${error.response?.data.error}`;
        } else if (error instanceof Error) {
          message += `: ${error.message}`;
        } else if (typeof error === 'string') {
          message += `: ${error}`;
        }

        toast.error(message, {
          id: toastRef.current ?? undefined,
        });
        toastRef.current = null;
      },
    }
  );
};

export const useAddCommentToInternalFeedbackThread = (
  feedbackId: string,
  {
    onSuccess,
    onError,
  }: {
    onSuccess?: () => void;
    onError?: (error: unknown) => void;
  } = {}
) => {
  const toastRef = useRef<string | null>(null);
  const queryClient = useQueryClient();
  const userId = useLoggedInUser().id;
  return useMutation(
    async (comment: string) => {
      const path = `/api/app_admin/internal_feedback/${feedbackId}/addCommentToInternalFeedbackThread`;
      const response = await axios.post(
        path,
        {
          comment,
          userId,
        },
        {
          withCredentials: true,
        }
      );
      return response.data;
    },
    {
      onMutate: () => {
        const toastId = toast.loading('Adding comment to feedback thread...');
        toastRef.current = toastId;
      },
      onSuccess: () => {
        onSuccess?.();
        toast.success('Comment added to feedback thread', {
          id: toastRef.current ?? undefined,
        });
        toastRef.current = null;
        queryClient.invalidateQueries([
          'internal_feedback_comments',
          feedbackId,
        ]);
        queryClient.refetchQueries(['internal_feedback_comments', feedbackId]);
      },
      onError: (error) => {
        onError?.(error);
        let message = `Failed to add comment to feedback thread`;
        if (error instanceof AxiosError) {
          message += `: ${error.response?.data.error}`;
        } else if (error instanceof Error) {
          message += `: ${error.message}`;
        } else if (typeof error === 'string') {
          message += `: ${error}`;
        }

        toast.error(message, {
          id: toastRef.current ?? undefined,
        });
        toastRef.current = null;
      },
    }
  );
};

export const useGetAllInternalFeedback = ({
  query,
  filters,
}: {
  query: string;
  filters: {
    types: Array<Enum<'internal_feedback_thread_type'>>;
    priorities: Array<Enum<'internal_feedback_thread_priority'>>;
    statuses: Array<Enum<'internal_feedback_thread_status'>>;
  };
}) => {
  return useQuery(
    ['appAdminGetAllInternalFeedback', query, filters],
    async () => {
      const path = `/api/app_admin/internal_feedback/getAllInternalFeedback`;
      const response = await axios.get(path, {
        params: {
          query,
          ...filters,
        },
        withCredentials: true,
        paramsSerializer: (params) => {
          return qs.stringify(params, { arrayFormat: 'repeat' });
        },
      });
      return response.data;
    }
  );
};

export const useAdminGetUser = (userId: string) => {
  return useQuery(['appAdminGetUser', userId], async () => {
    const path = `/api/app_admin/get_user/${userId}`;
    const response = await axios.get(path, {
      withCredentials: true,
    });
    return response.data;
  });
};

export const useCreateChangelog = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
} = {}) => {
  const toastRef = useRef<string | null>(null);
  const userId = useLoggedInUser().id;
  const queryClient = useQueryClient();
  return useMutation(
    async ({ title, changes }: { title: string; changes: string }) => {
      const path = `/api/app_admin/internal_changelog/create`;
      const response = await axios.post(
        path,
        {
          title,
          changes,
          userId,
        },
        {
          withCredentials: true,
        }
      );
      return response.data;
    },
    {
      onMutate: () => {
        const toastId = toast.loading('Creating changelog...');
        toastRef.current = toastId;
      },
      onSuccess: () => {
        onSuccess?.();
        toast.success('Changelog created', {
          id: toastRef.current ?? undefined,
        });
        toastRef.current = null;
        queryClient.invalidateQueries(['internal_changelog_list']);
      },
      onError: (error) => {
        onError?.(error);
        let message = `Failed to create changelog`;
        if (error instanceof AxiosError) {
          message += `: ${error.response?.data.error}`;
        } else if (error instanceof Error) {
          message += `: ${error.message}`;
        } else if (typeof error === 'string') {
          message += `: ${error}`;
        }

        toast.error(message, {
          id: toastRef.current ?? undefined,
        });
        toastRef.current = null;
      },
    }
  );
};
