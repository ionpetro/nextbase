'use client';
import { useEffect, useRef, useState } from 'react';
import { Label } from '@/components/ui/Label';
import { classNames } from '@/utils/classNames';
import { Button } from '@/components/ui/Button';
import { updatePasswordAction } from './actions';
import { useFormState, useFormStatus } from 'react-dom';
import toast from 'react-hot-toast';
import { ServerActionState } from '@/utils/server-actions/types';

const initialState: ServerActionState = {
  status: 'idle',
  message: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      aria-disabled={pending}
      type="submit"
      className={classNames(
        'flex w-full justify-center rounded-lg border border-transparent py-3 text-white dark:text-black px-4 text-sm font-medium  shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2',
        pending
          ? 'bg-yellow-300 dark:bg-yellow-700 '
          : 'bg-black dark:bg-white hover:bg-gray-900 dark:hover:bg-gray-100  ',
      )}
    >
      {pending ? 'Updating...' : 'Update Password'}
    </Button>
  );
}

export const UpdatePassword = () => {
  const [state, formAction] = useFormState(updatePasswordAction, initialState);

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === 'success') {
      toast.success(state.message);
      formRef.current?.reset();
    } else if (state.status === 'error') {
      toast.error(state.message);
    }
  }, [state.message, state.status]);

  return (
    <form ref={formRef} action={formAction}>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-muted-foreground">
            Password
          </Label>
          <div>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="password"
              required
              className="block w-full appearance-none rounded-md border bg-gray-50/10 dark:bg-gray-800/20 h-10 px-3 py-3 placeholder-muted-foreground shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <SubmitButton />
        </div>
      </div>
    </form>
  );
};
