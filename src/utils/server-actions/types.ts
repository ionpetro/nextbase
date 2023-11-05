export type SuccessServerActionState<T> = {
  message: string;
  payload: T;
  serverActionCount: number;
  status: 'success';
};

export type ErrorServerActionState<T> = {
  message: string;
  serverActionCount: number;
  status: 'error';
};

export type ServerActionState<T = undefined> =
  | {
    message: null;
    status: 'idle';
    serverActionCount: number;
  }
  | ErrorServerActionState<T>
  | SuccessServerActionState<T>;
