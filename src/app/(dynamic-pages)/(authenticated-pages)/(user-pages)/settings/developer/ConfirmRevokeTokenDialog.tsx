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
import { revokeUnkeyToken } from '@/data/user/unkey';
import { useToastMutation } from '@/hooks/useToastMutation';
import { useState } from 'react';

type Props = {
  keyId: string;
};

export const ConfirmRevokeTokenDialog = ({ keyId }: Props) => {
  const [open, setOpen] = useState(false);
  const { mutate, isLoading } = useToastMutation(revokeUnkeyToken, {
    onSettled: () => {
      setOpen(false);
    },
    loadingMessage: 'Revoking API Key...',
    successMessage: 'API Key revoked!',
    errorMessage: 'Unable to revoke API Key.',
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructiveLink" size="xs">
          Revoke
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] [&>.dialog-close]:hidden">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            mutate(keyId);
          }}
        >
          <DialogHeader>
            <DialogTitle>Revoke Token</DialogTitle>
            <DialogDescription>
              Are you sure you want to revoke this token? This action is
              irreversible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <input type="hidden" name="keyId" value={keyId} />
            <Button
              variant="destructive"
              type="submit"
              aria-disabled={isLoading}
            >
              {isLoading ? 'Revoking API Key...' : 'Yes, revoke'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setOpen(false);
              }}
            >
              Cancel
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
