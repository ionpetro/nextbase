'use client';

import { T } from '@/components/ui/Typography';
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
import { Input } from '@/components/ui/input';
import TrashIcon from 'lucide-react/dist/esm/icons/trash';
import { useState } from 'react';

type Props = {
  onDeleteConfirm: () => void;
};

export const ConfirmDeleteAccountDialog = ({ onDeleteConfirm }: Props) => {
  const [open, setOpen] = useState(false);
  const [confirmText, setConfirmText] = useState('');
  const isDisabled = confirmText !== 'delete';
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full" variant="destructive">
          <TrashIcon className="mr-2 h-5 w-5" /> Delete Account
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Account</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete your account? This action is
            irreversible. All your data will be lost.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <Input
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            className="mt-4"
          />
          <T.Subtle className="pl-2">
            Type &quot;delete&quot; into the input to confirm.
          </T.Subtle>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            disabled={isDisabled}
            variant="destructive"
            onClick={() => {
              onDeleteConfirm();
              setOpen(false);
            }}
          >
            Confirm Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
