import 'server-only';
import {
  ErrorServerActionState,
  ServerActionState,
  SuccessServerActionState,
} from './types';

export function serverActionSuccessPayload<T>(
  state: ServerActionState<T>,
  {
    message,
    payload,
  }: {
    message: string;
    payload: T;
  }
) {
  const response: SuccessServerActionState<T> = {
    ...state,
    message,
    payload,
    serverActionCount: state.serverActionCount + 1,
    status: 'success',
  };

  return response;
}

export function serverActionErrorPayload<T>(
  state: ServerActionState<T>,
  {
    error,
    errorMessage,
  }: {
    error: Error;
    errorMessage?: string;
  }
) {
  let message;
  if (errorMessage) {
    message = errorMessage;
  } else {
    message = error.message;
  }
  console.error(error);
  const errorResponse: ErrorServerActionState<T> = {
    ...state,
    message,
    serverActionCount: state.serverActionCount,
    status: 'error',
  };
  return errorResponse;
}
