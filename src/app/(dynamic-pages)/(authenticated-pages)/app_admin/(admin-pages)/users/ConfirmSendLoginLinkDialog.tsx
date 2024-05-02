'use client';
import { LucideIcon } from '@/components/LucideIcon';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { sendLoginLinkAction } from '@/data/admin/user';
import { useToastMutation } from '@/hooks/useToastMutation';
import { useState } from 'react';

export const ConfirmSendLoginLinkDialog = ({
  userEmail,
}: {
  userEmail: string;
}) => {
  const [open, setOpen] = useState(false);
  const { mutate: onConfirm, isLoading } = useToastMutation(
    async () => {
      await sendLoginLinkAction(userEmail);
    },
    {
      loadingMessage: 'Sending login link...',
      successMessage: 'Login link sent!',
      errorMessage: 'Failed to send login link',
    },
  );
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={'outline'} aria-disabled={isLoading}>
          Send login link
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="bg-gray-200/50 dark:bg-gray-700/40 mb-2 p-3 rounded-lg w-fit">
            <LucideIcon name='Send' className="w-6 h-6" />
          </div>
          <div className="p-1">
            <DialogTitle className="text-lg">Send Login Link</DialogTitle>
            <DialogDescription className="mt-0 text-base">
              Are you sure you want to send a login link to the user?
            </DialogDescription>
          </div>
        </DialogHeader>
        <DialogFooter className="mt-2">
          <Button
            type="button"
            variant="outline"
            className="w-full"
            aria-disabled={isLoading}
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="default"
            className="w-full"
            aria-disabled={isLoading}
            onClick={() => {
              onConfirm();
              setOpen(false);
            }}
          >
            Send Login Link
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
