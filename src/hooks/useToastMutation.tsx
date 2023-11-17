'use client';
import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  MutationFunction,
} from '@tanstack/react-query';
import { toast } from 'sonner';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

type MutationFn<TData, TVariables> = MutationFunction<TData, TVariables>;

interface ToastMutationOptions<TData, TError, TVariables>
  extends UseMutationOptions<TData, TError, TVariables> {
  loadingMessage?: string;
  successMessage?: string;
  errorMessage?: string;
}

export function useToastMutation<
  TData = unknown,
  TVariables = unknown,
  TError = unknown,
>(
  mutationFn: MutationFn<TData, TVariables>,
  options?: ToastMutationOptions<TData, TError, TVariables>,
): UseMutationResult<TData, TError, TVariables> {
  const toastIdRef = useRef<string | number | null>(null);
  return useMutation<TData, TError, TVariables>(mutationFn, {
    ...options,
    onMutate: async (variables) => {
      toastIdRef.current = toast.loading(
        options?.loadingMessage ?? 'Loading...',
      );
      if (options?.onMutate) {
        await options.onMutate(variables);
      }
    },
    onSuccess: (data, variables, context) => {
      // router.refresh();
      toast.success(options?.successMessage ?? 'Operation successful', {
        id: toastIdRef.current ?? undefined,
      });
      toastIdRef.current = null;
      if (options?.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    onError: (error, variables, context) => {
      toast.error(options?.errorMessage ?? 'Operation failed', {
        id: toastIdRef.current ?? undefined,
      });
      toastIdRef.current = null;
      if (options?.onError) {
        options.onError(error, variables, context);
      }
    },
  });
}
