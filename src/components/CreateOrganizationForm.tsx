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
import OrganizationIcon from 'lucide-react/dist/esm/icons/network';
import { redirect } from 'next/navigation';
import { useState } from 'react';

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
            <div className="p-3 w-fit bg-gray-200/50 dark:bg-gray-700/40 mb-2 rounded-lg">
              <OrganizationIcon className=" w-6 h-6" />
            </div>
            <div className="p-1">
              <DialogTitle className="text-lg">Create Organization</DialogTitle>
              <DialogDescription className="text-base mt-0">
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
                className="mt-1.5 shadow appearance-none border h-11 rounded-lg w-full py-2 px-3 focus:ring-0 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-base"
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
