'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { LucideIcon } from './LucideIcon';

type CreateOrganizationDialogProps = {
  onConfirm: (organizationTitle: string) => void;
  isLoading: boolean;
  className?: string;
  isDialogOpen: boolean;
};

export function CreateOrganizationForm({
  onConfirm,
  isLoading,
  isDialogOpen,
}: CreateOrganizationDialogProps) {
  const [organizationTitle, setOrganizationTitle] = useState<string>('');
  // const [open, setOpen] = useState(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onConfirm(organizationTitle);
    redirect('/dashboard');
  };

  return (
    <>
      <Dialog open={isDialogOpen} data-testid="create-organization-form">
        <DialogContent>
          <DialogHeader>
            <div className="bg-gray-200/50 dark:bg-gray-700/40 mb-2 p-3 rounded-lg w-fit">
              <LucideIcon name="Network" className="w-6 h-6" />
            </div>
            <div className="p-1">
              <DialogTitle className="text-lg">Create Organization</DialogTitle>
              <DialogDescription className="mt-0 text-base">
                Create a new organization and get started.
              </DialogDescription>
            </div>
          </DialogHeader>
          <form onSubmit={handleSubmit} data-testid="create-organization-form">
            <div className="mb-8">
              <Label className="text-muted-foreground">Organization Name</Label>
              <Input
                value={organizationTitle}
                onChange={(event) => {
                  setOrganizationTitle(event.target.value);
                }}
                required
                className="shadow focus:shadow-outline mt-1.5 px-3 py-2 border rounded-lg w-full h-11 text-gray-700 appearance-none focus:ring-0 leading-tight focus:outline-none text-base"
                id="name"
                name="name"
                type="text"
                placeholder="Organization Name"
                disabled={isLoading}
              />
            </div>

            <DialogFooter>
              <Button
                variant="default"
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                Create Organization
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
