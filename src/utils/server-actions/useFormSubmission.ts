import { useCallback, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { useFreshCallback } from 'rooks';
import {
  ErrorServerActionState,
  ServerActionState,
  SuccessServerActionState,
} from './types';

// eslint-disable-next-line @typescript-eslint/no-empty-function
function noop() { }

export function useFormSubmission<T = undefined>(
  state: ServerActionState<T>,
  {
    onSuccess = noop,
    onError = noop,
    onLoading = noop,
  }: {
    onSuccess?: (state: SuccessServerActionState<T>) => void;
    onError?: (state: ErrorServerActionState<T>) => void;
    onLoading?: () => void;
  }
) {
  const formStatus = useFormStatus();
  const onSuccessRef = useFreshCallback(onSuccess);
  const onErrorRef = useFreshCallback(onError);
  const onLoadingRef = useFreshCallback(onLoading);

  const handleServerActionResponse = useCallback(() => {
    if (state.status === 'idle') {
      return;
    }
    if (state.status === 'success') {
      onSuccessRef?.(state);
    } else if (state.status === 'error') {
      onErrorRef?.(state);
    }
  }, [onErrorRef, onSuccessRef, state]);

  useEffect(() => {
    if (formStatus.pending) {
      onLoadingRef?.();
    }
  }, [onLoadingRef, formStatus.pending]);

  useEffect(() => {
    if (state.status === 'success' || state.status === 'error') {
      handleServerActionResponse();
    }
  }, [state.serverActionCount, state.status, handleServerActionResponse]);

  return {
    formStatus,
  };
}
