import { useRef } from 'react';
import { useFormSubmission } from './useFormSubmission';
import { toast } from 'sonner';
import {
  ErrorServerActionState,
  ServerActionState,
  SuccessServerActionState,
} from './types';
import { FormStatus } from 'react-dom';

export function useSonnerFormSubmission<T>(
  state: ServerActionState<T>,
  {
    onLoading,
    onError,
    onSuccess,
    loadingMessage,
  }: {
    onLoading?: () => void;
    onError?: (state: ErrorServerActionState<T>) => void;
    onSuccess?: (state: SuccessServerActionState<T>) => void;
    loadingMessage?: string;
  }
): { formStatus: FormStatus } {
  const toastRef = useRef<string | number | null>(null);
  return useFormSubmission<T>(state, {
    onSuccess: (successState) => {
      toast.success(successState.message, {
        id: toastRef.current ?? undefined,
      });
      toastRef.current = null;
      onSuccess?.(successState);
    },
    onLoading: () => {
      const message = loadingMessage ?? 'Loading...';
      toastRef.current = toast.loading(message);
      onLoading?.();
    },
    onError: (errorState) => {
      toast.error(errorState.message, {
        id: toastRef.current ?? undefined,
      });
      toastRef.current = null;
      onError?.(errorState);
    },
  });
}
