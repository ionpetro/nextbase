'use client';
import { Button } from '@/components/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import Plus from 'lucide-react/dist/esm/icons/plus';
import { useRef, useState } from 'react';
import { toast } from 'sonner';
import { useFormState, useFormStatus } from 'react-dom';
import { createUserAction } from '@/app/(dynamic-pages)/(authenticated-pages)/app_admin/users/actions';
import { User } from '@supabase/supabase-js';
import { ServerActionState } from '@/utils/server-actions/types';
import { useFormSubmission } from '@/utils/server-actions/useFormSubmission';

type Props = {
  onSubmit: (email: string) => void;
  isLoading: boolean;
};

function SubmitButton({
  setOpen,
  state,
}: {
  setOpen: (open: boolean) => void;
  state: ServerActionState<User>;
}) {
  const toastRef = useRef<string | number | null>(null);
  const { formStatus } = useFormSubmission<User>(state, {
    onSuccess: (successState) => {
      toast.success(successState.message, {
        id: toastRef.current ?? undefined,
      });
      toastRef.current = null;
      setOpen(false);
    },
    onLoading: () => {
      setOpen(false);
      toastRef.current = toast.loading('Creating user...');
    },
    onError: (errorState) => {
      toast.error(errorState.message, {
        id: toastRef.current ?? undefined,
      });
      toastRef.current = null;
    },
  });

  return (
    <Button aria-disabled={formStatus.pending} type="button" className="w-full">
      {formStatus.pending ? 'Loading...' : 'Create User'}
    </Button>
  );
}

const initialFormState: ServerActionState<User> = {
  status: 'idle',
  serverActionCount: 0,
  message: null,
};

export const AppAdminCreateUserDialog = () => {
  const [open, setOpen] = useState(false);
  const [state, createUser] = useFormState(createUserAction, initialFormState);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">
          <Plus className="mr-2" /> Create User
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" asChild>
        <form action={createUser}>
          <DialogHeader>
            <div className="p-3 w-fit bg-gray-200/50 dark:bg-gray-700/40 rounded-lg">
              <Plus className="w-6 h-6" />
            </div>
            <div className="p-1">
              <DialogTitle className="text-lg">Create User</DialogTitle>
              <DialogDescription className="text-base">
                Create a new user by entering their email address.
              </DialogDescription>
            </div>
          </DialogHeader>
          <div className="grid gap-4">
            <Label className="space-y-2">
              <span>Email</span>
              <Input type="email" name="email" />
            </Label>
          </div>
          <DialogFooter className="mt-8">
            <SubmitButton state={state} setOpen={setOpen} />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
