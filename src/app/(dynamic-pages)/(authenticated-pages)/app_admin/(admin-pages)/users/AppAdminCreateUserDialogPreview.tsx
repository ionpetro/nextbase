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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToastMutation } from '@/hooks/useToastMutation';
import { useState } from 'react';

export const AppAdminCreateUserDialogPreview = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');

  const { mutate: createUser, isLoading } = useToastMutation<
    string,
    unknown,
    string
  >(
    async (email) => {
      // Simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return email;
    },
    {
      loadingMessage: 'Creating user...',
      successMessage: 'User created!',
      errorMessage: 'Failed to create user',
      onSuccess: () => {
        setOpen(false);
      },
    },
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">
          <LucideIcon name="Plus" className="mr-2" /> Create User
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="bg-gray-200/50 dark:bg-gray-700/40 p-3 rounded-lg w-fit">
            <LucideIcon name="Plus" className="w-6 h-6" />
          </div>
          <div className="p-1">
            <DialogTitle className="text-lg">Create User</DialogTitle>
            <DialogDescription className="text-base">
              Create a new user by entering their email address.
            </DialogDescription>
          </div>
        </DialogHeader>
        <div className="gap-4 grid">
          <Label className="space-y-2">
            <span>Email</span>
            <Input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Label>
        </div>
        <DialogFooter className="mt-8">
          <Button
            onClick={() => {
              if (email.length > 0) {
                createUser(email);
              }
            }}
            aria-disabled={isLoading}
            type="button"
            className="w-full"
          >
            {isLoading ? 'Loading...' : 'Create User'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
