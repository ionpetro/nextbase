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





export const useAdminGetUser = (userId: string) => {
  return useQuery(['appAdminGetUser', userId], async () => {
    const path = `/api/app_admin/get_user/${userId}`;
    const response = await axios.get(path, {
      withCredentials: true,
    });
    return response.data;
  });
};


